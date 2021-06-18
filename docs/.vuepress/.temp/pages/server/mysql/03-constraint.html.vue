<template><h1 id="约束"><a class="header-anchor" href="#约束">#</a> 约束</h1>
<h2 id="非空约束"><a class="header-anchor" href="#非空约束">#</a> 非空约束</h2>
<ul>
<li><code>not null</code>：值不能为<code>Null</code></li>
</ul>
<ol>
<li>创建表时添加</li>
</ol>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> test <span class="token punctuation">(</span>
  id <span class="token keyword">INT</span><span class="token punctuation">,</span>
  name <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><ol start="2">
<li>创建完表后添加</li>
</ol>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">alter</span> <span class="token keyword">table</span> test <span class="token keyword">modify</span> age <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token operator">not</span> <span class="token boolean">null</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ol start="3">
<li>删除非空约束</li>
</ol>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">alter</span> <span class="token keyword">table</span> test <span class="token keyword">modify</span> age <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="唯一约束"><a class="header-anchor" href="#唯一约束">#</a> 唯一约束</h2>
<ul>
<li><code>unique</code>：值不能重复，但是<code>Null</code>不包含在内</li>
</ul>
<ol>
<li>创建表时添加</li>
</ol>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> test <span class="token punctuation">(</span>
  id <span class="token keyword">INT</span><span class="token punctuation">,</span>
  name <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token keyword">unique</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><ol start="2">
<li>创建完表后添加</li>
</ol>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">alter</span> <span class="token keyword">table</span> test <span class="token keyword">modify</span> age <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token keyword">unique</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ol start="3">
<li>删除唯一约束</li>
</ol>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">alter</span> <span class="token keyword">table</span> test <span class="token keyword">drop</span> <span class="token keyword">index</span> age
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="主键约束"><a class="header-anchor" href="#主键约束">#</a> 主键约束</h2>
<ul>
<li><code>primary key</code>
<ol>
<li>非空且唯一</li>
<li>一张表只能有一个主键</li>
<li>主键就是表中记录的唯一标识</li>
</ol>
</li>
</ul>
<ol>
<li>创建表时添加</li>
</ol>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> test <span class="token punctuation">(</span>
  id <span class="token keyword">INT</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span><span class="token punctuation">,</span>
  name <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><ol start="2">
<li>创建完表后添加</li>
</ol>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">alter</span> <span class="token keyword">table</span> test <span class="token keyword">modify</span> age <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token keyword">unique</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ol start="3">
<li>删除唯一约束</li>
</ol>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">alter</span> <span class="token keyword">table</span> test <span class="token keyword">drop</span> <span class="token keyword">index</span> age
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="外键约束"><a class="header-anchor" href="#外键约束">#</a> 外键约束</h2>
<ul>
<li><code>foreign key</code></li>
</ul>
</template>