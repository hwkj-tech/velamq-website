// Rule-visible fields verified against crates/rule/src/engine.rs event_context.
// Scalar fields are strings; structured fields retain their JSON shape here.
const connection = {
  client_id: 'device-001',
  timestamp: '1790467200000',
  client_ip: '192.0.2.10',
  client_port: '51832',
  node_ip: '192.0.2.20',
  username: 'device-user',
}
const message = {
  ...connection,
  topic: 'devices/device-001/commands',
  qos: '1',
  message_id: '42',
  id: 'msg-20260927-0001',
}

export const eventExamples = [
  {
    event: 'CONNECT', title: '连接',
    description: '客户端连接事件。version 为 V3_1、V3_1_1 或 V5；keepalive 单位为秒。示例为 MQTT 5 TCP 直连，携带用户名和用户属性。普通直连也提供 proxied=false 和 proxy_tcp.proxied=false；transport 在有传输类型信息时提供。',
    input: { ...connection, keepalive: '60', clean_session: 'false', version: 'V5', transport: 'tcp', proxied: 'false', proxy_tcp: { proxied: false }, user_properties: { tenant: 'factory-a', tag: ['sensor', 'outdoor'] } },
  },
  {
    event: 'PUBLISH', title: '发布',
    description: 'client_id 指发布客户端。payload 示例为 JSON 载荷，可使用 payload.temperature 取值；非 JSON 的 UTF-8 载荷按文本读取。QoS 0 的 is_offline 始终为 false。user_properties 仅在 MQTT 5 消息携带对应属性时存在，同名属性合并为数组。',
    input: { ...message, topic: 'devices/device-001/telemetry', retain: 'false', dup: 'false', is_offline: 'false', payload: { temperature: 23.5, humidity: 62 }, user_properties: { source: 'sensor', tag: ['telemetry', 'room-1'] } },
  },
  {
    event: 'SUBSCRIBE', title: '订阅',
    description: '每次订阅事件包含该报文的全部主题过滤器。topic_filters 是逗号拼接的字符串，不是 JSON 数组；topic 和 qos 仅取第一个订阅项。id 为 sub: 加报文标识。不要使用 $EVENT.SUB。',
    input: { ...connection, message_id: '7', topic_filters: 'devices/device-001/commands,devices/+/state', topic: 'devices/device-001/commands', qos: '1', id: 'sub:7' },
  },
  {
    event: 'UNSUBSCRIBE', title: '取消订阅',
    description: 'topics 是本次取消订阅的主题过滤器，以逗号拼接。此事件不提供 topic、qos、message_id 或 id 字段。不要使用 $EVENT.UNSUB。',
    input: { ...connection, topics: 'devices/device-001/commands,devices/+/state' },
  },
  {
    event: 'ACK', title: '发布确认',
    description: 'desc 表示确认阶段：ack（PUBACK）、rec（PUBREC）、rel（PUBREL）、comp（PUBCOMP）。一个 QoS 2 交互可能产生多个阶段事件；离线消息在 QoS 1 的 ack 或 QoS 2 的 comp 阶段完成清理。规则上下文不提供 payload、retain 或 dup。',
    input: { ...message, desc: 'ack' },
  },
  {
    event: 'DISCONNECT', title: '主动断开',
    description: '客户端发送 DISCONNECT 报文触发。当前规则上下文仅提供连接基础信息，没有 reason、topic 或 message_id；不要与连接关闭 CLOSE 混用。',
    input: { ...connection },
  },
  {
    event: 'PING', title: '心跳',
    description: '客户端心跳事件，提供连接基础信息，不包含消息载荷、主题或报文标识。',
    input: { ...connection },
  },
  {
    event: 'DELIVERED', title: '投递',
    description: '消息向接收客户端投递时产生，client_id 指接收客户端。投递事件不等于接收方已完成 QoS 确认；确认阶段使用 ACK。当前规则上下文不提供 payload、retain 或 dup。',
    input: { ...message },
  },
  {
    event: 'OFFLINE', title: '离线保存',
    description: '匹配离线持久会话的 QoS 1/2 投递触发，client_id 指接收设备，is_offline 为 true。离线时网络地址可能为空、端口可能为 0；message_id 尚未分配时也可能为 0。每个设备可有多条消息，按 client_id 与应用消息 id 区分，不能用可复用的 message_id 作为存储主键。此事件不提供 user_properties，QoS 0 不触发该事件。',
    input: { ...message, client_ip: '', client_port: '0', message_id: '0', is_offline: 'true', retain: 'false', dup: 'false', payload: { command: 'set_temperature', value: 26 } },
  },
  {
    event: 'DROP', title: '消息丢弃',
    description: '消息丢弃事件，drop_type 说明丢弃原因。示例表示消息超过客户端允许的最大报文大小；实际原因随丢弃路径变化。当前规则上下文不提供 payload、retain 或 dup。',
    input: { ...message, drop_type: 'maximum_packet_size_exceeded' },
  },
  {
    event: 'CLOSE', title: '连接关闭',
    description: '连接关闭事件，reason 为关闭原因。示例 session_takeover 表示同客户端 ID 的新连接接管会话。此事件不提供消息 id、message_id、topic 或 payload。',
    input: { ...connection, reason: 'session_takeover' },
  },
]

const proxyConnect = {
  ...eventExamples[0].input,
  transport: 'ws',
  http_request_path: '/mqtt?tenant=factory-a',
  http_headers: { host: 'mqtt.example.com', x_request_id: 'req-001', x_tag: ['a', 'b'] },
  proxied: 'true',
  proxy_version: '2',
  proxy_command: 'PROXY',
  proxy_transport_protocol: 'TCP4',
  proxy_source_addr: '192.0.2.10',
  proxy_source_port: '51832',
  proxy_destination_addr: '192.0.2.20',
  proxy_destination_port: '8083',
  'proxy_tlvs.count': '1',
  proxy_tcp: { proxied: true, version: 2, command: 'PROXY', transport_protocol: 'TCP4', source_addr: '192.0.2.10', source_port: 51832, destination_addr: '192.0.2.20', destination_port: 8083 },
  proxy_ssl: { client: true, has_client_cert: true, cert_conn: true, cert_sess: false, verify: 0, version: 'TLSv1.3', cn: 'device-001', cipher: 'TLS_AES_128_GCM_SHA256', signature_algorithm: 'RSA-PSS', key_algorithm: 'RSA' },
}

export function eventExampleBlocks() {
  const paragraph = text => ({ type: 'paragraph', text })
  const code = (language, value) => ({ type: 'code', language, code: value })
  return [
    { type: 'heading', id: 'event-input-json', level: 2, text: '各事件的完整输入 JSON' },
    paragraph('以下 JSON 展示进入规则 SQL 的可访问上下文，不是 MQTT 报文原文、内部事件结构体或 SELECT * 的序列化输出。每个示例都展开了该场景的全部基础字段，未使用省略号；CONNECT 的条件扩展字段见本节末尾。事件类型由 FROM "$EVENT.…" 指定，不需要在 JSON 中添加 event 字段。'),
    paragraph('timestamp 为 Unix 毫秒时间戳。当前引擎的标量上下文字段以字符串保存，因此示例中的 qos、端口、时间戳和布尔标记使用字符串；做数值运算时可显式使用 to_double。payload、user_properties、http_headers、proxy_tcp 和 proxy_ssl 在这里按结构化视图展示，实际还提供相应文本视图。payload 内的业务 JSON 保留原始类型，并按规则需要解析；二进制载荷不可直接假定为 JSON。'),
    paragraph('所有示例都假设存在用户名。username 为可选字段：仅在连接或运行上下文具有用户名时提供，不存在时省略，不固定补 null。用户属性、HTTP 头及代理字段同样按实际连接条件提供。不要把内部结构体中的 protocol、rule_data_type、auth、will 等字段直接当成可供规则访问的字段，也不会向规则暴露连接密码。'),
    ...eventExamples.flatMap(({ event, title, description, input }) => [
      { type: 'heading', id: `event-input-${event.toLowerCase()}`, level: 3, text: `${event} · ${title}` },
      paragraph(description),
      code('sql', `SELECT * FROM "$EVENT.${event}"`),
      code('json', JSON.stringify(input, null, 2)),
    ]),
    { type: 'heading', id: 'event-input-connect-extensions', level: 3, text: 'CONNECT · WebSocket 与 PROXY Protocol 扩展' },
    paragraph('下面完整示例适用于同时具有 WebSocket 握手元数据、PROXY Protocol v2 地址信息和 SSL TLV 的连接。未启用相应能力时不会出现这些扩展字段；proxy_ssl 描述代理上报的 TLS 信息，不是所有 TLS 直连都提供。proxy_source_*、proxy_destination_*、proxy_ssl 内的 version/cn/cipher/signature_algorithm/key_algorithm 仅在代理携带时出现；proxy_tlvs.count 仅在存在 TLV 时出现，不提供完整 TLV 数组。'),
    code('json', JSON.stringify(proxyConnect, null, 2)),
    paragraph('HTTP 头名称转换为小写，非字母数字连续字符转换为下划线，例如 X-Request-ID 对应 http_headers.x_request_id；同名头使用数组。MQTT 用户属性保留原键名，同名键也使用数组。上述连接扩展字段只在 CONNECT 上下文中添加；PUBLISH 可携带自己的 user_properties，不自动继承 CONNECT 的 HTTP/代理字段。'),
  ]
}
