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

const preprocessBody = (body) => {
  let normalized = body
    .replace(/<Screenshot\s+name="([^"]+)"\s+alt="([^"]+)"\s*\/>/g, (_, name, alt) => {
      screenshotNames.add(name)
      return `\n![${normalizeProductText(alt)}](/velamq-docs/img/screenshots/${name}.png)\n`
    })
    .replace(/<video[\s\S]*?src="([^"]+)"[\s\S]*?\/>/g, (_, src) => `\n@@VIDEO|${rewriteAssetPath(src)}|VelaMQ demo video@@\n`)
    .replace(/<img[\s\S]*?src="([^"]+)"[\s\S]*?alt="([^"]+)"[\s\S]*?\/>/g, (_, src, alt) => {
      return `\n![${normalizeProductText(alt)}](${rewriteAssetPath(src)})\n`
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
        ? '从 velamq-rs-doc 迁移而来的 VelaMQ 产品、安装、功能、API、规则引擎、数据源和运维手册，官网统一以 v1.0.0 版本维护。'
        : 'VelaMQ product, installation, feature, API, rule engine, data source, and operations documentation migrated from velamq-rs-doc and maintained here as version v1.0.0.',
    searchPlaceholder: locale === 'zh' ? '浏览 VelaMQ 文档、规则、API' : 'Browse VelaMQ docs, rules and APIs',
    sidebarLabel: locale === 'zh' ? 'VelaMQ 文档目录' : 'VelaMQ documentation navigation',
    tocLabel: locale === 'zh' ? '本页内容' : 'On this page',
    versionLabel: locale === 'zh' ? '文档版本' : 'Docs version',
    versionStatusLabel: locale === 'zh' ? '版本状态' : 'Version status',
    commandLabel: locale === 'zh' ? '当前版本快速启动' : 'Quickstart for this version',
    defaultDocumentId: documents['product/introduction'] ? 'product/introduction' : Object.keys(documents)[0],
    versions: [
      {
        id: 'v1.0.0',
        label: 'v1.0.0',
        status: 'stable',
        date: 'VelaMQ v1.0.0',
        note:
          locale === 'zh'
            ? '当前官网文档版本，内容来源于 velamq-rs-doc，并按官网文档系统重新排版。'
            : 'Current website documentation version, migrated from velamq-rs-doc and restyled for the website docs system.',
        command: 'VELAMQ_CONFIG_FILE=config.toml cargo run -p velamqd',
      },
    ],
    groups: buildGroups(documents, locale),
    documents,
  }
}

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

      const aliasPath = path.join(dir, entry.name.replaceAll('fluxmq', 'velamq'))
      if (entry.name.endsWith('.svg')) {
        fs.writeFileSync(aliasPath, normalizeProductText(fs.readFileSync(entryPath, 'utf8')))
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
