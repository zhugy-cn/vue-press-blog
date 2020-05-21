# 组件的执行
- 组件默认值的问题: 新增节点时 -> propsMapConfig -> 组件内部 default 默认值
- options 循环增加 options 字段,不直接使用 canvasData 的原因 
  因为有的组件 options 可能只包含部分 props(表格), 而 `canvasData` 里面则包含全部的 `props`


## 添加组件,从 `resource` 拖动到 `canvas` 
::: tip 开始拖动
1. 执行 `resource` 的 `dragstart` 事件，将当前组件信息保存在 `event.dataTransfer` 中。<br>
`handleDragStart`<br>

:::

::: tip 拖动结束
1. 执行 `canvas` 的 `drop` 事件，取出当前的组件信息。<br>
`handleDropOnCanvas`<br>

2. 弹出表单获取组件的初始化数据(`props`)。

3. 将`event.dataTransfer`、`鼠标位置`、`表单输入` 合并生成 `节点信息`，将节点添加进 `canvas`。<br>
`onFormConfirm`<br>
  表单输入生成 `props`<br>
  鼠标位置生成 `样式`<br>
  `event.dataTransfer`生成 组件信息<br>

  更新 `canvasData` 和 `nodeInfo` : `updateCanvasData`<br>
  初始化 `options`: `initOptions`<br>

:::


## 修改配置项, `props`
- 更新问题,`canvasData`节点的`props`和`propsMap`里面的数据是同步更新的。
`canvasData`负责`canvas`画布区域的更新,`propsMap`则负责右侧配置项的更新,
有时候可能右侧更新画布不更新(比如宽度应该是失去焦点更新),所以应该用两个字段分别保存.

::: tip 更新右侧配置项
1. 改变右侧,右侧配置项的值绑定的是 options[key] 里面 $attrs 的 value,所以右侧需要改变 options <br>
`handleChangeInput、setOptions`<br>

2. 改变 canvas ,将 options[key] 里面 $attrs 的 value(最新的值) 取出来覆盖 nodeInfo 的 props <br>
`overwriteNodeInfoByOptions、updateCanvasData`<br>

:::
 
