<template><h1 id="promise"><a class="header-anchor" href="#promise">#</a> Promise</h1>
<h2 id="是什么"><a class="header-anchor" href="#是什么">#</a> 是什么</h2>
<ol>
<li>主要用于异步计算</li>
<li>可以将异步操作队列化，按照期望的顺序执行，返回符合预期的结果</li>
<li>可以在对象之间传递和操作 Promise，帮助我们处理队列</li>
</ol>
<h2 id="示例"><a class="header-anchor" href="#示例">#</a> 示例</h2>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span>
  <span class="token comment">// 执行器</span>
  <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 数据处理完成</span>

    <span class="token function">reject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 数据处理出错</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>
  <span class="token keyword">function</span> <span class="token constant">A</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 成功，下一步</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token keyword">function</span> <span class="token constant">B</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 失败，做相应处理</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><ul>
<li>
<p>Promise 是一个代理对象，它和原先要进行的操作并无关系，通过引入一个回调，避免更多的回调</p>
</li>
<li>
<p>Promise 有三个状态:</p>
<ul>
<li>pending [待定] 初始状态 实例化</li>
<li>fulfilled [实现] 操作成功 调用 resolve</li>
<li>rejected [被否决] 操作失败 调用 reject</li>
</ul>
</li>
<li>
<p>Promise 状态发生改变，就会触发.then()里的响应函数处理后续步骤</p>
</li>
<li>
<p>Promise 状态一经改变，不会再变</p>
</li>
</ul>
<h2 id="then"><a class="header-anchor" href="#then">#</a> .then()</h2>
<ul>
<li>.then()接受两个函数作为参数，分别代表 fulfilled 和 rejected</li>
<li>.then()返回一个新的 Promise 实例，所以它可以链式调用</li>
<li>当前面的 Promise 状态改变时，.then()根据其最终状态，选择特定的状态响应函数执行</li>
<li>状态响应函数可以返回新的 Promise 或其他值</li>
<li>如果返回新的 Promise，那么下一级.then()会在新的 Promise 状态改变后执行</li>
<li>如果返回的时其他的任何值，则会立刻执行下一级.then()</li>
</ul>
<h2 id="then-里有-then-的情况"><a class="header-anchor" href="#then-里有-then-的情况">#</a> .then()里有.then()的情况</h2>
<ul>
<li>因为.then()返回的还是 Promise 实例</li>
<li>会等里面的.then()执行完，再执行外面的</li>
<li>对于我们来说，此时最好将其展开，会更好读</li>
</ul>
<h2 id="promise-all"><a class="header-anchor" href="#promise-all">#</a> Promise.all()</h2>
<ul>
<li>它接受一个数组作为参数</li>
<li>数组里可以是 Promise 对象，也可以是别的值，只有 Promise 会等待状态改变</li>
<li>当所有子 Promise 都完成，该 Promise 完成，返回值是全部值的数组</li>
<li>有任何一个失败，改 Promise 失败，返回值是第一个失败的子 Promise 的结果</li>
</ul>
</template>