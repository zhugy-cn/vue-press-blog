<template><h1 id="js-的执行过程"><a class="header-anchor" href="#js-的执行过程">#</a> JS 的执行过程</h1>
<h2 id="一、基本概念"><a class="header-anchor" href="#一、基本概念">#</a> 一、基本概念</h2>
<blockquote>
<p><code>JS</code>是单线程语言，一个页面永远只有一个线程在执行 js 脚本代码<br>
<code>JS</code>是异步执行的，通过<code>事件循环（Event Loop）</code>的方式实现</p>
</blockquote>
<h3 id="_1、为什么是单线程"><a class="header-anchor" href="#_1、为什么是单线程">#</a> 1、为什么是单线程</h3>
<ul>
<li>
<p>防止当两个线程同时操作一个<code>DOM</code>时，会发生矛盾，</p>
</li>
<li>
<p>为了利用多核 CPU 的计算能力，HTML5 提出 Web Worker 标准，允许 JavaScript 脚本创建多个线程，但是子线程完全受主线程控制，且不得操作 DOM。所以，这个新标准并没有改变 JavaScript 单线程的本质。</p>
</li>
<li>
<p>虽然<code>JS</code>是单线程，但是浏览器总共开了四个线程参与了<code>JS</code>的执行，其他三个只是辅助，不参与解析与执行：</p>
<ol>
<li>JS 引擎线程（主线程，只有这个线程负责解析和执行 JS 代码）</li>
<li>事件触发线程</li>
<li>定时器触发线程</li>
<li>HTTP 异步请求线程</li>
</ol>
</li>
</ul>
<p><strong>永远只有 JS 引擎线程在执行 JS 脚本程序，其他三个线程只负责将满足触发条件的处理函数推进任务队列，等待 JS 引擎线程执行。</strong></p>
<h3 id="_2、什么需要异步操作事件"><a class="header-anchor" href="#_2、什么需要异步操作事件">#</a> 2、什么需要异步操作事件</h3>
<p>由于<code>JS</code>是单线程的，一次只能执行一个任务，所以这些任务形成一个任务队列排队等候执行；</p>
<p>但是前端的某些任务是非常耗时的，比如网络请求，定时器和事件监听，如果让他们和别的任务一样排队等待执行的话，执行效率会非常的低，甚至导致页面的假死；</p>
<p>所以浏览器为这些耗时任务开辟了另外的线程，挂起处于等待中的任务，先运行排在后面的任务，当等待中的任务返回结果后再由主线程执行</p>
<h3 id="_3、js-怎么通过单线程实现异步的"><a class="header-anchor" href="#_3、js-怎么通过单线程实现异步的">#</a> 3、JS 怎么通过单线程实现异步的？</h3>
<p><code>JS</code>是通过回调函数、setTimeout 等来实现异步，通过<strong>事件循环</strong>（Event Loop）机制来执行这些异步操作</p>
<h2 id="二、js-引擎的执行过程"><a class="header-anchor" href="#二、js-引擎的执行过程">#</a> 二、JS 引擎的执行过程</h2>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>fun<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 报错</span>

  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 不执行</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// undefined</span>

  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>fun<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// fn</span>

  <span class="token keyword">var</span> person <span class="token operator">=</span> <span class="token string">"Eric"</span><span class="token punctuation">;</span>

  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Eric</span>

  <span class="token keyword">function</span> <span class="token function">fun</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// undefined</span>
    <span class="token keyword">var</span> person <span class="token operator">=</span> <span class="token string">"Tom"</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Tom</span>
  <span class="token punctuation">}</span>

  <span class="token function">fun</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Eric</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><ul>
<li>
<p>从以上的示例得出，<code>JS</code>引擎的执行过程分为三个阶段：</p>
<ol>
<li>
<p><strong>语法分析阶段</strong>： 分别对加载完成的代码块进行语法检验</p>
<ul>
<li>语法正确则进入预编译阶段；</li>
<li>不正确则<strong>停止</strong>该代码块的执行，查找下一个代码块并进行加载</li>
</ul>
</li>
<li>
<p><strong>预编译阶段</strong>：通过语法分析阶段后，进入预编译阶段</p>
<ul>
<li>则创建变量对象（创建<code>arguments</code>对象（函数运行环境下），函数声明提前解析，变量声明提升），确定作用域链以及<code>this</code>指向。</li>
</ul>
</li>
<li>
<p><strong>执行阶段</strong></p>
</li>
</ol>
</li>
</ul>
<h3 id="_1、语法分析阶段"><a class="header-anchor" href="#_1、语法分析阶段">#</a> 1、语法分析阶段</h3>
<ul>
<li>js 脚本代码块加载完毕后，会首先进入语法分析阶段。该阶段主要作用是：</li>
</ul>
<blockquote>
<p>分析该 js 脚本代码块的语法是否正确，如果出现不正确，则向外抛出一个语法错误（SyntaxError），停止该 js 代码块的执行，然后继续查找并加载下一个代码块；如果语法正确，则进入预编译阶段</p>
</blockquote>
<ul>
<li>语法错误报错如下图：</li>
</ul>
<p><img src="@source/web/javascript/images/executing-01.jpg" alt="inheritAttrs: true"></p>
<h3 id="_2、预编译阶段"><a class="header-anchor" href="#_2、预编译阶段">#</a> 2、预编译阶段</h3>
<ul>
<li>
<p><code>js</code>代码块通过语法分析阶段后，语法正确则进入预编译阶段。在分析预编译阶段之前，我们先了解一下<code>js</code>的<code>运行环境</code>，运行环境主要有三种：</p>
<ol>
<li>
<p><strong>全局环境</strong>：<code>JS</code>代码加载完毕后，进入代码预编译即进入全局环境</p>
</li>
<li>
<p><strong>函数环境</strong>：函数调用执行时，进入该函数环境，不同的函数则函数环境不同</p>
</li>
<li>
<p><strong>eval</strong>：不建议使用，会有安全，性能等问题</p>
</li>
</ol>
</li>
</ul>
<p>每进入一个不同的运行环境都会创建一个相应的<strong>执行上下文（Execution Context）</strong></p>
<p>那么在一段<code>JS</code>程序中一般都会创建多个执行上下文</p>
<p><code>js</code>引擎会以栈的方式对这些执行上下文进行处理，形成<strong>函数调用栈（call stack）</strong></p>
<p>栈底永远是<strong>全局执行上下文（Global Execution Context）</strong>，栈顶则永远是<strong>当前执行上下文</strong></p>
<h4 id="_2-1、函数调用栈"><a class="header-anchor" href="#_2-1、函数调用栈">#</a> <strong>2.1、函数调用栈</strong></h4>
<blockquote>
<p>函数调用栈就是使用栈存取的方式进行管理运行环境，特点是先进后出，后进先出。</p>
</blockquote>
<ul>
<li>示例一</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">i</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"begin:"</span> <span class="token operator">+</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">foo</span><span class="token punctuation">(</span>i <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"end:"</span> <span class="token operator">+</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">foo</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 输出:</span>
<span class="token comment">// begin:2</span>
<span class="token comment">// begin:1</span>
<span class="token comment">// begin:0</span>
<span class="token comment">// end:0</span>
<span class="token comment">// end:1</span>
<span class="token comment">// end:2</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>图解：</p>
<p><img src="@source/web/javascript/images/executing_02.png" alt="inheritAttrs: true"></p>
<ul>
<li>示例二</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> B_context <span class="token operator">=</span> <span class="token string">"Bar EC"</span><span class="token punctuation">;</span>

  <span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> f_context <span class="token operator">=</span> <span class="token string">"foo EC"</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><ul>
<li>上面的代码块通过语法分析后，进入预编译阶段，如下图：</li>
</ul>
<p><img src="@source/web/javascript/images/executing_03.png" alt="inheritAttrs: true"></p>
<ul>
<li>步骤</li>
</ul>
<ol>
<li>
<p>首先进入全局环境，创建<code>全局执行上下文</code>（Global Execution Context），推入<code>stack</code>栈中</p>
</li>
<li>
<p>调用<code>bar</code>函数，进入<code>bar</code>函数运行环境，创建<code>bar函数执行上下文</code>（bar Execution Context），推入<code>stack</code>栈中</p>
</li>
<li>
<p>在<code>bar</code>函数内部调用<code>foo</code>函数，则再进入<code>foo</code>函数运行环境，创建<code>foo函数执行上下文</code>（foo Execution Context），推入<code>stack</code>栈中、</p>
</li>
<li>
<p>此刻栈底是<code>全局执行上下文</code>（Global Execution Contex），栈顶是<code>foo函数执行上下文</code>（foo Execution Context），如上图，由于<code>foo</code>函数内部没有再调用其他函数，那么则开始出栈，否则内部的函数继续执行入栈</p>
</li>
<li>
<p><code>foo</code>函数执行完毕后，栈顶<code>foo函数执行上下文</code>（foo Execution Context）首先出栈</p>
</li>
<li>
<p><code>bar</code>函数执行完毕，<code>bar函数执行上下文</code>（bar Execution Context）出栈</p>
</li>
<li>
<p><code>全局执行上下文</code>（Global Execution Context）则在浏览器或者该标签页关闭时出栈。</p>
</li>
</ol>
<p>注：不同的运行环境执行都会进入代码预编译和执行两个阶段，语法分析则在代码块加载完毕时统一检验语法</p>
<br>
<h4 id="_2-2、创建执行上下文"><a class="header-anchor" href="#_2-2、创建执行上下文">#</a> <strong>2.2、创建执行上下文</strong></h4>
<blockquote>
<p>执行上下文可理解为当前的执行环境，与该运行环境相对应。创建执行上下文的过程中，主要做了以下三件事件，如图：</p>
</blockquote>
<p><img src="@source/web/javascript/images/executing_04.png" alt="inheritAttrs: true"></p>
<ol>
<li>
<p>创建变量对象（Variable Object）</p>
</li>
<li>
<p>建立作用域链（Scope Chain）</p>
</li>
<li>
<p>确定 this 的指向</p>
</li>
</ol>
<h5 id="创建变量对象-variable-object"><a class="header-anchor" href="#创建变量对象-variable-object">#</a> 创建变量对象（Variable Object）</h5>
<ul>
<li>创建变量对象主要经过以下几个过程，如图：</li>
</ul>
<p><img src="@source/web/javascript/images/executing_05.png" alt="inheritAttrs: true"></p>
<ol>
<li>
<p>创建<strong>arguments 对象</strong>，检查当前上下文中的参数，建立该对象的属性与属性值，仅在函数环境(非箭头函数)中进行，全局环境没有此过程</p>
</li>
<li>
<p>检查当前上下文的<strong>函数声明</strong>，按代码顺序查找，将找到的函数提前声明，如果当前上下文的变量对象没有该函数名属性，则在该变量对象以函数名建立一个属性，属性值则为指向该函数所在堆内存地址的引用，如果存在，则会被新的引用覆盖。</p>
</li>
<li>
<p>检查当前上下文的<strong>变量声明</strong>，按代码顺序查找，将找到的变量提前声明，如果当前上下文的变量对象没有该变量名属性，则在该变量对象以变量名建立一个属性，属性值为<strong>undefined</strong>；如果存在，则忽略该变量声明</p>
</li>
</ol>
<p>注：在全局环境中，<code>window</code>对象就是全局执行上下文的变量对象，所有的变量和函数都是<code>window</code>对象的属性方法。</p>
<p>所有函数声明提升和变量声明提升是在创建变量对象中进行的，且函数声明优先级高于变量声明。</p>
<ul>
<li>示例：</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">fun</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> num <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>

  <span class="token keyword">function</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token function">fun</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><ul>
<li>这里我们在全局环境调用<code>fun</code>函数，创建<code>fun</code>执行上下文，这里为了方便大家理解，暂时不讲解作用域链以及<code>this</code>指向，如下：</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>funEC <span class="token operator">=</span> <span class="token punctuation">{</span>		<span class="token comment">// fun 函数的执行上下文</span>
    <span class="token comment">//变量对象</span>
    <span class="token constant">VO</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token comment">//arguments对象</span>
        arguments<span class="token operator">:</span> <span class="token punctuation">{</span>
            a<span class="token operator">:</span> <span class="token keyword">undefined</span><span class="token punctuation">,</span>
            b<span class="token operator">:</span> <span class="token keyword">undefined</span><span class="token punctuation">,</span>
            length<span class="token operator">:</span> <span class="token number">2</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>

        <span class="token comment">//test函数</span>
        test<span class="token operator">:</span> <span class="token operator">&lt;</span>test reference<span class="token operator">></span><span class="token punctuation">,</span>

        <span class="token comment">//num变量</span>
        num<span class="token operator">:</span> <span class="token keyword">undefined</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">//作用域链</span>
    scopeChain<span class="token operator">:</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>

    <span class="token comment">//this指向</span>
    <span class="token keyword">this</span><span class="token operator">:</span> window
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><ul>
<li>
<p><code>funEC</code>表示<code>fun</code>函数的执行上下文（fun Execution Context 简写为 funEC）</p>
</li>
<li>
<p><code>funEC</code>的变量对象中<code>arguments</code>属性，上面的写法仅为了方便大家理解，但是在浏览器中展示是以类数组的方式展示的</p>
</li>
<li>
<p><code>&lt;test reference&gt;</code>表示<code>test</code>函数在堆内存地址的引用</p>
</li>
</ul>
<p>注意：创建变量对象发生在预编译阶段，但尚未进入执行阶段，该变量对象都是不能访问的</p>
<p>因为此时的变量对象中的变量属性尚未赋值，值仍为<code>undefined</code>，只有进入执行阶段，才会对变量对象中的变量属性进行赋值</p>
<p>变量对象（Variable Object）转为活动对象（Active Object）后，才能进行访问，这个过程就是<strong>VO –&gt; AO</strong>过程。</p>
<h5 id="建立作用域链"><a class="header-anchor" href="#建立作用域链">#</a> 建立作用域链</h5>
<p>作用域链由当前执行环境的<strong>变量对象（VO）</strong>（未进入执行阶段前）与上层环境的一系列**活动对象（AO）**组成，它保证了当前执行环境对符合访问权限的变量和函数的有序访问。</p>
<ul>
<li>示例：</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> num <span class="token operator">=</span> <span class="token number">30</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>

  <span class="token keyword">function</span> <span class="token function">innerTest</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token number">20</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">innerTest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>在上面的例子中，当执行到调用<code>innerTest</code>函数，进入<code>innerTest</code>函数环境。</p>
<p>全局执行上下文和<code>test</code>函数执行上下文已进入执行阶段</p>
<p><code>innerTest</code>函数执行上下文在预编译阶段创建变量对象，所以他们的活动对象和变量对象分别是<code>AO(global)</code>，<code>AO(test)</code>和<code>VO(innerTest)</code></p>
<p>而<code>innerTest</code>的作用域链由当前执行环境的变量对象（未进入执行阶段前）与上层环境的一系列活动对象组成，如下：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>innerTestEC <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">//变量对象</span>
  <span class="token constant">VO</span><span class="token operator">:</span> <span class="token punctuation">{</span> b<span class="token operator">:</span> <span class="token keyword">undefined</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>

  <span class="token comment">//作用域链</span>
  scopeChain<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token constant">VO</span><span class="token punctuation">(</span>innerTest<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token constant">AO</span><span class="token punctuation">(</span>test<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token constant">AO</span><span class="token punctuation">(</span>global<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span>

  <span class="token comment">//this指向</span>
  <span class="token keyword">this</span><span class="token operator">:</span> window
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>我们这里直接使用数组表示作用域链，作用域链的<strong>活动对象</strong>或<strong>变量对象</strong>可以直接理解为<strong>作用域</strong>。</p>
<ul>
<li>
<p>作用域链的第一项永远是当前作用域（当前上下文的变量对象或活动对象）；</p>
</li>
<li>
<p>最后一项永远是全局作用域（全局执行上下文的活动对象）；</p>
</li>
<li>
<p>作用域链保证了变量和函数的有序访问，查找方式是沿着作用域链从左至右查找变量或函数，找到则会停止查找，找不到则一直查找到全局作用域，再找不到则会抛出引用错误。</p>
</li>
</ul>
<blockquote>
<p>在这里我们顺便思考一下，什么是<strong>闭包</strong>？</p>
</blockquote>
<p>示例：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> num <span class="token operator">=</span> <span class="token number">20</span><span class="token punctuation">;</span>
  <span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> result <span class="token operator">=</span> num <span class="token operator">+</span> <span class="token number">20</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> result<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><ul>
<li>因为对于闭包有很多不同的理解，这里以浏览器理解的闭包来分析闭包，如下图：</li>
</ul>
<p><img src="@source/web/javascript/images/executing_06.png" alt="inheritAttrs: true"></p>
<ul>
<li>如上图所示，chrome 浏览器理解闭包是 foo，那么按浏览器的标准是如何定义闭包的，总结为三点：</li>
</ul>
<ol>
<li>
<p><strong>在函数内部定义新函数</strong></p>
</li>
<li>
<p><strong>新函数访问外层函数的局部变量，即访问外层函数环境的活动对象属性</strong></p>
</li>
<li>
<p><strong>新函数执行，创建新的函数执行上下文，外层函数即为闭包</strong></p>
</li>
</ol>
<ul>
<li>
<p>闭包的优点</p>
<ol>
<li>
<p>实现公有变量： eg：函数累加器</p>
</li>
<li>
<p>可以做缓存（存储结构）：eg:eater</p>
</li>
<li>
<p>可以实现封装，属性私有化：eg:new Person();</p>
</li>
<li>
<p>模块化开发，防止污染全局变量</p>
</li>
</ol>
</li>
</ul>
<ul>
<li>闭包的缺点
<ol>
<li>由于闭包携带包含它函数的作用域，因此比其他函数占用的内存更多，如果使用不当容易造成泄露内存；</li>
</ol>
</li>
</ul>
<h5 id="确定-this-指向"><a class="header-anchor" href="#确定-this-指向">#</a> 确定 this 指向</h5>
<p>在全局环境下，全局执行上下文中变量对象的 this 属性指向为 window；函数环境下的 this 指向却较为灵活，需根据执行环境和执行方法确定</p>
<h3 id="_3、执行阶段-异步循环"><a class="header-anchor" href="#_3、执行阶段-异步循环">#</a> <strong>3、执行阶段（异步循环）</strong></h3>
<p>示例：<a href="https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/" target="_blank" rel="noopener noreferrer">来源<OutboundLink/></a></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"script start"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"setTimeout"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"promise1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"promise2"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"script end"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><ul>
<li>
<p>宏任务（macro-task）：主代码块、setTimeout、setInterval 等，宏任务又按执行顺序分为同步任务和异步任务</p>
<ul>
<li>
<p>同步任务</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"script start"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"script end"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></li>
<li>
<p>异步任务</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"setTimeout"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div></li>
</ul>
</li>
<li>
<p>微任务（micro-task）：Promise、process.nextTick 等</p>
</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"promise1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"promise2"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><ul>
<li>执行顺序：</li>
</ul>
<blockquote>
<p>宏任务(同步任务) --&gt; 微任务 --&gt; 宏任务(异步任务)</p>
</blockquote>
<ul>
<li>输出结果：</li>
</ul>
<blockquote>
<p>script start<br>
script end<br>
promise1<br>
promise2<br>
setTimeout</p>
</blockquote>
<ul>
<li>在 ES6 或 Node 环境中，JS 的任务分为两种，分别是宏任务（macro-task）和微任务（micro-task），在最新的 ECMAScript 中，微任务称为 jobs，宏任务称为 task</li>
</ul>
<h4 id="宏任务"><a class="header-anchor" href="#宏任务">#</a> 宏任务</h4>
<p>宏任务（macro-task）可分为同步任务和异步任务：</p>
<ul>
<li>
<p>同步任务：在 JS 引擎主线程上按顺序执行的任务，只有前一个任务执行完毕后，才能执行后一个任务，形成一个执行栈（函数调用栈）。</p>
</li>
<li>
<p>异步任务：不直接进入 JS 引擎主线程，而是满足触发条件时，相关的线程将该异步任务推进<strong>任务队列(task queue)</strong>，等待 JS 引擎主线程上的任务执行完毕，空闲时读取执行的任务，例如异步 Ajax，DOM 事件，setTimeout 等。</p>
</li>
</ul>
<p>理解宏任务中同步任务和异步任务的执行顺序，那么就相当于理解了 JS 异步执行机制–事件循环（Event Loop）。</p>
<h4 id="事件循环"><a class="header-anchor" href="#事件循环">#</a> 事件循环</h4>
<ul>
<li>
<p>事件循环可以理解成由三部分组成，分别是：</p>
<ol>
<li>
<p><strong>主线程执行栈</strong></p>
</li>
<li>
<p><strong>异步任务等待触发</strong>：浏览器为异步任务单独开辟的几个线程可以统一理解为<code>WebAPIs</code></p>
</li>
<li>
<p><strong>异步任务队列</strong>：以队列的数据结构对事件任务进行管理，特点是先进先出，后进后出。</p>
</li>
</ol>
</li>
</ul>
<p><img src="@source/web/javascript/images/executing_07.png" alt="inheritAttrs: true"></p>
<ul>
<li>
<p>在 JS 引擎主线程执行过程中：</p>
<ol>
<li>
<p>首先执行宏任务的同步任务，在主线程上形成一个执行栈，可理解为函数调用栈；</p>
</li>
<li>
<p>当执行栈中的函数调用到一些异步执行的 API（例如异步 Ajax，DOM 事件，setTimeout 等 API），则会开启对应的线程（Http 异步请求线程，事件触发线程和定时器触发线程）进行监控和控制</p>
</li>
<li>
<p>当异步任务的事件满足触发条件时，对应的线程则会把该事件的处理函数推进任务队列(task queue)中，等待主线程读取执行</p>
</li>
<li>
<p>当 JS 引擎主线程上的任务执行完毕，则会读取任务队列中的事件，将任务队列中的事件任务推进主线程中，按任务队列顺序执行</p>
</li>
<li>
<p>当 JS 引擎主线程上的任务执行完毕后，则会再次读取任务队列中的事件任务，如此循环，这就是事件循环（Event Loop）的过程</p>
</li>
</ol>
</li>
</ul>
<ul>
<li>示例：</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"script start"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"setTimeout"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"script end"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><ul>
<li>代码执行过程：</li>
</ul>
<ol>
<li>
<p>JS 引擎主线程按代码顺序执行，当执行到 console.log('script start');，JS 引擎主线程认为该任务是同步任务，所以立刻执行输出 script start，然后继续向下执行；</p>
</li>
<li>
<p>JS 引擎主线程执行到<code>setTimeout(function() { console.log('setTimeout'); }, 0);</code>，JS 引擎主线程认为 setTimeout 是<strong>异步任务</strong>API，则向浏览器内核进程申请开启定时器线程进行计时和控制该 setTimeout 任务。由于 W3C 在 HTML 标准中规定 setTimeout 低于 4ms 的时间间隔算为 4ms，那么当计时到 4ms 时，定时器线程就把该回调处理函数推进任务队列中等待主线程执行，然后 JS 引擎主线程继续向下执行</p>
</li>
<li>
<p>JS 引擎主线程执行到 console.log('script end');，JS 引擎主线程认为该任务是同步任务，所以立刻执行输出 script end</p>
</li>
<li>
<p>JS 引擎主线程上的任务执行完毕（输出 script start 和 script end）后，主线程空闲，则开始读取任务队列中的事件任务，将该任务队里的事件任务推进主线程中，按任务队列顺序执行，最终输出 setTimeout，所以输出的结果顺序为 script start script end setTimeout</p>
</li>
</ol>
<blockquote>
<p>使用 setTimeout 模拟实现 setInterval，会有区别吗？</p>
</blockquote>
<ul>
<li>
<p>答案肯定是由区别的，我们不妨思考一下：</p>
<ol>
<li>
<p>setTimeout 实现 setInterval 只能通过递归调用</p>
</li>
<li>
<p>setTimeout 是在到了指定时间的时候就把事件推到任务队列中，只有当在任务队列中的 setTimeout 事件被主线程执行后，才会继续再次在到了指定时间的时候把事件推到任务队列，那么 setTimeout 的事件执行肯定比指定的时间要久，具体相差多少跟代码执行时间有关</p>
</li>
<li>
<p>setInterval 则是每次都精确的隔一段时间就向任务队列推入一个事件，无论上一个 setInterval 事件是否已经执行，所以有可能存在 setInterval 的事件任务累积，导致 setInterval 的代码重复连续执行多次，影响页面性能。</p>
</li>
</ol>
</li>
</ul>
<p>使用 setTimeout 或者 requestAnimationFrame 实现计时功能是比 setInterval 性能更好的</p>
<h4 id="微任务"><a class="header-anchor" href="#微任务">#</a> 微任务</h4>
<p>微任务是在 es6 和 node 环境中出现的一个任务类型</p>
<p>如果不考虑 es6 和 node 环境的话，我们只需要理解宏任务事件循环的执行过程就已经足够了</p>
<p>但是到了 es6 和 node 环境，我们就需要理解微任务的执行顺序了</p>
<p>微任务（micro-task）的 API 主要有：Promise，process.nextTick</p>
<ul>
<li>流程图：</li>
</ul>
<p><img src="@source/web/javascript/images/executing_08.png" alt="inheritAttrs: true"></p>
<p>在宏任务中执行的任务有两种，分别是<strong>同步任务</strong>和<strong>异步任务</strong>，因为异步任务会在满足触发条件时才会推进任务队列（task queue），然后等待主线程上的任务执行完毕，再读取任务队列中的任务事件，最后推进主线程执行，所以这里将异步任务即任务队列看作是<strong>新的宏任务</strong>。执行的过程如上图所示：</p>
<ol>
<li>
<p>执行宏任务中同步任务，执行结束；</p>
</li>
<li>
<p>检查是否存在可执行的微任务，有的话执行所有微任务，然后读取任务队列的任务事件，推进主线程形成新的宏任务；没有的话则读取任务队列的任务事件，推进主线程形成新的宏任务</p>
</li>
<li>
<p>执行新宏任务的事件任务，再检查是否存在可执行的微任务，如此不断的重复循环</p>
</li>
</ol>
<p>示例：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"script start"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"setTimeout"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"promise1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"promise2"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"script end"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>输出结果为：</p>
<blockquote>
<p>script start<br>
script end<br>
promise1<br>
promise2<br>
setTimeout</p>
</blockquote>
<ul>
<li>执行过程：</li>
</ul>
<ol>
<li>
<p>代码块通过语法分析和预编译后，进入执行阶段，当 JS 引擎主线程执行到<code>console.log('script start')</code>;，JS 引擎主线程认为该任务是<strong>同步任务</strong>，所以立刻执行输出 script start，然后继续向下执行；</p>
</li>
<li>
<p>JS 引擎主线程执行到<code>setTimeout(function() { console.log('setTimeout'); }, 0)</code>;，JS 引擎主线程认为 setTimeout 是<strong>异步任务 API</strong>，则向浏览器内核进程申请开启定时器线程进行计时和控制该 setTimeout 任务。由于 W3C 在 HTML 标准中规定 setTimeout 低于 4ms 的时间间隔算为 4ms，那么当计时到 4ms 时，定时器线程就把该回调处理函数推进任务队列中等待主线程执行，然后 JS 引擎主线程继续向下执行</p>
</li>
<li>
<p>JS 引擎主线程执行到<code>Promise.resolve().then(function() { console.log('promise1'); }).then(function() { console.log('promise2'); });</code>，JS 引擎主线程认为 Promise 是一个<strong>微任务</strong>，这把该任务划分为微任务，等待执行</p>
</li>
<li>
<p>JS 引擎主线程执行到<code>console.log('script end')</code>;，JS 引擎主线程认为该任务是<strong>同步任务</strong>，所以立刻执行输出 script end</p>
</li>
<li>
<p>主线程上的宏任务执行完毕，则开始检测是否存在可执行的微任务，检测到一个<strong>Promise 微任务</strong>，那么立刻执行，输出 promise1 和 promise2</p>
</li>
<li>
<p>微任务执行完毕，主线程开始读取任务队列中的事件任务 setTimeout，推入主线程形成<strong>新宏任务</strong>，然后在主线程中执行，输出 setTimeout</p>
</li>
</ol>
<h4 id="总结"><a class="header-anchor" href="#总结">#</a> 总结</h4>
<ul>
<li>
<p>主线程执行一个<strong>同步宏任务</strong>，过程中如果遇到<strong>异步宏任务</strong>，就交给浏览器其他线程处理，当满足事件触发条件时就把该回调处理函数推进<strong>任务队列</strong>中等待主线程执行。</p>
</li>
<li>
<p>如果遇到<strong>微任务</strong>，就放入微任务事件队列中，等待执行。</p>
</li>
<li>
<p>当前<strong>同步宏任务</strong>执行完成后，会查找<strong>微任务</strong>的事件队列，将全部的微任务依次执行完，再去读取任务队列中的<strong>异步宏任务</strong>，推入主线程形成<strong>新宏任务</strong>，然后在主线程中执行。</p>
</li>
<li>
<p>执行顺序：<strong>同步宏任务 → 微任务 promise→ 微任务 process.nextTick→ 异步宏任务</strong></p>
</li>
</ul>
<p>需要注意的是：在 node 环境下，process.nextTick 的优先级高于 promise。也就是可以简单理解为，在宏任务结束后会先执行微任务队列中的 nextTickQueue 部分，然后才会执行微任务中的 promise 部分。</p>
<h4 id="参考文献"><a class="header-anchor" href="#参考文献">#</a> 参考文献</h4>
<ul>
<li>
<p><a href="https://www.cnblogs.com/woodyblog/p/6061671.html" target="_blank" rel="noopener noreferrer">js 的单线程和异步<OutboundLink/></a></p>
</li>
<li>
<p><a href="https://heyingye.github.io/2018/03/19/js%E5%BC%95%E6%93%8E%E7%9A%84%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B%EF%BC%88%E4%B8%80%EF%BC%89/#%E5%88%9B%E5%BB%BA%E6%89%A7%E8%A1%8C%E4%B8%8A%E4%B8%8B%E6%96%87" target="_blank" rel="noopener noreferrer">js 引擎的执行过程<OutboundLink/></a></p>
</li>
</ul>
</template>