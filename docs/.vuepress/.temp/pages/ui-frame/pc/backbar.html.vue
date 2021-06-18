<template><h1 id="backbar"><a class="header-anchor" href="#backbar">#</a> backbar</h1>
<p>头部后退条</p>
<blockquote>
<p>依赖 <code>el-row</code> 和 <code>el-col</code></p>
</blockquote>
<h2 id="用法"><a class="header-anchor" href="#用法">#</a> 用法</h2>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ei-backbar</span>
  <span class="token attr-name">:fixed</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>true<span class="token punctuation">"</span></span>
  <span class="token attr-name">:height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>55<span class="token punctuation">"</span></span>
  <span class="token attr-name">icon-color</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>red<span class="token punctuation">"</span></span>
  <span class="token attr-name">background-color</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>black<span class="token punctuation">"</span></span>
  <span class="token attr-name">@go-back</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>onGoback<span class="token punctuation">"</span></span>
<span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h2 id="attributes"><a class="header-anchor" href="#attributes">#</a> Attributes</h2>
<table>
<thead>
<tr>
<th style="text-align:left">参数</th>
<th style="text-align:left">说明</th>
<th style="text-align:left">类型</th>
<th style="text-align:left">可选值</th>
<th style="text-align:left">默认值</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">fixed</td>
<td style="text-align:left">是否使用 fixed 定位</td>
<td style="text-align:left">Boolean</td>
<td style="text-align:left">--</td>
<td style="text-align:left">false</td>
</tr>
<tr>
<td style="text-align:left">height</td>
<td style="text-align:left">高度</td>
<td style="text-align:left">Number</td>
<td style="text-align:left">--</td>
<td style="text-align:left">44</td>
</tr>
<tr>
<td style="text-align:left">icon-color</td>
<td style="text-align:left">图标颜色</td>
<td style="text-align:left">String</td>
<td style="text-align:left">--</td>
<td style="text-align:left">#FFFFFF</td>
</tr>
<tr>
<td style="text-align:left">background-color</td>
<td style="text-align:left">背景颜色</td>
<td style="text-align:left">String</td>
<td style="text-align:left">--</td>
<td style="text-align:left">#409EFF</td>
</tr>
</tbody>
</table>
<h2 id="events"><a class="header-anchor" href="#events">#</a> Events</h2>
<table>
<thead>
<tr>
<th style="text-align:left">事件名称</th>
<th style="text-align:left">说明</th>
<th style="text-align:left">回调参数</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">go-back</td>
<td style="text-align:left">点击后退图标和文件</td>
<td style="text-align:left">--</td>
</tr>
</tbody>
</table>
</template>