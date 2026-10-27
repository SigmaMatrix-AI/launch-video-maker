# Runtime 验证记录

2026-10-27，macOS arm64，Node 24.17.0，FFmpeg 8.1.2，runtime 0.1.0，Playwright 1.64.1，Chromium 156.0.8078.4 / revision 1248。

## 已执行与结果

- 独立 runtime 快照 build 成功；film.tsx 连同导入 JSX 通过 TypeScript 无输出编译检查。
- `npm run validate -- --full` 成功：1280×720 / 60fps / 1200 帧；全部 1200 帧都经过 acquire → React/字体/图片/背景解码 → screenshot → release，十四段动作的实际 data-phase 与指定帧一致。
- 17 个乱序/逆序取样重复结果逐字节一致，且与顺序捕获的对应帧 PNG SHA-256 一致。
- 共享混音与 20 秒母带解码后的 48kHz stereo float PCM **逐采样完全一致**。每声道 960000 samples，峰值 0.60067749，无新增削波、时移、包络或重采样速度变化。
- 实际 Player 播放 → 暂停 → 跳到第900帧 → 恢复播放通过，页面无错误。
- 整包复制到仓库外，使用自带 tarball 和 lock 执行 `npm ci --ignore-scripts`、56帧短检查、逆序/重复、PCM与Player检查通过。无需原工程或仓库 runtime 路径；未重新安装系统 FFmpeg 或已有 Chromium。
- 原当前六图版视频与本 runtime 所有1200帧同帧比较：统一 Pillow bicubic 缩至480×270，RGB SSIM 均值 **0.99407246**，最低 **0.98778431**（第179帧），RGB MAE均值 **0.45752/255**。PNG 对比经 JPEG/H264 编码的基准，不应期望字节一致。
- 独立审查未发现 P1/P2 迁移问题。字体别名是六个 JSX 唯一差异；原动作参数、+0.5帧采样、内容与素材映射核对一致。P3 文档链接在独立复制后失效已改为本包内记录。

## 证据和重跑

- [runtime-full.json](runtime-full.json)：完整运行报告、1200帧哈希及实现文件哈希。报告是在添加验证记录与修正文档链接之前生成；`testedContentVersion` 保存当时完整工程版本，`implementationFiles` 独立约束运行源码、素材、依赖与验证脚本。文档收尾不改变这些实现文件。
- [reference-comparison.json](reference-comparison.json)：基准视频SHA与1200帧相似度逐帧结果。
- [source-manifest.json](source-manifest.json)：源文件来源与哈希。
- `npm run validate` 重跑56帧检查；`npm run validate -- --full` 重跑完整1200帧。新运行报告和PNG在 `.lvm/validation`，不覆盖本目录历史证据。最后一次运行会覆盖缓存 runtime.json，请用本目录 full 报告识别本次1200帧证据。
- 原视频不随模板打包。复核相似度时使用 source-manifest 指定SHA的用户基准视频，解码为RGB，对两侧使用相同缩放，再比较同一帧号；不能改用21.033秒参考片或旧九图版。

## 范围

本次为模板迁移的 runtime 技术验收；原素材、音频与编排保持，未生成新 MP4。已检查逐帧完整性、资源握手、时间线、PCM和播放控制，且抽帧拼图目视对照一致。独立审查未实际动态观看或听音，不宣称新的七维商用审美/听感验收；换产品和公开发布仍按 skill 的独立评测与素材来源要求执行。
