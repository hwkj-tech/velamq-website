export const companyName = '南京翰网科技有限公司'
export const companyDisplayName = '翰网科技'

export type Locale = 'zh' | 'en'
export type ViewId = 'home' | 'product' | 'solutions' | 'platform' | 'docs' | 'support' | 'company' | 'contact'
export type ProductId = 'velamq' | 'velamq-bench'

export const viewIds: ViewId[] = ['home', 'product', 'solutions', 'platform', 'docs', 'support', 'company', 'contact']
export const productIds: ProductId[] = ['velamq', 'velamq-bench']

export const salesEmail = 'sales@hanwang.tech'
export const mailTo = `mailto:${salesEmail}`

export const viewFromHash = (hash: string): ViewId => {
  const cleanHash = hash.replace(/^#/, '')

  if (viewIds.includes(cleanHash as ViewId)) {
    return cleanHash as ViewId
  }

  if (cleanHash === 'architecture') {
    return 'platform'
  }

  if (cleanHash === 'developers') {
    return 'support'
  }

  return 'home'
}

export const translations = {
  zh: {
    lang: 'zh-CN',
    navLabel: '主导航',
    languageLabel: '语言',
    languageOptions: {
      zh: '中文',
      en: 'English',
    },
    brandHomeLabel: '翰网科技 首页',
    github: 'GitHub',
    contact: '联系销售',
    navItems: [
      { id: 'home', label: '首页', href: '#home' },
      { id: 'product', label: '产品', href: '#product' },
      { id: 'solutions', label: '解决方案', href: '#solutions' },
      { id: 'platform', label: '平台能力', href: '#platform' },
      { id: 'docs', label: '文档', href: '#docs' },
      { id: 'support', label: '服务支持', href: '#support' },
      { id: 'company', label: '关于我们', href: '#company' },
      { id: 'contact', label: '联系我们', href: '#contact' },
    ],
    hero: {
      eyebrow: ['HANWANG TECH', 'Realtime Infrastructure'],
      title: '设备数据接入\n与业务协同平台',
      body:
        '翰网科技面向工业、车联、能源与楼宇等场景，帮助企业把现场设备、业务系统、数据平台和运营流程连接起来，让告警、规则、看板、权限和系统集成快速落地。',
      primaryCta: '查看文档',
      secondaryCta: '查看产品',
      commandLabel: '业务数据流状态',
      command: 'npm create velamq@latest business-fabric',
      flowSignals: [
        { label: '现场接入', value: '设备状态实时进入' },
        { label: '规则流转', value: '事件转告警与流程' },
        { label: '运营同步', value: '结果同步业务看板' },
      ],
      signalsLabel: '平台能力摘要',
      signals: ['快速接入', '规则编排', '开放 API'],
    },
    productPage: {
      eyebrow: '产品矩阵',
      title: '产品矩阵',
      intro: 'VelaMQ 与 VelaMQ Bench 分别覆盖设备数据接入和上线验证，共同构成翰网科技的业务协同产品线。',
      selectorLabel: '选择产品',
      capabilityEyebrow: '核心功能',
      capabilityTitle: '为海量设备连接而设计',
      tagsLabelSuffix: '关键能力',
    },
    products: [
      {
        id: 'velamq',
        name: 'VelaMQ',
        label: '业务连接产品',
        summary: '设备消息与规则协同平台',
        text: '统一承接设备数据、业务事件和规则流程，帮助企业把现场状态转成告警、工单、看板和系统动作。',
        tags: ['设备接入', '规则与告警', '业务看板'],
      },
      {
        id: 'velamq-bench',
        name: 'VelaMQ Bench',
        label: '上线验证产品',
        summary: '容量评估与上线验证工具',
        text: '围绕真实业务场景做容量评估、稳定性验证和上线报告，帮助团队在扩容、迁移和发布前更有把握。',
        tags: ['容量评估', '上线验证', '报告输出'],
      },
    ],
    capabilities: [
      { title: '设备连接管理', text: '统一管理设备、网关与现场数据接入，让业务系统稳定获取一线数据。' },
      { title: '规则自动化', text: '把设备事件转成告警、工单、通知和业务流程，减少人工流转成本。' },
      { title: '业务系统集成', text: '连接 ERP、MES、数据仓库、报表平台和自研系统，让数据流向正确位置。' },
      { title: '运营可视化', text: '把设备状态、事件流转和业务结果呈现在看板中，便于日常运营管理。' },
      { title: '权限与审计', text: '支持组织、角色、访问凭据和审计记录，适配企业治理要求。' },
      { title: '边缘协同', text: '面向现场网络环境优化，支持边云协同与稳定数据回传。' },
    ],
    platform: {
      eyebrow: '平台能力',
      title: '让设备事件自然进入业务流程',
      body:
        '翰网科技把设备接入、规则判断、告警处置、权限审计和系统集成组织成可运营的业务闭环，帮助团队从数据可见走向流程可控。',
    },
    architecturePoints: [
      { title: '平稳扩展', text: '随着业务范围、设备规模和数据量增长，平台能力可以持续扩展。' },
      { title: '关键数据可靠', text: '保障业务事件、运行状态和关键记录在不同系统之间可靠流转。' },
      { title: '流程保护', text: '在业务高峰、异常事件和系统波动时保护核心流程稳定运行。' },
    ],
    cluster: {
      ariaLabel: '业务能力协同流程图',
      regions: [
        { label: '设备与现场', items: ['设备接入'] },
        { label: '业务协同', items: ['规则自动化', '告警分派', '数据看板'] },
        { label: '运营与系统', items: ['权限审计', '系统集成', '持续优化'] },
      ],
    },
    solutionsPage: {
      eyebrow: '场景方案',
      title: '让设备数据进入业务闭环',
      body: '围绕现场接入、规则自动化、告警协同、数据看板与系统集成，把分散设备和业务流程组织成可运营、可追踪、可复用的场景方案。',
      moduleLabel: '业务模块',
      outcomeLabel: '交付结果',
      overviewLabel: '方案总览',
      overviewTitle: '从现场接入到运营闭环的一条业务数据链路',
      overviewBody: '借鉴成熟物联网平台的产品表达，翰网科技把设备连接、事件处理、业务规则、数据看板和系统集成组合成可复制的交付路径。',
      metricLabel: '方案能力指标',
      metrics: [
        { value: '4 类', label: '核心行业场景' },
        { value: '5 步', label: '交付路径' },
        { value: '统一', label: '规则、告警、看板与系统集成' },
      ],
      flowLabel: '方案交付路径',
      flowSteps: [
        { title: '现场接入', text: '设备、网关、系统状态进入平台' },
        { title: '规则处理', text: '事件转成告警、通知和流程' },
        { title: '数据看板', text: '状态、趋势和结果统一呈现' },
        { title: '系统协同', text: '连接 ERP、MES、报表与自研系统' },
        { title: '运营闭环', text: '处置记录、权限审计和持续优化' },
      ],
    },
    solutions: [
      {
        title: '工业设备接入',
        text: '承接 PLC、网关、传感器与产线设备消息，让生产状态、异常事件和质量数据稳定进入业务系统。',
        visual: {
          kind: 'industrial',
          ariaLabel: '工业设备接入动态数据流图',
          inputs: ['PLC', '网关', '传感器'],
          hubCaption: '生产数据流',
          outputs: ['MES', 'ERP', '生产看板'],
        },
        modules: ['设备接入', '规则告警', '生产看板'],
        outcome: '把现场状态转成可追踪的工单、报表与运营指标，减少人工抄录和跨系统确认。',
      },
      {
        title: '车联网消息通道',
        text: '支撑车辆遥测、远程控制、OTA 与诊断事件的稳定双向通信，连接车端、平台和业务应用。',
        visual: {
          kind: 'vehicle',
          ariaLabel: '车联网数据流场景图',
          inputs: ['车辆现场', '车载终端', '诊断事件'],
          hubCaption: '车辆数据流',
          outputs: ['TSP 平台', '数据看板', '业务应用'],
        },
        modules: ['车辆数据流', '远程指令', '诊断协同'],
        outcome: '让车辆状态、告警事件和服务流程在同一条通道内流转，提升车队运营响应速度。',
      },
      {
        title: '能源与楼宇数据采集',
        text: '连接电表、储能、楼控和环境监测设备，持续汇聚运行数据并联动节能、巡检和运维流程。',
        visual: {
          kind: 'energy',
          ariaLabel: '能源与楼宇数据采集动态数据流图',
          inputs: ['电表', '储能', '楼控'],
          hubCaption: '能耗数据流',
          outputs: ['能耗看板', '巡检工单', '运维系统'],
        },
        modules: ['时序采集', '能耗看板', '运维联动'],
        outcome: '把能耗趋势、设备异常和空间状态集中呈现，帮助运营团队及时发现问题。',
      },
      {
        title: '智慧城市实时事件',
        text: '面向城市设施、视频边缘、告警和跨部门事件流提供统一消息底座，支撑多团队协同处置。',
        visual: {
          kind: 'city',
          ariaLabel: '智慧城市实时事件动态数据流图',
          inputs: ['城市设施', '视频边缘', '告警事件'],
          hubCaption: '城市事件流',
          outputs: ['指挥中心', '处置流程', '跨部门协同'],
        },
        modules: ['事件汇聚', '告警分派', '跨部门协同'],
        outcome: '将设备告警、现场事件和处置进展沉淀为可追踪记录，提升城市运行管理效率。',
      },
    ],
    supportPage: {
      boardLabel: '翰网科技交付支持看板',
      boardTitle: '交付协作看板',
      boardStatus: '上线支持',
      summary: ['业务模块', '规则流程', '看板交付', '持续优化'],
      eyebrow: '服务支持',
      title: '从评估到上线的服务支持',
      body:
        '从业务方案、现场接入、规则配置到试点验证，翰网科技提供清晰的交付路径，让团队更快完成设备数据与业务系统的协同落地。',
    },
    supportSteps: [
      { title: '需求梳理', text: '明确业务场景、设备范围、系统边界和上线目标。' },
      { title: '接入实施', text: '完成数据接入、规则配置、权限组织和看板搭建。' },
      { title: '试点验证', text: '通过 VelaMQ Bench 形成容量评估与上线建议。' },
      { title: '持续运营', text: '围绕告警、审计、报表和系统集成持续优化。' },
    ],
    docsPage: {
      eyebrow: 'VelaMQ Docs',
      title: 'VelaMQ 文档中心',
      body:
        '面向设备接入、消息路由、规则引擎、开放 API、部署运维与上线验证组织内容，让 VelaMQ 的产品能力可以被项目团队稳定复用。',
      searchPlaceholder: '搜索 VelaMQ 接入、规则、API',
      sidebarLabel: 'VelaMQ 文档目录',
      tocLabel: '本页内容',
      versionLabel: '文档版本',
      versionStatusLabel: '版本状态',
      commandLabel: '当前版本快速开始',
      groups: [
        {
          title: 'VelaMQ',
          items: [
            { id: 'overview', label: '概览' },
            { id: 'quickstart', label: '快速开始' },
            { id: 'concepts', label: '核心概念' },
          ],
        },
        {
          title: '接入与路由',
          items: [
            { id: 'access', label: '设备接入' },
            { id: 'routing', label: 'Topic 路由' },
            { id: 'rules', label: '规则引擎' },
          ],
        },
        {
          title: '运维与集成',
          items: [
            { id: 'deploy', label: '部署配置' },
            { id: 'api', label: '开放 API' },
            { id: 'bench', label: 'VelaMQ Bench' },
          ],
        },
      ],
      versions: [
        {
          id: 'v1.0',
          label: 'v1.0',
          status: 'latest',
          date: '2026 Q3',
          note: '默认面向新项目，包含规则引擎、开放 API、部署配置与 VelaMQ Bench 验证流程。',
          command: 'npm create velamq@latest edge-project',
        },
        {
          id: 'v0.9',
          label: 'v0.9',
          status: 'stable',
          date: '2026 Q2',
          note: '适合存量项目查阅，保留 0.9 系列配置结构与迁移说明。',
          command: 'npm create velamq@0.9 edge-project',
        },
        {
          id: 'main',
          label: 'main',
          status: 'preview',
          date: '开发分支',
          note: '展示即将发布的文档草案，用于评估新能力，不建议直接用于生产变更。',
          command: 'npm create velamq@next edge-project',
        },
      ],
      topics: [
        {
          id: 'overview',
          title: 'VelaMQ 概览',
          summary: 'VelaMQ 是翰网科技的设备消息与业务协同产品，负责把设备数据、业务事件和系统动作组织成可靠的数据通道。',
          sections: [
            {
              id: 'positioning',
              title: '产品定位',
              text: '统一承接现场设备、边缘网关、业务系统与数据平台之间的消息交换，让接入、规则、告警、看板和集成共享同一套语义模型。',
              code: ['field devices -> VelaMQ -> business workflows', 'telemetry + events + actions = realtime data fabric'].join('\n'),
            },
            {
              id: 'when-to-use',
              title: '适用场景',
              text: '适合工业设备接入、车联网消息通道、能源楼宇数据采集和城市实时事件等需要稳定消息底座的业务。',
              code: ['industrial/edge', 'vehicle/fleet', 'energy/building', 'city/event-stream'].join('\n'),
            },
          ],
        },
        {
          id: 'quickstart',
          title: '快速开始',
          summary: '从一个业务场景创建 VelaMQ 项目，选择协议、接入模板和运行 Profile。',
          sections: [
            {
              id: 'install',
              title: '安装与初始化',
              text: '使用当前文档版本对应的初始化命令生成项目骨架，然后根据现场类型选择运行环境。',
              code: ['npm create velamq@latest edge-project', 'cd edge-project', 'velamq dev --profile industrial'].join('\n'),
            },
            {
              id: 'project-layout',
              title: '项目结构',
              text: '项目默认拆分 source、route、rule、sink 与 dashboard 配置，便于接入和业务流程分开维护。',
              code: ['velamq.toml', 'sources/factory-line-a.toml', 'rules/temperature-alert.toml', 'sinks/erp-webhook.toml'].join('\n'),
            },
          ],
        },
        {
          id: 'concepts',
          title: '核心概念',
          summary: 'VelaMQ 用 Source、Route、Rule、Sink 四个核心对象描述从现场数据到业务动作的完整链路。',
          sections: [
            {
              id: 'source-route-sink',
              title: 'Source / Route / Sink',
              text: 'Source 描述数据来源，Route 定义消息路由，Sink 负责把结果写入业务系统、数据平台或运营看板。',
              code: ['source -> route -> sink', 'device telemetry -> normalized event -> business system'].join('\n'),
            },
            {
              id: 'rule-model',
              title: '规则模型',
              text: 'Rule 基于标准化事件进行判断，可以触发告警、通知、工单、审计记录或系统动作。',
              code: ['when event.temperature > 85 for 3m', 'then alert("bearing-overheat")', 'and dispatch("maintenance-team")'].join('\n'),
            },
          ],
        },
        {
          id: 'access',
          title: '设备接入',
          summary: '把现场设备、边缘网关和业务系统统一映射为可治理的数据源。',
          sections: [
            {
              id: 'mqtt-source',
              title: 'MQTT Source',
              text: '通过 topic 模板承接设备遥测、状态和事件，后续规则、看板和系统集成都基于同一数据模型编排。',
              code: ['source "factory-line-a" {', '  protocol = "mqtt"', '  topic = "site/+/telemetry"', '}'].join('\n'),
            },
            {
              id: 'edge-gateway',
              title: '边缘网关',
              text: '边缘侧可以先完成协议适配、数据清洗和断点续传，再把稳定的数据流送入 VelaMQ。',
              code: ['edge.gateway = "line-a"', 'buffer.mode = "durable"', 'uplink.target = "velamq.cluster"'].join('\n'),
            },
          ],
        },
        {
          id: 'routing',
          title: 'Topic 路由',
          summary: '把设备 topic、业务事件和系统动作路由到不同规则、队列或外部系统。',
          sections: [
            {
              id: 'topic-pattern',
              title: 'Topic 模式',
              text: '使用分层 topic 组织现场、设备、业务和事件类型，便于权限、规则和看板复用。',
              code: ['site/{siteId}/device/{deviceId}/telemetry', 'site/{siteId}/event/{eventType}', 'business/{module}/action/{name}'].join('\n'),
            },
            {
              id: 'route-policy',
              title: '路由策略',
              text: '根据租户、站点、设备类型、事件级别和业务模块把消息分发给对应处理链路。',
              code: ['route "critical-event" {', '  match = "site/+/event/critical"', '  sink = ["alarm-center", "audit-log"]', '}'].join('\n'),
            },
          ],
        },
        {
          id: 'rules',
          title: '规则引擎',
          summary: '将设备数据和业务事件转换为告警、通知、工单、系统动作与审计记录。',
          sections: [
            {
              id: 'rule-condition',
              title: '条件表达式',
              text: '规则支持阈值、窗口、持续时间和状态变化判断，适配设备异常、业务超时和跨系统协作。',
              code: ['when payload.temperature > 85 for 3m', 'then alert("bearing-overheat")', 'and dispatch("maintenance-team")'].join('\n'),
            },
            {
              id: 'rule-action',
              title: '动作编排',
              text: '规则动作可以同时触发告警中心、Webhook、数据写入和运营看板更新。',
              code: ['actions = [', '  "notify.ops",', '  "webhook.erp",', '  "dashboard.refresh"', ']'].join('\n'),
            },
          ],
        },
        {
          id: 'api',
          title: '开放 API',
          summary: '通过标准接口把事件、指标、规则、处置记录和看板能力交给业务系统调用。',
          sections: [
            {
              id: 'event-api',
              title: '事件接口',
              text: '查询设备事件、告警状态和处置进展，便于 ERP、MES、报表平台和自研系统集成。',
              code: ['GET /api/v1/events?source=factory-line-a', 'GET /api/v1/alerts?status=open', 'POST /api/v1/workflows/dispatch'].join('\n'),
            },
            {
              id: 'dashboard-api',
              title: '看板接口',
              text: '把运营看板、指标卡片和趋势数据嵌入业务后台，保持现场与管理视角一致。',
              code: ['GET /api/v1/dashboards/operations', 'GET /api/v1/metrics?window=15m', 'POST /api/v1/widgets/refresh'].join('\n'),
            },
          ],
        },
        {
          id: 'deploy',
          title: '部署配置',
          summary: '从试点单节点到生产集群，围绕接入规模、消息可靠性和系统集成选择部署方式。',
          sections: [
            {
              id: 'single-node',
              title: '试点环境',
              text: '单节点适合方案验证、设备接入调试和业务规则确认，建议配合 VelaMQ Bench 形成上线前评估。',
              code: ['velamq serve --profile pilot', 'velamq bench run --scenario factory-line-a'].join('\n'),
            },
            {
              id: 'cluster',
              title: '生产集群',
              text: '生产环境建议启用集群模式、持久化队列、访问审计和指标采集，保障关键业务事件稳定流转。',
              code: ['cluster.enabled = true', 'queue.durable = true', 'observability.metrics = "prometheus"'].join('\n'),
            },
          ],
        },
        {
          id: 'bench',
          title: 'VelaMQ Bench',
          summary: '用压测、容量评估和上线报告验证 VelaMQ 在真实业务场景中的吞吐、延迟与稳定性。',
          sections: [
            {
              id: 'bench-scenario',
              title: '场景建模',
              text: '按照设备数量、消息频率、规则数量和系统写入目标构建贴近真实业务的测试场景。',
              code: ['bench.scenario = "vehicle-fleet"', 'devices = 50000', 'message_rate = "120k/min"', 'rules = ["alarm", "route", "api-sync"]'].join('\n'),
            },
            {
              id: 'bench-report',
              title: '上线报告',
              text: '输出容量建议、瓶颈位置、延迟分位线和配置建议，为扩容、迁移和发布提供依据。',
              code: ['velamq bench report --format html', 'p95 latency: 8.7ms', 'recommendation: 3-node cluster'].join('\n'),
            },
          ],
        },
      ],
    },
    resources: [
      { label: '方案沟通', href: mailTo },
      { label: '接入评估', href: mailTo },
      { label: '试点落地', href: mailTo },
      { label: '服务支持', href: mailTo },
    ],
    companyPage: {
      title: '与翰网科技一起打通设备数据与业务流程',
      body: '南京翰网科技有限公司专注于设备数据接入、业务规则协同与企业级运营支持。',
      facts: ['独立公司品牌', 'VelaMQ 产品线', '交付与上线支持'],
    },
    contactPage: {
      eyebrow: '联系我们',
      title: '联系销售',
      body: '留下基础信息和业务需求，点击发送后会打开你的邮件客户端，并自动带上收件人、标题和正文。',
      directEmailLabel: '销售邮箱',
      responseTime: '通常 1 个工作日内回复',
      fields: {
        name: '姓名',
        company: '公司',
        email: '邮箱',
        message: '需求内容',
      },
      placeholders: {
        name: '例如：刘先生',
        company: '例如：南京某制造企业',
        email: '例如：name@example.com',
        message: '简单描述场景、设备规模、希望了解的产品或上线计划',
      },
      sendCta: '发送邮件',
      mailHint: '如果浏览器没有自动打开邮件客户端，可以复制销售邮箱发送。',
      subjectPrefix: '翰网科技官网咨询',
      emptyValue: '未填写',
    },
    footerText: '南京翰网科技有限公司 专注于设备数据接入、业务规则协同与企业级运营支持。',
    icp: {
      label: '网站备案号',
      number: '苏ICP备2026045547号-1',
      domain: 'velamq.com',
      href: 'https://beian.miit.gov.cn/',
    },
    footerColumns: [
      { title: '产品', links: ['VelaMQ', 'VelaMQ Bench', '规则自动化', '数据看板'] },
      { title: '资源', links: ['文档中心', '方案沟通', '接入评估', '服务支持'] },
      { title: '公司', links: ['关于我们', '联系方式', '服务支持', companyName] },
    ],
    visual: {
      ariaLabel: '翰网科技技术能力与消息流动态图',
      inputLabel: '协议接入层',
      inputChips: ['MQTT 5.0', 'MQTT over QUIC', 'WebSocket'],
      inputItems: [
        { title: 'MQTT 5.0', meta: '发布订阅', badges: ['QoS 1/2', 'Retain', 'Shared Sub'] },
        { title: 'MQTT over QUIC', meta: '0-RTT 传输', badges: ['弱网恢复', '连接迁移', '低握手'] },
        { title: 'WebSocket API', meta: '边缘网关', badges: ['REST', 'Webhook', 'Browser'] },
      ],
      coreLabel: '消息运行时',
      coreBody: 'Broker · Rule · AI',
      serviceLabel: '规则执行层',
      serviceCards: [
        { title: 'SQL 规则引擎', meta: '流式处理', text: '', tone: 'a', status: 'SQL', badges: ['Filter', 'Transform', 'Action'] },
        { title: '低延迟路由', meta: '实时分发', text: '', tone: 'b', status: 'p95 ms', badges: ['Session', 'Fanout', 'Cluster'] },
        { title: 'AI 诊断与观测', meta: '智能运维', text: '', tone: 'c', status: 'AI', badges: ['Root Cause', 'Anomaly', 'Insight'] },
      ],
      modulesLabel: '技术特性模块',
      supportModules: ['规则引擎', 'MQTT over QUIC', 'AI 诊断', 'Prometheus'],
      flowLabel: '技术能力流',
      flowSteps: ['MQTT 5', 'QUIC', 'VelaMQ', 'SQL 规则', 'AI Insight', 'Metrics'],
    },
  },
  en: {
    lang: 'en',
    navLabel: 'Main navigation',
    languageLabel: 'Language',
    languageOptions: {
      zh: '中文',
      en: 'English',
    },
    brandHomeLabel: 'Hanwang Tech Home',
    github: 'GitHub',
    contact: 'Contact sales',
    navItems: [
      { id: 'home', label: 'Home', href: '#home' },
      { id: 'product', label: 'Products', href: '#product' },
      { id: 'solutions', label: 'Solutions', href: '#solutions' },
      { id: 'platform', label: 'Platform', href: '#platform' },
      { id: 'docs', label: 'Docs', href: '#docs' },
      { id: 'support', label: 'Support', href: '#support' },
      { id: 'company', label: 'Company', href: '#company' },
      { id: 'contact', label: 'Contact', href: '#contact' },
    ],
    hero: {
      eyebrow: ['HANWANG TECH', 'Realtime Infrastructure'],
      title: 'Device Data Access\nand Business Collaboration Platform',
      body:
        'Hanwang Tech connects field devices, business systems, data platforms and operating workflows for industrial, connected-vehicle, energy and building scenarios.',
      primaryCta: 'Read docs',
      secondaryCta: 'View products',
      commandLabel: 'Business data-flow status',
      command: 'npm create velamq@latest business-fabric',
      flowSignals: [
        { label: 'Field access', value: 'Device state in real time' },
        { label: 'Rule flow', value: 'Events become workflows' },
        { label: 'Ops sync', value: 'Results reach dashboards' },
      ],
      signalsLabel: 'Platform capability summary',
      signals: ['Quick access', 'Rule orchestration', 'Open API'],
    },
    productPage: {
      eyebrow: 'Products',
      title: 'Products',
      intro: 'VelaMQ and VelaMQ Bench cover device data access and launch validation as two focused product lines.',
      selectorLabel: 'Select product',
      capabilityEyebrow: 'Core capabilities',
      capabilityTitle: 'Designed for large-scale device connectivity',
      tagsLabelSuffix: 'key capabilities',
    },
    products: [
      {
        id: 'velamq',
        name: 'VelaMQ',
        label: 'Business connectivity product',
        summary: 'Device messaging and rule collaboration platform',
        text: 'Unifies device data, business events and rules so teams can turn field state into alerts, workflows, dashboards and system actions.',
        tags: ['Device access', 'Rules and alerts', 'Business dashboards'],
      },
      {
        id: 'velamq-bench',
        name: 'VelaMQ Bench',
        label: 'Launch validation product',
        summary: 'Capacity assessment and launch validation tool',
        text: 'Validates capacity, stability and release readiness around real business scenarios before scaling, migration or production launch.',
        tags: ['Capacity assessment', 'Launch validation', 'Report output'],
      },
    ],
    capabilities: [
      { title: 'Device connection management', text: 'Manage device, gateway and field-data access so business systems receive reliable data.' },
      { title: 'Rule automation', text: 'Turn device events into alerts, tickets, notifications and business workflows.' },
      { title: 'Business system integration', text: 'Connect ERP, MES, data warehouses, reporting tools and in-house systems.' },
      { title: 'Operational visibility', text: 'Show device state, event handling and business outcomes in operational dashboards.' },
      { title: 'Access and audit', text: 'Support organizations, roles, credentials and audit records for enterprise governance.' },
      { title: 'Edge coordination', text: 'Optimize for field networks and support stable edge-to-cloud data return.' },
    ],
    platform: {
      eyebrow: 'Platform',
      title: 'Let device events flow naturally into business processes',
      body:
        'Hanwang Tech organizes access, rules, alerts, audit and integration into an operational loop so teams move from visible data to controlled workflows.',
    },
    architecturePoints: [
      { title: 'Smooth scaling', text: 'Platform capabilities can grow with business scope, device scale and data volume.' },
      { title: 'Reliable key data', text: 'Business events, operating state and critical records move reliably between systems.' },
      { title: 'Process protection', text: 'Protect core workflows during peaks, incidents and system fluctuation.' },
    ],
    cluster: {
      ariaLabel: 'Business capability collaboration diagram',
      regions: [
        { label: 'Devices and field', items: ['Device access'] },
        { label: 'Business collaboration', items: ['Rule automation', 'Alert dispatch', 'Dashboards'] },
        { label: 'Operations and systems', items: ['Access audit', 'System integration', 'Continuous optimization'] },
      ],
    },
    solutionsPage: {
      eyebrow: 'Solutions',
      title: 'Turn device data into business loops',
      body: 'Hanwang Tech combines field access, rule automation, alert collaboration, dashboards and system integration into repeatable solutions for operational scenarios.',
      moduleLabel: 'Modules',
      outcomeLabel: 'Outcome',
      overviewLabel: 'Overview',
      overviewTitle: 'One business data path from field access to operational closure',
      overviewBody: 'Inspired by mature IoT platform storytelling, Hanwang Tech packages connectivity, event handling, business rules, dashboards and integration into a repeatable delivery path.',
      metricLabel: 'Solution capability metrics',
      metrics: [
        { value: '4', label: 'Core industry scenarios' },
        { value: '5', label: 'Delivery stages' },
        { value: 'Unified', label: 'Rules, alerts, dashboards and integration' },
      ],
      flowLabel: 'Solution delivery path',
      flowSteps: [
        { title: 'Field access', text: 'Devices, gateways and system state enter the platform' },
        { title: 'Rule handling', text: 'Events become alerts, notices and workflows' },
        { title: 'Dashboards', text: 'State, trends and outcomes become visible' },
        { title: 'System sync', text: 'Connect ERP, MES, reports and in-house systems' },
        { title: 'Ops loop', text: 'Records, audit and continuous improvement' },
      ],
    },
    solutions: [
      {
        title: 'Industrial device access',
        text: 'Connect PLCs, gateways, sensors and production equipment so production state, incidents and quality data reach business systems reliably.',
        visual: {
          kind: 'industrial',
          ariaLabel: 'Industrial device access animated data-flow diagram',
          inputs: ['PLC', 'Gateway', 'Sensors'],
          hubCaption: 'production data flow',
          outputs: ['MES', 'ERP', 'Production board'],
        },
        modules: ['Device access', 'Rules and alerts', 'Production dashboards'],
        outcome: 'Turn field state into traceable tickets, reports and operating metrics with less manual reconciliation.',
      },
      {
        title: 'Connected vehicle channel',
        text: 'Support telemetry, remote control, OTA and diagnostics with stable bidirectional messaging across vehicles, platforms and apps.',
        visual: {
          kind: 'vehicle',
          ariaLabel: 'Connected vehicle data-flow scene',
          inputs: ['Vehicle field', 'Onboard unit', 'Diagnostics'],
          hubCaption: 'vehicle data flow',
          outputs: ['TSP platform', 'Dashboards', 'Business apps'],
        },
        modules: ['Vehicle data flow', 'Remote commands', 'Diagnostics'],
        outcome: 'Move vehicle state, alerts and service workflows through one channel for faster fleet operations.',
      },
      {
        title: 'Energy and building data',
        text: 'Connect meters, storage, building controls and environmental monitoring to drive energy, inspection and maintenance workflows.',
        visual: {
          kind: 'energy',
          ariaLabel: 'Energy and building data animated data-flow diagram',
          inputs: ['Meters', 'Storage', 'BMS'],
          hubCaption: 'energy data flow',
          outputs: ['Energy board', 'Work orders', 'Ops systems'],
        },
        modules: ['Time-series access', 'Energy dashboards', 'Maintenance flows'],
        outcome: 'Centralize consumption trends, device exceptions and space status for quicker operational response.',
      },
      {
        title: 'Smart city events',
        text: 'Provide a unified message foundation for city facilities, edge video, alerts and cross-team incident response.',
        visual: {
          kind: 'city',
          ariaLabel: 'Smart city event animated data-flow diagram',
          inputs: ['Facilities', 'Edge video', 'Alerts'],
          hubCaption: 'city event flow',
          outputs: ['Command center', 'Response flow', 'Cross-team sync'],
        },
        modules: ['Event intake', 'Alert dispatch', 'Cross-team workflows'],
        outcome: 'Record alerts, field events and response progress in a traceable operating flow.',
      },
    ],
    supportPage: {
      boardLabel: 'Hanwang Tech delivery support board',
      boardTitle: 'Delivery board',
      boardStatus: 'Launch support',
      summary: ['Business modules', 'Rule flows', 'Dashboard delivery', 'Continuous improvement'],
      eyebrow: 'Support',
      title: 'Support from assessment to launch',
      body:
        'From solution planning and field access to rule configuration and pilot validation, Hanwang Tech provides a clear path for device-data collaboration.',
    },
    supportSteps: [
      { title: 'Requirement discovery', text: 'Clarify scenarios, device scope, system boundaries and launch goals.' },
      { title: 'Access implementation', text: 'Complete data access, rules, permissions and dashboard setup.' },
      { title: 'Pilot validation', text: 'Use VelaMQ Bench to produce capacity assessment and launch recommendations.' },
      { title: 'Continuous operation', text: 'Optimize alerts, audit, reporting and integration after launch.' },
    ],
    docsPage: {
      eyebrow: 'VelaMQ Docs',
      title: 'VelaMQ Documentation',
      body:
        'Guides for device access, message routing, rules, open APIs, operations and launch validation so teams can reuse VelaMQ consistently across projects.',
      searchPlaceholder: 'Search VelaMQ access, rules and APIs',
      sidebarLabel: 'VelaMQ documentation navigation',
      tocLabel: 'On this page',
      versionLabel: 'Docs version',
      versionStatusLabel: 'Version status',
      commandLabel: 'Quickstart for this version',
      groups: [
        {
          title: 'VelaMQ',
          items: [
            { id: 'overview', label: 'Overview' },
            { id: 'quickstart', label: 'Quickstart' },
            { id: 'concepts', label: 'Core concepts' },
          ],
        },
        {
          title: 'Access and routing',
          items: [
            { id: 'access', label: 'Device access' },
            { id: 'routing', label: 'Topic routing' },
            { id: 'rules', label: 'Rules engine' },
          ],
        },
        {
          title: 'Operations',
          items: [
            { id: 'deploy', label: 'Deployment' },
            { id: 'api', label: 'Open API' },
            { id: 'bench', label: 'VelaMQ Bench' },
          ],
        },
      ],
      versions: [
        {
          id: 'v1.0',
          label: 'v1.0',
          status: 'latest',
          date: '2026 Q3',
          note: 'Default documentation for new projects, including rules, open APIs, deployment configuration and VelaMQ Bench validation.',
          command: 'npm create velamq@latest edge-project',
        },
        {
          id: 'v0.9',
          label: 'v0.9',
          status: 'stable',
          date: '2026 Q2',
          note: 'For existing projects that still use the 0.9 configuration layout and migration notes.',
          command: 'npm create velamq@0.9 edge-project',
        },
        {
          id: 'main',
          label: 'main',
          status: 'preview',
          date: 'development branch',
          note: 'Draft documentation for upcoming capabilities. Use it for evaluation, not production changes.',
          command: 'npm create velamq@next edge-project',
        },
      ],
      topics: [
        {
          id: 'overview',
          title: 'VelaMQ overview',
          summary: 'VelaMQ is Hanwang Tech’s device messaging and business collaboration product for reliable real-time data channels.',
          sections: [
            {
              id: 'positioning',
              title: 'Product position',
              text: 'VelaMQ unifies messages between field devices, edge gateways, business systems and data platforms so access, rules, alerts, dashboards and integrations share one model.',
              code: ['field devices -> VelaMQ -> business workflows', 'telemetry + events + actions = realtime data fabric'].join('\n'),
            },
            {
              id: 'when-to-use',
              title: 'When to use it',
              text: 'Use it for industrial equipment, connected vehicles, energy and buildings, and city-scale event streams that need a dependable message foundation.',
              code: ['industrial/edge', 'vehicle/fleet', 'energy/building', 'city/event-stream'].join('\n'),
            },
          ],
        },
        {
          id: 'quickstart',
          title: 'Quickstart',
          summary: 'Create a VelaMQ project from a business scenario, then choose the protocol, template and runtime profile.',
          sections: [
            {
              id: 'install',
              title: 'Install and initialize',
              text: 'Use the initialization command for the selected docs version, then choose the runtime profile for your field environment.',
              code: ['npm create velamq@latest edge-project', 'cd edge-project', 'velamq dev --profile industrial'].join('\n'),
            },
            {
              id: 'project-layout',
              title: 'Project layout',
              text: 'Projects separate source, route, rule, sink and dashboard configuration so access and business workflows can evolve independently.',
              code: ['velamq.toml', 'sources/factory-line-a.toml', 'rules/temperature-alert.toml', 'sinks/erp-webhook.toml'].join('\n'),
            },
          ],
        },
        {
          id: 'concepts',
          title: 'Core concepts',
          summary: 'VelaMQ describes the full path from field data to business action with Source, Route, Rule and Sink.',
          sections: [
            {
              id: 'source-route-sink',
              title: 'Source / Route / Sink',
              text: 'Source describes data origins, Route controls message delivery, and Sink writes results to business systems, data platforms or dashboards.',
              code: ['source -> route -> sink', 'device telemetry -> normalized event -> business system'].join('\n'),
            },
            {
              id: 'rule-model',
              title: 'Rule model',
              text: 'Rules evaluate normalized events and can trigger alerts, notifications, work orders, audit records or system actions.',
              code: ['when event.temperature > 85 for 3m', 'then alert("bearing-overheat")', 'and dispatch("maintenance-team")'].join('\n'),
            },
          ],
        },
        {
          id: 'access',
          title: 'Device access',
          summary: 'Map field devices, edge gateways and business systems into governed data sources.',
          sections: [
            {
              id: 'mqtt-source',
              title: 'MQTT source',
              text: 'Use topic templates for telemetry, status and events. Rules, dashboards and integrations work from the same normalized model.',
              code: ['source "factory-line-a" {', '  protocol = "mqtt"', '  topic = "site/+/telemetry"', '}'].join('\n'),
            },
            {
              id: 'edge-gateway',
              title: 'Edge gateway',
              text: 'At the edge, adapters can clean data, buffer messages and resume delivery before sending stable streams into VelaMQ.',
              code: ['edge.gateway = "line-a"', 'buffer.mode = "durable"', 'uplink.target = "velamq.cluster"'].join('\n'),
            },
          ],
        },
        {
          id: 'routing',
          title: 'Topic routing',
          summary: 'Route device topics, business events and system actions to rules, queues and external systems.',
          sections: [
            {
              id: 'topic-pattern',
              title: 'Topic patterns',
              text: 'Use hierarchical topics for site, device, business and event types so permissions, rules and dashboards remain reusable.',
              code: ['site/{siteId}/device/{deviceId}/telemetry', 'site/{siteId}/event/{eventType}', 'business/{module}/action/{name}'].join('\n'),
            },
            {
              id: 'route-policy',
              title: 'Route policy',
              text: 'Route messages by tenant, site, device type, severity and business module into the right processing path.',
              code: ['route "critical-event" {', '  match = "site/+/event/critical"', '  sink = ["alarm-center", "audit-log"]', '}'].join('\n'),
            },
          ],
        },
        {
          id: 'rules',
          title: 'Rules engine',
          summary: 'Convert device data and business events into alerts, notifications, work orders, system actions and audit records.',
          sections: [
            {
              id: 'rule-condition',
              title: 'Conditions',
              text: 'Rules support thresholds, windows, durations and state transitions for device exceptions, business timeouts and cross-system workflows.',
              code: ['when payload.temperature > 85 for 3m', 'then alert("bearing-overheat")', 'and dispatch("maintenance-team")'].join('\n'),
            },
            {
              id: 'rule-action',
              title: 'Actions',
              text: 'A rule can update the alert center, call webhooks, write data and refresh operational dashboards at the same time.',
              code: ['actions = [', '  "notify.ops",', '  "webhook.erp",', '  "dashboard.refresh"', ']'].join('\n'),
            },
          ],
        },
        {
          id: 'api',
          title: 'Open API',
          summary: 'Expose events, metrics, rules, handling records and dashboards to business systems.',
          sections: [
            {
              id: 'event-api',
              title: 'Event API',
              text: 'Query device events, alert status and handling progress for ERP, MES, reporting platforms and internal systems.',
              code: ['GET /api/v1/events?source=factory-line-a', 'GET /api/v1/alerts?status=open', 'POST /api/v1/workflows/dispatch'].join('\n'),
            },
            {
              id: 'dashboard-api',
              title: 'Dashboard API',
              text: 'Embed dashboards, metric cards and trend data into operational portals so field and management views stay aligned.',
              code: ['GET /api/v1/dashboards/operations', 'GET /api/v1/metrics?window=15m', 'POST /api/v1/widgets/refresh'].join('\n'),
            },
          ],
        },
        {
          id: 'deploy',
          title: 'Deployment',
          summary: 'Choose a deployment model from pilot single-node to production clusters based on access scale, reliability and integrations.',
          sections: [
            {
              id: 'single-node',
              title: 'Pilot environment',
              text: 'Single-node deployment works for solution validation, access debugging and rule confirmation. Use VelaMQ Bench before launch.',
              code: ['velamq serve --profile pilot', 'velamq bench run --scenario factory-line-a'].join('\n'),
            },
            {
              id: 'cluster',
              title: 'Production cluster',
              text: 'For production, enable clustering, durable queues, access auditing and metrics to keep critical business events reliable.',
              code: ['cluster.enabled = true', 'queue.durable = true', 'observability.metrics = "prometheus"'].join('\n'),
            },
          ],
        },
        {
          id: 'bench',
          title: 'VelaMQ Bench',
          summary: 'Validate VelaMQ throughput, latency and stability with load tests, capacity assessment and launch reports.',
          sections: [
            {
              id: 'bench-scenario',
              title: 'Scenario model',
              text: 'Model tests around device count, message rate, rule count and system write targets for realistic business validation.',
              code: ['bench.scenario = "vehicle-fleet"', 'devices = 50000', 'message_rate = "120k/min"', 'rules = ["alarm", "route", "api-sync"]'].join('\n'),
            },
            {
              id: 'bench-report',
              title: 'Launch report',
              text: 'Produce capacity advice, bottlenecks, latency percentiles and configuration recommendations for scaling, migration and release decisions.',
              code: ['velamq bench report --format html', 'p95 latency: 8.7ms', 'recommendation: 3-node cluster'].join('\n'),
            },
          ],
        },
      ],
    },
    resources: [
      { label: 'Solution discussion', href: mailTo },
      { label: 'Access assessment', href: mailTo },
      { label: 'Pilot launch', href: mailTo },
      { label: 'Service support', href: mailTo },
    ],
    companyPage: {
      title: 'Connect device data with business workflows',
      body: 'Nanjing Hanwang Technology Co., Ltd. focuses on device data access, business rule collaboration and enterprise operational support.',
      facts: ['Independent company brand', 'VelaMQ product line', 'Delivery and launch support'],
    },
    contactPage: {
      eyebrow: 'Contact',
      title: 'Contact sales',
      body: 'Share the basics and your business need. The send link opens your email app with the recipient, subject and body already filled in.',
      directEmailLabel: 'Sales email',
      responseTime: 'Usually replies within one business day',
      fields: {
        name: 'Name',
        company: 'Company',
        email: 'Email',
        message: 'Message',
      },
      placeholders: {
        name: 'Example: Alex',
        company: 'Example: Acme Manufacturing',
        email: 'Example: name@example.com',
        message: 'Describe the scenario, device scale, product interest or launch plan',
      },
      sendCta: 'Send email',
      mailHint: 'If your browser does not open an email app automatically, copy the sales address and send it manually.',
      subjectPrefix: 'Hanwang Tech website inquiry',
      emptyValue: 'Not provided',
    },
    footerText: 'Nanjing Hanwang Technology Co., Ltd. focuses on device data access, rule collaboration and enterprise operations.',
    icp: {
      label: 'ICP filing',
      number: '苏ICP备2026045547号-1',
      domain: 'velamq.com',
      href: 'https://beian.miit.gov.cn/',
    },
    footerColumns: [
      { title: 'Products', links: ['VelaMQ', 'VelaMQ Bench', 'Rule automation', 'Dashboards'] },
      { title: 'Resources', links: ['Documentation', 'Solution discussion', 'Access assessment', 'Service support'] },
      { title: 'Company', links: ['About', 'Contact', 'Support', companyName] },
    ],
    visual: {
      ariaLabel: 'Hanwang Tech technical capabilities and message-flow animation',
      inputLabel: 'Protocol Mesh',
      inputChips: ['MQTT 5.0', 'MQTT over QUIC', 'WebSocket'],
      inputItems: [
        { title: 'MQTT 5.0', meta: 'Pub/Sub', badges: ['QoS 1/2', 'Retain', 'Shared Sub'] },
        { title: 'MQTT over QUIC', meta: '0-RTT Transport', badges: ['Recovery', 'Migration', 'Low Handshake'] },
        { title: 'WebSocket API', meta: 'Edge Gateway', badges: ['REST', 'Webhook', 'Browser'] },
      ],
      coreLabel: 'Message Runtime',
      coreBody: 'Broker · Rule · AI',
      serviceLabel: 'Execution Layer',
      serviceCards: [
        { title: 'SQL Rule Engine', meta: 'Stream Processing', text: '', tone: 'a', status: 'SQL', badges: ['Filter', 'Transform', 'Action'] },
        { title: 'Low-latency Route', meta: 'Realtime Dispatch', text: '', tone: 'b', status: 'p95 ms', badges: ['Session', 'Fanout', 'Cluster'] },
        { title: 'AI Ops Copilot', meta: 'Intelligent Ops', text: '', tone: 'c', status: 'AI', badges: ['Root Cause', 'Anomaly', 'Insight'] },
      ],
      modulesLabel: 'Technical feature modules',
      supportModules: ['Rule Engine', 'MQTT over QUIC', 'AI Diagnosis', 'Prometheus'],
      flowLabel: 'Technical capability flow',
      flowSteps: ['MQTT 5', 'QUIC', 'VelaMQ', 'SQL Rules', 'AI Insight', 'Metrics'],
    },
  },
} as const

export type SiteCopy = (typeof translations)[Locale]
export type NavItem = SiteCopy['navItems'][number]
export type ProductCard = SiteCopy['products'][number]
export type SolutionCard = SiteCopy['solutions'][number]
export type SolutionVisualContent = SolutionCard['visual']
export type VisualContent = SiteCopy['visual']
export type ClusterContent = SiteCopy['cluster']
