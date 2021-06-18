export const data = {
  "key": "v-2beb863a",
  "path": "/ui-frame/build/",
  "title": "搭建组件库",
  "lang": "zh-CN",
  "frontmatter": {},
  "excerpt": "",
  "headers": [],
  "filePathRelative": "ui-frame/build/README.md",
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
