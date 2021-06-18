export const data = {
  "key": "v-744e6dd4",
  "path": "/web/",
  "title": "web",
  "lang": "zh-CN",
  "frontmatter": {},
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "scoped 样式",
      "slug": "scoped-样式",
      "children": []
    }
  ],
  "filePathRelative": "web/README.md",
  "git": {
    "updatedTime": 1566291881000,
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
