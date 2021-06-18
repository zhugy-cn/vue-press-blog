export const data = {
  "key": "v-ab257296",
  "path": "/web/javascript/executing.html",
  "title": "JS 的执行过程",
  "lang": "zh-CN",
  "frontmatter": {},
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "一、基本概念",
      "slug": "一、基本概念",
      "children": [
        {
          "level": 3,
          "title": "1、为什么是单线程",
          "slug": "_1、为什么是单线程",
          "children": []
        },
        {
          "level": 3,
          "title": "2、什么需要异步操作事件",
          "slug": "_2、什么需要异步操作事件",
          "children": []
        },
        {
          "level": 3,
          "title": "3、JS 怎么通过单线程实现异步的？",
          "slug": "_3、js-怎么通过单线程实现异步的",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "二、JS 引擎的执行过程",
      "slug": "二、js-引擎的执行过程",
      "children": [
        {
          "level": 3,
          "title": "1、语法分析阶段",
          "slug": "_1、语法分析阶段",
          "children": []
        },
        {
          "level": 3,
          "title": "2、预编译阶段",
          "slug": "_2、预编译阶段",
          "children": []
        },
        {
          "level": 3,
          "title": "3、执行阶段（异步循环）",
          "slug": "_3、执行阶段-异步循环",
          "children": []
        }
      ]
    }
  ],
  "filePathRelative": "web/javascript/executing.md",
  "git": {
    "updatedTime": 1566377533000,
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
