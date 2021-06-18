<template><h1 id="spring-的概念"><a class="header-anchor" href="#spring-的概念">#</a> spring 的概念</h1>
<h2 id="ioc"><a class="header-anchor" href="#ioc">#</a> IOC</h2>
<ul>
<li>
<p>IOC：Inversion Of Control（控制反转），降低程序之间的耦合（依赖关系）</p>
</li>
<li>
<p>依赖关系的管理：都交给 Spring 来维护，当当前类需要用到其他类时（产生依赖关系），只需要在配置文件（依赖注入）中加已说明，Spring 就会根据配置文件来提供所依赖的类</p>
</li>
</ul>
<h2 id="实现-bean-工厂"><a class="header-anchor" href="#实现-bean-工厂">#</a> 实现 Bean 工厂</h2>
<ul>
<li>bean.properties</li>
</ul>
<div class="language-properties ext-properties line-numbers-mode"><pre v-pre class="language-properties"><code><span class="token attr-name">accountService</span><span class="token punctuation">=</span><span class="token attr-value">cn.zhugy.service.impl.AccountServiceImpl</span>
<span class="token attr-name">accountDao</span><span class="token punctuation">=</span><span class="token attr-value">cn.zhugy.dao.impl.AccountDaoImpl</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><ul>
<li>工厂模式</li>
</ul>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">/*
 *   1. 需要一个配置文件来配置 service 和 dao
 *       配置的内容：全限定类名
 *
 *   2. 通过读取配置文件中配置的内容，反射创建对象
 * */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BeanFactory</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Properties</span> props<span class="token punctuation">;</span>

    <span class="token comment">// 定义一个 map，用于存放要创建的对象，称为容器</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span> beans<span class="token punctuation">;</span>

    <span class="token keyword">static</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token comment">// 加载配置文件</span>
            props <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Properties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">InputStream</span> in <span class="token operator">=</span> <span class="token class-name">BeanFactory</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getClassLoader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getResourceAsStream</span><span class="token punctuation">(</span><span class="token string">"bean.properties"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            props<span class="token punctuation">.</span><span class="token function">load</span><span class="token punctuation">(</span>in<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// 单例模式</span>
            beans <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 取出配置文件中所有的 key</span>
            <span class="token class-name">Enumeration</span> keys <span class="token operator">=</span> props<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span>keys<span class="token punctuation">.</span><span class="token function">hasMoreElements</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 取出每个 key</span>
                <span class="token class-name">String</span> key <span class="token operator">=</span> keys<span class="token punctuation">.</span><span class="token function">nextElement</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">// 根据 key 获取 value</span>
                <span class="token class-name">String</span> beanPath <span class="token operator">=</span> props<span class="token punctuation">.</span><span class="token function">getProperty</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">// 反射创建对象</span>
                <span class="token class-name">Object</span> value <span class="token operator">=</span> <span class="token class-name">Class</span><span class="token punctuation">.</span><span class="token function">forName</span><span class="token punctuation">(</span>beanPath<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">newInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">// 把 key 和 value 存入容器中</span>
                beans<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">ExceptionInInitializerError</span><span class="token punctuation">(</span><span class="token string">"初始化 properties 失败"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 根据 bean 的名称获取 bean</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Object</span> <span class="token function">getBean</span><span class="token punctuation">(</span><span class="token class-name">String</span> beanName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> beans<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>beanName<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br></div></div><h2 id="applicationcontext"><a class="header-anchor" href="#applicationcontext">#</a> ApplicationContext</h2>
<ul>
<li>
<p><code>ApplicationContext</code>（核心容器）的三个实现类</p>
<ol>
<li><code>ClassPathXmlApplicationContext</code>：加载类路径下的文件创建容器</li>
<li><code>FileSystemXmlApplicationContext</code>：加载磁盘任意路径下的配置文件创建容器</li>
<li><code>AnnotationConfigApplicationContext</code>：读取注解创建容器</li>
</ol>
</li>
<li>
<p>核心容器的两个接口</p>
<ol>
<li>
<p>ApplicationContext：单例对象适用<br>
在构建核心容器时，采取立即加载的方式，只要一读完配置文件就马上创建配置的 Bean 对象</p>
</li>
<li>
<p>BeanFactory：多例对象适用<br>
在构建核心容器时，采取延迟加载的方式，什么时候根据 ID 获取对象了，就什么时候创建 Bean 对象</p>
</li>
</ol>
</li>
</ul>
<h2 id="bean-标签"><a class="header-anchor" href="#bean-标签">#</a> Bean 标签</h2>
<ul>
<li>获取 Bean 对象步骤</li>
</ul>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 1. 获取核心容器</span>
<span class="token class-name">ApplicationContext</span> ac <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ClassPathXmlApplicationContext</span><span class="token punctuation">(</span><span class="token string">"bean.xml"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 2. 根据 ID 获取 bean 对象</span>
<span class="token class-name">IAccountService</span> as <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">IAccountService</span><span class="token punctuation">)</span> ac<span class="token punctuation">.</span><span class="token function">getBean</span><span class="token punctuation">(</span><span class="token string">"accountService"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h3 id="创建-bean-对象的三种方式"><a class="header-anchor" href="#创建-bean-对象的三种方式">#</a> 创建 Bean 对象的三种方式</h3>
<ol>
<li>使用默认无参构造函数</li>
</ol>
<ul>
<li>它会根据默认无参构造函数来创建类对象。如果 Bean（AccountServiceImpl 对象） 中没有默认无参构造函数，将会创建失败。</li>
</ul>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>accountService<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>cn.zhugy.service.impl.AccountServiceImpl<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ul>
<li>后面这两种是把类中方法的返回值存入 Spring 容器中，而不是把整个类存入 Spring 容器</li>
</ul>
<ol start="2">
<li>使用类（工厂）中的<strong>静态方法</strong>创建对象，并存入容器</li>
</ol>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token comment">&lt;!-- 使用 accountService 类的 createAccountService 静态方法创建对象 --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>accountService<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>cn.zhugy.service.impl.AccountServiceImpl<span class="token punctuation">"</span></span> <span class="token attr-name">factory-method</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>createAccountService<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><ol start="3">
<li>使用类（工厂）中的<strong>普通方法</strong>创建对象，并存入 Spring 容器</li>
</ol>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>instancFactory<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>cn.zhugy.factory.InstanceFactory<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>accountService<span class="token punctuation">"</span></span> <span class="token attr-name">factory-bean</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>instancFactory<span class="token punctuation">"</span></span> <span class="token attr-name">factory-method</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>createAccountService<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="bean-对象的作用范围"><a class="header-anchor" href="#bean-对象的作用范围">#</a> Bean 对象的作用范围</h3>
<ul>
<li>
<p>bean 标签的 scope 属性用于指定 bean 的作用范围</p>
<ol>
<li>
<p>singleton：单例的，默认值</p>
</li>
<li>
<p>prototype：多例的</p>
</li>
<li>
<p>request：作用于 Web 应用的请求范围</p>
</li>
<li>
<p>session：作用于 Web 应用的会话范围</p>
</li>
<li>
<p>global-session：作用于集群环境的会话范围（全局会话范围），当不是集群环境时，它就是上一条的 session</p>
</li>
</ol>
</li>
</ul>
<h3 id="bean-对象的生命周期"><a class="header-anchor" href="#bean-对象的生命周期">#</a> Bean 对象的生命周期</h3>
<ol>
<li>
<p>单例：一个应用只有一个 Bean 对象的实例，它的作用范围是整个应用</p>
<ul>
<li>创建：当容器创建时 Bean 对象被创建</li>
<li>存在：只要容器在，Bean 对象也一直存在</li>
<li>销毁：当应用卸载，容器销毁时，Bean 对象也跟着销毁</li>
</ul>
</li>
<li>
<p>多例：每次访问 Bean 对象时，都会重新创建 Bean 对象实例</p>
<ul>
<li>创建：每次使用 Bean 对象时，创建对象实例</li>
<li>存在：只要 Bean 对象还在使用，就一直存在</li>
<li>销毁：当 Bean 对象长时间不用且没有其他对象引用时，就会被 Java 的垃圾回收器回收了</li>
</ul>
</li>
</ol>
<h2 id="依赖注入"><a class="header-anchor" href="#依赖注入">#</a> 依赖注入</h2>
<ul>
<li>
<p>Dependency Injection：它是 spring 框架核心 ioc 的具体实现。</p>
</li>
<li>
<p>IOC 只能降低程序间的耦合（依赖），不能说让程序之间完全没有依赖，那么这些依赖的关系将交给 Spring 的 <strong>依赖注入</strong> 来管理，</p>
</li>
</ul>
<h3 id="能注入的三类数据"><a class="header-anchor" href="#能注入的三类数据">#</a> 能注入的三类数据</h3>
<ol>
<li>基本类型和 String</li>
<li>其它的 Bean 类型，在配置文件或者注解配置过的 Bean 对象</li>
<li>复杂类型/集合类型</li>
</ol>
<h3 id="注入的三种方式"><a class="header-anchor" href="#注入的三种方式">#</a> 注入的三种方式</h3>
<ol>
<li>使用构造函数注入：不适用与经常变动的数据</li>
</ol>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token comment">&lt;!--
使用的标签：constructor-arg
标签出现的位置：bean 标签的内部
标签的属性：
  type：用户指定要注入的数据的数据类型，该数据类型也是构造函数中某个或某些参数的类型
  index：用于指定要把数据注入给构造函数参数的哪个索引位置，索引的位置从零开始
  name：用于指定给构造函数中指定名称的参数赋值（常用）
  =========================
  value：需要注入的数据（基本类型和 String 类型）
  ref：用于引用其他的 Bean 类型数据（指的是在 Spring 核心容器中出现过的 Bean 对象）
 --></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><ol start="2">
<li>使用 Set 方法注入</li>
</ol>
<ul>
<li>类里面的属性需要有 set 方法</li>
</ul>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token comment">&lt;!--
使用的标签：property
标签出现的位置：bean 标签的内部
标签的属性：
  name：指定注入时需要调用的 set 名称，跟属性名无关，只跟 set 方法名称有关，比如 setUsername -> username
  value：需要注入的数据（基本类型和 String 类型）
  ref：用于引用其他的 Bean 类型数据（指的是在 Spring 核心容器中出现过的 Bean 对象）
 --></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><ul>
<li>注入集合数据</li>
</ul>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token comment">&lt;!--
  在 property 标签中使用子标签：
    给 List 结构集合注入的标签有：list、array、set
    给 Map 结构集合注入的标签有：map、props

  总结：结构相同，标签可以互换，也就是说相同的结构下用所属结构下的什么标签都是一样的

 --></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><ol start="3">
<li>使用注解注入</li>
</ol>
<h2 id="常用注解"><a class="header-anchor" href="#常用注解">#</a> 常用注解</h2>
<h3 id="创建对象"><a class="header-anchor" href="#创建对象">#</a> 创建对象</h3>
<ul>
<li>
<p><code>@Component</code></p>
<ul>
<li>作用：把当前类对象存入 Spring 容器中</li>
<li>属性：<br>
value：用于指定 Bean 的 ID，当不写时，默认值是当前类名，首字母小写</li>
</ul>
</li>
<li>
<p>这三个注解作用属性与 @Component 一样，只是语义化更好<br>
<code>@Controller</code>：用在表现层<br>
<code>@Service</code>：用于业务层<br>
<code>@Repository</code>：用于持久层</p>
</li>
</ul>
<h3 id="注入数据"><a class="header-anchor" href="#注入数据">#</a> 注入数据</h3>
<ul>
<li><code>@Autowired</code>：自当按照类型注入，只要容器中有唯一的一个 Bean 对象类型和要注入的变量类型匹配，就可以成功注入</li>
<li><code>@Qualifier</code>：在按照类中注入的基础上再按照名称注入（和 Autowired 配合）。在给类成员注入时不能单独使用，但是在给方法参数注入时可以</li>
<li><code>@Resource</code>：不依托于 Autowired ，但是属性不是 value 了，而是 name</li>
</ul>
<p>以上三个注解只能注入 bean 类型的数据，不能注入基本类型和 String 类型，另外，集合类型只能通过 xml 注入</p>
<ul>
<li><code>@Value</code>：用于注入基本类型和 String 类型的数据</li>
</ul>
<h3 id="改变范围"><a class="header-anchor" href="#改变范围">#</a> 改变范围</h3>
<ul>
<li><code>@Scope</code>：用于指定 bean 的作用范围</li>
</ul>
<h3 id="生命周期"><a class="header-anchor" href="#生命周期">#</a> 生命周期</h3>
<ul>
<li><code>@PostConstruct</code>：用于指定销毁方法</li>
<li><code>@Repository</code>：用于指定初始化方法</li>
</ul>
<!-- 新内容 start -->
<h2 id="其他注解"><a class="header-anchor" href="#其他注解">#</a> 其他注解</h2>
<ul>
<li>
<p><code>@Configuration</code>：指定当前类是一个 spring 配置类，当创建容器时会从该类上加载注解。获取容器时需要使用：<br>
<code>AnnotationApplicationContext (有@Configuration 注解的类.class)</code>。</p>
</li>
<li>
<p><code>@ComponentScan</code>：用于指定 spring 在初始化容器时要扫描的包。作用和在 spring 的 xml 配置文件中的：<br>
<code>&lt;context:component-scan base-package=&quot;cn.zhugy&quot;/&gt;</code> 是一样的。</p>
</li>
<li>
<p><code>@Bean</code>：该注解只能写在方法上，表明使用此方法创建一个 Bean 对象，并且放入 spring 容器。<br>
属性：name：用于指定 Bean 的 Id ， 当不写时，默认值是当前方法的名称<br>
注意：当使用注解配置方法时，如果方法有参数，spring 框架会去容器中查找可用的 bean 对象</p>
</li>
<li>
<p><code>@Import</code>：用于导入其他配置类，在引入其他配置类时，可以不用再写 <code>@Configuration</code> 注解。</p>
</li>
<li>
<p><code>@PropertySource</code>：用于加载.properties 文件中的配置。如果是在类路径下，需要写上 classpath:。</p>
</li>
</ul>
<h2 id="整合-junit"><a class="header-anchor" href="#整合-junit">#</a> 整合 Junit</h2>
<ol>
<li>导入 jar 包 <code>spring-test</code></li>
<li>使用 Junit 提供的注解把原有的 main 方法替换成 spring 提供的</li>
</ol>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RunWith</span><span class="token punctuation">(</span><span class="token class-name">SpringJUnit4ClassRunner</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AccountServiceTest</span> <span class="token punctuation">{</span>
  <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><ol start="3">
<li>告知 spring 运行器，spring 和 ioc 创建是基于 xml 还是注解，并且指定位置</li>
</ol>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>
<span class="token comment">// locations 属性：用于指定配置文件的位置。如果是类路径下，需要用 classpath:表明</span>
<span class="token comment">// classes 属性：用于指定注解的类。当不使用 xml 配置时，需要用此属性指定注解类的位置。</span>

<span class="token annotation punctuation">@RunWith</span><span class="token punctuation">(</span><span class="token class-name">SpringJUnit4ClassRunner</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@ContextConfiguration</span><span class="token punctuation">(</span>locations<span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">"classpath:bean.xml"</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AccountServiceTest</span> <span class="token punctuation">{</span>
  <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><ol start="4">
<li>使用 <code>@Autowired</code> 给测试类中的变量注入数据</li>
</ol>
<!-- 新内容 end -->
<h2 id="aop"><a class="header-anchor" href="#aop">#</a> AOP</h2>
<ul>
<li>AOP：全称是 Aspect Oriented Programming。 即：面向切面编程。简单的说它就是把我们程序重复的代码抽取出来，在需要执行的时候，使用<strong>动态代理</strong>的技术，在不修改源码的基础上，对我们的已有方法进行增强。</li>
</ul>
<h2 id="基于-xml-的-aop-配置"><a class="header-anchor" href="#基于-xml-的-aop-配置">#</a> 基于 XML 的 AOP 配置</h2>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token prolog">&lt;?xml version="1.0" encoding="UTF-8"?></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>beans</span> <span class="token attr-name">xmlns</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://www.springframework.org/schema/beans<span class="token punctuation">"</span></span>
       <span class="token attr-name"><span class="token namespace">xmlns:</span>xsi</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://www.w3.org/2001/XMLSchema-instance<span class="token punctuation">"</span></span>
       <span class="token attr-name"><span class="token namespace">xmlns:</span>aop</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://www.springframework.org/schema/aop<span class="token punctuation">"</span></span>
       <span class="token attr-name"><span class="token namespace">xsi:</span>schemaLocation</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://www.springframework.org/schema/beans
    http://www.springframework.org/schema/beans/spring-beans.xsd
    http://www.springframework.org/schema/aop
    http://www.springframework.org/schema/aop/spring-aop.xsd <span class="token punctuation">"</span></span><span class="token punctuation">></span></span>

    <span class="token comment">&lt;!--  配置 spring 的 IOC  --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>accountService<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>cn.zhugy.service.impl.AccountServiceImpl<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
    <span class="token comment">&lt;!--  spring 基于 XML 配置步骤

        1. 把通知的 bean（Logger类） 也交给 spring 管理
        2. 使用 aop:config 标签表明开始 AOP 的配置
        3. 使用 aop:aspect 标签表明配置切面
            id属性：给切面提供一个唯一标识
            ref属性：指定通知类 bean 的 id
        4. 在 aop:aspect 标签内部使用对应标签来配置通知的类型
            aop:before：配置前置通知
                method属性：指定 Logger 类中的哪个方法是前置通知
                pointcut属性：指定切入点表达式，用来表示对哪些方法增强
                切入点表达式写法：execution（表达式）
                表达式写法：访问修饰符 返回值 包名.包名.包名...类名.方法名(参数列表)
                  示例：
                      public void cn.zhugy.service.impl.AccountServiceImpl.saveAccount()
                  全通配方法：
                      * *..*.*(..)
                  实际开发切入点表达式常用写法：
                      * cn.zhugy.service.impl.*.*(..)
    --></span>
    <span class="token comment">&lt;!--  1. 配置 logger 类  --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>logger<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>cn.zhugy.utils.Logger<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
    <span class="token comment">&lt;!--  2. 配置 AOP  --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">aop:</span>config</span><span class="token punctuation">></span></span>
        <span class="token comment">&lt;!-- 3. 配置切面 --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">aop:</span>aspect</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>logAdvice<span class="token punctuation">"</span></span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>logger<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
            <span class="token comment">&lt;!-- 4. 配置通知类型 --></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">aop:</span>before</span> <span class="token attr-name">method</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>printLog<span class="token punctuation">"</span></span> <span class="token attr-name">pointcut</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>execution(* cn.zhugy.service.impl.*.*(..))<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token namespace">aop:</span>aspect</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token namespace">aop:</span>config</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>beans</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br></div></div><h2 id="四种通知类型"><a class="header-anchor" href="#四种通知类型">#</a> 四种通知类型</h2>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">aop:</span>aspect</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>logAdvice<span class="token punctuation">"</span></span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>logger<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token comment">&lt;!-- 4. 配置通知类型 --></span>

    <span class="token comment">&lt;!-- 配置公共的切入点表达式。还可以写在 aop:aspect 标签外面（aop:aspect 标签之前） --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">aop:</span>pointcut</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>pt1<span class="token punctuation">"</span></span> <span class="token attr-name">expression</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>execution(* cn.zhugy.service.impl.*.*(..))<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
    <span class="token comment">&lt;!-- 前置通知：切入点方法执行前执行 --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">aop:</span>before</span> <span class="token attr-name">method</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>beforePrintLog<span class="token punctuation">"</span></span> <span class="token attr-name">pointcut-ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>pt1<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
    <span class="token comment">&lt;!-- 后置通知：切入点方法正常执行后执行，和异常通知只能执行一个 --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">aop:</span>after-returning</span> <span class="token attr-name">method</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>afterPrintLog<span class="token punctuation">"</span></span> <span class="token attr-name">pointcut-ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>pt1<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
    <span class="token comment">&lt;!-- 异常通知：切入点方法执行产生异常后执行 --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">aop:</span>after-throwing</span> <span class="token attr-name">method</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>throwPrintLog<span class="token punctuation">"</span></span> <span class="token attr-name">pointcut-ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>pt1<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
    <span class="token comment">&lt;!-- 最终通知：无论切入点方法是否有异常都会执行 --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">aop:</span>after</span> <span class="token attr-name">method</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>lastPrintLog<span class="token punctuation">"</span></span> <span class="token attr-name">pointcut-ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>pt1<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
    <span class="token comment">&lt;!-- 环绕通知
        当配置了环绕通知后，需要有返回值，否则切入点方法不会执行
      --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">aop:</span>around</span> <span class="token attr-name">method</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>aroundPrintLog<span class="token punctuation">"</span></span> <span class="token attr-name">pointcut-ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>pt1<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token namespace">aop:</span>aspect</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><ul>
<li>环绕通知</li>
</ul>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 环绕通知，可以手动写前置，后置等通知</span>
<span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">aroundPrintLog</span><span class="token punctuation">(</span><span class="token class-name">ProceedingJoinPoint</span> pjp<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Object</span> rtValue <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token class-name">Object</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args <span class="token operator">=</span> pjp<span class="token punctuation">.</span><span class="token function">getArgs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 方法执行所需参数</span>
        rtValue <span class="token operator">=</span> pjp<span class="token punctuation">.</span><span class="token function">proceed</span><span class="token punctuation">(</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 明确调用切入点方法</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"环绕通知（aroundPrintLog）方法执行了..."</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 写在 pjp.proceed 后面就是后置通知</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Throwable</span> throwable<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        throwable<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token keyword">finally</span> <span class="token punctuation">{</span>

    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> rtValue<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h2 id="基于注解配置aop"><a class="header-anchor" href="#基于注解配置aop">#</a> 基于注解配置AOP</h2>
<blockquote>
<p>注意：注解配置通知执行时调用的顺序有问题，最终通知 执行 在 后置（异常）通知之前</p>
</blockquote>
<ul>
<li>配置文件</li>
</ul>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token prolog">&lt;?xml version="1.0" encoding="UTF-8"?></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>beans</span> <span class="token attr-name">xmlns</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://www.springframework.org/schema/beans<span class="token punctuation">"</span></span>
       <span class="token attr-name"><span class="token namespace">xmlns:</span>xsi</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://www.w3.org/2001/XMLSchema-instance<span class="token punctuation">"</span></span>
       <span class="token attr-name"><span class="token namespace">xmlns:</span>aop</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://www.springframework.org/schema/aop<span class="token punctuation">"</span></span>
       <span class="token attr-name"><span class="token namespace">xmlns:</span>context</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://www.springframework.org/schema/context<span class="token punctuation">"</span></span>
       <span class="token attr-name"><span class="token namespace">xsi:</span>schemaLocation</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://www.springframework.org/schema/beans
    http://www.springframework.org/schema/beans/spring-beans.xsd
    http://www.springframework.org/schema/aop
    http://www.springframework.org/schema/aop/spring-aop.xsd
    http://www.springframework.org/schema/context
    http://www.springframework.org/schema/context/spring-context.xsd <span class="token punctuation">"</span></span><span class="token punctuation">></span></span>


    <span class="token comment">&lt;!--  配置 spring 创建容器时要扫描的包  --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">context:</span>component-scan</span> <span class="token attr-name">base-package</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>cn.zhugy<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>

    <span class="token comment">&lt;!--  配置 spring 开启注解 AOP 的支持  --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">aop:</span>aspectj-autoproxy</span><span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>beans</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><ul>
<li>切面类</li>
</ul>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>
<span class="token annotation punctuation">@Component</span><span class="token punctuation">(</span><span class="token string">"logger"</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Aspect</span> <span class="token comment">// 表示当前类是一个切面</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Logger</span> <span class="token punctuation">{</span>
    <span class="token comment">// 切入点表达式</span>
    <span class="token annotation punctuation">@Pointcut</span><span class="token punctuation">(</span><span class="token string">"execution(* cn.zhugy.service.impl.*.*(..))"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">pt1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token comment">// 前置通知</span>
    <span class="token annotation punctuation">@Before</span><span class="token punctuation">(</span><span class="token string">"pt1()"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">beforePrintLog</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"前置通知（beforePrintLog）方法执行了1..."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 后置通知</span>
    <span class="token annotation punctuation">@AfterReturning</span><span class="token punctuation">(</span><span class="token string">"pt1()"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">afterPrintLog</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"后置通知（afterPrintLog）方法执行了2..."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 异常通知</span>
    <span class="token annotation punctuation">@AfterThrowing</span><span class="token punctuation">(</span><span class="token string">"pt1()"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">throwPrintLog</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"异常通知（throwPrintLog）方法执行了3..."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 最终通知</span>
    <span class="token annotation punctuation">@After</span><span class="token punctuation">(</span><span class="token string">"pt1()"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">lastPrintLog</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"最终通知（lastPrintLog）方法执行了4..."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 环绕通知，可以手动写前置，后置等通知</span>
    <span class="token annotation punctuation">@Around</span><span class="token punctuation">(</span><span class="token string">"pt1()"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">aroundPrintLog</span><span class="token punctuation">(</span><span class="token class-name">ProceedingJoinPoint</span> pjp<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Object</span> rtValue <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token class-name">Object</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args <span class="token operator">=</span> pjp<span class="token punctuation">.</span><span class="token function">getArgs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 方法执行所需参数</span>
            rtValue <span class="token operator">=</span> pjp<span class="token punctuation">.</span><span class="token function">proceed</span><span class="token punctuation">(</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 明确调用切入点方法</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"环绕通知（aroundPrintLog）方法执行了..."</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 写在 pjp.proceed 后面就是后置通知</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Throwable</span> throwable<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            throwable<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>

        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> rtValue<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br></div></div><h2 id="spring-中的事务"><a class="header-anchor" href="#spring-中的事务">#</a> Spring 中的事务</h2>
<h3 id="基于-xml-配置"><a class="header-anchor" href="#基于-xml-配置">#</a> 基于 XML 配置</h3>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token comment">&lt;!-- 配置数据源--></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>dataSource<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>org.springframework.jdbc.datasource.DriverManagerDataSource<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>driverClassName<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.mysql.cj.jdbc.Driver<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>url<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>jdbc:mysql://127.0.0.1:3306/study?serverTimezone=UTC<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>username<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>root<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>password<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>root<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">></span></span>
<span class="token comment">&lt;!-- spring 中基于 xml 的声明式事务控制配置步骤
    1. 配置事务管理器
    2. 配置事务的通知
        id 属性：事务通知唯一标识
        transaction-manager 属性：给事务通知提供一个事务管理器引用
    3. 配置 AOP
    4. 配置公共的切入点表达式
    5. 建立事务通知和切入点表达式的对应关系
    6. 配置事务的属性：配置在事务的通知 tx:advice 标签的内部
        isolation：事务的隔离级别，默认值 DEFAULT ，表示使用数据库的默认隔离级别
        propagation：事务的传播行为，默认值 REQUIRED 表示一定会有事务。查询可以选择 SUPPORTS。
        read-only：事务是否只读，默认值 false，只有查询方法才能设置为 true，
        timeout：事务的超时时间，默认 -1，表示永不超时，如果指定了数值，则以秒为单位
        rollback-for：用于指定一个异常，当产生该异常时，事务回滚，产生其它异常时，事务不回滚，没有默认值，表示所有异常都回滚
        no-rollback-for：用于指定一个异常，产生该异常时，事务不回滚，产生其它异常时事务回滚，没有默认值，表示所有异常都回滚

  --></span>
<span class="token comment">&lt;!-- 1. 配置事务管理器 --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>transactionManager<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>org.springframework.jdbc.datasource.DataSourceTransactionManager<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>dataSource<span class="token punctuation">"</span></span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>dataSource<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">></span></span>
<span class="token comment">&lt;!-- 2. 配置事务的通知 --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">tx:</span>advice</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>txAdvice<span class="token punctuation">"</span></span> <span class="token attr-name">transaction-manager</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>transactionManager<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token comment">&lt;!-- 6. 配置事务的属性 --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">tx:</span>attributes</span><span class="token punctuation">></span></span>
        <span class="token comment">&lt;!-- 增删改 --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">tx:</span>method</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>*<span class="token punctuation">"</span></span> <span class="token attr-name">isolation</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>DEFAULT<span class="token punctuation">"</span></span> <span class="token attr-name">propagation</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>REQUIRED<span class="token punctuation">"</span></span> <span class="token attr-name">read-only</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>false<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
        <span class="token comment">&lt;!-- 查询 --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">tx:</span>method</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>find*<span class="token punctuation">"</span></span> <span class="token attr-name">propagation</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>SUPPORTS<span class="token punctuation">"</span></span> <span class="token attr-name">read-only</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>true<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token namespace">tx:</span>attributes</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token namespace">tx:</span>advice</span><span class="token punctuation">></span></span>
<span class="token comment">&lt;!-- 3. 配置 aop --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">aop:</span>config</span><span class="token punctuation">></span></span>
    <span class="token comment">&lt;!-- 4. 配置公共的切入点表达式 --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">aop:</span>pointcut</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>pt1<span class="token punctuation">"</span></span> <span class="token attr-name">expression</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>execution(* cn.zhugy.service.impl.*.*(..))<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
    <span class="token comment">&lt;!-- 5. 建立关系 --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">aop:</span>advisor</span> <span class="token attr-name">advice-ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>txAdvice<span class="token punctuation">"</span></span> <span class="token attr-name">pointcut-ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>pt1<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token namespace">aop:</span>config</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br></div></div><h3 id="基于注解"><a class="header-anchor" href="#基于注解">#</a> 基于注解</h3>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token comment">&lt;!-- 配置数据源--></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>dataSource<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>org.springframework.jdbc.datasource.DriverManagerDataSource<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>driverClassName<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.mysql.cj.jdbc.Driver<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>url<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>jdbc:mysql://127.0.0.1:3306/study?serverTimezone=UTC<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>username<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>root<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>password<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>root<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">></span></span>

<span class="token comment">&lt;!-- spring 中基于 注解 的声明式事务控制配置步骤
    1. 配置事务管理器
    2. 开启 spring 对注解事务的支持
    3. 在需要事务支持的地方使用 @Transactional 注解
  --></span>
<span class="token comment">&lt;!-- 1. 配置事务管理器 --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>transactionManager<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>org.springframework.jdbc.datasource.DataSourceTransactionManager<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>dataSource<span class="token punctuation">"</span></span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>dataSource<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">></span></span>
<span class="token comment">&lt;!-- 2. 开启事务支持 --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">tx:</span>annotation-driven</span> <span class="token attr-name">transaction-manager</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>transactionManager<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div></template>