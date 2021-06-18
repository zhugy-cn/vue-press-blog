export const data = {
  "key": "v-23531e85",
  "path": "/web/browser.html",
  "title": "浏览器",
  "lang": "zh-CN",
  "frontmatter": {},
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "进程与线程",
      "slug": "进程与线程",
      "children": [
        {
          "level": 3,
          "title": "概念",
          "slug": "概念",
          "children": []
        },
        {
          "level": 3,
          "title": "区别",
          "slug": "区别",
          "children": []
        },
        {
          "level": 3,
          "title": "比喻",
          "slug": "比喻",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "浏览器是多进程的",
      "slug": "浏览器是多进程的",
      "children": [
        {
          "level": 3,
          "title": "浏览器包含哪些进程",
          "slug": "浏览器包含哪些进程",
          "children": []
        },
        {
          "level": 3,
          "title": "浏览器为什么是多进程的",
          "slug": "浏览器为什么是多进程的",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "浏览器的渲染进程",
      "slug": "浏览器的渲染进程",
      "children": [
        {
          "level": 3,
          "title": "渲染进程包含哪些线程",
          "slug": "渲染进程包含哪些线程",
          "children": []
        },
        {
          "level": 3,
          "title": "GUI 渲染线程与 JS 引擎线程互斥",
          "slug": "gui-渲染线程与-js-引擎线程互斥",
          "children": []
        },
        {
          "level": 3,
          "title": "JS 阻塞页面加载",
          "slug": "js-阻塞页面加载",
          "children": []
        },
        {
          "level": 3,
          "title": "CSS 加载是否会阻塞 DOM 树渲染？",
          "slug": "css-加载是否会阻塞-dom-树渲染",
          "children": []
        },
        {
          "level": 3,
          "title": "浏览器的渲染过程",
          "slug": "浏览器的渲染过程",
          "children": []
        },
        {
          "level": 3,
          "title": "普通图层和复合图层",
          "slug": "普通图层和复合图层",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "重绘与重排",
      "slug": "重绘与重排",
      "children": [
        {
          "level": 3,
          "title": "区别",
          "slug": "区别-1",
          "children": []
        },
        {
          "level": 3,
          "title": "如何触发重排和重绘？",
          "slug": "如何触发重排和重绘",
          "children": []
        },
        {
          "level": 3,
          "title": "如何避免重绘或者重排？",
          "slug": "如何避免重绘或者重排",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "同源策略",
      "slug": "同源策略",
      "children": []
    }
  ],
  "filePathRelative": "web/browser.md",
  "git": {
    "updatedTime": 1566399025000,
    "contributors": [
      {
        "name": "ZhuGuangYong",
        "email": "860185538@qq.com",
        "commits": 1
      },
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
