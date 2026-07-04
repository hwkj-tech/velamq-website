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
      title: '设备数据接入与业务协同平台',
      body:
        '翰网科技面向工业、车联、能源与楼宇等场景，帮助企业把现场设备、业务系统、数据平台和运营流程连接起来，让告警、规则、看板、权限和系统集成快速落地。',
      primaryCta: '查看文档',
      secondaryCta: '查看产品',
      commandLabel: '快速开始命令',
      command: 'npm create velamq@latest business-fabric',
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
      eyebrow: 'Documentation',
      title: '把产品能力沉淀成可搜索、可复制的工程文档',
      body:
        '文档系统围绕接入、规则、告警、看板、API 与部署组织内容，让售前沟通、项目交付和客户自助接入使用同一套语言。',
      searchPlaceholder: '搜索接入方式、API、规则示例',
      sidebarLabel: '文档目录',
      tocLabel: '本页内容',
      commandLabel: '安装与初始化',
      command: 'npm create velamq@latest edge-project',
      groups: [
        { title: '开始使用', items: ['平台概览', '快速接入', '部署方式'] },
        { title: '产品能力', items: ['设备接入', '规则自动化', '业务告警', '数据看板'] },
        { title: '集成与运维', items: ['开放 API', '权限审计', '上线验证'] },
      ],
      sections: [
        {
          id: 'quickstart',
          title: '快速开始',
          text: '从业务场景出发创建接入项目，选择设备协议、业务模块和运行环境。',
          code: ['npm create velamq@latest edge-project', 'cd edge-project', 'velamq dev --profile industrial'].join('\n'),
        },
        {
          id: 'connect',
          title: '设备接入',
          text: '将现场设备、边缘网关和业务系统统一映射为数据源，后续规则和看板都基于同一模型编排。',
          code: ['source "factory-line-a" {', '  protocol = "mqtt"', '  topic = "site/+/telemetry"', '}'].join('\n'),
        },
        {
          id: 'rules',
          title: '规则与告警',
          text: '把设备事件转成通知、工单、系统动作和审计记录，让运营团队围绕同一个事件流协作。',
          code: ['when temperature > 85 for 3m', 'then alert("bearing-overheat")', 'and dispatch("maintenance-team")'].join('\n'),
        },
        {
          id: 'api',
          title: '开放 API',
          text: '通过标准接口把事件、指标、看板和处置记录同步到 ERP、MES、报表和自研系统。',
          code: ['GET /api/v1/events?source=factory-line-a', 'POST /api/v1/workflows/dispatch', 'GET /api/v1/dashboards/operations'].join('\n'),
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
    footerColumns: [
      { title: '产品', links: ['VelaMQ', 'VelaMQ Bench', '规则自动化', '数据看板'] },
      { title: '资源', links: ['文档中心', '方案沟通', '接入评估', '服务支持'] },
      { title: '公司', links: ['关于我们', '联系方式', '服务支持', companyName] },
    ],
    visual: {
      ariaLabel: '翰网科技功能与数据流动态图',
      inputLabel: '数据来源',
      inputChips: ['设备数据', '业务事件', '系统状态'],
      coreLabel: '业务能力中枢',
      coreBody: '数据流 · 业务流',
      serviceLabel: '业务协同模块',
      serviceCards: [
        { title: '业务规则', meta: '规则自动化', text: '把事件转成流程、通知和系统动作', tone: 'a' },
        { title: '业务告警', meta: '异常触达', text: '告警、处置进度与协作流程同步', tone: 'b' },
        { title: '数据看板', meta: '运营可视化', text: '设备状态、业务结果和趋势统一呈现', tone: 'c' },
      ],
      modulesLabel: '平台功能模块',
      supportModules: ['设备接入', '规则自动化', '业务告警', '数据看板'],
      flowLabel: '功能与数据流',
      flowSteps: ['数据接入', '边缘汇聚', 'VelaMQ', '规则处理', '系统集成', '运营看板'],
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
      title: 'Device Data Access and Business Collaboration Platform',
      body:
        'Hanwang Tech connects field devices, business systems, data platforms and operating workflows for industrial, connected-vehicle, energy and building scenarios.',
      primaryCta: 'Read docs',
      secondaryCta: 'View products',
      commandLabel: 'Quickstart command',
      command: 'npm create velamq@latest business-fabric',
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
      eyebrow: 'Documentation',
      title: 'Product docs for searchable, repeatable delivery',
      body:
        'The docs system organizes access, rules, alerts, dashboards, APIs and deployment notes so sales, delivery and customer teams share the same product language.',
      searchPlaceholder: 'Search access guides, APIs and rule examples',
      sidebarLabel: 'Documentation navigation',
      tocLabel: 'On this page',
      commandLabel: 'Install and initialize',
      command: 'npm create velamq@latest edge-project',
      groups: [
        { title: 'Get started', items: ['Overview', 'Quick access', 'Deployment'] },
        { title: 'Capabilities', items: ['Device access', 'Rule automation', 'Business alerts', 'Dashboards'] },
        { title: 'Integration', items: ['Open API', 'Access audit', 'Launch validation'] },
      ],
      sections: [
        {
          id: 'quickstart',
          title: 'Quickstart',
          text: 'Create an access project from a business scenario, then choose protocols, modules and runtime profile.',
          code: ['npm create velamq@latest edge-project', 'cd edge-project', 'velamq dev --profile industrial'].join('\n'),
        },
        {
          id: 'connect',
          title: 'Device access',
          text: 'Map field devices, edge gateways and business systems into shared data sources for rules and dashboards.',
          code: ['source "factory-line-a" {', '  protocol = "mqtt"', '  topic = "site/+/telemetry"', '}'].join('\n'),
        },
        {
          id: 'rules',
          title: 'Rules and alerts',
          text: 'Turn device events into notifications, work orders, system actions and audit records.',
          code: ['when temperature > 85 for 3m', 'then alert("bearing-overheat")', 'and dispatch("maintenance-team")'].join('\n'),
        },
        {
          id: 'api',
          title: 'Open API',
          text: 'Sync events, metrics, dashboards and handling records into ERP, MES, reports and internal systems.',
          code: ['GET /api/v1/events?source=factory-line-a', 'POST /api/v1/workflows/dispatch', 'GET /api/v1/dashboards/operations'].join('\n'),
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
    footerColumns: [
      { title: 'Products', links: ['VelaMQ', 'VelaMQ Bench', 'Rule automation', 'Dashboards'] },
      { title: 'Resources', links: ['Documentation', 'Solution discussion', 'Access assessment', 'Service support'] },
      { title: 'Company', links: ['About', 'Contact', 'Support', companyName] },
    ],
    visual: {
      ariaLabel: 'Hanwang Tech capability and data-flow animation',
      inputLabel: 'Data sources',
      inputChips: ['Device data', 'Business events', 'System state'],
      coreLabel: 'Business capability hub',
      coreBody: 'Data flow · business flow',
      serviceLabel: 'Business collaboration modules',
      serviceCards: [
        { title: 'Business rules', meta: 'Rule automation', text: 'Turn events into workflows, notices and system actions', tone: 'a' },
        { title: 'Business alerts', meta: 'Exception response', text: 'Sync alerts, handling progress and collaboration flows', tone: 'b' },
        { title: 'Dashboards', meta: 'Operational visibility', text: 'Unify device state, outcomes and operating trends', tone: 'c' },
      ],
      modulesLabel: 'Platform modules',
      supportModules: ['Device access', 'Rule automation', 'Business alerts', 'Dashboards'],
      flowLabel: 'Capability and data flow',
      flowSteps: ['Data access', 'Edge aggregation', 'VelaMQ', 'Rule handling', 'System integration', 'Ops dashboards'],
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
