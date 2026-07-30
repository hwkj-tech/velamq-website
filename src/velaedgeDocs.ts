import type { Locale } from './content'
import type { VelaMQDocBlock, VelaMQDocDocument, VelaMQDocsCatalog } from './velamqDocs'

type Section = {
  blocks: VelaMQDocBlock[]
  id: string
  title: string
}

const createDocument = (
  id: string,
  title: string,
  summary: string,
  sourcePath: string,
  sections: Section[],
): VelaMQDocDocument => ({
  id,
  title,
  summary,
  sourcePath,
  headings: sections.map((section) => ({ id: section.id, level: 2, text: section.title })),
  blocks: sections.flatMap<VelaMQDocBlock>((section) => [
    { type: 'heading', id: section.id, level: 2, text: section.title },
    ...section.blocks,
  ]),
})

export const createVelaEdgeDocsCatalog = (locale: Locale): VelaMQDocsCatalog => {
  const isZh = locale === 'zh'
  const documents = isZh
    ? {
        overview: createDocument(
          'overview',
          'VelaEdge 产品概览',
          'VelaEdge 是面向工业现场的 Rust 云边协同设备智能平台，目前处于持续开发阶段。',
          'velaedge/overview.md',
          [
            {
              id: 'positioning',
              title: '产品定位',
              blocks: [
                {
                  type: 'paragraph',
                  text: 'VelaEdge 连接云端管理、边缘运行时与现场设备，在边缘侧完成确定性的协议采集、计算、缓存和策略校验，在云端完成设备模型、配置版本、发布治理和运行审计。',
                },
                {
                  type: 'list',
                  ordered: false,
                  items: [
                    '云端：设备模型、配置治理、版本发布与审计',
                    '边缘：协议采集、本地计算、离线存储与安全策略',
                    '设备：执行真实动作并保留硬件与 PLC 保护边界',
                  ],
                },
              ],
            },
            {
              id: 'development-stage',
              title: '当前阶段',
              blocks: [
                {
                  type: 'paragraph',
                  text: '当前文档对应 v0.1.0 开发版本，主要用于说明产品方向和已进入代码库的能力。接口、部署方式和功能边界仍可能调整，不建议直接作为生产交付承诺。',
                },
                {
                  type: 'paragraph',
                  text: '项目进展可在 [VelaEdge GitHub 仓库](https://github.com/hwkj-tech/velaedge) 查看。',
                },
              ],
            },
            {
              id: 'velamq-integration',
              title: '与 VelaMQ 协同',
              blocks: [
                {
                  type: 'paragraph',
                  text: 'VelaEdge 负责现场协议接入、边缘计算和配置执行，采集结果可通过 MQTT 上行到 VelaMQ，再进入规则、告警、数据源和业务应用。',
                },
                {
                  type: 'code',
                  language: 'text',
                  code: '现场设备 -> VelaEdge Runtime -> VelaMQ -> 规则 / 数据平台 / 业务系统',
                },
              ],
            },
          ],
        ),
        architecture: createDocument(
          'architecture',
          '云边端架构',
          'VelaEdge 通过清晰的云、边、设备职责边界，让智能辅助与真实设备执行保持隔离。',
          'velaedge/architecture.md',
          [
            {
              id: 'boundaries',
              title: '三层职责',
              blocks: [
                {
                  type: 'table',
                  headers: ['层级', '主要职责'],
                  rows: [
                    ['云端控制面', '设备模型、项目与边缘节点、配置版本、发布、审计和 AI 辅助'],
                    ['边缘运行时', '协议适配、采集任务、规则计算、本地状态、缓存和策略校验'],
                    ['现场设备', '传感、控制、固件或 PLC 逻辑，以及最终硬件保护'],
                  ],
                },
              ],
            },
            {
              id: 'data-path',
              title: '数据与配置路径',
              blocks: [
                {
                  type: 'paragraph',
                  text: '现场遥测先在边缘侧完成读取、标准化和本地持久化，再通过 EdgeLink 同步运行状态或通过 MQTT 上行数据。云端发布的配置包必须由边缘运行时再次校验后才能应用。',
                },
                {
                  type: 'code',
                  language: 'text',
                  code: 'Device -> Protocol Adapter -> Edge Runtime -> EdgeLink / MQTT -> Cloud',
                },
              ],
            },
            {
              id: 'safety',
              title: '智能与安全边界',
              blocks: [
                {
                  type: 'paragraph',
                  text: 'AI 只生成分析、配置草案或命令候选，不直接写设备寄存器。真实动作仍需经过人工治理、边缘策略校验和设备自身保护。',
                },
              ],
            },
          ],
        ),
        capabilities: createDocument(
          'capabilities',
          '当前能力',
          '以下内容反映 v0.1.0 开发分支中已经进入实现或验证流程的主要能力。',
          'velaedge/capabilities.md',
          [
            {
              id: 'edge-runtime',
              title: '边缘运行时',
              blocks: [
                {
                  type: 'list',
                  ordered: false,
                  items: [
                    'Rust 异步运行时与确定性采集流程',
                    'RocksDB 本地配置状态、离线缓存和 MQTT outbox',
                    '设备影子、采集调度、规则 DSL 与运行指标',
                    'EdgeLink 运行时主动连接和配置同步',
                  ],
                },
              ],
            },
            {
              id: 'protocols',
              title: '协议与数据上行',
              blocks: [
                {
                  type: 'table',
                  headers: ['能力', '开发版范围'],
                  rows: [
                    ['工业协议', 'Modbus TCP / RTU、DL/T 645-2007、IEC 101、受约束自定义串口帧'],
                    ['北向数据', '多路 MQTT 上行、QoS 回执与离线重放'],
                    ['本地计算', '窗口、阈值、表达式、转换、合并与条件路由'],
                  ],
                },
              ],
            },
            {
              id: 'cloud-and-ai',
              title: '云端控制与 AI 辅助',
              blocks: [
                {
                  type: 'paragraph',
                  text: '云端控制面正在覆盖项目、产品、点位、采集图、边缘节点、版本发布、运行监控和审计。AI 助手用于运维分析、知识检索和配置建议，输出保持可审阅、可追踪且不可绕过执行策略。',
                },
              ],
            },
          ],
        ),
      }
    : {
        overview: createDocument(
          'overview',
          'VelaEdge Overview',
          'VelaEdge is a Rust-based cloud-edge device intelligence platform for industrial sites and is under active development.',
          'velaedge/overview.md',
          [
            {
              id: 'positioning',
              title: 'Positioning',
              blocks: [
                {
                  type: 'paragraph',
                  text: 'VelaEdge connects cloud management, an edge runtime and field devices. Deterministic protocol collection, computation, buffering and policy checks stay at the edge, while device models, versioned configuration, release governance and audit stay in the cloud.',
                },
                {
                  type: 'list',
                  ordered: false,
                  items: [
                    'Cloud: device models, configuration governance, releases and audit',
                    'Edge: protocol collection, local computation, offline storage and safety policy',
                    'Device: physical actions, firmware or PLC logic and hard protection',
                  ],
                },
              ],
            },
            {
              id: 'development-stage',
              title: 'Current Stage',
              blocks: [
                {
                  type: 'paragraph',
                  text: 'These docs track the v0.1.0 development line and describe the product direction and capabilities already represented in the codebase. APIs, deployment and feature boundaries may still change.',
                },
                {
                  type: 'paragraph',
                  text: 'Follow progress in the [VelaEdge GitHub repository](https://github.com/hwkj-tech/velaedge).',
                },
              ],
            },
            {
              id: 'velamq-integration',
              title: 'Working with VelaMQ',
              blocks: [
                {
                  type: 'paragraph',
                  text: 'VelaEdge handles field protocols, edge computation and configuration execution. Collected data can flow through MQTT into VelaMQ, then into rules, alerts, data platforms and business applications.',
                },
                {
                  type: 'code',
                  language: 'text',
                  code: 'Field Device -> VelaEdge Runtime -> VelaMQ -> Rules / Data / Business Apps',
                },
              ],
            },
          ],
        ),
        architecture: createDocument(
          'architecture',
          'Cloud-Edge-Device Architecture',
          'VelaEdge keeps cloud, edge and device responsibilities explicit so intelligence remains separate from physical execution.',
          'velaedge/architecture.md',
          [
            {
              id: 'boundaries',
              title: 'Three Responsibility Layers',
              blocks: [
                {
                  type: 'table',
                  headers: ['Layer', 'Responsibilities'],
                  rows: [
                    ['Cloud control plane', 'Models, projects, edge fleet, configuration versions, releases, audit and AI assistance'],
                    ['Edge runtime', 'Protocol adapters, collection, local rules, state, buffering and policy validation'],
                    ['Field devices', 'Sensing, control, firmware or PLC logic and final hardware protection'],
                  ],
                },
              ],
            },
            {
              id: 'data-path',
              title: 'Data and Configuration Path',
              blocks: [
                {
                  type: 'paragraph',
                  text: 'Telemetry is read, normalized and persisted at the edge before runtime state is synchronized over EdgeLink or data is published over MQTT. Cloud configuration packages are validated again by the runtime before application.',
                },
                {
                  type: 'code',
                  language: 'text',
                  code: 'Device -> Protocol Adapter -> Edge Runtime -> EdgeLink / MQTT -> Cloud',
                },
              ],
            },
            {
              id: 'safety',
              title: 'Intelligence and Safety Boundary',
              blocks: [
                {
                  type: 'paragraph',
                  text: 'AI produces analysis, configuration drafts or command candidates. It does not write device registers directly; human governance, edge policy and device protection remain in the execution path.',
                },
              ],
            },
          ],
        ),
        capabilities: createDocument(
          'capabilities',
          'Current Capabilities',
          'This page summarizes capabilities represented in the v0.1.0 development branch.',
          'velaedge/capabilities.md',
          [
            {
              id: 'edge-runtime',
              title: 'Edge Runtime',
              blocks: [
                {
                  type: 'list',
                  ordered: false,
                  items: [
                    'Rust async runtime and deterministic collection pipeline',
                    'RocksDB configuration state, offline buffering and MQTT outbox',
                    'Device shadow, scheduling, rule DSL and runtime metrics',
                    'Runtime-initiated EdgeLink sessions and configuration synchronization',
                  ],
                },
              ],
            },
            {
              id: 'protocols',
              title: 'Protocols and Uplink',
              blocks: [
                {
                  type: 'table',
                  headers: ['Area', 'Development Scope'],
                  rows: [
                    ['Industrial protocols', 'Modbus TCP / RTU, DL/T 645-2007, IEC 101 and governed custom serial frames'],
                    ['Northbound data', 'Multiple MQTT routes, QoS receipts and offline replay'],
                    ['Local computation', 'Windows, thresholds, expressions, transforms, merges and conditional routing'],
                  ],
                },
              ],
            },
            {
              id: 'cloud-and-ai',
              title: 'Cloud Control and AI Assistance',
              blocks: [
                {
                  type: 'paragraph',
                  text: 'The control plane is evolving around projects, products, points, collection graphs, edge nodes, releases, runtime monitoring and audit. AI assistance supports operational analysis, knowledge retrieval and configuration advice while remaining reviewable, traceable and unable to bypass execution policy.',
                },
              ],
            },
          ],
        ),
      }

  return {
    locale,
    productName: 'VelaEdge',
    title: isZh ? 'VelaEdge 文档中心' : 'VelaEdge Documentation',
    eyebrow: 'VelaEdge Docs',
    body: isZh
      ? 'VelaEdge v0.1.0 开发版的产品定位、云边端架构和当前能力说明。'
      : 'Product positioning, cloud-edge-device architecture and current capabilities for the VelaEdge v0.1.0 development line.',
    searchPlaceholder: isZh ? '搜索 VelaEdge 概览与能力' : 'Search VelaEdge overview and capabilities',
    sidebarLabel: isZh ? 'VelaEdge 文档目录' : 'VelaEdge documentation navigation',
    tocLabel: isZh ? '本页内容' : 'On this page',
    versionLabel: isZh ? '文档版本' : 'Docs version',
    versionStatusLabel: isZh ? '版本状态' : 'Version status',
    commandLabel: isZh ? '开发版启动' : 'Development quickstart',
    defaultDocumentId: 'overview',
    versions: [
      {
        id: 'v0.1.0',
        label: 'v0.1.0',
        status: 'development',
        date: isZh ? 'VelaEdge v0.1.0 · 开发中' : 'VelaEdge v0.1.0 · In development',
        note: isZh ? '当前为开发版本，功能和接口可能继续调整。' : 'Development release. Features and APIs may continue to change.',
        command: 'cargo run -p cloud-api',
      },
    ],
    groups: [
      {
        title: isZh ? '快速了解' : 'Get Started',
        entries: [
          { type: 'doc', id: 'overview', label: documents.overview.title, depth: 0 },
          { type: 'doc', id: 'architecture', label: documents.architecture.title, depth: 0 },
          { type: 'doc', id: 'capabilities', label: documents.capabilities.title, depth: 0 },
        ],
      },
    ],
    documents,
  }
}
