# VelaMQ 0.0.2 文档

面向使用和维护 VelaMQ 0.0.2 的开发者、集成人员及运维人员。本目录是官网 0.0.2 文档的内容源；0.0.1 文档独立保留。

## 阅读顺序

1. [版本说明](zh/release-notes.md)：主要变更、兼容性与已知问题。
2. [规则事件与 SQL](zh/rules.md)：发布、离线、订阅和确认事件。
3. [内置函数与输入输出](zh/builtin-functions.md)：函数分类、参数、可复用示例。
4. [模板函数](zh/template-functions.md)：规则动作、认证、ACL 和指令消费。
5. [自定义函数](zh/custom-functions.md)：Rhai、Lua 示例及调用方法。
6. [Redis 离线消息](zh/offline-redis.md)：内置信箱、过期、补发和确认删除。
7. [MySQL 离线消息](zh/offline-mysql.md)：建表、三条 SQL、索引和生命周期。
8. [系统功能与配置迁移](zh/config-migration.md)：导入、导出与迁移范围。
9. [Prometheus 与 Grafana](zh/monitoring.md)：采集、低基数指标和历史清理。
10. [升级与集群运维](zh/upgrade.md)：逐节点操作、恢复检查与回退准备。

## 文档验证

在 website 仓库执行生成、目录/归档回归检查及构建：

```bash
npm run docs:generate
npm test -- --run
npm run lint
npm run build
```

新增文章维护在 `zh/`；原有章节的改动维护在 `updates.mjs`，生成器从完整 0.0.1 归档继承内容后应用更新，不直接修改历史文件。截图使用独立的 v0.0.2 目录。

内置函数示例在 VelaMQ 主仓库保留自包含测试快照。真实 Redis/MySQL 与批量测试记录保留在主仓库的 test-results 目录，不作为官网构建依赖。
