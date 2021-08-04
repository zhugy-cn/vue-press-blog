export const data = {
  "key": "v-35633050",
  "path": "/eastinfo/devDoc/v1/guide.html",
  "title": "基础",
  "lang": "zh-CN",
  "frontmatter": {},
  "excerpt": "",
  "headers": [],
  "filePathRelative": "eastinfo/devDoc/v1/guide.md",
  "git": {
    "updatedTime": 1627460312000,
    "contributors": [
      {
        "name": "zhugy",
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
