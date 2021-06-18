export const data = {
  "key": "v-4dc7f652",
  "path": "/web/development.html",
  "title": "开发环境",
  "lang": "zh-CN",
  "frontmatter": {},
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "vscode 插件",
      "slug": "vscode-插件",
      "children": []
    }
  ],
  "filePathRelative": "web/development.md",
  "git": {
    "updatedTime": 1567159407000,
    "contributors": [
      {
        "name": "zhouzunhai",
        "email": "1571228141@qq.com",
        "commits": 1
      }
    ]
  }
}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
