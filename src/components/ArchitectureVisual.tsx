import type { VisualContent } from '../content'
import { VelaMQIcon } from './VelaMQIcon'

const defaultContent: VisualContent = {
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
}

type ArchitectureVisualProps = {
  content?: VisualContent
}

export function ArchitectureVisual({ content = defaultContent }: ArchitectureVisualProps) {
  return (
    <div className="architecture-visual flow-visual" role="img" aria-label={content.ariaLabel}>
      <svg className="flow-visual__net" viewBox="0 0 620 500" preserveAspectRatio="none" aria-hidden="true">
        <polyline points="54,34 486,18 598,166 540,482 24,358 54,34" />
      </svg>

      <div className="flow-terminal">
        <div className="flow-terminal__bar">
          <span className="terminal-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span>business.fabric</span>
          <strong>live</strong>
        </div>
        <div className="flow-terminal__screen">
          <div className="flow-business-board">
            <svg className="flow-business-board__paths" viewBox="0 0 720 320" aria-hidden="true">
              <path id="business-route-a" d="M128 80 C235 80 270 128 344 156" />
              <path id="business-route-b" d="M128 156 C230 156 276 156 344 156" />
              <path id="business-route-c" d="M128 232 C235 232 270 184 344 156" />
              <path id="business-route-d" d="M396 156 C470 92 518 80 604 80" />
              <path id="business-route-e" d="M396 156 C488 156 526 156 604 156" />
              <path id="business-route-f" d="M396 156 C470 222 518 232 604 232" />
              {['business-route-a', 'business-route-b', 'business-route-c', 'business-route-d', 'business-route-e', 'business-route-f'].map(
                (route, index) => (
                  <circle className={`flow-packet-dot flow-packet-dot--${index + 1}`} key={route} r="5">
                    <animateMotion begin={`${index * 0.26}s`} dur={`${5.4 + index * 0.22}s`} repeatCount="indefinite">
                      <mpath href={`#${route}`} />
                    </animateMotion>
                  </circle>
                ),
              )}
            </svg>

            <div className="flow-business-column flow-business-column--left" aria-label={content.inputLabel}>
              <span>{content.inputLabel}</span>
              {content.inputChips.map((chip) => (
                <strong key={chip}>{chip}</strong>
              ))}
            </div>

            <div className="flow-business-hub">
              <VelaMQIcon className="flow-visual__core-icon" />
              <span>{content.coreLabel}</span>
              <strong>VelaMQ</strong>
              <p>{content.coreBody}</p>
            </div>

            <div className="flow-business-column flow-business-column--right" aria-label={content.serviceLabel}>
              <span>{content.serviceLabel}</span>
              {content.serviceCards.map((card) => (
                <article className={`flow-business-service flow-business-service--${card.tone}`} key={card.title}>
                  <small>{card.meta}</small>
                  <strong>{card.title}</strong>
                  <p>{card.text}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="flow-business-strip" aria-label={content.flowLabel}>
            {content.flowSteps.map((step, index) => (
              <span className={index === 2 ? 'is-core' : undefined} key={step}>
                {step}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flow-visual__metrics" aria-label={content.modulesLabel}>
        {content.supportModules.map((module) => (
          <span key={module}>{module}</span>
        ))}
      </div>
    </div>
  )
}
