import {
  Activity,
  ArrowRight,
  BookOpen,
  Building2,
  Cable,
  Car,
  Check,
  ChevronDown,
  Cloud,
  Database,
  Factory,
  Gauge,
  Landmark,
  Languages,
  Mail,
  Search,
  Server,
  ShieldCheck,
  Terminal,
  Workflow,
} from 'lucide-react'
import {
  type ChangeEvent,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react'
import './App.css'
import { ArchitectureVisual } from './components/ArchitectureVisual'
import { BrandMark } from './components/BrandMark'
import { ClusterDiagram } from './components/ClusterDiagram'
import { HeroMotionField } from './components/HeroMotionField'
import { SolutionScenarioVisual } from './components/SolutionScenarioVisual'
import { VelaMQIcon } from './components/VelaMQIcon'
import {
  companyName,
  mailTo,
  salesEmail,
  translations,
  viewFromHash,
  viewIds,
  type Locale,
  type ProductId,
  type ViewId,
} from './content'
import {
  velamqDocs,
  type VelaMQDocBlock,
  type VelaMQDocDocument,
  type VelaMQDocNavEntry,
  type VelaMQDocsCatalog,
} from './velamqDocs'

const capabilityIcons = [Server, Workflow, Database, Activity, ShieldCheck, Cable]
const solutionIcons = [Factory, Car, Building2, Landmark]
const productIcons = [Server, Gauge]
const resourceIcons = [BookOpen, Database, Activity, Cloud]
const localeStorageKey = 'hannet-locale'
const contactHref = '#contact'
const docsHref = '#docs'
const localeOptions: Locale[] = ['zh', 'en']
const languageMenuId = 'site-language-menu'
const docsMenuId = 'site-docs-menu'
const siteAssetBase = import.meta.env.BASE_URL || './'

type ContactFormState = {
  name: string
  company: string
  email: string
  message: string
}

const initialContactForm: ContactFormState = {
  name: '',
  company: '',
  email: '',
  message: '',
}

type FooterTarget = {
  product?: ProductId
  view: ViewId
}

type DocsNavBranch = {
  children: VelaMQDocNavEntry[]
  entry: VelaMQDocNavEntry
  key: string
}

type DocsNavGroup = {
  branches: DocsNavBranch[]
  title: string
}

const createDoc = (
  id: string,
  title: string,
  summary: string,
  sourcePath: string,
  sections: Array<{ code?: string; id: string; text: string; title: string }>,
): VelaMQDocDocument => ({
  id,
  title,
  summary,
  sourcePath,
  headings: sections.map((section) => ({ id: section.id, level: 2, text: section.title })),
  blocks: [
    { type: 'paragraph', text: summary },
    ...sections.flatMap<VelaMQDocBlock>((section) => [
      { type: 'heading', id: section.id, level: 2, text: section.title },
      { type: 'paragraph', text: section.text },
      ...(section.code ? [{ type: 'code' as const, language: 'bash', code: section.code }] : []),
    ]),
  ],
})

const createBenchDocsCatalog = (locale: Locale): VelaMQDocsCatalog => {
  const isZh = locale === 'zh'
  const documents = isZh
    ? {
        overview: createDoc(
          'overview',
          'VelaMQ Bench 概览',
          'VelaMQ Bench 面向上线前容量评估、压测执行和报告交付，帮助团队把真实业务场景转成可复现的验证流程。',
          'bench/overview.md',
          [
            {
              id: 'positioning',
              title: '产品定位',
              text: '围绕连接数、吞吐、延迟、规则执行和外部写入目标建立压测模型，验证 VelaMQ 在上线场景中的稳定边界。',
              code: 'velamq-bench scenario init --template industrial-edge',
            },
            {
              id: 'workflow',
              title: '交付流程',
              text: '从场景建模、执行压测、采集指标到输出报告，Bench 用统一流程沉淀每次上线验证结论。',
              code: 'scenario -> load test -> metrics -> launch report',
            },
          ],
        ),
        scenarios: createDoc(
          'scenarios',
          '场景建模',
          '把业务容量目标拆成设备规模、消息模型、协议、规则链路和数据源写入策略。',
          'bench/scenarios.md',
          [
            {
              id: 'device-model',
              title: '设备与消息模型',
              text: '定义设备数量、连接节奏、消息频率、payload 大小、主题分布和 MQTT 版本，尽量贴近真实现场。',
              code: ['devices = 50000', 'message_rate = "120k/min"', 'protocol = "mqtt5"'].join('\n'),
            },
            {
              id: 'business-path',
              title: '业务链路',
              text: '把规则引擎、Webhook、Kafka、SQL 或时序库写入纳入同一次压测，验证端到端链路。',
              code: 'rule -> action -> datasource -> dashboard',
            },
          ],
        ),
        reports: createDoc(
          'reports',
          '报告与上线建议',
          '输出吞吐、延迟分位线、错误率、资源消耗和容量建议，让上线决策有可追溯依据。',
          'bench/reports.md',
          [
            {
              id: 'metrics',
              title: '核心指标',
              text: '关注连接建立速率、消息吞吐、规则处理延迟、数据源写入耗时、CPU/内存和异常重试。',
              code: 'p95 latency < 20ms\nerror_rate < 0.1%\nconnections stable',
            },
            {
              id: 'recommendation',
              title: '上线建议',
              text: '报告会结合目标容量、资源水位和瓶颈位置，给出集群规模、端点参数、规则拆分和数据源批量写入建议。',
              code: 'velamq-bench report --format html --output launch-report.html',
            },
          ],
        ),
      }
    : {
        overview: createDoc(
          'overview',
          'VelaMQ Bench Overview',
          'VelaMQ Bench turns launch capacity goals into repeatable scenarios, load tests and delivery reports.',
          'bench/overview.md',
          [
            {
              id: 'positioning',
              title: 'Positioning',
              text: 'Model connections, throughput, latency, rules and external writes to verify the operating boundary before launch.',
              code: 'velamq-bench scenario init --template industrial-edge',
            },
            {
              id: 'workflow',
              title: 'Workflow',
              text: 'Bench keeps scenario modeling, test execution, metrics collection and report delivery in one reproducible flow.',
              code: 'scenario -> load test -> metrics -> launch report',
            },
          ],
        ),
        scenarios: createDoc(
          'scenarios',
          'Scenario Modeling',
          'Break business capacity goals into device scale, message model, protocol, rule path and datasource writes.',
          'bench/scenarios.md',
          [
            {
              id: 'device-model',
              title: 'Device and Message Model',
              text: 'Define device count, connect ramp, message rate, payload size, topic distribution and MQTT version close to the real site.',
              code: ['devices = 50000', 'message_rate = "120k/min"', 'protocol = "mqtt5"'].join('\n'),
            },
            {
              id: 'business-path',
              title: 'Business Path',
              text: 'Include rules, webhooks, Kafka, SQL or time-series writes in the same test to verify the end-to-end path.',
              code: 'rule -> action -> datasource -> dashboard',
            },
          ],
        ),
        reports: createDoc(
          'reports',
          'Reports and Launch Advice',
          'Produce throughput, latency percentiles, error rate, resource usage and capacity recommendations.',
          'bench/reports.md',
          [
            {
              id: 'metrics',
              title: 'Core Metrics',
              text: 'Track connection ramp, message throughput, rule latency, datasource write time, CPU/memory and retry behavior.',
              code: 'p95 latency < 20ms\nerror_rate < 0.1%\nconnections stable',
            },
            {
              id: 'recommendation',
              title: 'Launch Recommendation',
              text: 'Reports translate capacity goals and bottlenecks into cluster size, endpoint tuning, rule splitting and datasource batching advice.',
              code: 'velamq-bench report --format html --output launch-report.html',
            },
          ],
        ),
      }

  return {
    locale,
    productName: 'VelaMQ Bench',
    title: isZh ? 'VelaMQ Bench 文档中心' : 'VelaMQ Bench Documentation',
    eyebrow: 'VelaMQ Bench Docs',
    body: isZh
      ? '围绕压测场景、容量评估、指标采集和上线报告维护文档，方便团队在上线前验证 VelaMQ 的真实承载能力。'
      : 'Documentation for load scenarios, capacity assessment, metrics collection and launch reports before production rollout.',
    searchPlaceholder: isZh ? '浏览 Bench 场景、压测、报告' : 'Search Bench scenarios, tests and reports',
    sidebarLabel: isZh ? 'VelaMQ Bench 文档目录' : 'VelaMQ Bench documentation navigation',
    tocLabel: isZh ? '本页内容' : 'On this page',
    versionLabel: isZh ? '文档版本' : 'Docs version',
    versionStatusLabel: isZh ? '版本状态' : 'Version status',
    commandLabel: isZh ? '当前版本快速启动' : 'Quickstart for this version',
    defaultDocumentId: 'overview',
    versions: [
      {
        id: '1.0',
        label: '1.0',
        status: 'latest',
        date: 'VelaMQ Bench 1.0',
        note: isZh ? '当前官网维护版本，覆盖上线前压测与容量评估流程。' : 'Current website version for pre-launch load testing and capacity assessment.',
        command: 'velamq-bench run --scenario industrial-edge',
      },
    ],
    groups: [
      {
        title: isZh ? '产品总览' : 'Product',
        entries: [{ type: 'doc', id: 'overview', label: documents.overview.title, depth: 0 }],
      },
      {
        title: isZh ? '上线验证' : 'Launch Validation',
        entries: [
          { type: 'doc', id: 'scenarios', label: documents.scenarios.title, depth: 0 },
          { type: 'doc', id: 'reports', label: documents.reports.title, depth: 0 },
        ],
      },
    ],
    documents,
  }
}

const footerTargetByLabel: Record<string, FooterTarget> = {
  VelaMQ: { view: 'product', product: 'velamq' },
  'VelaMQ Bench': { view: 'product', product: 'velamq-bench' },
  规则自动化: { view: 'platform' },
  数据看板: { view: 'platform' },
  文档中心: { view: 'docs' },
  方案沟通: { view: 'contact' },
  接入评估: { view: 'support' },
  服务支持: { view: 'support' },
  关于我们: { view: 'company' },
  联系方式: { view: 'contact' },
  [companyName]: { view: 'company' },
  'Rule automation': { view: 'platform' },
  Dashboards: { view: 'platform' },
  Documentation: { view: 'docs' },
  'Solution discussion': { view: 'contact' },
  'Access assessment': { view: 'support' },
  'Service support': { view: 'support' },
  About: { view: 'company' },
  Contact: { view: 'contact' },
  Support: { view: 'support' },
}

const isViewId = (id: string): id is ViewId => viewIds.includes(id as ViewId)

const readInitialLocale = (): Locale => {
  try {
    return window.localStorage.getItem(localeStorageKey) === 'en' ? 'en' : 'zh'
  } catch {
    return 'zh'
  }
}

const docsNavEntryKey = (groupTitle: string, entry: VelaMQDocNavEntry, index: number) =>
  entry.type === 'doc' ? entry.id : `${groupTitle}:${entry.depth}:${entry.label}:${index}`

const buildDocsNavGroups = (catalog: VelaMQDocsCatalog): DocsNavGroup[] =>
  catalog.groups.map((group) => {
    const branches: DocsNavBranch[] = []
    let activeBranch: DocsNavBranch | undefined

    group.entries.forEach((entry, index) => {
      if (entry.depth === 0 || !activeBranch) {
        activeBranch = {
          children: [],
          entry,
          key: docsNavEntryKey(group.title, entry, index),
        }
        branches.push(activeBranch)
        return
      }

      activeBranch.children.push(entry)
    })

    return { title: group.title, branches }
  })

const branchContainsDocument = (branch: DocsNavBranch, documentId: string) => {
  if (branch.entry.type === 'doc' && branch.entry.id === documentId) {
    return true
  }

  return branch.children.some((entry) => entry.type === 'doc' && entry.id === documentId)
}

const resolveDocsLink = (href: string, currentDocumentId: string, docsCatalog: VelaMQDocsCatalog) => {
  if (/^(https?:|mailto:|#)/.test(href)) {
    return undefined
  }

  const [rawPath] = href.split('#')
  if (!rawPath) {
    return undefined
  }

  const baseParts = currentDocumentId.split('/')
  baseParts.pop()

  const parts = rawPath.startsWith('/')
    ? rawPath.replace(/^\/+/, '').split('/')
    : [...baseParts, ...rawPath.split('/')]

  const normalizedParts: string[] = []

  for (const part of parts) {
    if (!part || part === '.') {
      continue
    }
    if (part === '..') {
      normalizedParts.pop()
      continue
    }
    normalizedParts.push(part)
  }

  const targetId = normalizedParts.join('/').replace(/\.(md|mdx)$/, '').replace(/\/$/, '')

  return docsCatalog.documents[targetId] ? targetId : undefined
}

const resolveStaticAsset = (src: string) => {
  if (/^(https?:|data:|blob:|mailto:|#)/.test(src)) {
    return src
  }

  const normalizedBase = siteAssetBase === '/' ? './' : siteAssetBase.endsWith('/') ? siteAssetBase : `${siteAssetBase}/`
  const normalizedSrc = src.replace(/^\/+/, '')

  return `${normalizedBase}${normalizedSrc}`
}

const renderInlineText = (
  text: string,
  currentDocument: VelaMQDocDocument,
  docsCatalog: VelaMQDocsCatalog,
  onSelectDocument: (id: string) => void,
) => {
  const nodes: ReactNode[] = []
  const pattern = /(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+]\([^)]+\))/g
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index))
    }

    const token = match[0]
    const key = `${currentDocument.id}-${match.index}-${token}`

    if (token.startsWith('`')) {
      nodes.push(<code key={key}>{token.slice(1, -1)}</code>)
    } else if (token.startsWith('**')) {
      nodes.push(<strong key={key}>{token.slice(2, -2)}</strong>)
    } else {
      const linkMatch = token.match(/^\[([^\]]+)]\(([^)]+)\)$/)
      if (linkMatch) {
        const [, label, href] = linkMatch
        const targetDocumentId = resolveDocsLink(href, currentDocument.id, docsCatalog)

        nodes.push(
          targetDocumentId ? (
            <button
              className="docs-inline-link"
              key={key}
              onClick={() => onSelectDocument(targetDocumentId)}
              type="button"
            >
              {label}
            </button>
          ) : (
            <a href={href} key={key}>
              {label}
            </a>
          ),
        )
      }
    }

    lastIndex = match.index + token.length
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex))
  }

  return nodes
}

const renderDocsBlock = (
  block: VelaMQDocBlock,
  currentDocument: VelaMQDocDocument,
  docsCatalog: VelaMQDocsCatalog,
  onSelectDocument: (id: string) => void,
) => {
  const renderInline = (text: string) => renderInlineText(text, currentDocument, docsCatalog, onSelectDocument)

  switch (block.type) {
    case 'heading': {
      const HeadingTag = block.level <= 2 ? 'h3' : 'h4'

      return (
        <HeadingTag className="docs-doc-heading" id={block.id} key={block.id}>
          {block.text}
        </HeadingTag>
      )
    }
    case 'paragraph':
      return (
        <p className="docs-doc-paragraph" key={`${currentDocument.id}-${block.text}`}>
          {renderInline(block.text)}
        </p>
      )
    case 'list': {
      const ListTag = block.ordered ? 'ol' : 'ul'

      return (
        <ListTag className="docs-doc-list" key={`${currentDocument.id}-${block.items.join('-')}`}>
          {block.items.map((item) => (
            <li key={item}>{renderInline(item)}</li>
          ))}
        </ListTag>
      )
    }
    case 'code':
      return (
        <pre className="docs-code-block" data-language={block.language || 'text'} key={`${currentDocument.id}-${block.code}`}>
          <code>{block.code}</code>
        </pre>
      )
    case 'table':
      return (
        <div className="docs-table-wrap" key={`${currentDocument.id}-${block.headers.join('-')}`}>
          <table>
            <thead>
              <tr>
                {block.headers.map((header) => (
                  <th key={header}>{renderInline(header)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr key={`${currentDocument.id}-row-${rowIndex}`}>
                  {row.map((cell, cellIndex) => (
                    <td key={`${currentDocument.id}-cell-${rowIndex}-${cellIndex}`}>{renderInline(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    case 'image':
      return (
        <figure className="docs-media" key={`${block.src}-${block.alt}`}>
          <img src={resolveStaticAsset(block.src)} alt={block.alt} loading="lazy" />
          <figcaption>{block.alt}</figcaption>
        </figure>
      )
    case 'video':
      return (
        <figure className="docs-media docs-media--video" key={block.src}>
          <video controls muted playsInline preload="metadata" src={resolveStaticAsset(block.src)} />
          <figcaption>{block.title}</figcaption>
        </figure>
      )
  }
}

function App() {
  const [locale, setLocale] = useState<Locale>(readInitialLocale)
  const [activeView, setActiveView] = useState<ViewId>(() => viewFromHash(window.location.hash))
  const [activeProduct, setActiveProduct] = useState<ProductId>('velamq')
  const [activeDocsProduct, setActiveDocsProduct] = useState<ProductId>('velamq')
  const [activeDocsVersion, setActiveDocsVersion] = useState('1.0')
  const [activeDocsTopic, setActiveDocsTopic] = useState(velamqDocs.zh.defaultDocumentId)
  const [contactForm, setContactForm] = useState<ContactFormState>(initialContactForm)
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)
  const [isDocsMenuOpen, setIsDocsMenuOpen] = useState(false)
  const [expandedDocsBranches, setExpandedDocsBranches] = useState<string[]>([])

  const copy = translations[locale]
  const docsCatalogs = useMemo<Record<ProductId, VelaMQDocsCatalog>>(
    () => ({
      velamq: velamqDocs[locale],
      'velamq-bench': createBenchDocsCatalog(locale),
    }),
    [locale],
  )
  const docsCatalog = docsCatalogs[activeDocsProduct]
  const docsProductOptions = useMemo(
    () =>
      copy.products.map((product) => ({
        id: product.id,
        label: product.name,
        summary: product.summary,
      })),
    [copy.products],
  )
  const selectedProduct = useMemo(
    () => copy.products.find((product) => product.id === activeProduct) ?? copy.products[0],
    [activeProduct, copy.products],
  )
  const selectedProductIndex = copy.products.findIndex((product) => product.id === selectedProduct.id)
  const SelectedProductIcon = productIcons[selectedProductIndex] ?? Server
  const selectedDocsVersion = useMemo(
    () => docsCatalog.versions.find((version) => version.id === activeDocsVersion) ?? docsCatalog.versions[0],
    [activeDocsVersion, docsCatalog.versions],
  )
  const selectedDocsDocument = useMemo(
    () => docsCatalog.documents[activeDocsTopic] ?? docsCatalog.documents[docsCatalog.defaultDocumentId],
    [activeDocsTopic, docsCatalog.defaultDocumentId, docsCatalog.documents],
  )
  const docsNavGroups = useMemo(() => buildDocsNavGroups(docsCatalog), [docsCatalog])
  const activeDocsBranchKeys = useMemo(() => {
    const keys = new Set<string>()
    docsNavGroups.forEach((group) => {
      group.branches.forEach((branch) => {
        if (branchContainsDocument(branch, selectedDocsDocument.id)) {
          keys.add(branch.key)
        }
      })
    })
    return keys
  }, [docsNavGroups, selectedDocsDocument.id])
  const toggleDocsBranch = (branchKey: string) => {
    setExpandedDocsBranches((current) =>
      current.includes(branchKey) ? current.filter((key) => key !== branchKey) : [...current, branchKey],
    )
  }
  const contactMailto = useMemo(() => {
    const valueOrFallback = (value: string) => value.trim() || copy.contactPage.emptyValue
    const subject = `${copy.contactPage.subjectPrefix} - ${valueOrFallback(contactForm.name)}`
    const body = [
      `${copy.contactPage.fields.name}: ${valueOrFallback(contactForm.name)}`,
      `${copy.contactPage.fields.company}: ${valueOrFallback(contactForm.company)}`,
      `${copy.contactPage.fields.email}: ${valueOrFallback(contactForm.email)}`,
      `${copy.contactPage.fields.message}:`,
      valueOrFallback(contactForm.message),
    ].join('\n')

    return `${mailTo}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }, [contactForm, copy.contactPage])

  useEffect(() => {
    const syncViewFromLocation = () => {
      setActiveView(viewFromHash(window.location.hash))
    }

    syncViewFromLocation()
    window.addEventListener('hashchange', syncViewFromLocation)
    window.addEventListener('popstate', syncViewFromLocation)

    return () => {
      window.removeEventListener('hashchange', syncViewFromLocation)
      window.removeEventListener('popstate', syncViewFromLocation)
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = copy.lang

    try {
      window.localStorage.setItem(localeStorageKey, locale)
    } catch {
      return
    }
  }, [copy.lang, locale])

  const activateView = (view: ViewId) => {
    setActiveView(view)

    const hash = `#${view}`
    if (window.location.hash !== hash) {
      window.history.pushState(null, '', hash)
    }
  }

  const handleViewClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    if (!isViewId(id)) {
      return
    }

    event.preventDefault()
    activateView(id)
  }

  const handleFooterLinkClick = (event: MouseEvent<HTMLAnchorElement>, label: string) => {
    const target = footerTargetByLabel[label]

    if (!target) {
      return
    }

    event.preventDefault()

    if (target.product) {
      setActiveProduct(target.product)
    }

    activateView(target.view)
  }

  const selectLanguage = (nextLocale: Locale) => {
    setLocale(nextLocale)
    setIsLanguageMenuOpen(false)
  }

  const handleLanguageBlur = (event: FocusEvent<HTMLDivElement>) => {
    const nextTarget = event.relatedTarget

    if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) {
      setIsLanguageMenuOpen(false)
    }
  }

  const handleLanguageKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      setIsLanguageMenuOpen(false)
    }
  }

  const handleDocsMenuBlur = (event: FocusEvent<HTMLDivElement>) => {
    const nextTarget = event.relatedTarget

    if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) {
      setIsDocsMenuOpen(false)
    }
  }

  const selectDocsProduct = (product: ProductId) => {
    const nextCatalog = docsCatalogs[product]
    setActiveDocsProduct(product)
    setActiveDocsTopic(nextCatalog.defaultDocumentId)
    setActiveDocsVersion(nextCatalog.versions[0]?.id ?? '1.0')
    setExpandedDocsBranches([])
    setIsDocsMenuOpen(false)
    activateView('docs')
  }

  const handleDocsMenuKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      setIsDocsMenuOpen(false)
    }
  }

  const changeDocsVersion = (event: ChangeEvent<HTMLSelectElement>) => {
    setActiveDocsVersion(event.currentTarget.value)
  }

  const updateContactField =
    (field: keyof ContactFormState) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = event.currentTarget

      setContactForm((currentForm) => ({
        ...currentForm,
        [field]: value,
      }))
    }

  return (
    <div className="site-shell" id="top">
      <header className="site-header">
        <div className="header-inner">
          <BrandMark ariaLabel={copy.brandHomeLabel} href="#home" onClick={(event) => handleViewClick(event, 'home')} />
          <nav className="nav-links" aria-label={copy.navLabel}>
            {copy.navItems.map((item) => {
              const isActive = isViewId(item.id) && activeView === item.id
              if (item.id === 'docs') {
                return (
                  <div
                    className="nav-docs-menu"
                    key={item.label}
                    onBlur={handleDocsMenuBlur}
                    onKeyDown={handleDocsMenuKeyDown}
                  >
                    <a
                      aria-controls={docsMenuId}
                      aria-current={isActive ? 'page' : undefined}
                      aria-expanded={isDocsMenuOpen}
                      aria-haspopup="menu"
                      href={item.href}
                      onClick={(event) => {
                        event.preventDefault()
                        activateView('docs')
                        setIsDocsMenuOpen((isOpen) => !isOpen)
                      }}
                    >
                      {item.label}
                      <ChevronDown className="nav-docs-menu__chevron" size={13} strokeWidth={2.2} aria-hidden="true" />
                    </a>
                    {isDocsMenuOpen && (
                      <div className="nav-docs-menu__panel" id={docsMenuId} role="menu" aria-label={item.label}>
                        {docsProductOptions.map((product) => (
                          <button
                            className={product.id === activeDocsProduct ? 'is-selected' : undefined}
                            key={product.id}
                            onClick={() => selectDocsProduct(product.id)}
                            role="menuitem"
                            type="button"
                          >
                            <span>{product.label}</span>
                            <small>{product.summary}</small>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )
              }

              return (
                <a
                  aria-current={isActive ? 'page' : undefined}
                  href={item.href}
                  key={item.label}
                  onClick={(event) => handleViewClick(event, item.id)}
                >
                  {item.label}
                </a>
              )
            })}
          </nav>
          <div className="header-actions">
            <div className="language-select" onBlur={handleLanguageBlur} onKeyDown={handleLanguageKeyDown}>
              <Languages size={16} strokeWidth={1.9} aria-hidden="true" />
              <span className="language-select__label" aria-hidden="true">
                {copy.languageLabel}
              </span>
              <button
                aria-controls={languageMenuId}
                aria-expanded={isLanguageMenuOpen}
                aria-haspopup="listbox"
                aria-label={`${copy.languageLabel}: ${copy.languageOptions[locale]}`}
                className="language-select__trigger"
                onClick={() => setIsLanguageMenuOpen((isOpen) => !isOpen)}
                type="button"
              >
                {copy.languageOptions[locale]}
              </button>
              <ChevronDown
                className={`language-select__chevron${isLanguageMenuOpen ? ' is-open' : ''}`}
                size={15}
                strokeWidth={2}
                aria-hidden="true"
              />
              {isLanguageMenuOpen && (
                <div className="language-select__menu" id={languageMenuId} role="listbox" aria-label={copy.languageLabel}>
                  {localeOptions.map((option) => {
                    const isSelected = locale === option

                    return (
                      <button
                        aria-selected={isSelected}
                        className={`language-select__option${isSelected ? ' is-selected' : ''}`}
                        key={option}
                        onClick={() => selectLanguage(option)}
                        role="option"
                        type="button"
                      >
                        <span>{copy.languageOptions[option]}</span>
                        <Check size={14} strokeWidth={2.4} aria-hidden="true" />
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
            <a className="text-link" href="https://github.com/yunliu-tech">
              {copy.github}
            </a>
            <a className="button button--compact" href={contactHref} onClick={(event) => handleViewClick(event, 'contact')}>
              {copy.contact}
            </a>
          </div>
        </div>
      </header>

      <main>
        {activeView === 'home' && (
          <section className="hero-section" id="home" aria-labelledby="hero-title">
            <HeroMotionField />
            <div className="hero-copy">
              <div className="hero-company-mark" aria-hidden="true">
                {copy.hero.eyebrow.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <h1 id="hero-title" aria-label={locale === 'zh' ? copy.hero.title.replace(/\s+/g, '') : copy.hero.title.replace(/\s+/g, ' ')}>
                {copy.hero.title}
              </h1>
              <p className="hero-lede">{copy.hero.body}</p>
              <div className="hero-actions">
                <a className="button" href={docsHref} onClick={(event) => handleViewClick(event, 'docs')}>
                  {copy.hero.primaryCta}
                  <ArrowRight size={17} strokeWidth={2} aria-hidden="true" />
                </a>
                <a className="button button--secondary" href="#product" onClick={(event) => handleViewClick(event, 'product')}>
                  {copy.hero.secondaryCta}
                </a>
              </div>
              <div className="hero-data-pulse" aria-label={copy.hero.commandLabel}>
                {copy.hero.flowSignals.map((signal, index) => (
                  <span className={`hero-data-pulse__item hero-data-pulse__item--${index + 1}`} key={signal.label}>
                    <i aria-hidden="true" />
                    <strong>{signal.label}</strong>
                    <small>{signal.value}</small>
                  </span>
                ))}
              </div>
              <div className="hero-signals" aria-label={copy.hero.signalsLabel}>
                {copy.hero.signals.map((signal) => (
                  <span key={signal}>{signal}</span>
                ))}
              </div>
            </div>
            <ArchitectureVisual content={copy.visual} />
          </section>
        )}

        {activeView === 'product' && (
          <section className="section section--capabilities page-view" id="product" aria-labelledby="product-title">
            <div className="section-heading">
              <p className="section-code">{copy.productPage.eyebrow}</p>
              <h2 id="product-title">{copy.productPage.title}</h2>
              <p>{copy.productPage.intro}</p>
            </div>

            <div className="product-page-layout">
              <div className="product-selector" role="tablist" aria-label={copy.productPage.selectorLabel}>
                {copy.products.map((product, index) => {
                  const Icon = productIcons[index] ?? Server

                  return (
                    <button
                      aria-controls={`${product.id}-panel`}
                      aria-selected={activeProduct === product.id}
                      className="product-tab"
                      id={`${product.id}-tab`}
                      key={product.id}
                      onClick={() => setActiveProduct(product.id)}
                      role="tab"
                      type="button"
                    >
                      {product.id === 'velamq' ? (
                        <VelaMQIcon className="product-tab__velamq-icon" />
                      ) : (
                        <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
                      )}
                      <span>{product.name}</span>
                    </button>
                  )
                })}
              </div>

              <article
                aria-labelledby={`${selectedProduct.id}-tab`}
                className="product-card product-card--featured"
                id={`${selectedProduct.id}-panel`}
                role="tabpanel"
              >
                <div className="product-card__top">
                  <span className="product-card__icon">
                    {selectedProduct.id === 'velamq' ? (
                      <VelaMQIcon
                        className="product-card__velamq-icon"
                        label={locale === 'zh' ? 'VelaMQ 产品图标' : 'VelaMQ product icon'}
                      />
                    ) : (
                      <SelectedProductIcon size={22} strokeWidth={1.8} aria-hidden="true" />
                    )}
                  </span>
                  <span className="product-card__label">{selectedProduct.label}</span>
                </div>
                <h3>{selectedProduct.name}</h3>
                <strong>{selectedProduct.summary}</strong>
                <p>{selectedProduct.text}</p>
                <div className="product-tags" aria-label={`${selectedProduct.name} ${copy.productPage.tagsLabelSuffix}`}>
                  {selectedProduct.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            </div>

            <div className="section-heading section-heading--compact">
              <p className="section-code">{copy.productPage.capabilityEyebrow}</p>
              <h2 id="capability-title">{copy.productPage.capabilityTitle}</h2>
            </div>
            <div className="capability-grid">
              {copy.capabilities.map((item, index) => {
                const Icon = capabilityIcons[index] ?? Server

                return (
                  <article className="capability-card" key={item.title}>
                    <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                )
              })}
            </div>
          </section>
        )}

        {activeView === 'platform' && (
          <section className="section section--architecture page-view" id="platform" aria-labelledby="architecture-title">
            <div className="architecture-copy">
              <p className="section-code">{copy.platform.eyebrow}</p>
              <h2 id="architecture-title">{copy.platform.title}</h2>
              <p>{copy.platform.body}</p>
            </div>
            <ClusterDiagram content={copy.cluster} />
            <div className="architecture-points">
              {copy.architecturePoints.map((point) => (
                <article key={point.title}>
                  <Gauge size={18} strokeWidth={1.8} aria-hidden="true" />
                  <h3>{point.title}</h3>
                  <p>{point.text}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeView === 'docs' && (
          <section className="docs-page docs-page--manual page-view" id="docs" aria-labelledby="docs-title">
            <aside className="docs-sidebar" aria-label={docsCatalog.sidebarLabel}>
              <div className="docs-search">
                <Search size={16} strokeWidth={1.8} aria-hidden="true" />
                <span>{docsCatalog.searchPlaceholder}</span>
                <kbd>⌘K</kbd>
              </div>
              <div className="docs-version-card">
                <label htmlFor="docs-version">{locale === 'zh' ? '版本' : 'Version'}</label>
                <select id="docs-version" onChange={changeDocsVersion} value={selectedDocsVersion.id}>
                  {docsCatalog.versions.map((version) => (
                    <option key={version.id} value={version.id}>
                      {version.status === 'latest' ? `latest (${version.label})` : version.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="docs-nav-groups">
                {docsNavGroups.map((group) => (
                  <div className="docs-nav-group" key={group.title}>
                    <h3>{group.title}</h3>
                    {group.branches.map((branch) => {
                      const hasChildren = branch.children.length > 0
                      const isExpanded = expandedDocsBranches.includes(branch.key) || activeDocsBranchKeys.has(branch.key)
                      const toggleLabel = `${isExpanded ? (locale === 'zh' ? '折叠' : 'Collapse') : locale === 'zh' ? '展开' : 'Expand'} ${
                        branch.entry.label
                      }`

                      return (
                        <div className="docs-nav-branch" key={branch.key}>
                          <div className="docs-nav-row">
                            {hasChildren ? (
                              <button
                                aria-expanded={isExpanded}
                                aria-label={toggleLabel}
                                className={`docs-nav-button docs-nav-parent docs-nav-depth-0${
                                  branch.entry.type === 'doc' && selectedDocsDocument.id === branch.entry.id
                                    ? ' is-current-parent'
                                    : ''
                                }`}
                                onClick={() => {
                                  toggleDocsBranch(branch.key)
                                }}
                                type="button"
                              >
                                <span>{branch.entry.label}</span>
                                <ChevronDown className="docs-nav-parent__chevron" size={14} strokeWidth={2} aria-hidden="true" />
                              </button>
                            ) : branch.entry.type === 'category' ? (
                              <span className="docs-nav-category docs-nav-category--root">{branch.entry.label}</span>
                            ) : (
                              (() => {
                                const entry = branch.entry

                                return (
                                  <button
                                    aria-current={selectedDocsDocument.id === entry.id ? 'page' : undefined}
                                    className="docs-nav-button docs-nav-depth-0"
                                    data-doc-topic={entry.id}
                                    onClick={() => {
                                      setActiveDocsTopic(entry.id)
                                    }}
                                    type="button"
                                  >
                                    {entry.label}
                                  </button>
                                )
                              })()
                            )}
                          </div>
                          {hasChildren && isExpanded && (
                            <div className="docs-nav-children">
                              {branch.children.map((entry) =>
                                entry.type === 'category' ? (
                                  <span
                                    className={`docs-nav-category docs-nav-depth-${entry.depth}`}
                                    key={`${branch.key}-${entry.label}`}
                                  >
                                    {entry.label}
                                  </span>
                                ) : (
                                  <button
                                    aria-current={selectedDocsDocument.id === entry.id ? 'page' : undefined}
                                    className={`docs-nav-button docs-nav-depth-${entry.depth}`}
                                    data-doc-topic={entry.id}
                                    key={entry.id}
                                    onClick={() => {
                                      setActiveDocsTopic(entry.id)
                                    }}
                                    type="button"
                                  >
                                    {entry.label}
                                  </button>
                                ),
                              )}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </aside>

            <article className="docs-article">
              <p className="section-code">{docsCatalog.eyebrow}</p>
              <h2 id="docs-title">{docsCatalog.title}</h2>
              <p className="docs-article__lede">{docsCatalog.body}</p>

              <div className="docs-command" aria-label={docsCatalog.commandLabel}>
                <Terminal size={17} strokeWidth={1.8} aria-hidden="true" />
                <span>$</span>
                <code>{selectedDocsVersion.command}</code>
              </div>

              <div className="docs-topic-panel docs-document-panel">
                <div className="docs-document-header">
                  <span className="docs-document-path">{selectedDocsDocument.sourcePath}</span>
                  <h3 id={`${selectedDocsDocument.id}-title`}>{selectedDocsDocument.title}</h3>
                  {selectedDocsDocument.summary && <p>{selectedDocsDocument.summary}</p>}
                </div>

                <div className="docs-document-body">
                  {selectedDocsDocument.blocks.map((block, index) => (
                    <div className="docs-block" key={`${selectedDocsDocument.id}-${index}`}>
                      {renderDocsBlock(block, selectedDocsDocument, docsCatalog, setActiveDocsTopic)}
                    </div>
                  ))}
                </div>
              </div>
            </article>

            <aside className="docs-toc" aria-label={docsCatalog.tocLabel}>
              <h3>{docsCatalog.tocLabel}</h3>
              <a href="#docs" onClick={(event) => event.preventDefault()}>
                {selectedDocsDocument.title}
              </a>
              {selectedDocsDocument.headings.map((heading) => (
                <a
                  className={`docs-toc-depth-${heading.level}`}
                  href={`#${heading.id}`}
                  key={heading.id}
                  onClick={(event) => {
                    event.preventDefault()
                    document.getElementById(heading.id)?.scrollIntoView({ block: 'start' })
                  }}
                >
                  {heading.text}
                </a>
              ))}
            </aside>
          </section>
        )}

        {activeView === 'solutions' && (
          <section className="section page-view" id="solutions" aria-labelledby="solutions-title">
            <div className="section-heading section-heading--split">
              <div>
                <p className="section-code">{copy.solutionsPage.eyebrow}</p>
                <h2 id="solutions-title">{copy.solutionsPage.title}</h2>
              </div>
              <p>{copy.solutionsPage.body}</p>
            </div>
            <div className="solution-overview" aria-labelledby="solution-overview-title">
              <div className="solution-overview__copy">
                <p className="section-code">{copy.solutionsPage.overviewLabel}</p>
                <h3 id="solution-overview-title">{copy.solutionsPage.overviewTitle}</h3>
                <p>{copy.solutionsPage.overviewBody}</p>
                <div className="solution-metrics" aria-label={copy.solutionsPage.metricLabel}>
                  {copy.solutionsPage.metrics.map((metric) => (
                    <span key={metric.label}>
                      <strong>{metric.value}</strong>
                      {metric.label}
                    </span>
                  ))}
                </div>
              </div>
              <div className="solution-flow-panel" aria-label={copy.solutionsPage.flowLabel}>
                <div className="solution-flow-panel__hub">
                  <VelaMQIcon className="solution-flow-panel__hub-icon" />
                  <span>HANWANG TECH</span>
                  <strong>VelaMQ</strong>
                  <p>{copy.solutionsPage.flowLabel}</p>
                </div>
                <div className="solution-flow-steps">
                  {copy.solutionsPage.flowSteps.map((step, index) => (
                    <article key={step.title}>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <h4>{step.title}</h4>
                      <p>{step.text}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
            <div className="solution-grid">
              {copy.solutions.map((solution, index) => {
                const Icon = solutionIcons[index] ?? Factory

                return (
                  <article className={`solution-card solution-card--${solution.visual.kind}`} key={solution.title}>
                    <div className="solution-card__top">
                      <div className="solution-icon">
                        <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
                      </div>
                      <span className="solution-card__index">{String(index + 1).padStart(2, '0')}</span>
                    </div>
                    <h3>{solution.title}</h3>
                    <p className="solution-card__body">{solution.text}</p>
                    <SolutionScenarioVisual content={solution.visual} />
                    <div className="solution-card__modules" aria-label={`${solution.title} ${copy.solutionsPage.moduleLabel}`}>
                      {solution.modules.map((module) => (
                        <span key={module}>{module}</span>
                      ))}
                    </div>
                    <p className="solution-card__outcome">
                      <span>{copy.solutionsPage.outcomeLabel}</span>
                      {solution.outcome}
                    </p>
                  </article>
                )
              })}
            </div>
          </section>
        )}

        {activeView === 'support' && (
          <section className="developer-section page-view" id="support" aria-labelledby="developer-title">
            <div className="support-board" aria-label={copy.supportPage.boardLabel}>
              <div className="support-board__bar">
                <span>{copy.supportPage.boardTitle}</span>
                <strong>{copy.supportPage.boardStatus}</strong>
              </div>
              <div className="support-board__grid">
                {copy.supportSteps.map((step, index) => (
                  <article className="support-step" key={step.title}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </article>
                ))}
              </div>
              <div className="support-board__summary">
                {copy.supportPage.summary.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
            <div className="developer-copy">
              <p className="section-code">{copy.supportPage.eyebrow}</p>
              <h2 id="developer-title">{copy.supportPage.title}</h2>
              <p>{copy.supportPage.body}</p>
              <div className="resource-links" id="download">
                {copy.resources.map((resource, index) => {
                  const Icon = resourceIcons[index] ?? BookOpen

                  return (
                    <a key={resource.label} href={resource.href}>
                      <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
                      {resource.label}
                    </a>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {activeView === 'company' && (
          <section className="final-cta company-page page-view" id="company" aria-labelledby="cta-title">
            <div>
              <p>{companyName}</p>
              <h2 id="cta-title">{copy.companyPage.title}</h2>
              <span>{copy.companyPage.body}</span>
            </div>
            <div className="company-facts" aria-label={copy.companyPage.title}>
              {copy.companyPage.facts.map((fact) => (
                <span key={fact}>{fact}</span>
              ))}
            </div>
            <a className="button" href={contactHref} onClick={(event) => handleViewClick(event, 'contact')}>
              {copy.contact}
              <ArrowRight size={17} strokeWidth={2} aria-hidden="true" />
            </a>
          </section>
        )}

        {activeView === 'contact' && (
          <section className="contact-section page-view" id="contact" aria-labelledby="contact-title">
            <div className="contact-copy">
              <p className="section-code">{copy.contactPage.eyebrow}</p>
              <h2 id="contact-title">{copy.contactPage.title}</h2>
              <p>{copy.contactPage.body}</p>
              <div className="contact-meta">
                <span>
                  <Mail size={17} strokeWidth={1.8} aria-hidden="true" />
                  <strong>{copy.contactPage.directEmailLabel}</strong>
                  {salesEmail}
                </span>
                <span>
                  <Activity size={17} strokeWidth={1.8} aria-hidden="true" />
                  <strong>{copy.contactPage.responseTime}</strong>
                </span>
              </div>
            </div>

            <form className="contact-form" aria-label={copy.contactPage.title}>
              <label htmlFor="contact-name">
                {copy.contactPage.fields.name}
                <input
                  id="contact-name"
                  name="name"
                  onChange={updateContactField('name')}
                  placeholder={copy.contactPage.placeholders.name}
                  value={contactForm.name}
                />
              </label>
              <label htmlFor="contact-company">
                {copy.contactPage.fields.company}
                <input
                  id="contact-company"
                  name="company"
                  onChange={updateContactField('company')}
                  placeholder={copy.contactPage.placeholders.company}
                  value={contactForm.company}
                />
              </label>
              <label htmlFor="contact-email">
                {copy.contactPage.fields.email}
                <input
                  id="contact-email"
                  name="email"
                  onChange={updateContactField('email')}
                  placeholder={copy.contactPage.placeholders.email}
                  type="email"
                  value={contactForm.email}
                />
              </label>
              <label className="contact-form__full" htmlFor="contact-message">
                {copy.contactPage.fields.message}
                <textarea
                  id="contact-message"
                  name="message"
                  onChange={updateContactField('message')}
                  placeholder={copy.contactPage.placeholders.message}
                  rows={6}
                  value={contactForm.message}
                />
              </label>
              <div className="contact-form__actions">
                <a className="button" href={contactMailto}>
                  {copy.contactPage.sendCta}
                  <ArrowRight size={17} strokeWidth={2} aria-hidden="true" />
                </a>
                <a className="text-link" href={mailTo}>
                  {salesEmail}
                </a>
              </div>
              <p>{copy.contactPage.mailHint}</p>
            </form>
          </section>
        )}
      </main>

      <footer className="site-footer">
        <div className="footer-brand">
          <BrandMark ariaLabel={copy.brandHomeLabel} href="#home" onClick={(event) => handleViewClick(event, 'home')} />
          <p>{copy.footerText}</p>
          <div className="footer-filing" aria-label={copy.icp.label}>
            <a href={copy.icp.href} target="_blank" rel="noreferrer">
              {copy.icp.number}
            </a>
            <span>{copy.icp.domain}</span>
          </div>
        </div>
        <div className="footer-columns">
          {copy.footerColumns.map((column) => (
            <div key={column.title}>
              <h3>{column.title}</h3>
              {column.links.map((link) => (
                <a href={`#${footerTargetByLabel[link]?.view ?? 'home'}`} key={link} onClick={(event) => handleFooterLinkClick(event, link)}>
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>
      </footer>
    </div>
  )
}

export default App
