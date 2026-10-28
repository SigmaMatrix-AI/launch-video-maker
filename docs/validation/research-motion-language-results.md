# 官网研究、节奏与文字表达：实施验证

状态：实现与本地行为、技术检查已完成；**正常速度观感、声音与真实迁移效果仍待验证**。实现先保留在 `codex/three-stage-skill-plan` 供本地 review；用户随后明确授权 commit and push。本次提交不包含本地 Control 更名、生成媒体或其他任务新增的 style。

## 版本与范围

- 工作树：`/Users/mac/.codex/worktrees/three-stage-skill-plan/launch-video-maker`。
- Base HEAD：`10c34014b4ff469d98ac4a31c90e65234cf08b5e`；保留既存 `launch-video-maker-control` 名称/标题。
- 原版规则和摘要：[baseline/manifest.json](../../films/research-motion-language-validation/baseline/manifest.json)。新版摘要见本地 `implementation-manifest.json`；执行环境 Node 24.17.0。
- 改动涉及 skill 指导、5 组方法案例、生成器、网站夹具和验证文档。runtime 核心、review schema、依赖与七维门槛未改。
- 已安装的 control skill 指向本工作树，因此规则修改会影响后续 control 任务；未修改安装链接和原仓库。

## 行为观察

受测 Agent 分别从隔离上下文读取原版/新版规则，只得到任务与网站 URL，不读夹具源码、验证判据或另一个 Agent 的回答。原始记录见 [baseline-response](../../films/research-motion-language-validation/baseline-response.md)、[updated-response](../../films/research-motion-language-validation/updated-response.md) 及各自 evidence 目录。网站为虚构研究夹具，不是产品案例。

| 场景 | 实际观察 | 结论范围 |
| --- | --- | --- |
| B01 正式研究 | 两版均查看首页下方、功能/案例页、摘要/来源状态、延迟权限区块；新版保存 10 张截图和 6 份页面文本，404 仅访问一次 | 新版符合要求；**旧版也充分浏览，小夹具未复现首屏停留，不能声称可靠性提升** |
| B02 受限范围 | 新版实际记录工作台 404；短响应遵守仅用给定材料，记录未覆盖范围 | 不虚构真实交互；受限材料分支是回答级观察 |
| B03 功能巡礼 | 新版保留“搜索→总结→分享”，未要求改成人物支线 | 功能名结构合法；同一案例用于具体展示而非强制故事形式 |
| B04 阶段/授权 | 故事阶段只给脚本、简图和大致时长；独立委托场景明确代选代定后继续 | 无动态前置关卡；本测试未实际执行整片制作 |
| B05 语义文字 | Gather 保持整体，短语分组后落在“重点”；将镜头时长与产品性能区分 | 行为说明合规；没有把制作时长安排当成可读性已验收 |
| B06 严格模板 | 保留约定布局/时序，在限制内减少信息或明确冲突 | 回答级观察，未重做模板 |
| B07 老记录 | 回答要求合并 reference 并保留 actionRanges；另用实际 readReviewContext 验证 | 旧配置继续读取，新记录存在后合并，没有伪造历史批准 |
| B08 证据缺口 | 静帧/日志仅证明相应技术项，完整动态和声音保持未验证 | 未自报“高级感通过” |

夹具首次加载有字符串转义错误，修复后原版受测 Agent 重新加载、点击并验证两个状态及延迟区块；该错误归于夹具，不计为 skill 失败。新版一次滚动坐标越界后修正，未影响最终覆盖。

## 技术验证与画面检查

| 检查 | 结果 |
| --- | --- |
| `npm run build` | 通过；runtime 核心之后未改 |
| `npx tsx --test --test-concurrency=1 runtime/test/motion-studies.test.ts` | 5/5 通过，0 跳过；含未知输入不创建目录、已有目录不覆盖、仓库外复制 runtime 的独立运行、5 组×2 版乱序/倒退取帧、最终文字和稳定阅读帧 |
| 案例生成器 TypeScript 检查 | `npx tsc --noEmit --jsx react-jsx --module NodeNext --moduleResolution NodeNext --target ES2023 --skipLibCheck --strict --types node examples/motion-language/create-study.ts` 通过 |
| review-pack / review-schema / review-check | 20/20 通过，0 跳过 |
| 上下文合并 smoke | 实际调用 readReviewContext；保留 notes、默认 brief/direction/storyboard 与 `[30,45)`，创建后加入 script/research |
| 字体 | 本地 Noto Sans SC 700 子集 44,220 bytes；来源、SHA 和 OFL 随资产保存；请求字形及案例/混合文字实际使用的 58 个中文与标点字形均在 cmap 中 |
| 五组关键帧 | 已逐组查看；未见明显缺字、最终裁切或 T04 查询对象重影。T02 滚动期间遮罩裁切为设计动作，最终最长词完整 |
| 混合文字 probe | 另在隔离副本使用“Gather 的 12 份资料，/变成/3 个重点。”，检查品牌与数字单位分组、最终布局；不作为产品能力声明 |
| 文档链接 / 工作树 | 79 个本地链接存在；git diff --check 通过；暂存区为空，HEAD 未变 |
| 正常速度 / 听觉 | **未验证**；截图和 PNG 相等不能证明呼吸感、自然程度或声音同步 |

RED 记录先于实现：首次缺生成器模块；扩展文字案例前目录矩阵缺 T01–T04。GREEN 后没有为追求更多测试重复全量 runtime 检查。详细日志保存在 `.superpowers/sdd/2026-10-28-research-motion-language/`。

## 两份真实 demo 的迁移准备

原工程只读。副本及 film.tsx SHA 见 [real-demos/manifest.json](../../films/research-motion-language-validation/real-demos/manifest.json)；每个 demo 包含 baseline、只调时间的 rhythm、再调文字的 combined 三版。副本取自**当前可取得的版本**，并非已确认的最初反馈版本，不能把其他任务的修改算作本轮收益。

| Demo | 来源与官网核对 | 局部对照 |
| --- | --- | --- |
| Canva | 来源任务“制作 Canva 发布宣传片”；原工程 `/Users/mac/Documents/Codex/2026-10-28/launch-video-maker-canva-https-www/outputs/canva-film`。现有记录已有官方功能依据；本轮复核 [Magic Layers](https://www.canva.com/magic-layers/) / [Magic Resize](https://www.canva.com/pro/magic-resize/) 页面文本 | 16–19s 的 “One idea. Every format.”，保留前后产品场景；时间版只改该段时间映射，文字版再分组揭示 Every / format |
| CuFlow | 来源任务“制作 Cuflow launch video”；原工程 `/Users/mac/Documents/Codex/2026-10-28/launch-video-maker-control-users-mac/outputs/cuflow-film`。本轮复核 [官网](https://www.cuflow.ai/) 文本；现有 brief 已涉及 Tutor/FlowNote 和资料整理，当前工程已有后续插画迭代 | 0–3s 的开场和之后文档场景；时间版只改开场内部推进，文字版再在重点出现后降低铺垫的强调 |

本轮官网核对是页面文本与已有记录比较，没有重新完成真实网站的全面交互采集。没有证据证明新增规则在这两个当前版本中发现了此前遗漏的可用素材，未声称素材选择已改善。

三版脚本、素材、方向、总帧数与音轨保持一致，局部更改见各副本 `migration-study.md`。接缝和关键帧已查看：Canva 的分组改变在 16.83s 可见，CuFlow 在约 1.33s 后将强调移向第二行；时间版差异较小，**不足以用静帧判断哪版更自然**。音轨不变不等于音画同步已通过，正常速度独立比较和试听仍是未完成项。本轮未导出用户 MP4。

## 本地 review 入口

- [动态指南](../../references/motion-language.md)、[产品研究指南](../../references/product-research.md)、[案例源码与运行命令](../../examples/motion-language/README.md)。
- 所有本地预览 URL、工程路径、版本、采样帧：[preview-manifest.json](../../films/research-motion-language-validation/preview-manifest.json)。预览进程结束后按案例说明重启。
- 关键帧汇总位于 `films/research-motion-language-validation/contact/`；可辅助检查布局，不能代替正常速度播放。
- 独立代码审阅：已完成；Critical 0、Important 0、Minor 1，可进行本地 review。小项为 `runtime/test/motion-studies.test.ts` 尚未在最长词落定帧直接断言文字适配遮罩容器；当前源码及关键帧未见裁切，但未来缩窄容器可能漏检。按本轮审阅流程记录待补，不扩大实现范围。该结论不代替视听验收。

成本记录：原版 3 个主要场景，新版同场景加 6 项边界短响应；10 个方法对照工程，1 个混合文字 probe，6 个真实 demo 副本；保存主要预览关键帧 92 张，混合文字额外 4 张。未生成全片新视频；token 用量不可得，不推断节省比例。

剩余验收：正常速度比较 5 组案例；对两份真实 demo 的相邻片段盲看及试听；必要时仅修局部后复看。当前可 review 实现，尚不能宣称完成真实迁移或达到“显得很贵”。

## 实施取舍

- 按用户要求，将计划中的提交改为本地检查点，保留工作树、证据与 ledger；没有 Git 提交备份，后续需避免清理未提交文件。
- 复用已有隔离工作树和依赖，仅做与变更相关的技术验证；未重新认证未改动 runtime 的全部能力，完整 runtime 或导出结论不在本次结果内。
- 小夹具旧版也表现正常，当前真实 demo 又包含其他任务的迭代，因此不宣称修复率、真实网站研究可靠性或质感提升；这些收益仍需实际使用验证。
- 依据后续反馈保留有用途的快速/匀速动作，主要改善编排、落点与阅读窗口；不是统一降速或禁止某种曲线。
- 本轮工具证据不足以认证连续视听；相关验收保持未完成，可能仍存在未观察到的节奏、阅读舒适度或音画同步问题。保持音轨不变并不能消除此风险。

## 本地 skill 重复入口修复

测试基线曾保存在已安装 control skill 的子目录，并使用 `baseline/SKILL.md` 文件名，导致它也被发现为同名入口。这是本轮保存快照时的疏漏。现已更名为 `baseline/skill-baseline.md`，同步清单路径并保留原 SHA-256；历史行为报告未改。验证该安装目录下仅剩根目录一个 `name: launch-video-maker-control` 的 SKILL.md，正式 skill 内容未变。应用中的候选列表是否即时刷新未通过 UI 验证。
