# 自定义函数

内置函数适合字段转换、字符串处理和编码。需要业务判断时，在「函数管理」创建自定义函数，配置调用名、运行时、返回类型和源码，测试通过后启用。

## Rhai：温度等级

调用名 `alarm_level`，运行时 `Rhai`，返回类型 `string`：

```rhai
fn alarm_level(temperature, client_id) {
    if temperature > 80 {
        client_id + ":high"
    } else {
        client_id + ":ok"
    }
}
```

| 参数输入 | 输出 |
| --- | --- |
| `88, "device-1"` | `device-1:high` |
| `25, "device-1"` | `device-1:ok` |

规则 SQL：

```sql
SELECT function::alarm_level(payload.temperature, client_id) AS level
FROM "$EVENT.PUBLISH"
```

输入发布客户端 `device-1`，载荷 `{"temperature":88}`，提取字段为 `{"level":"device-1:high"}`。注意温度是 JSON 数字，不是字符串。

动作载荷模板也可以直接调用：

```text
level=${function::alarm_level(payload.temperature, client_id)}
```

输出文本：

```text
level=device-1:high
```

## Lua：相同业务逻辑

运行时改为 Lua，使用相同调用名时请替换原函数，不要并存重名定义：

```lua
function alarm_level(temperature, client_id)
    if temperature > 80 then
        return client_id .. ":high"
    end
    return client_id .. ":ok"
end
```

输入和输出与 Rhai 示例一致。函数调用名需要合法、唯一，且与声明一致；函数需启用并编译成功。

## Wasm 与适用范围

函数管理也支持 Wasm 模块、入口和资源限制。Wasm 不是直接粘贴 Rust/JavaScript 源码执行，需使用与运行时 ABI 匹配的模块并先完成函数测试。

规则 SQL/动作、ACL 和设备认证支持各自已有的自定义函数入口；指令消费当前仅支持内置函数和上下文取值。不要将 `${function::…}` 当成所有模板均可使用的通用脚本执行器。
