<template><h1 id="修饰符"><a class="header-anchor" href="#修饰符">#</a> 修饰符</h1>
<h2 id="访问修饰符"><a class="header-anchor" href="#访问修饰符">#</a> 访问修饰符</h2>
<ul>
<li>权限如下</li>
</ul>
<table>
<thead>
<tr>
<th style="text-align:left">访问修饰符</th>
<th style="text-align:center">同一个类</th>
<th style="text-align:center">同包</th>
<th style="text-align:center">不同包，子类</th>
<th style="text-align:center">不同包，非子类</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">private</td>
<td style="text-align:center">√</td>
<td style="text-align:center"></td>
<td style="text-align:center"></td>
<td style="text-align:center"></td>
</tr>
<tr>
<td style="text-align:left">default（默认）</td>
<td style="text-align:center">√</td>
<td style="text-align:center">√</td>
<td style="text-align:center"></td>
<td style="text-align:center"></td>
</tr>
<tr>
<td style="text-align:left">protected</td>
<td style="text-align:center">√</td>
<td style="text-align:center">√</td>
<td style="text-align:center">√</td>
<td style="text-align:center"></td>
</tr>
<tr>
<td style="text-align:left">public</td>
<td style="text-align:center">√</td>
<td style="text-align:center">√</td>
<td style="text-align:center">√</td>
<td style="text-align:center">√</td>
</tr>
</tbody>
</table>
<h3 id="default"><a class="header-anchor" href="#default">#</a> default</h3>
<ul>
<li>默认访问修饰符（不使用任何修饰符）</li>
<li>使用对象：类、接口、变量、方法</li>
</ul>
<h3 id="public"><a class="header-anchor" href="#public">#</a> public</h3>
<ul>
<li>公有访问修饰符</li>
<li>使用对象：类、接口、变量、方法</li>
</ul>
<h3 id="protected"><a class="header-anchor" href="#protected">#</a> protected</h3>
<ul>
<li>受保护的访问修饰符</li>
<li>使用对象：变量、方法。<strong>不能修饰类（外部类）</strong></li>
</ul>
<h3 id="private"><a class="header-anchor" href="#private">#</a> private</h3>
<ul>
<li>私有访问修饰符</li>
<li>使用对象：变量、方法。<strong>不能修饰类（外部类）</strong></li>
</ul>
<h2 id="非访问修饰符"><a class="header-anchor" href="#非访问修饰符">#</a> 非访问修饰符</h2>
<h3 id="static"><a class="header-anchor" href="#static">#</a> static</h3>
<h4 id="可修饰范围"><a class="header-anchor" href="#可修饰范围">#</a> 可修饰范围</h4>
<ul>
<li>
<p>成员变量</p>
<ol>
<li>修饰：<code>类变量</code>或<code>静态变量</code>；</li>
<li>未修饰：<code>实例变量</code>或<code>非静态变量</code>；</li>
</ol>
</li>
<li>
<p>成员方法</p>
<ol>
<li>修饰：<code>类方法</code>或<code>静态方法</code>；</li>
<li>未修饰：<code>实例方法</code>或<code>非静态方法</code>；</li>
</ol>
</li>
<li>
<p>代码块</p>
<ol>
<li>修饰：<code>静态代码块</code>或<code>类初始化代码块</code>；</li>
<li>未修饰：<code>非静态代码块</code>、<code>实例化代码块</code>、<code>构造块</code>；</li>
</ol>
</li>
<li>
<p>成员内部类</p>
<ol>
<li>修饰：<code>静态成员内部类</code>或<code>静态内部类</code>；</li>
<li>未修饰：<code>非静态成员内部类</code>或<code>成员内部类</code>；</li>
</ol>
</li>
<li>
<p>区别：用了<code>static</code>修饰的表示属于<strong>类</strong>，而不属于<strong>某个对象</strong></p>
</li>
</ul>
<h4 id="静态方法的区别"><a class="header-anchor" href="#静态方法的区别">#</a> 静态方法的区别</h4>
<ol>
<li>静态方法的调用可以直接使用 <code>ClassName.methodName()</code> 调用。一般用于工具类中</li>
<li>静态方法中不允许出现 <code>this</code>，<code>super</code> 等关键字</li>
<li>静态方法不能被重写</li>
<li><code>abstract methods</code> 不能是静态的。</li>
<li>注意
<ul>
<li>实例方法可以直接访问 <code>实例变量</code>、<code>实例方法</code>、<code>静态变量</code>、<code>静态方法</code></li>
<li>静态方法不可以直接访问 <code>实例变量</code>、<code>实例方法</code>，必须使用对象实例访问<br>
<strong>原因</strong>：非静态的成员变量等需要先有 <code>实例对象</code>，才会开辟对应的 <code>堆</code> 内存空间，而静态方法调用时，有可能还没有对象，那么就无法访问对应的内存中的数据。为了避免访问不存在的内存空间，就需要阻止你在静态方法中直接使用它们。</li>
</ul>
</li>
</ol>
<h4 id="静态变量的特点"><a class="header-anchor" href="#静态变量的特点">#</a> 静态变量的特点</h4>
<ol>
<li>静态变量也有默认值</li>
<li>静态变量不需要在构造器中进行初始化</li>
<li>当静态变量与局部变量同名时，使用静态变量时在前面使用 <code>类名.</code> 进行区分</li>
<li>静态变量的 <code>get/set</code> 也是静态的</li>
</ol>
<p><strong>静态方法跟静态变量也可以使用 对象实例 访问，但是不推荐，因为会使得我们无法分辨这个域是属于实例的还是类的。</strong></p>
<h3 id="final"><a class="header-anchor" href="#final">#</a> final</h3>
<ol>
<li>修饰变量：变量一旦赋值后，不能被重新赋值。</li>
<li>修饰成员变量：赋值后不能重新赋值，而且必须显式的指定初始值（二选一）
<ul>
<li>定义时直接赋值</li>
<li>构造函数中赋值</li>
</ul>
</li>
<li>修饰成员方法：可以被子类继承，但是不能被子类重写。</li>
<li>修饰类：不能被继承，没有类能够继承 final 类的任何特性。</li>
<li>修饰参数：final 修饰传入方法的参数时，该参数只读，不可以修改。</li>
</ol>
<h3 id="abstract"><a class="header-anchor" href="#abstract">#</a> abstract</h3>
<ol>
<li>抽象类不能被实例化</li>
<li>抽象类中不一定包含抽象方法，但是有抽象方法的类必定是抽象类。</li>
<li>抽象类中的抽象方法只是声明，不包含方法体，就是不给出方法的具体实现也就是方法的具体功能。</li>
<li>构造方法，类方法（用 static 修饰的方法）不能声明为抽象方法。</li>
<li>抽象类的子类必须给出抽象类中的抽象方法的具体实现，除非该子类也是抽象类。</li>
</ol>
<h3 id="synchronized"><a class="header-anchor" href="#synchronized">#</a> synchronized</h3>
<h3 id="transient"><a class="header-anchor" href="#transient">#</a> transient</h3>
<h3 id="volatile"><a class="header-anchor" href="#volatile">#</a> volatile</h3>
</template>