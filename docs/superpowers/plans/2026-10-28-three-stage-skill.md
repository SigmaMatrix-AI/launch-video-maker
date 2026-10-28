# Three-Stage Launch Video Skill Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** 将自主设计改为“3 种效果图选调性 → 故事脚本与简易分镜确认内容 → UI、镜头、节奏与动效持续打磨”，以 Good / Bad 案例指导创作和评审，减少整片完成后方向错误造成的返工。

**Architecture:** 主要重构 skill 文档，保留 runtime、模板执行与七维审阅机制。入口只保留模式选择、三阶段边界和按需阅读链接；流程文档定义阶段交付和续作；eval 以案例对照为入口，文字规则作为解释与底线。通过现有 Markdown 制作记录保留选择、脚本和版本，无需新增状态机。

**Tech Stack:** Markdown skill；现有 React + TypeScript、Playwright、FFmpeg；Node.js 24+。运行层仅可能更新评审 handoff 的文档指引，不新增依赖/API/评分字段。

**Spec:** [自主设计三步走设计约定](../specs/2026-10-28-three-stage-skill-design.md)。实施前读 spec 和本计划；不要把输入快照当成已经实施的新 skill。

## Global Constraints

- 第二步不是动态验证或质感验收。
- 用户新增的默认创作准则：**Good：标题和文字单独镜头出现，并有高亮词或动效；Bad：标题和配图左右构图、上下构图，像 PPT。**
- 只在 Agent 自规划路线启用新的默认流程。模板 reference 路线保留已有复刻范围与编排，不强制追加三方向竞稿；只修跨文档冲突。
- 没有回复不是批准。用户明确说“你决定、直接做完”时，在授权范围代选并记录，不重复要求确认。
- 继续使用 React + TypeScript、统一帧控制、Playwright 与 FFmpeg，Node.js 24+。
- 不重建 runtime、播放器或评分引擎，不增加工作流数据库或强制 JSON 状态机。
- 默认提供本地预览，明确请求导出后再生成用户 MP4。
- 保留七维评分与每项 7.5 门槛、真实性/可读性/资源等底线，以及证据不足记未验证的约定。
- 用户已授权实施。完成情况与证据范围见 [验证记录](../../validation/three-stage-skill-results.md)；安装切换与发布仍不在本次范围。

## Review Focus

1. 时间压力导致跳过方向/故事确认：场景 S1/S2 必须停在正确阶段，用户明确委托的 S3 应继续（Task 1/2）。
2. 将“避免 PPT”误读为禁用所有 UI 标题或禁用停留：S4 保留真实界面标签与可读结果，宣传标题仍独立成镜（Task 1/3）。
3. 确认信息在续作时丢失或被伪造：S5 局部反馈只改受影响镜头，无批准记录时不猜测确认（Task 1/2/4）。
4. 自主设计准则侵入模板复刻：S6 遵守已有构图/时序约定，不强制补三套方案（Task 1/2）。
5. 把抽帧、技术通过或 7.5 说成“很贵/视听通过”：S7 标记实际观察范围；S8 缺参考不伪造证据（Task 1/3/5）。

---

## 工作树与规划基线

- 计划工作树：`/Users/mac/.codex/worktrees/three-stage-skill-plan/launch-video-maker`。
- 分支：`codex/three-stage-skill-plan`；起点：`b7b61fc11fad63adc7fcceca82611b05b3df1b71`。
- 原工作目录存在未提交修改，快照目录为 `docs/superpowers/specs/2026-10-28-three-stage-inputs/`，其中 `manifest.json` 给出源路径与 SHA-256。
- 快照只用于确定规划输入。逐文件对比 worktree、快照和最新主线；不整体复制旧目录，不带入 styles 删除、图片改动或其他并行工作。
- 当前安装入口 `/Users/mac/.agents/skills/launch-video-maker` 指向原目录。验证新版时给代理传入 worktree 的绝对 `SKILL.md` 路径；本计划不切换安装、不发布。
- 当前 `runtime/src/project.ts` 创建 `brief.md`、`direction.md`、`storyboard.md`；`readReviewContext(project)` 已支持 role 为 `reference` 的其他 Markdown。新增 `script.md` 用这个现有扩展点即可。
- `runtime/src/review/pack.ts` 的 handoff 在原目录已有未提交一行修改，保存在输入快照的 `review-handoff-existing.patch`。实施 Task 4 时合并该意图，不覆盖整文件。

## 文件职责

| 文件 | 处理 | 职责 |
| --- | --- | --- |
| `SKILL.md` | 修改 | 触发、两种模式、三阶段入口、确认边界、预览/导出约定 |
| `references/pipeline.md` | 重写 | 三阶段动作、确认与续作、第三步迭代顺序 |
| `references/stage-deliverables.md` | 新建 | 每阶段最小产物示例、记录文件内容和 review-context 接法 |
| `references/eval.md` | 新建/重构 | 10 条 Good / Bad 案例、参考锚点、底线和评审写法；在基线 Git 中尚不存在 |
| `references/tech.md` | 修改 | 保留技术与七维评分，链接案例标准和新增脚本上下文 |
| `references/template-conventions.md` | 修改 | 模板路线边界，避免三阶段要求误扩散 |
| `README.md` | 修改 | 对外流程与实际执行一致、按需阅读导航 |
| `runtime/src/review/pack.ts` | 最小修改 | handoff 指向 eval 案例与 tech 评测协议，不改证据包机制 |
| `docs/validation/three-stage-skill-scenarios.md` | 新建 | 固定输入、场景预期、逐项判定依据 |
| `docs/validation/three-stage-skill-results.md` | 新建 | 新旧行为结果、原始证据位置、观察限制与成本记录 |

无需修改 `runtime/src/project.ts`、review schema/check、renderer、templates 源码或 style 包。`stage-deliverables.md` 是制作记录示例，不是新的软件协议。

## Task 1：建立行为基线与可判定的验证场景

**Files:**
- Create: `docs/validation/three-stage-skill-scenarios.md`
- Create: `docs/validation/three-stage-skill-results.md`
- Read: 输入快照的 `SKILL.md` / `references/*` 与 spec

**Interfaces:**
- Consumes: 设计约定和快照，不读取尚未完成的新规则。
- Produces: 固定场景 S1–S8；每项记录输入、实际输出/动作、预期、判定、证据路径和观察限制，供 Tasks 2–5 复测。

- [x] **Step 1：写 S1–S8 场景与预期。**

| ID | 输入场景 | 可检查预期 |
| --- | --- | --- |
| S1 | 产品资料齐全，要求自主设计，但未选方向 | 同一内容的 3 个视觉方向；停在选择点；不制作完整影片 |
| S2 | 用户已选 B；催促尽快看草稿，但未确认故事 | 交付脚本和粗分镜；不把最终 UI、精确帧区间或动态验收设为第二步条件 |
| S3 | 用户明确说“方向和脚本都由你决定，直接做完” | 在授权内代选并记录；不重复确认，不捏造用户亲选 |
| S4 | “一份内容，多种语言”；真实 UI 带页头、导航和结果 | 宣传文字独立成镜并突出关键词；保留必要 UI 标签与可读停留；拒绝默认标题配图双栏/上下布局 |
| S5 | 已确认方向和脚本，用户只要求某个按钮动作更精确 | 留在第三步；不重做三方向/故事；记录变更与受影响接缝。附加无确认记录版本，不推测批准 |
| S6 | 明确要求模板逐镜复刻，只换产品内容 | 遵守模板编排，记录真实性/可读性冲突；不强制新增阶段或拆掉参考标题布局 |
| S7 | 只有静态抽帧和技术通过日志，没有试听 | 不声称完整动态/视听通过，不自动打高分，不把 7.5 当成“很贵” |
| S8 | 两条参考在另一台机器不可读 | 报告证据缺口；可使用已记录的文字观察，不虚构看片、音效或时间点 |

- [x] **Step 2：用当前快照版本跑短行为基线。** 使用新上下文代理；只做计划/选择/评审响应，不生成三条影片。提供明确的测试材料和模拟用户对话，模拟确认只存在于测试，不写入真实用户制作记录。保存实际回答，记录发生的违例；未观察到的失败不可写成已复现。
- [x] **Step 3：把发现映射到需要修改的规则。** 核心已知冲突是“不在 storyboard 等阶段等待确认”；对其他场景按实际表现判断。此阶段不修改 skill。
- [x] **Step 4：提交验证材料。** `git add docs/validation/three-stage-skill-*.md`，提交信息 `test(skill): define three-stage workflow scenarios`。原始大日志和生成媒体放 ignored 的实验目录，仅提交精炼证据记录。

**Acceptance:** S1–S8 都有明确预期；基线结论有真实输出，不用搜索关键字代替行为判断。

## Task 2：实现三阶段流程与阶段产物

**Files:**
- Modify: `SKILL.md`
- Modify: `references/pipeline.md`
- Create: `references/stage-deliverables.md`
- Update: `docs/validation/three-stage-skill-results.md`

**Interfaces:**
- Consumes: S1/S2/S3/S5/S6、spec 的阶段契约。
- Produces: `records/brief.md`、`records/direction.md`、`records/script.md`、`records/storyboard.md` 的最小写法；在 `direction`/`script` 中记录选择版本和确认依据，沿用现有 Markdown 文件格式。

- [x] **Step 1：改入口。** 保留触发条件与两种模式；自主路线明确“3 种效果图→故事确认→精修”。删除与新边界冲突的连续推进、不等确认措辞；把自主权定义为阶段内的执行判断。入口仅链接深入规则，不重复完整 eval。
- [x] **Step 2：改 pipeline。** 产品研究作为阶段一的准备，不另加用户关卡。写清三个阶段的输入、产物、确认点、允许修改范围和续作路由。第三步负责 UI、镜头衔接、节奏、动作和声音；第二步不要求播放验证。
- [x] **Step 3：写最小产物示例。**
  - 第一阶段：`assets/directions/a.png`、`b.png`、`c.png` 与 direction 记录；选择图像/截图方法按现有能力，不引入固定生成器。候选内容一致、设计明显不同。
  - 第二阶段：script 示例至少包含“开头—问题—产品介入—结果—结尾”；storyboard 的列为段落 ID、内容目的、简图/画面说明、大致时长。时长仅用于故事规模判断。
  - 第三阶段：在 storyboard 中给相同段落 ID 补充焦点、主体变化、衔接、实际帧区间/时间和音频。script 继续保存已确认的内容主线。
  - 给出续作时“选择 B 已确认 / 脚本 v2 待确认 / 用户授权代选”等短记录示例；不假设任何真实批准。
- [x] **Step 4：用同一输入复测 S1/S2/S3/S5/S6。** 如阶段边界措辞有歧义，使用短回答微测比较旧/新版本各至少 5 次，逐条人工读输出；微测只在存在歧义的输入上进行，不重复渲染。确认声明与实际下一步一致。
- [x] **Step 5：提交。** `git add SKILL.md references/pipeline.md references/stage-deliverables.md docs/validation/three-stage-skill-results.md`；`feat(skill): introduce three-stage autonomous design`。

**Acceptance:** 三个方向没有变成三条完整影片；第二步能独立确认“讲什么”；明确委托能绕过重复确认；续作沿用有效决定。

## Task 3：以 Good / Bad 案例重构 eval

**Files:**
- Create/Modify: `references/eval.md`
- Modify: `references/pipeline.md`（仅第三步评审引用）
- Update: `docs/validation/three-stage-skill-results.md`

**Interfaces:**
- Consumes: spec 中 E01–E10、四段参考的可验证观察、S4/S7/S8。
- Produces: 稳定案例 ID `E01`…`E10`；局部反馈格式“时间区间 + 现象 + 案例 ID + 修改动作 + 复看条件”。ID 保持稳定，便于续作引用。

- [x] **Step 1：逐项保留当前 eval 的底线。** 从快照提取真实性、关键操作、可读性、资源/播放故障、版本证据、试听与独立审阅要求。不要用短案例表覆盖掉这些规则。
- [x] **Step 2：把 E01–E10 表格放在 eval 开头。** 每项必须写具体 Good、Bad 和判断关键，不用“更高级/更自然”替代可观察现象。E10 原样保留用户的文字独立镜头准则；区分宣传标题与真实 UI 标签，明确模板复刻由约定范围控制。
- [x] **Step 3：补 4 张文字案例卡。** 卡片对应 LangEase 10–14 / 15–19 秒、Google Vids 10–16 / 55–62 秒；每张说明表达目标、对象怎样变化、为什么有帮助，以及“坏改法”的文字反例。Bad 为推演示例，不冒充原片缺陷；时间点须重新核验。链接到有权限的参考来源，原片未提供可分发地址时记录本地开发来源和可用性限制，不杜撰网页链接、不复制大 MP4。
- [x] **Step 4：加入分层与迭代示例。** 解释基础合格 / 有视频感 / 参考质感的差别，不改变数值门槛。第三步优先修主体和信息问题，再修局部工艺；保持静止、硬切等手段的合理用途。
- [x] **Step 5：复测 S4/S7/S8，并检查四张卡的证据范围。** 代理应能用案例定位问题并提出可验证修改，不能把所有镜头强行变形或要求全片持续运动。细微缓动和声音未观察就标未验证。
- [x] **Step 6：提交。** `git add references/eval.md references/pipeline.md docs/validation/three-stage-skill-results.md`；`feat(skill): lead quality review with good bad examples`。

**Acceptance:** 只读表格就能理解十种具体差距；深层规则仍可查；没有依靠抽帧虚报声音或完整观看结论。

## Task 4：打通制作记录、审阅导航与模板边界

**Files:**
- Modify: `references/stage-deliverables.md`
- Modify: `references/tech.md`
- Modify: `references/template-conventions.md`
- Modify: `README.md`
- Modify: `runtime/src/review/pack.ts`（仅 handoff 文案）
- Update: `docs/validation/three-stage-skill-results.md`

**Interfaces:**
- Consumes: 三阶段产物、E01–E10；现有 `readReviewContext(project)` 与 `ReviewContext`。
- Produces: 不改接口的上下文接法：script 通过现有 `reference` role 进入 review pack，方向/分镜仍由默认路径收集。

- [x] **Step 1：写 review-context 示例。** 示例为 `{"documents":[{"role":"reference","path":"records/script.md"}],"actionRanges":[]}`。说明合并已有 documents/actionRanges，不覆盖用户设置；加入该条前 script 必须存在。老项目无 script 时继续用现有 brief/storyboard，不强行制造“已确认脚本”。
- [x] **Step 2：同步 README、tech 与模板说明。** 移除“自主路线直接全片推进”的冲突；只在自主路线增加两个确认点。统一预览与 MP4 导出约定。不要把强节拍、每拍切镜变成所有风格的硬性质量判断。
- [x] **Step 3：更新 handoff 文案。** 在 `runtime/src/review/pack.ts` 的 handoff 模板中指向 `references/eval.md` 的案例诊断和 `references/tech.md` 的七维/证据协议。先检查原一行 patch 是否已被其他分支合入，避免重复；保持当前 evidence / scoring API。
- [x] **Step 4：检查链接与记录接入。** 逐个检查新文档的相对路径、标题锚点和示例路径；在独立测试影片中通过 `readReviewContext(project)` 检查 reference script 与三个默认记录共存，已有 actionRanges 保持原值。不得仅用字符串存在性测试声称流程通过。
- [x] **Step 5：运行现有相关回归。** 若环境尚未安装，使用 Node.js 24+，`npm ci` 后 `npm run build`。执行 `npx tsx --test --test-concurrency=1 runtime/test/review-pack.test.ts runtime/test/review-schema.test.ts runtime/test/review-check.test.ts`；预期所有测试通过。依赖或 Chromium/FFmpeg 缺失时先报告真实环境问题，不能记为产品通过。文案修改无需新增镜像字符串测试。
- [x] **Step 6：提交。** 显式暂存本 Task 列出的文件；`docs(skill): align stage records and review guidance`。

**Acceptance:** 新旧项目能沿用现有审阅接口，stage 2 的脚本不会在 stage 3 审阅时丢失；模板没有被强制重新创作。

## Task 5：验证案例是否真的改变制作与评审行为

已执行；正常速度感知观看与声音认证保留未验证，详见验证记录。步骤完成标记不代表商业影片品质通过。

**Files:**
- Update: `docs/validation/three-stage-skill-results.md`
- Local only: `films/three-stage-proof/`（生成内容已被 Git 忽略）

**Interfaces:**
- Consumes: 新版 skill、固定测试 brief、明确标注为模拟的方向/故事确认、E02/E10 和现有预览工具。
- Produces: 行为复测报告、可播放片段的实际观察记录、未验证项；不自动部署或发布。

- [x] **Step 1：完整复测 S1–S8。** 使用同一组材料，显式引用 worktree 版 skill；保留与旧版的差异。不把模拟用户确认写入真实工作记录。
- [x] **Step 2：制作一个短视觉对照。** 用同一测试故事“把零散客户反馈整理成优先级清单”，建议约 6–10 秒，包含独立文字镜头（关键词高亮/动效）和一个主体从输入到成果的连续变化。使用同内容的“标题配图+整页切换”作为低成本 Bad 对照。两者保持文字、素材和规格可比，Bad 不另做完整影片。测试为独立 preview 工程，不默认导出用户 MP4。
- [x] **Step 3：实际观察并记录。** 正常速度查看文字可读性与对象跟踪，逐帧检查必要接缝；有声音且评价声音时必须试听。用 E02/E10 描述变化，不预填期望分数。让未参与制作的审阅者检查当前版本；若缺观察/独立审阅能力，保留未验证结论。
- [x] **Step 4：记录成本与限制。** 有真实用量才填写 token；否则只记录生成、返工次数和实际耗时。不以这个小样宣称全片稳定达到参考质量。只对失败场景补修和复测，避免重复全部制作。
- [x] **Step 5：完成交付检查。** `git diff --check` 应无输出；核对三阶段、E01–E10、模板边界、视听证据和导出规则都能定位到对应文件。相关 runtime 回归已通过且代码未再改时不重复跑全套。交付 plan 完成情况、行为结果和实际预览位置；安装路径仍未切换。
- [x] **Step 6：提交验证记录。** `git add docs/validation/three-stage-skill-results.md`；`test(skill): record three-stage workflow and visual validation`。生成样片、依赖、原参考 MP4 不加入 Git。

**Acceptance:** 验证记录能说明新流程是否避免了越阶段、是否产出独立文字镜头、是否改善了对象承接；无法证明的部分明确保留，不把“文档写完”报告成“品质问题解决”。

## 依赖与实施方式建议

Task 1 → Task 2 → Task 3 → Task 4 → Task 5。流程与案例紧密相连，建议由同一实施者顺序完成；在行为基线/复测与最终观察中使用隔离代理即可，不同时分派多人重写同一份 skill。这样能控制上下文成本，也便于发现规则之间的冲突。

## 计划自查

- [x] 三个阶段均有输入、产物和确认边界；第二步没有被改成动态验收。
- [x] 用户新增的独立文字镜头 Good / Bad 已落入 E10、S4 和 Task 5 实际样片。
- [x] 新增 script 通过现有 reference role 接入；未要求 runtime 自动生成或推断确认。
- [x] 现有七维与证据要求保留，参考片观察范围和未试听限制写明。
- [x] 两种模式与已安装 skill 的路径差异写明；不会在 worktree 规划时改变原安装。
- [x] 当前未提交 eval 和其他相关文档已保存输入快照；没有带入无关 styles 变动。
- [x] 任务给出了具体文件、操作与验证；没有把 skill 文本镜像测试当成行为测试。
- [x] 规划阶段仅创建计划与输入快照；后续实施状态以各 Task 复选框和验证记录为准。
