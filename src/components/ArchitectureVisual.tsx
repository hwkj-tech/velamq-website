import type { VisualContent } from '../content'
import { VelaMQIcon } from './VelaMQIcon'

const defaultContent: VisualContent = {
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
}

type ArchitectureVisualProps = {
  content?: VisualContent
}

export function ArchitectureVisual({ content = defaultContent }: ArchitectureVisualProps) {
  const inputItems =
    'inputItems' in content && content.inputItems
      ? content.inputItems
      : content.inputChips.map((chip) => ({ title: chip, meta: 'stream', detail: '' }))

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
              {inputItems.map((item) => (
                <article className="flow-business-input" key={item.title}>
                  <i aria-hidden="true" />
                  <div>
                    <small>{item.meta}</small>
                    <strong>{item.title}</strong>
                    {'detail' in item && item.detail && <p>{item.detail}</p>}
                    {'badges' in item && item.badges && (
                      <div className="flow-business-badges">
                        {item.badges.map((badge) => (
                          <span key={badge}>{badge}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
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
                  <div className="flow-business-service__head">
                  <small>{card.meta}</small>
                  {'status' in card && card.status && <em>{card.status}</em>}
                </div>
                <strong>{card.title}</strong>
                  {card.text && <p>{card.text}</p>}
                  {'badges' in card && card.badges && (
                    <div className="flow-business-badges">
                      {card.badges.map((badge) => (
                        <span key={badge}>{badge}</span>
                      ))}
                    </div>
                  )}
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
