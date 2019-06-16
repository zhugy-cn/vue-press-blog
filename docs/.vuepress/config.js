module.exports = {
  title: '学习前端',
  description: 'Welcome to my blog',
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }]
  ],
  themeConfig: {
    // 导航栏
    nav: [
      { text: '基础知识', link: '/basic/' },
      { text: '代码片段', link: '/snippet/' },
      {
        text: '在线文档',
        items: [
          { text: 'Vue', link: 'https://cn.vuejs.org/' },
          { text: 'Vue Router', link: 'https://router.vuejs.org/zh/' },
          { text: 'Animate.css', link: 'https://daneden.github.io/animate.css/' },
          { text: 'XorPay', link: 'https://xorpay.com/' }
        ]
      },
      {
        text: '在线工具',
        items: [
          { text: 'Can I Use', link: 'https://www.caniuse.com/#search=promise' },
          { text: '经纬度查询', link: 'http://www.gpsspg.com/maps.htm' },
          { text: '在线工具', link: 'https://tool.lu/' },
          { text: '谷歌访问助手', link: 'http://www.ggfwzs.com/' }
        ]
      },
      { text: 'github', link: 'https://github.com/zhugy-cn' }
    ],
    // 侧边栏
    sidebar: {
      // 基础知识
      '/basic/': [
        {
          title: 'Vue',
          children: [
            '/basic/vue/',
            '/basic/vue/vue-2',
            '/basic/vue/vue-1',
          ]
        },
        {
          title: 'JavaScript',
          children: [
            '/basic/javascript/',
            '/basic/javascript/javascript1',
            '/basic/javascript/javascript2',
            '/basic/javascript/array',
          ]
        },
        {
          title: 'CSS',
          children: [
            '/basic/css/',
            '/basic/css/css1',
            '/basic/css/css2',
          ]
        },
        {
          title: 'DCloud',
          children: [
            '/basic/DCloud/DCloud1',
            '/basic/DCloud/mui1',
          ]
        },
        {
          title: '浏览器',
          children: [
            '/basic/browser/',
          ]
        },
      ],
      // 代码片段
      '/snippet/': [
        {
          title: 'JavaScript',
          children: [
            '/snippet/javascript/',
            '/snippet/javascript/javascript1',
            '/snippet/javascript/javascript2',
          ]
        },
        {
          title: 'CSS',
          children: [
            '/snippet/css/',
            '/snippet/css/css1',
            '/snippet/css/css2',
          ]
        },
      ]
    }
  }
}