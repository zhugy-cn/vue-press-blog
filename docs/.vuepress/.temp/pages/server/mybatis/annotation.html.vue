<template><h1 id="基于注解"><a class="header-anchor" href="#基于注解">#</a> 基于注解</h1>
<h2 id="常用注解"><a class="header-anchor" href="#常用注解">#</a> 常用注解</h2>
<ul>
<li>@Select：查询</li>
<li>@Insert：新增</li>
<li>@Update：更新</li>
<li>@Delete：删除</li>
<li>@Result：结果集封装</li>
<li>@Results：可以与 @Result 一起使用，封装多个结果</li>
<li>@ResultMap：引用 @Results 定义的封装</li>
<li>@One：一对一结果集封装</li>
<li>@Many：一对多结果集封装</li>
<li>@SelectProvider： 动态 SQL 映射</li>
<li>@CacheNamespace：注解二级缓存的使用</li>
</ul>
<h2 id="练习"><a class="header-anchor" href="#练习">#</a> 练习</h2>
<ul>
<li>别忘记配置扫描包</li>
</ul>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>package</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>cn.zhugy.mybatisAnnotation.dao<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="单表"><a class="header-anchor" href="#单表">#</a> 单表</h3>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 查询所有</span>
<span class="token annotation punctuation">@Select</span><span class="token punctuation">(</span><span class="token string">"select * from user"</span><span class="token punctuation">)</span>
<span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">></span></span> <span class="token function">findAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 添加</span>
<span class="token annotation punctuation">@Insert</span><span class="token punctuation">(</span><span class="token string">"insert into user(name, birthday, address) values(#{name}, #{birthday}, #{address})"</span><span class="token punctuation">)</span>
<span class="token keyword">int</span> <span class="token function">addUser</span><span class="token punctuation">(</span><span class="token class-name">User</span> user<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 修改</span>
<span class="token annotation punctuation">@Update</span><span class="token punctuation">(</span><span class="token string">"update user set name=#{name}, birthday=#{birthday}, address=#{address} where id=#{id}"</span><span class="token punctuation">)</span>
<span class="token keyword">int</span> <span class="token function">updateUser</span><span class="token punctuation">(</span><span class="token class-name">User</span> user<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 删除</span>
<span class="token annotation punctuation">@Delete</span><span class="token punctuation">(</span><span class="token string">"delete from user where id=#{id}"</span><span class="token punctuation">)</span>
<span class="token keyword">int</span> <span class="token function">deleteUser</span><span class="token punctuation">(</span><span class="token keyword">int</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 根据 id 查询</span>
<span class="token annotation punctuation">@Select</span><span class="token punctuation">(</span><span class="token string">"select * from user where id=#{uid}"</span><span class="token punctuation">)</span>
<span class="token class-name">User</span> <span class="token function">findUserById</span><span class="token punctuation">(</span><span class="token keyword">int</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 根据姓名模糊查询</span>
<span class="token annotation punctuation">@Select</span><span class="token punctuation">(</span><span class="token string">"select * from user where name like #{name}"</span><span class="token punctuation">)</span>
<span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">></span></span> <span class="token function">findUserByName</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 查询总条数</span>
<span class="token annotation punctuation">@Select</span><span class="token punctuation">(</span><span class="token string">"select count(id) from user"</span><span class="token punctuation">)</span>
<span class="token keyword">int</span> <span class="token function">findTotalUser</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><h3 id="复杂映射关系"><a class="header-anchor" href="#复杂映射关系">#</a> 复杂映射关系</h3>
<ul>
<li>当数据库字段跟实体类属性名不一致时，就需要配置映射关系</li>
</ul>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 查询所有</span>
<span class="token annotation punctuation">@Select</span><span class="token punctuation">(</span><span class="token string">"select * from account"</span><span class="token punctuation">)</span>
<span class="token comment">// 配置跟数据库的映射关系</span>
<span class="token annotation punctuation">@Results</span><span class="token punctuation">(</span>id <span class="token operator">=</span> <span class="token string">"accountUserMap"</span><span class="token punctuation">,</span> value <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token annotation punctuation">@Result</span><span class="token punctuation">(</span>id <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">,</span> column <span class="token operator">=</span> <span class="token string">"id"</span><span class="token punctuation">,</span> property <span class="token operator">=</span> <span class="token string">"accountId"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token annotation punctuation">@Result</span><span class="token punctuation">(</span>column <span class="token operator">=</span> <span class="token string">"uid"</span><span class="token punctuation">,</span> property <span class="token operator">=</span> <span class="token string">"uid"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token annotation punctuation">@Result</span><span class="token punctuation">(</span>column <span class="token operator">=</span> <span class="token string">"money"</span><span class="token punctuation">,</span> property <span class="token operator">=</span> <span class="token string">"accountMoney"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Account</span><span class="token punctuation">></span></span> <span class="token function">findAllAccounts</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 根据 ID 查询</span>
<span class="token comment">// 引入 id 为 accountUserMap 的 map</span>
<span class="token annotation punctuation">@ResultMap</span><span class="token punctuation">(</span><span class="token string">"accountUserMap"</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Select</span><span class="token punctuation">(</span><span class="token string">"select * from account where id=2"</span><span class="token punctuation">)</span>
<span class="token class-name">Account</span> <span class="token function">findById</span><span class="token punctuation">(</span><span class="token keyword">int</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h3 id="多表"><a class="header-anchor" href="#多表">#</a> 多表</h3>
<ul>
<li>
<p>@Results 注解：代替了 resultMap 标签<br>
该注解中可以使用单个@Result 注解，也可以使用@Result 集合<br>
@Results（{@Result（），@Result（）}）或@Results（@Result（））</p>
</li>
<li>
<p>@Resutl 注解：代替了 id 标签和 result 标签<br>
属性介绍：</p>
<ul>
<li>id：是否是主键字段</li>
<li>column：数据库的列名</li>
<li>property：需要装配的属性名，实体类的属性名</li>
<li>one：对一，（@Result（one=@One）（）））</li>
<li>many：对多，（@Result（many=@many）（）））</li>
</ul>
</li>
<li>
<p>@One 注解（一对一）：代替了 assocation 标签，在注解中用来指定子查询返回单一对象。<br>
属性介绍：</p>
<ul>
<li>select：指定用来多表查询的 Sql Mapper（方法）</li>
<li>fetchType：延迟加载配置，会覆盖全局的配置参数 lazyLoadingEnabled。。</li>
<li>@Result(column=&quot;传给select方法作为参数的字段&quot;, property=&quot;&quot;, one=@One(select=&quot;&quot;))</li>
</ul>
</li>
<li>
<p>@Many 注解（多对多）：代替了 Collection 标签，在注解中用来指定子查询返回对象集合。</p>
<ul>
<li>@Result(column=&quot;&quot;, property=&quot;&quot;, many=@Many(select=&quot;&quot;))</li>
</ul>
</li>
<li>
<p>一对一</p>
</li>
</ul>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Select</span><span class="token punctuation">(</span><span class="token string">"select * from account"</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Results</span><span class="token punctuation">(</span>id <span class="token operator">=</span> <span class="token string">"accountUserMap"</span><span class="token punctuation">,</span> value <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token annotation punctuation">@Result</span><span class="token punctuation">(</span>id <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">,</span> column <span class="token operator">=</span> <span class="token string">"id"</span><span class="token punctuation">,</span> property <span class="token operator">=</span> <span class="token string">"accountId"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token annotation punctuation">@Result</span><span class="token punctuation">(</span>column <span class="token operator">=</span> <span class="token string">"uid"</span><span class="token punctuation">,</span> property <span class="token operator">=</span> <span class="token string">"uid"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token annotation punctuation">@Result</span><span class="token punctuation">(</span>column <span class="token operator">=</span> <span class="token string">"money"</span><span class="token punctuation">,</span> property <span class="token operator">=</span> <span class="token string">"accountMoney"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token comment">// column: 传哪个字段给方法当作参数</span>
        <span class="token annotation punctuation">@Result</span><span class="token punctuation">(</span>column <span class="token operator">=</span> <span class="token string">"uid"</span><span class="token punctuation">,</span> property <span class="token operator">=</span> <span class="token string">"user"</span><span class="token punctuation">,</span>
                <span class="token comment">// 对一</span>
                one <span class="token operator">=</span> <span class="token annotation punctuation">@One</span><span class="token punctuation">(</span>
                        select <span class="token operator">=</span> <span class="token string">"cn.zhugy.mybatisAnnotation.dao.IUserDao.findUserById"</span><span class="token punctuation">,</span>
                        fetchType <span class="token operator">=</span> <span class="token class-name">FetchType</span><span class="token punctuation">.</span>EAGER
                <span class="token punctuation">)</span>
        <span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Account</span><span class="token punctuation">></span></span> <span class="token function">findAllAccountsAndUser</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><ul>
<li>一对多</li>
</ul>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 一对多,查询用户的同时把所属账户也查询出来</span>
<span class="token annotation punctuation">@Select</span><span class="token punctuation">(</span><span class="token string">"select * from user"</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Results</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token annotation punctuation">@Result</span><span class="token punctuation">(</span>id <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">,</span> column <span class="token operator">=</span> <span class="token string">"id"</span><span class="token punctuation">,</span> property <span class="token operator">=</span> <span class="token string">"id"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token annotation punctuation">@Result</span><span class="token punctuation">(</span>column <span class="token operator">=</span> <span class="token string">"id"</span><span class="token punctuation">,</span> property <span class="token operator">=</span> <span class="token string">"accounts"</span><span class="token punctuation">,</span> many <span class="token operator">=</span> <span class="token annotation punctuation">@Many</span><span class="token punctuation">(</span>
                fetchType <span class="token operator">=</span> <span class="token class-name">FetchType</span><span class="token punctuation">.</span>LAZY<span class="token punctuation">,</span>
                select <span class="token operator">=</span> <span class="token string">"cn.zhugy.mybatisAnnotation.dao.IAccountDao.findById"</span>
        <span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">></span></span> <span class="token function">findUserAndAccount</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div></template>