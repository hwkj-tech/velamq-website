// Version-specific edits to a deep copy of 0.0.1. Unchanged chapters, code
// examples and navigation remain intact; the archived catalog is never edited.
const paragraph = text => ({ type: 'paragraph', text })
const code = (language, value) => ({ type: 'code', language, code: value })
const list = items => ({ type: 'list', ordered: false, items })
const heading = (id, text) => ({ type: 'heading', id, level: 2, text })

function section(doc, title, replacement = []) {
  const start = doc.blocks.findIndex(b => b.type === 'heading' && b.text === title)
  if (start < 0) throw new Error(`Missing inherited section: ${doc.id} / ${title}`)
  let end = start + 1
  while (end < doc.blocks.length && !(doc.blocks[end].type === 'heading' && doc.blocks[end].level <= doc.blocks[start].level)) end++
  doc.blocks.splice(start, end - start, ...replacement)
}

function append(doc, title, blocks) {
  doc.blocks.push(heading(`${doc.id}-v002-${doc.blocks.length}`, title), ...blocks)
}

function link(doc, title, id) {
  append(doc, title, [paragraph(`完整配置、输入输出与操作示例见 [${title}](/${id}.md)。`)])
}

// Only prose is re-versioned. Download links and shell commands remain pinned
// to the actual published 0.0.1 packages until 0.0.2 artifacts are released.
function textUpdate(text) {
  return text
    .replaceAll('VelaMQ 0.0.1', 'VelaMQ 0.0.2')
    .replaceAll('指标页面消息收发速率和流量图。', 'Grafana 中的消息收发速率和流量图。')
    .replaceAll('检查“访问控制”和“监控指标”中的失败趋势。', '检查“访问控制”，并在 Grafana 中查看失败趋势。')
    .replaceAll('在“监控指标”观察 listener 维度的连接与报文指标。', '在 Grafana 中按 listener 查看连接与报文指标。')
    .replaceAll('“监控指标”连接数和消息收发曲线更新。', 'Grafana 中的连接数和消息收发曲线更新。')
    .replaceAll('“监控指标” ACL 成功/失败曲线变化。', 'Grafana 中的 ACL 成功/失败曲线变化。')
    .replaceAll('在控制台“监控指标”确认连接、消息、认证和 ACL 曲线持续刷新。', '在 Grafana 中确认连接、消息、认证和 ACL 曲线持续刷新。')
    .replaceAll('监控指标：确认连接、吞吐、延迟、规则和认证指标正常。', 'Prometheus / Grafana：确认连接、吞吐、延迟、规则和认证指标正常。')
    .replaceAll('、指标历史', '')
    .replaceAll('控制台历史指标、', '')
    .replaceAll('内置控制台指标、历史采样、Prometheus exporter、Grafana dashboard、审计日志和 Traffic Tap。', '实时仪表盘、Prometheus exporter、Grafana dashboard、审计日志和 Traffic Tap。')
    .replaceAll('规则详情和指标页面会关注：', '在规则详情及外部 Grafana 画板中关注以下执行指标：')
    .replaceAll('进入“控制台用户”', '进入“系统功能 → 控制台用户”')
    .replaceAll('进入“操作审计”', '进入“系统功能 → 操作审计”')
}

export function updateArchivedDocuments(documents, additions) {
  documents['operations/troubleshooting'].summary = '按控制台访问、MQTT 接入、跨节点投递、规则与存储状态逐项排查。'
  documents['product/feature-list'].summary = 'VelaMQ 0.0.2 的接入、安全、规则、存储、集群与运维功能清单。'
  section(documents.FAQ, '规则引擎的离线消息怎么做？', [
    heading('规则引擎的离线消息怎么做', '规则引擎的离线消息怎么做？'),
    paragraph('选择 $EVENT.OFFLINE 事件并配置 OFFLINE_* 动作。Redis 使用内置信箱，只需选择数据源和设置过期时间；SQL 配置保存、查询和确认删除三条语句。仅针对离线持久会话的 QoS 1/2 消息。'),
  ])
  section(documents.FAQ, 'Rule Outbox 和离线消息是一回事吗？', [
    heading('rule-outbox-和离线消息是一回事吗', 'Rule Outbox 和离线消息是一回事吗？'),
    paragraph('不是。Rule Outbox 在 RocksDB 中保存外部动作失败后的重试记录；外部离线消息由配置的 Redis 或 SQL 数据源保存，服务于设备恢复后的补发。'),
  ])
  section(documents.FAQ, '文档截图如何更新？', [
    heading('文档截图如何更新', '文档截图如何更新？'),
    paragraph('官网截图按版本独立维护。0.0.2 使用当前控制台的演示实例素材，历史版本保留旧截图。参见 [控制台界面](/product/demo.md)。'),
  ])
  section(documents['guide/metrics-connections'], '指标历史')
  documents['guide/metrics-connections'].title = '连接管理与 Traffic Tap'
  section(documents['api/management-api'], '查询指标历史')
  section(documents['operations/monitoring'], '指标保留', [
    heading('prometheus-retention', 'Prometheus 数据保留'),
    paragraph('历史序列由外部 Prometheus 保存，保留时间和容量在 Prometheus 服务中设置。VelaMQ 实时导出指标，不向业务 RocksDB 或 Raft 写入监控采样。'),
    paragraph('采集配置及 Grafana 导入步骤见 [Prometheus 与 Grafana](/monitoring.md)。'),
  ])
  section(documents['operations/troubleshooting'], '指标页面没有曲线', [
    heading('prometheus-no-data', 'Prometheus / Grafana 没有数据'),
    list(['确认 Prometheus 可以访问每个节点的 /-/metrics。', '在 Prometheus Targets 中检查目标状态和抓取错误。', '检查 Grafana 数据源、查询时间范围及 node_id 筛选。', '使用 /api/metrics/prometheus 时，开启控制台鉴权的节点需要有效 Bearer Token。']),
  ])
  section(documents['product/demo'], '演示视频')
  section(documents['product/demo'], '重新采集', [
    heading('screenshots-v002', '截图说明'),
    paragraph('截图采集自当前控制台的独立演示实例，仅包含示例配置。旧版演示视频与截图保留在 0.0.1 文档。'),
  ])
  documents['product/demo'].summary = 'VelaMQ 0.0.2 控制台页面与功能入口。'
  documents['product/demo'].title = '控制台界面'
  documents['product/demo'].blocks[0] = paragraph('以下截图展示当前控制台，包含系统功能菜单、配置迁移、黑白名单与函数管理。')
  documents['product/demo'].blocks = documents['product/demo'].blocks.filter(b => !(b.type === 'paragraph' && b.text === '**监控指标**'))
  documents['product/versioning'].summary = '通过文档版本选择器查看 0.0.2 或 0.0.1 对应的功能与操作说明。'
  documents['product/versioning'].blocks = [
    heading('version-selector', '切换版本'),
    paragraph('中文文档默认展示 0.0.2。版本选择器同时切换正文、目录与搜索范围；0.0.1 保留独立归档。'),
    heading('version-content', '版本内容'),
    paragraph('0.0.2 继承 0.0.1 的安装、部署、数据源、规则引擎、安全与运维文档，更新发生变化的功能，并补充函数示例、离线消息、配置迁移及外部监控集成。'),
    paragraph('请按实际运行版本选择文档。软件版本可在控制台仪表盘的主机与系统标题旁查看；安装包版本以发布渠道为准。'),
  ]

  const core = documents['product/core-features']
  section(core, '监控与运维', [heading('监控与运维', '监控与运维'),
    { type: 'image', src: '/velamq-docs/img/screenshots/dashboard.png', alt: 'VelaMQ 当前仪表盘' },
    list(['仪表盘展示连接、消息、订阅、规则、认证、ACL、系统资源和 License 的实时状态。', '数据管理和集群区域提供 RocksDB、Storage Raft、分片、备份与快照状态。', 'Prometheus 通过 /-/metrics 采集运行指标，由 Grafana 展示趋势并配置告警。']),
  ])

  // Keep the complete dynamic-function configuration and datasource guides.
  link(documents['guide/rule-engine/functions'], '自定义函数输入输出示例', 'custom-functions')
  link(documents['guide/rule-engine/templates'], '模板中的内置函数与适用场景', 'template-functions')
  link(documents['guide/rule-engine/events-sql'], '事件选择与函数规则示例', 'rules')
  link(documents['guide/rule-engine/overview'], '内置函数与输入输出', 'builtin-functions')
  link(documents['guide/auth-acl'], '认证与 ACL 模板函数', 'template-functions')
  link(documents['guide/commands'], '指令消费模板函数', 'template-functions')
  link(documents['guide/console-security'], '系统功能与配置迁移', 'config-migration')
  link(documents['guide/cluster'], '逐节点重启与升级检查', 'upgrade')
  link(documents['guide/datasources/sql-mysql'], 'MySQL 离线消息', 'offline-mysql')
  link(documents['guide/datasources/redis'], 'Redis 内置离线信箱', 'offline-redis')
  link(documents['api/management-api'], '配置导入导出 API', 'config-migration')
  link(documents['api/prometheus'], '集群采集、分片汇总与 Grafana', 'monitoring')
  const executionHeading = documents['guide/rule-engine/monitoring-troubleshooting'].blocks.find(b => b.type === 'heading' && b.text === '监控指标')
  executionHeading.text = '执行指标'
  executionHeading.id = 'execution-metrics'

  const offline = documents['guide/rule-engine/offline']
  offline.summary = '对离线持久会话的 QoS 1/2 消息进行外部保存，设备恢复后补发，完成确认后删除。支持 Redis、MySQL、PostgreSQL 和 Oracle。'
  offline.blocks = [paragraph(offline.summary), ...offline.blocks.filter(b => b.type !== 'paragraph' || !b.text.startsWith('VelaMQ 0.0.1 的离线消息'))]
  section(offline, '设计思路', [heading('设计思路', '设计思路'),
    list(['接收设备离线且持久会话订阅匹配时，QoS 1/2 投递触发 $EVENT.OFFLINE。QoS 0 不触发外部离线保存。', 'OFFLINE 规则仅选择离线保存动作，普通 PUBLISH 规则不能选择离线保存动作。', 'Redis 使用内置信箱；SQL 使用保存、查询和删除三条语句。', '设备恢复持久会话或重新订阅后，系统分页拉取消息，不会读取后立即删除。', 'QoS 1 收到 PUBACK、QoS 2 收到 PUBCOMP 后清理对应消息。', '每个客户端可保存多条消息，按接收 client_id 与应用消息 id 区分，不能用可复用的 MQTT message_id 作为唯一主键。']),
  ])
  section(offline, 'SQL 离线动作字段', [heading('sql-离线动作字段', 'SQL 离线动作字段'),
    { type: 'table', headers: ['字段', '说明'], rows: [['`sql`', '必填。保存离线消息，按接收 client_id 和应用消息 id 幂等写入。'], ['`query_sql`', '必填。按 client_id 过滤并稳定排序，返回 id、topic、payload、qos、retain、ts。'], ['`delete_sql`', '必填。仅删除已确认的客户端与消息 id。']] },
    paragraph('SQL 数据的过期过滤与清理由查询和数据库任务负责。Redis 的 expire_time 由内置存储实现。完整 MySQL 建表及三条 SQL 见 [MySQL 离线消息](/offline-mysql.md)。'),
  ])
  section(offline, 'Redis 示例', [heading('redis-示例', 'Redis 示例'),
    code('json', JSON.stringify({ id: 'act-offline-redis', action_type: 'OFFLINE_REDIS', source_name: 'state-redis', expire_time: 86400 }, null, 2)),
    paragraph('选择 Redis 数据源后只配置过期时间，无需 key、SQL 或值模板。消息使用 Hash 保存，以有序集合维护顺序和过期索引，支持单设备多条消息。详见 [Redis 离线消息](/offline-redis.md)。'),
  ])
  section(offline, 'PostgreSQL 示例', [heading('postgresql-示例', 'PostgreSQL 示例'),
    code('sql', 'CREATE TABLE mqtt_offline_messages (\n  seq bigserial UNIQUE,\n  client_id text NOT NULL,\n  id text NOT NULL,\n  topic text NOT NULL,\n  payload bytea NOT NULL,\n  qos int NOT NULL,\n  retain_flag int NOT NULL DEFAULT 0,\n  ts bigint NOT NULL,\n  PRIMARY KEY (client_id, id)\n);\nCREATE INDEX idx_offline_client_seq ON mqtt_offline_messages(client_id, seq);'),
    paragraph('使用应用消息 id 去重；字符串经 hexstr 编码再由数据库解码，避免直接拼接原始引号。payload 使用 bytea 保留原始字节。'),
    code('json', JSON.stringify({
      id: 'act-offline-pg', action_type: 'OFFLINE_POSTGRESQL', source_name: 'telemetry-postgres',
      sql: "INSERT INTO mqtt_offline_messages(client_id,id,topic,payload,qos,retain_flag,ts) VALUES (convert_from(decode('${hexstr(client_id)}','hex'),'UTF8'),convert_from(decode('${hexstr(id)}','hex'),'UTF8'),convert_from(decode('${hexstr(topic)}','hex'),'UTF8'),decode('${hexstr(payload)}','hex'),${qos},0,${timestamp}) ON CONFLICT (client_id,id) DO NOTHING",
      query_sql: "SELECT id,topic,payload,qos,retain_flag AS retain,ts FROM mqtt_offline_messages WHERE client_id=convert_from(decode('${hexstr(client_id)}','hex'),'UTF8') ORDER BY seq LIMIT 32",
      delete_sql: "DELETE FROM mqtt_offline_messages WHERE client_id=convert_from(decode('${hexstr(client_id)}','hex'),'UTF8') AND id=convert_from(decode('${hexstr(id)}','hex'),'UTF8')",
    }, null, 2)),
    paragraph('示例未配置过期；生产环境应增加过期列、查询过滤与定期清理任务。'),
  ])
  append(offline, 'MySQL 配置与验证', [paragraph('建表、索引、保存/查询/删除语句与复现步骤见 [MySQL 离线消息](/offline-mysql.md)。')])
  append(offline, '投递与容量注意事项', [paragraph('外部保存为异步动作，发布方 PUBACK 不等同于外部数据库提交。高突刺导致队列满并回退到原生队列时，混合补发仍可能乱序；需要严格顺序的业务应先验证容量并限制入口速率。')])
  section(documents['guide/datasources/redis'], '离线消息', [heading('离线消息', '离线消息'), paragraph('OFFLINE_REDIS 使用内置多消息信箱和原子操作，选择数据源后仅需 expire_time；不再配置 SQL、key 或 payload 模板。SEND_REDIS 普通缓存动作仍使用上面的 key 与 template 配置。')])

  const screenshotPrefix = '/velamq-docs/img/screenshots/'
  // SQLite currently has no dedicated picker card; do not reuse a PostgreSQL
  // form screenshot under a misleading SQLite caption. Keep its API examples.
  documents['guide/datasources/sql-sqlite'].blocks = documents['guide/datasources/sql-sqlite'].blocks.filter(b => b.type !== 'image')
  for (const block of documents['guide/rule-engine/functions'].blocks) {
    if (block.type === 'image') { block.src = `${screenshotPrefix}functions.png`; block.alt = '函数管理与测试入口' }
  }
  for (const block of documents['guide/data-management'].blocks) {
    if (block.type === 'image') block.src = `${screenshotPrefix}data-management.png`
  }
  for (const [slug, title] of [['access-list', '黑白名单'], ['functions', '函数管理'], ['config-migration', '配置迁移']]) {
    documents['product/demo'].blocks.push(paragraph(`**${title}**`), { type: 'image', src: `${screenshotPrefix}${slug}.png`, alt: `VelaMQ 当前${title}界面` })
  }
  additions['config-migration'].blocks.unshift({ type: 'image', src: `${screenshotPrefix}v0.0.2/config-migration.png`, alt: '系统功能下的配置迁移' })
  for (const doc of Object.values(documents)) {
    doc.title = textUpdate(doc.title)
    doc.summary = textUpdate(doc.summary)
    doc.blocks = doc.blocks.filter(b => !(b.type === 'image' && b.src.endsWith('/metrics.png')))
    for (const block of doc.blocks) {
      if (block.type === 'paragraph' || block.type === 'heading') block.text = textUpdate(block.text)
      if (block.type === 'list') block.items = block.items.map(textUpdate)
      if (block.type === 'table') {
        block.rows = block.rows.filter(row => !['指标历史', '`[metrics]`'].includes(row[0]) && row[1] !== '指标历史')
        block.rows = block.rows.map(row => row.map(textUpdate))
      }
      if (block.type === 'image' && block.src.startsWith(screenshotPrefix)) {
        block.src = block.src.replace(screenshotPrefix, `${screenshotPrefix}v0.0.2/`)
        block.alt = textUpdate(block.alt)
      }
    }
    // Recompute the TOC after removing/replacing sections.
    doc.headings = doc.blocks.filter(b => b.type === 'heading').map(({ id, level, text }) => ({ id, level, text }))
  }
  const events = documents['guide/rule-engine/events-sql'].blocks.find(b => b.type === 'table' && b.headers[0] === '事件')
  events.rows = events.rows.map(row => row.map(value => value.replaceAll('$EVENT.SUB`', '$EVENT.SUBSCRIBE`').replaceAll('$EVENT.SUB"', '$EVENT.SUBSCRIBE"').replaceAll('$EVENT.UNSUB`', '$EVENT.UNSUBSCRIBE`').replaceAll('$EVENT.UNSUB"', '$EVENT.UNSUBSCRIBE"')))
  events.rows.push(['`$EVENT.ACK`', '投递确认事件', '`SELECT * FROM "$EVENT.ACK"`'])
  // Use the current exporter's authentication and low-cardinality guidance.
  documents['api/prometheus'].blocks.unshift(paragraph(additions.monitoring.blocks.find(b => b.type === 'paragraph' && b.text.includes('两个入口')).text))
  return documents
}
