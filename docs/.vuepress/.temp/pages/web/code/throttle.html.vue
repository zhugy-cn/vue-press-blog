<template><h1 id="函数节流"><a class="header-anchor" href="#函数节流">#</a> 函数节流</h1>
<blockquote>
<p>在规定的时间内，无论该函数调用了多少次都只会执行一次</p>
</blockquote>
<ul>
<li>使用场景：适用于函数被频繁调用的场景
<ol>
<li>window.onresize() 事件</li>
<li>mousemove 事件</li>
<li>touchmove 事件</li>
<li>上传进度等等</li>
<li>秒杀活动，频繁点击</li>
</ol>
</li>
</ul>
<h2 id="定时器实现"><a class="header-anchor" href="#定时器实现">#</a> 定时器实现</h2>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">throttle</span><span class="token punctuation">(</span><span class="token parameter">fn<span class="token punctuation">,</span>wait</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">let</span> timer<span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>timer<span class="token punctuation">)</span><span class="token punctuation">{</span>
      timer <span class="token operator">=</span> <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span>
        timer <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token function">fn</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> arguments<span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span> wait<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><ul>
<li>缺点：第一次事件的执行也需要等待 <code>wait</code> 秒，不是立即执行</li>
<li>优点：如果停止函数调用时的时间不满足条件，当到达时间后，还是会执行一次。
例如：当<code>wait</code>设为 1s ，在 1.5s 时虽然停止了事件触发，但当到达 2s 时还是会执行一次</li>
</ul>
<h2 id="时间戳实现"><a class="header-anchor" href="#时间戳实现">#</a> 时间戳实现</h2>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">throttle</span><span class="token punctuation">(</span><span class="token parameter">fn<span class="token punctuation">,</span> wait</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> previous <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> now <span class="token operator">=</span> <span class="token operator">+</span><span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>now <span class="token operator">-</span> previous <span class="token operator">>=</span> wait<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      previous <span class="token operator">=</span> now<span class="token punctuation">;</span>
      <span class="token function">fn</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> arguments<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><ul>
<li>缺点：最后一次没有达到触发条件时，不触发最后一次</li>
<li>优点：第一次不需要等待<code>wait</code>秒，而是立即触发</li>
</ul>
<h2 id="结合"><a class="header-anchor" href="#结合">#</a> 结合</h2>
<blockquote>
<ul>
<li>综合了两者的优势，函数第一次调用能立刻执行，停止调用的时候还能再执行一次！</li>
</ul>
</blockquote>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code></code></pre><div class="line-numbers"></div></div></template>