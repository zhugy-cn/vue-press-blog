<template><h1 id="发展历史"><a class="header-anchor" href="#发展历史">#</a> 发展历史</h1>
<!-- ECMA-262 就是一套标准的文档，文档里面将实现了这种标准的语言叫做 ECMAScript，JavaScript 实现了这种标准。ECMA-262 第9版，被称为ES9 -->
<h2 id="名词解释"><a class="header-anchor" href="#名词解释">#</a> 名词解释</h2>
<ul>
<li>
<p>Ecma 国际：是一家国际性会员制度的信息和电信标准组织（前身为欧洲计算机制造商协会），负责指定一些语言的标准。</p>
</li>
<li>
<p>TC39：ESMA 国际的第 39 号技术专家委员会，制定了 ECMA-262 标准。</p>
</li>
<li>
<p>ECMA-262：由 TC39 打造出来的一套标准规范，定义了：语法、类型、语句、关键字、保留字等等，规范标准中将这门语言称为 ECMAScript。</p>
</li>
<li>
<p>ECMAScript：在标准 ECMA-262 中定义的脚本语言规范，ECMA-262(标准) -&gt; ECMAScript(语言描述) -&gt; JavaScript(实现)。</p>
</li>
</ul>
<ul>
<li>
<p>DOM：文档对象模型(Document Object Model)，提供与网页内容交互的方法和接口，DOM 将 HTML 页面映射为由节点构成的树状结构，通过 DOM 提供的 API，使我们可以轻松的对节点进行增删改查，从而改变页面的内容和结构。</p>
</li>
<li>
<p>BOM：浏览器对象模型（Browser Object Model），提供与浏览器交互的方法和接口，通过 BOM 提供的 API，开发者可以访问和操作浏览器的窗口。</p>
</li>
</ul>
<h2 id="语言组成"><a class="header-anchor" href="#语言组成">#</a> 语言组成</h2>
<ul>
<li>
<p>ECMAScript（核心）：描述了该语言的语法和基本对象。</p>
</li>
<li>
<p>文档对象模型（DOM）：描述处理网页内容的方法和接口。</p>
</li>
<li>
<p>浏览器对象模型（BOM）：描述与浏览器进行交互的方法和接口。</p>
</li>
<li>
<p>ECMAScript（ES）历史版本</p>
<table>
<thead>
<tr>
<th style="text-align:left">时间</th>
<th style="text-align:left">版本</th>
<th style="text-align:left">说明</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">1997 年 06 月</td>
<td style="text-align:left">ES1.0 发布</td>
<td style="text-align:left">当年 7 月，ECMA-262 标准出台</td>
</tr>
<tr>
<td style="text-align:left">1998 年 06 月</td>
<td style="text-align:left">ES2.0 发布</td>
<td style="text-align:left">该版本修改完全符合 ISO/IEC-16262 国际标准。</td>
</tr>
<tr>
<td style="text-align:left">1999 年 12 月</td>
<td style="text-align:left">ES3.0 发布</td>
<td style="text-align:left">成为 JavaScript 的通行标准，得到了广泛支持</td>
</tr>
<tr>
<td style="text-align:left">2007 年 10 月</td>
<td style="text-align:left">ES4.0 草案发布</td>
<td style="text-align:left">各大厂商意见分歧，该方案未通过</td>
</tr>
<tr>
<td style="text-align:left">2008 年 07 月</td>
<td style="text-align:left">发布 ES3.1，并改名为 ECMAScript 5</td>
<td style="text-align:left">废除 ECMAScript 4.0，所以 4.0 版本不存在</td>
</tr>
<tr>
<td style="text-align:left">2009 年 12 月</td>
<td style="text-align:left">ES5.0 正式发布</td>
<td style="text-align:left"></td>
</tr>
<tr>
<td style="text-align:left">2011 年 06 月</td>
<td style="text-align:left">ES5.1 发布</td>
<td style="text-align:left">该版本成为了 ISO 国际标准（ISO/IEC 16262:2011）</td>
</tr>
<tr>
<td style="text-align:left">2013 年 12 月</td>
<td style="text-align:left">ES6 草案发布</td>
<td style="text-align:left"></td>
</tr>
<tr>
<td style="text-align:left">2015 年 06 月</td>
<td style="text-align:left"><strong>ES6 正式发布，并且更名为“ES 2015”</strong></td>
<td style="text-align:left">TC39 委员会决定每年发布一个 ECMAScript 的版本</td>
</tr>
<tr>
<td style="text-align:left">2016 年 06 月</td>
<td style="text-align:left">ES7 发布，又名“ES 2016”</td>
<td style="text-align:left"></td>
</tr>
<tr>
<td style="text-align:left">2017 年 06 月</td>
<td style="text-align:left">ES8 发布，又名“ES 2017”</td>
<td style="text-align:left"></td>
</tr>
<tr>
<td style="text-align:left">2018 年 06 月</td>
<td style="text-align:left">ES9 发布，又名“ES 2018”</td>
<td style="text-align:left"></td>
</tr>
<tr>
<td style="text-align:left">2019 年 06 月</td>
<td style="text-align:left">ES10 发布，又名“ES 2019”</td>
<td style="text-align:left"></td>
</tr>
</tbody>
</table>
</li>
</ul>
<h2 id="语言特点"><a class="header-anchor" href="#语言特点">#</a> 语言特点</h2>
<ul>
<li>脚本语言：JavaScript 是一种解释型的脚本语言。</li>
<li>基于对象：JavaScript 是一种基于对象的脚本语言，它不仅可以创建对象，也能使用现有的对象。</li>
</ul>
</template>