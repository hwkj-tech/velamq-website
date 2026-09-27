# 内置函数与输入输出

内置函数无需在「函数管理」中创建。规则 SQL 使用 `函数名(参数)`，支持模板的配置使用 `${函数名(参数)}`。函数名不区分大小写，可以嵌套调用。

## 示例输入

下表使用同一组上下文。表达式列放入 `${…}` 即可用于模板；输出列是最终文本，不额外添加 JSON 引号。

```json
{
  "client_id": "D001",
  "username": " Alice ",
  "topic": "devices/D001/telemetry",
  "payload": {"temperature":"23.456","device":{"id":"D001"},"values":[1,2,3]}
}
```

## 字符串与缺省值

| 表达式 | 输出 |
| --- | --- |
| `lower(client_id)` | `d001` |
| `upper('mqtt')` | `MQTT` |
| `trim(username)` | `Alice` |
| `lower(trim(username))` | `alice` |
| `concat('devices/', lower(client_id), '/down')` | `devices/d001/down` |
| `concat_ws(':', 'mqtt', client_id, 'state')` | `mqtt:D001:state` |
| `length('设备A')` | `3` |
| `substring('abcdef', 1, 4)` | `bcd` |
| `left('abcdef', 3)` | `abc` |
| `right('abcdef', 2)` | `ef` |
| `reverse('abc')` | `cba` |
| `repeat('ab', 3)` | `ababab` |
| `replace('a-b-a', 'a', 'x')` | `x-b-a` |
| `replace_all('a-b-a', 'a', 'x')` | `x-b-x` |
| `split_part('a/b/c', '/', 2)` | `b` |
| `contains(topic, 'telemetry')` | `true` |
| `starts_with(topic, 'devices/')` | `true` |
| `ends_with(topic, '/telemetry')` | `true` |
| `ifnull(missing, 'unknown')` | `unknown` |
| `coalesce(missing, client_id, 'anonymous')` | `D001` |

`substring` 起点从 0 开始，第三个参数是结束位置且不包含该位置；不是长度。`split_part` 从 1 开始。`coalesce` 和 `ifnull` 按空字符串判断缺省值。

## JSON 与转义

| 表达式 | 输出 |
| --- | --- |
| `json_extract(payload, '$.device.id')` | `D001` |
| `json_extract(payload, '$.values[1]')` | `2` |
| `json_exists(payload, '$.device.id')` | `true` |
| `json_length('[1,2,3]')` | `3` |
| `json_type('42')` | `number` |
| `is_json('{"a":1}')` | `true` |
| `json_quote('device "A"')` | `"device \"A\""` |

`json_quote` 返回包含引号及转义符的 JSON 字符串 token。自由文本模板不会自动替你转义整个 JSON。

## 数值、正则与编码

| 表达式 | 输出 |
| --- | --- |
| `round(to_double(payload.temperature), 2)` | `23.46` |
| `abs(-12.5)` | `12.5` |
| `floor(3.9)` | `3` |
| `ceil(3.1)` | `4` |
| `min(8, 3, 5)` | `3` |
| `max(8, 3, 5)` | `8` |
| `pow(2, 3)` | `8` |
| `sqrt(81)` | `9` |
| `int8(300)` | `127` |
| `int16(40000)` | `32767` |
| `is_number('23.456')` | `true` |
| `to_bool('yes')` | `true` |
| `regexp_extract('dev-123', 'dev-([0-9]+)', 1)` | `123` |
| `regexp_replace('a1b2', '[0-9]', 'x')` | `axbx` |
| `base64_encode('hello')` | `aGVsbG8=` |
| `base64_decode('aGVsbG8=')` | `hello` |
| `hexstr('ABC')` | `414243` |
| `hex_decode('414243')` | `ABC` |
| `sha256('hello')` | `2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824` |

整数转换 `int8/int16/int32/int64` 将越界值限制在目标范围。哈希函数可用于摘要，不应直接作为无盐的密码存储方案。

## MQTT 主题与时间

| 表达式 | 输出 |
| --- | --- |
| `wildcard(topic, 'devices/+/telemetry')` | `true` |
| `topic_level(topic, 1)` | `D001` |
| `topic_level_count(topic)` | `3` |
| `topic_prefix(topic, 2)` | `devices/D001` |
| `topic_suffix(topic, 1)` | `D001/telemetry` |
| `parse_time('2026-01-01 00:00:00', '%Y-%m-%d %H:%M:%S')` | `1767225600000` |

`topic_level` 从 0 开始。`topic_prefix(topic, n)` 取前 n 层；`topic_suffix(topic, n)` 跳过前 n 层，返回剩余部分，不是取最后 n 层。`wildcard` 参数顺序为主题、MQTT 过滤器。`now()` 返回 Unix 毫秒时间戳；`uuid()` 返回 32 位不带连字符的随机 UUID，`uuid_with_hyphen()` 返回标准带连字符格式。

`format_time(timestamp, '%Y-%m-%d %H:%M:%S')` 按 Broker 所在系统的本地时区格式化；`parse_time` 将无时区输入按 UTC 解析。两者不能在非 UTC 环境中直接当作互逆操作。跨节点建议统一时区，业务传输优先使用毫秒时间戳。

## 函数分类索引

| 分类 | 常用名称 |
| --- | --- |
| 字符串 | `str`、`length`、`lower`、`upper`、`trim`、`ltrim`、`rtrim`、`reverse`、`repeat`、`concat`、`concat_ws`、`index_of`、`last_index_of`、`replace`、`replace_all`、`split_part`、`substring`、`left`、`right`、`char_at` |
| 判断与缺省 | `contains`、`starts_with`、`ends_with`、`is_number`、`is_empty`、`is_not_empty`、`coalesce`、`ifnull` |
| JSON | `json`、`parse_json`、`json_quote`、`json_extract`、`json_exists`、`json_type`、`json_length`、`json_keys`、`is_json` |
| 正则 | `regexp_match`、`regexp_extract`、`regexp_replace`、`regexp_replace_first` |
| 数值 | `abs`、`floor`、`ceil`、`round`、`min`、`max`、`least`、`greatest`、`pow`、`sqrt`、`int8`、`int16`、`int32`、`int64`、`to_float`、`to_double`、`to_bool` |
| 编码与摘要 | `hexstr`、`hex_decode`、`base64_encode`、`base64_decode`、`url_encode`、`url_decode`、`md5`、`sha1`、`sha256`、`bytes` |
| 时间与标识 | `now`、`current_date`、`current_time`、`current_datetime`、`date`、`time`、`datetime`、`format_time`、`parse_time`、`uuid`、`uuid_with_hyphen` |
| MQTT | `wildcard`、`topic_level`、`topic_level_count`、`topic_prefix`、`topic_suffix` |

常见别名包括 `len → length`、`substr → substring`、`json_value/json_get → json_extract`、`power → pow`、`topic_segment → topic_level`。
