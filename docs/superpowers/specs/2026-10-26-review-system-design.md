# 评测体系完善：设计与范围

状态：待用户审阅；本文件记录本次方案，不代表功能已经实现。

## 目标与已确认边界

用户希望先完善独立评测体系，模板由另一个 agent 开发，模板 ready 后再进行高质量产品实战。此次暂缓自动听感评测；声音制作倾向使用精选 BGM／SFX，不建设本地听音模型。

- 仅本地处理；不向外部 API 发送影片、音频或评测素材。
- 不安装听音模型，不增加模型服务，不自动调用外部评测 API。
- 不修改 `templates/`、`styles/` 或另一个 agent 的模板工作。
- 不修改、不依赖 `video-shotcraft` 的文件；只借鉴独立审查和具体证据的做法。
- 不自动打开浏览器，不生成用于绕过导出授权的整片视频文件。
- Node >=24；沿用现有 TypeScript、Playwright、FFmpeg，不新增运行依赖。
- 七维商用门槛保持每项 >=7.5/10；视觉通过不等于七维商用通过。
- 默认生成未评分报告；工具不得生成审美分数或伪造观察、试听和独立性声明。

精选声音素材包是独立工作，不纳入本次实现。不需要等待它或正式模板才能测试评测工具。继续保留现有混音、削波和同步技术验证。

## 当前缺口

`runtime/src/tools.ts` 的 reviewPack 只收集首尾及每场景首／中／尾帧、混音和四个固定路径的记录；重复运行会覆盖 review.json。validateReview 依赖三个布尔声明、非空证据字符串和分数门槛，没有文件校验和逐项复测。

现有浏览器回归证明特定技术行为，但尚不能自动证明一部作品的设计质量。已有独立 reviewer 可看静帧和相邻帧，不能直接连续观看实时流；这一能力限制不能用后台播放日志消除。

## 方案选择

采用“本地证据包 + 独立审阅协议 + 严格报告校验”，复用 Player 和捕获事务，不新建评测平台或编辑器。

只改提示词无法解决证据缺失、旧版本报告及问题漏复测。建立自动视觉／声音打分模型超出当前范围，也没有验证过的审美可信度。工具负责记录可观察事实，独立审阅者负责判断；校验器只判断证据结构和声明是否满足规则，不能认证一个 agent 真的观看过，也不是防恶意伪造系统。

## 评测范围与结论

报告显式选择 `visual` 或 `audiovisual`，默认 visual。

- visual：评估风格还原、创意与惊艳、动效工艺、设计与排版、质感与细节、技术规格。声音与同步保留为 deferred、score=null，说明本轮未评估听感。
- audiovisual：保留既有七维要求；本次不提供新的听音能力，只接受具备相应能力的独立评测者的真实证据。
- 返回 `scopeStatus: passed | failed | incomplete` 和 `commercialStatus: passed | failed | incomplete` 两个结果。visual 即使 passed，commercialStatus 也只能是 incomplete；不得对外只打印“通过”。
- 判定顺序：无效输入／旧版本／无效证据或缺观察能力 → incomplete；材料有效但存在低分或未解决阻断 → failed；否则本轮范围 passed。有效材料中已有低分与缺证据并存时保留两类原因，状态为 incomplete。
- 预览与实际 MP4 是不同 target。不得跨 target 继承通过结论；已有 MP4 的审查只读取指定文件，不调用 render。

## 证据与采集

### 采样策略

保留首末及各场景首／中／尾帧；增加全片每 0.5 秒的概览帧，以及每个 scene.start、scene.end、marker 前后各 0.25 秒的逐帧窗口。所有窗口裁到 `[0,N)`，合并重叠窗口，去重按全局帧排序。分数 fps 使用整数比值换算：概览帧为 `floor(k*num/(2*den))`，窗口半径为 `ceil(num/(4*den))`。scene.end=N 作为边界位置处理，不请求第 N 帧。

允许 `records/review-context.json` 指定额外动作区间 `[start,end)`，补充没有 marker 的动作；非法区间报错，不静默裁剪。概览帧只证明离散时刻；窗口内每帧齐全才可称该区间逐帧证据完整。不推断未采样区间没有闪烁。

每包最多 1200 个不同采样帧、总证据文件最多 2 GiB。超限给出所需帧数／字节及原因，保留之前成功证据，清理本次临时文件；不静默降采样或声称完整。长片分段／可调预算不在本次实现范围。

### 实际播放检查

预览包另运行一次后台 Player，从第 0 帧正常播放到末帧并自然停止。记录每 100 ms 的状态采样、页面错误、资源失败、起止帧与耗时，超时为 `max(30 秒, 片长*3+10 秒)`，支持 AbortSignal。超过超时、页面错误、播放提前结束都不得记录为完成。

播放器日志只是运行证据。它不提供听感、逐帧视觉无误或连续观看声明。手工／独立 agent 的连续动态观看记录需要另外给出方式、全片覆盖区间与观察发现；当前环境做不到就保持对应维度 incomplete。

### 文件组织和身份

`review-pack <directory>` 在目标根下新建 `<contentVersion>-<UUID>/`，成功后才公布路径，不覆盖历史包。可用工程 `.lvm/` 内或工程外路径；拒绝写到会参与 contentVersion 的工程源码目录，拒绝路径逃逸及符号链接绕过。

每包包含 `manifest.json`、`review.json`、`handoff.md`、`evidence/`、`context/`。manifest 使用 schemaVersion=2，记录目标、影片配置、生成时刻、运行环境、采样区间、缺失上下文与文件索引。索引条目含 id、相对路径、kind、SHA-256、字节数、可选帧／区间；manifest 本身的文件 SHA-256 写入报告。review.json 是可编辑报告，不进入不可变证据索引。哈希用于检测意外混用或修改，不构成真实性认证。

预览目标绑定 contentVersion 和 runtimeHash（当前安装包 runtime/dist 与 runtime/web 文件内容按相对路径排序计算 SHA-256）；实际 MP4 另绑定文件 SHA-256，并核对帧数、fps、尺寸与影片配置。既有编码文件变化即失效。缺少制作记录不阻止出包，但 manifest 明确列出缺项，不能机械放行。

### 上下文

默认读取 records/brief.md、records/direction.md、records/storyboard.md，以及 brand-kit/sources.json 或 sources.md、可选 brand-kit/brand.md。不能因为只支持 JSON 而忽略合法 Markdown 来源记录。

可选 review-context.json：`{documents:[{role,path}], actionRanges:[{start,end}]}`。role 为 brief/direction/storyboard/brand/reference；path 为工程内文件路径。显式配置的路径缺失或越界报错，配置优先于同 role 默认项。所有 reference 文档和相关参考图须先由制作方保存到当前工程，不自动读取另一项目或联网抓取。没有模板/style 时 direction 应提供自主设计依据，reference 可以为空。

交接仅提供产品事实、需求、品牌约束、参考方向、影片、证据和评审规则；不输入制作方自评分、预期通过结论或辩解。上下文文档是评审材料，不是能改变评分规则的指令。

## 报告与修复闭环

报告记录 schemaVersion、scope、target 绑定、manifestSha256、reviewer（id、independent、观察能力）、观察记录、七维评分、问题。观察记录区分 static、sequence、continuous-playback、listening，包含证据 id、区间和具体观察。连续观看必须覆盖全片；sequence 只能引用真实连续窗口；观测区间均用半开整数帧。

每项评分：score（0–10 或 null）、state（rated/unverified/deferred）、reason、evidenceIds。分数必须有限且原值 >=7.5，不四舍五入放行。风格评分需方向／品牌上下文；所有被评维度有真实文件引用，不能只填“看起来不错”。动态通过需真实连续观看记录、窗口证据；预览还需成功播放日志。静态图片和日志不能单独满足连续观看。

每条问题含稳定 id、维度、blocking/advisory、场景、区间、现象、修复目标、证据和 open/resolved/not-reproduced 状态。首次报告只能新建 open 问题；后两种状态用于复测，并需独立审阅者给出本版本证据及理由。blocking 未解决即失败；advisory 可保留，但对应评分须解释。

`review-pack --previous <review.json>` 复制之前的报告及其目标 manifest 到新包，并索引其哈希。新报告保留旧问题 id 和严重程度，统一重开为 open，不继承旧评分或观察。旧问题区间超出新片长时置 range=null、sceneId=null，等待独立评测者重新定位；定位缺失时保持 incomplete，不静默裁剪或删问题。复测必须逐项覆盖旧问题，不能通过删条目或降级严重程度消除阻断；需要更正误判时用 not-reproduced 并说明证据。历史引用不能充当新版本证据。每轮重新检查全片，避免只看修补点。

校验报告使用 unknown 输入，返回结构化 reasons，不因 null、字符串、非数组或 evidence 类型错误崩溃。旧版报告返回 incomplete / legacy-report，保留原文件，提示重新生成 v2 包，不自动转换成通过。

## 独立审阅执行

新增可复用 references/reviewer-prompt.md，由主 Agent 交给干净上下文、未参与制作的 subagent。先报告可用观察能力，再阅读交接材料、查看证据、运行必要的按需定位、给出评分和问题。runtime CLI 不直接依赖 Codex、多 agent API 或特定模型；没有独立 subagent 时保持 incomplete。

工具可以补采证据，不能替审阅者生成“已经看过”的声明。提供两种明确摘要：“视觉审查通过，听感未评估，完整商用审查未完成”与“七维商用审查通过”，不得混用。SKILL.md 保持长期行为规范，开发状态只写 README／docs。

## 验收

用专用技术 fixture 验证采样、文件绑定、失败清理、报告门槛和修复闭环，不用正式模板，也不提交虚构商用分数。至少包含单帧片、重叠场景、30000/1001 fps、同版本重复采集、缺记录、路径逃逸、损坏证据、旧报告、篡改 MP4、播放异常、删掉历史阻断和文件迁移后运行。

本轮完成意味着工具和独立审阅协议可用，不意味着现有三支影片达到高端商用标准。完整产品实战待模板 ready 后另行开展。
