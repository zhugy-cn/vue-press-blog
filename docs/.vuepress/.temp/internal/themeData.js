export const themeData = {
  "sidebarDepth": 2,
  "nav": [
    {
      "text": "前端基础",
      "link": "/web/"
    },
    {
      "text": "后端",
      "link": "/server/"
    },
    {
      "text": "UI框架",
      "link": "/ui-frame/"
    },
    {
      "text": "在线文档",
      "items": [
        {
          "text": "Vue",
          "link": "https://cn.vuejs.org/"
        },
        {
          "text": "VueRouter",
          "link": "https://router.vuejs.org/zh/"
        },
        {
          "text": "Animate.css",
          "link": "https://daneden.github.io/animate.css/"
        },
        {
          "text": "XorPay",
          "link": "https://xorpay.com/"
        },
        {
          "text": "EasyWeChat",
          "link": "https://www.easywechat.com/"
        },
        {
          "text": "VuePress",
          "link": "https://blog.csdn.net/weixin_34345560/article/details/91457750"
        }
      ]
    },
    {
      "text": "在线工具",
      "items": [
        {
          "text": "Can I Use",
          "link": "https://www.caniuse.com/#search=promise"
        },
        {
          "text": "经纬度查询",
          "link": "http://www.gpsspg.com/maps.htm"
        },
        {
          "text": "在线工具",
          "link": "https://tool.lu/"
        }
      ]
    },
    {
      "text": "github",
      "link": "https://github.com/zhugy-cn"
    }
  ],
  "sidebar": {
    "/web/": [
      {
        "text": "Vue",
        "collapsable": false,
        "children": [
          "/web/vue/lifecycle.md",
          "/web/vue/vue-1.md",
          "/web/vue/vue-2.md",
          "/web/vue/optimize.md",
          "/web/vue/ui-library.md"
        ]
      },
      {
        "text": "JavaScript",
        "collapsable": false,
        "children": [
          "/web/javascript/programming-language.md",
          "/web/javascript/01-history.md",
          "/web/javascript/executing.md",
          "/web/javascript/date-type.md",
          "/web/javascript/event.md",
          "/web/javascript/prototype.md",
          "/web/javascript/extends.md",
          "/web/javascript/promise.md",
          "/web/javascript/array.md"
        ]
      },
      {
        "text": "Node",
        "collapsable": false,
        "children": [
          "/web/node/npm"
        ]
      },
      {
        "text": "写代码",
        "collapsable": false,
        "children": [
          "/web/code/call",
          "/web/code/throttle",
          "/web/code/debounce"
        ]
      },
      {
        "title": "其他",
        "collapsable": false,
        "children": [
          "/web/browser"
        ]
      }
    ],
    "/server/": [
      {
        "title": "Java-EE",
        "collapsable": false,
        "children": [
          "/server/java-ee/modifier",
          "/server/java-ee/iterable"
        ]
      },
      {
        "title": "Mysql",
        "children": [
          "/server/mysql/01-DML",
          "/server/mysql/02-DQL",
          "/server/mysql/03-constraint",
          "/server/mysql/04-multi-table",
          "/server/mysql/05-transaction"
        ]
      },
      {
        "title": "入门",
        "collapsable": false,
        "children": [
          "/server/java/jdbc"
        ]
      },
      {
        "title": "MyBatis",
        "collapsable": false,
        "children": [
          "/server/mybatis/xml",
          "/server/mybatis/annotation"
        ]
      },
      {
        "title": "Spring",
        "collapsable": false,
        "children": [
          "/server/spring/01-basis"
        ]
      },
      {
        "title": "SpringMVC",
        "collapsable": false,
        "children": [
          "/server/springMVC/01-basis"
        ]
      }
    ],
    "/ui-frame/": [
      {
        "title": "环境搭建",
        "collapsable": false,
        "sidebarDepth": 0,
        "children": [
          "/ui-frame/build/vue"
        ]
      },
      {
        "title": "PC端",
        "collapsable": false,
        "sidebarDepth": 0,
        "children": [
          "/ui-frame/pc/backbar"
        ]
      },
      {
        "title": "模板打印",
        "collapsable": false,
        "sidebarDepth": 0,
        "children": [
          "/ui-frame/print/execute"
        ]
      }
    ]
  },
  "locales": {
    "/": {
      "selectLanguageName": "English"
    }
  },
  "navbar": [],
  "logo": null,
  "repo": null,
  "selectLanguageText": "Languages",
  "selectLanguageAriaLabel": "Select language",
  "editLink": true,
  "editLinkText": "Edit this page",
  "lastUpdated": true,
  "lastUpdatedText": "Last Updated",
  "contributors": true,
  "contributorsText": "Contributors",
  "notFound": [
    "There's nothing here.",
    "How did we get here?",
    "That's a Four-Oh-Four.",
    "Looks like we've got some broken links."
  ],
  "backToHome": "Take me home",
  "openInNewWindow": "open in new window"
}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}
