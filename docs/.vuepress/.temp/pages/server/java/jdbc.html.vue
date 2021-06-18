<template><h1 id="jdbc"><a class="header-anchor" href="#jdbc">#</a> JDBC</h1>
<nav class="table-of-contents"><ul><li><RouterLink to="#基本概念">基本概念</RouterLink></li><li><RouterLink to="#快速入门">快速入门</RouterLink></li><li><RouterLink to="#常用类介绍">常用类介绍</RouterLink></li><li><RouterLink to="#事务管理">事务管理</RouterLink></li><li><RouterLink to="#数据库连接池">数据库连接池</RouterLink></li><li><RouterLink to="#c3p0">C3P0</RouterLink></li><li><RouterLink to="#druid">Druid</RouterLink></li></ul></nav>
<h2 id="基本概念"><a class="header-anchor" href="#基本概念">#</a> 基本概念</h2>
<ul>
<li>概念：Java DataBase Connectivity。Java 数据库连接。Java 语言操作数据库</li>
<li>本质：由官方定义的一套操作所有关系型数据库的规则（接口），各个数据库厂商去实现这套接口，提供数据库
驱动<code>jar</code>包。开发人员使用这套接口（JDBC）编程，真正执行的代码是驱动<code>jar</code>包中的实现类。</li>
<li>使用时需要引入``mysql-connector-java` 驱动包</li>
</ul>
<h2 id="快速入门"><a class="header-anchor" href="#快速入门">#</a> 快速入门</h2>
<ul>
<li>jdbc 使用步骤
<ol>
<li>注册驱动（首先需要引入 <code>mysql-connector-java</code> 驱动包）</li>
<li>获取数据库连接对象</li>
<li>定义 Sql 语句</li>
<li>获取执行 Sql 的对象 Statement</li>
<li>执行 Sql</li>
<li>处理结果</li>
<li>释放资源</li>
</ol>
</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">1. 注册驱动</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">Class</span><span class="token punctuation">.</span><span class="token function">forName</span><span class="token punctuation">(</span><span class="token string">"com.mysql.cj.jdbc.Driver"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></div>
<div class="custom-container tip"><p class="custom-container-title">2. 获取数据库连接对象</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">Connection</span> conn <span class="token operator">=</span> <span class="token class-name">DriverManager</span><span class="token punctuation">.</span><span class="token function">getConnection</span><span class="token punctuation">(</span><span class="token string">"jdbc:mysql://127.0.0.1:3306/study?serverTimezone=UTC"</span><span class="token punctuation">,</span> <span class="token string">"root"</span><span class="token punctuation">,</span> <span class="token string">"root"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></div>
<div class="custom-container tip"><p class="custom-container-title">3. 定义 Sql 语句</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">String</span> sql <span class="token operator">=</span> <span class="token string">"update use set name='张三' where id=1"</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></div>
<div class="custom-container tip"><p class="custom-container-title">4. 获取执行 Sql 的对象 Statement</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">Statement</span> stmt <span class="token operator">=</span> conn<span class="token punctuation">.</span><span class="token function">createStatement</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></div>
<div class="custom-container tip"><p class="custom-container-title">5. 执行 Sql 语句</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">int</span> count <span class="token operator">=</span> stmt<span class="token punctuation">.</span><span class="token function">executeUpdate</span><span class="token punctuation">(</span>sql<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></div>
<div class="custom-container tip"><p class="custom-container-title">6. 处理返回结果</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>count<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></div>
<div class="custom-container tip"><p class="custom-container-title">7. 释放资源</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>stmt<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
conn<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></div>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">Connection</span> conn <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token class-name">Statement</span> stmt <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token comment">// 1. 注册驱动</span>
    <span class="token class-name">Class</span><span class="token punctuation">.</span><span class="token function">forName</span><span class="token punctuation">(</span><span class="token string">"com.mysql.cj.jdbc.Driver"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 2. 获取 Connection 对象</span>
    conn <span class="token operator">=</span> <span class="token class-name">DriverManager</span><span class="token punctuation">.</span><span class="token function">getConnection</span><span class="token punctuation">(</span><span class="token string">"jdbc:mysql://127.0.0.1:3306/study?serverTimezone=UTC"</span><span class="token punctuation">,</span> <span class="token string">"root"</span><span class="token punctuation">,</span> <span class="token string">"root"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 3. 定义 Sql 语句</span>
    <span class="token class-name">String</span> sql <span class="token operator">=</span> <span class="token string">"update user set name='李四' where id=41"</span><span class="token punctuation">;</span>
    <span class="token comment">// 4. 获取执行 Sql 的 Statement 对象</span>
    stmt <span class="token operator">=</span> conn<span class="token punctuation">.</span><span class="token function">createStatement</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 5. 执行 Sql</span>
    <span class="token keyword">int</span> count <span class="token operator">=</span> stmt<span class="token punctuation">.</span><span class="token function">executeUpdate</span><span class="token punctuation">(</span>sql<span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// 影响的行数</span>
    <span class="token comment">// 6. 处理结果</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>count <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"操作成功！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"操作失败！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">ClassNotFoundException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">SQLException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
    <span class="token comment">//7. 释放资源</span>
    <span class="token comment">//避免空指针异常</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>stmt <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            stmt<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">SQLException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>conn <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            conn<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">SQLException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br></div></div><h2 id="常用类介绍"><a class="header-anchor" href="#常用类介绍">#</a> 常用类介绍</h2>
<div class="custom-container tip"><p class="custom-container-title">1、DriverManager：驱动管理对象</p>
<ul>
<li>
<p>注册驱动，指定数据库驱动 jar 包</p>
<ul>
<li>通过代码注册驱动：<code>Class.forName(&quot;com.mysql.jdbc.Driver&quot;)</code></li>
<li>查看源码发现：在<code>com.mysql.jdbc.Driver</code>类中存在静态代码块</li>
</ul>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">static</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>sql<span class="token punctuation">.</span></span>DriverManager</span><span class="token punctuation">.</span><span class="token function">registerDriver</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Driver</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">SQLException</span> <span class="token class-name">E</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span><span class="token string">"Can't register driver!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><ul>
<li>注意：mysql5 之后的驱动 jar 包可以省略注册驱动的步骤。</li>
<li>获取数据库连接方法：<code>static Connection getConnection(String url, String user, String password)</code></li>
</ul>
</li>
</ul>
</div>
<div class="custom-container tip"><p class="custom-container-title">2、Connection：数据库连接对象</p>
<ul>
<li>
<p>获取执行 Sql 的对象</p>
<ul>
<li><code>Statement createStatement()</code></li>
<li><code>PreparedStatement prepareStatement(String sql)</code></li>
</ul>
</li>
<li>
<p>管理事务</p>
<ul>
<li>开启事务：<code>setAutoCommit(boolean autoCommit)</code>。调用该方法设置参数为 false，即开启事务</li>
<li>提交事务：<code>commit()</code></li>
<li>回滚事务：<code>rollback()</code></li>
</ul>
</li>
</ul>
</div>
<div class="custom-container tip"><p class="custom-container-title">3. Statement： 执行 “静态 Sql” 对象。拼接 Sql 有 Sql 注入的风险</p>
<ul>
<li>
<p>执行 Sql</p>
<ul>
<li><code>int executeUpdate(String sql)</code>：执行 DML（insert、update、delete）语句、DDL(create，alter、drop)语句</li>
<li><code>ResultSet executeQuery(string sql)</code>：执行 DQL（select）语句</li>
</ul>
</li>
</ul>
</div>
<div class="custom-container tip"><p class="custom-container-title">4. ResultSet：结果集对象，封装查询结果</p>
<ul>
<li>
<p><code>getXxx(参数)</code>方法：从结果集中获取数据</p>
<ul>
<li>Xxx：代表数据类型。 如：String getString() 、 int getInt()，<strong>数据类型最好跟数据库一致，不然可能会报错</strong></li>
<li>参数：
<ol>
<li>int: 代表列的编号，从 1 开始。 如：getString(1)</li>
<li>String：代表列的名称。 如：getString(&quot;name&quot;)</li>
</ol>
</li>
</ul>
</li>
<li>
<p><code>Boolean next()方法</code>：判断游标是否是最后一行末尾，返回 false 则表示没有数据了，默认是指向表头</p>
</li>
</ul>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">String</span> sql <span class="token operator">=</span> <span class="token string">"select * from user"</span><span class="token punctuation">;</span>
<span class="token class-name">ResultSet</span> resultSet <span class="token operator">=</span> stmt<span class="token punctuation">.</span><span class="token function">executeQuery</span><span class="token punctuation">(</span>sql<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">while</span> <span class="token punctuation">(</span>resultSet<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">int</span> id <span class="token operator">=</span> resultSet<span class="token punctuation">.</span><span class="token function">getInt</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">String</span> name <span class="token operator">=</span> resultSet<span class="token punctuation">.</span><span class="token function">getString</span><span class="token punctuation">(</span><span class="token string">"name"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div></div>
<div class="custom-container tip"><p class="custom-container-title">5. PreparedStatement：执行 “动态 Sql” 的对象。 ，解决了 Statement Sql 注入的问题</p>
<ul>
<li>
<p>SQL 注入：拼接 SQL 如果有一些特殊的关键字也参与了拼接，那么可能会造成安全问题：</p>
<ul>
<li>输入用户随便，输入密码：b' or 'b' = 'b</li>
<li>sql：select * from user where username = 'fhdsjkf' and password = 'b' or 'b' = 'b'</li>
</ul>
</li>
<li>
<p>预编译SQL：参数使用 ？ 来作为占位符</p>
</li>
<li>
<p>setXxx(参数1，参数2)：获取数据</p>
<ul>
<li>参数1：？的位置编号 从 1 开始</li>
<li>参数2：？的值</li>
</ul>
</li>
</ul>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">String</span> sql <span class="token operator">=</span> <span class="token string">"select * from user where name=? and password=?"</span><span class="token punctuation">;</span>
<span class="token comment">// 这里返回的不是 Statement 了，这里需要把 Sql 传进去</span>
<span class="token class-name">PreparedStatement</span> pstmt <span class="token operator">=</span> conn<span class="token punctuation">.</span><span class="token function">prepareStatement</span><span class="token punctuation">(</span>sql<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 给占位符（？）赋值</span>
pstmt<span class="token punctuation">.</span><span class="token function">setString</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">'root'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// name 的值</span>
pstmt<span class="token punctuation">.</span><span class="token function">setString</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">'root'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// password 的值</span>
pstmt<span class="token punctuation">.</span><span class="token function">executeQuery</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// 这里不需要传入 Sql 了</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div></div>
<h2 id="事务管理"><a class="header-anchor" href="#事务管理">#</a> 事务管理</h2>
<ul>
<li>使用Connection对象来管理事务
<ul>
<li>开启事务：setAutoCommit(boolean autoCommit) ：调用该方法设置参数为 false，即开启事务
<ul>
<li>在执行 sql 之前开启事务</li>
</ul>
</li>
<li>提交事务：commit()
<ul>
<li>当所有 sql 都执行完提交事务</li>
</ul>
</li>
<li>回滚事务：rollback()
<ul>
<li>在 catch 中回滚事务</li>
</ul>
</li>
</ul>
</li>
</ul>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">Connection</span> conn <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token class-name">PreparedStatement</span> pstmt1 <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token class-name">PreparedStatement</span> pstmt2 <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token keyword">try</span> <span class="token punctuation">{</span>
    conn <span class="token operator">=</span> <span class="token class-name">JDBCUtils</span><span class="token punctuation">.</span><span class="token function">getConnection</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 将事务设置成手动提交（开启事务）</span>
    conn<span class="token punctuation">.</span><span class="token function">setAutoCommit</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">String</span> sql1 <span class="token operator">=</span> <span class="token string">"update user set money = money - ? where id = ?"</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> sql2 <span class="token operator">=</span> <span class="token string">"update user set money = money + ? where id = ?"</span><span class="token punctuation">;</span>
    pstmt1 <span class="token operator">=</span> conn<span class="token punctuation">.</span><span class="token function">prepareStatement</span><span class="token punctuation">(</span>sql1<span class="token punctuation">)</span><span class="token punctuation">;</span>
    pstmt2 <span class="token operator">=</span> conn<span class="token punctuation">.</span><span class="token function">prepareStatement</span><span class="token punctuation">(</span>sql2<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 给 Sql 赋值</span>
    pstmt1<span class="token punctuation">.</span><span class="token function">setString</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">"500"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    pstmt1<span class="token punctuation">.</span><span class="token function">setString</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">"41"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    pstmt2<span class="token punctuation">.</span><span class="token function">setString</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">"500"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    pstmt2<span class="token punctuation">.</span><span class="token function">setString</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">"42"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    pstmt1<span class="token punctuation">.</span><span class="token function">executeUpdate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">2</span> <span class="token operator">%</span> <span class="token number">0</span><span class="token punctuation">;</span>
    pstmt2<span class="token punctuation">.</span><span class="token function">executeUpdate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 成功提交事务</span>
    conn<span class="token punctuation">.</span><span class="token function">commit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">SQLException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>conn <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 失败回滚事务</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"rollback"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            conn<span class="token punctuation">.</span><span class="token function">rollback</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">SQLException</span> ex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        ex<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
    <span class="token class-name">JDBCUtils</span><span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span>pstmt1<span class="token punctuation">,</span> conn<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">JDBCUtils</span><span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span>pstmt2<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br></div></div><h2 id="数据库连接池"><a class="header-anchor" href="#数据库连接池">#</a> 数据库连接池</h2>
<ul>
<li>
<p>概念：就是一个存放数据库连接的容器。<br>
当系统初始化好后，容器被创建，容器中会申请一些连接对象，当用户来访问数据库时，从容器中获取连接对象，用户访问完之后，会将连接对象归还给容器</p>
</li>
<li>
<p>好处：</p>
<ul>
<li>节约资源</li>
<li>用户访问高效</li>
</ul>
</li>
<li>
<p>实现</p>
<ul>
<li>标准接口：DataSource（javax.sql.DataSource）
<ul>
<li>获取连接：getConnection()</li>
<li>归还连接：Connection.close()。如果连接对象Connection是从连接池中获取的，那么调用Connection.close()方法，则不会再关闭连接了。而是归还连接</li>
</ul>
</li>
</ul>
</li>
</ul>
<h2 id="c3p0"><a class="header-anchor" href="#c3p0">#</a> C3P0</h2>
<ul>
<li>
<p>数据库连接池技术</p>
</li>
<li>
<p>使用步骤</p>
<ol>
<li>Maven添加依赖： <code>c3p0 和 mysql-connector-java</code></li>
<li>定义配置文件：文件名必须是 c3p0.properties 或者 c3p0-config.xml，会自动读取</li>
<li>创建数据库连接池对象。 DataSource ds = new ComboPooledDataSource();</li>
<li>获取连接。 Connection conn = ds.getConnection();</li>
</ol>
</li>
<li>
<p>代码示例：</p>
</li>
</ul>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token comment">&lt;!-- c3p0-config.xml 文件配置 --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>c3p0-config</span><span class="token punctuation">></span></span>
    <span class="token comment">&lt;!-- 使用默认的配置读取连接池对象 --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>default-config</span><span class="token punctuation">></span></span>
        <span class="token comment">&lt;!--  连接参数 --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>driverClass<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>com.mysql.cj.jdbc.Driver<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>jdbcUrl<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>jdbc:mysql://127.0.0.1:3306/study?serverTimezone=UTC<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>user<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>root<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>password<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>root<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>

        <span class="token comment">&lt;!-- 连接池参数 --></span>
        <span class="token comment">&lt;!--初始化申请的连接数量--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>initialPoolSize<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>5<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
        <span class="token comment">&lt;!--最大的连接数量--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>maxPoolSize<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>10<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
        <span class="token comment">&lt;!--超时时间--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>checkoutTimeout<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>3000<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>default-config</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>named-config</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>otherc3p0<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token comment">&lt;!--  连接参数 --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>driverClass<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>com.mysql.jdbc.Driver<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>jdbcUrl<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>jdbc:mysql://localhost:3306/db3<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>user<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>root<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>password<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>root<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>

        <span class="token comment">&lt;!-- 连接池参数 --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>initialPoolSize<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>5<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>maxPoolSize<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>checkoutTimeout<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>1000<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>named-config</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>c3p0-config</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br></div></div><div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 1. 创建数据库连接池对象</span>
<span class="token class-name">DataSource</span> ds <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ComboPooledDataSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 2. 创建连接</span>
<span class="token class-name">Connection</span> conn <span class="token operator">=</span> ds<span class="token punctuation">.</span><span class="token function">getConnection</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> sql <span class="token operator">=</span> <span class="token string">"update user set name='张三三' where id=42"</span><span class="token punctuation">;</span>
<span class="token class-name">PreparedStatement</span> pstmt <span class="token operator">=</span> conn<span class="token punctuation">.</span><span class="token function">prepareStatement</span><span class="token punctuation">(</span>sql<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> count <span class="token operator">=</span> pstmt<span class="token punctuation">.</span><span class="token function">executeUpdate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>count<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h2 id="druid"><a class="header-anchor" href="#druid">#</a> Druid</h2>
<ul>
<li>
<p>由阿里巴巴提供的数据库连接池技术</p>
</li>
<li>
<p>使用步骤</p>
<ol>
<li>Maven添加依赖：druid 和 mysql-connector-java</li>
<li>定义配置文件并导入。配置文件是 properties 形式的，可以叫任意名称</li>
<li>加载 .properties 配置文件</li>
<li>通过<code>DruidDataSourceFactory.createDataSource(properties)</code>工厂来获取数据库连接池对象。</li>
<li>获取连接</li>
</ol>
</li>
<li>
<p>代码示例</p>
</li>
</ul>
<div class="language-properties ext-properties line-numbers-mode"><pre v-pre class="language-properties"><code><span class="token comment"># druid.properties 配置文件</span>
<span class="token attr-name">driverClassName</span><span class="token punctuation">=</span><span class="token attr-value">com.mysql.cj.jdbc.Driver</span>
<span class="token attr-name">url</span><span class="token punctuation">=</span><span class="token attr-value">jdbc:mysql://127.0.0.1:3306/study?serverTimezone=UTC</span>
<span class="token attr-name">username</span><span class="token punctuation">=</span><span class="token attr-value">root</span>
<span class="token attr-name">password</span><span class="token punctuation">=</span><span class="token attr-value">root</span>
<span class="token comment"># 初始连接数量</span>
<span class="token attr-name">initialSize</span><span class="token punctuation">=</span><span class="token attr-value">5</span>
<span class="token comment"># 最大的连接数量</span>
<span class="token attr-name">maxActive</span><span class="token punctuation">=</span><span class="token attr-value">10</span>
<span class="token comment"># 超时时间</span>
<span class="token attr-name">maxWait</span><span class="token punctuation">=</span><span class="token attr-value">3000</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 1. 加载配置文件</span>
<span class="token class-name">Properties</span> properties <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Properties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">InputStream</span> inputStream <span class="token operator">=</span> <span class="token class-name">Demo1</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getClassLoader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getResourceAsStream</span><span class="token punctuation">(</span><span class="token string">"druid.properties"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
properties<span class="token punctuation">.</span><span class="token function">load</span><span class="token punctuation">(</span>inputStream<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 2. 获取数据库连接池对象</span>
<span class="token class-name">DataSource</span> dataSource <span class="token operator">=</span> <span class="token class-name">DruidDataSourceFactory</span><span class="token punctuation">.</span><span class="token function">createDataSource</span><span class="token punctuation">(</span>properties<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 3. 获取数据库连接对象</span>
<span class="token class-name">Connection</span> conn <span class="token operator">=</span> dataSource<span class="token punctuation">.</span><span class="token function">getConnection</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 执行 sql</span>
<span class="token class-name">String</span> sql <span class="token operator">=</span> <span class="token string">"update user set name='王五五' where id=45"</span><span class="token punctuation">;</span>
<span class="token class-name">PreparedStatement</span> pstmt <span class="token operator">=</span> conn<span class="token punctuation">.</span><span class="token function">prepareStatement</span><span class="token punctuation">(</span>sql<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> count <span class="token operator">=</span> pstmt<span class="token punctuation">.</span><span class="token function">executeUpdate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>count<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div></template>