<template><h1 id="打包构建优化"><a class="header-anchor" href="#打包构建优化">#</a> 打包构建优化</h1>
<h2 id="_1、安装相关插件"><a class="header-anchor" href="#_1、安装相关插件">#</a> 1、安装相关插件</h2>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>npm i <span class="token operator">-</span><span class="token constant">D</span> add<span class="token operator">-</span>asset<span class="token operator">-</span>html<span class="token operator">-</span>webpack<span class="token operator">-</span>plugin clean<span class="token operator">-</span>webpack<span class="token operator">-</span>plugin
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="_2、编写配置文件"><a class="header-anchor" href="#_2、编写配置文件">#</a> 2、编写配置文件</h2>
<ul>
<li>在项目根目录下新建 webpack.dll.conf.js，输入以下内容。</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"path"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> webpack <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"webpack"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span> CleanWebpackPlugin <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"clean-webpack-plugin"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// dll文件存放的目录</span>
<span class="token keyword">const</span> dllPath <span class="token operator">=</span> <span class="token string">"public/vendor"</span><span class="token punctuation">;</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  entry<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// 需要提取的库文件</span>
    vendor<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"vue"</span><span class="token punctuation">,</span> <span class="token string">"vue-router"</span><span class="token punctuation">,</span> <span class="token string">"vuex"</span><span class="token punctuation">,</span> <span class="token string">"axios"</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  output<span class="token operator">:</span> <span class="token punctuation">{</span>
    path<span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> dllPath<span class="token punctuation">)</span><span class="token punctuation">,</span>
    filename<span class="token operator">:</span> <span class="token string">"[name].dll.js"</span><span class="token punctuation">,</span>
    <span class="token comment">// vendor.dll.js中暴露出的全局变量名</span>
    <span class="token comment">// 保持与 webpack.DllPlugin 中名称一致</span>
    library<span class="token operator">:</span> <span class="token string">"[name]_[hash]"</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  plugins<span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token comment">// 清除之前的dll文件</span>
    <span class="token keyword">new</span> <span class="token class-name">CleanWebpackPlugin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token comment">// 设置环境变量</span>
    <span class="token keyword">new</span> <span class="token class-name">webpack<span class="token punctuation">.</span>DefinePlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token string">"process.env"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token constant">NODE_ENV</span><span class="token operator">:</span> <span class="token string">"production"</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token comment">// manifest.json 描述动态链接库包含了哪些内容</span>
    <span class="token keyword">new</span> <span class="token class-name">webpack<span class="token punctuation">.</span>DllPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      path<span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> dllPath<span class="token punctuation">,</span> <span class="token string">"[name]-manifest.json"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token comment">// 保持与 output.library 中名称一致</span>
      name<span class="token operator">:</span> <span class="token string">"[name]_[hash]"</span><span class="token punctuation">,</span>
      context<span class="token operator">:</span> process<span class="token punctuation">.</span><span class="token function">cwd</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br></div></div><h2 id="_3、添加命令生成-dll"><a class="header-anchor" href="#_3、添加命令生成-dll">#</a> 3、添加命令生成 Dll</h2>
<ul>
<li>在 package.json 中加入如下命令然后</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token string">"scripts"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string">"dll"</span><span class="token operator">:</span> <span class="token string">"webpack -p --progress --config ./webpack.dll.conf.js"</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><ul>
<li>运行<code>npm run dll</code>，会在 public 文件夹下生成 vendor 文件夹，里面包含 vendor-manifest.json 和 vendor.dll.js
<img src="@source/web/vue/images/webpack-01.png" alt="inheritAttrs: true"></li>
</ul>
<h2 id="_4、忽略已经编译的文件"><a class="header-anchor" href="#_4、忽略已经编译的文件">#</a> 4、忽略已经编译的文件</h2>
<ul>
<li>在 vue.config.js 中加入以下配置，告诉 webpack 哪些文件已被预编译，使 webpack 构建的时候忽略这些已预编译的文件</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> webpack <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"webpack"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  configureWebpack<span class="token operator">:</span> <span class="token punctuation">{</span>
    plugins<span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token keyword">new</span> <span class="token class-name">webpack<span class="token punctuation">.</span>DllReferencePlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        context<span class="token operator">:</span> process<span class="token punctuation">.</span><span class="token function">cwd</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        manifest<span class="token operator">:</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"./public/vendor/vendor-manifest.json"</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h2 id="_5、引入-dll-文件"><a class="header-anchor" href="#_5、引入-dll-文件">#</a> 5、引入 Dll 文件</h2>
<ul>
<li>在 index.html 中引入生成的 dll 文件</li>
</ul>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>./vendor/vendor.dll.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="_6、配置自动引入"><a class="header-anchor" href="#_6、配置自动引入">#</a> 6、配置自动引入</h2>
<ul>
<li>手动引入的方式不够优雅，在 vue.config.js 中使用 add-asset-html-webpack-plugin 来实现自动引入</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> webpack <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"webpack"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> AddAssetHtmlPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"add-asset-html-webpack-plugin"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  configureWebpack<span class="token operator">:</span> <span class="token punctuation">{</span>
    plugins<span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token keyword">new</span> <span class="token class-name">webpack<span class="token punctuation">.</span>DllReferencePlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        context<span class="token operator">:</span> process<span class="token punctuation">.</span><span class="token function">cwd</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        manifest<span class="token operator">:</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"./public/vendor/vendor-manifest.json"</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token comment">// 将 dll 注入到 生成的 html 模板中</span>
      <span class="token keyword">new</span> <span class="token class-name">AddAssetHtmlPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token comment">// dll文件位置</span>
        filepath<span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">"./public/vendor/*.js"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token comment">// dll 引用路径</span>
        publicPath<span class="token operator">:</span> <span class="token string">"./vendor"</span><span class="token punctuation">,</span>
        <span class="token comment">// dll最终输出的目录</span>
        outputPath<span class="token operator">:</span> <span class="token string">"./vendor"</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div></template>