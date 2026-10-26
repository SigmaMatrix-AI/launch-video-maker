# 评测体系完善 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** 建成可核查证据、可独立审阅、可逐项复测的本地影片评测流程，并准确区分视觉结论与完整七维商用结论。

**Architecture:** 将 tools.ts 中的评测逻辑拆成小型 review 模块，复用现有捕获事务、Player 与内容版本。证据包保存不可混用的文件索引，独立 subagent 填写判断，校验器验证范围、引用、门槛和复测关系。当前不实现自动听感评测，也不以抽帧替代连续观看。

**Tech Stack:** Node >=24、TypeScript、node:test + tsx、Playwright、FFmpeg/ffprobe；不新增运行依赖。

**Spec:** [评测设计与范围](../specs/2026-10-26-review-system-design.md)；现有基线 [审查规范](../../../references/review.md)、[运行契约](../../../references/runtime-contract.md)。冲突以本次获批设计的范围区分为准，七维商用标准不降低。

## Global Constraints

- 仅本地处理；不向外部 API 发送影片、音频或评测素材。
- 不安装听音模型，不增加模型服务，不自动调用外部评测 API。
- 不修改 `templates/`、`styles/` 或另一个 agent 的模板工作。
- 不修改、不依赖 `video-shotcraft` 的文件；只借鉴独立审查和具体证据的做法。
- 不自动打开浏览器，不生成用于绕过导出授权的整片视频文件。
- Node >=24；沿用现有 TypeScript、Playwright、FFmpeg，不新增运行依赖。
- 七维商用门槛保持每项 >=7.5/10；视觉通过不等于七维商用通过。
- 默认生成未评分报告；工具不得生成审美分数或伪造观察、试听和独立性声明。

## Review Focus

1. 重叠场景、末帧边界、分数 fps 不越界或重复采集，完整窗口不能偷偷降采样（Task 2）。
2. 同版本重跑、损坏证据、换 runtime、采集期间改源文件：旧成果保留，新旧证据不能混用（Tasks 3–5）。
3. 包内路径逃逸、符号链接、缺失 Markdown 品牌记录与错误类型输入：明确失败／incomplete，不崩溃或假通过（Tasks 1、3、5）。
4. 后台播放结束或抽到若干帧，不能自动写成“独立 agent 连续看过”；缺观察能力仍 incomplete（Tasks 4–5）。
5. 修改后删掉旧阻断、只引用旧证据、将预览结论套到不同 MP4：必须拒绝放行（Tasks 5–7）。

---

## 文件职责与共享接口

新建 `runtime/src/review/`：

| 文件 | 职责 |
| --- | --- |
| types.ts | v2 manifest/report/result、维度常量和数据类型 |
| schema.ts | unknown 输入的结构检查，返回数据或字段路径错误 |
| sampling.ts | 纯函数：概览帧、逐帧窗口与预算 |
| files.ts | 本地路径边界、流式 SHA-256、runtimeHash、索引核验 |
| pack.ts | 上下文快照、预览／既有 MP4 证据、唯一目录发布 |
| playback.ts | 后台实际播放及日志；不输出审美结论 |
| check.ts | 范围门槛、文件核验、观察覆盖和历史复测校验 |

修改 `runtime/src/tools.ts`（迁出 reviewPack/validateReview，保留 capture/analyzeAudio）、`runtime/src/cli.ts`（命令接线）。不重构 Player／renderer，也不增加浏览器评测 UI。测试分到 review-schema/sampling/pack/playback/check/cli.test.ts；测试构造器放 `runtime/test/review-fixtures.ts`，不得放入 templates。

统一类型在 Task 1 定义，后续不另造近义字段：

```ts
type ReviewScope = 'visual' | 'audiovisual';
type ReviewStatus = 'passed' | 'failed' | 'incomplete';
type FrameRange = {start:number; end:number}; // [start,end)
type Dimension = '风格还原'|'创意与惊艳'|'动效工艺'|'设计与排版'|'质感与细节'|'声音与同步'|'技术规格';
type Evidence = {id:string; path:string; kind:'frame'|'context'|'mix'|'playback'|'probe'|'history'; sha256:string; bytes:number; frame?:number; range?:FrameRange};
type Target = {kind:'preview'; version:string; runtimeHash:string} | {kind:'mp4'; version:string; file:string; sha256:string};
type SamplingPlan = {frames:number[]; windows:FrameRange[]; overviewFrames:number[]};
type ReviewContext = {documents:{role:'brief'|'direction'|'storyboard'|'brand'|'reference'; path:string}[]; actionRanges:FrameRange[]};
type PlaybackTrace = {completed:boolean; samples:{elapsedMs:number; frame:number; playing:boolean}[]; errors:string[]; elapsedMs:number};
type Observation = {mode:'static'|'sequence'|'continuous-playback'|'listening'; range:FrameRange; evidenceIds:string[]; method:string; notes:string};
type Finding = {id:string; dimension:Dimension; severity:'blocking'|'advisory'; sceneId:string|null; range:FrameRange|null; description:string; fixTarget:string; evidenceIds:string[]; state:'open'|'resolved'|'not-reproduced'; resolution:string|null};
type Score = {state:'rated'|'unverified'|'deferred'; score:number|null; reason:string; evidenceIds:string[]};
type ReviewManifest = {schemaVersion:2; target:Target; film:Film; createdAt:string; tools:Record<string,unknown>; sampling:SamplingPlan; files:Evidence[]; missingContext:string[]; previous?:{reportEvidenceId:string; manifestEvidenceId:string}};
type ReviewReport = {schemaVersion:2; scope:ReviewScope; target:Target; manifestSha256:string; reviewer:{id:string|null; independent:boolean; capabilities:{continuousVisual:boolean; audio:boolean}}; observations:Observation[]; scores:Record<Dimension,Score>; findings:Finding[]};
type ReviewResult = {scope:ReviewScope|null; scopeStatus:ReviewStatus; commercialStatus:ReviewStatus; reasons:{code:string; path:string; message:string}[]};
type PackOptions = {scope?:ReviewScope; mp4?:string; previous?:string; signal?:AbortSignal};
type PackResult = {directory:string; manifestPath:string; reportPath:string};
```

Film 导入现有 core.ts。所有已填写区间验证为整数且 `0<=start<end<=N`；Finding.range=null 只用于等待重新定位的草稿，checkReview 必须将其判为 incomplete；索引 id／问题 id 唯一；文件 path 为包内相对路径。`Target.file` 允许指向工程外指定 MP4，不作为任意证据路径解析；检查时对该文件单独取哈希。模型或制作文案不进入运行逻辑。

### Task 1: v2 报告契约与兼容失败行为

**Files:** Create types.ts、schema.ts、runtime/test/review-schema.test.ts、runtime/test/review-fixtures.ts（均按上面的目录）；暂不修改 CLI。

**Interfaces:** Produces `parseManifest(input:unknown): {ok:true; value:ReviewManifest}|{ok:false; errors:string[]}`、`parseReport(input:unknown): {ok:true; value:ReviewReport}|{ok:false; errors:string[]}`；`createDraft(manifest:ReviewManifest, manifestSha256:string, scope:ReviewScope):ReviewReport`。解析器只做结构／数值约束，文件存在和帧上界由后续校验器处理。测试 helper `makeManifest():ReviewManifest`、`makeReport():ReviewReport` 返回 60 帧、30fps 的纯合成数据，仅供测试，不伪装实际评审。

- [x] **Step 1 — 写失败测试。** `reject malformed review inputs` 对 null、数组、旧版对象、字符串 evidenceIds、NaN/Infinity、7.5 字符串评分、重复问题 id 断言 `parseReport(x).ok===false`；`draft never claims observation` 断言 draft reviewer.id=null、independent=false、observations.length=0、七维 score=null、visual 声音项 state=deferred；manifest 测试重复证据 id 和负数字节。
- [x] **Step 2 — RED。** `npx tsx --test runtime/test/review-schema.test.ts`；预期缺少新模块／导出导致 FAIL。

  核心断言：`assert.equal(parseReport(null).ok, false)`；`assert.equal(createDraft(makeManifest(), 'a'.repeat(64), 'visual').scores['声音与同步'].score, null)`。
- [x] **Step 3 — 实现类型、解析器和 draft。** schemaVersion 精确为 2；不得用类型断言替代 unknown 校验。返回字段路径错误，不抛出普通坏数据异常；历史格式不自动升级。
- [x] **Step 4 — GREEN。** `npm run build && npx tsx --test runtime/test/review-schema.test.ts`；预期构建成功、全部 PASS。
- [x] **Step 5 — Commit。** 只暂存上述四个新文件；`git commit -m "feat(review): define versioned review contracts"`。

### Task 2: 可解释的概览帧与连续窗口

**Files:** Create runtime/src/review/sampling.ts、runtime/test/review-sampling.test.ts。

**Interfaces:** Consumes Film、FrameRange、SamplingPlan；Produces `planSamples(film:Film, actionRanges:FrameRange[]=[]):SamplingPlan`。预算常量 `MAX_REVIEW_FRAMES=1200`。

- [x] **Step 1 — 写失败测试。** `single frame and end boundary`：N=1 输出 frames=[0]、windows=[{start:0,end:1}]；`fractional overview`：30000/1001、N=60、无场景／marker 时 overviewFrames=[0,14,29,44,59]；`overlapping scenes merge dense windows`：30fps、场景[0,40)、[30,60)，窗口合并为[0,9)、[22,49)、[52,60)，且所有窗口内帧均在 frames；`explicit action ranges reject overflow`：[58,61) 对 N=60 抛错；`budget never silently thins`：显式区间[0,1201)且 N=1201 抛含1200预算的错误。
- [x] **Step 2 — RED。** `npx tsx --test runtime/test/review-sampling.test.ts`；预期模块不存在 FAIL。

  核心断言：`assert.deepEqual(planSamples({...makeManifest().film, durationInFrames:1, scenes:[], markers:{}}).frames, [0])`。
- [x] **Step 3 — 实现 planSamples。** 按 spec 的整数比公式计算；每个边界 b 窗口 `[max(0,b-r),min(N,b+r+1))`，因此 b=N 会保留尾端但不采第 N 帧。合并相邻／重叠区间，首末帧计入 overviewFrames，去重后计算预算。
- [x] **Step 4 — GREEN。** `npm run build && npx tsx --test runtime/test/review-sampling.test.ts`；预期全部 PASS。
- [x] **Step 5 — Commit。** 暂存两个文件；`git commit -m "feat(review): sample transitions and action windows"`。

### Task 3: 不覆盖历史的本地证据包

**Files:** Create runtime/src/review/files.ts、pack.ts、runtime/test/review-pack.test.ts；测试 fixture helper 按需扩展。

**Interfaces:** Consumes Task 1–2、FilmServer、openCapture(server)、inspect(file)、contentVersion(project)。Produces `sha256File(file:string):Promise<string>`、`runtimeFingerprint():Promise<string>`、`verifyEvidence(directory:string, files:Evidence[]):Promise<string[]>`、`buildReviewPack(server:FilmServer, parent:string, options:PackOptions={}, limits:{maxBytes:number}={maxBytes:2*1024**3}):Promise<PackResult>`。files.ts 内共享 `resolveEvidencePath(directory:string, relativePath:string):Promise<string>`；pack.ts 内 `readReviewContext(project:string):Promise<{context:ReviewContext; missing:string[]}>`。Task 4 再接入播放记录，本任务包允许缺 playback、保持未完成。

- [x] **Step 1 — 写失败集成测试。** `pack never overwrites a report`：同版本连续建两包路径不同，首包手填 report 字节不变；`brand Markdown is valid context`：只提供 sources.md，missingContext 不含 brand；`source output path rejected`：parent=project/records/review 时抛错且 contentVersion 不变；`escape and symlink rejected`：配置 `../secret.md` 及指向工程外的链接均失败；`interrupted pack remains unpublished`：已取消 signal 不生成成功目录，已有包字节不变；`captures actual MP4`：用测试生成的六帧 MP4 建包，frame证据来自解码成片，目标 SHA 与源一致、源不改写，不调用 render。
- [x] **Step 2 — RED。** `npx tsx --test runtime/test/review-pack.test.ts`；预期模块不存在 FAIL。

  fixture准备server和parent后：`assert.notEqual((await buildReviewPack(server, parent)).directory, (await buildReviewPack(server, parent)).directory)`。
- [x] **Step 3 — 实现 files.ts。** SHA 用 Node 流式读取；runtimeHash 纳入安装包 dist/web 的相对路径和内容；verifyEvidence 返回缺文件／哈希／字节／非法路径错误，目录边界检查用 realpath，拒绝索引文件与父路径符号链接逃逸。不把哈希描述为真实性签名。
- [x] **Step 4 — 实现 pack.ts。** 使用 mkdtemp 临时包、随机 UUID 成功目录、失败 finally 清理；按文件写入前后计入 2 GiB 预算，使用 FFmpeg 管道截断超预算输出而非先写满磁盘。preview 复用 openCapture；MP4 使用 ffprobe 顺序解码帧号，验证 CFR／帧数／尺寸／fps，按 plan 选择原始帧，禁止 seek 近似抽帧。仅抽取指定现有 MP4 的图像和混音，不封装新视频。首尾校验源内容、runtime或 MP4 哈希；上下文复制到包内。报告引用 manifest 文件哈希，评分留空。handoff 先写本地文件目录与能力限制，Task 6 补完整审阅指引。
- [x] **Step 5 — 增加并运行预算及修改中断测试。** `byte budget cleanup` 在内测可注入的小预算下触发真实输出超限，断言没有成功包及残余临时包；第四参数 limits 仅供模块测试，必须为正安全整数；CLI固定使用2 GiB，不新增预算参数。`source changed during capture` 在第二帧前修改 film.tsx，断言失败；`modified evidence detected` 改一张 PNG，断言 verifyEvidence 非空。
- [x] **Step 6 — GREEN。** `npm run build && npx tsx --test runtime/test/review-pack.test.ts`；预期全部 PASS。
- [x] **Step 7 — Commit。** 暂存本任务源文件及测试；`git commit -m "feat(review): build immutable local evidence bundles"`。

### Task 4: 后台真实播放的运行证据

**Files:** Create runtime/src/review/playback.ts、runtime/test/review-playback.test.ts；Modify review/pack.ts。

**Interfaces:** Consumes FilmServer、PlaybackTrace；Produces `recordPlayback(server:FilmServer, signal?:AbortSignal):Promise<PlaybackTrace>`。运行失败返回 completed=false + errors；取消抛 AbortError。pack 将 trace 作为 kind=playback 文件纳入索引；不因 trace 失败丢弃其他有用证据。

- [x] **Step 1 — 写失败测试。** `real playback reaches final frame` 对 60 帧／30fps 工程断言 completed=true、首样本 frame=0、尾样本 frame=59且playing=false；`playback failure is not observation` 注入页面错误／提前暂停，断言 completed=false且 errors 非空，draft.observations仍为空；`cancel closes browser` 取消后断言 Promise 拒绝且浏览器／页面关闭。提前暂停通过 Playwright route 注入已知测试脚本，不给生产接口增加 arbitrary page callback。
- [x] **Step 2 — RED。** `npx tsx --test runtime/test/review-playback.test.ts`；预期模块不存在 FAIL。

  对60帧正常fixture：`const trace=await recordPlayback(server); assert.equal(trace.completed,true); assert.equal(trace.samples.at(-1)?.frame,59)`。
- [x] **Step 3 — 实现 recordPlayback 并接入 preview pack。** 独立 headless 页面，通过现有 #play 与 __LVM__.state() 观察，每100ms采样；等待显式 ready、采集0帧状态后开始播放，按 spec 超时。核对 server.assertVersion，记录 pageerror、失败请求和HTTP>=400；finally 关闭浏览器。采样器不能因播放中短暂buffering误判结束，只有末帧自然停止才completed。MP4包不调用这条Player检查，不伪造相同trace。
- [x] **Step 4 — GREEN。** `npm run build && npx tsx --test runtime/test/review-playback.test.ts runtime/test/review-pack.test.ts`；预期全部 PASS，包内有playback哈希条目且无人自动被标记看过。
- [x] **Step 5 — Commit。** 暂存三个文件；`git commit -m "feat(review): record actual preview playback evidence"`。

### Task 5: 证据门槛、范围结论与逐项复测

**Files:** Create runtime/src/review/check.ts、runtime/test/review-check.test.ts；Modify review/pack.ts、review-fixtures.ts。

**Interfaces:** Consumes Task 1–4；Produces `checkReview(reportPath:string, current:{version:string; runtimeHash:string}):Promise<ReviewResult>`。报告与manifest位于同包；previous由manifest指定的history索引读取，不信任report另写路径。测试 helper `writeReviewFixture(dir:string):Promise<{reportPath:string}>` 只创建已知合成证据／声明，用于门槛测试。

- [x] **Step 1 — 写失败测试。** `visual pass is never commercial pass` 对完整合成视觉报告断言 scopeStatus=passed、commercialStatus=incomplete；`7.49 does not round to pass` 断言failed；`missing observation stays incomplete` 删continuous-playback或设continuousVisual=false，即使trace.completed=true仍incomplete；`legacy or malformed never crashes` 对旧版、null、坏JSON返回incomplete与原因；`wrong binding rejects` 改manifest、PNG、runtimeHash、MP4任一绑定都incomplete。
- [x] **Step 2 — RED。** `npx tsx --test runtime/test/review-check.test.ts`；预期模块不存在 FAIL。

  对完整视觉fixture（current匹配fixture目标）：`const result=await checkReview(reportPath,current); assert.equal(result.scopeStatus,'passed'); assert.equal(result.commercialStatus,'incomplete')`。
- [x] **Step 3 — 实现 checkReview。** 按 spec 顺序解析，要求reviewer.id非空、independent=true，再校验当前版本／runtime／MP4、manifest哈希、文件索引、上下文缺项、帧范围、场景引用、观察覆盖、评分和问题。sequence须属于完整采样窗口；continuous-playback须覆盖[0,N)、有具体method/notes且引用当前帧证据，preview另要求成功trace。audiovisual还需audio能力和全片listening观察引用当前mix；visual声音项只允许deferred/null。不同dimension必须各有reason和有效evidenceIds。保留能力声明不能被工具认证的说明。
- [x] **Step 4 — 实现 previous 的复制与新报告初始化。** buildReviewPack读取旧报告及同目录manifest，先校验结构和manifest哈希、拒绝跨preview/mp4目标种类继承；复制成history索引。新报告只继承问题的id、严重程度、描述／修复目标，state重置open、旧evidenceIds清空；原range超出新片长则置range=null、sceneId=null，须由审阅者重新定位，check返回incomplete，不静默裁掉旧问题。新评分、观察全部清空。
- [x] **Step 5 — 写并运行复测失败测试。** `deleted blocker fails retest` 删旧id断言incomplete；`lower severity cannot erase blocker` 将blocking改advisory断言incomplete；`history evidence cannot close current issue` 只引history断言incomplete；`independent current evidence closes issue` 同id、当前证据、resolution及完整新观察后才能passed；`new round clears ratings` 断言新包评分null、观察为空。首次报告resolved/not-reproduced也incomplete。
- [x] **Step 6 — GREEN。** `npm run build && npx tsx --test runtime/test/review-check.test.ts runtime/test/review-pack.test.ts`；预期全部 PASS。
- [x] **Step 7 — Commit。** 暂存本任务文件；`git commit -m "feat(review): enforce scoped evidence and retest gates"`。

### Task 6: CLI 与独立 subagent 交接

**Files:** Modify runtime/src/cli.ts、runtime/src/tools.ts、runtime/test/tools.test.ts、review/pack.ts、references/review.md、references/runtime-usage.md、references/pipeline.md、SKILL.md、README.md；Create references/reviewer-prompt.md、runtime/test/review-cli.test.ts。

**Interfaces:** CLI `review-pack <directory> [--scope visual|audiovisual] [--mp4 <existing-file>] [--previous <report.json>]` 输出 PackResult；`review-check <report.json>` 输出 ReviewResult，当前scope passed退出0、failed退出1、incomplete退出2，JSON始终包括commercialStatus。用当前project contentVersion/runtimeFingerprint执行check，无需启动Vite或prepare。旧命令不加参数仍可运行，但新包默认visual、路径变为唯一子目录；移除未公开的旧validateReview/reviewPack函数，不保留可误放行的旧入口。

- [x] **Step 1 — 写失败CLI测试。** `default pack is visual and unscored` 运行CLI检查新包draft；`check exit codes are scoped` 对三种fixture核对0/1/2及commercialStatus；`unknown scope and missing values fail` 对`--scope foo`、`--mp4`无值退出非0；`check has no browser or preparation side effect` 用无可运行film但可计算摘要的fixture检查，不创建Vite／mix缓存、不启动浏览器；`existing MP4 only` 文件不存在时失败且未创建视频输出。
- [x] **Step 2 — RED。** `npm run build && npx tsx --test runtime/test/review-cli.test.ts`；预期旧CLI不支持参数／新结构而FAIL。

  使用Node spawn收集CLI退出码与stdout后：`assert.equal(exitCode,0); assert.equal(JSON.parse(stdout).commercialStatus,'incomplete')`，只对已完整填写的visual fixture执行这一断言。
- [x] **Step 3 — CLI接线与旧逻辑迁出。** 精确解析已知参数，拒绝重复／未知值；check分支放在startServer之前，区分操作异常与评测结果；tools测试保留capture/analyzeAudio测试，评测迁到新测试文件。pack handoff列出target、能力边界、上下文和证据入口、report填写路径及review-check命令，不写期望分数。
- [x] **Step 4 — 写 reviewer-prompt 并同步规范。** 固定顺序为能力声明→需求/品牌/方向→静态/连续窗口→实际动态观看（能做到才声明）→六维或七维证据评分→问题→复测。给出可定位的问题范例，不提供“默认8分”范例。提示主Agent用干净上下文独立subagent；CLI不自行派发模型。SKILL保持七维商用门槛与默认待审状态，说明可单独进行visual审查；README写当前能力及限制；清除“写true即可完整评测”的暗示。不改动模板agent的新内容。
- [x] **Step 5 — GREEN。** `npm run build && npx tsx --test runtime/test/review-cli.test.ts runtime/test/tools.test.ts`；预期全部PASS。人工逐条对照spec，保证文档不会把scoped exit0说成商用放行。
- [x] **Step 6 — Commit。** 逐文件暂存上述清单；`git commit -m "feat(review): expose scoped review workflow and reviewer handoff"`。

### Task 7: 独立安装与修复闭环验收

**Files:** Modify runtime/test/portability.test.ts、runtime/test/review-cli.test.ts、docs/validation.md；必要的专用测试构造放review-fixtures.ts。不新增模板或产品影片。

**Interfaces:** Consumes全部新CLI、initProject与现有vendor安装链路；不新增生产接口。

- [x] **Step 1 — 增加端到端测试。** `review survives project move and isolated install` 将生成工程移动、只用vendor安装，运行review-pack检查相对证据可读取且无源码仓库路径依赖；`review repair loop` 在测试fixture中生成带已知边界缺陷的包、写有blocking问题的合成报告，修复源文件→新包--previous→确认旧评分不继承／删id不通过／新证据复测能完成范围门槛。断言全流程没有整片MP4文件；另一个existing-MP4测试只用测试临时编码文件，篡改它后check必须incomplete。
- [x] **Step 2 — 运行目标测试。** `npm run build && npx tsx --test --test-concurrency=1 runtime/test/review-cli.test.ts runtime/test/portability.test.ts`；若暴露打包缺文件、绝对路径或版本混用则先记录FAIL。纯验证任务不为制造RED故意破坏实现。

  移动后的工程生成包：`assert.deepEqual(await verifyEvidence(bundle.directory, manifest.files), [])`；修复后draft：`assert.equal(report.scores['动效工艺'].score,null); assert.equal(report.observations.length,0)`。
- [x] **Step 3 — 修复实际失败。** 只修改失败所属模块；对应回归测试必须能复现问题，不借此重构Player、音频或模板。
- [x] **Step 4 — 完整验证。** `npm run build && npm test` 全部必跑用例PASS；原有显式opt-in长片测试可保持skip。若修改renderer／audio／同步逻辑，额外执行`npm run test:long`，否则不宣称重跑。检查git diff确认无模板、style或其他agent文件被暂存。
- [x] **Step 5 — 独立审查工作流演练。** 用干净上下文reviewer按新prompt检查技术fixture，提供真实可用能力；无法连续看动态则保留incomplete，证明工具诚实呈现限制。自动测试中的合成评分不能当作这次审阅结果。用户选择的执行方式若包含最终独立代码审查，也在这里完成并修复实质问题。
- [x] **Step 6 — 更新验收记录。** docs/validation.md记录实际命令、测试数量、视听能力限制、门槛测试与真实审阅的区别；本次完成不改写旧三片商业状态。精选BGM/SFX另列后续工作，产品实战等待模板ready。
- [x] **Step 7 — Commit。** 暂存本任务测试、实际修复及验收文档；`git commit -m "test(review): validate portable evidence and repair workflow"`。不自动push。

## 自检结果与执行交接

- 覆盖：范围／契约→Task1；采样→2；上下文／文件／MP4→3；后台播放→4；门槛／复测→5；独立审阅协议→6；独立安装／闭环→7。
- 类型：各任务均使用本计划同一组Scope/Target/Range/Evidence字段；scopeStatus与commercialStatus不会混成一个passed。
- Review Focus五类均已分配测试；没有将“工具运行成功”用作独立观看或商用证据。
- 刻意不做：听音模型、自动审美打分、BGM/SFX素材包、模板和style制作、新编辑器、整片内部视频导出、自动修复影片内容、自动派发外部模型。
- 已按用户授权开始Native顺序实施，完成记录见docs/validation.md。执行方式为：共享manifest/证据/复测接口依赖紧密，统一实现更容易保持一致，完成后做独立代码审查。
