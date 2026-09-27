# Prometheus 与 Grafana

VelaMQ 提供实时指标，Prometheus 负责采集和历史保留，Grafana 负责展示。管理仪表盘继续显示实时状态，不再提供内置监控历史页。

## 三节点采集

两个入口输出相同指标，但鉴权不同：`/-/metrics` 不经过控制台鉴权，适合 Prometheus 采集；`/api/metrics/prometheus` 在开启控制台鉴权时需要有效的 Bearer Token。以下配置使用前者。

应限制管理端口的网络访问，按需通过反向代理增加认证和 TLS，不能将免鉴权入口直接暴露到公网。

```yaml
global:
  scrape_interval: 15s
  scrape_timeout: 10s

scrape_configs:
  - job_name: velamq
    metrics_path: /-/metrics
    static_configs:
      - targets:
          - 10.0.0.11:8080
          - 10.0.0.12:8080
          - 10.0.0.13:8080
```

将地址换为 Prometheus 可访问的各节点管理地址。集群应逐节点采集，不要只采负载均衡地址，否则每轮可能落在不同节点，丢失稳定的节点视图。

## 主要指标

| 前缀 | 内容 |
| --- | --- |
| `velamq_system_*`、`velamq_process_*` | 主机及 Broker 进程资源 |
| `velamq_mqtt_*` | 连接、协议报文、发布及丢弃事件 |
| `velamq_session_*` | 会话积压和在途状态 |
| `velamq_grpc_server_*` | 节点间 gRPC 请求、在途请求及延迟 |
| `velamq_storage_raft_*` | Leader、日志、提交、选举及存储状态 |
| `velamq_event_sink_*` | 异步事件管线吞吐、队列及丢弃 |
| `velamq_shard_*` | 当前节点分片汇总健康状态 |

## 控制分片指标数量

常规采集不带 `shard_id`，按 `node_id`、`keyspace` 汇总。默认 Grafana 画板使用这些汇总数据，无需开启详情。

短时排障时可增加：

```yaml
    params:
      shard_details: ['true']
```

此时增加当前节点的 `velamq_shard_replica_index_gap` 和 `velamq_shard_replica_healthy` 详情。排障结束后移除参数。旧指标 `velamq_shard_replica_lag_entries` 已被替换：索引差不是消息数、日志条数，也不是延迟秒数。

不要将 client_id、topic 等无界业务值添加为指标标签。各节点的「无健康副本分片」可能重复描述同一分片，不能简单相加当作集群唯一分片数。

## Grafana

导入仓库 `monitoring/grafana/velamq-overview.json`，选择 Prometheus 数据源；已有同 UID 画板时选择覆盖。默认时间范围为最近 5 分钟，可按 `node_id`、监听、传输、协议版本和 keyspace 筛选。

告警参考 `monitoring/prometheus/velamq-alerts.yml`。上线前按负载调整阈值，优先关注连接拒绝、会话积压、事件队列丢弃、Leader 可用性和存储失败。

## 历史数据迁移

内置历史接口 `/api/metrics/history` 返回 410，旧 `[metrics]` 配置不再启动历史采样。每个升级节点在后台分批清理本地 `metric/` 前缀并压缩对应范围，不经业务 Raft、不阻塞启动；清理仍会产生磁盘 I/O，空间回收是异步的。

这会永久清除该部分历史，必要时先备份。业务消息和配置不受该前缀清理影响；已有备份不会被删除，混有旧指标的 Raft 日志仍按正常日志压缩策略处理。集群所有节点都应完成升级，旧程序仍可能继续采样。
