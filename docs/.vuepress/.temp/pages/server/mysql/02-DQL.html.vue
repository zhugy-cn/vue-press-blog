<template><h1 id="dql"><a class="header-anchor" href="#dql">#</a> DQL</h1>
<h2 id="语法"><a class="header-anchor" href="#语法">#</a> 语法</h2>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">select</span>
    字段列表
<span class="token keyword">from</span>
    表名列表
<span class="token keyword">where</span>
    条件列表
<span class="token keyword">group</span> <span class="token keyword">by</span>
    分组字段
<span class="token keyword">having</span>
    分组之后的条件
<span class="token keyword">order</span> <span class="token keyword">by</span>
    排序
<span class="token keyword">limit</span>
    分页限定
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h2 id="基础查询"><a class="header-anchor" href="#基础查询">#</a> 基础查询</h2>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">-- 1. 多个字段的查询</span>
<span class="token keyword">SELECT</span> id<span class="token punctuation">,</span> <span class="token punctuation">`</span>name<span class="token punctuation">`</span><span class="token punctuation">,</span> sex <span class="token keyword">from</span> <span class="token punctuation">`</span><span class="token keyword">user</span><span class="token punctuation">`</span>

<span class="token comment">-- 2. 用 * 号查询全部字段</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> <span class="token punctuation">`</span><span class="token keyword">user</span><span class="token punctuation">`</span>

<span class="token comment">-- 3. 用 as 起别名，as 也可以省略，字段之间用逗号隔开</span>
<span class="token keyword">SELECT</span> name <span class="token keyword">AS</span> n<span class="token punctuation">,</span> age a<span class="token punctuation">,</span> sex <span class="token keyword">AS</span> s <span class="token keyword">FROM</span> <span class="token punctuation">`</span><span class="token keyword">user</span><span class="token punctuation">`</span>

<span class="token comment">-- 4. 去除重复</span>
<span class="token keyword">SELECT</span> <span class="token keyword">DISTINCT</span> age <span class="token keyword">FROM</span> <span class="token punctuation">`</span><span class="token keyword">user</span><span class="token punctuation">`</span>

<span class="token comment">-- 5. 四则运算</span>
<span class="token keyword">SELECT</span> <span class="token punctuation">`</span>name<span class="token punctuation">`</span><span class="token punctuation">,</span> id <span class="token operator">+</span> age <span class="token keyword">AS</span> total<span class="token punctuation">,</span> id <span class="token keyword">FROM</span> <span class="token punctuation">`</span><span class="token keyword">user</span><span class="token punctuation">`</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h2 id="条件查询"><a class="header-anchor" href="#条件查询">#</a> 条件查询</h2>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token number">1.</span> <span class="token operator">></span> 、<span class="token operator">&lt;</span> 、<span class="token operator">&lt;=</span> 、<span class="token operator">>=</span> 、<span class="token operator">=</span> 、<span class="token operator">&lt;></span>
  <span class="token comment">-- 查询 id + age 大于 50 的记录</span>
  <span class="token keyword">SELECT</span> <span class="token operator">*</span><span class="token punctuation">,</span> id <span class="token operator">+</span> age <span class="token keyword">as</span> count <span class="token keyword">FROM</span> <span class="token punctuation">`</span><span class="token keyword">user</span><span class="token punctuation">`</span> <span class="token keyword">WHERE</span> id <span class="token operator">+</span> age <span class="token operator">></span> <span class="token number">50</span>

<span class="token number">2.</span> <span class="token operator">between</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token operator">and</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
  <span class="token comment">-- 查询年龄大于等于20并且小于等于30（包含20跟30）</span>
  <span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> <span class="token punctuation">`</span><span class="token keyword">user</span><span class="token punctuation">`</span> <span class="token keyword">WHERE</span> age <span class="token operator">>=</span> <span class="token number">20</span> <span class="token operator">AND</span> age <span class="token operator">&lt;=</span> <span class="token number">30</span>
  <span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> <span class="token punctuation">`</span><span class="token keyword">user</span><span class="token punctuation">`</span> <span class="token keyword">WHERE</span> age <span class="token operator">BETWEEN</span> <span class="token number">20</span> <span class="token operator">AND</span> <span class="token number">30</span>

<span class="token number">3.</span> <span class="token operator">in</span><span class="token punctuation">(</span>集合<span class="token punctuation">)</span>
  <span class="token comment">-- 查询 age 等于 20、23或者24的记录</span>
  <span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> <span class="token punctuation">`</span><span class="token keyword">user</span><span class="token punctuation">`</span> <span class="token keyword">WHERE</span> id <span class="token operator">=</span> <span class="token number">20</span>	<span class="token operator">OR</span> id <span class="token operator">=</span> <span class="token number">23</span> <span class="token operator">OR</span> id <span class="token operator">=</span> <span class="token number">24</span>
  <span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> <span class="token punctuation">`</span><span class="token keyword">user</span><span class="token punctuation">`</span> <span class="token keyword">WHERE</span> id <span class="token operator">IN</span> <span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">,</span> <span class="token number">23</span><span class="token punctuation">,</span> <span class="token number">24</span><span class="token punctuation">)</span>

<span class="token number">4.</span> <span class="token operator">like</span>：模糊查询
  <span class="token number">4.1</span> <span class="token string">'_'</span>：单个任意字符
  <span class="token comment">-- 第二个字是张并且只有两个字</span>
  <span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> <span class="token punctuation">`</span><span class="token keyword">user</span><span class="token punctuation">`</span> <span class="token keyword">WHERE</span> <span class="token punctuation">`</span>name<span class="token punctuation">`</span> <span class="token operator">LIKE</span> <span class="token string">'_张'</span>
  <span class="token comment">-- 有三个字符</span>
  <span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> <span class="token punctuation">`</span><span class="token keyword">user</span><span class="token punctuation">`</span> <span class="token keyword">WHERE</span> <span class="token punctuation">`</span>name<span class="token punctuation">`</span> <span class="token operator">LIKE</span> <span class="token string">'___'</span>

  <span class="token number">4.2</span> <span class="token string">'%'</span>：多个任意字符
  <span class="token comment">-- 以张开头</span>
  <span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> <span class="token punctuation">`</span><span class="token keyword">user</span><span class="token punctuation">`</span> <span class="token keyword">WHERE</span> <span class="token punctuation">`</span>name<span class="token punctuation">`</span> <span class="token operator">LIKE</span> <span class="token string">'张%'</span>
  <span class="token comment">-- 以张结尾</span>
  <span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> <span class="token punctuation">`</span><span class="token keyword">user</span><span class="token punctuation">`</span> <span class="token keyword">WHERE</span> <span class="token punctuation">`</span>name<span class="token punctuation">`</span> <span class="token operator">LIKE</span> <span class="token string">'%张'</span>
  <span class="token comment">-- 包含张</span>
  <span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> <span class="token punctuation">`</span><span class="token keyword">user</span><span class="token punctuation">`</span> <span class="token keyword">WHERE</span> <span class="token punctuation">`</span>name<span class="token punctuation">`</span> <span class="token operator">LIKE</span> <span class="token string">'%张%'</span>

<span class="token number">5.</span> <span class="token operator">is</span> <span class="token boolean">null</span>
  <span class="token comment">-- 查询time为null（不能用time=null）</span>
  <span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> <span class="token punctuation">`</span><span class="token keyword">user</span><span class="token punctuation">`</span> <span class="token keyword">WHERE</span> <span class="token keyword">time</span> <span class="token operator">IS</span> <span class="token boolean">NULL</span>
  <span class="token comment">-- 查询不为null</span>
  <span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> <span class="token punctuation">`</span><span class="token keyword">user</span><span class="token punctuation">`</span> <span class="token keyword">WHERE</span> <span class="token keyword">time</span> <span class="token operator">IS</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span>

<span class="token number">6.</span> <span class="token operator">and</span>  或  <span class="token operator">&amp;&amp;</span>
  <span class="token comment">-- name包含三 并且 sex是男</span>
  <span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> <span class="token punctuation">`</span><span class="token keyword">user</span><span class="token punctuation">`</span> <span class="token keyword">WHERE</span> <span class="token punctuation">`</span>name<span class="token punctuation">`</span> <span class="token operator">LIKE</span> <span class="token string">'%三%'</span> <span class="token operator">AND</span> sex <span class="token operator">=</span> <span class="token string">'男'</span>

<span class="token number">7.</span> <span class="token operator">or</span>   或  <span class="token operator">||</span>
  <span class="token comment">-- age 等于 10 或者 20</span>
  <span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> <span class="token punctuation">`</span><span class="token keyword">user</span><span class="token punctuation">`</span> <span class="token keyword">WHERE</span> <span class="token punctuation">`</span>age<span class="token punctuation">`</span> <span class="token operator">=</span> <span class="token string">'10'</span> <span class="token operator">OR</span> age <span class="token operator">=</span> <span class="token string">'20'</span>

<span class="token number">8.</span> <span class="token operator">not</span>  或  <span class="token operator">!</span>
  <span class="token comment">-- 查询不为null</span>
  <span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> <span class="token punctuation">`</span><span class="token keyword">user</span><span class="token punctuation">`</span> <span class="token keyword">WHERE</span> <span class="token keyword">time</span> <span class="token operator">IS</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br></div></div><h2 id="排序查询"><a class="header-anchor" href="#排序查询">#</a> 排序查询</h2>
<ul>
<li>语法</li>
</ul>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">order</span> <span class="token keyword">by</span> 排序字段<span class="token number">1</span> 排序方式<span class="token number">1</span><span class="token punctuation">,</span> 排序字段<span class="token number">2</span> 排序方式<span class="token number">2</span><span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ul>
<li>排序方式
<ol>
<li>ASC：升序，<strong>默认</strong></li>
<li>DESC：降序</li>
</ol>
</li>
<li>示例</li>
</ul>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">-- 升序（默认）</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> <span class="token punctuation">`</span><span class="token keyword">user</span><span class="token punctuation">`</span> <span class="token keyword">ORDER</span> <span class="token keyword">BY</span> <span class="token punctuation">`</span>age<span class="token punctuation">`</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> <span class="token punctuation">`</span><span class="token keyword">user</span><span class="token punctuation">`</span> <span class="token keyword">ORDER</span> <span class="token keyword">BY</span> <span class="token punctuation">`</span>age<span class="token punctuation">`</span> <span class="token keyword">ASC</span>

<span class="token comment">-- 降序</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> <span class="token punctuation">`</span><span class="token keyword">user</span><span class="token punctuation">`</span> <span class="token keyword">ORDER</span> <span class="token keyword">BY</span> <span class="token punctuation">`</span>age<span class="token punctuation">`</span> <span class="token keyword">DESC</span>

<span class="token comment">-- 多个排序（前一个排序条件满足时，再排后一个条件）</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> <span class="token punctuation">`</span><span class="token keyword">user</span><span class="token punctuation">`</span> <span class="token keyword">ORDER</span> <span class="token keyword">BY</span> <span class="token punctuation">`</span>age<span class="token punctuation">`</span> <span class="token keyword">ASC</span><span class="token punctuation">,</span> <span class="token punctuation">`</span>money<span class="token punctuation">`</span> <span class="token keyword">DESC</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h2 id="聚合函数"><a class="header-anchor" href="#聚合函数">#</a> 聚合函数</h2>
<ul>
<li>示例（计算列）</li>
</ul>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">-- 1. count：计算个数（一般使用主键）</span>
<span class="token keyword">SELECT</span> <span class="token function">COUNT</span><span class="token punctuation">(</span><span class="token keyword">time</span><span class="token punctuation">)</span> <span class="token keyword">AS</span> count <span class="token keyword">FROM</span> <span class="token punctuation">`</span><span class="token keyword">user</span><span class="token punctuation">`</span>

<span class="token comment">-- 2. max：计算最大值</span>
<span class="token keyword">SELECT</span> <span class="token function">MAX</span><span class="token punctuation">(</span>age<span class="token punctuation">)</span> <span class="token keyword">FROM</span> <span class="token punctuation">`</span><span class="token keyword">user</span><span class="token punctuation">`</span>

<span class="token comment">-- 3. min：计算最小值</span>
<span class="token keyword">SELECT</span> <span class="token function">MIN</span><span class="token punctuation">(</span>age<span class="token punctuation">)</span> <span class="token keyword">FROM</span> <span class="token punctuation">`</span><span class="token keyword">user</span><span class="token punctuation">`</span>

<span class="token comment">-- 4. sum：计算和</span>
<span class="token keyword">SELECT</span> <span class="token function">SUM</span><span class="token punctuation">(</span>age<span class="token punctuation">)</span> <span class="token keyword">FROM</span> <span class="token punctuation">`</span><span class="token keyword">user</span><span class="token punctuation">`</span>

<span class="token comment">-- 5. avg：计算平均值</span>
<span class="token keyword">SELECT</span> <span class="token function">AVG</span><span class="token punctuation">(</span>age<span class="token punctuation">)</span> <span class="token keyword">FROM</span> <span class="token punctuation">`</span><span class="token keyword">user</span><span class="token punctuation">`</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><ul>
<li>注意
<ol>
<li>集合函数会排除<code>Null</code>值</li>
</ol>
</li>
</ul>
<h2 id="分组查询"><a class="header-anchor" href="#分组查询">#</a> 分组查询</h2>
<ul>
<li>语法</li>
</ul>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">group</span> <span class="token keyword">by</span> 分组字段
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ul>
<li>示例</li>
</ul>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">-- 按照性别分组。分别查询男、女同学的平均年龄</span>
<span class="token keyword">SELECT</span> sex<span class="token punctuation">,</span> <span class="token function">AVG</span><span class="token punctuation">(</span>age<span class="token punctuation">)</span> <span class="token keyword">AS</span> avg <span class="token keyword">FROM</span> <span class="token punctuation">`</span><span class="token keyword">user</span><span class="token punctuation">`</span> <span class="token keyword">GROUP</span> <span class="token keyword">BY</span> sex

<span class="token comment">-- 按照性别分组。分别查询男、女同学的平均年龄、人数</span>
<span class="token keyword">SELECT</span> sex<span class="token punctuation">,</span> <span class="token function">AVG</span><span class="token punctuation">(</span>age<span class="token punctuation">)</span> avg<span class="token punctuation">,</span> <span class="token function">COUNT</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span> <span class="token keyword">AS</span> count <span class="token keyword">FROM</span> <span class="token punctuation">`</span><span class="token keyword">user</span><span class="token punctuation">`</span> <span class="token keyword">GROUP</span> <span class="token keyword">BY</span> sex

<span class="token comment">-- 按照性别分组。</span>
<span class="token comment">-- 分别查询男、女同学的平均年龄、总人数。</span>
<span class="token comment">-- 年龄低于22的人，不参与分组</span>
<span class="token keyword">SELECT</span> sex<span class="token punctuation">,</span> <span class="token function">AVG</span><span class="token punctuation">(</span>age<span class="token punctuation">)</span> avg<span class="token punctuation">,</span> <span class="token function">COUNT</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span> <span class="token keyword">AS</span> count <span class="token keyword">FROM</span> <span class="token punctuation">`</span><span class="token keyword">user</span><span class="token punctuation">`</span> <span class="token keyword">WHERE</span> age <span class="token operator">></span> <span class="token number">22</span> <span class="token keyword">GROUP</span> <span class="token keyword">BY</span> sex

<span class="token comment">-- 按照性别分组。</span>
<span class="token comment">-- 分别查询男、女同学的平均年龄、总人数。</span>
<span class="token comment">-- 年龄低于 23 的人，不参与分组。</span>
<span class="token comment">-- 分组之后，人数大于 2 的才显示</span>
<span class="token keyword">SELECT</span>
  sex<span class="token punctuation">,</span>
  <span class="token function">AVG</span><span class="token punctuation">(</span> age <span class="token punctuation">)</span> avg<span class="token punctuation">,</span>
  <span class="token function">COUNT</span><span class="token punctuation">(</span> id <span class="token punctuation">)</span> <span class="token keyword">AS</span> count
<span class="token keyword">FROM</span>
  <span class="token punctuation">`</span><span class="token keyword">user</span><span class="token punctuation">`</span>
<span class="token keyword">WHERE</span>
  age <span class="token operator">></span> <span class="token number">23</span>
<span class="token keyword">GROUP</span> <span class="token keyword">BY</span>
  sex
<span class="token keyword">HAVING</span>  <span class="token comment">-- 这后面只能放分组字段、聚合函数，不能放其他的字段</span>
  count <span class="token operator">></span> <span class="token number">2</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><ul>
<li>
<p>注意</p>
<ol>
<li><code>having</code>后面只能放分组字段、聚合函数</li>
</ol>
</li>
<li>
<p><code>where</code> 和 <code>having</code> 的区别？</p>
<ol>
<li><code>where</code> 在分组之前进行限定，如果不满足条件，则不参与分组。<code>having</code>在分组之后进行限定，如果不满足结果，则不会被查询出来</li>
<li><code>where</code> 后不可以跟聚合函数，<code>having</code>可以进行聚合函数的判断。</li>
</ol>
</li>
</ul>
<h2 id="分页查询"><a class="header-anchor" href="#分页查询">#</a> 分页查询</h2>
<blockquote>
<p>公式：开始的索引 = （当前的页码 - 1） * 每页显示的条数</p>
</blockquote>
<ul>
<li>语法</li>
</ul>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">limit</span> 开始的索引<span class="token punctuation">,</span>每页查询的条数<span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ul>
<li>示例</li>
</ul>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">-- 假设每页显示 4 条</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> <span class="token punctuation">`</span><span class="token keyword">user</span><span class="token punctuation">`</span> <span class="token keyword">LIMIT</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">4</span>   <span class="token comment">-- 第一页（1-1）* 4 = 0</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> <span class="token punctuation">`</span><span class="token keyword">user</span><span class="token punctuation">`</span> <span class="token keyword">LIMIT</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">4</span>   <span class="token comment">-- 第二页（2-1）* 4 = 4</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> <span class="token punctuation">`</span><span class="token keyword">user</span><span class="token punctuation">`</span> <span class="token keyword">LIMIT</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">4</span>   <span class="token comment">-- 第三页（3-1）* 4 = 8</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div></template>