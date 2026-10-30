<p align="center">
  <strong>简体中文</strong> | <a href="README.md">English</a>
</p>

<h1 align="center">Launch Video Maker</h1>

<hr>

<p align="center"><strong>一句话，为你的产品创建发布视频</strong></p>

<p align="center">
  面向 Claude Code 和 Codex 的 Agent skill，将官网、截图、录屏和产品介绍转化为可继续编辑的产品视频。先探索三种视觉方向，再确定故事，最后通过实际播放和反馈打磨成片。
</p>

<p align="center">
  <a href="#效果展示">效果展示</a> · <a href="#安装">安装</a> · <a href="#如何使用">如何使用</a> · <a href="#工作流程">工作流程</a> · <a href="#content">Content</a>
</p>

## 效果展示

由 launch-video-maker 制作 · 非官方概念演示

<!-- 循环 GIF：Photoroom 00:00–00:10；Canva 00:06–00:24；
     TapVid 00:18–00:23；Product Launch Lavender 00:16–00:31。
     轻量预览：400×225，15 fps。
     点击预览可单独查看 GIF。 -->

<p align="center">
  <a href="assets/gallery/photoroom-promo.gif"><img src="assets/gallery/photoroom-promo.gif" width="49%" alt="Photoroom — 10 秒产品发布视频"></a>
  <a href="assets/gallery/canva-launch.gif"><img src="assets/gallery/canva-launch.gif" width="49%" alt="Canva — 产品发布视频节选，00:06–00:24"></a>
</p>

<p align="center">
  <a href="assets/gallery/tapvid-launch.gif"><img src="assets/gallery/tapvid-launch.gif" width="49%" alt="TapVid — 产品发布视频节选，00:18–00:23"></a>
  <a href="assets/gallery/product-launch-lavender.gif"><img src="assets/gallery/product-launch-lavender.gif" width="49%" alt="Product Launch Lavender — 视频节选，00:16–00:31"></a>
</p>

## 安装

专为 Claude Code 和 Codex 构建与调优。最简单的方式，是直接把链接交给 Agent：

```text
帮我安装这个 skill：https://github.com/SigmaMatrix-AI/launch-video-maker
检查我的运行环境，安装所需工具和依赖，并确认 skill 已可正常使用。
```

Agent 会完成配置，并引导你处理需要你参与的步骤。

## 如何使用

```text
使用 launch-video-maker，为 https://your-product.com 制作 product launch 视频。
```

## 工作流程

先确定方向和故事，再把时间与 token 投入细致的动画制作。

1. **定调性。** 用同一份代表性内容制作三种不同的效果图，并给出推荐。你选择字体、配色、构图与整体气质。
2. **定故事。** 提供故事脚本与简易草稿分镜。你确认视频讲什么、展示什么，以及按什么顺序展开。
3. **做质感。** 制作可播放的影片，持续打磨 UI、镜头衔接、节奏、文字动效和声音，结合你的反馈完善成片。

## 技术实现

影片使用 **React 和 TypeScript** 编写，通过 **Playwright** 渲染，由 **FFmpeg** 编码。预览与导出共用场景源码、素材、帧时序和混音。

影片源码、本地素材和制作记录都保留在你的工程中。浏览器播放器支持播放、拖动进度和逐帧查看；命令行工具支持静帧采集、MP4 导出和评审证据收集。

## Content

```text
launch-video-maker/
├── SKILL.md                       # Agent 指令与制作路线
├── references/                    # 制作指南
│   ├── pipeline.md                # 三阶段制作流程
│   ├── stage-deliverables.md      # 阶段产物、确认与续作
│   ├── product-research.md        # 官网探索与产品依据
│   ├── motion-language.md         # 节奏与文字动效
│   ├── eval.md                    # 视觉案例与 Good / Bad 标尺
│   ├── tech.md                    # 渲染、媒体、音频与评审工具
│   ├── runtime-setup.md           # 供 Agent 和开发者查阅的安装说明
│   └── template-conventions.md    # 模板适配约定
├── assets/                        # 文档图片
│   ├── gallery/                   # 演示 GIF 预览与来源记录
│   ├── motion/                    # 动效序列与抽帧记录
│   ├── references/                # 构图参考与分镜图
│   └── tapvid-cta.svg              # README CTA 横幅
├── examples/motion-language/      # 五组可运行的 Good / Bad 对照
├── templates/                     # 可复用的影片模板
├── styles/                        # 视觉风格参考
├── runtime/                       # 本地视频运行时
│   ├── src/                       # 渲染、媒体、音频与命令行工具
│   ├── web/                       # 浏览器预览播放器
│   └── test/                      # 运行时测试
└── docs/                          # 验证指南与字体许可证元数据
```

现有模板：[Product Launch Lavender](templates/product-launch-lavender/template.md)、[Motion Design Promo](templates/motion-design-promo/template.md) 和 [Capsule Flow](templates/capsule-flow/template.md)。视觉风格参考位于 [`styles/`](styles/)。

<p align="center">
  <a href="https://tapvid.ai?utm_source=launch-video-skill"><img src="assets/tapvid-cta.svg" width="720" alt="Explore more video creation features at TapVid."></a>
</p>

## 许可证

本项目原创代码和文档采用 [Apache-2.0](LICENSE) 协议。

第三方软件、字体、演示素材、音乐及品牌素材仍适用各自的授权条款。来源、随附字体许可证和待确认授权详见 [第三方素材声明](THIRD_PARTY_NOTICES.md)。收录在本仓库中不代表这些素材采用 Apache 协议，也不代表可以自由再分发。
