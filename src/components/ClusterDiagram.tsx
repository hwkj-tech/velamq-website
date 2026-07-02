import type { ClusterContent } from '../content'

const defaultContent: ClusterContent = {
  ariaLabel: '业务能力协同流程图',
  regions: [
    { label: '设备与现场', items: ['设备接入'] },
    { label: '业务协同', items: ['规则自动化', '告警分派', '数据看板'] },
    { label: '运营与系统', items: ['权限审计', '系统集成', '持续优化'] },
  ],
}

type ClusterDiagramProps = {
  content?: ClusterContent
}

export function ClusterDiagram({ content = defaultContent }: ClusterDiagramProps) {
  const [field, collaboration, operations] = content.regions

  return (
    <div className="cluster-diagram" aria-label={content.ariaLabel}>
      <div className="region-block">
        <span className="region-label">{field.label}</span>
        <div className="server-cell">{field.items[0]}</div>
      </div>
      <div className="diagram-arrow" aria-hidden="true" />
      <div className="region-block region-block--cluster">
        <span className="region-label">{collaboration.label}</span>
        <div className="server-matrix">
          {collaboration.items.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
      <div className="diagram-arrow" aria-hidden="true" />
      <div className="region-block region-block--global">
        <span className="region-label">{operations.label}</span>
        <div className="region-lines">
          {operations.items.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
