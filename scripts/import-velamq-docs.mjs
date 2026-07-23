import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const repoRoot = path.resolve(import.meta.dirname, '..')
const defaultDocsRoot = fs.existsSync('/Users/lulu/Work/velamq-rs-doc')
  ? '/Users/lulu/Work/velamq-rs-doc'
  : '/Users/lulu/Work/fluxmq-rs-doc'
const sourceRoot = process.env.VELAMQ_DOCS_ROOT ?? defaultDocsRoot
const outputFile = path.join(repoRoot, 'src/velamqDocs.ts')
const assetOutputDir = path.join(repoRoot, 'public/velamq-docs')
const currentVelaMQVersion = '0.0.1'
const currentVelaMQVersionLabel = `v${currentVelaMQVersion}`

const zhDocsDir = path.join(sourceRoot, 'docs')
const enDocsDir = path.join(sourceRoot, 'i18n/en/docusaurus-plugin-content-docs/version-3.0.0')
const sidebarPath = path.join(sourceRoot, 'sidebars.js')
const enTranslationsPath = path.join(sourceRoot, 'i18n/en/docusaurus-plugin-content-docs/version-3.0.0.json')

const screenshotNames = new Set()
const datasourceVisuals = {
  'guide/datasources/overview': {
    slug: 'overview',
    title: '数据源总览',
    subtitle: '统一外部系统连接',
    group: 'Datasource Hub',
    fields: ['类型选择', '连接参数', '健康状态', '规则绑定'],
    route: ['认证', '规则', '指令', '看板'],
  },
  'guide/datasources/log': {
    slug: 'log',
    title: 'Log 数据源',
    subtitle: '本地文件写入',
    group: 'File Sink',
    fields: ['path', 'file_name', 'append', 'rotate'],
    route: ['Rule', 'JSON', 'File'],
  },
  'guide/datasources/http': {
    slug: 'http',
    title: 'HTTP 数据源',
    subtitle: 'Webhook 与业务回调',
    group: 'Webhook',
    fields: ['url', 'method', 'headers', 'timeout'],
    route: ['Rule', 'Template', 'HTTP'],
  },
  'guide/datasources/object-search-loki': {
    slug: 'object-search-loki',
    title: '对象存储 / 搜索 / Loki',
    subtitle: '归档、检索与日志流',
    group: 'Archive & Search',
    fields: ['S3', 'Elasticsearch', 'OpenSearch', 'Loki'],
    route: ['Event', 'Index', 'Query'],
  },
  'guide/datasources/sql': {
    slug: 'sql',
    title: 'SQL 通用配置',
    subtitle: '关系型与 SQL-like 后端',
    group: 'SQL Pool',
    fields: ['driver', 'dsn', 'pool_size', 'test_sql'],
    route: ['Auth', 'Rule', 'Query'],
  },
  'guide/datasources/sql-postgresql': {
    slug: 'postgresql',
    title: 'PostgreSQL',
    subtitle: '业务库与时序扩展',
    group: 'SQL Datasource',
    fields: ['host', 'database', 'ssl_mode', 'pool'],
    route: ['SQL', 'Rule', 'PostgreSQL'],
  },
  'guide/datasources/sql-mysql': {
    slug: 'mysql',
    title: 'MySQL / MariaDB',
    subtitle: '业务系统集成',
    group: 'SQL Datasource',
    fields: ['host', 'schema', 'charset', 'pool'],
    route: ['SQL', 'Rule', 'MySQL'],
  },
  'guide/datasources/sql-sqlite': {
    slug: 'sqlite',
    title: 'SQLite',
    subtitle: '边缘节点本地落盘',
    group: 'Edge SQL',
    fields: ['path', 'journal_mode', 'busy_timeout', 'table'],
    route: ['Edge', 'Rule', 'SQLite'],
  },
  'guide/datasources/sql-clickhouse': {
    slug: 'clickhouse',
    title: 'ClickHouse',
    subtitle: '高吞吐分析写入',
    group: 'Analytics SQL',
    fields: ['endpoint', 'database', 'batch_size', 'compression'],
    route: ['Telemetry', 'Batch', 'ClickHouse'],
  },
  'guide/datasources/sql-tdengine': {
    slug: 'tdengine',
    title: 'TDengine',
    subtitle: '设备时序数据',
    group: 'Time Series SQL',
    fields: ['dsn', 'stable', 'tags', 'timestamp'],
    route: ['Telemetry', 'TSDB', 'TDengine'],
  },
  'guide/datasources/sql-oracle': {
    slug: 'oracle',
    title: 'Oracle',
    subtitle: '企业既有业务库',
    group: 'Enterprise SQL',
    fields: ['service_name', 'wallet', 'pool', 'oci'],
    route: ['Rule', 'OCI', 'Oracle'],
  },
  'guide/datasources/kafka': {
    slug: 'kafka',
    title: 'Kafka',
    subtitle: '高吞吐消息流',
    group: 'Message Queue',
    fields: ['brokers', 'topic', 'acks', 'compression'],
    route: ['MQTT', 'Rule', 'Kafka'],
  },
  'guide/datasources/pulsar': {
    slug: 'pulsar',
    title: 'Pulsar',
    subtitle: '多租户消息流',
    group: 'Message Queue',
    fields: ['service_url', 'tenant', 'namespace', 'topic'],
    route: ['MQTT', 'Rule', 'Pulsar'],
  },
  'guide/datasources/rocketmq': {
    slug: 'rocketmq',
    title: 'RocketMQ',
    subtitle: '企业消息总线',
    group: 'Message Queue',
    fields: ['proxy_addr', 'topic', 'group', 'retry'],
    route: ['Event', 'Proxy', 'RocketMQ'],
  },
  'guide/datasources/rabbitmq': {
    slug: 'rabbitmq',
    title: 'RabbitMQ',
    subtitle: 'AMQP 工作流',
    group: 'Message Queue',
    fields: ['uri', 'exchange', 'routing_key', 'confirm'],
    route: ['Rule', 'AMQP', 'RabbitMQ'],
  },
  'guide/datasources/redis': {
    slug: 'redis',
    title: 'Redis',
    subtitle: '缓存与短期状态',
    group: 'NoSQL Cache',
    fields: ['url', 'db', 'key_prefix', 'ttl'],
    route: ['State', 'Cache', 'Redis'],
  },
  'guide/datasources/mongodb': {
    slug: 'mongodb',
    title: 'MongoDB',
    subtitle: '文档型事件存储',
    group: 'Document Store',
    fields: ['uri', 'database', 'collection', 'write_concern'],
    route: ['Event', 'Document', 'MongoDB'],
  },
  'guide/datasources/influxdb': {
    slug: 'influxdb',
    title: 'InfluxDB',
    subtitle: '指标与遥测写入',
    group: 'Time Series',
    fields: ['url', 'org', 'bucket', 'measurement'],
    route: ['Telemetry', 'Metric', 'InfluxDB'],
  },
  'guide/datasources/mqtt': {
    slug: 'mqtt',
    title: 'MQTT',
    subtitle: '边云桥接与转发',
    group: 'MQTT Bridge',
    fields: ['broker_url', 'client_id', 'topic', 'qos'],
    route: ['Broker', 'Bridge', 'MQTT'],
  },
}

const sidebarsModule = await import(pathToFileURL(sidebarPath).href)
const sidebars = sidebarsModule.default ?? sidebarsModule
const sidebarDocs = sidebars.docs ?? []
const enTranslations = JSON.parse(fs.readFileSync(enTranslationsPath, 'utf8'))

const translateCategory = (locale, label) => {
  if (locale === 'zh') {
    return label
  }

  return enTranslations[`sidebar.docs.category.${label}`]?.message ?? label
}

const walkDocFiles = (dir) => {
  const files = []

  const walk = (currentDir) => {
    for (const entry of fs.readdirSync(currentDir, { withFileTypes: true })) {
      const entryPath = path.join(currentDir, entry.name)

      if (entry.isDirectory()) {
        walk(entryPath)
        continue
      }

      if (entry.isFile() && /\.(md|mdx)$/.test(entry.name)) {
        files.push(entryPath)
      }
    }
  }

  walk(dir)
  return files.sort()
}

const toDocId = (filePath, docsDir) => {
  const relative = path.relative(docsDir, filePath).replaceAll(path.sep, '/')
  return relative.replace(/\.(md|mdx)$/, '')
}

const extractFrontmatter = (raw) => {
  if (!raw.startsWith('---\n')) {
    return { metadata: {}, body: raw }
  }

  const end = raw.indexOf('\n---', 4)
  if (end === -1) {
    return { metadata: {}, body: raw }
  }

  const frontmatter = raw.slice(4, end).trim()
  const metadata = {}

  for (const line of frontmatter.split('\n')) {
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/)
    if (match) {
      metadata[match[1]] = match[2].replace(/^['"]|['"]$/g, '')
    }
  }

  return { metadata, body: raw.slice(end + 5).replace(/^\n/, '') }
}

const cleanInlineHtml = (line) =>
  line
    .replace(/\{' '\}/g, ' ')
    .replace(/<code>([\s\S]*?)<\/code>/g, '`$1`')
    .replace(/<strong>([\s\S]*?)<\/strong>/g, '**$1**')
    .replace(/<span[^>]*>([\s\S]*?)<\/span>/g, '$1')
    .replace(/<p[^>]*>([\s\S]*?)<\/p>/g, '$1')
    .replace(/<li[^>]*>([\s\S]*?)<\/li>/g, '- $1')
    .replace(/<h1[^>]*>([\s\S]*?)<\/h1>/g, '# $1')
    .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/g, '## $1')
    .replace(/<h3[^>]*>([\s\S]*?)<\/h3>/g, '### $1')
    .replace(/<Link[^>]*to="([^"]+)"[^>]*>([\s\S]*?)<\/Link>/g, (_, href, text) => {
      const label = cleanInlineHtml(text).replace(/<[^>]+>/g, '').trim()
      return label ? `[${label}](${href})` : ''
    })
    .replace(/<[^>]+>/g, ' ')
    .replace(/[ \t]+/g, ' ')
    .trim()

const rewriteAssetPath = (assetPath) => {
  if (assetPath.startsWith('/img/')) {
    return `/velamq-docs${assetPath}`
  }

  if (assetPath.startsWith('/videos/')) {
    return `/velamq-docs${assetPath}`
  }

  return assetPath
}

const normalizeProductText = (text) =>
  text
    .replace(/FluxMQ/g, 'VelaMQ')
    .replace(/fluxmq-rs-doc/g, 'velamq-rs-doc')
    .replace(/fluxmqd/g, 'velamqd')
    .replace(/FLUXMQD/g, 'VELAMQD')
    .replace(/FLUXMQ_/g, 'VELAMQ_')
    .replace(/fluxmq/g, 'velamq')
    .replace(/VelaMQ 3\.0/g, `VelaMQ ${currentVelaMQVersion}`)
    .replace(/\b3\.0\.0\b/g, currentVelaMQVersion)
    .replace(/\b3\.1\.0\b/g, '0.0.2')
    .replace(/velamq-3-architecture\.svg/g, 'velamq-architecture.svg')

const preprocessBody = (body) => {
  let normalized = body
    .replace(/<h1>\s*(?:FluxMQ|VelaMQ)(?:\s+\d+(?:\.\d+)*)?\s*<\/h1>/g, '<h1>VelaMQ</h1>')
    .replace(/<Screenshot\s+name="([^"]+)"\s+alt="([^"]+)"\s*\/>/g, (_, name, alt) => {
      screenshotNames.add(name)
      return `\n![${normalizeProductText(alt)}](/velamq-docs/img/screenshots/${name}.png)\n`
    })
    .replace(/<video[\s\S]*?src="([^"]+)"[\s\S]*?\/>/g, (_, src) => `\n@@VIDEO|${rewriteAssetPath(src)}|VelaMQ demo video@@\n`)
    .replace(/<img[\s\S]*?src="([^"]+)"[\s\S]*?alt="([^"]+)"[\s\S]*?\/>/g, (_, src, alt) => {
      const normalizedAlt = normalizeProductText(alt)
      const displayAlt = src.includes('architecture/')
        ? normalizedAlt.replace(`VelaMQ ${currentVelaMQVersion}`, 'VelaMQ')
        : normalizedAlt
      return `\n![${displayAlt}](${rewriteAssetPath(src)})\n`
    })

  const output = []
  let inCode = false

  for (const rawLine of normalized.split('\n')) {
    const trimmed = rawLine.trim()

    if (trimmed.startsWith('```')) {
      inCode = !inCode
      output.push(rawLine)
      continue
    }

    if (!inCode && /^import\s+.+\s+from\s+['"].+['"];?$/.test(trimmed)) {
      continue
    }

    if (inCode) {
      output.push(rawLine)
      continue
    }

    const cleaned = cleanInlineHtml(rawLine)

    if (
      cleaned === '' &&
      /<\/?(section|div|ul|ol|table|tbody|thead|tr|td|th)[^>]*>/.test(trimmed)
    ) {
      output.push('')
      continue
    }

    output.push(normalizeProductText(cleaned))
  }

  return output.join('\n').replace(/\n{3,}/g, '\n\n')
}

const slugifyHeading = (text, index) => {
  const cleaned = text
    .toLowerCase()
    .replace(/[`*_~()[\]{}:：，。,.!?/\\|]+/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\u4e00-\u9fff-]/g, '')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)

  return cleaned || `section-${index}`
}

const parseTable = (lines) => {
  const rows = lines.map((line) =>
    line
      .trim()
      .replace(/^\||\|$/g, '')
      .split('|')
      .map((cell) => cell.trim()),
  )

  if (rows.length < 2) {
    return undefined
  }

  return {
    type: 'table',
    headers: rows[0],
    rows: rows.slice(2).filter((row) => row.some(Boolean)),
  }
}

const parseMarkdownBlocks = (body) => {
  const lines = body.split('\n')
  const blocks = []
  const headings = []
  let index = 0
  let headingIndex = 0

  const pushParagraph = (paragraphLines) => {
    const text = paragraphLines.join(' ').replace(/\s+/g, ' ').trim()
    if (text) {
      blocks.push({ type: 'paragraph', text })
    }
  }

  while (index < lines.length) {
    const line = lines[index]
    const trimmed = line.trim()

    if (!trimmed) {
      index += 1
      continue
    }

    const videoMatch = trimmed.match(/^@@VIDEO\|(.+?)\|(.+?)@@$/)
    if (videoMatch) {
      blocks.push({ type: 'video', src: videoMatch[1], title: videoMatch[2] })
      index += 1
      continue
    }

    const imageMatch = trimmed.match(/^!\[(.*)]\((.*)\)$/)
    if (imageMatch) {
      blocks.push({ type: 'image', alt: imageMatch[1], src: imageMatch[2] })
      index += 1
      continue
    }

    const headingMatch = trimmed.match(/^(#{1,4})\s+(.+)$/)
    if (headingMatch) {
      headingIndex += 1
      const level = headingMatch[1].length
      const text = headingMatch[2].replace(/#+$/, '').trim()
      const id = slugifyHeading(text, headingIndex)

      blocks.push({ type: 'heading', id, level, text })
      if (level <= 3) {
        headings.push({ id, level, text })
      }
      index += 1
      continue
    }

    const codeMatch = trimmed.match(/^```([A-Za-z0-9_-]*)/)
    if (codeMatch) {
      const language = codeMatch[1]
      index += 1
      const codeLines = []

      while (index < lines.length && !lines[index].trim().startsWith('```')) {
        codeLines.push(lines[index])
        index += 1
      }

      if (index < lines.length) {
        index += 1
      }

      blocks.push({ type: 'code', language, code: normalizeProductText(codeLines.join('\n')) })
      continue
    }

    if (trimmed.startsWith('|')) {
      const tableLines = []
      while (index < lines.length && lines[index].trim().startsWith('|')) {
        tableLines.push(lines[index])
        index += 1
      }
      const table = parseTable(tableLines)
      if (table) {
        blocks.push(table)
      }
      continue
    }

    if (/^[-*]\s+/.test(trimmed) || /^\d+\.\s+/.test(trimmed)) {
      const ordered = /^\d+\.\s+/.test(trimmed)
      const items = []

      while (index < lines.length) {
        const itemLine = lines[index].trim()
        const match = ordered ? itemLine.match(/^\d+\.\s+(.+)$/) : itemLine.match(/^[-*]\s+(.+)$/)
        if (!match) {
          break
        }
        items.push(match[1].trim())
        index += 1
      }

      blocks.push({ type: 'list', ordered, items })
      continue
    }

    const paragraphLines = [trimmed]
    index += 1

    while (index < lines.length) {
      const next = lines[index].trim()
      if (
        !next ||
        next.startsWith('#') ||
        next.startsWith('```') ||
        next.startsWith('|') ||
        next.startsWith('![') ||
        next.startsWith('@@VIDEO|') ||
        /^[-*]\s+/.test(next) ||
        /^\d+\.\s+/.test(next)
      ) {
        break
      }
      paragraphLines.push(next)
      index += 1
    }

    pushParagraph(paragraphLines)
  }

  return { blocks, headings }
}

const replaceDatasourceScreenshots = (document) => {
  const visual = datasourceVisuals[document.id]

  if (!visual) {
    return document
  }

  let replaced = false
  const blocks = document.blocks.map((block) => {
    if (
      block.type === 'image' &&
      (block.src.endsWith('/img/screenshots/datasources.png') || block.alt.includes('数据源') || block.alt.includes('data source'))
    ) {
      replaced = true
      return {
        ...block,
        alt: `${visual.title} 配置截图`,
        src: `/velamq-docs/img/screenshots/datasources/${visual.slug}.png`,
      }
    }

    return block
  })

  if (!replaced) {
    blocks.splice(1, 0, {
      type: 'image',
      alt: `${visual.title} 配置截图`,
      src: `/velamq-docs/img/screenshots/datasources/${visual.slug}.png`,
    })
  }

  return { ...document, blocks }
}

const loadDocuments = (docsDir) => {
  const documents = {}

  for (const filePath of walkDocFiles(docsDir)) {
    const id = toDocId(filePath, docsDir)
    const raw = fs.readFileSync(filePath, 'utf8')
    const { metadata, body } = extractFrontmatter(raw)
    const parsed = parseMarkdownBlocks(preprocessBody(body))
    const firstHeading = parsed.blocks.find((block) => block.type === 'heading' && block.level === 1)
    const title = metadata.title || firstHeading?.text || id
    const summary =
      parsed.blocks.find((block) => block.type === 'paragraph' && block.text.length > 24)?.text ??
      parsed.blocks.find((block) => block.type === 'paragraph')?.text ??
      ''

    documents[id] = replaceDatasourceScreenshots({
      id,
      title: normalizeProductText(title),
      summary: normalizeProductText(summary),
      sourcePath: path.relative(docsDir, filePath).replaceAll(path.sep, '/'),
      headings: parsed.headings,
      blocks: parsed.blocks.filter((block) => !(block.type === 'heading' && block.level === 1 && block.text === title)),
    })
  }

  return documents
}

const docLabel = (documents, id) => documents[id]?.title ?? id

const sidebarContainsDoc = (items = [], id) =>
  items.some((item) => {
    if (typeof item === 'string') {
      return item === id
    }

    if (item?.type === 'category') {
      const linkedDocId = item.link?.type === 'doc' ? item.link.id : undefined
      return linkedDocId === id || sidebarContainsDoc(item.items ?? [], id)
    }

    return false
  })

const maybeAddLinkedDoc = (entries, node, documents, depth) => {
  const id = node.link?.type === 'doc' ? node.link.id : undefined
  if (
    id &&
    documents[id] &&
    !sidebarContainsDoc(node.items ?? [], id) &&
    !entries.some((entry) => entry.type === 'doc' && entry.id === id)
  ) {
    entries.push({ type: 'doc', id, label: docLabel(documents, id), depth })
  }
}

const addSidebarNode = (entries, node, documents, locale, depth) => {
  if (typeof node === 'string') {
    if (documents[node]) {
      entries.push({ type: 'doc', id: node, label: docLabel(documents, node), depth })
    }
    return
  }

  if (node?.type === 'category') {
    const label = translateCategory(locale, node.label)
    entries.push({ type: 'category', label, depth })
    maybeAddLinkedDoc(entries, node, documents, depth)
    for (const item of node.items ?? []) {
      addSidebarNode(entries, item, documents, locale, depth + 1)
    }
  }
}

const buildGroups = (documents, locale) => {
  const groups = []
  let looseItems = []

  for (const node of sidebarDocs) {
    if (typeof node === 'string') {
      if (documents[node]) {
        looseItems.push({ type: 'doc', id: node, label: docLabel(documents, node), depth: 0 })
      }
      continue
    }

    if (node?.type === 'category') {
      if (looseItems.length > 0) {
        groups.push({ title: locale === 'zh' ? '其他' : 'Other', entries: looseItems })
        looseItems = []
      }

      const entries = []
      maybeAddLinkedDoc(entries, node, documents, 0)
      for (const item of node.items ?? []) {
        addSidebarNode(entries, item, documents, locale, 0)
      }

      groups.push({ title: translateCategory(locale, node.label), entries })
    }
  }

  if (looseItems.length > 0) {
    groups.push({ title: locale === 'zh' ? '其他' : 'Other', entries: looseItems })
  }

  return groups
}

const buildCatalog = (locale, docsDir) => {
  const documents = loadDocuments(docsDir)

  return {
    locale,
    productName: 'VelaMQ',
    title: locale === 'zh' ? 'VelaMQ 文档中心' : 'VelaMQ Documentation',
    eyebrow: 'VelaMQ Docs',
    body:
      locale === 'zh'
        ? `从 velamq-rs-doc 迁移而来的 VelaMQ 产品、安装、功能、API、规则引擎、数据源和运维手册，当前对应正式发布版本 ${currentVelaMQVersionLabel}。`
        : `VelaMQ product, installation, feature, API, rule engine, data source, and operations documentation for the current ${currentVelaMQVersionLabel} release.`,
    searchPlaceholder: locale === 'zh' ? '浏览 VelaMQ 文档、规则、API' : 'Browse VelaMQ docs, rules and APIs',
    sidebarLabel: locale === 'zh' ? 'VelaMQ 文档目录' : 'VelaMQ documentation navigation',
    tocLabel: locale === 'zh' ? '本页内容' : 'On this page',
    versionLabel: locale === 'zh' ? '文档版本' : 'Docs version',
    versionStatusLabel: locale === 'zh' ? '版本状态' : 'Version status',
    commandLabel: locale === 'zh' ? '当前版本快速启动' : 'Quickstart for this version',
    defaultDocumentId: documents['product/introduction'] ? 'product/introduction' : Object.keys(documents)[0],
    versions: [
      {
        id: currentVelaMQVersionLabel,
        label: currentVelaMQVersionLabel,
        status: 'stable',
        date: `VelaMQ ${currentVelaMQVersionLabel}`,
        note:
          locale === 'zh'
            ? `当前官网文档与 VelaMQ ${currentVelaMQVersionLabel} 安装包及源码版本保持一致。`
            : `Current documentation aligned with the VelaMQ ${currentVelaMQVersionLabel} packages and source release.`,
        command: 'curl -L -O https://velamq.obs.cn-east-3.myhuaweicloud.com/velamqd-0.0.1-linux-musl-x86_64.zip && unzip velamqd-0.0.1-linux-musl-x86_64.zip && cd velamqd-0.0.1-linux-musl-x86_64 && ./start.sh',
      },
    ],
    groups: buildGroups(documents, locale),
    documents,
  }
}

const createArchitectureSvg = () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" role="img" aria-labelledby="title desc">
  <title id="title">VelaMQ layered architecture</title>
  <desc id="desc">VelaMQ access, message core, control plane, rule engine, storage, cluster and observability architecture.</desc>
  <defs>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M40 0H0V40" fill="none" stroke="#7cf7d7" stroke-opacity=".055"/>
    </pattern>
    <filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="7" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
      <path d="M1 1L9 5 1 9Z" fill="#67efd0"/>
    </marker>
    <style>
      .frame{fill:#061612;stroke:#2c5a4f;stroke-width:1.5}
      .panel{fill:#081e19;stroke:#285447;stroke-width:1.4}
      .panel-accent{fill:#0a241e;stroke:#56d9bc;stroke-width:1.6}
      .rail{fill:#071b16;stroke:#224a3f;stroke-width:1.2}
      .eyebrow{fill:#65e7c8;font:700 12px ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:2px}
      .title{fill:#f2fffb;font:700 32px -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
      .label{fill:#eafff9;font:700 19px -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
      .body{fill:#8fa8a1;font:14px -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
      .mono{fill:#70e8cd;font:700 12px ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:1px}
      .line{fill:none;stroke:#67efd0;stroke-width:2;stroke-opacity:.64;marker-end:url(#arrow)}
      .line-cyan{fill:none;stroke:#54c8ed;stroke-width:2;stroke-opacity:.58;marker-end:url(#arrow)}
      .pulse{stroke-dasharray:8 12;animation:flow 2.8s linear infinite}
      .dot{fill:#72f4d5;filter:url(#glow)}
      .dot-alt{fill:#a8df63;filter:url(#glow)}
      @keyframes flow{to{stroke-dashoffset:-40}}
      @media(prefers-reduced-motion:reduce){.pulse{animation:none}}
    </style>
  </defs>

  <rect class="frame" x="1" y="1" width="1278" height="718" rx="22"/>
  <rect x="1" y="1" width="1278" height="718" rx="22" fill="url(#grid)"/>
  <path d="M1 92H1279" stroke="#2a5147"/>
  <circle cx="34" cy="47" r="6" fill="#ff6969"/>
  <circle cx="56" cy="47" r="6" fill="#ffc85d"/>
  <circle cx="78" cy="47" r="6" fill="#6ceccb"/>
  <text class="eyebrow" x="112" y="51">REALTIME MESSAGE INFRASTRUCTURE</text>
  <text class="title" x="640" y="56" text-anchor="middle">VelaMQ Architecture</text>
  <circle class="dot" cx="1190" cy="47" r="5"/>
  <text class="eyebrow" x="1210" y="51">LIVE</text>

  <text class="eyebrow" x="58" y="132">ACCESS LAYER</text>
  <rect class="panel" x="58" y="152" width="224" height="82" rx="12"/>
  <text class="mono" x="80" y="179">DEVICE CONNECT</text>
  <text class="label" x="80" y="207">MQTT / WS / TLS</text>
  <rect class="panel" x="58" y="250" width="224" height="82" rx="12"/>
  <text class="mono" x="80" y="277">MOBILE TRANSPORT</text>
  <text class="label" x="80" y="305">MQTT over QUIC</text>
  <rect class="panel" x="58" y="348" width="224" height="82" rx="12"/>
  <text class="mono" x="80" y="375">EDGE INTERFACE</text>
  <text class="label" x="80" y="403">HTTP / Webhook</text>

  <text class="eyebrow" x="382" y="132">MESSAGE CORE</text>
  <rect class="panel-accent" x="382" y="152" width="300" height="278" rx="16"/>
  <circle class="dot" cx="532" cy="205" r="8"/>
  <path d="M485 276L520 241 548 261 581 221" fill="none" stroke="#70f0d2" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="485" cy="276" r="7" fill="#54c8ed"/>
  <circle cx="520" cy="241" r="7" fill="#70f0d2"/>
  <circle cx="548" cy="261" r="7" fill="#a8df63"/>
  <circle cx="581" cy="221" r="7" fill="#70f0d2"/>
  <text class="title" x="532" y="328" text-anchor="middle">VelaMQ</text>
  <text class="body" x="532" y="358" text-anchor="middle">Broker · Router · Rule Runtime</text>
  <rect class="rail" x="414" y="382" width="98" height="30" rx="7"/>
  <text class="mono" x="463" y="402" text-anchor="middle">SESSION</text>
  <rect class="rail" x="522" y="382" width="128" height="30" rx="7"/>
  <text class="mono" x="586" y="402" text-anchor="middle">DELIVERY</text>

  <text class="eyebrow" x="782" y="132">CONTROL &amp; EXECUTION</text>
  <rect class="panel" x="782" y="152" width="440" height="82" rx="12"/>
  <text class="mono" x="806" y="179">CONTROL PLANE</text>
  <text class="label" x="806" y="207">Console · API · RBAC · Audit</text>
  <rect class="panel" x="782" y="250" width="210" height="82" rx="12"/>
  <text class="mono" x="806" y="277">STREAM PROCESSING</text>
  <text class="label" x="806" y="305">SQL Rule Engine</text>
  <rect class="panel" x="1012" y="250" width="210" height="82" rx="12"/>
  <text class="mono" x="1036" y="277">SECURITY</text>
  <text class="label" x="1036" y="305">Auth · ACL</text>
  <rect class="panel" x="782" y="348" width="210" height="82" rx="12"/>
  <text class="mono" x="806" y="375">INTEGRATION</text>
  <text class="label" x="806" y="403">Data Sources</text>
  <rect class="panel" x="1012" y="348" width="210" height="82" rx="12"/>
  <text class="mono" x="1036" y="375">OPERATIONS</text>
  <text class="label" x="1036" y="403">Metrics · Alerts</text>

  <path class="line pulse" d="M282 193H370"/>
  <path class="line pulse" d="M282 291C328 291 334 252 370 252"/>
  <path class="line-cyan pulse" d="M282 389C328 389 338 338 370 338"/>
  <path class="line pulse" d="M682 193H770"/>
  <path class="line pulse" d="M682 286H770"/>
  <path class="line-cyan pulse" d="M682 389H770"/>
  <circle class="dot" cx="370" cy="193" r="5"/>
  <circle class="dot-alt" cx="770" cy="286" r="5"/>

  <text class="eyebrow" x="58" y="486">DURABLE DATA &amp; CLUSTER FABRIC</text>
  <rect class="rail" x="58" y="508" width="276" height="116" rx="14"/>
  <text class="mono" x="82" y="542">LOCAL STATE</text>
  <text class="label" x="82" y="574">RocksDB Storage</text>
  <text class="body" x="82" y="600">session · retained · metadata</text>
  <rect class="rail" x="354" y="508" width="276" height="116" rx="14"/>
  <text class="mono" x="378" y="542">REPLICATION</text>
  <text class="label" x="378" y="574">Storage Raft</text>
  <text class="body" x="378" y="600">shard · replica · failover</text>
  <rect class="rail" x="650" y="508" width="276" height="116" rx="14"/>
  <text class="mono" x="674" y="542">DATA PIPELINE</text>
  <text class="label" x="674" y="574">SQL · MQ · Object</text>
  <text class="body" x="674" y="600">route · transform · persist</text>
  <rect class="rail" x="946" y="508" width="276" height="116" rx="14"/>
  <text class="mono" x="970" y="542">OBSERVABILITY</text>
  <text class="label" x="970" y="574">Prometheus · Logs</text>
  <text class="body" x="970" y="600">metrics · traces · audit</text>
  <path class="line pulse" d="M532 430V476C532 494 492 494 492 502"/>
  <path class="line-cyan pulse" d="M887 430V476C887 494 788 494 788 502"/>
  <path class="line pulse" d="M1117 430V502"/>

  <text class="body" x="58" y="676">MQTT 3.1.1 / 5.0</text>
  <text class="body" x="244" y="676">QUIC</text>
  <text class="body" x="330" y="676">WebSocket</text>
  <text class="body" x="470" y="676">SQL Rules</text>
  <text class="body" x="590" y="676">AI Insight</text>
  <text class="body" x="710" y="676">Open API</text>
  <text class="body" x="822" y="676">Cluster</text>
  <text class="body" x="920" y="676">Prometheus</text>
</svg>`

const createProductAssetAliases = () => {
  const visit = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const entryPath = path.join(dir, entry.name)

      if (entry.isDirectory()) {
        visit(entryPath)
        continue
      }

      if (!entry.isFile() || !entry.name.includes('fluxmq')) {
        continue
      }

      const aliasName = entry.name === 'fluxmq-3-architecture.svg'
        ? 'velamq-architecture.svg'
        : entry.name.replaceAll('fluxmq', 'velamq')
      const aliasPath = path.join(dir, aliasName)
      if (entry.name.endsWith('.svg')) {
        const svg = entry.name === 'fluxmq-3-architecture.svg'
          ? createArchitectureSvg()
          : normalizeProductText(fs.readFileSync(entryPath, 'utf8'))
        fs.writeFileSync(aliasPath, svg)
      } else if (!fs.existsSync(aliasPath)) {
        fs.copyFileSync(entryPath, aliasPath)
      }
      fs.rmSync(entryPath)
    }
  }

  visit(assetOutputDir)
}

const readExistingDatasourceScreenshots = () => {
  const datasourceDir = path.join(assetOutputDir, 'img/screenshots/datasources')
  const screenshots = new Map()

  if (!fs.existsSync(datasourceDir)) {
    return screenshots
  }

  for (const entry of fs.readdirSync(datasourceDir, { withFileTypes: true })) {
    if (entry.isFile() && entry.name.endsWith('.png')) {
      screenshots.set(entry.name, fs.readFileSync(path.join(datasourceDir, entry.name)))
    }
  }

  return screenshots
}

const createDatasourceScreenshotAliases = (existingScreenshots) => {
  const screenshotDir = path.join(assetOutputDir, 'img/screenshots')
  const datasourceDir = path.join(screenshotDir, 'datasources')
  const fallbackImage = path.join(screenshotDir, 'datasources.png')

  fs.mkdirSync(datasourceDir, { recursive: true })

  for (const [name, buffer] of existingScreenshots) {
    fs.writeFileSync(path.join(datasourceDir, name), buffer)
  }

  if (!fs.existsSync(fallbackImage)) {
    return
  }

  for (const visual of Object.values(datasourceVisuals)) {
    const aliasPath = path.join(datasourceDir, `${visual.slug}.png`)

    if (!fs.existsSync(aliasPath)) {
      fs.copyFileSync(fallbackImage, aliasPath)
    }
  }
}

const copyAssets = () => {
  const existingDatasourceScreenshots = readExistingDatasourceScreenshots()

  fs.rmSync(assetOutputDir, { recursive: true, force: true })
  fs.mkdirSync(assetOutputDir, { recursive: true })
  fs.cpSync(path.join(sourceRoot, 'static/img'), path.join(assetOutputDir, 'img'), { recursive: true })
  fs.cpSync(path.join(sourceRoot, 'static/videos'), path.join(assetOutputDir, 'videos'), { recursive: true })
  createProductAssetAliases()
  createDatasourceScreenshotAliases(existingDatasourceScreenshots)
}

const generated = {
  zh: buildCatalog('zh', zhDocsDir),
  en: buildCatalog('en', enDocsDir),
}

copyAssets()

const output = `// Generated by scripts/import-velamq-docs.mjs from migrated VelaMQ docs source\n\nexport type VelaMQDocInlineText = string\n\nexport type VelaMQDocBlock =\n  | { type: 'heading'; id: string; level: number; text: string }\n  | { type: 'paragraph'; text: string }\n  | { type: 'list'; ordered: boolean; items: string[] }\n  | { type: 'code'; language: string; code: string }\n  | { type: 'table'; headers: string[]; rows: string[][] }\n  | { type: 'image'; src: string; alt: string }\n  | { type: 'video'; src: string; title: string }\n\nexport type VelaMQDocHeading = { id: string; level: number; text: string }\nexport type VelaMQDocDocument = {\n  id: string\n  title: string\n  summary: string\n  sourcePath: string\n  headings: VelaMQDocHeading[]\n  blocks: VelaMQDocBlock[]\n}\nexport type VelaMQDocNavEntry =\n  | { type: 'category'; label: string; depth: number }\n  | { type: 'doc'; id: string; label: string; depth: number }\nexport type VelaMQDocGroup = { title: string; entries: VelaMQDocNavEntry[] }\nexport type VelaMQDocVersion = { id: string; label: string; status: string; date: string; note: string; command: string }\nexport type VelaMQDocsCatalog = {\n  locale: 'zh' | 'en'\n  productName: string\n  title: string\n  eyebrow: string\n  body: string\n  searchPlaceholder: string\n  sidebarLabel: string\n  tocLabel: string\n  versionLabel: string\n  versionStatusLabel: string\n  commandLabel: string\n  defaultDocumentId: string\n  versions: VelaMQDocVersion[]\n  groups: VelaMQDocGroup[]\n  documents: Record<string, VelaMQDocDocument>\n}\n\nexport const velamqDocs: Record<'zh' | 'en', VelaMQDocsCatalog> = ${JSON.stringify(generated, null, 2)}\n`

fs.writeFileSync(outputFile, output)

console.log(`Generated ${path.relative(repoRoot, outputFile)}`)
console.log(`Copied assets to ${path.relative(repoRoot, assetOutputDir)}`)
console.log(`Screenshots referenced: ${[...screenshotNames].sort().join(', ')}`)
