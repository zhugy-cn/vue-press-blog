<template><h1 id="生命周期"><a class="header-anchor" href="#生命周期">#</a> 生命周期</h1>
<p><img src="@source/web/vue/images/lifecycle.png" alt="inheritAttrs: true"></p>
<h2 id="vue-生命周期的四个阶段"><a class="header-anchor" href="#vue-生命周期的四个阶段">#</a> Vue 生命周期的四个阶段</h2>
<blockquote>
<p>Vue 生命周期分为 创建、挂载、更新、销毁四个阶段：</p>
</blockquote>
<ol>
<li><code>beforeCreate</code>（创建前）：实例初始化之后，this 指向创建的实例，不能访问到 data、computed、watch、methods 上的方法和数据。用于初始化非响应式变量和显示 loading</li>
<li><code>created</code>（创建后）：可访问 data、computed、watch、methods 上的方法和数据，未挂载到 DOM，不能访问到 el 属性，refs 属性内容为空。用于简单的 ajax 请求，页面的初始化</li>
<li><code>beforeMount</code>（挂载前）：编译模板为虚拟 dom 放入到 render 函数中准备渲染，然后执行 beforeMount 钩子函数，虚拟 dom 已经创建完成，马上就要渲染，在这里也可以更改数据，不会触发其他的钩子函数，一般可以在这里做初始数据的获取，可以访问 el(挂载根节点) 但是无法访问 refs(真实节点)</li>
<li><code>mounted</code>（挂载后）：组件已经出现在页面中，数据、真实 dom 都已经处理好了,事件都已经挂载好了，可以在这里操作真实 dom 等事情。用于获取数据后操作真实的 DOM。</li>
<li><code>beforeUpdate</code>（更新前）：当组件或实例的数据更改之后，会立即执行 beforeUpdate，然后 vue 的虚拟 dom 机制会重新构建虚拟 dom 与上一次的虚拟 dom 树利用 diff 算法进行对比之后重新渲染，一般不做什么事儿</li>
<li><code>updated</code>（更新后）：当更新完成后，执行 updated，数据已经更改完成，dom 也重新 render 完成，可以操作更新后的虚拟 dom</li>
<li><code>beforeDestroy</code>（销毁前）：当经过某种途径调用$destroy 方法后，立即执行 beforeDestroy，一般在这里做一些善后工作，例如清除计时器、清除非指令绑定的事件等等</li>
<li><code>destroyed</code>（销毁后）：组件的数据绑定、监听...去掉后只剩下 dom 空壳，这个时候，执行 destroyed，在这里做善后工作也可以</li>
</ol>
<h2 id="keep-alive-钩子函数"><a class="header-anchor" href="#keep-alive-钩子函数">#</a> keep-alive 钩子函数</h2>
<p>当使用<code>keep-alive</code>包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们</p>
<p>当组件在 <code>&lt;keep-alive&gt;</code> 内被切换，它的 <code>activated</code> 和 <code>deactivated</code> 这两个生命周期钩子函数将会被对应执行。</p>
<ul>
<li>activated：keep-alive 组件激活时调用。</li>
<li>deactivated：keep-alive 组件停用时调用。</li>
</ul>
<p>注意：当引入 keep-alive 的时候，页面第一次进入，钩子的触发顺序<code>created-&gt; mounted-&gt; activated</code>，退出时触发 deactivated。当再次进入（前进或者后退）时，只触发 activated。</p>
<h2 id="组件内路由钩子函数"><a class="header-anchor" href="#组件内路由钩子函数">#</a> 组件内路由钩子函数</h2>
<ol>
<li>beforeRouteEnter(进入组件之前)：不能访问 this，因为守卫在导航确认前被调用,因此即将登场的新组件还没被创建。不过， 你可以通过传一个回调给 next 来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数。</li>
</ol>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">beforeRouteEnter</span> <span class="token punctuation">(</span><span class="token parameter">to<span class="token punctuation">,</span> <span class="token keyword">from</span><span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">next</span><span class="token punctuation">(</span><span class="token parameter">vm</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token comment">// 通过 `vm` 访问组件实例</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><ol start="2">
<li>beforeRouteUpdate(子路由切换时执行)</li>
<li>beforeRouteLeave(离开组件之前)：通常用来提示用户在未保存某些修改而后退时的提示。该导航可以通过 next(false) 来取消。</li>
</ol>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">beforeRouteLeave</span> <span class="token punctuation">(</span><span class="token parameter">to<span class="token punctuation">,</span> <span class="token keyword">from</span> <span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token string">'用户保存了'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token function">next</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h2 id="单个路由钩子函数"><a class="header-anchor" href="#单个路由钩子函数">#</a> 单个路由钩子函数</h2>
<ol>
<li>beforeEnter</li>
<li>beforeLeave</li>
</ol>
<h2 id="全局路由钩子函数"><a class="header-anchor" href="#全局路由钩子函数">#</a> 全局路由钩子函数</h2>
<ol>
<li>beforeEach（进入路由之前）：权限控制，开启进度条</li>
<li>beforeResolve（路由确认时解析守卫）</li>
<li>afterEach（进入路由之后）：关闭进度条</li>
</ol>
</template>