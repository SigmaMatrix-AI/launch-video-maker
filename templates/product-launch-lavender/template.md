# Product Launch Lavender

**定稿：v1.0.0 · 2026-10-27 · 用户已认可当前本地预览。**

可复用的产品发布视频 React 模板：31 秒，960 × 540，30 fps，共 930 帧。适合有多张网页界面的 SaaS、协作工具、分析工具与工作流产品。示例产品 Forma 为虚构产品，四张网页由 imagegen 生成。原始参考改编版保留在相邻 `saas-breathing-showcase`，本模板独立运行，不读取该目录。

核心是动作的先后关系与呼吸感：页面落定后再展开，单页缩小成为阵列中的一张，其余卡片出现后才旋转；旋转选出的页面与后续页面墙连续承接；最后圆形花瓣收拢、交织花标与品牌长停顿。复用时优先保留这些关系。

## 定稿编排

时间以秒为单位；动作可以跨越 film.tsx 中用于索引的场景边界，不能按场景标签硬切。

| 区间 | 内容与运动 | 实现入口 |
| --- | --- | --- |
| 0–5.55 | Product Launch Video 标题与多页面开场，错位展开、停留 | film.tsx、src/tracks.json、src/Headlines.tsx |
| 5.55–7.1 | 分析页入场并落定，形成阅读停留 | src/ContinuousShowcase.tsx、src/ShowcaseMotion.ts |
| 7.1–10.8 | 同一分析页倾斜至前层，另两页随后展开，三层缓慢漂移 | 同上 |
| 10.8–14 | 三层收拢至价值展示页，标题与副标题承接 | 同上、src/Headlines.tsx |
| 14–16.05 | 工作台溶入并保持 16:9 阅读构图 | 同上 |
| 16.05–17.25 | 工作台缩小并移到环绕阵列中的种子位置 | src/ShowcaseMotion.ts |
| 17.25–18.9 | 其余卡片先出现，17.85 秒起一起旋转；中央两行 Create. Connect. / Launch. | src/ContinuousShowcase.tsx、src/Headlines.tsx |
| 18.9–21.4 | 选中首页展开；20.35 秒起倾斜缩小并溶入页面墙 | src/ShowcaseMotion.ts、src/IsometricWall.tsx |
| 20.35–24.95 | 倾斜多列页面墙持续滚动，左侧展示产品 slogan；24.65 秒起与细节页重叠 | src/IsometricWall.tsx、src/Headlines.tsx |
| 24.7–25.8 | 细节页短暂停留，准备品牌收尾 | film.tsx、src/tracks.json |
| 25.8–31 | 圆形花瓣遮罩收拢，转成六组交织圆弧花标，品牌字标出现并停留 | src/star-trajectory.ts、src/Brand.tsx |

环绕阵列定稿参数：中心 (480,270)，横/纵半径 **380/215 px**，卡片宽 **250 px**，17.85–18.9 秒旋转 **1.15 rad（约66°）**。边缘少量出框是当前认可的构图。种子页入场、阵列旋转和选中页退出共享 `orbitPose`，修改时不得各写一套不一致的坐标。

## 首批素材与替换映射

准备四张清晰的 16:9 本地网页截图，建议至少 1600 × 900。画面中的小字用于表现界面质感，关键卖点由原生标题承担。连续展示段最大卡片宽 800 px；前后旧轨迹段仍使用 960 × 540 的素材画布，应提供相同比例素材以免拉伸。

| 本地示例 | 产品证据用途 | src/content.json 的 screens 键 |
| --- | --- | --- |
| assets/mock/hero.png | 首页或核心价值总览 | heroScreen、potentialScreen、featureMiddle、galleryScreen |
| assets/mock/dashboard.png | 主工作台、操作全貌 | overviewScreen、dashboardScreen、featureBack、pricingScreen |
| assets/mock/analytics.png | 结果、效果或数据分析 | capabilityScreen、featureFront、proofScreen、useCaseFive |
| assets/mock/workflow.png | 工作流或关键功能细节 | integrationScreen、assistantScreen、detailScreen、workflowSide |

保留全部 16 个映射键，可复用四张图片，也可按产品拆成更多截图。键名是历史接口，例如 pricingScreen 不要求一定展示价格。部分连续镜头直接使用 proofScreen、dashboardScreen、heroScreen、detailScreen、overviewScreen；只改 featureFront 等历史槽位不会改变这些镜头。

当前连续卡片及页面墙使用 AssetImage，**本定稿的复用接口按静态图片处理**，所有 screens.kind 保持 image。不得仅将其改成 video 就宣称整片支持录屏；如需录屏，应同步实现这些组件的视频取帧并重新验证。

## 换产品步骤

1. 将本目录复制到仓库 `films/<project-id>/`，排除 node_modules、.lvm、exports 和 .git。后续作品在副本修改，不回写定稿模板。
2. 将确认过的真实页面放入副本 assets/，在 `src/content.json` 更新对应 screens.src，使用工程内相对路径。四张 Forma mock 中的文字、数字、人物均为示例，不能当作新产品证据。
3. 修改 copy：promoTitle 为开场定位，valueTitle/valueSubtitle 为价值主张，breadthTitle 为中央两行短语，workflowTitle 为左侧 slogan，brandName 为片尾品牌名。当前 slogan 是 “Make room for your next big idea.”。保留短句和显式换行；中文或更长品牌名须检查遮挡、字重和片尾居中。
4. 可将 brandMark 从 null 改为本地透明图片路径，替代最终交织花标。花瓣收拢路径仍保留。替换标志或字标后检查 27.1–31 秒的尺寸与组合居中。
5. palette 管理原生文字、舞台和标志的颜色入口。`src/Background.tsx` 的连续渐变也需按需检查；更换 palette 不等于自动替换全部色场。保留真实界面内容与状态色，不对截图全局染色。
6. 音乐在 film.tsx 的 music 资源及 audio 时间线中配置。当前为参考音频前 31 秒、gain 0.75，不变速、不重排；换音轨时同步核对裁切、增益与落点。
7. 保留“缩小成一张 → 其余出现 → 再旋转”和页面墙溶入关系。需要调整画幅、节奏或镜头时，同时修改运动坐标、文字区、花瓣遮罩及音频锚点，并记录适配原因。

## 安装、检查与预览

复制后的工程内执行：

```sh
npm ci --ignore-scripts
npm run setup
npm run preview
```

要求 Node >=24、FFmpeg/ffprobe、Playwright Chromium；runtime 快照、package-lock 和本地素材随模板提供。所有画面由统一帧驱动，可任意 seek；不使用 Remotion。修改源码、素材或工程文档后需重启预览，避免 runtime 内容版本不一致。

原模板回归检查：

```sh
node scripts/check-showcase.mjs
node scripts/check-star.ts
npm run validate -- --full
```

`validate.mjs` 除运行、比例、音频与重复取帧外，会将 777–929 帧与 `records/runtime-full.json` 的原认可 CTA 做哈希比较。**这是原模板保护检查，不是任意新品牌的通用视觉基线。** 副本若改了片尾、配色或音频，必须先调整副本中的对应基线/源音频断言，再在人工复核后建立该产品自己的基线；不要覆盖本模板基线或将预期差异误报为运行故障。

重点复核 6.5–8.5、14–19.7、20.35–21.4、24.65–27.6 秒：无比例拉伸、无卡片替换跳变、无文字遮挡、无断续转场。页面墙倾角、速度与间距在 src/IsometricWall.tsx；花瓣轨迹保留兼容文件名 src/star-trajectory.ts。

## 定稿与验证记录

- `records/final-release.json`：用户定稿状态、版本及证据索引。
- `records/tested-source-hashes.json`：当前源码与主要素材指纹。
- `records/runtime-continuity-fix.json`：连续镜头修订后的 930 帧技术验证。
- `records/runtime-orbit-spacing.json`：最终环绕幅度调整后的 88 帧验证、10 次逆序/重复取帧、音频与 Player 检查。
- `records/runtime-full.json`：保留的认可 CTA 基线，不覆盖。

本版已获用户预览认可，局部运动连续性测试及独立静帧/源码复核通过。全帧记录先于最后一次轨道参数调整，最终参数经过上述 88 帧复测；不将静帧审阅等同独立连续视听验收。不自动生成 MP4，明确要求导出后再检查实际成片。

## 来源与使用范围

该版基于用户提供的 SaaS 参考视频进行授权改编，31 秒参考音频保留作示例，未附独立商用许可。正式发布时应使用有权使用的音轨、字体、Logo 和真实产品素材。Forma mock 是生成的演示内容；来源与技术记录保留在 records/。淡紫氛围、等轴页面墙、交织花标和本次扩大环绕构图均属于当前用户认可的改版，不宣称与原参考逐像素一致。
