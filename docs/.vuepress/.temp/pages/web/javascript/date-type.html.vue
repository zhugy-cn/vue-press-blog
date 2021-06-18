<template><h1 id="数据类型"><a class="header-anchor" href="#数据类型">#</a> 数据类型</h1>
<h2 id="分类"><a class="header-anchor" href="#分类">#</a> 分类</h2>
<ul>
<li>
<p>在“JavaScript”规范中，共定义了七种数据类型，分为“基本类型”和“引用类型”两大类</p>
<ul>
<li>
<p>基本类型（六种）：字符串（String）、数字（Number）、布尔（Boolean）、唯一（Symbol）、（未定义）Undefined、空（Null）。</p>
</li>
<li>
<p>引用类型（一种）：对象（Object），对象又包含了 Object、Function、Array、Date、RegExp 等</p>
</li>
</ul>
</li>
</ul>
<h2 id="基本包装类型"><a class="header-anchor" href="#基本包装类型">#</a> 基本包装类型</h2>
<blockquote>
<p>基本包装类型有 String、Number、Boolean</p>
</blockquote>
<ul>
<li>引用类型有方法和属性，但是基本类型是没有的，为了方便操作，给每一个包装类型提供了一个对应的包装对象</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> str <span class="token operator">=</span> <span class="token string">"hello"</span><span class="token punctuation">;</span> <span class="token comment">//  string 基本类型，本身不具备方法和属性</span>
<span class="token keyword">var</span> s1 <span class="token operator">=</span> str<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//  在执行到这一句的时候 后台会自动完成以下动作</span>

<span class="token comment">// 1. 找到对应的包装对象，通过包装对象创建一个值相同的实例</span>
<span class="token comment">// var str = new String('hello');</span>
<span class="token comment">// 2. 调用这个实例的方法（通过原型继承调用包装对象的方法）</span>
<span class="token comment">// var s2 = str.chaAt(0);</span>
<span class="token comment">// 3. 销毁这个实例</span>
<span class="token comment">// str = null;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>s1<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// h</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 还是hello不是null,注意这是一瞬间的动作,实际上我们没有改变字符串本身的值。就是做了下面的动作.这也是为什么每个字符串具有的方法并没有改变字符串本身的原因。</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><ul>
<li>
<p>引用类型与基本包装类型的区别</p>
<p>它们的对象生命周期不同：</p>
<ul>
<li>
<p>引用类型：使用 new 创建引用类型的实例，在执行流离开当前作用域之前都一直保存在内存中。</p>
</li>
<li>
<p>基本包装类型：自动创建基本包装类型的对象，只执行一行代码的瞬间之后就会立即销毁。</p>
</li>
</ul>
<p>这意味着在运行时为基本包装类型值添加属性和方法是无效的，只有在包装对象的原型上添加。</p>
</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> str <span class="token operator">=</span> <span class="token string">"hello"</span><span class="token punctuation">;</span>

str<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">"jack"</span><span class="token punctuation">;</span> <span class="token comment">// 添加之后马上销毁了，无效</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>str<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// undefined</span>

<span class="token class-name">String</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>age <span class="token operator">=</span> <span class="token number">24</span><span class="token punctuation">;</span> <span class="token comment">// 在原型上添加</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>str<span class="token punctuation">.</span>age<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 24</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h2 id="数据类型检测"><a class="header-anchor" href="#数据类型检测">#</a> 数据类型检测</h2>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> s1 <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> s2 <span class="token operator">=</span> <span class="token string">""</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> s3 <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> s4 <span class="token operator">=</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> s5 <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> <span class="token function-variable function">s6</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> s7 <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> s8 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> s9 <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> s10 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> s11 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RegExp</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 使用 typeof 运算符只能检测出七种</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> s1<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// number</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> s2<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// string</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> s3<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// boolean</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> s4<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// undefined</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> s5<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// symbol</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> s6<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// function</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> s7<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// object</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> s8<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// object</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> s9<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// object</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> s10<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// object</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> s11<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// object</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"----------------------"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 使用 Object.prototype.toString(),全部能检测出来</span>

<span class="token comment">// Object.prototype.toString 最终会返回形式如 [object,class] 的字符串，class 指代的是其检测出的数据类型，这个是我们判断数据类型的关键。</span>

<span class="token comment">// toString === window.toString === Object.prototype.toString</span>

<span class="token keyword">let</span> <span class="token function-variable function">judgeType</span> <span class="token operator">=</span> <span class="token parameter">val</span> <span class="token operator">=></span>
  <span class="token function">toString</span>
    <span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">judgeType</span><span class="token punctuation">(</span>s1<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// number</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">judgeType</span><span class="token punctuation">(</span>s2<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// string</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">judgeType</span><span class="token punctuation">(</span>s3<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// boolean</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">judgeType</span><span class="token punctuation">(</span>s4<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// undefined</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">judgeType</span><span class="token punctuation">(</span>s5<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// symbol</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">judgeType</span><span class="token punctuation">(</span>s6<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// function</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">judgeType</span><span class="token punctuation">(</span>s7<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// null</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">judgeType</span><span class="token punctuation">(</span>s8<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// array</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">judgeType</span><span class="token punctuation">(</span>s9<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// object</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">judgeType</span><span class="token punctuation">(</span>s10<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// date</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">judgeType</span><span class="token punctuation">(</span>s11<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// regexp</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>s3<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "true"  自己原型上的 toString 方法是转成字符串</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br></div></div><ul>
<li>为什么非要调用对象上的 toString 方法（Object.prototype.toString.call()）而不调用自己原型上的 toString（s3.toString() ） 方法呢？</li>
</ul>
<p>因为自己原型上的 toString 方法重写了对象的 toString 方法，自己原型上的 toString 方法用处不一样</p>
</template>