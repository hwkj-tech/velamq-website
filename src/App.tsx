import {
  Activity,
  ArrowRight,
  BookOpen,
  Building2,
  Cable,
  Car,
  ChevronDown,
  Cloud,
  Database,
  Factory,
  Gauge,
  Landmark,
  Languages,
  Mail,
  Server,
  ShieldCheck,
  Workflow,
} from 'lucide-react'
import { type ChangeEvent, type MouseEvent, useEffect, useMemo, useState } from 'react'
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

const capabilityIcons = [Server, Workflow, Database, Activity, ShieldCheck, Cable]
const solutionIcons = [Factory, Car, Building2, Landmark]
const productIcons = [Server, Gauge]
const resourceIcons = [BookOpen, Database, Activity, Cloud]
const localeStorageKey = 'hannet-locale'
const contactHref = '#contact'

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

const isViewId = (id: string): id is ViewId => viewIds.includes(id as ViewId)

const readInitialLocale = (): Locale => {
  try {
    return window.localStorage.getItem(localeStorageKey) === 'en' ? 'en' : 'zh'
  } catch {
    return 'zh'
  }
}

function App() {
  const [locale, setLocale] = useState<Locale>(readInitialLocale)
  const [activeView, setActiveView] = useState<ViewId>(() => viewFromHash(window.location.hash))
  const [activeProduct, setActiveProduct] = useState<ProductId>('velamq')
  const [contactForm, setContactForm] = useState<ContactFormState>(initialContactForm)

  const copy = translations[locale]
  const selectedProduct = useMemo(
    () => copy.products.find((product) => product.id === activeProduct) ?? copy.products[0],
    [activeProduct, copy.products],
  )
  const selectedProductIndex = copy.products.findIndex((product) => product.id === selectedProduct.id)
  const SelectedProductIcon = productIcons[selectedProductIndex] ?? Server
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

  const changeLanguage = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = event.currentTarget.value

    if (nextLocale === 'zh' || nextLocale === 'en') {
      setLocale(nextLocale)
    }
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
            <div className="language-select">
              <Languages size={16} strokeWidth={1.9} aria-hidden="true" />
              <span className="language-select__label" aria-hidden="true">
                {copy.languageLabel}
              </span>
              <select aria-label={copy.languageLabel} onChange={changeLanguage} value={locale}>
                <option value="zh">{copy.languageOptions.zh}</option>
                <option value="en">{copy.languageOptions.en}</option>
              </select>
              <ChevronDown className="language-select__chevron" size={15} strokeWidth={2} aria-hidden="true" />
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
              <h1 id="hero-title">{copy.hero.title}</h1>
              <p className="hero-lede">{copy.hero.body}</p>
              <div className="hero-actions">
                <a className="button" href={contactHref} onClick={(event) => handleViewClick(event, 'contact')}>
                  {copy.hero.primaryCta}
                  <ArrowRight size={17} strokeWidth={2} aria-hidden="true" />
                </a>
                <a className="button button--secondary" href="#product" onClick={(event) => handleViewClick(event, 'product')}>
                  {copy.hero.secondaryCta}
                </a>
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
        </div>
        <div className="footer-columns">
          {copy.footerColumns.map((column) => (
            <div key={column.title}>
              <h3>{column.title}</h3>
              {column.links.map((link) => (
                <span key={link}>{link}</span>
              ))}
            </div>
          ))}
        </div>
      </footer>
    </div>
  )
}

export default App
