<template><h1 id="原型链"><a class="header-anchor" href="#原型链">#</a> 原型链</h1>
<h2 id="创建对象的几种方法"><a class="header-anchor" href="#创建对象的几种方法">#</a> 创建对象的几种方法</h2>
<ul>
<li>对象字面量</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> o1 <span class="token operator">=</span> <span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token string">"o1"</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ul>
<li>Object 构造函数</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> o2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">(</span><span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token string">"o2"</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ul>
<li>构造函数</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>  <span class="token keyword">let</span> <span class="token function-variable function">M</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">'o3'</span> <span class="token punctuation">}</span>
  <span class="token keyword">let</span> <span class="token number">03</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">M</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><ul>
<li>Object.create</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> <span class="token constant">P</span> <span class="token operator">=</span> <span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token string">"o4"</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> o4 <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token constant">P</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 自身没有name属性，在原型链上，用原型链连接</span>
o4<span class="token punctuation">.</span>__proto__<span class="token punctuation">;</span> <span class="token comment">//  {name: "o4"}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="原型对象、构造函数、实例"><a class="header-anchor" href="#原型对象、构造函数、实例">#</a> 原型对象、构造函数、实例</h2>
<p><img src="@source/web/javascript/images/prototype_01.jpg" alt="inheritAttrs: true"></p>
<ul>
<li>原型对象、构造函数、实例三者的关系</li>
</ul>
<ol>
<li><code>prototype</code>：隐式原型，返回的是对象，无论在什么时候，只要创建了一个新函数，就会根据一组特定的规则为该函数创建一个<code>prototype</code>属性，这个属性指向函数的原型对象，<strong>只有函数对象才有<code>prototype</code>属性</strong>，普通对象没有</li>
</ol>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">.</span>prototype<span class="token punctuation">;</span> <span class="token comment">// undefined</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ol start="2">
<li><code>constructor</code>：构造函数，返回的是函数，在默认情况下，所有原型对象都会自动获得一个 constructor 属性，<strong>所有的值都有<code>constructor</code>属性</strong>，指向构造出自己的构造函数，如果是原始值的话内部会调用包装类</li>
</ol>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token string">"a"</span><span class="token punctuation">.</span>constructor<span class="token punctuation">;</span> <span class="token comment">// ƒ String() { [native code] }</span>
<span class="token comment">//内部调用包装类   new String('a').constructor</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><ol start="3">
<li><code>__proto__</code>：显式原型，返回的是对象，<strong>所有的值都有<code>__proto__</code>属性</strong>，指向自己构造函数的原型，如果是原始值的话内部会调用包装类</li>
</ol>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token string">"a"</span><span class="token punctuation">.</span>__proto__ <span class="token operator">===</span> <span class="token class-name">String</span><span class="token punctuation">.</span>prototype<span class="token punctuation">;</span> <span class="token comment">//  true</span>
<span class="token comment">//内部调用包装类   new String('a').__proto__</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><ol start="4">
<li>特殊：<code>null</code>跟<code>undefined</code>没有<code>prototype、constructor、__proto__</code>属性</li>
</ol>
<ul>
<li><strong>Function</strong>：每个函数被定义时都都会自动添加一个<code>constructor</code>属性，所有函数（包括系统构造函数）的<code>constructor</code>属性都指向<code>Function</code>构造函数，包括<code>Function</code>自己，也可以说所有的函数都是<code>Funtion</code>的实例</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
test<span class="token punctuation">.</span>constructor <span class="token operator">===</span> Function<span class="token punctuation">;</span> <span class="token comment">// true</span>
<span class="token class-name">Object</span><span class="token punctuation">.</span>constructor <span class="token operator">===</span> Function<span class="token punctuation">;</span> <span class="token comment">// true</span>
<span class="token class-name">Function</span><span class="token punctuation">.</span>constructor <span class="token operator">===</span> Function<span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>因为函数也是对象（特殊的对象），所以也有<code>__proto__</code>属性，但是所有函数的<code>__proto__</code>打印出来都是一个空函数，</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>test<span class="token punctuation">.</span>__proto__<span class="token punctuation">;</span> <span class="token comment">// ƒ () { [native code] }</span>
Object<span class="token punctuation">.</span>__proto__<span class="token punctuation">;</span> <span class="token comment">// ƒ () { [native code] }</span>
Function<span class="token punctuation">.</span>__proto__<span class="token punctuation">;</span> <span class="token comment">// ƒ () { [native code] }</span>
<span class="token comment">// 用console.log()打印出来的结果一样</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>由于所有的函数都是被<code>Function</code>构造出来的，所以这个空函数指向<code>Function</code>的原型对象（<code>Function.prototype</code>）,</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 但所有函数的__proto__（空函数）都指向Function.prototype</span>
test<span class="token punctuation">.</span>__proto__ <span class="token operator">===</span> <span class="token class-name">Function</span><span class="token punctuation">.</span>prototype<span class="token punctuation">;</span> <span class="token comment">// true</span>
Object<span class="token punctuation">.</span>__proto__ <span class="token operator">===</span> <span class="token class-name">Function</span><span class="token punctuation">.</span>prototype<span class="token punctuation">;</span> <span class="token comment">// true</span>
Function<span class="token punctuation">.</span>__proto__ <span class="token operator">===</span> <span class="token class-name">Function</span><span class="token punctuation">.</span>prototype<span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>其他函数的<code>prototype</code>都指向自身的原型对象，只有<code>Function</code>的<code>prototype</code>指向的是一个空函数，并且这个空函数指向自身的<code>__proto__</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>test<span class="token punctuation">.</span>prototype<span class="token punctuation">;</span> <span class="token comment">// {constructor: ƒ}</span>
<span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">;</span> <span class="token comment">// {constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …}</span>
<span class="token class-name">Function</span><span class="token punctuation">.</span>prototype<span class="token punctuation">;</span> <span class="token comment">// ƒ () { [native code] }  打印一个空函数</span>
<span class="token class-name">Function</span><span class="token punctuation">.</span>prototype <span class="token operator">===</span> Function<span class="token punctuation">.</span>__proto__<span class="token punctuation">;</span> <span class="token comment">// true 指向同一个对象</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>所以<code>Function</code>的<code>__proto__</code>和<code>prototype</code>指向的是同一块空间</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>test<span class="token punctuation">.</span>__proto__ <span class="token operator">===</span> Function<span class="token punctuation">.</span>__proto<span class="token punctuation">;</span> <span class="token comment">// true</span>
Object<span class="token punctuation">.</span>__proto__ <span class="token operator">===</span> Function<span class="token punctuation">.</span>__proto__<span class="token punctuation">;</span> <span class="token comment">// true</span>
Function<span class="token punctuation">.</span>__proto__ <span class="token operator">===</span> Function<span class="token punctuation">.</span>__proto__<span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><ul>
<li>实例是被构造函数用<code>new</code>操作符创建的</li>
<li>实例的<code>constructor</code>属性指向构造函数</li>
<li>实例的<code>__proto__</code>属性指向原型对象</li>
<li>实例没有<code>prototype</code>属性</li>
</ul>
<hr>
<ul>
<li>原型对象是构造函数被创建时自动生成的</li>
<li>原型对象的<code>constructor</code>属性指向构造函数</li>
<li>原型对象的<code>__proto__</code>属性指向下一个原型对象，终点是<code>Object.prototype</code></li>
<li>原型没有<code>prototype</code>属性</li>
</ul>
<hr>
<ul>
<li>构造函数是被<code>Function</code>用<code>new</code>操作符创建的</li>
<li>构造函数的<code>constructor</code>指向<code>Function</code></li>
<li>构造函数的<code>__proto__</code>指向<code>Function</code>的原型对象(<strong>是一个函数</strong>)</li>
<li>构造函数的<code>prototype</code>属性指向自己的原型对象</li>
</ul>
<hr>
<ul>
<li><code>Function</code>是被自己创建出来的</li>
<li><code>Function</code>的<code>constructor</code>属性指的就是自己</li>
<li><code>Function</code>的<code>__proto__</code>指向自己的原型（<strong>因为是被自己创建出来的，所以指向的是自己</strong>）</li>
<li><code>Function</code>的<code>prototype</code>指向一个函数，这个函数的<strong>proto</strong>指向<code>Object.prototype</code></li>
</ul>
<hr>
<ul>
<li><code>Object构造函数</code>是被<code>Function</code>用<code>new</code>操作符创建的</li>
<li><code>Object</code>的<code>constructor</code>指向<code>Function</code></li>
<li><code>Object</code>的<code>__proto__</code>指向<code>Function</code>的原型对象(<strong>是一个函数</strong>)</li>
<li><code>Object</code>的<code>prototype</code>属性指向自己的原型对象,<strong>也是所有原型链的终点</strong></li>
</ul>
<p><img src="@source/web/javascript/images/prototype_02.png" alt="inheritAttrs: true"></p>
<h2 id="instanceof-原理"><a class="header-anchor" href="#instanceof-原理">#</a> instanceof 原理</h2>
<ul>
<li>用来测试一个对象在其原型链中是否存在一个构造函数的 prototype 属性。</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token constant">A</span> <span class="token keyword">instanceof</span> <span class="token class-name">B</span>   判断 <span class="token constant">A</span> 对象的原型链上有没有 <span class="token constant">B</span> 的原型对象
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ul>
<li>判断一个值是不是一个数组</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token keyword">instanceof</span> <span class="token class-name">Array</span><span class="token punctuation">;</span> <span class="token comment">//  ture</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ul>
<li>虽然返回了 true 但是<code>instanceof</code>不严谨</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token keyword">instanceof</span> <span class="token class-name">Object</span><span class="token punctuation">;</span> <span class="token comment">// 也返回true,因为Object.prototype在[]的原型链上，所以也返回了true</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ul>
<li>判断对象是不是构造函数的实例，推荐使用<code>constructor</code>来判断</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">.</span>constructor <span class="token operator">===</span> Array  <span class="token comment">// true</span>
<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">.</span>constructor <span class="token operator">===</span> Object  <span class="token comment">// false</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="new-运算符"><a class="header-anchor" href="#new-运算符">#</a> new 运算符</h2>
<ol>
<li>
<p>一个新对象被创建，他继承自 foo.prototype</p>
</li>
<li>
<p>将构造函数的作用域符给新对象，也就是 this 指向了这个新对象</p>
</li>
<li>
<p>执行构造函数中的代码（为这个新对象添加属性）</p>
</li>
<li>
<p>返回这个新对象</p>
</li>
</ol>
<p>**注意：**new foo 等同于 new foo()，但只能在不传递任何参数的情况下使用。因为构造函数默认返回这个新对象，所以如果手动返回对象的话就会取代整个 new 出来的结果</p>
</template>