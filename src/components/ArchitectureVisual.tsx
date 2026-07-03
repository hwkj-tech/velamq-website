import type { VisualContent } from '../content'
import { VelaMQIcon } from './VelaMQIcon'

const defaultContent: VisualContent = {
  ariaLabel: '瀚网科技功能与数据流动态图',
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
}

const routes = {
  sourceA: 'M118 120 C198 116 250 142 336 178',
  sourceB: 'M118 196 C210 196 256 194 336 196',
  sourceC: 'M118 272 C204 276 254 246 336 214',
  serviceA: 'M430 164 C494 110 548 98 640 112',
  serviceB: 'M432 196 C510 196 558 196 640 196',
  serviceC: 'M430 228 C500 286 548 302 640 286',
}

type ArchitectureVisualProps = {
  content?: VisualContent
}

export function ArchitectureVisual({ content = defaultContent }: ArchitectureVisualProps) {
  return (
    <div className="architecture-visual flow-visual" role="img" aria-label={content.ariaLabel}>
      <div className="flow-visual__backdrop" aria-hidden="true">
        <span className="flow-visual__glow flow-visual__glow--a" />
        <span className="flow-visual__glow flow-visual__glow--b" />
        <span className="flow-visual__glow flow-visual__glow--c" />
      </div>

      <div className="flow-visual__status" aria-hidden="true">
        <span>business.fabric</span>
        <strong>live</strong>
      </div>

      <svg className="flow-visual__map" viewBox="0 0 760 360" aria-hidden="true">
        <defs>
          <linearGradient id="business-flow-line" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="#00acc1" stopOpacity="0.12" />
            <stop offset="46%" stopColor="#8df5e4" stopOpacity="0.86" />
            <stop offset="100%" stopColor="#ffb300" stopOpacity="0.78" />
          </linearGradient>
          <radialGradient id="business-flow-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8df5e4" stopOpacity="0.34" />
            <stop offset="58%" stopColor="#00acc1" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#00acc1" stopOpacity="0" />
          </radialGradient>
        </defs>

        <path className="flow-line flow-line--source-a" d={routes.sourceA} />
        <path className="flow-line flow-line--source-b" d={routes.sourceB} />
        <path className="flow-line flow-line--source-c" d={routes.sourceC} />
        <path className="flow-line flow-line--service-a" d={routes.serviceA} />
        <path className="flow-line flow-line--service-b" d={routes.serviceB} />
        <path className="flow-line flow-line--service-c" d={routes.serviceC} />

        <circle className="flow-core flow-core--outer" cx="382" cy="196" r="116" />
        <circle className="flow-core flow-core--middle" cx="382" cy="196" r="74" />
        <circle className="flow-core flow-core--inner" cx="382" cy="196" r="10" />

        <circle className="flow-pulse flow-pulse--a" cx="118" cy="120" r="7" />
        <circle className="flow-pulse flow-pulse--b" cx="118" cy="196" r="6" />
        <circle className="flow-pulse flow-pulse--c" cx="118" cy="272" r="6" />
        <circle className="flow-pulse flow-pulse--d" cx="640" cy="196" r="6" />

        {Object.values(routes).map((route, index) => (
          <circle className={`flow-packet flow-packet--${index + 1}`} key={route} r={index < 3 ? 5 : 4.5}>
            <animateMotion begin={`${index * 0.28}s`} dur={`${5.8 + index * 0.36}s`} path={route} repeatCount="indefinite" />
          </circle>
        ))}
      </svg>

      <div className="flow-visual__stage">
        <div className="flow-source-panel" aria-label={content.inputLabel}>
          {content.inputChips.map((chip, index) => (
            <span className={`flow-source flow-source--${index + 1}`} key={chip}>
              <i aria-hidden="true" />
              {chip}
            </span>
          ))}
        </div>

        <div className="flow-center-stage">
          <div className="flow-visual__core">
            <VelaMQIcon className="flow-visual__core-icon" />
            <span>{content.coreLabel}</span>
            <strong>VelaMQ</strong>
            <p>{content.coreBody}</p>
          </div>

          <div className="flow-data-panel" aria-hidden="true">
            <span className="flow-data-panel__ring flow-data-panel__ring--a" />
            <span className="flow-data-panel__ring flow-data-panel__ring--b" />
            <span className="flow-data-panel__node flow-data-panel__node--a" />
            <span className="flow-data-panel__node flow-data-panel__node--b" />
            <span className="flow-data-panel__node flow-data-panel__node--c" />
            <div className="flow-data-card">
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>

        <div className="flow-service-stack" aria-label={content.serviceLabel}>
          {content.serviceCards.map((card) => (
            <article className={`flow-service-card flow-service-card--${card.tone}`} key={card.title}>
              <span>{card.meta}</span>
              <h2>{card.title}</h2>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="flow-modules" aria-label={content.modulesLabel}>
        {content.supportModules.map((module) => (
          <span key={module}>{module}</span>
        ))}
      </div>

      <div className="flow-chain" aria-label={content.flowLabel}>
        {content.flowSteps.map((step, index) => (
          <span className={index === 2 ? 'is-core' : undefined} key={step}>
            {step}
          </span>
        ))}
      </div>
    </div>
  )
}
