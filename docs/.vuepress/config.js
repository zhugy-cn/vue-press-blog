module.exports = {
  // title: "学习前端",
  description: "Welcome to my blog",
  head: [["link", { rel: "icon", href: "/favicon.png" }]],
  themeConfig: {
    sidebarDepth: 2,
    // 导航栏
    nav: [
      { text: "前端", link: "/basic/" },
      { text: "后端", link: "/server/" },
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
          { text: "在线工具", link: "https://tool.lu/" },
          { text: "谷歌访问助手", link: "http://www.ggfwzs.com/" }
        ]
      },
      { text: "github", link: "https://github.com/zhugy-cn" }
    ],
    // 侧边栏
    sidebar: {
      // 前端
      "/basic/": [
        {
          title: "Vue",
          children: ["/basic/vue/", "/basic/vue/vue-2", "/basic/vue/vue-1"]
        },
        {
          title: "JavaScript",
          children: [
            "/basic/javascript/",
            "/basic/javascript/array",
            "/basic/javascript/string"
          ]
        },
        {
          title: "CSS",
          children: ["/basic/css/", "/basic/css/css1", "/basic/css/css2"]
        },
        {
          title: "DCloud",
          children: ["/basic/DCloud/DCloud1", "/basic/DCloud/mui1"]
        },
        {
          title: "浏览器",
          children: ["/basic/browser/"]
        }
      ],
      // 后端
      "/server/": [
        {
          title: "Mysql",
          // collapsable: false,
          children: [
            "/server/mysql/01-DML",
            "/server/mysql/02-DQL",
            "/server/mysql/03-constraint",
            "/server/mysql/04-multi-table",
            "/server/mysql/05-transaction",
          ]
        },
        {
          title: "入门",
          // collapsable: false,
          children: [
            "/server/java/jdbc",
          ]
        },
        {
          title: "MyBatis",
          // collapsable: false,
          children: [
            "/server/mybatis/xml",
            "/server/mybatis/annotation",
          ]
        },
        {
          title: "初级",
          // collapsable: false,
          children: [
            "/server/java/mybatis",
            "/server/java/spring",
            "/server/java/spring-mvc",
            "/server/java/spring-boot",
            "/server/java/spring-cloud",
          ]
        }
      ],
      // 代码片段
      "/snippet/": [
        {
          title: "JavaScript",
          children: [
            "/snippet/javascript/",
            "/snippet/javascript/javascript1",
            "/snippet/javascript/javascript2"
          ]
        },
        {
          title: "CSS",
          children: ["/snippet/css/", "/snippet/css/css1", "/snippet/css/css2"]
        }
      ],
    }
  }
};
