# backbar

头部后退条

> 依赖 `el-row` 和 `el-col`

## 用法
```html
<ei-backbar
  :fixed="true"
  :height="55"
  icon-color="red"
  background-color="black"
  @go-back="onGoback"
/>
```


## Attributes

| 参数             | 说明                | 类型    | 可选值 | 默认值  |
|:-----------------|:--------------------|:--------|:-------|:--------|
| fixed            | 是否使用 fixed 定位 | Boolean | --     | false   |
| height           | 高度                | Number  | --     | 44      |
| icon-color       | 图标颜色            | String  | --     | #FFFFFF |
| background-color | 背景颜色            | String  | --     | #409EFF |


## Events
| 事件名称 | 说明               | 回调参数 |
|:---------|:-------------------|:---------|
| go-back  | 点击后退图标和文件 | --       |





