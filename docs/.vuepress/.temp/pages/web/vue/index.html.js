export const data = {
  "key": "v-ad9a6986",
  "path": "/web/vue/",
  "title": "我是 Vue 主页",
  "lang": "zh-CN",
  "frontmatter": {},
  "excerpt": "",
  "headers": [],
  "filePathRelative": "web/vue/README.md",
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
