<template><h1 id="事务管理"><a class="header-anchor" href="#事务管理">#</a> 事务管理</h1>
<ol>
<li>概念：如果一个包含多个步骤的业务操作被事务管理，那么这些操作要么同时成功，要么同时失败</li>
</ol>
<div class="custom-container tip"><p class="custom-container-title">操作</p>
<ul>
<li>开启事务：start transaction</li>
<li>提交事务：commit</li>
<li>回滚事务：rollback</li>
</ul>
</div>
<ol start="2">
<li>事务的提交方式与修改</li>
</ol>
<div class="custom-container tip"><p class="custom-container-title">自动提交</p>
<ul>
<li>Mysql 数据库默认自动提交</li>
<li>一条 DML（增删改）语句会自动提交一次事务</li>
</ul>
</div>
<div class="custom-container tip"><p class="custom-container-title">手动提交</p>
<ul>
<li>Oracle 数据库默认手动提交</li>
<li>需要先开启事务，再提交， DML（增删改）语句才生效</li>
</ul>
</div>
<div class="custom-container tip"><p class="custom-container-title">修改事务的默认提交方式</p>
<ul>
<li>查看：<br>
<code>SELECT @@autocommit</code>   -- 1 自动   0 手动</li>
<li>修改：<br>
<code>set @@autocommit = 0</code></li>
</ul>
</div>
<ol start="3">
<li>
<p>事务的四大特征</p>
<ul>
<li>原子性：是不可分割的最小操作单位，要么同时成功，要么同时失败。</li>
<li>持久性：当事务提交或回滚后，数据库会持久化的保存数据。</li>
<li>隔离性：多个事务之间。相互独立。</li>
<li>一致性：事务操作前后，数据总量不变</li>
</ul>
</li>
<li>
<p>事务的隔离级别</p>
</li>
</ol>
<ul>
<li>基本概念：多个事务之间隔离的，相互独立的。但是如果多个事务操作同一批数据，则会引发一些问题，设置不同的隔离级别就可以解决这些问题。</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">存在问题</p>
<ul>
<li>脏读：一个事务，读取到另一个事务中没有提交的数据</li>
<li>不可重复读(虚读)：在同一个事务中，两次读取到的数据不一样。</li>
<li>幻读：一个事务操作(DML)数据表中所有记录，另一个事务添加了一条数据，则第一个事务查询不到自己的修改。</li>
</ul>
</div>
<div class="custom-container tip"><p class="custom-container-title">隔离级别</p>
<ol>
<li>
<p><code>read uncommitted</code>：读未提交<br>
产生的问题：脏读、不可重复读、幻读</p>
</li>
<li>
<p><code>read committed</code>：读已提交 （Oracle）<br>
产生的问题：不可重复读、幻读</p>
</li>
<li>
<p><code>repeatable read</code>：可重复读 （MySQL默认）<br>
产生的问题：幻读</p>
</li>
<li>
<p><code>serializable</code>：串行化，会把表锁住，效率最低<br>
解决所有问题</p>
</li>
</ol>
<ul>
<li>
<p>注意：隔离级别从小到大安全性越来越高，但是效率越来越低</p>
</li>
<li>
<p>查询数据库隔离级别：<code>select @@tx_isolation</code></p>
</li>
<li>
<p>设置数据库隔离级别：<code>set global transaction isolation level 级别字符串</code></p>
</li>
</ul>
</div>
</template>