<template><h1 id="组件的执行"><a class="header-anchor" href="#组件的执行">#</a> 组件的执行</h1>
<ul>
<li>组件默认值的问题: 新增节点时 -&gt; propsMapConfig -&gt; 组件内部 default 默认值</li>
<li>options 循环增加 options 字段,不直接使用 canvasData 的原因
因为有的组件 options 可能只包含部分 props(表格), 而 <code>canvasData</code> 里面则包含全部的 <code>props</code></li>
</ul>
<h2 id="添加组件-从-resource-拖动到-canvas"><a class="header-anchor" href="#添加组件-从-resource-拖动到-canvas">#</a> 添加组件,从 <code>resource</code> 拖动到 <code>canvas</code></h2>
<div class="custom-container tip"><p class="custom-container-title">开始拖动</p>
<ol>
<li>执行 <code>resource</code> 的 <code>dragstart</code> 事件，将当前组件信息保存在 <code>event.dataTransfer</code> 中。<br>
<code>handleDragStart</code><br></li>
</ol>
</div>
<div class="custom-container tip"><p class="custom-container-title">拖动结束</p>
<ol>
<li>
<p>执行 <code>canvas</code> 的 <code>drop</code> 事件，取出当前的组件信息。<br>
<code>handleDropOnCanvas</code><br></p>
</li>
<li>
<p>弹出表单获取组件的初始化数据(<code>props</code>)。</p>
</li>
<li>
<p>将<code>event.dataTransfer</code>、<code>鼠标位置</code>、<code>表单输入</code> 合并生成 <code>节点信息</code>，将节点添加进 <code>canvas</code>。<br>
<code>onFormConfirm</code><br>
表单输入生成 <code>props</code><br>
鼠标位置生成 <code>样式</code><br>
<code>event.dataTransfer</code>生成 组件信息<br></p>
</li>
</ol>
<p>更新 <code>canvasData</code> 和 <code>nodeInfo</code> : <code>updateCanvasData</code><br>
初始化 <code>options</code>: <code>initOptions</code><br></p>
</div>
<h2 id="修改配置项-props"><a class="header-anchor" href="#修改配置项-props">#</a> 修改配置项, <code>props</code></h2>
<ul>
<li>更新问题,<code>canvasData</code>节点的<code>props</code>和<code>propsMap</code>里面的数据是同步更新的。
<code>canvasData</code>负责<code>canvas</code>画布区域的更新,<code>propsMap</code>则负责右侧配置项的更新,
有时候可能右侧更新画布不更新(比如宽度应该是失去焦点更新),所以应该用两个字段分别保存.</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">更新右侧配置项</p>
<ol>
<li>
<p>改变右侧,右侧配置项的值绑定的是 options[key] 里面 $attrs 的 value,所以右侧需要改变 options <br>
<code>handleChangeInput、setOptions</code><br></p>
</li>
<li>
<p>改变 canvas ,将 options[key] 里面 $attrs 的 value(最新的值) 取出来覆盖 nodeInfo 的 props <br>
<code>overwriteNodeInfoByOptions、updateCanvasData</code><br></p>
</li>
</ol>
</div>
</template>