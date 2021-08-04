<template><h1 id="html-中的-javascript"><a class="header-anchor" href="#html-中的-javascript">#</a> HTML 中的 Javascript</h1>
<h2 id="script-标签属性"><a class="header-anchor" href="#script-标签属性">#</a> script 标签属性</h2>
<ol>
<li>async：异步执行脚本。表示立即开始下载脚本，但不能阻止其它页面动作，比如下载资源或等待其它脚本加载。只对外部脚本文件有效。</li>
<li>charset：字符集。</li>
<li>crossorigin：CORS（跨源资源共享）设置,默认不使用 CORS。</li>
<li>defer：推迟执行脚本。脚本可以延迟到文档完全被解析和显示后再执行。外部脚本有效。</li>
<li>integrity：接收到的资源和指定的加密签名验证。</li>
<li>language：废弃。</li>
<li>src：包含要执行的外部文件。</li>
<li>type：代替 language，表示脚本的语言类型。text/javascript。</li>
</ol>
<h2 id="推迟执行脚本"><a class="header-anchor" href="#推迟执行脚本">#</a> 推迟执行脚本</h2>
<ul>
<li>给<code>&lt;script&gt;</code>标签加<code>defer</code>属性，表示告诉浏览器立即下载，但延迟执行。</li>
</ul>
</template>