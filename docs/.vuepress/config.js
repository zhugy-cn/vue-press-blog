module.exports = {
  // title: "学习前端",
  description: "Welcome to my blog",
  head: [["link", { rel: "icon", href: "/favicon.png" }]],
  themeConfig: {
    sidebarDepth: 2,
    // 导航栏
    nav: [
      { text: "前端", link: "/web/" },
      { text: "后端", link: "/server/" },
      { text: "UI框架", link: "/ui-frame/" },
      {
        text: "在线文档",
        items: [
          { text: "Vue", link: "https://cn.vuejs.org/" },
          { text: "VueRouter", link: "https://router.vuejs.org/zh/" },
          {
            text: "Animate.css",
            link: "https://daneden.github.io/animate.css/"
          },
          { text: "XorPay", link: "https://xorpay.com/" },
          { text: "EasyWeChat", link: "https://www.easywechat.com/" },
          {
            text: "VuePress",
            link:
              "https://blog.csdn.net/weixin_34345560/article/details/91457750"
          }
        ]
      },
      {
        text: "在线工具",
        items: [
          {
            text: "Can I Use",
            link: "https://www.caniuse.com/#search=promise"
          },
          { text: "经纬度查询", link: "http://www.gpsspg.com/maps.htm" },
          { text: "在线工具", link: "https://tool.lu/" }
        ]
      },
      { text: "github", link: "https://github.com/zhugy-cn" }
    ],
    // 侧边栏
    sidebar: {
      // 前端
      "/web/": [
        {
          title: "Vue",
          collapsable: false,
          children: [
            "/web/vue/lifecycle",
            "/web/vue/vue-1",
            "/web/vue/vue-2",
            "/web/vue/optimize",
            "/web/vue/ui-library",
          ]
        },
        {
          title: "JavaScript",
          collapsable: false,
          children: [
            "/web/javascript/executing",
            "/web/javascript/date-type",
            "/web/javascript/event",
            "/web/javascript/prototype",
            "/web/javascript/extends",
            "/web/javascript/promise",
            "/web/javascript/array"
          ]
        },
        {
          title: "写代码",
          collapsable: false,
          children: [
            "/web/code/call",
            "/web/code/throttle",
            "/web/code/debounce"
          ]
        },
        {
          title: "其他",
          collapsable: false,
          children: ["/web/browser"]
        }
      ],
      // 后端
      "/server/": [
        {
          title: "Java-EE",
          collapsable: false,
          children: [
            "/server/java-ee/modifier",
            "/server/java-ee/iterable"
          ]
        },
        {
          title: "Mysql",
          // collapsable: false,
          children: [
            "/server/mysql/01-DML",
            "/server/mysql/02-DQL",
            "/server/mysql/03-constraint",
            "/server/mysql/04-multi-table",
            "/server/mysql/05-transaction"
          ]
        },
        {
          title: "入门",
          collapsable: false,
          children: ["/server/java/jdbc"]
        },
        {
          title: "MyBatis",
          collapsable: false,
          children: ["/server/mybatis/xml", "/server/mybatis/annotation"]
        },
        {
          title: "Spring",
          collapsable: false,
          children: ["/server/spring/01-basis"]
        },
        {
          title: "SpringMVC",
          collapsable: false,
          children: ["/server/springMVC/01-basis"]
        }
      ],
      "/ui-frame/": [
        {
          title: '环境搭建',
          collapsable: false,
          sidebarDepth: 0,
          children: [
            "/ui-frame/build/vue"
          ]
        },
        {
          title: 'PC端',
          collapsable: false,
          sidebarDepth: 0,
          children: [
            "/ui-frame/pc/backbar"
          ]
        },
        {
          title: '模板打印',
          collapsable: false,
          sidebarDepth: 0,
          children: [
            "/ui-frame/print/execute"
          ]
        }
      ]
    }
  }
};
