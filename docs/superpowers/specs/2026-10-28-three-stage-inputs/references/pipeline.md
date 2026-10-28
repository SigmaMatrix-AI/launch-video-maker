# 从产品到影片

整支视频服务于产品宣传。先理解产品，再决定如何拍；自主推进，在观看草稿时不断修正构想。

## 1. 理解产品，找到值得展示的改变

访问产品页面，明确核心卖点、必须展示功能，以及品牌调性。
### Product + Launch
- Product: what it does, for whom, category, what it replaces.
- Feature: what exactly is it, what problem does it solve, up to 3 benefits.
- Slogan: the best sentence to represent the product.
- Product access: necessary screenshots, fullpage 2X screeshot, per-element cutout.
- CTA

### Brand kit
- Palette and Material: primary color, theme color (accompaniment color); role (canvas, ink, primary, accents),light or dark
- Logo: logo mark , logos
- Motion: easing personality (precise vs bouncy), speed
- Tone: Brand tone: modern, retro, minimalist, etc.
- Visual style: icons, shapes, illustration, signature motifs

把这些答案及素材路径、来源与使用依据简短写进 `records/brief.md`，让后续制作与审阅都能找到；不用为每个问题另造表格。
Missing brand data → use neutral defaults and say so. Missing product facts → ask; never invent them.

把核心承诺收敛成一句话：帮助谁，把什么事变得更好。找到一条能证明它的真实输入→关键操作→结果；多个功能围绕这个价值展开。

## 2. 形成导演构想

结合 SKILL.md 与 [eval.md](eval.md) 的制作标准，为这款产品决定故事、视觉气质和一个值得记住的画面。可以从 `styles/` 中的 `style.md`、参考影片或自己的设计出发；引用的是具体的构图、动作或材质方法，明确用户要求的还原范围。

开头用熟悉的困境、意外的成果或向往的体验，让目标用户感到“这与我有关”。围绕关键演示建立期待、兑现价值，让观众看清产品带来的前后差别；结尾给出与当前发布状态相符的下一步，如试用或加入等待名单。叙事顺序可以自由设计。

有音乐的影片，尽早选定符合产品气质且可使用的音源，听出铺垫、推进、高潮与结尾，把产品最强的结果放在合适的位置。用户要求无声时，用画面变化和可读停留建立节奏。

用简短分镜说明每段让观众理解什么、具体看到什么、如何接到下一段，以及大致时长和声音关系。让一个代表案例贯穿，覆盖必展示项，给读图和结果落定留时间。先做最关键的画面或短动态，验证素材、构图与动作能否成立，再展开全片。

## 3. 制作能观看的草稿

在 `films/<project-id>/` 或用户指定位置创建独立工程，使用 [tech.md](tech.md) 的运行方式。工程内保存实际使用的源码、素材及依赖，不改模板本体，也不隐式依赖其他影片目录。

按镜头补采缺失状态或高清素材。先让故事、主体动作、衔接和音乐组成完整动态草稿，再细化按压、跟随、吸附、字形、材质和声音。草稿可以帮助改变分镜，不必先把所有参数写成文档。

`records/direction.md` 保存关键创作决定；`records/storyboard.md` 保存实际镜头顺序、帧区间、素材和声音锚点。记录服务续作与检查，篇幅随影片复杂度决定。运行工具默认读取这三个记录文件；合并或改名时用 `records/review-context.json` 指定位置，见 tech.md。

## 4. 看、听、打磨

按 [eval.md](eval.md) 完整观看、试听并记录具体问题：产品操作能否看懂，主体是否只有整页入场和换页，焦点是否冲突，文字能否读完，动作与声音是否对齐。优先修产品表达和剪辑，再修细节。

每条问题记录时间位置、现象、修改动作与复看条件。修复后重看当前段、前后转场及全片，更新受影响的混音；按 [质量保证](tech.md#质量保证) 完成独立审查，如实保留未验证项。

## 5. 交付与续作

按 SKILL.md 的交付约定提供工程、检查状态与本地预览；验证本次服务地址、播放和资源就绪，保持服务运行并提供可点击链接；明确要求导出后再生成 MP4，检查实际输出。

续作从当前成果和用户反馈出发，只更新受影响的判断、镜头与素材；已经确认的要求继续有效。工程变化后更新预览和检查证据，不沿用旧版本通过结论。
