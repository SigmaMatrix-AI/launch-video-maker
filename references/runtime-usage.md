# Runtime 使用接口

运行前按 README 安装并构建。影片工程中的 `film.tsx` 导出 `film` 和默认 React 组件。初始化文件是接线起点，需要 Agent 根据产品另行设计，并不是参考模板。

```tsx
import React from 'react';
import {defineFilm, interpolate, scenesAt} from '@launch-video-maker/runtime';
import {AssetImage, VideoFrame, useFrameTask} from '@launch-video-maker/runtime/react';

export const film = defineFilm({
  width: 1920, height: 1080, fps: {num: 30, den: 1},
  durationInFrames: 300, seed: 1,
  scenes: [{id: 'hero', start: 0, end: 300}],
  assets: [{id: 'logo', kind: 'image', src: 'brand-kit/logo.png'}],
  audio: [], markers: {reveal: 30}
});
export default function Frame({frame}: {frame: number}) {
  return <AssetImage asset="logo" style={{opacity: interpolate(frame, [0, 30], [0, 1])}} />;
}
```

## 时间和资源

`frame` 为全局整数帧；`scenesAt(film, frame)` 提供 active scenes 及 localFrame。场景区间 `[start,end)`；重叠场景的绘制顺序、遮罩和转场由 React 组件显式实现。`secondsAt` 按有理 fps 换算，随机值使用 `random(seed, key)`。禁止用墙钟、未播种随机或累计状态推进场景。

资产 `{id,kind,src}` 的 src 相对工程根目录，必须真实位于该工程内。支持 image/font/audio/video。字体需给 `family`。字体由 FontFace 预载，图片用 AssetImage 或正常 img（等待 decode）；背景纹理应作为预载图片在 useFrameTask 中等待，不能依赖隐式网络请求。Canvas/异步绘图使用 `useFrameTask(async signal => …)`；完成前不报告 ready，取消后不得提交旧绘图结果。

`VideoFrame asset="clip" time={secondsAt(film, frame)}` 的 time 是归一化源时间（秒）。裁切与速度通过组件传入明确时间表达式。资产 `outOfRange` 取 error（默认）、hold 或 loop；源视频声音必须另列 audio 事件或明确静音。VFR 使用归一化 PTS 的覆盖区间；最后一帧使用探测到的持续时间。当前整个源片段预解码，写入过程中检查累计 2 GiB 预算，超限中止并清除未完成目录；导入前剪短长录屏，缓存可清理重建。浏览器只推测预取后续两帧，跨视频层最多保留六个推测图片句柄；预取不阻塞当前帧就绪。解码帧 URL 带内容版本供浏览器复用，实际使用帧仍须完成图片解码。动态 GIF/APNG/WebP 或自主动画 SVG 不作为静态图片接受，应转为确定性视频帧。

## 音频事件

事件必填 `id, asset, start, end`。start/end 是工程帧，也可用 `{scene:'hero',offset:12}` 或 `{marker:'reveal',offset:0}`。源裁切 `sourceStart/sourceEnd` 用秒；`speed` 默认为1，变速会变调；`gain` 是线性增益。

`fadeIn/fadeOut` 和 `envelope: [[localFrame,gain],…]` 使用事件内工程局部帧。显式 `loop:true` 为硬边界循环，作者应选零交叉或预处理无缝源；非循环不足必须指定 `shortage:'silence'`，否则失败。事件外尾音裁掉；需要尾音时扩展 end，保持在影片范围内。

所有音源先重采样到 48k stereo，在工程样本坐标上混合；超过满幅会拒绝准备，不自动压低/归一化音量。共享 float PCM `mix.wav` 用于 Web Audio 和 AAC 编码；包络、时间或源改变必须重新准备。为旁白导入的字级时间戳可换算成 markers，不假设具备语音生成或识别服务。

## 帧握手与服务

Player 暴露 `window.__LVM__` 给内部采集工具：`film/version/ready/error`、`setFrame(frame,version,requestId)`、`acquire`、`release`、`state`。ready 返回相同 frame/version/requestId；异步绘制、字体、图片解码完成前不返回。捕获使用 acquire → screenshot → release 串行事务，期间拒绝其他定位；采集前后都验证内容版本。

普通预览旧 seek 会被取消；播放使用音频输出时钟，资源缓冲时停止声音，定位完成后从同一位置续播。隐藏标签页时暂停。内容更新需重启准备，不热混用两个版本。服务只绑定 127.0.0.1。`preview --open` 是唯一自动打开浏览器的开关，Agent 只能在用户已要求预览时使用。

## 制作工具与缓存

`capture` CLI 接收 CSS selectors；更复杂的页面状态通过 Node API `capturePage(url,dest,selectors,async page=>{…})` 准备，使用明确元素状态等待，登录凭据由用户正常授权，不写入截图记录。

`analyze-audio` 输出 10 ms 窗口峰值/能量和瞬态候选，不把它们自动认作乐拍。`review-pack .lvm/review` 返回唯一新包的 directory、manifestPath、reportPath，默认 scope=visual，不生成视频文件。支持 `--scope audiovisual`、`--mp4 /absolute/existing.mp4` 和 `--previous /absolute/old/review.json`，不覆盖历史报告。工程内目的地使用 .lvm/ 子目录，也可以使用工程外路径；不能写入工程源码目录。

`review-check /absolute/bundle/review.json` 不启动浏览器或准备媒体，返回 scope、scopeStatus、commercialStatus、reasons。退出0/1/2对应本轮passed/failed/incomplete；visual即使退出0，commercialStatus也仍incomplete。旧版报告返回legacy-report，需重新出包。

需要自定义记录或补采动作时，在工程内建立：

```json
{"documents":[{"role":"reference","path":"records/reference.png"}],"actionRanges":[{"start":30,"end":45}]}
```

保存为 records/review-context.json。role支持brief/direction/storyboard/brand/reference；配置的同role文档优先于默认位置。显式文件必须存在工程内，动作区间为合法半开整数帧，不裁剪越界。包内证据绑定SHA-256，修改文件或manifest后需重新生成，不能手工修摘要掩盖改变。每包最多1200采样帧、2 GiB证据。

独立评测者按 [审阅指引](reviewer-prompt.md) 填写本轮证据id、观察、分数及问题，再执行review-check。采样与播放日志不自动等于实际动态观看；缺能力保持未完成。

`.lvm/<contentVersion>/` 保存解码帧、预混与准备记录；`.lvm/vite/` 是构建缓存。`clean` 删除缓存前先停止使用它的服务。渲染临时文件完成/失败均清理；中断使用 SIGINT/SIGTERM。输出放工程 `exports/` 或工程外，避免把成片当作新的输入素材。

`doctor` 记录 Node、平台、runtime、Playwright、FFmpeg/ffprobe；生成工程锁定 npm 包和 Chromium 版本。FFmpeg 由系统提供，精确工具版本记录到导出报告，跨机器仍需做像素/音频回归。
