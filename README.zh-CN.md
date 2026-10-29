# Launch Video Maker

[English](README.md) | **简体中文**

**让你的产品，成为一支发布影片。**

面向 Claude Code 和 Codex 的 Agent skill，将官网、截图、录屏和产品介绍转化为可继续编辑的产品视频。先探索三种视觉方向，再确定故事，最后通过实际播放和反馈打磨成片。

[效果展示](#效果展示) · [安装](#安装) · [如何使用](#如何使用) · [工作流程](#工作流程) · [Content](#content)

## 效果展示

由 launch-video-maker 制作 · 非官方概念演示

<!-- 循环 GIF：Photoroom 00:00–00:10；Canva 00:06–00:24；
     TapVid 00:18–00:23；Product Launch Lavender 00:16–00:31。
     点击预览可查看原尺寸 GIF。 -->

<table>
  <tr>
    <td width="50%" align="center">
      <a href="docs/assets/gallery/photoroom-promo.gif"><img src="docs/assets/gallery/photoroom-promo.gif" width="100%" alt="Photoroom — 10 秒产品发布视频"></a>
      <br><strong>Photoroom</strong>
    </td>
    <td width="50%" align="center">
      <a href="docs/assets/gallery/canva-launch.gif"><img src="docs/assets/gallery/canva-launch.gif" width="100%" alt="Canva — 产品发布视频节选，00:06–00:24"></a>
      <br><strong>Canva</strong>
    </td>
  </tr>
  <tr>
    <td width="50%" align="center">
      <a href="docs/assets/gallery/tapvid-launch.gif"><img src="docs/assets/gallery/tapvid-launch.gif" width="100%" alt="TapVid — 产品发布视频节选，00:18–00:23"></a>
      <br><strong>TapVid</strong>
    </td>
    <td width="50%" align="center">
      <a href="docs/assets/gallery/product-launch-lavender.gif"><img src="docs/assets/gallery/product-launch-lavender.gif" width="100%" alt="Product Launch Lavender — 视频节选，00:16–00:31"></a>
      <br><strong>Product Launch Lavender</strong>
    </td>
  </tr>
</table>

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

| 阶段 | Agent 提供什么 | 你决定什么 |
| --- | --- | --- |
| **1. 定调性** | 用同一份代表性内容制作三种不同的效果图，并给出推荐。 | 视觉方向：字体、配色、构图与整体气质。 |
| **2. 定故事** | 故事脚本与简易草稿分镜，讲清内容和顺序。 | 视频讲什么、展示什么，以及按什么顺序展开。 |
| **3. 做质感** | 可播放的影片，持续打磨 UI、镜头衔接、节奏、文字动效和声音。 | 表达是否清晰，实际播放的观感是否符合预期。 |

设计前，Agent 会探索首页首屏之外的产品信息，包括相关页面区块、功能页、演示和真实界面。收集可用素材，并为影片中的产品描述找到事实依据。

第二步的分镜可以保持粗略。精确时序、镜头运动和 UI 精修放在第三步，等内容确定后再展开。功能巡礼、单功能发布和贯穿全片的产品操作过程，都可以成为故事结构。

打磨时，重点关注画面**如何随时间变化**：

- **有呼吸感的运动。** 交替安排迅速的操作、大幅度的揭示和安静的停留，让重要瞬间有时间落定。
- **承担叙事的文字。** 让关键表达独立成镜，通过短句揭示、关键词替换、重点转移，或将文字衔接到它所引出的产品交互中。
- **镜头之间的连续性。** 用同一个对象、形状或动作，将前后画面连接起来。
- **根据实际播放作判断。** 结合上下文检查运动、阅读时间与声音。漂亮的静帧和通过技术检查，都只是评审的一部分。

模板项目遵循各自的适配指南，保留约定的构图、动作和节奏，无需进行自主设计路线中的三种视觉方向探索。

## 技术实现

影片使用 **React 和 TypeScript** 编写，通过 **Playwright** 渲染，由 **FFmpeg** 编码。预览与导出共用场景源码、素材、帧时序和混音。

影片源码、本地素材和制作记录都保留在你的工程中。浏览器播放器支持播放、拖动进度和逐帧查看；命令行工具支持静帧采集、MP4 导出和评审证据收集。

要打开已有影片工程，在工程目录中运行：

```bash
npm run preview -- --open
```

导出并检查当前版本：

```bash
npm run render -- launch.mp4
npm run inspect -- launch.mp4
```

导出不会覆盖已有文件。修改源码或素材后，重启预览以加载新版本。

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
├── examples/motion-language/      # 五组可运行的 Good / Bad 对照
├── templates/                     # 可复用的影片模板
├── styles/                        # 视觉风格参考
├── runtime/                       # 本地视频运行时
│   ├── src/                       # 渲染、媒体、音频与命令行工具
│   ├── web/                       # 浏览器预览播放器
│   └── test/                      # 运行时测试
└── docs/                          # 设计文档、计划与验证记录
```

现有模板：[Product Launch Lavender](templates/product-launch-lavender/template.md)、[Motion Design Promo](templates/motion-design-promo/template.md) 和 [Capsule Flow](templates/capsule-flow/template.md)。视觉风格参考位于 [`styles/`](styles/)。


## 许可证

[Apache-2.0](LICENSE)。

第三方依赖及随附的参考媒体、字体和品牌素材，仍适用各自的许可证与使用限制。具体请查看素材或模板附带的来源和许可说明。
