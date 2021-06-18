<template><h1 id="搭建-ui-库"><a class="header-anchor" href="#搭建-ui-库">#</a> 搭建 UI 库</h1>
<h2 id="规划目录结构"><a class="header-anchor" href="#规划目录结构">#</a> 规划目录结构</h2>
<h3 id="创建项目"><a class="header-anchor" href="#创建项目">#</a> 创建项目</h3>
<ul>
<li>安装 <code>vue-cli3</code>，执行命令 <code>vue create vue-ui</code>，创建一个空项目</li>
</ul>
<h3 id="调整目录"><a class="header-anchor" href="#调整目录">#</a> 调整目录</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">...</span>
<span class="token operator">|</span><span class="token operator">--</span> examples      <span class="token comment">// 新增 examples 用于示例展示</span>
<span class="token operator">|</span><span class="token operator">--</span> packages      <span class="token comment">// 新增 packages 用于编写存放组件</span>
<span class="token operator">...</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h2 id="配置项目"><a class="header-anchor" href="#配置项目">#</a> 配置项目</h2>
<p>通过上一步的目录改造后，会遇到两个问题。</p>
<ol>
<li>新增<code>examples</code>示例不能运行</li>
<li>新增<code>packages</code>目录，该目录未加入<code>webpack</code>编译</li>
</ol>
<p><strong>注：cli3 提供一个可选的 <code>vue.config.js</code> 配置文件。如果这个文件存在则他会被自动加载，所有的对项目和<code>webpack</code>的配置，都在这个文件中。</strong></p>
<h3 id="解决第一个问题"><a class="header-anchor" href="#解决第一个问题">#</a> 解决第一个问题</h3>
<ul>
<li>新建 <code>vue.config.js</code></li>
<li>使用 <code>vue.config.js</code> 中的 <code>pages</code> 选项构建一个多页面的应用，将入口修改到<code>examples</code></li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// 修改 pages 入口</span>
  pages<span class="token operator">:</span> <span class="token punctuation">{</span>
    index<span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token comment">// page 的入口</span>
      entry<span class="token operator">:</span> <span class="token string">'examples/main.js'</span><span class="token punctuation">,</span>
      <span class="token comment">// 模板来源</span>
      template<span class="token operator">:</span> <span class="token string">'public/index.html'</span><span class="token punctuation">,</span>
      <span class="token comment">// 在 dist/index.html 的输出</span>
      filename<span class="token operator">:</span> <span class="token string">"index.html"</span> <span class="token comment">// 输出文件</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h3 id="解决第二个问题"><a class="header-anchor" href="#解决第二个问题">#</a> 解决第二个问题</h3>
<ul>
<li><code>packages</code> 是我们新增的一个目录，默认是不被 <code>webpack</code> 处理的，所以需要添加配置对该目录的支持。</li>
<li><code>chainWebpack</code> 是一个函数，会接收一个基于 <code>webpack-chain</code> 的 <code>ChainableConfig</code> 实例。允许对内部的 <code>webpack</code> 配置进行更细粒度的修改。</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"path"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// 修改 pages 入口</span>
  pages<span class="token operator">:</span> <span class="token punctuation">{</span>
    index<span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token comment">// page 的入口</span>
      entry<span class="token operator">:</span> <span class="token string">'examples/main.js'</span><span class="token punctuation">,</span>
      <span class="token comment">// 模板来源</span>
      template<span class="token operator">:</span> <span class="token string">'public/index.html'</span><span class="token punctuation">,</span>
      <span class="token comment">// 在 dist/index.html 的输出</span>
      filename<span class="token operator">:</span> <span class="token string">"index.html"</span> <span class="token comment">// 输出文件</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token comment">// 扩展 webpack 配置</span>
  <span class="token function-variable function">chainWebpack</span><span class="token operator">:</span> <span class="token parameter">config</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token comment">// @ 默认指向 src 目录，这里要改成 examples</span>
    <span class="token comment">// 另外也可以新增一个 ~ 指向 packages</span>
    config<span class="token punctuation">.</span>resolve<span class="token punctuation">.</span>alias
      <span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">"@"</span><span class="token punctuation">,</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">"examples"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">"~"</span><span class="token punctuation">,</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">"packages"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 把 packages 和 examples 加入编译，因为新增的文件默认是不被 webpack 处理的</span>
    config<span class="token punctuation">.</span>module
      <span class="token punctuation">.</span><span class="token function">rule</span><span class="token punctuation">(</span><span class="token string">"js"</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span>include<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">packages</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token string">"babel"</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">loader</span><span class="token punctuation">(</span><span class="token string">"babel-loader"</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">tap</span><span class="token punctuation">(</span><span class="token parameter">options</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token comment">// 修改它的选项...</span>
        <span class="token keyword">return</span> options<span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br></div></div><h2 id="编写组件"><a class="header-anchor" href="#编写组件">#</a> 编写组件</h2>
<h3 id="创建组件"><a class="header-anchor" href="#创建组件">#</a> 创建组件</h3>
<ol>
<li>在 <code>packages</code> 目录下，所有的单个组件都以文件夹的形式存储，所有这里创建一个目录 <code>button</code></li>
<li>在 <code>button</code> 目录下创建 <code>src/main.vue</code> 存储组件源码</li>
<li>在 <code>button</code> 目录下创建 <code>index.js</code> 文件对外提供对组件的引用。</li>
</ol>
<ul>
<li><code>button/src/main.vue</code> 文件</li>
</ul>
<div class="language-vue ext-vue line-numbers-mode"><pre v-pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ei-button<span class="token punctuation">"</span></span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>handleClickBtn<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>slot</span><span class="token punctuation">></span></span>按钮<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>slot</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token string">"ZuiButton"</span><span class="token punctuation">,</span>
  methods<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">handleClickBtn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$emit</span><span class="token punctuation">(</span><span class="token string">"click"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
<span class="token selector">.ei-button</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #fff<span class="token punctuation">;</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
  <span class="token property">line-height</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">border</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 16px 20px<span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> #4a4c5b<span class="token punctuation">;</span>
  <span class="token property">border-radius</span><span class="token punctuation">:</span> 2px<span class="token punctuation">;</span>
  <span class="token property">cursor</span><span class="token punctuation">:</span> pointer<span class="token punctuation">;</span>
  <span class="token property">outline</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
  <span class="token property">box-sizing</span><span class="token punctuation">:</span> border-box<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br></div></div><ul>
<li><code>button/index.js</code></li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 导入组件</span>
<span class="token keyword">import</span> Button <span class="token keyword">from</span> <span class="token string">"./src/main"</span><span class="token punctuation">;</span>

<span class="token comment">// 为组件提供 install 安装方法，供按需引入</span>
Button<span class="token punctuation">.</span><span class="token function-variable function">install</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">Vue</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  Vue<span class="token punctuation">.</span><span class="token function">component</span><span class="token punctuation">(</span>Button<span class="token punctuation">.</span>name<span class="token punctuation">,</span> Button<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 组件必须声明 name 属性，相当于唯一表示</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token comment">// 导出组件</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> Button<span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h3 id="导出组件"><a class="header-anchor" href="#导出组件">#</a> 导出组件</h3>
<ol>
<li>将 <code>src</code> 目录下的文件删除，新建 <code>index.js</code> 文件，对整个组件库进行导出。</li>
</ol>
<ul>
<li><code>src/index.js</code></li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> Button <span class="token keyword">from</span> <span class="token string">'../packages/button/index.js'</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> components <span class="token operator">=</span> <span class="token punctuation">[</span>
  Button<span class="token punctuation">,</span>
<span class="token punctuation">]</span>

<span class="token keyword">const</span> <span class="token function-variable function">install</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">Vue</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  components<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">component</span> <span class="token operator">=></span> Vue<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>component<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> window <span class="token operator">!==</span> <span class="token string">'undefined'</span> <span class="token operator">&amp;&amp;</span> window<span class="token punctuation">.</span>Vue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">install</span><span class="token punctuation">(</span>window<span class="token punctuation">.</span>Vue<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  version<span class="token operator">:</span> <span class="token string">'0.0.1'</span><span class="token punctuation">,</span>
  install<span class="token punctuation">,</span>
  Button
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><h3 id="编写示例"><a class="header-anchor" href="#编写示例">#</a> 编写示例</h3>
<ol>
<li>在<code>examples</code>目录下新建<code>main.js</code>来导入组件并注册</li>
</ol>
<ul>
<li><code>examples/main.js</code></li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">"vue"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> App <span class="token keyword">from</span> <span class="token string">"./App.vue"</span><span class="token punctuation">;</span>

<span class="token comment">// 导入组件</span>
<span class="token keyword">import</span> Zui <span class="token keyword">from</span> <span class="token string">'../src'</span>
<span class="token comment">// 注册组件</span>
Vue<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>Zui<span class="token punctuation">)</span>

Vue<span class="token punctuation">.</span>config<span class="token punctuation">.</span>productionTip <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>

<span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token function-variable function">render</span><span class="token operator">:</span> <span class="token parameter">h</span> <span class="token operator">=></span> <span class="token function">h</span><span class="token punctuation">(</span>App<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">$mount</span><span class="token punctuation">(</span><span class="token string">"#app"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><ol start="2">
<li>在<code>examples</code>目录下新建<code>App.vue</code>来调用组件</li>
</ol>
<ul>
<li><code>examples/App.vue</code></li>
</ul>
<div class="language-vue ext-vue line-numbers-mode"><pre v-pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>app<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>zui-button</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>handleClick<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>点击我<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>zui-button</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token string">"App"</span><span class="token punctuation">,</span>
  methods<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">handleClick</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"被点击了"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h2 id="发布-npm"><a class="header-anchor" href="#发布-npm">#</a> 发布 <code>NPM</code></h2>
<ol>
<li><code>package.json</code> 中新增一条<strong>编译为库</strong>的命令
在库模式中，Vue是外置的，这意味着即使在代码中引入了 Vue，打包后的文件也是不包含Vue的，减小体积。
<a href="https://cli.vuejs.org/zh/guide/build-targets.html#%E5%BA%93" target="_blank" rel="noopener noreferrer">官方文档介绍<OutboundLink/></a></li>
</ol>
<p><strong>在 scripts 中新增一条命令 <code>npm run lib</code></strong></p>
<ul>
<li><code>--target</code>：构建目标，默认为应用模式。这里修改为 <code>lib</code> 启用库模式。</li>
<li><code>--name</code>: 输出文件名</li>
<li><code>--dest</code>：输出目录，默认 <code>dist</code>。也可以改为别的</li>
<li><code>[entry]</code>：最后一个参数为入口文件，默认为 <code>src/App.vue</code>。这里我们指定编译 <code>packages/</code> 组件库目录。</li>
</ul>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token property">"scripts"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token property">"lib"</span><span class="token operator">:</span> <span class="token string">"vue-cli-service build --target lib --name vue-ui --dest dist src/index.js"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><ol start="2">
<li>执行编译库命令</li>
</ol>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>npm run lib
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ul>
<li>会在根目录生成一个 <code>dist</code> 目录。关于生成的目录官方有着详细的描述。<a href="https://cli.vuejs.org/zh/guide/build-targets.html#%E5%BA%93" target="_blank" rel="noopener noreferrer">官方介绍<OutboundLink/></a></li>
</ul>
<p><img src="@source/web/vue/images/ui-library-05.png" alt="示例"></p>
<ol start="3">
<li>配置 <code>package.json</code> 文件中发布到 <code>npm</code> 的字段</li>
</ol>
<ul>
<li><code>name</code>: 包名，该名字是唯一的。可在 npm 官网搜索名字，如果存在则需换个名字。</li>
<li><code>version</code>: 版本号，每次发布至 npm 需要修改版本号，不能和历史版本号相同。</li>
<li><code>description</code>: 描述。</li>
<li><code>main</code>: 入口文件，该字段需指向我们最终编译后的包文件。</li>
<li><code>keyword</code>：关键字，以空格分离希望用户最终搜索的词。</li>
<li><code>author</code>：作者</li>
<li><code>private</code>：是否私有，需要修改为 false 才能发布到 npm</li>
<li><code>license</code>： 开源协议</li>
</ul>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code>  <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"vue-ui"</span><span class="token punctuation">,</span>
  <span class="token property">"version"</span><span class="token operator">:</span> <span class="token string">"0.1.0"</span><span class="token punctuation">,</span>
  <span class="token property">"description"</span><span class="token operator">:</span> <span class="token string">"基于 vue-cli3 的 UI 组件库"</span><span class="token punctuation">,</span>
  <span class="token property">"main"</span><span class="token operator">:</span> <span class="token string">"dist/vue-ui.umd.min.js"</span><span class="token punctuation">,</span>
  <span class="token property">"keyword"</span><span class="token operator">:</span> <span class="token string">"zui vue-ui"</span><span class="token punctuation">,</span>
  <span class="token property">"private"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token property">"license"</span><span class="token operator">:</span> <span class="token string">"MIT"</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><ol start="4">
<li>添加 <code>.npmignore</code> 文件，设置忽略发布文件，内容和 <code>.gitignore</code> 差不多<br>
只有编译后的 <code>dist</code> 目录、<code>package.json</code>、<code>README.md</code>才需要发布到 <code>npm</code> 上</li>
</ol>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code># 忽略目录
examples/
packages/
public/

# 忽略指定文件
vue.config.js
babel.config.js
*.map
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><ol start="5">
<li>登录到<code>npm</code></li>
</ol>
<ul>
<li>首先需要到 <code>npm</code> 上注册一个账号，注册过程略。</li>
<li>如果配置了淘宝镜像，先设置回 <code>npm</code> 镜像：</li>
</ul>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>npm config set registry http://registry.npmjs.org 
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ul>
<li>终端执行登录命令，输入用户名、密码、邮箱即可登录。</li>
</ul>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>npm login
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ol start="6">
<li>发布到 npm
执行发布命令，发布组件到 npm</li>
</ol>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>npm publish
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ol start="7">
<li>登录 <code>npm</code> 账号查看是否发布成功，发布成功后就可以在新项目中安装使用了</li>
</ol>
<h2 id="按需加载"><a class="header-anchor" href="#按需加载">#</a> 按需加载</h2>
<h3 id="方式"><a class="header-anchor" href="#方式">#</a> 方式</h3>
<ul>
<li>使用<a href="https://github.com/ant-design/babel-plugin-import" target="_blank" rel="noopener noreferrer"><code>babel-plugin-import</code><OutboundLink/></a>、<a href="https://github.com/ElementUI/babel-plugin-component" target="_blank" rel="noopener noreferrer"><code>babel-plugin-component</code><OutboundLink/></a>插件来自动按需引入。<a href="https://segmentfault.com/q/1010000022005673" target="_blank" rel="noopener noreferrer">两者的区别<OutboundLink/></a></li>
<li>提供<code>es module</code>版本，开启<code>tree shaking</code></li>
</ul>
<h3 id="babel-plugin-import"><a class="header-anchor" href="#babel-plugin-import">#</a> babel-plugin-import</h3>
<ul>
<li>原理</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> Button<span class="token punctuation">,</span> Icon <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'element-ui'</span>
<span class="token comment">//  会转化为</span>
<span class="token keyword">const</span> Button <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'element-ui/lib/button.js'</span><span class="token punctuation">)</span>
<span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'element-ui/theme-chalk/button.css'</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> Icon <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'element-ui/lib/icon.js'</span><span class="token punctuation">)</span>
<span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'element-ui/theme-chalk/icon.css'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h3 id="添加测试的组件"><a class="header-anchor" href="#添加测试的组件">#</a> 添加测试的组件</h3>
<ol>
<li>新增一个<code>text</code>组件</li>
</ol>
<div class="language-vue ext-vue line-numbers-mode"><pre v-pre class="language-vue"><code><span class="token comment">&lt;!-- text/src/main.vue --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>zui-text<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>slot</span><span class="token punctuation">></span></span>文本组件<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>slot</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token string">"ZuiText"</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
<span class="token selector">.zui-text</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #fc9153<span class="token punctuation">;</span>
  <span class="token property">font-weight</span><span class="token punctuation">:</span> 700<span class="token punctuation">;</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// text/index.js</span>
<span class="token keyword">import</span> Text <span class="token keyword">from</span> <span class="token string">"./src/main"</span><span class="token punctuation">;</span>
Text<span class="token punctuation">.</span><span class="token function-variable function">install</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">Vue</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  Vue<span class="token punctuation">.</span><span class="token function">component</span><span class="token punctuation">(</span>Text<span class="token punctuation">.</span>name<span class="token punctuation">,</span> Text<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> Text<span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><ol start="2">
<li>新增一个<code>element</code>组件，引入<code>element-ui</code>，这样的话引入全部组件时体积就会变大，按需引入<code>button、text</code>组件时体积就会缩小</li>
</ol>
<ul>
<li><code>npm install -S element-ui</code></li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// element/index.js</span>
<span class="token keyword">import</span> Element <span class="token keyword">from</span> <span class="token string">'element-ui'</span>
<span class="token keyword">import</span> <span class="token string">'element-ui/lib/theme-chalk/index.css'</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token function">install</span><span class="token punctuation">(</span><span class="token parameter">Vue</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    Vue<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>Element<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><ol start="3">
<li><code>packages</code>的目录结构</li>
</ol>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>- packages
  - button
      - src
        - main.vue
      - index.js
  - text
      - src
        - main.vue
      - index.js
  - element
      - index.js
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h3 id="引入组件"><a class="header-anchor" href="#引入组件">#</a> 引入组件</h3>
<ol>
<li>修改<code>src/index.js</code></li>
</ol>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> Button <span class="token keyword">from</span> <span class="token string">'../packages/button/index.js'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> Text <span class="token keyword">from</span> <span class="token string">'../packages/text/index.js'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> Element <span class="token keyword">from</span> <span class="token string">'../packages/element/index.js'</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> components <span class="token operator">=</span> <span class="token punctuation">[</span>
  Button<span class="token punctuation">,</span>
  Text<span class="token punctuation">,</span>
  Element
<span class="token punctuation">]</span>

<span class="token keyword">const</span> <span class="token function-variable function">install</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">Vue</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  components<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">component</span> <span class="token operator">=></span> Vue<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>component<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> window <span class="token operator">!==</span> <span class="token string">'undefined'</span> <span class="token operator">&amp;&amp;</span> window<span class="token punctuation">.</span>Vue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">install</span><span class="token punctuation">(</span>window<span class="token punctuation">.</span>Vue<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  version<span class="token operator">:</span> <span class="token string">'0.0.1'</span><span class="token punctuation">,</span>
  install<span class="token punctuation">,</span>
  <span class="token operator">...</span>components
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><ol start="2">
<li>修改<code>examples/App.vue</code>示例代码</li>
</ol>
<div class="language-vue ext-vue line-numbers-mode"><pre v-pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>app<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>zui-button</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>handleClick<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>按钮组件<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>zui-button</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>zui-text</span><span class="token punctuation">></span></span>文本组件<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>zui-text</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>el-button</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>primary<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Element 按钮<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>el-button</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token string">"App"</span><span class="token punctuation">,</span>
  methods<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">handleClick</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"被点击了"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><h3 id="新增配置"><a class="header-anchor" href="#新增配置">#</a> 新增配置</h3>
<ol>
<li>新增<code>build</code>目录，在目录下创建<code>utils.js</code>、<code>config.pub.js</code>、<code>config.dev.js</code>、<code>config.build.js</code>四个文件</li>
</ol>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>- build
  - utils.js
  - config.pub.js
  - config.dev.js
  - config.build.js
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><ul>
<li><code>utils.js</code>：工具函数获取组件地址</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// build/utils.js</span>
<span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'fs'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'path'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> join <span class="token operator">=</span> path<span class="token punctuation">.</span>join

<span class="token keyword">const</span> <span class="token function-variable function">resolve</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">dir</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">join</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">'../'</span><span class="token punctuation">,</span> dir<span class="token punctuation">)</span>
<span class="token keyword">const</span> index <span class="token operator">=</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">'../'</span><span class="token punctuation">,</span> <span class="token string">'src/index.js'</span><span class="token punctuation">)</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  resolve<span class="token punctuation">,</span>
  <span class="token function">getComponentEntries</span><span class="token punctuation">(</span><span class="token parameter">path</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> files <span class="token operator">=</span> fs<span class="token punctuation">.</span><span class="token function">readdirSync</span><span class="token punctuation">(</span><span class="token function">resolve</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> componentEntries <span class="token operator">=</span> files<span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">ret<span class="token punctuation">,</span> item</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> itemPath <span class="token operator">=</span> <span class="token function">join</span><span class="token punctuation">(</span>path<span class="token punctuation">,</span> item<span class="token punctuation">)</span>
      <span class="token keyword">const</span> isDir <span class="token operator">=</span> fs<span class="token punctuation">.</span><span class="token function">statSync</span><span class="token punctuation">(</span>itemPath<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isDirectory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>isDir<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        ret<span class="token punctuation">[</span>item<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token function">join</span><span class="token punctuation">(</span>itemPath<span class="token punctuation">,</span> <span class="token string">'index.js'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> <span class="token punctuation">[</span>name<span class="token punctuation">]</span> <span class="token operator">=</span> item<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">'.'</span><span class="token punctuation">)</span>
        ret<span class="token punctuation">[</span>name<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>itemPath<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> ret
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token comment">// idnex 文件包含所有的组件</span>
    componentEntries<span class="token punctuation">[</span><span class="token string">'index'</span><span class="token punctuation">]</span> <span class="token operator">=</span> index<span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>componentEntries<span class="token punctuation">)</span>
    <span class="token keyword">return</span> componentEntries
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div><ul>
<li><code>config.pub.js</code>：开发调试 和 打包构建 共有的配置</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// build/config.pub.js</span>
<span class="token keyword">const</span> utils <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./utils'</span><span class="token punctuation">)</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  resolve<span class="token operator">:</span> <span class="token punctuation">{</span>
    extensions<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'.js'</span><span class="token punctuation">,</span> <span class="token string">'.vue'</span><span class="token punctuation">,</span> <span class="token string">'.json'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    alias<span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token string">'src'</span><span class="token operator">:</span> utils<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">'src'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>              
      <span class="token string">'packages'</span><span class="token operator">:</span> utils<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">'packages'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><ul>
<li><code>config.dev.js</code>：开发调试 配置</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// build/config.dev.js</span>
<span class="token keyword">const</span> pub <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./config.pub'</span><span class="token punctuation">)</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  pages<span class="token operator">:</span> <span class="token punctuation">{</span>
    index<span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token comment">// page 的入口</span>
      entry<span class="token operator">:</span> <span class="token string">'examples/main.js'</span><span class="token punctuation">,</span>
      <span class="token comment">// 模板来源</span>
      template<span class="token operator">:</span> <span class="token string">'public/index.html'</span><span class="token punctuation">,</span>
      <span class="token comment">// 在 dist/index.html 的输出</span>
      filename<span class="token operator">:</span> <span class="token string">"index.html"</span> <span class="token comment">// 输出文件</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  configureWebpack<span class="token operator">:</span> <span class="token punctuation">{</span>
    resolve<span class="token operator">:</span> pub<span class="token punctuation">.</span>resolve
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function-variable function">chainWebpack</span><span class="token operator">:</span> <span class="token parameter">config</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    config<span class="token punctuation">.</span>module
      <span class="token punctuation">.</span><span class="token function">rule</span><span class="token punctuation">(</span><span class="token string">"js"</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span>include<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">packages</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token string">"babel"</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">loader</span><span class="token punctuation">(</span><span class="token string">"babel-loader"</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">tap</span><span class="token punctuation">(</span><span class="token parameter">options</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> options<span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><ul>
<li><code>config.build.js</code>：打包构建 配置</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// build/config.build.js</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span> resolve<span class="token punctuation">,</span> getComponentEntries <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./utils'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> pub <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./config.pub'</span><span class="token punctuation">)</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  outputDir<span class="token operator">:</span> <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">'lib'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  configureWebpack<span class="token operator">:</span> <span class="token punctuation">{</span>
    entry<span class="token operator">:</span> <span class="token function">getComponentEntries</span><span class="token punctuation">(</span><span class="token string">'packages'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    output<span class="token operator">:</span> <span class="token punctuation">{</span>
      filename<span class="token operator">:</span> <span class="token string">'[name]/index.js'</span><span class="token punctuation">,</span>
      libraryTarget<span class="token operator">:</span> <span class="token string">'umd'</span><span class="token punctuation">,</span> <span class="token comment">// 兼容性最好，可以在CommonJS, AMD环境下运行</span>
      libraryExport<span class="token operator">:</span> <span class="token string">'default'</span><span class="token punctuation">,</span>
      library<span class="token operator">:</span> <span class="token string">'vue-ui'</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    resolve<span class="token operator">:</span> pub<span class="token punctuation">.</span>resolve<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  css<span class="token operator">:</span> <span class="token punctuation">{</span>
    sourceMap<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    extract<span class="token operator">:</span> <span class="token punctuation">{</span>
      filename<span class="token operator">:</span> <span class="token string">'[name]/style.css'</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function-variable function">chainWebpack</span><span class="token operator">:</span> <span class="token parameter">config</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    config<span class="token punctuation">.</span>optimization<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token string">'splitChunks'</span><span class="token punctuation">)</span>
    config<span class="token punctuation">.</span>plugins<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token string">'copy'</span><span class="token punctuation">)</span>
    config<span class="token punctuation">.</span>plugins<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token string">'preload'</span><span class="token punctuation">)</span>
    config<span class="token punctuation">.</span>plugins<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token string">'prefetch'</span><span class="token punctuation">)</span>
    config<span class="token punctuation">.</span>plugins<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token string">'html'</span><span class="token punctuation">)</span>
    config<span class="token punctuation">.</span>plugins<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token string">'hmr'</span><span class="token punctuation">)</span>
    config<span class="token punctuation">.</span>entryPoints<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token string">'app'</span><span class="token punctuation">)</span>
    config<span class="token punctuation">.</span>module
      <span class="token punctuation">.</span><span class="token function">rule</span><span class="token punctuation">(</span><span class="token string">'fonts'</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token string">'url-loader'</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">tap</span><span class="token punctuation">(</span><span class="token parameter">option</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        option<span class="token punctuation">.</span>fallback<span class="token punctuation">.</span>options<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">'static/fonts/[name].[hash:8].[ext]'</span>
        <span class="token keyword">return</span> option
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br></div></div><ul>
<li>修改<code>vue.config.js</code>文件</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> devConfig <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./build/config.dev'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> buildConfig <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./build/config.build'</span><span class="token punctuation">)</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">===</span> <span class="token string">'development'</span> <span class="token operator">?</span> devConfig <span class="token operator">:</span> buildConfig
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><ul>
<li>执行 <code>npm run build</code><br>
<img src="@source/web/vue/images/ui-library-06.png" alt="示例"></li>
</ul>
<h3 id="测试按需加载"><a class="header-anchor" href="#测试按需加载">#</a> 测试按需加载</h3>
<ul>
<li>在<code>UI 框架</code>根目录执行<code>npm link</code>将包添加到全局。或者从<code>NPM</code>上安装包<a href="https://www.jianshu.com/p/aaa7db89a5b2" target="_blank" rel="noopener noreferrer">npm link介绍<OutboundLink/></a></li>
<li>新建一个<code>test-ui</code>项目来测试</li>
</ul>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token comment">&lt;!-- 新建一个测试项目 --></span>
vue create test-ui
<span class="token comment">&lt;!-- 将 测试项目 和 UI框架 之间建立链接 --></span>
npm link vue-ui
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><ol>
<li>没有引入组件时</li>
</ol>
<p><img src="@source/web/vue/images/import-01.png" alt="示例"></p>
<ol start="2">
<li>组件全部引入</li>
</ol>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> ZuiVueUi <span class="token keyword">from</span> <span class="token string">'vue-ui'</span>
<span class="token keyword">import</span> <span class="token string">'vue-ui/lib/index/style.css'</span><span class="token punctuation">;</span>
Vue<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>ZuiVueUi<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><img src="@source/web/vue/images/import-02.png" alt="示例"></p>
<ol start="3">
<li>组件按需引入</li>
</ol>
<ul>
<li>安装<code>babel-plugin-import</code>。<code>npm i -D babel-plugin-import</code></li>
<li>修改<code>babel.config.js</code>文件。<strong>修改后组件就不能全量引入了</strong></li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// babel.config.js</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  presets<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"@vue/cli-plugin-babel/preset"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  plugins<span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">[</span>
      <span class="token string">"import"</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        libraryName<span class="token operator">:</span> <span class="token string">"vue-ui"</span><span class="token punctuation">,</span>
        <span class="token function-variable function">style</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
          console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span>
          <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/style.css</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><ul>
<li>按需引入<code>button、text</code>组件</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> Button<span class="token punctuation">,</span> Text <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue-ui'</span>
Vue<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>Button<span class="token punctuation">)</span>
Vue<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>Text<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><img src="@source/web/vue/images/import-03.png" alt="示例"></p>
<h2 id="组件文档"><a class="header-anchor" href="#组件文档">#</a> 组件文档</h2>
<h3 id="安装-vuepress"><a class="header-anchor" href="#安装-vuepress">#</a> 安装 VuePress</h3>
<ul>
<li>详细配置前往官网查看。<a href="https://vuepress.vuejs.org/zh/guide/getting-started.html#%E7%8E%B0%E6%9C%89%E9%A1%B9%E7%9B%AE" target="_blank" rel="noopener noreferrer">VuePress 官方文档<OutboundLink/></a></li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 将 VuePress 作为一个本地依赖安装</span>
<span class="token function">yarn</span> <span class="token function">add</span> -D vuepress <span class="token comment"># 或者：npm install -D vuepress</span>

<span class="token comment"># 新建一个 docs 文件夹</span>
<span class="token function">mkdir</span> docs
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><ul>
<li>在 <code>docs</code> 目录新建 <code>README.md</code> 文件</li>
</ul>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token front-matter-block"><span class="token punctuation">---</span>
<span class="token font-matter yaml language-yaml"><span class="token key atrule">home</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
<span class="token key atrule">heroImage</span><span class="token punctuation">:</span> /hero.png
<span class="token key atrule">actionText</span><span class="token punctuation">:</span> 开始阅读 →
<span class="token key atrule">actionLink</span><span class="token punctuation">:</span> /web/
<span class="token key atrule">features</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">title</span><span class="token punctuation">:</span> 简洁至上
  <span class="token key atrule">details</span><span class="token punctuation">:</span> 以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。
<span class="token punctuation">-</span> <span class="token key atrule">title</span><span class="token punctuation">:</span> Vue驱动
  <span class="token key atrule">details</span><span class="token punctuation">:</span> 享受 Vue + webpack 的开发体验，在 Markdown 中使用 Vue 组件，同时可以使用 Vue 来开发自定义主题。
<span class="token punctuation">-</span> <span class="token key atrule">title</span><span class="token punctuation">:</span> 高性能
  <span class="token key atrule">details</span><span class="token punctuation">:</span> VuePress 为每个页面预渲染生成静态的 HTML，同时在页面被加载的时候，将作为 SPA 运行。
<span class="token key atrule">footer</span><span class="token punctuation">:</span> MIT Licensed <span class="token punctuation">|</span> Copyright © 2018<span class="token punctuation">-</span>present Evan You</span>
<span class="token punctuation">---</span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><ul>
<li>接着，在 <code>package.json</code> 里加一些脚本</li>
</ul>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"scripts"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    ...
    <span class="token property">"docs:dev"</span><span class="token operator">:</span> <span class="token string">"vuepress dev docs"</span><span class="token punctuation">,</span>
    <span class="token property">"docs:build"</span><span class="token operator">:</span> <span class="token string">"vuepress build docs"</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><ul>
<li>运行项目</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> run docs:dev
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="参考文献"><a class="header-anchor" href="#参考文献">#</a> 参考文献</h2>
<ul>
<li><a href="http://www.rxshc.com/180.html" target="_blank" rel="noopener noreferrer">Vue cli3 库模式搭建组件库并发布到 npm<OutboundLink/></a></li>
<li><a href="https://blog.csdn.net/mate_ge/article/details/100076288#vuecli3_328" target="_blank" rel="noopener noreferrer">Vue组件库实现按需加载功能<OutboundLink/></a></li>
<li><a href="https://juejin.im/post/5d2c248151882556d1683363" target="_blank" rel="noopener noreferrer">babel-plugin-import 和 tree shaking 的区别<OutboundLink/></a></li>
<li><a href="https://www.webpackjs.com/guides/tree-shaking/" target="_blank" rel="noopener noreferrer">tree shaking官方<OutboundLink/></a></li>
<li><a href="https://segmentfault.com/a/1190000019220154" target="_blank" rel="noopener noreferrer">tree shaking使用<OutboundLink/></a></li>
<li><a href="https://juejin.im/post/5e410488f265da572017de91#heading-3" target="_blank" rel="noopener noreferrer">用 vuepress 写文档<OutboundLink/></a></li>
</ul>
</template>