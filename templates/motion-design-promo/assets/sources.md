# 来源与使用边界

本包根据用户提供的 `motion-design-promo-01` 本地 React 工程迁移。来源相对路径与 SHA-256 保存在 `records/source-manifest.json`，仅用于溯源，不参与运行，也无需源工程存在。

- 动效：源工程 template/boards 六个 JSX、design.js；保留十四段动作及 20 秒编排。仅字体接线修改，不声称拥有原参考影片的全部权利。
- 示例：源工程 props/shiqu-shopping 的当前六图版本，SHIQU 为虚构品牌。media-plan.json 将商品等素材记为 built-in image_gen 生成；这里保留现有文件，不重新生成。示例图、人物和虚构页面不能充当目标产品事实或客户证言。新片应替换。
- 音频：现有 music-master.wav，48kHz stereo、20秒。源脚本由 original-music.wav 裁切/处理得到。现有来源材料未提供足以确认公开再发行的完整音乐许可；本包不新增授权声明。公开发布模板或成片前，使用有相应授权的音乐或补充来源证明。
- 字体：Inter 400/800、Noto Sans SC 中文 fallback A/B/C 400/800；源工程 report.md 标注 OFL。迁移保留原文件；源目录未附独立 OFL 文本，本次不将该描述提升为新的许可证明。
- Runtime：独立快照 @launch-video-maker/runtime 0.1.0；依赖版本由 package-lock 固定。仓库未指定总许可，不能推断为 MIT。

当前迁移为用户本地使用。向公共仓库分发前应补齐所需第三方许可文本及素材/音乐来源依据。
