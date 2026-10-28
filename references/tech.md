# 实现与质量保证

按当前任务查阅对应部分。使用现有 React + TypeScript、统一帧控制、Playwright 与 FFmpeg；安装方式见 [README](../README.md)，精确接口见 [core.ts](../runtime/src/core.ts)、[react.tsx](../runtime/src/react.tsx) 与 [CLI](../runtime/src/cli.ts)。

## seek(t)：任意时间得到同一画面

`seek(t)` 表示时间驱动画面的约定，t 的单位为秒；它不是当前 runtime 新增的函数。现有入口是 React `Frame({frame})`，使用 `secondsAt(film, frame)` 换算时间。预览和导出共用这套计算、素材及音频时间线。

画面是当前时间、输入、配置与固定种子的函数。跳到某帧、倒退到它、从头播放到它，结果相同。动画不依赖累计状态、墙钟、未播种随机、CSS 自主动画或定时器。场景用半开帧区间 `[start,end)`，局部帧为 `frame - start`，重叠转场显式安排图层与时长。

```tsx
import React from 'react';
import {defineFilm, secondsAt, interpolate} from '@launch-video-maker/runtime';
import {AssetImage} from '@launch-video-maker/runtime/react';

export const film = defineFilm({
  width: 1920, height: 1080, fps: {num: 30, den: 1},
  durationInFrames: 300, seed: 1,
  scenes: [{id: 'hero', start: 0, end: 300}],
  assets: [{id: 'logo', kind: 'image', src: 'brand-kit/logo.png'}],
  audio: [], markers: {reveal: 30}
});
export default function Frame({frame}: {frame: number}) {
  const t = secondsAt(film, frame);
  return <AssetImage asset="logo" style={{opacity: interpolate(t, [0, .3], [0, 1])}} />;
}
```

## 弹簧、弹窗与连续变形

用闭式弹簧按时间求值，随机取帧也能重现同一动作。下面是欠阻尼、初始静止的单位阶跃示例；`omega` 决定响应速度，`zeta` 决定阻尼，适用范围 `0 < zeta < 1`。接近 1 的阻尼适合轻微过冲，参数按实际画面调整。

```js
function spring(t, omega = 18, zeta = .82) {
  if (t <= 0) return 0;
  const wd = omega * Math.sqrt(1 - zeta * zeta);
  return 1 - Math.exp(-zeta * omega * t) *
    (Math.cos(wd * t) + zeta * omega / wd * Math.sin(wd * t));
}
// 伪代码：全部值从当前 t 计算，不逐帧累计。
const p = spring(t - openAt);
scale = lerp(.94, 1, p);
y = lerp(12, 0, p);
opacity = clamp((t - openAt) / .12, 0, 1);
```

弹窗从触发位置或按钮中心展开，设置相应 `transform-origin`；遮罩、容器、文字分别编排。容器先形成可读空间，文字稍后进入；关闭时文字先退，容器再收回。短模糊可用于内容交接，落定文字保持清晰；检查中间帧，避免旧新文字重叠。

滑块或胶囊可让前后边缘使用不同时间偏移，产生拉伸与追赶。拖拽阶段由光标位置直接决定物体位置；释放时从释放位置与速度继续响应，避免突然跳回预设起点。不要把上面初速为零的阶跃式直接用于有速度的释放：保存可由时间推导的释放状态，再求带初始位移与速度的弹簧响应。

跨场景变形时延续主体的几何与运动方向，内容独立进退。所有插值都明确开始时刻和落定时刻；需要在某个重音附近落定时，提前起动，观看并校准，不能把起动点当落点。

## 3D 镜头与清晰度

先组织空间，再安排相机：主体在哪里，背景和辅助层离它多远，移动后揭示什么。小幅透视与分层视差即可建立深度；信息密集的文字在阅读时回到清晰、稳定的角度。屏幕特写按最终放大尺寸准备素材。

```text
# 概念伪代码，矩阵与插值由项目实现
subject = modelTransform(t)
cameraPosition = orbit(target, radius(t), yaw(t), pitch(t))
view = inverse(lookAt(cameraPosition, target, up))
clipPosition = projection * view * subject * localPosition
```

CSS 3D 可用父层 perspective、相机包装层与 preserve-3d；真正的相机变换使用视图逆矩阵。光标、文字、遮罩和截图切片共用空间变换，避免移动时漂浮或错位。检查裁切、z 层级、背面和透视接缝。跨镜头让接力对象的位置、比例及速度自然承接；循环片另外检查首尾位置与速度。

文字发糊先查字体就绪、源图像素、缩放与栅格化。大幅缩放的文本层谨慎使用 `will-change`，以实际捕获帧确认清晰度。模糊和景深服务注意力，不能修复低清素材。

## 素材与取帧

资产 `src` 相对工程根，支持 image/font/audio/video；字体提供 `family`。保存来源和使用依据，素材留在工程内。截图前等待明确页面状态、字体与图片就绪；分层时准备干净底板并统一裁切坐标，避免背景残留第二份元素。

图片使用 `AssetImage` 或等待解码的 img。Canvas/异步绘图用 `useFrameTask(async signal => …)`，取消后不提交旧结果。视频用 `VideoFrame` 显式传源时间（秒），裁切与变速由工程时间映射；VFR 按源时间戳取帧，越界选择 error/hold/loop。当前视频预解码有 2 GiB 上限，长素材先裁短；动态 GIF 等先转为确定性视频素材。

`capture` 可采页面与元素；当前默认 1440×900 CSS 视口、2×像素，元素 bounds 为视口坐标。全页运镜需结合滚动偏移、截图倍率与裁切原点换算。复杂状态可通过 `capturePage` 的准备回调操作，不能假定截图自动证明完整交互。

## 配乐与音效

选曲先听情绪与结构：铺垫如何积累，高潮落在哪里，结尾能否完整收住。把音乐放进画面试听；BPM 和波形峰值只是线索，`analyze-audio` 的瞬态候选不等于乐拍。用户要求无声时保持音频为空，检查内嵌媒体没有意外出声。

主要动作与音乐的重音、段落相互呼应。SFX 贴近动作质感，按压、拖动、揭示、落定各有轻重；连发时变化音色、间隔或响度，避免机械复读。声音文件的攻击峰可能晚于开头，应让可听重音对齐视觉接触或落点。给旁白与关键反馈留空间，保留尾音和结尾收束。

当前音频事件必填 `id,asset,start,end`；起止为工程帧，可用 `{scene:'hero',offset:12}` 或 `{marker:'reveal',offset:0}`。`sourceStart/sourceEnd` 用秒，`gain` 为线性增益，`fadeIn/fadeOut` 与 `envelope:[[localFrame,gain],…]` 用事件内工程帧。`speed` 变速会变调；不足长度显式 `shortage:'silence'`，或选定合适片段。`loop:true` 是硬边界循环，需要无缝音源。尾音超出 end 会裁掉。

音源统一混为 48 kHz 立体声 `mix.wav`，供 Player 与 AAC 编码共用；削波会拒绝准备，不自动归一化。音源、包络或时序变化后重新 prepare。画面时长改变时更新 scene/marker，再复查受影响声音与全片音乐结构。

## 预览与 render

运行前核实 Node.js 24+、FFmpeg/ffprobe、Chromium 与 runtime；安装和初始化见 README。以下命令在影片工程运行，缺失工具如实说明，不把制作任务扩展为新建渲染引擎。

```bash
npx lvm doctor
npx lvm prepare
npx lvm preview                  # 内部检查，输出实际 URL
npx lvm still 42 /absolute/frame.png
npx lvm preview --open           # 第三步默认交付本地预览；模板同样适用
npx lvm render /absolute/film.mp4 # 用户明确要求导出后
npx lvm inspect /absolute/film.mp4
```

源码与资源变化后重新 prepare 并重启旧服务。交付预览时读取本次实际 URL，验证 ready、播放/seek 与无资源错误，保持服务运行并给出 Markdown 链接。服务只绑定 127.0.0.1；远程环境需要经验证的可访问转发地址，不能交付远程 localhost 冒充用户可用链接。

当前 renderer 用 Playwright 驱动同一入口，逐帧捕获，再由 FFmpeg 编码 H.264/AAC。取帧使用 `window.__LVM__` 的 acquire → screenshot → release 串行事务，核对 frame/version/requestId，并等待 React、字体、图片和目标视频帧真正就绪。固定 sleep 或只收到 video seeked 都不足以确认画面正确。并发捕获使用隔离实例。

导出恰好 `durationInFrames` 帧，首帧为 0，末帧为 N−1；记录尺寸、fps、编码与音频规格。默认交付工程，内部检查不自动导出整片。明确导出请求无需再次索取授权。`render` 拒绝覆盖已有文件，使用新输出路径。

## 质量保证

画面与动作先用 [eval.md](eval.md) 的 E01–E10 Good / Bad 案例诊断；本页保留实现、七维评分与证据协议。自主设计在第三步执行完整动态/视听验收，第二步只确认故事，不以本节作为故事确认的前置条件。

交付前由未参与制作的独立审阅者检查当前版本，提供用户要求、产品依据、方向、已确认故事、制作分镜与可观看产物，不提供期望得分。使用以下七项，具体举出画面或声音证据：

| 维度 | 判断依据 |
| --- | --- |
| 风格还原 | 视觉选择一致，服务产品气质，符合明确品牌与参考要求 |
| 创意与惊艳 | 产品价值通过具体变化被看见，有属于该产品的记忆点 |
| 动效工艺 | 动作有因果、重量与收势，微交互精确，镜头和转场自然接力 |
| 设计与排版 | 注意力明确，构图有主次，文字在实际播放尺寸与停留内可读 |
| 质感与细节 | 字形、边缘、材质、遮罩、光影与放大清晰度经得起查看 |
| 声音与同步 | 音乐有推进与收束，SFX 增强动作，混音层次清晰且同步 |
| 技术规格 | 资源完整，任意帧可复现，播放、尺寸、帧率和实际输出符合要求 |

模板任务按 SKILL.md 和用户要求确定的采用范围检查，需保留编排的段落逐段对齐原片。自主路线的三方向确认与 E10 默认构图不强加给模板。事实错误、必展示项缺失、敏感信息曝光、关键文字不可读、资源缺失、播放故障和明显音画错位优先修复，不能用画面或分数抵消。

当前工具保留七项各 ≥7.5/10 的门槛；分数是审阅记录，不能自行证明品质。无法观看或听音时标记未验证，不能由源码、播放日志或波形推断已观看/试听。实际 MP4 还需完整播放，核对首末帧、压缩画质、音轨以及起中尾同步；预览检查不能替代它。

### 使用现有评测工具

`npx lvm review-pack .lvm/review` 创建唯一版本证据包，默认 visual；完整视听用 `--scope audiovisual`，已有成片用 `--mp4 /absolute/film.mp4`，复测用 `--previous /absolute/old/review.json`。不会自动导出或评分。

默认收集 `records/{brief,direction,storyboard}.md` 和 brand-kit 来源。自主路线新建的故事脚本不会自动收集：在文件实际存在后，将 `{"role":"reference","path":"records/script.md"}` 合并到 `records/review-context.json` 的 `documents`，保留其他条目和原 `actionRanges`。完整示例与老工程兼容方式见 [阶段产物](stage-deliverables.md#接入现有审阅)。

自定义文件或动作区间也使用该配置，例如 `{"documents":[{"role":"direction","path":"records/concept.md"}],"actionRanges":[{"start":30,"end":45}]}`。路径须在工程内；每包最多 1200 帧、2 GiB。没有 script 的老工程继续用现有 brief/storyboard，不能补造历史确认。

审阅者读取 handoff、manifest 和空白 review.json，声明真实观察能力；按 sampling 检查概览及连续窗口，填写 sequence 观察（覆盖所读窗口的每帧 evidenceId）、覆盖全片的 continuous-playback，视听范围另填 listening。给每项分数和问题引用本轮 evidenceIds、全局半开帧区间、可观察现象及修复目标。只填写 review.json，不改 manifest 或证据。修复后重新出包，保留旧问题 ID 与严重程度，凭新证据填写解决状态和 resolution，不继承旧评分。

执行 `npx lvm review-check /absolute/bundle/review.json`：退出 0/1/2 表示本轮 passed/failed/incomplete，同时阅读 scopeStatus 和 commercialStatus。visual 的声音项保持 deferred/null，完整商用状态仍为 incomplete；无声片可说明“视觉范围通过，按要求无声”。检查器只能核验报告与证据关系，不能认证审美或实际观看行为。缺少独立审阅能力时如实保留待审状态。
