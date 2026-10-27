# Runtime 验证记录

日期：2026-10-27。范围：可复用模板工程和 runtime 技术检查，未导出 MP4。

- 规格：960×540、30fps、31 秒、930 帧，10 个连续章节。
- 实测版本：`4963845407044895abaf65af0e350bc911db4605693c829bf81b4c7259943461`。此标识对应验证时的工程；随后新增的报告/对照图会影响全目录缓存标识，但没有改变被测源码。源码摘要见 tested-source-hashes.json。
- TypeScript noEmit 检查通过。
- 全部 930 帧资源准备与截图成功；10 个乱序帧重复取样与顺序图像字节相同。
- Player 播放、暂停、跳至825帧、继续播放检查通过，无报错。
- 31 秒音频与参考解码 PCM 乘以0.75后逐采样相同，最大误差0；峰值0.9670972824。未变速或移动音频。此项是同步数据验证，不代表听感审查。
- 独立复制至 /tmp/saas-breathing-standalone-20261027，排除 node_modules/.lvm 后实际目录内 npm ci --ignore-scripts 安装22包成功；修正后的相同版本88关键帧验证通过。使用实际工作目录安装；从其他工程用 npm --prefix 进行首次安装曾出现 npm lockfile 解析错误，因此文档采用 cd 后 npm ci。
- 独立审阅者另以仅 package.json/package-lock/vendor 的临时目录确认依赖可安装，无仓库 node_modules 依赖。

## 参考画面对照

源视频 SHA256：8eaa4fa4fa34a35ed9fe5c750f632c120d3130431837ea10fb77243a01062422。

每个原始帧与相同序号 runtime PNG 对齐，双方以 PIL 默认缩放为480×270 RGB，使用 skimage.metrics.structural_similarity(channel_axis=2,data_range=255)。930帧平均SSIM：0.93752225；最低：0.64711945（frame 791，约26.367秒）。SSIM只描述像素相似度，不能证明节奏或审美通过。原始数据见 reference-comparison.json；comparison-0..4.jpg 左为参考、右为runtime，覆盖30个代表时刻。

主要剩余差异：26.2–26.6秒大星形收拢为曲线近似，未还原原片运动模糊；文字细节、逐字时间和低频背景存在近似；逆透视页面纹理保留部分遮挡残影。24个实测页面轨迹采用分段线性插值，保留原锚点和全局时刻；锚点之间的精确速度曲线仍需连续观看核验。

## 独立审阅

审阅者：/root/review_saas_template，未参与实现，干净上下文。实际完成源码、依赖及静帧审查。

发现的工作流标题整块淡入/淡出、字标裁切延伸到容器边界问题已修正；审阅者复测当前645、735、840帧后关闭这些问题，确认未见背景边缘漏白。

技术验证通过。连续全片动态观看与完整混音试听未完成，完整视觉/商用审查状态为 incomplete，不填写推测评分。此模板可以供 runtime 预览和内容替换，不能将参考纹理质量当作正式产品影片品质验收。

## Star continuity fix after user preview

Latest tested version: 3c6999440e85e357161dc4c4549e775ccbef73c8f05a7d08a0a30bf41bc35fa2

See runtime-star-fix.json. Earlier comparison images, SSIM and standalone results above describe the previous revision, not the new star.

Root cause: at 26.9s the analytic star switched abruptly to a noisy sampled polygon, while piecewise linear size changes introduced velocity discontinuities. The aperture and brand now use one Bezier shape throughout, with monotone C1 Hermite curves for position, size and unwrapped rotation. Original 31s duration, title timing and final hold are preserved.

Passed: node scripts/check-star.ts, TypeScript, all 930 frames, reverse/repeat captures, sample-aligned audio and Player operations. Independent reviewer /root/review_saas_template confirmed no geometry switch at 26.9s and identical geometry at the 27.1s component handoff; maximum per-frame translation 7.90px, rotation 11.04 degrees, no reversal or rebound. Custom brandMark shape replacement is outside the default-star continuity guarantee. Continuous perceptual playback remains for user review; numeric continuity does not certify full audiovisual quality.

## Layer geometry correction after user preview

Latest tested version: a8f68100d6a1ab2ea1c6a4d33ee36a289b48055475a0fa72985d86cad1dfa111 (runtime-layer-fix.json). Fixed three-card scene: old back-card top-left at8.5s was185,350, while reference is approximately156,238; wrong clipping cut off a large triangular area and admitted neighboring background. Remeasured all three cards, including entry/exit anchors; re-extracted the three clips from the user source at960x540 using matching inverse-projection quads. Also corrected middle-card bottom at9s from375 to385 to eliminate the small right-edge notch.

All930 frames, reverse/repeat capture, audio sample alignment and Player operation checks passed. Independent reviewer /root/review_saas_template compared source frames255,270,285,315; large triangular cuts and protruding strips resolved. Follow-up on newest270 confirmed the right-bottom white edge is continuous. See layers-corrected.jpg, reference on left/runtime on right. These are static and technical checks, not a claim of complete continuous audiovisual review. Historical SSIM/earlier comparison images above predate this correction.
