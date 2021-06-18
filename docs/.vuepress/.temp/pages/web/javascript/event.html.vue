<template><h1 id="dom事件"><a class="header-anchor" href="#dom事件">#</a> DOM事件</h1>
<h2 id="dom-事件的级别"><a class="header-anchor" href="#dom-事件的级别">#</a> DOM 事件的级别</h2>
<h3 id="dom0-级"><a class="header-anchor" href="#dom0-级">#</a> DOM0 级</h3>
<ul>
<li>写法：<code>element.onclick=function(){}</code>或者或者<code>element.onclick=btnclick</code>是一种比较传统的方式，把一个函数(或者匿名函数)赋值给一个事件的处理程序属性</li>
<li>优点：简单，跨浏览器的优势（兼容所有浏览器）。</li>
<li>缺点：不能给元素添加多个事件处理程序，只能添加一个，如果添加多个事件处理程序，后面的会覆盖前面的。</li>
<li>删除事件：<code>element.onclick=null</code>;</li>
</ul>
<h3 id="dom1-级"><a class="header-anchor" href="#dom1-级">#</a> DOM1 级</h3>
<ul>
<li>DOM1 级主要隐射文档没有事件，没有设计跟事件相关的东西，所以跳过，但是 DOM1 级标准还是存在</li>
</ul>
<h3 id="dom2-级"><a class="header-anchor" href="#dom2-级">#</a> DOM2 级</h3>
<ul>
<li>写法：<code>element.addEventListener('click',function(){},false)</code>false 为默认值，代表支持冒泡</li>
<li>优点，可以给元素添加多个事件处理程序，这些事件处理程序按照他们的顺序执行。</li>
<li>删除事件：<code>element.removeEventListener('click',function(){},false)</code></li>
</ul>
<h3 id="dom3-级"><a class="header-anchor" href="#dom3-级">#</a> DOM3 级</h3>
<ul>
<li>写法：跟 DOM2 级一样，就是增加了许多事件类型，包括鼠标事件，键盘事件</li>
</ul>
<h2 id="事件模型"><a class="header-anchor" href="#事件模型">#</a> 事件模型</h2>
<p><img src="@source/web/javascript/images/event_01.png" alt="inheritAttrs: true"></p>
<ul>
<li>包括捕获和冒泡（ie 用的是事件冒泡）</li>
<li>捕获是从上往下到达目标元素</li>
<li>冒泡是从当前元素，也就是目标元素往上到 window。是两个过程</li>
</ul>
<h2 id="事件流"><a class="header-anchor" href="#事件流">#</a> 事件流</h2>
<p><img src="@source/web/javascript/images/event_02.png" alt="inheritAttrs: true"></p>
<ul>
<li>
<p>浏览器在为这个当前页面与用户做交互的过程中，比如我点击了这个鼠标左键，这个左键是怎么传到页面上，还有怎么响应的。</p>
</li>
<li>
<p>事件流分三个阶段，</p>
<ol>
<li>第一阶段是捕获</li>
<li>第二阶段是目标阶段：比如点击的这个按钮，这个按钮就是目标阶段，事件通过捕获到达目标元素，就到达了目标阶段</li>
<li>第三个阶段是冒泡阶段：从目标元素再上传到 window 对象，就是冒泡的过程</li>
</ol>
</li>
</ul>
<h2 id="dom-事件捕获冒泡的具体流程"><a class="header-anchor" href="#dom-事件捕获冒泡的具体流程">#</a> DOM 事件捕获冒泡的具体流程</h2>
<p><img src="@source/web/javascript/images/event_03.png" alt="inheritAttrs: true"></p>
<ul>
<li>
<p>事件捕获：捕获是从上到下</p>
<ol>
<li>第一个真正接收的是 window（对象）</li>
<li>第二个接收的是 document（对象）</li>
<li>第三个接收的是 html 标签（获取 html 标签 document.documentElement）</li>
<li>第四个接收的是 body（document.body）</li>
<li>剩下的就是按照普通的 html 结构一层一层往下传，最后到达目标元素</li>
</ol>
</li>
<li>
<p>事件冒泡：捕获是从下到上</p>
<ol>
<li>第一个接收的是目标元素</li>
<li>第二个接收的是父级，按照 html 结构一层一层往上传</li>
<li>然后接收的是 body 标签 —&gt; html 标签 —&gt; document 对象</li>
<li>最后一个接收的是 window 对象。</li>
</ol>
</li>
</ul>
<h2 id="event-事件对象"><a class="header-anchor" href="#event-事件对象">#</a> Event 事件对象</h2>
<ul>
<li>在触发 DOM 上的事件时都会产生一个对象，这个就是事件对象 Event</li>
<li>Event 对象常用应用
<ul>
<li><code>event.preventDefaulta()</code>阻止默认事件</li>
<li><code>event.stopPropagetion()</code>阻止冒泡</li>
<li><code>event.stopImmediatePropagation()</code>当一个元素绑定多个事件处理程序的时候，事件会按照顺序全部执行，如果不想让后面的事件处理程序执行，就在当前事件里加这个方法，后面的事件处理程序就不会执行了。</li>
<li><code>event.currentTarget</code>获取绑定事件的元素</li>
<li><code>event.target</code>获取触发事件的元素</li>
<li><code>event.target.nodeName</code>获取触发事件元素的名字，如 P(大写)</li>
<li><code>event.type</code>获取绑定的事件类型，比如 click，mouseover 等</li>
</ul>
</li>
</ul>
<h2 id="自定义事件"><a class="header-anchor" href="#自定义事件">#</a> 自定义事件</h2>
<ul>
<li>所谓自定义事件，就是有别于带有浏览器特定行为的事件（类似 click、mouseover、submit、keydown），事件名称可以随意定义，可以通过特定的方法进行添加、触发以及删除。</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> eve<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">Event</span><span class="token punctuation">(</span><span class="token string">'custome'</span><span class="token punctuation">)</span> <span class="token comment">// 自定义事件</span>
<span class="token keyword">var</span> dom<span class="token operator">=</span>document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'id'</span><span class="token punctuation">)</span>  <span class="token comment">// 获取DOM元素</span>
dom<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'custome'</span><span class="token punctuation">,</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>   <span class="token comment">// 绑定事件</span>
dom<span class="token punctuation">.</span><span class="token function">dispatchEvent</span><span class="token punctuation">(</span>eve<span class="token punctuation">)</span>  <span class="token comment">// 触发事件</span>

CustomEvent：也可以自定义事件，还可以自定义参数
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h2 id="代码演示"><a class="header-anchor" href="#代码演示">#</a> 代码演示</h2>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span>
  <span class="token string">"click"</span><span class="token punctuation">,</span>
  <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"window - 绑定事件触发"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token boolean">false</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

document<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span>
  <span class="token string">"click"</span><span class="token punctuation">,</span>
  <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"document - 绑定事件触发"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token boolean">false</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

document<span class="token punctuation">.</span>documentElement<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span>
  <span class="token string">"click"</span><span class="token punctuation">,</span>
  <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"html - 绑定事件触发"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token boolean">false</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span>
  <span class="token string">"click"</span><span class="token punctuation">,</span>
  <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"body - 绑定事件触发"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token boolean">false</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"wrap"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span>
  <span class="token string">"click"</span><span class="token punctuation">,</span>
  <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"父级 wrap - 绑定事件触发"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token boolean">false</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"box"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span>
  <span class="token string">"click"</span><span class="token punctuation">,</span>
  <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"box - 绑定事件触发"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token boolean">false</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br></div></div><ul>
<li>
<p>设为 false(默认)表示支持冒泡，依次打印的顺序是:<br>
<code>box - wrap - body - html - document - window</code></p>
</li>
<li>
<p>设为 true 后表示支持捕获，依次打印的是相反的：<br>
<code>window - document - html - body - wrap - box</code></p>
</li>
<li>
<p>如果每个元素绑定两个事件，即支持捕获，又支持冒泡，那么捕获后冒泡打印的顺序：<br>
<code>window - document - html - body - wrap - box - box - wrap - body - html - document - window</code></p>
</li>
</ul>
</template>