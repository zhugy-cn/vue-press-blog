<template><h1 id="web"><a class="header-anchor" href="#web">#</a> web</h1>
<h2 id="scoped-样式"><a class="header-anchor" href="#scoped-样式">#</a> scoped 样式</h2>
<p><a href="https://vue-loader.vuejs.org/zh/guide/scoped-css.html#%E6%B7%B1%E5%BA%A6%E4%BD%9C%E7%94%A8%E9%80%89%E6%8B%A9%E5%99%A8" target="_blank" rel="noopener noreferrer">文档<OutboundLink/></a></p>
<ol>
<li>
<p>父组件子组件都没有
父组件会覆盖子组件的样式，并且两个组件的样式都是全局的，加上<code>scoped</code>就不是全局的了</p>
</li>
<li>
<p>父组件子组件都有
父组件的样式只对子组件的根标签有效，相当于给根标签加了一个属性，根标签有两个属性，除了根标签，其它标签无效，此时可以给父组件增加<code>::v-deep</code>操作符来选择
父：.parent .child[data-v-f3a87826]
子：.child[data-v-494a948f]</p>
</li>
</ol>
<ol start="3">
<li>父组件有子组件没有
不能影响子组件样式，需要增加<code>::v-deep</code>操作符来选择
父：.parent .child[data-v-f3a87826]
子：.child
加了之后：.parent[data-v-f3a87826] .child</li>
</ol>
<ol start="4">
<li>子组件有父组件没有
父组件可以直接影响子组件，但这时父组件的样式是全局样式，可能会影响到其它页面</li>
</ol>
</template>