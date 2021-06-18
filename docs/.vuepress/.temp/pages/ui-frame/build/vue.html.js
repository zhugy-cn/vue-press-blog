export const data = {
  "key": "v-fe59b614",
  "path": "/ui-frame/build/vue.html",
  "title": "Vue 搭建组件库",
  "lang": "zh-CN",
  "frontmatter": {},
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "基础",
      "slug": "基础",
      "children": []
    },
    {
      "level": 2,
      "title": "按需加载",
      "slug": "按需加载",
      "children": []
    },
    {
      "level": 2,
      "title": "组件文档",
      "slug": "组件文档",
      "children": []
    }
  ],
  "filePathRelative": "ui-frame/build/vue.md",
  "git": {
    "updatedTime": 1589964857000,
    "contributors": [
      {
        "name": "zhugy-cn",
        "email": "860185538@qq.com",
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
