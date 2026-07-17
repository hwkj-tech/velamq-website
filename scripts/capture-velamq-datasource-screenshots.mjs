import fs from 'node:fs'
import path from 'node:path'

const defaultPlaywrightPath = '/Users/lulu/Work/fluxmq-rs-doc/node_modules/playwright/index.js'
const playwrightPath = process.env.PLAYWRIGHT_MODULE ?? defaultPlaywrightPath
const playwright = await import(playwrightPath)
const { chromium } = playwright.default ?? playwright

const baseUrl = process.env.VELAMQ_CONSOLE_URL ?? 'http://127.0.0.1:18080'
const token = process.env.VELAMQ_CONSOLE_TOKEN
const outputDir =
  process.env.VELAMQ_SCREENSHOT_OUTPUT ??
  path.resolve(import.meta.dirname, '../public/velamq-docs/img/screenshots/datasources')

if (!token) {
  throw new Error('VELAMQ_CONSOLE_TOKEN is required')
}

fs.mkdirSync(outputDir, { recursive: true })

const targets = [
  { slug: 'overview', card: null },
  { slug: 'sql', card: 'PostgreSQL' },
  { slug: 'postgresql', card: 'PostgreSQL' },
  { slug: 'mysql', card: 'MySQL' },
  { slug: 'sqlite', card: 'PostgreSQL' },
  { slug: 'clickhouse', card: 'ClickHouse' },
  { slug: 'tdengine', card: 'TDengine' },
  { slug: 'oracle', card: 'Oracle' },
  { slug: 'http', card: 'HTTP' },
  { slug: 'redis', card: 'Redis' },
  { slug: 'kafka', card: 'Kafka' },
  { slug: 'pulsar', card: 'Pulsar' },
  { slug: 'rocketmq', card: 'RocketMQ' },
  { slug: 'mqtt', card: 'MQTT' },
  { slug: 'mongodb', card: 'MongoDB' },
  { slug: 'influxdb', card: 'InfluxDB' },
  { slug: 'rabbitmq', card: 'RabbitMQ' },
  { slug: 'object-search-loki', card: 'S3 Compatible' },
  { slug: 'log', card: 'LOG' },
]

const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_EXECUTABLE,
})

const page = await browser.newPage({
  viewport: { width: 1600, height: 1120 },
  deviceScaleFactor: 1,
})

await page.goto(`${baseUrl}/login`, { waitUntil: 'domcontentloaded' })
await page.evaluate((value) => {
  localStorage.setItem('velamq_console_token', value)
  localStorage.setItem('velamq-lang', 'zh')
}, token)

const openPicker = async () => {
  await page.goto(`${baseUrl}/datasources`, { waitUntil: 'networkidle' })
  const addButton = page
    .getByRole('button')
    .filter({ hasText: /新增|添加|Add|Create/i })
    .last()
  await addButton.click()
  await page.getByText(/选择数据源类型|Choose data source type/).waitFor({ state: 'visible' })
}

const captureContent = async (slug) => {
  const content = page.locator('.ant-layout-content').last()
  await page.waitForTimeout(350)
  await content.screenshot({
    path: path.join(outputDir, `${slug}.png`),
    animations: 'disabled',
  })
}

for (const target of targets) {
  await openPicker()

  if (target.card) {
    const card = page.locator('.ant-card').filter({ hasText: target.card }).first()
    await card.click()
    await page.locator('form').waitFor({ state: 'visible' })
  }

  await captureContent(target.slug)
  console.log(`captured ${target.slug}.png`)
}

await browser.close()
