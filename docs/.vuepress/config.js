module.exports = {
  lang: "zh-CN",
  title: "博客",
  description: "Welcome to my blog",
  head: [["link", { rel: "icon", href: "/favicon.png" }]],
  themeConfig: {
    sidebarDepth: 1,
    // 导航栏
    navbar: [
      { text: "前端基础", link: "/web/" },
      { text: "后端", link: "/server/" },
      { text: "UI框架", link: "/ui-frame/" },
      {
        text: "在线文档",
        children: [
          { text: "Vue", link: "https://cn.vuejs.org/" },
          { text: "VueRouter", link: "https://router.vuejs.org/zh/" },
          {
            text: "Animate.css",
            link: "https://daneden.github.io/animate.css/",
          },
          { text: "XorPay", link: "https://xorpay.com/" },
          { text: "EasyWeChat", link: "https://www.easywechat.com/" },
          {
            text: "VuePress",
            link: "https://v2.vuepress.vuejs.org/zh/",
          },
        ],
      },
      {
        text: "在线工具",
        children: [
          {
            text: "Can I Use",
            link: "https://www.caniuse.com/#search=promise",
          },
          { text: "经纬度查询", link: "http://www.gpsspg.com/maps.htm" },
          { text: "在线工具", link: "https://tool.lu/" },
        ],
      },
      { text: "github", link: "https://github.com/zhugy-cn" },
    ],
    // 侧边栏
    sidebar: {
      // 前端
      "/web/": [
        {
          text: "Vue",
          collapsable: false,
          children: [
            "/web/vue/lifecycle.md",
            "/web/vue/vue-1.md",
            "/web/vue/vue-2.md",
            "/web/vue/optimize.md",
            "/web/vue/ui-library.md",
          ],
        },
        {
          text: "JavaScript",
          collapsable: false,
          children: [
            "/web/javascript/debugger.md",
            "/web/javascript/programming-language.md",
            "/web/javascript/01-history.md",
            "/web/javascript/02-HTML中的JavaScript.md",
            "/web/javascript/03-语言基础.md",
            "/web/javascript/04-变量、作用域和内存.md",
            "/web/javascript/executing.md",
            "/web/javascript/date-type.md",
            "/web/javascript/event.md",
            "/web/javascript/prototype.md",
            "/web/javascript/extends.md",
            "/web/javascript/promise.md",
            "/web/javascript/array.md",
          ],
        },
        {
          text: "Node",
          collapsable: false,
          children: ["/web/node/npm.md"],
        },
        {
          text: "写代码",
          collapsable: false,
          children: [
            "/web/code/call.md",
            "/web/code/throttle.md",
            "/web/code/debounce.md",
          ],
        },
        {
          text: "其他",
          collapsable: false,
          children: ["/web/browser.md"],
        },
      ],
      // 后端
      "/server/": [
        {
          text: "Java-EE",
          collapsable: false,
          children: [
            "/server/java-ee/modifier.md",
            "/server/java-ee/iterable.md",
          ],
        },
        {
          text: "Mysql",
          // collapsable: false,
          children: [
            "/server/mysql/01-DML.md",
            "/server/mysql/02-DQL.md",
            "/server/mysql/03-constraint.md",
            "/server/mysql/04-multi-table.md",
            "/server/mysql/05-transaction.md",
          ],
        },
        {
          text: "入门",
          collapsable: false,
          children: ["/server/java/jdbc.md"],
        },
        {
          text: "MyBatis",
          collapsable: false,
          children: ["/server/mybatis/xml.md", "/server/mybatis/annotation.md"],
        },
        {
          text: "Spring",
          collapsable: false,
          children: ["/server/spring/01-basis.md"],
        },
        {
          text: "SpringMVC",
          collapsable: false,
          children: ["/server/springMVC/01-basis.md"],
        },
      ],
      "/ui-frame/": [
        {
          text: "环境搭建",
          collapsable: false,
          sidebarDepth: 1,
          children: ["/ui-frame/build/vue.md"],
        },
        {
          text: "PC端",
          collapsable: false,
          sidebarDepth: 1,
          children: ["/ui-frame/pc/backbar.md"],
        },
        {
          text: "模板打印",
          collapsable: false,
          sidebarDepth: 1,
          children: ["/ui-frame/print/execute.md"],
        },
      ],
    },
  },
};
