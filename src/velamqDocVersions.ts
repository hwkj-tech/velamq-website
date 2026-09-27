import { velamqDocs, type VelaMQDocsCatalog } from './velamqDocs'
import { velamqDocsV002Data } from './velamqDocsV002.generated'

const versions = [
  {
    id: 'v0.0.2', label: 'v0.0.2', status: 'current', date: 'VelaMQ v0.0.2',
    note: '完整使用手册，含规则函数、离线消息、配置迁移和 Prometheus 集成。',
    command: '',
  },
  ...velamqDocs.zh.versions,
]

// Keep the imported archive immutable. Switching versions must change the
// document/search/navigation data, not just the version label.
const current: VelaMQDocsCatalog = {
  ...velamqDocs.zh,
  body: 'VelaMQ 0.0.2 完整使用手册：安装部署、数据源、安全认证、规则引擎、集群与运维。',
  defaultDocumentId: 'release-notes',
  versions,
  ...velamqDocsV002Data,
}
const archived: VelaMQDocsCatalog = { ...velamqDocs.zh, versions }

export function getVelaMQDocs(locale: 'zh' | 'en', version?: string): VelaMQDocsCatalog {
  // The new manual is Chinese. Preserve the existing English documentation
  // until a reviewed English 0.0.2 translation is available.
  if (locale === 'en') return velamqDocs.en
  return version === 'v0.0.1' ? archived : current
}
