# Motion Design Promo

可独立安装的 20 秒 / 1280×720 / 60 fps React 模板。先读 [template.md](template.md) 理解动作、素材与换产品方法。

```sh
npm ci --ignore-scripts
npm run setup
npm run prepare
npm run validate
npm run validate -- --full
```

setup 安装锁定 Chromium 并检查 FFmpeg。已安装浏览器时可以直接 prepare。validate 不生成视频文件；详细报告和 PNG 在 `.lvm/validation/`。完整检查需要逐帧读取资产和截图，耗时随机器性能变化。

用户要求观看时：`npm run preview -- --open`。指定帧：`npm run still -- 487 .lvm/frame-487.png`。只有明确要求导出时：`npm run render -- exports/motion-design-promo.mp4`。

工程包含独立 runtime tarball 与 package-lock；移动到仓库外后仍可 npm ci，无需原始视频工程。依赖下载、Chromium 安装需要网络；运行画面及音频不请求外部服务。

JSX 保留已调校源动画，film.tsx 为 TypeScript 接入层。运行配置在 film.tsx，内容与素材映射在 src/content.json，字体在 src/fonts.json，视觉数据在 src/design.js。修改后重新 prepare/启动服务；验证产生的输出不能回写进源码目录。
