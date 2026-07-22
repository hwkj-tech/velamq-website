import { existsSync } from 'node:fs'
import path from 'node:path'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { velamqDocs } from './velamqDocs'

describe('HanNet homepage', () => {
  beforeEach(() => {
    window.history.replaceState(null, '', '/')
    window.localStorage.clear()
  })

  it('renders the company-led home view without rendering every page at once', () => {
    render(<App />)

    expect(screen.getAllByText('翰网科技').length).toBeGreaterThan(0)
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /设备数据接入与业务协同平台/,
      }),
    ).toBeInTheDocument()
    screen.getAllByRole('link', { name: '联系销售' }).forEach((link) => {
      expect(link).toHaveAttribute('href', '#contact')
    })
    expect(screen.getByRole('link', { name: '查看产品' })).toBeInTheDocument()
    expect(screen.getAllByText(/SQL 规则引擎/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/MQTT over QUIC/).length).toBeGreaterThan(0)
    expect(screen.getByRole('img', { name: '翰网科技技术能力与消息流动态图' })).toBeInTheDocument()
    expect(screen.getByText('协议接入层')).toBeInTheDocument()
    expect(screen.getByText('AI 诊断与观测')).toBeInTheDocument()
    expect(screen.getAllByText('规则引擎').length).toBeGreaterThan(0)
    expect(screen.getByText('权限审计')).toBeInTheDocument()
    expect(screen.getAllByText('AI Insight').length).toBeGreaterThan(0)
    expect(screen.queryByText('车联现场')).not.toBeInTheDocument()
    expect(screen.queryByTestId('hero-vehicle-visual')).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { level: 2, name: '产品矩阵' })).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { level: 2, name: '让设备数据进入业务闭环' })).not.toBeInTheDocument()
  })

  it('renders the expected navigation, language switcher and company identity', () => {
    render(<App />)

    const nav = screen.getByRole('navigation', { name: '主导航' })
    ;['首页', '产品', '解决方案', '平台能力', '文档', '服务支持', '关于我们', '联系我们'].forEach((label) => {
      expect(within(nav).getByRole('link', { name: label })).toBeInTheDocument()
    })
    expect(screen.getByRole('button', { name: '语言: 中文' })).toHaveAttribute('aria-expanded', 'false')
    expect(screen.getAllByText('南京翰网科技有限公司').length).toBeGreaterThan(0)
    expect(screen.getByRole('link', { name: '苏ICP备2026045547号-1' })).toHaveAttribute(
      'href',
      'https://beian.miit.gov.cn/',
    )
    expect(screen.getByText('velamq.com')).toBeInTheDocument()
  })

  it('renders a contact sales form that creates a prefilled email link', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('link', { name: '联系我们' }))

    expect(screen.getByRole('heading', { level: 2, name: '联系销售' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { level: 1, name: /设备数据接入与业务协同平台/ })).not.toBeInTheDocument()

    await user.type(screen.getByLabelText('姓名'), '刘先生')
    await user.type(screen.getByLabelText('公司'), '翰网客户')
    await user.type(screen.getByLabelText('邮箱'), 'liu@example.com')
    await user.type(screen.getByLabelText('需求内容'), '想了解 VelaMQ 和 VelaMQ Bench 的上线方案')

    const sendLink = screen.getByRole('link', { name: '发送邮件' })

    expect(sendLink).toHaveAttribute('href', expect.stringContaining('mailto:sales@hanwang.tech'))
    expect(sendLink).toHaveAttribute('href', expect.stringContaining('subject='))
    expect(sendLink).toHaveAttribute('href', expect.stringContaining(encodeURIComponent('翰网科技官网咨询 - 刘先生')))
    expect(sendLink).toHaveAttribute('href', expect.stringContaining(encodeURIComponent('想了解 VelaMQ 和 VelaMQ Bench 的上线方案')))
  })

  it('renders products as an independent view with a selectable active product', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('link', { name: '产品' }))

    expect(screen.getByRole('heading', { level: 2, name: '产品矩阵' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'VelaMQ' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tab', { name: 'VelaMQ Bench' })).toHaveAttribute('aria-selected', 'false')
    expect(screen.getByRole('heading', { level: 3, name: 'VelaMQ' })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'VelaMQ 产品图标' })).toBeInTheDocument()
    expect(screen.getByText(/设备消息与规则协同平台/)).toBeInTheDocument()
    expect(screen.queryByRole('heading', { level: 2, name: '从评估到上线的服务支持' })).not.toBeInTheDocument()

    await user.click(screen.getByRole('tab', { name: 'VelaMQ Bench' }))

    expect(screen.getByRole('tab', { name: 'VelaMQ' })).toHaveAttribute('aria-selected', 'false')
    expect(screen.getByRole('tab', { name: 'VelaMQ Bench' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('heading', { level: 3, name: 'VelaMQ Bench' })).toBeInTheDocument()
    expect(screen.getByText(/容量评估与上线验证工具/)).toBeInTheDocument()
  })

  it('navigates from footer links', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('link', { name: 'VelaMQ Bench' }))

    expect(screen.getByRole('heading', { level: 2, name: '产品矩阵' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'VelaMQ Bench' })).toHaveAttribute('aria-selected', 'true')

    await user.click(screen.getByRole('link', { name: '文档中心' }))

    expect(screen.getByRole('heading', { level: 2, name: 'VelaMQ 文档中心' })).toBeInTheDocument()

    await user.click(screen.getByRole('link', { name: '联系方式' }))

    expect(screen.getByRole('heading', { level: 2, name: '联系销售' })).toBeInTheDocument()
  })

  it('renders each top-level feature view independently', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('link', { name: '解决方案' }))
    expect(screen.getByRole('heading', { level: 2, name: '让设备数据进入业务闭环' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: '从现场接入到运营闭环的一条业务数据链路' })).toBeInTheDocument()
    expect(screen.getByText('现场接入')).toBeInTheDocument()
    expect(screen.getByText('车联网消息通道')).toBeInTheDocument()
    expect(screen.getAllByText('车辆数据流').length).toBeGreaterThan(1)
    expect(screen.getAllByText('交付结果')).toHaveLength(4)
    expect(screen.getByRole('img', { name: '工业设备接入动态数据流图' })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: '车联网数据流场景图' })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: '能源与楼宇数据采集动态数据流图' })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: '智慧城市实时事件动态数据流图' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { level: 2, name: '产品矩阵' })).not.toBeInTheDocument()

    const nav = screen.getByRole('navigation', { name: '主导航' })

    await user.click(within(nav).getByRole('link', { name: '平台能力' }))
    expect(screen.getByRole('heading', { level: 2, name: '让设备事件自然进入业务流程' })).toBeInTheDocument()
    expect(screen.getByText('流程保护')).toBeInTheDocument()
    expect(screen.queryByText('车联网消息通道')).not.toBeInTheDocument()

    await user.click(within(nav).getByRole('link', { name: '文档' }))
    expect(screen.getByRole('heading', { level: 2, name: 'VelaMQ 文档中心' })).toBeInTheDocument()
    expect(screen.getByRole('search', { name: '浏览 VelaMQ 文档、规则、API' })).toBeInTheDocument()
    expect(within(screen.getByRole('complementary', { name: 'VelaMQ 文档目录' })).queryByRole('search')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: '版本: v1.0.0' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: '产品介绍' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '展开 快速开始' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Linux 安装与服务管理' })).not.toBeInTheDocument()
    expect(screen.queryByText('VELAMQ DOCS')).not.toBeInTheDocument()
    expect(screen.queryByText('流程保护')).not.toBeInTheDocument()

    await user.click(within(nav).getByRole('link', { name: '服务支持' }))
    expect(screen.getByRole('heading', { level: 2, name: '从评估到上线的服务支持' })).toBeInTheDocument()
    expect(screen.getByText('试点验证')).toBeInTheDocument()
    expect(screen.queryByText('npm create velamq@latest edge-project')).not.toBeInTheDocument()
  })

  it('switches the rendered content between Chinese and English', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: '语言: 中文' }))
    expect(screen.getByRole('listbox', { name: '语言' })).toBeInTheDocument()
    await user.click(screen.getByRole('option', { name: 'English' }))

    expect(screen.getByRole('button', { name: 'Language: English' })).toHaveAttribute('aria-expanded', 'false')
    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /Device Data Access and Business Collaboration Platform/,
      }),
    ).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Hanwang Tech technical capabilities and message-flow animation' })).toBeInTheDocument()
    expect(screen.getByText('Protocol Mesh')).toBeInTheDocument()
    expect(screen.getByText('SQL Rule Engine')).toBeInTheDocument()
    expect(screen.getByText('AI Ops Copilot')).toBeInTheDocument()
    expect(screen.getByText('Rule Engine')).toBeInTheDocument()
    expect(screen.getByText('ACL / Audit')).toBeInTheDocument()
    expect(screen.getAllByText('AI Insight').length).toBeGreaterThan(0)
    expect(screen.queryByText('协议接入层')).not.toBeInTheDocument()
    expect(screen.queryByText('AI 诊断与观测')).not.toBeInTheDocument()

    const nav = screen.getByRole('navigation', { name: 'Main navigation' })

    await user.click(within(nav).getByRole('link', { name: 'Products' }))

    expect(screen.getByRole('heading', { level: 2, name: 'Products' })).toBeInTheDocument()
    await user.click(screen.getByRole('tab', { name: 'VelaMQ Bench' }))
    expect(screen.getByText(/Capacity assessment and launch validation/)).toBeInTheDocument()

    await user.click(within(nav).getByRole('link', { name: 'Docs' }))
    expect(screen.getByRole('heading', { level: 2, name: 'VelaMQ Documentation' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Version: v1.0.0' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'Product Introduction' })).toBeInTheDocument()

    await user.click(within(nav).getByRole('link', { name: 'Contact' }))
    expect(screen.getByRole('heading', { level: 2, name: 'Contact sales' })).toBeInTheDocument()
    await user.type(screen.getByLabelText('Name'), 'Alex')
    expect(screen.getByRole('link', { name: 'Send email' })).toHaveAttribute(
      'href',
      expect.stringContaining(encodeURIComponent('Hanwang Tech website inquiry - Alex')),
    )
  })

  it('renders service support resources without command-line content', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(within(screen.getByRole('navigation', { name: '主导航' })).getByRole('link', { name: '服务支持' }))

    expect(screen.getByText('从评估到上线的服务支持')).toBeInTheDocument()
    ;['方案沟通', '接入评估', '试点落地', '服务支持'].forEach((label) => {
      expect(screen.getAllByRole('link', { name: label }).length).toBeGreaterThan(0)
    })
    ;['quickstart.sh', 'mqtt pub', 'node-01', '单节点', '多区域部署', '集群部署'].forEach((term) => {
      expect(screen.queryByText(new RegExp(term))).not.toBeInTheDocument()
    })
  })

  it('renders imported VelaMQ 1.0 docs and switches one document at a time', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('link', { name: '文档' }))

    expect(screen.getByRole('heading', { level: 3, name: '产品介绍' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { level: 3, name: '快速启动' })).not.toBeInTheDocument()

    expect(screen.getByRole('button', { name: '版本: v1.0.0' })).toBeInTheDocument()
    expect(screen.queryByText(/内容来源于 velamq-rs-doc/)).not.toBeInTheDocument()
    expect(screen.queryByText('product/introduction.mdx')).not.toBeInTheDocument()

    expect(screen.getByRole('button', { name: '展开 快速开始' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Linux 安装与服务管理' })).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: '展开 快速开始' }))

    expect(screen.getByText('Linux 安装与服务管理', { selector: 'button[data-doc-topic="install/linux"]' })).toBeInTheDocument()
    expect(screen.getByText('macOS 安装与服务管理', { selector: 'button[data-doc-topic="install/macos"]' })).toBeInTheDocument()
    expect(screen.getByText('Windows 安装与服务管理', { selector: 'button[data-doc-topic="install/windows"]' })).toBeInTheDocument()

    await user.click(screen.getByText('安装包下载', { selector: 'button[data-doc-topic="install/package"]' }))

    expect(screen.getByRole('heading', { level: 3, name: '安装包下载' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'velamqd-0.0.1-windows-x86_64.zip' })).toHaveAttribute(
      'href',
      'https://velamq.obs.cn-east-3.myhuaweicloud.com/velamqd-0.0.1-windows-x86_64.zip',
    )
    expect(screen.queryByText(/sudo systemctl enable/)).not.toBeInTheDocument()

    await user.click(screen.getByText('Linux 安装与服务管理', { selector: 'button[data-doc-topic="install/linux"]' }))

    expect(screen.getByRole('heading', { level: 3, name: 'Linux 安装与服务管理' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: '四、安装 systemd 服务' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: '七、更新 systemd 服务' })).toBeInTheDocument()
    expect(screen.getAllByText(/sudo \.\/deploy\/install-systemd\.sh --enable-now/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/sudo \/opt\/velamq\/current\/deploy\/update\.sh/).length).toBeGreaterThan(0)
    expect(screen.queryByText(/Apple Silicon/)).not.toBeInTheDocument()

    await user.click(screen.getByText('macOS 安装与服务管理', { selector: 'button[data-doc-topic="install/macos"]' }))

    expect(screen.getByRole('heading', { level: 3, name: 'macOS 安装与服务管理' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: '四、状态、日志与停止' })).toBeInTheDocument()
    expect(screen.getAllByText(/run\/velamqd\.pid/).length).toBeGreaterThan(0)
    expect(screen.queryByText(/systemctl start velamq/)).not.toBeInTheDocument()

    await user.click(screen.getByText('Windows 安装与服务管理', { selector: 'button[data-doc-topic="install/windows"]' }))

    expect(screen.getByRole('heading', { level: 3, name: 'Windows 安装与服务管理' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: '六、更新版本' })).toBeInTheDocument()
    expect(screen.getAllByText(/Invoke-WebRequest/).length).toBeGreaterThan(0)

    await user.click(screen.getByRole('button', { name: '展开 规则引擎' }))
    await user.click(screen.getByRole('button', { name: '规则引擎总览' }))

    expect(screen.getByRole('heading', { level: 3, name: '规则引擎总览' })).toBeInTheDocument()
    expect(screen.getAllByText(/规则引擎负责把 MQTT 消息/).length).toBeGreaterThan(0)
    expect(screen.queryByRole('heading', { level: 3, name: '快速启动' })).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: '数据管理' }))

    const screenshot = screen.getByRole('img', { name: 'VelaMQ 3.0 数据管理与存储状态入口截图' })
    expect(screenshot).toHaveAttribute('src', './velamq-docs/img/screenshots/dashboard.png')
  })

  it('keeps second-level docs navigation collapsed until a section is opened', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('link', { name: '文档' }))

    expect(screen.queryByRole('button', { name: 'Linux 安装与服务管理' })).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: '展开 快速开始' }))
    expect(screen.getByRole('button', { name: 'Linux 安装与服务管理' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'macOS 安装与服务管理' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Windows 安装与服务管理' })).toBeInTheDocument()

    expect(screen.getAllByText('数据源').length).toBeGreaterThan(0)
    expect(screen.queryByRole('button', { name: 'Kafka 数据源' })).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: '展开 数据源' }))

    expect(screen.getByRole('button', { name: 'Kafka 数据源' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Redis 数据源' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'MQTT 数据源' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Kafka 数据源' }))

    expect(screen.getByRole('heading', { level: 3, name: 'Kafka 数据源' })).toBeInTheDocument()
    expect(screen.getAllByRole('img', { name: 'Kafka 配置截图' })[0]).toHaveAttribute(
      'src',
      './velamq-docs/img/screenshots/datasources/kafka.png',
    )
  })

  it('keeps every imported docs media asset available in public', () => {
    const missingAssets: string[] = []

    Object.entries(velamqDocs).forEach(([locale, catalog]) => {
      Object.values(catalog.documents).forEach((document) => {
        document.blocks.forEach((block) => {
          if (block.type !== 'image' && block.type !== 'video') return

          const relativePath = block.src.replace(/^\/+/, '')
          const publicPath = path.join(process.cwd(), 'public', relativePath)
          if (!existsSync(publicPath)) {
            missingAssets.push(`${locale}/${document.id}: ${block.src}`)
          }
        })
      })
    })

    expect(missingAssets).toEqual([])
  })
})
