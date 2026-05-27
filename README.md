# 《渡》——你是我藏在教案下的一场大雨

一个基于同名剧本结构文档改编的 Web 端视觉小说 Demo。项目可直接通过 GitHub Pages 部署，入口文件位于 `docs/index.html`。

## 当前内容

- 主线以马兆隆第一人称推进。
- 已整理并修正角色名：马兆隆、许诺、缪钧琳、许苑、梅婕、王晞辰。
- 已实现三条路线：自渡路线、缪钧琳路线、许苑路线。
- 已实现结局：True End「世界不止一间半」、缪钧琳 Good/Normal End、许苑 End、Bad End「一张删掉的照片」。
- 已补充项目内 SVG 立绘和背景图，可离线加载。
- 支持文字播放、选择分支、存档/读档、回顾、自动播放和快进。

## 运行方式

直接打开：

```text
docs/index.html
```

或启用任意静态服务器后访问 `docs/` 目录。

## 目录结构

```text
docs/
  index.html
  css/style.css
  js/engine.js
  js/main.js
  js/script.js
  assets/
    characters/
    backgrounds/
```

## 剧本来源

本项目根据 `你是我藏在教案下的一场大雨_Galgame剧本.docx` 的结构要求更新，包括路线分叉、角色名、剧情节点、结局条件和美术资源方向。

## 部署

GitHub Pages 建议设置为：

- Source: Deploy from a branch
- Branch: `main`
- Folder: `/docs`
