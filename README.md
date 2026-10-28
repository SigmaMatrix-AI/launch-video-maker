# Launch Video Maker

制作产品宣传视频的 Agent skill。自主设计按三步走：**3 种效果图选调性 → 故事脚本与简易分镜确认内容 → UI、镜头、节奏、动效与声音打磨**。先分开确定方向与故事，再投入整片制作。模板 reference 保留约定编排，不强制套用三方向流程。

运行层采用 **React + TypeScript、统一帧控制、Playwright 与 FFmpeg**，无需 Remotion。预览和导出共用场景源码、资源和预混音频；Player 只负责观看和检查。

## 状态

可运行的开发版 runtime 已提供工程初始化、资源准备、播放/暂停/逐帧/拖动、静帧采集、MP4 编码、页面采集、声音分析与审查证据包。运行时技术验证、风格验证和商业影片验收是不同层级；测试通过不代表影片已达到商用设计标准。

内置参考模板提供可复用的 React 工程；[Motion Design Promo](templates/motion-design-promo/template.md) 提供保留既有 20 秒节奏的动感文字与案例展示模板。[Capsule Flow](templates/capsule-flow/template.md) provides the revised 82-second capsule-to-composer promo with plane transitions and a frosted logo button. 正式 style 从 `styles/` 发现；`runtime/validation/` 和旧 `tests/fixtures/styles/` 只用于开发验证，不参与正式模板选择。用户影片统一放在 `films/`，由 Git 忽略。

## 安装与快速开始

支持目标：macOS Apple Silicon，Node.js 24+、npm、FFmpeg 和 ffprobe（需含 libx264/AAC）。其他平台尚未验收。FFmpeg 是外部系统工具，setup 不自动安装系统软件。

```bash
git clone https://github.com/SigmaMatrix-AI/launch-video-maker.git
cd launch-video-maker
npm ci
npm run build
node runtime/dist/cli.js doctor
npx playwright install chromium
node runtime/dist/cli.js init films/my-film
cd films/my-film
npm ci
npm run setup
npm run prepare
```

`init` 生成项目源码、`brand-kit/`、制作记录，以及 `vendor/` 内的 runtime 包快照和依赖锁文件。工程移动后仍可独立安装和运行，无需原 skill 目录；安装依赖和 Chromium 需要网络。默认把生成工程放进 `films/`，不要放进正式 templates/styles 目录。

生成工程的 `prepare` 同时是 npm 生命周期脚本，普通 `npm ci` / `npm install` 会自动准备媒体。只安装依赖时用 `npm ci --ignore-scripts`，随后显式执行 `npm run prepare`；有媒体的工程需先备好 FFmpeg。

Agent 从 [SKILL.md](SKILL.md) 开始执行。[三阶段流程](references/pipeline.md) 与 [阶段产物](references/stage-deliverables.md) 定义自主创作的边界、确认记录和续作；[模板流程](references/template-conventions.md) 保留参考适配方式；[Good / Bad 标尺](references/eval.md) 提供十条对照和四张参考案例卡；[技术指南](references/tech.md) 提供实现与七维评测协议。

第一步前按 [产品研究](references/product-research.md) 查看官网全貌、相关演示和可拍素材。第三步按 [动态表达](references/motion-language.md) 安排动作轻重、阅读与语义文字；[5 组可运行方法对照](examples/motion-language/README.md) 提供按需复制的局部实现，不作为成片模板或“很贵”的认证。功能巡礼、单功能发布和贯穿案例均可使用；具体验证范围见 [本轮记录](docs/validation/research-motion-language-results.md)。

## 命令与交付行为

在影片工程内通过 `npx lvm` 调用以下命令：

| 命令 | 作用 |
| --- | --- |
| `doctor` / `setup` | 检查环境 / 安装工程依赖和固定版本 Chromium |
| `prepare` | 校验配置、准备媒体、编译共享 48 kHz 立体声混音 |
| `preview` | 后台启动预览，不打开浏览器、不展示地址 |
| `preview --open` | 第三步或模板制作完成后，默认打开本地预览 |
| `still 42 /path/frame.png` | 资源就绪后采集指定帧，不生成 MP4 |
| `render /path/film.mp4` | 显式导出 H264/AAC MP4，拒绝覆盖已有文件 |
| `inspect /path/film.mp4` | 检查实际编码规格和帧数 |
| `capture URL /path/assets [selectors...]` | 2× 页面截图、元素截图、位置和来源 |
| `analyze-audio /path/music.wav` | 波形窗口、峰值、能量与瞬态候选，输出 JSON |
| `review-pack .lvm/review` | 新建唯一证据包：动作／转场帧、混音、播放记录、上下文和未评分报告 |
| `review-check /absolute/bundle/review.json` | 核验版本、文件证据、范围门槛及逐项复测 |
| `clean` | 清理已知解码／Vite缓存；保留评测记录，先停止预览 |

按当前阶段交付：第一步三种效果图，第二步脚本与粗分镜，第三步默认打开已检查的本地预览，附工程和检查状态。用户明确要求导出后才运行 `render`；已有导出授权不重复询问。技术测试可以生成 fixture MP4，不能据此自动导出用户影片。

评测默认visual范围。完整CLI参数与报告填写见 [技术指南](references/tech.md#使用现有评测工具)。`review-check`退出0仅代表当前范围通过；visual范围的完整商用结论始终为未完成。工具不会自动评分或声称已观看／试听。

## 设计原则

- **从产品自身生长。** 两条制作路线都先理解受众、任务、输入与结果，让画面证明价值。
- **阶段内自主判断。** 默认先选方向、再确认故事；用户明确委托代选/代定时记录后继续，不重复请批。局部反馈只改受影响镜头。
- **用好参考。** 模板提供动作与叙事方法，style 提供视觉启发；按产品与用户要求确定采用范围，明确复刻任务保留约定的编排。
- **用案例指导打磨。** 宣传文字默认独立成镜并突出关键词；主体动作、对象承接与可读停留共同消除换页感。第二步不验收动态，第三步用实际播放结果修订；技术通过不等于影片优秀。

影片工程保存自己的素材与依赖。默认交付本地预览与工程，按明确请求导出；不附加编辑器或发布流程。初始化仍生成 brief/direction/storyboard；新建 script 通过现有 reference role 接入审阅，见阶段产物。

## 开发与验证

```bash
npm run build
npm test
LVM_LONG_TEST=1 npx tsx --test runtime/test/long-sync.test.ts
```

默认测试串行运行各文件，避免依赖安装与浏览器验收争抢资源；播放同步对照音频设备输出时钟，允许预览调度窗口内两帧误差。默认测试覆盖真实 Chromium/FFmpeg、随机和逆序帧、缺失资源、音频包络/削波、非零 PTS 变帧率素材、实际 MP4、可移植工程安装和审查门槛。60 秒测试单独启用，验证已知视觉闪帧和音频脉冲的起中尾位置。

本机有用户提供的两个初始 style 包时，可运行 `npx tsx runtime/validation/build-studies.ts /absolute/new/directory` 生成两段新 12 秒验证工程。它不会修复、运行或移植原 demo，也不会输出 MP4。详细状态见 [验收记录](docs/validation.md)。

## 目录

```text
SKILL.md                 两条路线、三阶段边界与按需阅读入口
references/              流程、研究、动态表达、阶段产物、质量与技术参考
examples/motion-language/ 可生成独立工程的节奏与语义文字对照
templates/               可运行参考模板及各自的适配指南
styles/                  独立的正式 style 包
films/                   用户影片与本地实验（Git 忽略）
runtime/src/             可打包运行核心、媒体、音频、服务、CLI
runtime/web/             轻量 Player
runtime/test/            技术测试
runtime/validation/      开发验证片源码，不是参考模板
docs/plans/              开发计划
```

Git 不追踪空目录；clone 后空目录可能不存在，Agent 将其视为暂无内置参考。

## 限制与排错

- 源码或资源变化会使当前预览/采集版本失效。停止服务并重新 `prepare` / `preview`，避免混用旧音频和新画面。
- 视频素材预解码为 PNG，按原始 PTS 取覆盖目标时间的帧。当前预解码整个导入片段；长素材先裁切。缓存上限和清理行为见运行指南。
- 音频速度变化使用重采样，会变调；不提供保调变速、TTS、ASR、配乐生成或音源分离。
- `inspect` 是技术探测，不替代观看成片、听音和独立审美评测。`review-check` 校验人工报告的完整性，不能证实评测者真的看过或听过。
- 字体、图片错误应修复原资源；不要用固定等待时间或静默降级掩盖。执行 `doctor` 检查工具，`clean` 后可重新生成缓存。

## 贡献与许可

提交时说明实际行为变化、可复现验证和剩余限制。参考内容及素材需记录来源和许可；不提交生成缓存或把未经验证的审美结果写成“通过”。

本仓库尚未指定许可证，未提供 `LICENSE`。第三方依赖及引用素材各自的许可仍须遵守；不要据此假设本项目采用 MIT 或 Apache 许可。


- [Product Launch Lavender](templates/product-launch-lavender/template.md)：已定稿 v1.0.0；31 秒淡紫产品发布模板，连续页面、边缘环绕阵列、等轴页面墙与圆形交织花标。
