# 瀚网科技官网

南京瀚网科技有限公司官方网站。页面以“瀚网科技”为公司主品牌，展示 `VelaMQ` 和 `VelaMQ Bench` 两条产品线。项目使用 React、TypeScript 和 Vite 构建，并内置 GitHub Pages 自动部署 workflow。

## 本地开发

```bash
npm install
npm run dev
```

## 验证

```bash
npm test -- --run
npm run lint
npm run build
```

## GitHub Pages 自动部署

仓库包含 `.github/workflows/deploy.yml`。推送到 `main` 分支后，GitHub Actions 会执行：

1. 安装依赖：`npm ci`
2. 运行测试：`npm test -- --run`
3. 构建静态文件：`npm run build`
4. 上传 `dist`
5. 使用 GitHub Pages 发布

首次使用时，在 GitHub 仓库的 `Settings -> Pages` 中将 Source 设为 `GitHub Actions`。

如果希望 workflow 在首次运行时自动启用 GitHub Pages，可以在仓库 `Settings -> Secrets and variables -> Actions`
添加 `PAGES_TOKEN`。该 token 需要具备 Pages 写权限；使用 PAT 时需要 `repo` scope 或 Pages write permission。
没有配置该 secret 时，workflow 仍会完成测试与构建，并在 Pages 未启用时输出 notice 提醒手动启用。

Vite 已设置 `base: './'`，因此部署到用户/组织站点或项目子路径时静态资源都能以相对路径加载。

## 设计说明

- 公司 Logo：抽象 `H` 字母与网络节点组合，表达实时消息网络与基础设施可靠性。
- 产品结构：`VelaMQ` 是设备数据接入与业务协同平台，`VelaMQ Bench` 是容量评估与上线验证工具。
- 原始 Stitch 项目：`14630401735232463479`
- 本地规格文档：`docs/superpowers/specs/2026-06-01-velamq-website-design.md`
