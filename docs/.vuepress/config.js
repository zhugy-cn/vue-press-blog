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
      { text: 'github', link: 'https://github.com/zhugy-cn' },
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