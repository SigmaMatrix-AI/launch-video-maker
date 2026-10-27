# SaaS Breathing Showcase

31 秒的 SaaS 页面展示参考模板，960×540、30fps、930 帧。采用 React + TypeScript 和本地 launch-video-maker runtime；镜头、标题、背景、星形和声音由同一全局帧驱动。不是完整参考 MP4 的套壳播放器。

## 使用

将本目录复制到 `films/<project-id>/`，在复制后的目录执行：

```sh
npm ci --ignore-scripts
npm run setup
npm run prepare
npm run preview
npm run validate
npm run validate -- --full
```

需要 Node >=24、FFmpeg / ffprobe 和 Playwright Chromium。runtime 快照和依赖锁随模板提供，无需访问原分析工程。`setup` 安装浏览器依赖。源码修改后重启预览。默认不导出 MP4；用户明确要求导出时再使用 `npm run render -- --help` 查看参数。

## 参考与节奏

参考是用户提供的 `preview_540p_crf22_higher_quality (1).mp4`，视频 31 秒，非历史工程后来的 23.4 秒改版。保留原镜头顺序、画面比例、全局时刻和长短不均的停留；不把每段统一改成弹入/淡出。`src/tracks.json` 是 24 个页面实例的实测四角轨迹；`src/motion.ts` 将轨迹转换为透视矩阵。章节只是导航标记，绝不重新计时。

| 时间 / 半开帧区间 | 动作及呼吸 |
| --- | --- |
| 0–5.6s / [0,168) | 小页面快速靠近，标题浮出；展开多页面扇形后留出阅读，再放大退出。 |
| 5.6–7.5s / [168,225) | 功能页接住上一镜速度，短停后进入层叠透视。 |
| 7.5–11.5s / [225,345) | 三层卡片前后错位，缓慢漂移；保持空间关系而非静止定格。 |
| 11.5–14.5s / [345,435) | 页面展开、价值标题出现；标题随画面下沉退出。 |
| 14.5–17.2s / [435,516) | 价格页面展开后停留，转入多页面环绕。 |
| 17.2–19.3s / [516,579) | 多页面环绕中央标题，短促聚合后展开。 |
| 19.3–20.9s / [579,627) | 单页承接，短停后横向推入工作流。 |
| 20.9–24.7s / [627,741) | 页面纵列持续漂移，左侧文案保持阅读窗口。 |
| 24.7–25.9s / [741,777) | 细节页近推，为片尾收拢蓄势。 |
| 25.9–31s / [777,930) | 星形遮罩收拢、旋转、缩小左移，字标逐渐展开；约 28.5 秒后长停到结束。 |

页面实例允许跨章节重叠。不要截断轨迹或在章节边界重置素材时间。默认素材采用帧区间中点取样，避免源 PTS 六位小数舍入造成一帧错位；镜头仍按精确 frame/30 求值。

## 内容接口

编辑 `src/content.json`：

- `copy`：开场、价值标题、副标题、环绕标题、工作流标题、署名和品牌字标。保留原稿仅为参照，不作为新产品事实。
- `screens`：以页面 key 替换所有同名实例；支持本地 image/video。未替换项沿用参考纹理。
- `brandMark`：本地图片路径或 null；null 使用星形，图片在片尾品牌阶段接替星形。
- `palette`：原生文字、胶囊、星形与强调色。背景是单独的实测色场 `src/background.json`，不会随 palette 全局重染；如更换 style，应单独修改背景实现，保留明暗变化时间。

示例：

```json
{"screens":{"heroScreen":{"src":"assets/product/hero.png","kind":"image"},"proofScreen":{"src":"assets/product/proof.mp4","kind":"video","sourceStart":0,"speed":1}},"brandMark":"assets/product/logo.png"}
```

把示例字段合并到现有 content，保留其他字段。视频时间相对每次实例入场起点，超出素材末尾保持末帧。默认按 16:9 填充；非 16:9 素材应先构图或修改容器，避免变形。可用 key：heroScreen、overviewScreen、potentialScreen、integrationScreen、dashboardScreen、assistantScreen、capabilityScreen、featureBack、featureMiddle、featureFront、proofScreen、pricingScreen、detailScreen、useCaseFive、galleryScreen、workflowSide。

替换音乐时修改 `film.tsx` 的 music asset 和 audio 事件；默认参考音频不变速、不重排，增益 0.75（约 -2.5dB）防止解码峰值削波。文案明显变长时先缩写，再检查可读停留；不要为了塞字破坏原节奏。

## 文件与边界

- `film.tsx`：帧入口、章节、资源、音频。
- `src/Headlines.tsx`、`src/Brand.tsx`：可编辑原生标题和品牌动画。
- `src/star-trajectory.ts`：遮罩与品牌共用同一 Bézier 星形，位置、尺寸和展开角度用单调 C1 Hermite 曲线连续衔接，消除26.9秒轮廓硬切和采样抖动。原 `src/star-motion.json` 仅作为参考测量保留，不参与渲染；未复现原始运动模糊。
- `node scripts/check-star.ts`：检查锚点速度连续、尺寸不回弹、旋转不反向、位移无跳变与片尾停住。
- `assets/screens/`：24 段裁短、逆透视后的页面纹理；没有将整片视频作为播放资产。
- `records/source-manifest.json`：来源、摘要、提取范围、资源校验值。

原素材只有 540p；逆透视不能恢复被遮挡或画面外像素，某些页面含遮挡残影、压缩和模糊。此包可复用动作与节奏，原纹理是参考样本；制作正式产品影片时换成清晰、真实的截图/录屏。抽取的低频背景、原生文字字距、早期星形遮罩与原片有近似差异，不宣称像素级复刻。提升输出分辨率不会恢复缺失细节。

来源视频和配乐由用户提供，未附第三方素材再分发/商用授权；不推断授权。字体沿用原项目的 Plus Jakarta Sans 资源，正式分发时一并核对字体许可。技术验证与审美/听感审查分开记录，见 `records/runtime-validation.md`。
