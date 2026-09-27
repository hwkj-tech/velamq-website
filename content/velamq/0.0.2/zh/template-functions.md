# 模板函数

在已支持 `${字段}` 的模板位置，可以直接使用 `${内置函数(参数)}`。内置函数与规则 SQL 共用实现，但可访问字段取决于当前场景。

## 支持位置

| 场景 | 配置位置 | 主要上下文 |
| --- | --- | --- |
| 规则动作 | 支持模板的主题、key、载荷、SQL、URL、标签等 | 事件字段、`payload`、SELECT 提取字段 |
| ACL | 主题模板 | `client_id`、`username`、`client_ip` |
| HTTP 设备认证 | 自定义请求参数的值 | 连接字段、可用的 HTTP 请求上下文 |
| Redis 设备认证 | Redis key 模板 | `client_id`、`username` |
| SQL / SCRAM 认证 | 查询中的绑定参数模板 | 连接字段 |
| LDAP 认证 | 用户 DN、搜索过滤器 | 连接字段 |
| 指令消费 | MQTT 目标主题、载荷模板 | `value`、`value.device.id`、消息来源元数据 |

设备认证时没有 PUBLISH 载荷；指令消费的上游消息使用 `value`，不是 `payload`。原本不做模板解析的配置不会自动支持函数，例如 HTTP 认证 URL 和请求头。

## ACL 与认证示例

输入 `client_id = "D001"`、`username = "Alice"`。

| 用途 | 模板 | 输出 |
| --- | --- | --- |
| ACL 主题 | `devices/${lower(client_id)}/#` | `devices/d001/#` |
| Redis 认证 key | `${concat('mqtt:user:', lower(username))}` | `mqtt:user:alice` |
| HTTP 认证参数值 | `${lower(username)}` | `alice` |

SQL 认证查询：

```sql
SELECT password FROM devices WHERE username = ${lower(username)}
```

函数结果 `alice` 作为数据库参数绑定；不要给 `${…}` 再加 SQL 引号。规则动作 SQL 不同，它仍是文本模板，需按数据库语义处理转义或编码，不能假定享有认证查询的参数绑定保障。

## 指令消费示例

上游消息 `value`：

```json
{"device":{"id":"D001"},"command":{"power":true}}
```

主题模板：

```text
${concat('devices/', lower(value.device.id), '/down')}
```

载荷模板：

```text
${json_extract(value, '$.command')}
```

输出主题为 `devices/d001/down`，输出载荷为 `{"power":true}`。Kafka、RabbitMQ、Pulsar、RocketMQ 指令消费共用此内置函数模板能力。

## 调用边界

- 内置函数可以嵌套，例如 `${lower(trim(username))}`。
- 缺失字段作为函数参数时按空字符串处理，可使用 `ifnull` 或 `coalesce`。
- 不支持在 `${…}` 中直接编写任意 SQL 或脚本表达式。
- 表达式最多 64 KiB、嵌套最多 32 层，函数参数及结果检查上限为 1 MiB。
- 未识别或无效表达式在规则动作、ACL、指令消费中通常保留原占位符；认证模板通常返回空值。保存成功不等于运行结果有效，应以实际模板测试输出为准。
- 规则动作、ACL、设备认证可沿用 `${function::函数名(...)}`；指令消费目前不执行自定义函数。内置与自定义函数互相嵌套也不在当前支持范围。
