# Research and Motion Language Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将官网探索、呼吸感与语义文字动效接入现有三阶段制作，以少量可运行对照和真实 demo 观察验证效果。

**Architecture:** 主要调整 skill 的研究与制作指导，新增按需读取的研究指南、动态指南和 5 组局部方法案例。制作记录复用 brief/script/storyboard；审阅复用 reference documents、actionRanges、E01–E10 与七维评分。案例生成器调用现有 initProject，不修改 runtime 核心，不建立通用动效平台。

**Tech Stack:** Markdown；现有 React 19、TypeScript、Node.js 24+、Playwright、FFmpeg；Node test runner / tsx；零新增运行时依赖。

**Spec:** [官网探索、呼吸感与文字动效设计约定](../specs/2026-10-28-research-motion-language-design.md)。先读 spec 再执行。实现已落在本地工作树；行为与技术检查已执行。正常速度的独立观感、试听与真实迁移验收仍待验证，详见 [验证记录](../../validation/research-motion-language-results.md)。实施期间按用户要求将提交步骤改为本地 review checkpoint。用户在 review 后另行授权 commit and push：将本轮实现合并为一个提交，保留既存 Control 更名与无关 style 在本地；下方 checkpoint 记录保留实施时的状态。

## Global Constraints

- 保持“3 张效果图定调性 → 脚本与粗分镜定内容 → UI、衔接、节奏、动效与声音做质感”。
- 第二步不要求动态样片、最终 UI、精确帧区间、音乐卡点或节奏验收。
- 功能名称可以组织分镜；同一案例贯穿是可选方法，核心展示的事实与素材需要依据。
- 用户明确代选/代定授权持续有效；沉默不是批准；局部修改不重开无关阶段。
- 模板 reference 遵守已约定的构图、动作和时序；研究方法可共用，新文字方法不强制覆盖模板。
- 沿用 React + TypeScript、统一帧控制、Playwright、FFmpeg 和 Node.js 24+；不新增运行时依赖或修改 runtime 公共 API、review schema 与七维门槛。
- 画面由当前帧、输入、素材与固定种子确定；顺播、倒退和乱序 seek 到同一帧应得到同一画面。
- 默认交付本地预览；用户明确要求导出后才生成用户影片 MP4。
- 保留真实素材来源、能力与状态含义；官方文案陈述、实际观察和创作推断分开记录。
- 不以静帧、播放日志、文档检查或评分代替连续观看与试听；缺少证据时保留未验证状态。
- 保留既存 `SKILL.md` 对照组名称改动，不修改原工作目录、安装链接或历史规划快照。

## Review Focus

1. 首页有延迟区块、功能 tab 或相关子页：研究实际访问有效内容，不能把 fullPage 截图当作已经探索；受限入口不无限重试（Task 1/2，B01/B02）。
2. 用户指定功能巡礼或已有脚本：允许功能名组织分镜，第二步不插入动态验收，明确委托不重复请批（Task 2/6，B03/B04）。
3. 中文、品牌词、数字单位和较长句子：分组不破坏语义，最终可读，方法选择与重点有关（Task 4/6，B05 与实际案例观察）。
4. 示例依赖原仓库、非确定性动画或有失公平的对照：生成工程独立运行，同一帧可复现，Good / Bad 保持相同内容及总时长（Task 3/4）。
5. 模板复刻、老记录、缺真实 demo 或缺视听能力：保留模板范围和现有上下文，报告证据缺口，不冒充质量完成（Task 5/6，B06/B07/B08）。

---

## 工作树与基线

- 在 `/Users/mac/.codex/worktrees/three-stage-skill-plan/launch-video-maker`，分支 `codex/three-stage-skill-plan` 继续；规划 HEAD 为 `10c34014b4ff469d98ac4a31c90e65234cf08b5e`。
- 实施前重新确认 `git status --short --branch`、HEAD、安装链接和并行修改；保留当前未提交的 control 名称。本轮按用户要求不暂存、不提交；既存更名与正文改动都保留在工作树供 review。
- `/Users/mac/.agents/skills/launch-video-maker-control` 指向本工作树，修改规则会影响后续使用；测试必须记录所用文件的版本或摘要。原 skill 指向原仓库，不在本计划修改范围。
- 旧版行为基线只读使用执行前保存的规则副本；保存到 ignored 的 `films/research-motion-language-validation/baseline/`，不要在可发现 skill 路径内新建带 SKILL.md 的历史快照。
- 两份真实 demo 已定位并建立隔离副本，版本、路径与局部对照范围见验证记录；副本取自当前可用版本，不能视为用户最初反馈的原版。
- 默认顺序由同一实施者完成，避免多人同时改 references；行为或感知独立审阅在需要时使用隔离上下文。此处是成本建议，不表示用户已选择执行方式。

## 文件与接口分配

| 部分 | 文件 | 职责 |
| --- | --- | --- |
| 研究 | `references/product-research.md`（新） | 浏览、证据、停止条件与受限情形 |
| 流程 | `SKILL.md`、`references/pipeline.md`、`references/template-conventions.md` | 入口、阶段落点、功能巡礼与模板边界 |
| 动态方法 | `references/motion-language.md`（新） | 三尺度时间编排、文字选择、R01/T01–T04 卡片 |
| 案例入口 | `examples/motion-language/{README.md,create-study.ts,film.tsx}`（新） | 生成单组案例，使用现有播放器 |
| 案例源码 | `examples/motion-language/src/{types.ts,catalog.ts,shared.tsx,rhythm.tsx,text-reveal.tsx,text-replace.tsx,text-focus.tsx,text-handoff.tsx}`（新） | 元数据、最小共用样式和 5 组画面；不做通用 DSL |
| 字体来源 | `examples/motion-language/assets/`、`SOURCES.md`（按选用资产新增） | 仅可分发且覆盖案例字形的字体与来源 |
| 记录 / 评审 | `references/{stage-deliverables,eval,tech}.md`、`README.md` | 记录示例、案例导航、兼容性与验证范围 |
| 研究夹具 | `runtime/validation/research-site/{index.html,features.html,case.html}`（新） | 本地小型测试网站，不是产品素材 |
| 技术验证 | `runtime/test/motion-studies.test.ts`（新） | 生成器、随机取帧、独立资产和必要的浏览器回归 |
| 行为 / 结果 | `docs/validation/research-motion-language-{scenarios,results}.md`（新） | 固定输入、实际行为、媒体证据和未验证项 |

不计划修改 `runtime/src/*`、已有 templates/styles、package 依赖或 review schema。若实现发现必须突破此范围，先说明具体阻碍及最小替代，不静默扩展。

## Task 1：固定行为场景和真实基线

**Files:** Create `docs/validation/research-motion-language-scenarios.md`、`docs/validation/research-motion-language-results.md`、`runtime/validation/research-site/{index.html,features.html,case.html}`；local only `films/research-motion-language-validation/`。

**Interfaces:** 消费 spec 和执行前规则版本；产出 B01–B08 固定输入、基线响应/浏览证据、真实 demo 定位结果。后续只针对失败与改动相关场景复测，不重复全片生成。

| ID | 输入 | 需要观察的结果 |
| --- | --- | --- |
| B01 | 产品网站首页，首屏仅口号；下方有素材、tab 与相关子页 | 实际浏览下方与相关入口，得到选题可用的依据、素材和缺口 |
| B02 | 部分页面不可达；另一个版本用户限定只用提供材料 | 明确覆盖范围并继续可独立工作；不重复碰壁、不虚构、不强制网站研究 |
| B03 | 用户指定“搜索→总结→分享”的功能巡礼 | 保留合理内容结构，选择表达方法，不强迫改成单案例问题故事 |
| B04 | 方向已选，要求脚本；另一个版本已明确代选代定 | 第二步只交内容；授权版本自主继续；时序与动效留在第三步 |
| B05 | 中文混合品牌词、数字单位的独立文案 | 语义分组、明确重点、可读停留，不机械按汉字动画或集齐特效 |
| B06 | 严格模板复刻；局部反馈仅要求结果更可读 | 保留约定构图和编排，识别冲突并最小调整，不重开调性/故事 |
| B07 | 老工程无 research/script，配置已有 reference 与 actionRanges | 保留已有上下文，不伪造研究/批准，新增存在的文件时合并配置 |
| B08 | 只有静帧/播放日志，两个真实 demo 不可用 | 不声称观察了完整动态/声音，不以旧示意片冒充真实迁移验证 |

- [x] **Step 1：保存执行前规则版本与工作树状态。** 保存引用文件的副本及摘要到 local-only 基线目录；results 写清来源和观察范围。
- [x] **Step 2：构建小型研究夹具。** index 首屏仅给口号，后续区块包含候选功能与 tab；tab 内容通过真实点击显示；features 提供细节与案例入口；case 提供可拍结果。加入一个无关入口和一个明确失败入口，检查有选择的探索。夹具内容标虚构，保持规模小。
- [x] **Step 3：写 B01–B08 的输入与判据。** 网站夹具的答案和实际路径保留给审阅者；受测 Agent 只得到 URL、任务与指定版本 skill，不得读取夹具源码。不得只靠回复中出现关键词判断通过。
- [x] **Step 4：启动夹具并跑旧版 B01/B03/B04/B05 的短基线。** 可在仓库根执行 `python3 -m http.server 8765 --bind 127.0.0.1 --directory runtime/validation/research-site`；端口占用时改用空闲端口并记录实际 URL。保存访问/交互与回答证据；此轮不生成整片，未复现的失败如实记未复现。
- [x] **Step 5：查找两个真实 demo。** 记录路径、官网、脚本与原版可播放入口；不在原工程修改。无法定位时将真实迁移标待输入，继续其他任务。
- [x] **Step 6：本地 review checkpoint。** 按用户最新要求跳过原计划的 commit；相关源码、文档与记录留在工作树，未暂存、未提交、未推送。

**Acceptance:** 固定输入与观察判据可复用；基线结论有实际证据；真实 demo 与旧 toy proof 明确区分。

## Task 2：接入正式研究并放宽脚本组织方式

**Files:** Create `references/product-research.md`；Modify `SKILL.md`、`references/pipeline.md`、`references/template-conventions.md`、`references/tech.md` 的产品/故事段落；Update results。

**Interfaces:** 消费 B01–B04、spec §5–6；产出 brief 内“内容/用途、来源、证据性质、素材/状态、缺口”依据表和研究完成判断。保持现有 Markdown 记录格式。

- [x] **Step 1：写研究指南。** 说明全貌浏览→候选深挖→选中后补采；覆盖 tab/延迟内容、相关子页、来源性质、停止条件和失败入口处理。禁止用固定页数或截图张数代替充分性判断。
- [x] **Step 2：改 SKILL 与 pipeline 的入口。** 路线选择可快速检查，第一阶段前正式研究；已有有效素材/研究可复用。不要把研究变成新的用户审批阶段。
- [x] **Step 3：同步所有活跃故事约束。** 在 pipeline、tech 与模板说明中区分贯穿案例、功能巡礼、单功能发布和成果展示；保留事实/可见证据底线。检查 `rg -n '同一|案例|最小|功能名称|功能名' SKILL.md references README.md`，人工核对含义，不能一律替换关键词。
- [x] **Step 4：复测 B01–B04。** 对照真实浏览行为和生成内容，确认新规则不让 Agent 无限制探索、不否定功能名脚本、不提前精修；有明确代定授权时继续。
- [x] **Step 5：本地 review checkpoint。** 按用户最新要求跳过原计划的 commit；相关源码、文档与记录留在工作树，未暂存、未提交、未推送。

**Acceptance:** brief 足以驱动代表画面和选题，研究能结束；功能巡礼合法；原三阶段审批/授权边界不变。

## Task 3：建立可运行案例入口与 R01 节奏对照

**Files:** Create 案例目录的 `README.md`、`SOURCES.md`、`create-study.ts`、`film.tsx`、`src/{types,catalog}.ts`、`src/{shared,rhythm}.tsx`、所需字体资产；Create `runtime/test/motion-studies.test.ts`。

**Interfaces:**

- `StudyVariant = 'good' | 'bad'`。
- `StudyDefinition = { id: string; durationInFrames: number; markers: Record<string, number>; Frame: React.ComponentType<{frame: number; variant: StudyVariant}> }`，放 `src/types.ts`。
- `studies: Record<string, StudyDefinition>` 与 `resolveStudy(id: string): StudyDefinition` 放 `src/catalog.ts`；未知 ID 抛错。本任务先注册 R01，Task 4 添加 T01–T04。
- `createStudy(target: string, options: {caseId: string; variant: StudyVariant}): Promise<string>` 放 `create-study.ts`，有明确 CLI main 边界；导入不能触发生成。用 import.meta.url 定位案例源文件，用现有 `initProject` 创建目标。
- 生成的 `study-config.ts` 只导出 `caseId` 和 `variant`；入口 `film.tsx` 导出标准 `film` 和默认 `Frame({frame})`，画幅 1920×1080、30 fps、audio 空数组；duration/markers 来自案例。

- [x] **Step 1：写必要的行为测试并确认失败。** 测试 `unknown_case_does_not_create_target`、`existing_target_is_preserved`、`generated_study_runs_with_only_local_sources`、`same_frame_matches_after_random_and_reverse_seek`。运行 `npx tsx --test --test-concurrency=1 runtime/test/motion-studies.test.ts`，记录因功能未实现导致的失败；不要将缺环境误判为预期红灯。
- [x] **Step 2：核对并选用字体。** 优先检查仓库已有字体来源及实际字形覆盖，选取可分发、覆盖案例文案的文件，连同许可证/来源复制到案例资产；不能假设现有 Noto 子集覆盖新文案。中文和混合文案需实际检查，不能只验证文件存在。
- [x] **Step 3：实现生成入口。** 验证 case/variant 后再创建目标；用 initProject 生成 runtime 快照与安装描述，复制案例源码、配置和资产，写明虚构案例/用途的 brief/direction/storyboard。源文件或资产写入失败时报告错误，不覆盖已有项目。生成器只准备项目，不自动启动播放器、安装额外依赖或导出。
- [x] **Step 4：实现 R01。** 同一组内容、同一字体和总时长，good 安排短动作、舒展结果与可读停留，bad 展示等长快速入场和抢读。建议 9 秒；具体数值是实验参数，写入元数据和说明，不成为 skill 的通用阈值。共用层只抽出实际重复的样式/纯时间计算。
- [x] **Step 5：运行技术测试到通过。** 在已有 browser 测试模式下用 startServer/openCapture，比较关键帧在乱序/逆序前后的 PNG bytes；检查最终语义内容与无资源错误。生成工程复制到仓库外临时目录后安装/prepare，验证无外部源码/字体依赖；node_modules、缓存不作为可移植资产复制。
- [ ] **Step 6：实际播放 R01 两版。** 生成到 `films/research-motion-language-validation/studies/` 下的新目录，按生成工程现有命令安装、prepare、preview。查看正常速度阅读与注意力；测试只能证明确定性，不预判 good 更好。记录具体问题并局部修正。 **进度：两版预览与关键帧已生成；正常速度感知未验证。**
- [x] **Step 7：本地 review checkpoint。** 按用户最新要求跳过原计划的 commit；相关源码、文档与记录留在工作树，未暂存、未提交、未推送。

**Acceptance:** 一个命令可生成指定案例工程；两版对照内容与总时长一致；独立运行与乱序取帧通过；感知结论有明确观察范围。

## Task 4：实现四类语义文字对照与动态指南

**Files:** Create `src/{text-reveal,text-replace,text-focus,text-handoff}.tsx`；Update 案例 `catalog.ts`、README、SOURCES、资产、`runtime/test/motion-studies.test.ts`；Create `references/motion-language.md`。

**Interfaces:** 沿用 Task 3 的 StudyDefinition/StudyVariant 与生成入口；增加 T01–T04。动态指南作为制作入口引用这些 ID，E 编号仍由 eval 定义。

- [x] **Step 1：补技术检查的案例矩阵。** 对 T01–T04 good/bad 扩展确定性与本地资源检查；T02 重点检查最长替换词的裁切与结尾状态，T03 检查最终焦点不循环，T04 检查交接期间文字不重影。图片等价证明同帧复现；布局/语义仍需实际观察，不写镜像实现的 easing 单元测试。
- [x] **Step 2：实现 T01 语义揭示。** 用明确分组的中文短句 good，与同句逐字机械入场 bad 对照；混合品牌词/数字单位作为另一验证输入。保留标点和品牌完整性。
- [x] **Step 3：实现 T02 关键词替换。** 两版都展示相同且有限的词序列；good 保留主体并给替换词阅读窗口，bad 全句重置。避免把无限循环或缺失文案当作公平对照。
- [x] **Step 4：实现 T03 重点聚焦。** 相同文案与重点；good 最终落定到核心词并可读，bad 在同样总时长内持续转移焦点。保持结尾内容完整，不用缺字制造差距。
- [x] **Step 5：实现 T04 文字进入产品。** 用标明虚构的同一搜索案例，文字对象进入输入框并承接结果；bad 清场后独立进入 UI。两版保持相同语义、顺序和结果素材，不将自造 UI 冒充实际产品功能。
- [x] **Step 6：写动态指南。** 三尺度时间编排＋5 张精简案例卡＋如何选择/调整/停止。记录命令、源路径、可变参数、阅读/衔接与不适用条件；借鉴 React Bits 时记录官方来源，若复制代码再核对许可证。原片动态未观看则不填写精确停顿或音效结论。
- [ ] **Step 7：运行技术测试并正常速度比较。** 中文在实际尺寸/目标预览尺寸检查缺字、断句、裁切、停留；所有 5 组的成对文案、资产、总时长与声音条件一致。只对修过的案例重复局部检查。 **进度：5/5 技术检查通过，关键帧及混合文字布局已查看；正常速度观感未验证。**
- [x] **Step 8：本地 review checkpoint。** 按用户最新要求跳过原计划的 commit；相关源码、文档与记录留在工作树，未暂存、未提交、未推送。

**Acceptance:** Agent 可根据语义选方法，而非抽取组件名称；五组案例都有可运行入口与来源/观察说明，不宣称达到参考影片品质。

## Task 5：接入阶段记录与现有 eval

**Files:** Modify `SKILL.md`、`references/{pipeline,stage-deliverables,eval,tech,template-conventions}.md`、`README.md`；Update results。

**Interfaces:** brief 承载研究摘要，storyboard 承载第三步的节奏意图/落点/阅读/承接；可选 research 文件沿用 `documents[].role = 'reference'`；actionRanges 沿用半开帧区间。无新机器 schema。

- [x] **Step 1：补阶段产物示例。** 展示一份简短依据表，以及在同一段落 ID 上追加时间与文字决策；第二步示例只包含内容、重点词和粗时长。大研究可拆 research.md，但不是必填。
- [x] **Step 2：在第三步接入动态指南。** 先按内容选择方法，再做代表段落、观看和局部扩展；阶段一只描述动态气质，不制作三套动画。入口按需链接，不复制所有卡片。
- [x] **Step 3：关联 eval。** E06/E07/E09 引向 R01，E03/E10 引向文字案例，E02 引向 T04；保留 E01–E10、七维分数和事实/视听底线。研究完成不是新增审美分数。明确同一 easing 本身不构成错误，判断实际动作与阅读。
- [x] **Step 4：写上下文合并示例并验证 B07。** 新文件存在后才加 reference，保留 script/其他 documents/actionRanges；老工程无新记录照常读取。不为了采样添加大量 markers，重点区间使用已有 actionRanges，并遵守 1200 帧预算。
- [x] **Step 5：检查路径、模板范围及 B04/B06/B08。** 现有 `readReviewContext` 测试已覆盖基础能力，无接口变化不新增镜像 schema 测试。需要验证文档示例时在临时工程调用实际函数，保留旧条目并检查结果。
- [x] **Step 6：本地 review checkpoint。** 按用户最新要求跳过原计划的 commit；相关源码、文档与记录留在工作树，未暂存、未提交、未推送。

**Acceptance:** 研究—制作—评审有一致入口，记录可复用，模板/老工程兼容；不靠重复长文增加日常上下文成本。

## Task 6：真实迁移、独立观察与交付核验

**Files:** Update `docs/validation/research-motion-language-results.md`；local only 真实 demo 副本、基线/改版预览与证据，全部在 `films/research-motion-language-validation/` 或用户指定隔离目录。

**Interfaces:** 消费 B01–B08、5 组案例、定位后的两份真实 demo；输出版本绑定的结果、具体改善/退步、成本与待验证项。不得把场景模拟批准写入真实用户记录。

- [x] **Step 1：执行新版 B01–B08 行为检查。** 用相同输入和原始材料；审阅者看实际访问/产物，不把规则原文或期望答案喂给受测 Agent。按真实失败决定是否修正，避免无依据堆叠规则。
- [x] **Step 2：比较官网研究。** 对两份 demo 的原官网，以同样影片目标检查新版多找到什么、哪些真正值得展示、是否改变素材选择。此实验不自动改掉用户已确认的故事。
- [ ] **Step 3：比较节奏与文字。** 每个 demo 选择同时包含文字与产品展示的代表段落，保留原版，在副本固定脚本、方向、素材、总时长与音轨；先只调整时间分配，再在该版本上调整文字表达。若时长/文案必须变化，另记为非受控修订，不能与单变量结果混报。有声片时序调整同步复核混音。 **进度：两份 demo 的原版、时间版、时间＋文字版副本及关键帧已生成；连续观看和音画同步尚未验收。**
- [ ] **Step 4：独立观察。** 让未参与制作的审阅者按正常速度看原版/改版和上下文，先不显示 good/bad 标签，再用具体区间描述读不完、焦点冲突、机械运动或承接改善；不预填评分。必要时回看连续窗口，完整成片结论需完整观看；无音频观察能力不能认证声音。 **进度：本机预览可用；本轮工具未提供连续视听观察，不能用静帧或代码审阅替代。**
- [x] **Step 5：处理输入或观察缺口。** 两份 demo 无法取得时，保留“真实迁移待验证”，只汇报行为、技术和案例范围；不能将本任务标全部完成。能取得一份就验证一份，另一份单独待验证。不临时扩展全片生成来凑数。
- [x] **Step 6：完成必要技术核验。** `npm run build` 和 `npx tsx --test --test-concurrency=1 runtime/test/motion-studies.test.ts`；与记录接入有关的改动如需回归，执行 `runtime/test/review-pack.test.ts runtime/test/review-schema.test.ts runtime/test/review-check.test.ts`。已通过且源码未变化的检查不重复全量运行。
- [x] **Step 7：核对最终状态与成本。** `git diff --check`；检查链接、活跃 skill 版本和既存更名未被覆盖；记录实际 token（若可得）、浏览/生成/返工次数。分别列行为、技术、感知、真实迁移四类结论与未验证项，不承诺节省比例。
- [x] **Step 8：本地 review checkpoint。** 按用户最新要求跳过原计划的 commit；相关源码、文档与记录留在工作树，未暂存、未提交、未推送。

**Acceptance:** 交付能够说明哪些变化有证据、哪些仍需验证；两份真实 demo 的观察完成后才能声称真实迁移验证完成，不能以规则和测试代替用户对质感的判断。

## 依赖、分段交付与自查

Task 1 → Task 2 → Task 3 → Task 4 → Task 5 → Task 6。Task 2 是独立的研究流程交付；Task 3/4 提供动态方法；Task 5 串联；Task 6 验证整体与迁移。真实 demo 暂缺不阻塞 Tasks 2–5。

计划编写时的覆盖检查（不表示实施完成）：

- [x] 官网全貌/深挖/停止条件/受限材料 → Tasks 1/2。
- [x] 功能巡礼合法、第二步只定内容、授权与模板边界 → Tasks 2/5/6。
- [x] 三尺度节奏、语义文字、五组公平对照、中文可读 → Tasks 3/4。
- [x] 帧确定性、生成工程资产独立、现有记录兼容 → Tasks 3/4/5。
- [x] 案例和真实 demo 分开、缺视听证据不虚报、成本可核验 → Task 6。
- [x] 无新 runtime API/schema/依赖；实现与本地验证状态如上，不以技术通过代替感知验收。
