<template><h1 id="dml"><a class="header-anchor" href="#dml">#</a> DML</h1>
<h2 id="添加"><a class="header-anchor" href="#添加">#</a> 添加</h2>
<ul>
<li>语法</li>
</ul>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">insert</span> <span class="token keyword">into</span> 表名 <span class="token punctuation">(</span>列名<span class="token number">1</span><span class="token punctuation">,</span> 列名<span class="token number">2</span><span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>列名n<span class="token punctuation">)</span> <span class="token keyword">values</span><span class="token punctuation">(</span>值<span class="token number">1</span><span class="token punctuation">,</span> 值<span class="token number">2</span><span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>值n<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ul>
<li>示例</li>
</ul>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">-- 基本</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token punctuation">`</span><span class="token keyword">user</span><span class="token punctuation">`</span> <span class="token punctuation">(</span> <span class="token punctuation">`</span>name<span class="token punctuation">`</span><span class="token punctuation">,</span> age<span class="token punctuation">,</span> sex <span class="token punctuation">)</span> <span class="token keyword">VALUES</span><span class="token punctuation">(</span><span class="token string">'张三'</span><span class="token punctuation">,</span> <span class="token number">22</span><span class="token punctuation">,</span> <span class="token string">'男'</span><span class="token punctuation">)</span>

<span class="token comment">-- 去掉列名</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token punctuation">`</span><span class="token keyword">user</span><span class="token punctuation">`</span> <span class="token keyword">VALUES</span><span class="token punctuation">(</span><span class="token keyword">DEFAULT</span><span class="token punctuation">,</span> <span class="token string">'张三'</span><span class="token punctuation">,</span> <span class="token number">22</span><span class="token punctuation">,</span> <span class="token string">'男'</span><span class="token punctuation">)</span>

<span class="token comment">-- 添加多个</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token punctuation">`</span><span class="token keyword">user</span><span class="token punctuation">`</span> <span class="token keyword">VALUES</span>
<span class="token punctuation">(</span><span class="token boolean">NULL</span><span class="token punctuation">,</span> <span class="token string">'张三'</span><span class="token punctuation">,</span> <span class="token number">22</span><span class="token punctuation">,</span> <span class="token string">'男'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">(</span><span class="token boolean">NULL</span><span class="token punctuation">,</span> <span class="token string">'李四'</span><span class="token punctuation">,</span> <span class="token number">23</span><span class="token punctuation">,</span> <span class="token string">'女'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">(</span><span class="token boolean">NULL</span><span class="token punctuation">,</span> <span class="token string">'王五'</span><span class="token punctuation">,</span> <span class="token number">24</span><span class="token punctuation">,</span> <span class="token string">'男'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><div class="custom-container danger"><p class="custom-container-title">注意</p>
<ul>
<li>列名和值要一一对应</li>
<li>如果表名后，不定义列名，则默认给所有列添加值，<code>ID</code>自增的话可以用<code>default</code>或者<code>null</code>，但不能不写</li>
<li>处理数字类型，其他的类型用双引号包起来</li>
</ul>
</div>
<h2 id="修改"><a class="header-anchor" href="#修改">#</a> 修改</h2>
<ul>
<li>语法</li>
</ul>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">update</span> 表名 <span class="token keyword">set</span> 列名<span class="token number">1</span> <span class="token operator">=</span> 值<span class="token number">1</span><span class="token punctuation">,</span> 列名<span class="token number">2</span> <span class="token operator">=</span> 值<span class="token number">2</span><span class="token punctuation">,</span> 列名三 <span class="token operator">=</span> 值<span class="token number">3</span><span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token punctuation">[</span><span class="token keyword">where</span> 条件<span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ul>
<li>示例</li>
</ul>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">-- 基本</span>
<span class="token keyword">UPDATE</span> <span class="token punctuation">`</span><span class="token keyword">user</span><span class="token punctuation">`</span> <span class="token keyword">SET</span> <span class="token punctuation">`</span>name<span class="token punctuation">`</span> <span class="token operator">=</span> <span class="token string">'jack'</span><span class="token punctuation">,</span> age <span class="token operator">=</span> <span class="token number">24</span> <span class="token keyword">WHERE</span> id <span class="token operator">=</span> <span class="token number">16</span>

<span class="token comment">-- 不加 where 条件会修改全部数据</span>
<span class="token keyword">UPDATE</span> <span class="token punctuation">`</span><span class="token keyword">user</span><span class="token punctuation">`</span> <span class="token keyword">SET</span> sex <span class="token operator">=</span> <span class="token string">'男'</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><div class="custom-container danger"><p class="custom-container-title">注意</p>
<ul>
<li>如果不加任何条件，则会将表中所有记录全部修改。</li>
</ul>
</div>
<h2 id="删除"><a class="header-anchor" href="#删除">#</a> 删除</h2>
<ul>
<li>语法</li>
</ul>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">update</span> <span class="token keyword">from</span> 表名 <span class="token punctuation">[</span><span class="token keyword">where</span> 条件<span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ul>
<li>示例</li>
</ul>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">-- 基本</span>
<span class="token keyword">DELETE</span> <span class="token keyword">FROM</span> <span class="token punctuation">`</span><span class="token keyword">user</span><span class="token punctuation">`</span> <span class="token keyword">WHERE</span> <span class="token punctuation">`</span>name<span class="token punctuation">`</span> <span class="token operator">=</span> <span class="token string">'jack'</span>

<span class="token comment">-- 不加 where 条件会删除全部记录</span>
<span class="token keyword">DELETE</span> <span class="token keyword">FROM</span> <span class="token punctuation">`</span><span class="token keyword">user</span><span class="token punctuation">`</span>

<span class="token comment">-- 删除表中所有记录（推荐）</span>
<span class="token keyword">TRUNCATE</span> <span class="token keyword">TABLE</span> <span class="token punctuation">`</span><span class="token keyword">user</span><span class="token punctuation">`</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><div class="custom-container danger"><p class="custom-container-title">注意</p>
<ul>
<li>如果不加条件，则删除表中所有记录。</li>
<li>如果真的要删除所有记录
<ul>
<li><code>delete from 表名</code>; 不推荐使用。有多少条记录就会执行多少次删除操作。效率低</li>
<li><code>truncate table 表明</code>; 推荐使用，先删除表，然后再创建一张一样的表。效率高</li>
</ul>
</li>
</ul>
</div>
</template>