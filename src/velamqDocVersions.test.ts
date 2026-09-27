import { describe, expect, it } from 'vitest'
import { getVelaMQDocs } from './velamqDocVersions'
import { velamqDocs } from './velamqDocs'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

describe('versioned VelaMQ documentation', () => {
  it('defaults to the new Chinese manual and keeps the archive independent', () => {
    const latest = getVelaMQDocs('zh')
    const old = getVelaMQDocs('zh', 'v0.0.1')
    expect(latest.versions.map(version => version.id)).toEqual(['v0.0.2', 'v0.0.1'])
    expect(Object.keys(latest.documents)).toHaveLength(Object.keys(old.documents).length + 10)
    for (const id of Object.keys(old.documents)) expect(latest.documents[id], id).toBeDefined()
    const currentNav = latest.groups.flatMap(group => group.entries).filter(entry => entry.type === 'doc').map(entry => entry.id)
    for (const group of old.groups) {
      for (const entry of group.entries) if (entry.type === 'doc') expect(currentNav).toContain(entry.id)
    }
    expect(latest.documents['offline-redis'].blocks.some(block => block.type === 'code' && block.code.includes('OFFLINE_REDIS'))).toBe(true)
    expect(old.documents['release-notes']).toBeUndefined()
    expect(old.documents['product/introduction']).toBeDefined()
    expect(old.documents).not.toBe(latest.documents)
    expect(old.documents).toEqual(velamqDocs.zh.documents)
  })

  it('retains original installation, datasource and function configuration content', () => {
    const latest = getVelaMQDocs('zh')
    for (const id of ['install/linux', 'install/macos', 'install/windows', 'guide/rule-engine/functions', 'guide/datasources/kafka', 'guide/datasources/redis', 'guide/cluster']) {
      for (const heading of velamqDocs.zh.documents[id].headings) {
        expect(latest.documents[id].headings.some(value => value.id === heading.id), `${id}: ${heading.text}`).toBe(true)
      }
    }
  })

  it('places each new function and offline article under rule engine exactly once', () => {
    const catalog = getVelaMQDocs('zh')
    expect(catalog.groups.map(group => group.title)).not.toContain('规则引擎与函数')
    expect(catalog.groups.map(group => group.title)).not.toContain('离线消息')
    const guides = catalog.groups.find(group => group.title === '功能指南')!
    const branchStart = guides.entries.findIndex(entry => entry.type === 'category' && entry.label === '规则引擎')
    expect(branchStart).toBeGreaterThan(-1)
    const children = guides.entries.slice(branchStart + 1)
    const branchEnd = children.findIndex(entry => entry.depth === 0)
    const branch = children.slice(0, branchEnd < 0 ? undefined : branchEnd)
    for (const id of ['rules', 'builtin-functions', 'template-functions', 'custom-functions', 'offline-redis', 'offline-mysql']) {
      expect(branch.some(entry => entry.type === 'doc' && entry.id === id && entry.depth === 1), id).toBe(true)
      expect(catalog.groups.flatMap(group => group.entries).filter(entry => entry.type === 'doc' && entry.id === id), id).toHaveLength(1)
    }
    expect(getVelaMQDocs('zh', 'v0.0.1').groups).toEqual(velamqDocs.zh.groups)
  })

  it('removes retired monitoring UI and keeps external metric collection', () => {
    const latest = getVelaMQDocs('zh')
    for (const [id, doc] of Object.entries(latest.documents)) {
      const content = JSON.stringify(doc)
      expect(content, id).not.toMatch(/监控指标|metrics\.png|warmup|sampler|指标历史页面|RocksDB metrics keyspace|\/metrics\/history\?since_ms/)
      expect(doc.blocks.some(block => block.type === 'video'), id).toBe(false)
      for (const block of doc.blocks) {
        if (block.type === 'image') {
          if (block.src.includes('/screenshots/')) expect(block.src).toContain('/screenshots/v0.0.2/')
          if (block.src.startsWith('/')) expect(existsSync(resolve('public', block.src.slice(1))), block.src).toBe(true)
          if (block.src.includes('/screenshots/v0.0.2/') && block.src.endsWith('.png')) {
            const png = readFileSync(resolve('public', block.src.slice(1)))
            // Catch screenshots clipped to a sliver while a drawer is opening.
            expect(png.readUInt32BE(16), block.src).toBeGreaterThanOrEqual(400)
            expect(png.readUInt32BE(20), block.src).toBeGreaterThanOrEqual(200)
          }
        }
      }
    }
    expect(JSON.stringify(latest.documents.monitoring)).toContain('/-/metrics')
    expect(JSON.stringify(velamqDocs.zh.documents['guide/metrics-connections'])).toContain('metrics.png')
  })

  it('has valid navigation and table-of-contents targets for every new document', () => {
    const catalog = getVelaMQDocs('zh')
    for (const group of catalog.groups) {
      for (const entry of group.entries) {
        if (entry.type === 'doc') expect(catalog.documents[entry.id]).toBeDefined()
      }
    }
    for (const doc of Object.values(catalog.documents)) {
      expect(doc.summary).not.toBe('')
      const headings = doc.blocks.filter(block => block.type === 'heading')
      expect(new Set(headings.map(heading => heading.id)).size).toBe(headings.length)
      expect(doc.headings).toHaveLength(headings.length)
      for (const block of doc.blocks) {
        if (block.type === 'table') expect(block.rows.every(row => row.length === block.headers.length)).toBe(true)
      }
    }
  })

  it('does not relabel English 0.0.1 content as 0.0.2', () => {
    expect(getVelaMQDocs('en', 'v0.0.2').versions[0].id).toBe('v0.0.1')
  })
})
