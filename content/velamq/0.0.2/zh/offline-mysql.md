# MySQL 离线消息

MySQL 离线动作通过三条语句完成保存、补发查询和确认删除。每个客户端可有多条消息，客户端标识与应用消息 ID 共同定位记录。

## 配置步骤

1. 创建 MySQL 数据源，确认连接与账号权限。
2. 在数据库创建离线表及索引。
3. 新建 OFFLINE 规则：`SELECT * FROM "$EVENT.OFFLINE"`。
4. 选择「写入离线消息 / MySQL」，绑定数据源，填写保存、查询、删除三条语句。
5. 用持久会话完成「订阅 → 下线 → 发布多条 → 重连 → 确认 → 清理」测试。

接收设备和 QoS 前提与 Redis 离线消息相同。数据库动作的 SQL 使用文本模板，不是参数绑定；以下示例通过十六进制编码承载动态字符串和二进制载荷，避免把原始引号拼入 SQL。

## 建表

```sql
CREATE TABLE mqtt_offline_messages (
  seq BIGINT NOT NULL AUTO_INCREMENT,
  client_id VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  id VARCHAR(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  topic TEXT NOT NULL,
  payload LONGBLOB NOT NULL,
  qos INT NOT NULL,
  retain_flag INT NOT NULL DEFAULT 0,
  ts BIGINT NOT NULL,
  expires_at_ms BIGINT NOT NULL,
  PRIMARY KEY (client_id, id),
  UNIQUE KEY uq_seq (seq),
  KEY idx_client_seq (client_id, seq),
  KEY idx_expiry (expires_at_ms)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

示例限定 Client ID 长度 255；实际标识更长时须调整设计。二进制排序规则避免 `Device-A` 与 `device-a` 被当作同一设备。

## 保存语句：sql

```sql
INSERT INTO mqtt_offline_messages
  (client_id, id, topic, payload, qos, retain_flag, ts, expires_at_ms)
VALUES (
  CONVERT(UNHEX('${hexstr(client_id)}') USING utf8mb4),
  CONVERT(UNHEX('${hexstr(id)}') USING utf8mb4),
  CONVERT(UNHEX('${hexstr(topic)}') USING utf8mb4),
  UNHEX('${hexstr(payload)}'),
  ${qos}, 0, ${timestamp}, ${timestamp} + 3600000
)
ON DUPLICATE KEY UPDATE id = id;
```

该示例保留一小时，按消息时间戳计算。`${hexstr(payload)}` 可保留非 UTF-8 字节；不要给二进制消息直接使用 `'${payload}'`。示例将离线普通订阅投递的 retain 标志设为 0；需要其他策略时明确配置，不要将离线表当成 MQTT 保留消息表。

## 订阅查询：query_sql

```sql
SELECT id, topic, payload, qos, retain_flag AS `retain`, ts
FROM mqtt_offline_messages
WHERE client_id = CONVERT(UNHEX('${hexstr(client_id)}') USING utf8mb4)
  AND expires_at_ms > ${now()}
ORDER BY seq
LIMIT 32;
```

查询必须限定接收客户端，返回 `id/topic/payload/qos/retain/ts`。保持 `ORDER BY` 和小批量 `LIMIT`，并为客户端加索引；不要返回整张表或只按 topic 查询。Broker 还会核对有效订阅和补发队列容量。

## 确认删除：delete_sql

```sql
DELETE FROM mqtt_offline_messages
WHERE client_id = CONVERT(UNHEX('${hexstr(client_id)}') USING utf8mb4)
  AND id = CONVERT(UNHEX('${hexstr(id)}') USING utf8mb4);
```

不要仅按 Client ID 删除，否则确认第一条消息会误删其他离线消息。QoS 1 在 PUBACK 后清理，QoS 2 在 PUBCOMP 后清理；读取不删除。

## 过期与性能

SQL 后端的保留期限由保存及查询 SQL 明确定义，不要假定 Redis 动作的过期逻辑会自动管理自定义表。当前 SQL 补发只恢复上述消息字段，不恢复完整 MQTT 5 属性；单纯在表中增加列不会改变这一行为。如业务依赖 MQTT 5 过期等属性，应优先使用保存完整消息记录的 Redis 内置信箱。

过期记录不再被查询，但仍占表空间。应由数据库定时任务小批量清理 `expires_at_ms` 已到期的行，并监测清理速度、索引和磁盘容量。

当前 MySQL 保存及确认删除包含逐条事务开销。先测单设备多条和并发设备，再调整连接池与数据库资源；不要直接用 Redis 吞吐估算 MySQL 性能。外部保存队列满后的原生回退与混合补发乱序问题同样适用。
