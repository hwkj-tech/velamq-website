# 规则事件与 SQL

规则由事件源、SQL 条件和动作组成。先根据事件选择 SQL，再配置相容动作；不要用发布规则代替离线存储规则。

## 常用事件

| 事件源 | 触发场景 | 常用字段 |
| --- | --- | --- |
| `$EVENT.PUBLISH` | MQTT 发布事件 | `client_id`、`topic`、`qos`、`payload`、`timestamp` |
| `$EVENT.OFFLINE` | 向离线持久会话保存 QoS 1/2 投递 | `client_id`、`topic`、`id`、`payload`、`is_offline` |
| `$EVENT.SUBSCRIBE` | 客户端订阅事件 | `client_id`、订阅上下文 |
| `$EVENT.ACK` | 发布确认事件 | `client_id`、`topic`、`id`、`message_id` |

`client_id` 使用下划线写法。`id` 是应用消息标识，`message_id` 是 MQTT 报文标识；离线表应按客户端与 `id` 定位记录，不要使用可复用的报文标识作为唯一主键。

## 发布规则示例

输入主题为 `devices/D001/telemetry`，发布客户端为 `D001`，载荷为：

```json
{"temperature":"23.456","device":{"id":"D001"}}
```

```sql
SELECT lower(client_id) AS device,
       round(to_double(payload.temperature), 2) AS temperature,
       topic_level(topic, 2) AS kind
FROM "$EVENT.PUBLISH"
WHERE wildcard(topic, 'devices/+/telemetry') = true
```

提取结果中的函数值以字符串表示：

```json
{"device":"d001","temperature":"23.46","kind":"telemetry"}
```

动作的载荷模板可以写为：

```text
{"device":${json_quote(device)},"temperature":${temperature},"kind":${json_quote(kind)}}
```

输出：

```json
{"device":"d001","temperature":23.46,"kind":"telemetry"}
```

数值不加 JSON 引号；字符串使用 `json_quote` 处理引号和换行，不要再给它的结果套双引号。保存前使用规则测试核对匹配、提取字段及动作结果。

## 离线规则

```sql
SELECT * FROM "$EVENT.OFFLINE"
```

这不是把普通发布加上一个 UI 过滤条件：Broker 根据实际离线投递生成 OFFLINE 事件。离线保存中的 `client_id` 是接收设备，不是原始发布设备。

- OFFLINE 事件可选择离线保存动作；PUBLISH 不可选择离线保存动作。
- QoS 0 不产生外部离线保存动作，不能通过增加 `WHERE is_offline = true` 改变这一行为。
- 一条消息命中多个离线设备时，各设备分别保存和确认。
- 配置离线动作后，系统自动处理后续查询及确认清理，无需另建相同的订阅和 ACK 规则。
- 多个离线规则或动作可能各保存一份；同一业务通常选择一个离线后端，避免重复配置。

## SQL 与模板的区别

规则 SQL 直接写 `lower(client_id)`；动作模板写 `${lower(client_id)}`。模板不是任意 SQL 表达式求值器，不支持 `${payload.temperature + 1}` 这类写法。
