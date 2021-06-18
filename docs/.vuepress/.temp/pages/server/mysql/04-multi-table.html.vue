<template><h1 id="多表查询"><a class="header-anchor" href="#多表查询">#</a> 多表查询</h1>
<ul>
<li>创建表</li>
</ul>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">-- 创建部门表</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> dept<span class="token punctuation">(</span>
    id <span class="token keyword">INT</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token keyword">AUTO_INCREMENT</span><span class="token punctuation">,</span>
    NAME <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> dept <span class="token punctuation">(</span>NAME<span class="token punctuation">)</span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token string">'开发部'</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token string">'市场部'</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token string">'财务部'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">-- 创建员工表</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> emp <span class="token punctuation">(</span>
    id <span class="token keyword">INT</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token keyword">AUTO_INCREMENT</span><span class="token punctuation">,</span>
    NAME <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    gender <span class="token keyword">CHAR</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">-- 性别</span>
    salary <span class="token keyword">DOUBLE</span><span class="token punctuation">,</span> <span class="token comment">-- 工资</span>
    join_date <span class="token keyword">DATE</span><span class="token punctuation">,</span> <span class="token comment">-- 入职日期</span>
    dept_id <span class="token keyword">INT</span><span class="token punctuation">,</span>
    <span class="token keyword">FOREIGN</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span>dept_id<span class="token punctuation">)</span> <span class="token keyword">REFERENCES</span> dept<span class="token punctuation">(</span>id<span class="token punctuation">)</span> <span class="token comment">-- 外键，关联部门表(部门表的主键)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> emp<span class="token punctuation">(</span>NAME<span class="token punctuation">,</span>gender<span class="token punctuation">,</span>salary<span class="token punctuation">,</span>join_date<span class="token punctuation">,</span>dept_id<span class="token punctuation">)</span> <span class="token keyword">VALUES</span><span class="token punctuation">(</span><span class="token string">'张三'</span><span class="token punctuation">,</span><span class="token string">'男'</span><span class="token punctuation">,</span><span class="token number">7200</span><span class="token punctuation">,</span><span class="token string">'2013-02-24'</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> emp<span class="token punctuation">(</span>NAME<span class="token punctuation">,</span>gender<span class="token punctuation">,</span>salary<span class="token punctuation">,</span>join_date<span class="token punctuation">,</span>dept_id<span class="token punctuation">)</span> <span class="token keyword">VALUES</span><span class="token punctuation">(</span><span class="token string">'李四'</span><span class="token punctuation">,</span><span class="token string">'男'</span><span class="token punctuation">,</span><span class="token number">3600</span><span class="token punctuation">,</span><span class="token string">'2010-12-02'</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> emp<span class="token punctuation">(</span>NAME<span class="token punctuation">,</span>gender<span class="token punctuation">,</span>salary<span class="token punctuation">,</span>join_date<span class="token punctuation">,</span>dept_id<span class="token punctuation">)</span> <span class="token keyword">VALUES</span><span class="token punctuation">(</span><span class="token string">'王五'</span><span class="token punctuation">,</span><span class="token string">'男'</span><span class="token punctuation">,</span><span class="token number">9000</span><span class="token punctuation">,</span><span class="token string">'2008-08-08'</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> emp<span class="token punctuation">(</span>NAME<span class="token punctuation">,</span>gender<span class="token punctuation">,</span>salary<span class="token punctuation">,</span>join_date<span class="token punctuation">,</span>dept_id<span class="token punctuation">)</span> <span class="token keyword">VALUES</span><span class="token punctuation">(</span><span class="token string">'赵六'</span><span class="token punctuation">,</span><span class="token string">'女'</span><span class="token punctuation">,</span><span class="token number">5000</span><span class="token punctuation">,</span><span class="token string">'2015-10-07'</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> emp<span class="token punctuation">(</span>NAME<span class="token punctuation">,</span>gender<span class="token punctuation">,</span>salary<span class="token punctuation">,</span>join_date<span class="token punctuation">,</span>dept_id<span class="token punctuation">)</span> <span class="token keyword">VALUES</span><span class="token punctuation">(</span><span class="token string">'蜘蛛精'</span><span class="token punctuation">,</span><span class="token string">'女'</span><span class="token punctuation">,</span><span class="token number">4500</span><span class="token punctuation">,</span><span class="token string">'2011-03-14'</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> emp<span class="token punctuation">(</span>NAME<span class="token punctuation">,</span>gender<span class="token punctuation">,</span>salary<span class="token punctuation">,</span>join_date<span class="token punctuation">,</span>dept_id<span class="token punctuation">)</span> <span class="token keyword">VALUES</span><span class="token punctuation">(</span><span class="token string">'测试内外链接'</span><span class="token punctuation">,</span><span class="token string">'女'</span><span class="token punctuation">,</span><span class="token number">4500</span><span class="token punctuation">,</span><span class="token boolean">Null</span><span class="token punctuation">,</span><span class="token boolean">Null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><ul>
<li>
<p>笛卡儿积</p>
<ol>
<li>有两个集合 A、B，取这两个集合的所有组成情况</li>
<li>要完成多表查询，需要用<code>where</code>消除无用的数据</li>
</ol>
</li>
<li>
<p>数据表对应关系</p>
<ul>
<li><code>emp</code> 表的 <code>dept_id</code> 外键 <code>dept</code> 表的 <code>id</code>
<img src="@source/server/mysql/images/mysql-01.png" alt="inheritAttrs: true"></li>
</ul>
</li>
</ul>
<h2 id="内链接"><a class="header-anchor" href="#内链接">#</a> 内链接</h2>
<ul>
<li>
<p>内连接指的是把表与表之间匹配的数据行查询出来。就是两张表之间数据行匹配时，要同时满足<code>ON</code>语句后面的条件才行。</p>
</li>
<li>
<p><strong>1.1 隐式内链接</strong>，条件前面是<code>Where</code></p>
</li>
</ul>
<div class="custom-container warning"><p class="custom-container-title">语法</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">select</span>
  字段<span class="token number">1</span><span class="token punctuation">,</span> 字段<span class="token number">2</span><span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token keyword">from</span>
  表名<span class="token number">1</span><span class="token punctuation">,</span> 表名<span class="token number">2</span><span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>   <span class="token comment">-- 在表之间加上 inner join 就是显示内链接了</span>
<span class="token keyword">where</span>
  条件
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div></div>
<div class="custom-container tip"><p class="custom-container-title">示例</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span>
  t1<span class="token punctuation">.</span><span class="token operator">*</span><span class="token punctuation">,</span>               <span class="token comment">-- 字段名</span>
  t2<span class="token punctuation">.</span><span class="token punctuation">`</span>name<span class="token punctuation">`</span> t2_name   <span class="token comment">-- 字段名</span>
<span class="token keyword">FROM</span>
  emp t1<span class="token punctuation">,</span>   <span class="token comment">-- 表名</span>
  dept t2   <span class="token comment">-- 表名</span>
<span class="token keyword">WHERE</span>
  t1<span class="token punctuation">.</span>dept_id <span class="token operator">=</span> t2<span class="token punctuation">.</span>id    <span class="token comment">-- 条件</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div></div>
<ul>
<li><strong>1.2 显式内链接</strong>，条件前面是<code>On</code></li>
</ul>
<div class="custom-container warning"><p class="custom-container-title">语法</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">select</span>
  字段<span class="token number">1</span><span class="token punctuation">,</span> 字段<span class="token number">2</span><span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token keyword">from</span>
  表名<span class="token number">1</span>
<span class="token keyword">inner</span> <span class="token keyword">join</span>
  表名<span class="token number">2</span>
<span class="token keyword">on</span>
  条件
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div></div>
<div class="custom-container tip"><p class="custom-container-title">示例</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span>
  t1<span class="token punctuation">.</span><span class="token operator">*</span><span class="token punctuation">,</span>               <span class="token comment">-- 字段名</span>
  t2<span class="token punctuation">.</span><span class="token punctuation">`</span>name<span class="token punctuation">`</span> t2_name   <span class="token comment">-- 字段名</span>
<span class="token keyword">FROM</span>
  emp t1    <span class="token comment">-- 表名</span>
<span class="token keyword">INNER</span> <span class="token keyword">JOIN</span>  <span class="token comment">-- inner 可以省略</span>
  dept t2   <span class="token comment">-- 表名</span>
<span class="token keyword">ON</span>
  t1<span class="token punctuation">.</span>dept_id <span class="token operator">=</span> t2<span class="token punctuation">.</span>id  <span class="token comment">-- 条件</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div></div>
<ul>
<li><strong>1.3 内链接要点</strong>
<ol>
<li>从哪些表中查询数据</li>
<li>条件是什么</li>
<li>查询哪些字段</li>
<li><strong>如果某一条的外键为<code>Null</code>的话就会忽略这一条，这时候就需要使用外链接来查询</strong></li>
</ol>
</li>
</ul>
<h2 id="外链接"><a class="header-anchor" href="#外链接">#</a> 外链接</h2>
<ul>
<li>
<p><code>JOIN</code>前面的表叫<code>左表</code>，后面的表叫<code>右表</code>，外链接的条件在<code>On</code>后面添加，</p>
</li>
<li>
<p><strong>1.1 左外链接</strong></p>
<blockquote>
<p>无论是否符合<code>ON</code>语句后面的条件都会把<strong>左表的记录全部查询出来</strong>，右边的那张表只匹配符合条件的数据。当左表有数据而右表不满足条件时右表则填充 <code>Null</code></p>
</blockquote>
</li>
</ul>
<div class="custom-container warning"><p class="custom-container-title">语法</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">select</span>
  字段<span class="token number">1</span><span class="token punctuation">,</span> 字段<span class="token number">2</span><span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token keyword">from</span>
  表名<span class="token number">1</span>
<span class="token keyword">left</span> <span class="token keyword">outer</span> <span class="token keyword">join</span>   <span class="token comment">-- outer可以省略</span>
  表名<span class="token number">2</span>
<span class="token keyword">on</span>
  条件
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div></div>
<div class="custom-container tip"><p class="custom-container-title">查询的是左表所有数据以及其右表交集部分。</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span>
  t1<span class="token punctuation">.</span><span class="token operator">*</span><span class="token punctuation">,</span>               <span class="token comment">-- 字段名</span>
  t2<span class="token punctuation">.</span><span class="token punctuation">`</span>name<span class="token punctuation">`</span> t2_name   <span class="token comment">-- 字段名</span>
<span class="token keyword">FROM</span>
  emp t1   <span class="token comment">-- 表名</span>
<span class="token keyword">LEFT</span> <span class="token keyword">JOIN</span>
  dept t2   <span class="token comment">-- 表名</span>
<span class="token keyword">ON</span>
  t1<span class="token punctuation">.</span>dept_id <span class="token operator">=</span> t2<span class="token punctuation">.</span>id    <span class="token comment">-- 条件</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div></div>
<ul>
<li>
<p><strong>1.2 右外链接</strong></p>
<blockquote>
<p>跟左外链接恰好相反，右边的表不管有没有满足<code>ON</code>后面的条件都会查询出来</p>
</blockquote>
</li>
</ul>
<div class="custom-container warning"><p class="custom-container-title">语法</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">select</span>
  字段<span class="token number">1</span><span class="token punctuation">,</span> 字段<span class="token number">2</span><span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token keyword">from</span>
  表名<span class="token number">1</span>
<span class="token keyword">right</span> <span class="token keyword">outer</span> <span class="token keyword">join</span>  <span class="token comment">-- outer可以省略</span>
  表名<span class="token number">2</span>
<span class="token keyword">on</span>
  条件
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div></div>
<div class="custom-container tip"><p class="custom-container-title">查询的是右表所有数据以及其左表交集部分。</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span>
  t1<span class="token punctuation">.</span><span class="token operator">*</span><span class="token punctuation">,</span>               <span class="token comment">-- 字段名</span>
  t2<span class="token punctuation">.</span><span class="token punctuation">`</span>name<span class="token punctuation">`</span> t2_name   <span class="token comment">-- 字段名</span>
<span class="token keyword">FROM</span>
  emp t1    <span class="token comment">-- 表名</span>
<span class="token keyword">RIGHT</span> <span class="token keyword">JOIN</span>
  dept t2   <span class="token comment">-- 表名</span>
<span class="token keyword">ON</span>
  t1<span class="token punctuation">.</span>dept_id <span class="token operator">=</span> t2<span class="token punctuation">.</span>id    <span class="token comment">-- 条件</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div></div>
<ul>
<li>
<p><strong>1.3 当查询字段为<code>Null</code>时内链接、左外链接和右外链接的一些区别</strong>
<img src="@source/server/mysql/images/mysql-05.png" alt="inheritAttrs: true"></p>
<ol start="2">
<li>内链接（inner join）</li>
</ol>
<p><img src="@source/server/mysql/images/mysql-04.png" alt="inheritAttrs: true"></p>
<ol start="3">
<li>左外链接（left join）</li>
</ol>
<p><img src="@source/server/mysql/images/mysql-02.png" alt="inheritAttrs: true"></p>
<ol start="4">
<li>右外链接（right join）</li>
</ol>
<p><img src="@source/server/mysql/images/mysql-03.png" alt="inheritAttrs: true"></p>
</li>
</ul>
<h2 id="子查询"><a class="header-anchor" href="#子查询">#</a> 子查询</h2>
<ul>
<li>概念：查询中嵌套查询，称嵌套查询为子查询。根据子查询返回的结果可分为 3 钟情况
<ol>
<li>子查询的结果是<strong>单行单列</strong></li>
<li>子查询的结果是<strong>多行单列</strong></li>
<li>子查询的结果是<strong>多行多列</strong>，又叫虚拟表</li>
</ol>
</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">1. 单行单列：查询员工工资小于平均工资的记录</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">-- 1. 找出子查询语句</span>
<span class="token keyword">SELECT</span> <span class="token function">AVG</span><span class="token punctuation">(</span>salary<span class="token punctuation">)</span> <span class="token keyword">FROM</span> emp

<span class="token comment">-- 2. 使用子查询</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> emp <span class="token keyword">WHERE</span> salary <span class="token operator">&lt;</span> <span class="token punctuation">(</span><span class="token keyword">SELECT</span> <span class="token function">AVG</span><span class="token punctuation">(</span>salary<span class="token punctuation">)</span> <span class="token keyword">FROM</span> emp<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><ul>
<li>子查询的结果是单行单列的
<img src="@source/server/mysql/images/mysql-06.png" alt="inheritAttrs: true"></li>
</ul>
</div>
<div class="custom-container tip"><p class="custom-container-title">2. 多行单列：查询 财务部 和 市场部 所有的员工信息</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">-- 1. 找出子查询语句</span>
<span class="token keyword">SELECT</span> id <span class="token keyword">FROM</span> dept <span class="token keyword">WHERE</span> <span class="token punctuation">`</span>name<span class="token punctuation">`</span> <span class="token operator">=</span> <span class="token string">'开发部'</span> <span class="token operator">OR</span> <span class="token punctuation">`</span>name<span class="token punctuation">`</span> <span class="token operator">=</span> <span class="token string">'市场部'</span>

<span class="token comment">-- 2. 使用子查询</span>
<span class="token keyword">SELECT</span>
  <span class="token operator">*</span>
<span class="token keyword">FROM</span>
  emp
<span class="token keyword">WHERE</span>
  dept_id
<span class="token operator">IN</span> <span class="token punctuation">(</span><span class="token keyword">SELECT</span> id <span class="token keyword">FROM</span> dept <span class="token keyword">WHERE</span> <span class="token punctuation">`</span>name<span class="token punctuation">`</span> <span class="token operator">IN</span><span class="token punctuation">(</span><span class="token string">'开发部'</span><span class="token punctuation">,</span> <span class="token string">'市场部'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><ul>
<li>子查询的结果是多行单列的
<img src="@source/server/mysql/images/mysql-07.png" alt="inheritAttrs: true"></li>
</ul>
</div>
<div class="custom-container tip"><p class="custom-container-title">3. 多行多列：查询员工入职日期是 2011-11-11 日之后的 员工信息 和 部门信息</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">-- 1. 找出子查询语句</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> emp <span class="token keyword">WHERE</span> join_date <span class="token operator">></span> <span class="token string">'2011-11-11'</span>

<span class="token comment">-- 2. 使用 子查询 跟 内链接</span>
<span class="token keyword">SELECT</span>
	t1<span class="token punctuation">.</span><span class="token operator">*</span><span class="token punctuation">,</span>
	t2<span class="token punctuation">.</span>name t2_name
<span class="token keyword">FROM</span>
	<span class="token punctuation">(</span> <span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> emp <span class="token keyword">WHERE</span> join_date <span class="token operator">></span> <span class="token string">'2011-11-11'</span> <span class="token punctuation">)</span> t1<span class="token punctuation">,</span>
	dept t2
<span class="token keyword">WHERE</span>
	t1<span class="token punctuation">.</span>dept_id <span class="token operator">IN</span> <span class="token punctuation">(</span>t2<span class="token punctuation">.</span>id<span class="token punctuation">)</span>

<span class="token comment">-- 单独使用内链接也可以实现</span>
<span class="token keyword">SELECT</span>
	t1<span class="token punctuation">.</span><span class="token operator">*</span><span class="token punctuation">,</span>
	t2<span class="token punctuation">.</span>name t2_name
<span class="token keyword">FROM</span>
	emp	t1<span class="token punctuation">,</span>
	dept t2
<span class="token keyword">WHERE</span>
	t1<span class="token punctuation">.</span>join_date<span class="token operator">></span><span class="token string">'2011-11-11'</span> <span class="token operator">AND</span> t1<span class="token punctuation">.</span>dept_id <span class="token operator">=</span> t2<span class="token punctuation">.</span>id
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><ul>
<li>子查询的结果是多行多列的，<strong>虚拟表</strong>
<img src="@source/server/mysql/images/mysql-08.png" alt="inheritAttrs: true"></li>
</ul>
</div>
<h2 id="多表查询练习"><a class="header-anchor" href="#多表查询练习">#</a> 多表查询练习</h2>
<ul>
<li>准备数据表</li>
</ul>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code>  <span class="token comment">-- 1. 部门表</span>
  <span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> dept <span class="token punctuation">(</span>
    id <span class="token keyword">INT</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span><span class="token punctuation">,</span> <span class="token comment">-- 部门id</span>
    dname <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">-- 部门名称</span>
    loc <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span> <span class="token comment">-- 部门所在地</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">-- 添加4个部门</span>
  <span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> dept<span class="token punctuation">(</span>id<span class="token punctuation">,</span>dname<span class="token punctuation">,</span>loc<span class="token punctuation">)</span> <span class="token keyword">VALUES</span>
  <span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token string">'教研部'</span><span class="token punctuation">,</span><span class="token string">'北京'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">,</span><span class="token string">'学工部'</span><span class="token punctuation">,</span><span class="token string">'上海'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">,</span><span class="token string">'销售部'</span><span class="token punctuation">,</span><span class="token string">'广州'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span><span class="token number">40</span><span class="token punctuation">,</span><span class="token string">'财务部'</span><span class="token punctuation">,</span><span class="token string">'深圳'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


  <span class="token comment">-- 2. 职务表</span>
  <span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> job <span class="token punctuation">(</span>
    id <span class="token keyword">INT</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span><span class="token punctuation">,</span>
    jname <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">,</span>    <span class="token comment">-- 职务名称</span>
    description <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span>   <span class="token comment">-- 职务描述</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">-- 添加4个职务</span>
  <span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> job <span class="token punctuation">(</span>id<span class="token punctuation">,</span> jname<span class="token punctuation">,</span> description<span class="token punctuation">)</span> <span class="token keyword">VALUES</span>
  <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">'董事长'</span><span class="token punctuation">,</span> <span class="token string">'管理整个公司，接单'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">'经理'</span><span class="token punctuation">,</span> <span class="token string">'管理部门员工'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token string">'销售员'</span><span class="token punctuation">,</span> <span class="token string">'向客人推销产品'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token string">'文员'</span><span class="token punctuation">,</span> <span class="token string">'使用办公软件'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


  <span class="token comment">-- 3. 员工表</span>
  <span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> emp <span class="token punctuation">(</span>
    id <span class="token keyword">INT</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span><span class="token punctuation">,</span> <span class="token comment">-- 员工id</span>
    ename <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">-- 员工姓名</span>
    job_id <span class="token keyword">INT</span><span class="token punctuation">,</span> <span class="token comment">-- 职务id</span>
    mgr <span class="token keyword">INT</span> <span class="token punctuation">,</span> <span class="token comment">-- 上级领导</span>
    joindate <span class="token keyword">DATE</span><span class="token punctuation">,</span> <span class="token comment">-- 入职日期</span>
    salary <span class="token keyword">DECIMAL</span><span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">-- 工资</span>
    bonus <span class="token keyword">DECIMAL</span><span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">-- 奖金</span>
    dept_id <span class="token keyword">INT</span><span class="token punctuation">,</span> <span class="token comment">-- 所在部门编号</span>
    <span class="token keyword">CONSTRAINT</span> emp_jobid_ref_job_id_fk <span class="token keyword">FOREIGN</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span>job_id<span class="token punctuation">)</span> <span class="token keyword">REFERENCES</span> job <span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">CONSTRAINT</span> emp_deptid_ref_dept_id_fk <span class="token keyword">FOREIGN</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span>dept_id<span class="token punctuation">)</span> <span class="token keyword">REFERENCES</span> dept <span class="token punctuation">(</span>id<span class="token punctuation">)</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">-- 添加员工</span>
  <span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> emp<span class="token punctuation">(</span>id<span class="token punctuation">,</span>ename<span class="token punctuation">,</span>job_id<span class="token punctuation">,</span>mgr<span class="token punctuation">,</span>joindate<span class="token punctuation">,</span>salary<span class="token punctuation">,</span>bonus<span class="token punctuation">,</span>dept_id<span class="token punctuation">)</span> <span class="token keyword">VALUES</span>
  <span class="token punctuation">(</span><span class="token number">1001</span><span class="token punctuation">,</span><span class="token string">'张三'</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">1004</span><span class="token punctuation">,</span><span class="token string">'2000-12-17'</span><span class="token punctuation">,</span><span class="token string">'8000.00'</span><span class="token punctuation">,</span><span class="token boolean">NULL</span><span class="token punctuation">,</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span><span class="token number">1002</span><span class="token punctuation">,</span><span class="token string">'李四'</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">1006</span><span class="token punctuation">,</span><span class="token string">'2001-02-20'</span><span class="token punctuation">,</span><span class="token string">'16000.00'</span><span class="token punctuation">,</span><span class="token string">'3000.00'</span><span class="token punctuation">,</span><span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span><span class="token number">1003</span><span class="token punctuation">,</span><span class="token string">'王五'</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">1006</span><span class="token punctuation">,</span><span class="token string">'2001-02-22'</span><span class="token punctuation">,</span><span class="token string">'12500.00'</span><span class="token punctuation">,</span><span class="token string">'5000.00'</span><span class="token punctuation">,</span><span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span><span class="token number">1004</span><span class="token punctuation">,</span><span class="token string">'赵六'</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">1009</span><span class="token punctuation">,</span><span class="token string">'2001-04-02'</span><span class="token punctuation">,</span><span class="token string">'29750.00'</span><span class="token punctuation">,</span><span class="token boolean">NULL</span><span class="token punctuation">,</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span><span class="token number">1009</span><span class="token punctuation">,</span><span class="token string">'孙七'</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token boolean">NULL</span><span class="token punctuation">,</span><span class="token string">'2001-11-17'</span><span class="token punctuation">,</span><span class="token string">'50000.00'</span><span class="token punctuation">,</span><span class="token boolean">NULL</span><span class="token punctuation">,</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span><span class="token number">1010</span><span class="token punctuation">,</span><span class="token string">'周八'</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">1006</span><span class="token punctuation">,</span><span class="token string">'2001-09-08'</span><span class="token punctuation">,</span><span class="token string">'15000.00'</span><span class="token punctuation">,</span><span class="token string">'0.00'</span><span class="token punctuation">,</span><span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span><span class="token number">1011</span><span class="token punctuation">,</span><span class="token string">'吴九'</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">1004</span><span class="token punctuation">,</span><span class="token string">'2007-05-23'</span><span class="token punctuation">,</span><span class="token string">'11000.00'</span><span class="token punctuation">,</span><span class="token boolean">NULL</span><span class="token punctuation">,</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span><span class="token number">1012</span><span class="token punctuation">,</span><span class="token string">'郑十'</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">1006</span><span class="token punctuation">,</span><span class="token string">'2001-12-03'</span><span class="token punctuation">,</span><span class="token string">'9500.00'</span><span class="token punctuation">,</span><span class="token boolean">NULL</span><span class="token punctuation">,</span><span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span><span class="token number">1005</span><span class="token punctuation">,</span><span class="token string">'哼哼'</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">1006</span><span class="token punctuation">,</span><span class="token string">'2001-09-28'</span><span class="token punctuation">,</span><span class="token string">'12500.00'</span><span class="token punctuation">,</span><span class="token string">'14000.00'</span><span class="token punctuation">,</span><span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span><span class="token number">1006</span><span class="token punctuation">,</span><span class="token string">'呵呵'</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">1009</span><span class="token punctuation">,</span><span class="token string">'2001-05-01'</span><span class="token punctuation">,</span><span class="token string">'28500.00'</span><span class="token punctuation">,</span><span class="token boolean">NULL</span><span class="token punctuation">,</span><span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span><span class="token number">1007</span><span class="token punctuation">,</span><span class="token string">'嘻嘻'</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">1009</span><span class="token punctuation">,</span><span class="token string">'2001-09-01'</span><span class="token punctuation">,</span><span class="token string">'24500.00'</span><span class="token punctuation">,</span><span class="token boolean">NULL</span><span class="token punctuation">,</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span><span class="token number">1008</span><span class="token punctuation">,</span><span class="token string">'哈哈'</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">1004</span><span class="token punctuation">,</span><span class="token string">'2007-04-19'</span><span class="token punctuation">,</span><span class="token string">'30000.00'</span><span class="token punctuation">,</span><span class="token boolean">NULL</span><span class="token punctuation">,</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span><span class="token number">1013</span><span class="token punctuation">,</span><span class="token string">'嗯嗯'</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">1004</span><span class="token punctuation">,</span><span class="token string">'2001-12-03'</span><span class="token punctuation">,</span><span class="token string">'30000.00'</span><span class="token punctuation">,</span><span class="token boolean">NULL</span><span class="token punctuation">,</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span><span class="token number">1014</span><span class="token punctuation">,</span><span class="token string">'呃呃'</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">1007</span><span class="token punctuation">,</span><span class="token string">'2002-01-23'</span><span class="token punctuation">,</span><span class="token string">'13000.00'</span><span class="token punctuation">,</span><span class="token boolean">NULL</span><span class="token punctuation">,</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


  <span class="token comment">-- 4. 工资等级表</span>
  <span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> salarygrade <span class="token punctuation">(</span>
    grade <span class="token keyword">INT</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span><span class="token punctuation">,</span>   <span class="token comment">-- 级别</span>
    losalary <span class="token keyword">INT</span><span class="token punctuation">,</span>  <span class="token comment">-- 最低工资</span>
    hisalary <span class="token keyword">INT</span> <span class="token comment">-- 最高工资</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">-- 添加5个工资等级</span>
  <span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> salarygrade<span class="token punctuation">(</span>grade<span class="token punctuation">,</span>losalary<span class="token punctuation">,</span>hisalary<span class="token punctuation">)</span> <span class="token keyword">VALUES</span>
  <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">7000</span><span class="token punctuation">,</span><span class="token number">12000</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">12010</span><span class="token punctuation">,</span><span class="token number">14000</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">14010</span><span class="token punctuation">,</span><span class="token number">20000</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">20010</span><span class="token punctuation">,</span><span class="token number">30000</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token number">30010</span><span class="token punctuation">,</span><span class="token number">99990</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br></div></div><ul>
<li>表关系
<img src="@source/server/mysql/images/mysql-09.png" alt="inheritAttrs: true"></li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">练习一：查询 员工编号，员工姓名，工资，职务名称，职务描述</p>
<ul>
<li>分析
<ol>
<li>emp 表：员工编号，员工姓名，工资</li>
<li>job 表：职务名称，职务描述</li>
</ol>
</li>
</ul>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span>
	<span class="token operator">*</span>
<span class="token keyword">FROM</span>
	emp t1<span class="token punctuation">,</span>
	job t2
<span class="token keyword">WHERE</span>
	t1<span class="token punctuation">.</span>job_id <span class="token operator">=</span> t2<span class="token punctuation">.</span>id   <span class="token comment">-- 查询条件</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div></div>
<hr>
<div class="custom-container tip"><p class="custom-container-title">练习二：查询 员工编号，员工姓名，工资，职务名称，职务描述，部门名称，部门位置</p>
<ul>
<li>分析
<ol>
<li>emp 表：员工编号，员工姓名，工资</li>
<li>job 表：职务名称，职务描述</li>
<li>dept 表：部门名称，部门位置</li>
</ol>
</li>
</ul>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span>
	t1<span class="token punctuation">.</span>id<span class="token punctuation">,</span>          <span class="token comment">-- 员工编号</span>
	t1<span class="token punctuation">.</span>name<span class="token punctuation">,</span>        <span class="token comment">-- 员工姓名</span>
	t1<span class="token punctuation">.</span>salary<span class="token punctuation">,</span>      <span class="token comment">-- 员工工资</span>
	t2<span class="token punctuation">.</span>jname<span class="token punctuation">,</span>       <span class="token comment">-- 职务名称</span>
	t2<span class="token punctuation">.</span>description<span class="token punctuation">,</span> <span class="token comment">-- 职务描述</span>
	t3<span class="token punctuation">.</span>dname<span class="token punctuation">,</span>       <span class="token comment">-- 部门名称</span>
	t3<span class="token punctuation">.</span>loc          <span class="token comment">-- 部门位置</span>
<span class="token keyword">FROM</span>
	emp t1<span class="token punctuation">,</span>
	job t2<span class="token punctuation">,</span>
	dept t3
<span class="token keyword">WHERE</span>
	t1<span class="token punctuation">.</span>job_id <span class="token operator">=</span> t2<span class="token punctuation">.</span>id   <span class="token comment">-- 查询条件 1</span>
<span class="token operator">AND</span>
  t1<span class="token punctuation">.</span>dept_id <span class="token operator">=</span> t3<span class="token punctuation">.</span>id  <span class="token comment">-- 查询条件 2</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div></div>
<hr>
<div class="custom-container tip"><p class="custom-container-title">练习三：查询 员工姓名，工资，工资等级</p>
<ul>
<li>分析
<ol>
<li>emp 表：员工姓名，工资</li>
<li>salarygrade 表：工资等级</li>
<li>查询条件：<code>emp.salary BETWEEN salarygrade.min AND salarygrade.max</code></li>
</ol>
</li>
</ul>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span>
	t1<span class="token punctuation">.</span>name<span class="token punctuation">,</span>      <span class="token comment">-- 员工编号</span>
	t1<span class="token punctuation">.</span>salary<span class="token punctuation">,</span>    <span class="token comment">-- 员工姓名</span>
	t2<span class="token punctuation">.</span><span class="token operator">*</span>          <span class="token comment">-- salarygrade 表</span>
<span class="token keyword">FROM</span>
	emp t1<span class="token punctuation">,</span>
	salarygrade t2
<span class="token keyword">WHERE</span>
	t1<span class="token punctuation">.</span>salary <span class="token operator">BETWEEN</span> t2<span class="token punctuation">.</span>min <span class="token operator">AND</span> t2<span class="token punctuation">.</span>max   <span class="token comment">-- 查询条件</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div></div>
<hr>
<div class="custom-container tip"><p class="custom-container-title">练习四：查询 员工姓名，工资，职务名称，职务描述，部门名称，部门位置，工资等级</p>
<ul>
<li>分析
<ol>
<li>emp 表：员工姓名，工资</li>
<li>job 表：职务名称，职务描述</li>
<li>dept 表：部门名称，部门位置</li>
<li>salarygrade 表：工资等级</li>
</ol>
</li>
</ul>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span>
	t1<span class="token punctuation">.</span>id<span class="token punctuation">,</span>            <span class="token comment">-- 员工编号</span>
	t1<span class="token punctuation">.</span>NAME<span class="token punctuation">,</span>          <span class="token comment">-- 员工姓名</span>
	t1<span class="token punctuation">.</span>salary<span class="token punctuation">,</span>        <span class="token comment">-- 员工工资</span>

	t2<span class="token punctuation">.</span>jname<span class="token punctuation">,</span>         <span class="token comment">-- 职务名称</span>
	t2<span class="token punctuation">.</span>description<span class="token punctuation">,</span>   <span class="token comment">-- 职务描述</span>

	t3<span class="token punctuation">.</span>dname<span class="token punctuation">,</span>         <span class="token comment">-- 部门名称</span>
	t3<span class="token punctuation">.</span>loc<span class="token punctuation">,</span>           <span class="token comment">-- 部门位置</span>

	t4<span class="token punctuation">.</span>grade          <span class="token comment">-- 工资等级</span>
<span class="token keyword">FROM</span>
	emp t1<span class="token punctuation">,</span>
	job t2<span class="token punctuation">,</span>
	dept t3<span class="token punctuation">,</span>
	salarygrade t4
<span class="token keyword">WHERE</span>
	t1<span class="token punctuation">.</span>job_id <span class="token operator">=</span> t2<span class="token punctuation">.</span>id       <span class="token comment">-- 查询条件 1</span>
<span class="token operator">AND</span>
	t1<span class="token punctuation">.</span>dept_id <span class="token operator">=</span> t3<span class="token punctuation">.</span>id      <span class="token comment">-- 查询条件 2</span>
<span class="token operator">AND</span>
	t1<span class="token punctuation">.</span>salary <span class="token operator">BETWEEN</span> t4<span class="token punctuation">.</span>min <span class="token operator">AND</span> t4<span class="token punctuation">.</span>max   <span class="token comment">-- 查询条件 3</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div></div>
<hr>
<div class="custom-container tip"><p class="custom-container-title">练习五：查询 部门编号、部门名称、部门位置、部门人数</p>
<ul>
<li>分析
<ol>
<li>dept 表：部门编号、部门名称、部门位置</li>
<li>emp 表：部门人数，通过分组获得</li>
<li>知识点：分组查询，子查询（生成一张虚拟表），外链接</li>
</ol>
</li>
</ul>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code>
<span class="token keyword">SELECT</span> 
	<span class="token operator">*</span>
<span class="token keyword">FROM</span>
	dept t1
<span class="token keyword">LEFT</span> <span class="token keyword">JOIN</span>
	<span class="token punctuation">(</span><span class="token keyword">SELECT</span> dept_id<span class="token punctuation">,</span> <span class="token function">COUNT</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span> total <span class="token keyword">FROM</span> emp <span class="token keyword">GROUP</span> <span class="token keyword">BY</span> dept_id<span class="token punctuation">)</span> t2
<span class="token keyword">ON</span> t1<span class="token punctuation">.</span>id <span class="token operator">=</span> t2<span class="token punctuation">.</span>dept_id

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div></div>
<hr>
<div class="custom-container tip"><p class="custom-container-title">练习六：查询 所有员工的姓名 及其 直接上级的姓名,没有领导的员工也需要查询</p>
<ul>
<li>分析
<ol>
<li>由于上级也在当前表，所以用起别名的方式来自查询</li>
<li>为了防止为<code>Null</code>的情况，需要使用外链接</li>
</ol>
</li>
</ul>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span>
	t1<span class="token punctuation">.</span>name<span class="token punctuation">,</span>
	t1<span class="token punctuation">.</span>mgr<span class="token punctuation">,</span>
	t2<span class="token punctuation">.</span><span class="token punctuation">`</span>id<span class="token punctuation">`</span><span class="token punctuation">,</span>
	t2<span class="token punctuation">.</span>name 
<span class="token keyword">FROM</span>
	emp t1
<span class="token keyword">LEFT</span> <span class="token keyword">JOIN</span>
	emp t2 
<span class="token keyword">ON</span>
	t1<span class="token punctuation">.</span>mgr <span class="token operator">=</span> t2<span class="token punctuation">.</span><span class="token punctuation">`</span>id<span class="token punctuation">`</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div></div>
</template>