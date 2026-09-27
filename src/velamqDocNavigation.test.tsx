import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup } from '@testing-library/react'
import App from './App'

afterEach(() => { cleanup(); window.location.hash = ''; localStorage.clear() })

describe('VelaMQ 0.0.2 navigation', () => {
  it('switches real content and search scope when choosing a version', () => {
    window.location.hash = '#docs'
    localStorage.setItem('hannet-locale', 'zh')
    render(<App />)
    expect(screen.getByRole('heading', { name: 'VelaMQ 0.0.2 版本说明' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: '展开 规则引擎' }))
    fireEvent.click(screen.getByRole('button', { name: '内置函数与输入输出' }))
    expect(screen.getByRole('heading', { name: '内置函数与输入输出' })).toBeInTheDocument()
    expect(screen.getByText('round(to_double(payload.temperature), 2)')).toBeInTheDocument()
    const search = screen.getByRole('searchbox')
    fireEvent.change(search, { target: { value: 'Redis 离线消息' } })
    expect(screen.getByRole('option', { name: /Redis 离线消息/ })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: '版本: v0.0.2' }))
    fireEvent.click(screen.getByRole('option', { name: /v0.0.1/ }))
    expect(search).toHaveValue('')
    expect(screen.getByRole('heading', { name: '产品介绍' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: '内置函数与输入输出' })).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: '版本: v0.0.1' }))
    fireEvent.click(screen.getByRole('option', { name: /v0.0.2/ }))
    expect(screen.getByRole('heading', { name: '产品介绍' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'VelaMQ 0.0.2 版本说明' }))
    expect(screen.getByRole('heading', { name: 'VelaMQ 0.0.2 版本说明' })).toBeInTheDocument()
  })

  it('nests functions and offline guides inside the existing rule-engine branch', () => {
    window.location.hash = '#docs'
    localStorage.setItem('hannet-locale', 'zh')
    render(<App />)
    const titles = ['内置函数与输入输出', '模板函数', 'Redis 离线消息', 'MySQL 离线消息']
    expect(screen.queryByRole('heading', { name: '规则引擎与函数' })).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: '离线消息' })).not.toBeInTheDocument()
    for (const title of titles) expect(screen.queryByRole('button', { name: title, exact: true })).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: '展开 规则引擎' }))
    for (const title of titles) expect(screen.getAllByRole('button', { name: title, exact: true })).toHaveLength(1)
    for (const title of ['Redis 离线消息', 'MySQL 离线消息']) {
      expect(screen.getByRole('button', { name: title, exact: true })).toHaveClass('docs-nav-depth-2')
    }
    for (const title of ['规则事件与 SQL', '自定义函数']) {
      expect(screen.queryByRole('button', { name: title, exact: true })).not.toBeInTheDocument()
    }
    for (const title of ['事件与 SQL', '动态函数']) {
      fireEvent.click(screen.getByRole('button', { name: title, exact: true }))
      expect(screen.getByRole('heading', { name: title, exact: true })).toBeInTheDocument()
    }
    fireEvent.click(screen.getByRole('button', { name: '模板函数', exact: true }))
    expect(screen.getByRole('heading', { name: '模板函数', exact: true })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Redis 离线消息', exact: true }))
    expect(screen.getByRole('heading', { name: 'Redis 离线消息', exact: true })).toBeInTheDocument()
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'MySQL 离线消息' } })
    fireEvent.click(screen.getByRole('option', { name: /MySQL 离线消息/ }))
    expect(screen.getByRole('heading', { name: 'MySQL 离线消息', exact: true })).toBeInTheDocument()
  })

  it('exposes the original full guide in 0.0.2 with updated screenshots', () => {
    window.location.hash = '#docs'
    localStorage.setItem('hannet-locale', 'zh')
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: '展开 快速开始' }))
    fireEvent.click(screen.getByRole('button', { name: 'Linux 安装与服务管理' }))
    expect(screen.getByRole('heading', { name: 'Linux 安装与服务管理' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: '展开 数据源' }))
    fireEvent.click(screen.getByRole('button', { name: 'Redis 数据源' }))
    expect(screen.getByRole('heading', { name: 'Redis 数据源' })).toBeInTheDocument()
    expect(screen.getAllByRole('img', { name: 'Redis 配置截图' })[0]).toHaveAttribute('src', './velamq-docs/img/screenshots/v0.0.2/datasources/redis.png')
    fireEvent.click(screen.getByRole('button', { name: '连接管理与 Traffic Tap' }))
    expect(screen.getByRole('heading', { name: '连接管理与 Traffic Tap' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: '指标历史' })).not.toBeInTheDocument()
  })
})
