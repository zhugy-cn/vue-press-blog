# 开发环境

## vscode 插件

- eslint

* 配置

```json
{
  "editor.tabSize": 2,
  // #每次保存的时候自动格式化
  "eslint.autoFixOnSave": true,
  "eslint.validate": [
    "javascript",
    {
      "language": "vue",
      "autoFix": true
    },
    "html",
    "vue"
  ],
  // 以下为stylus配置
  "stylusSupremacy.insertColons": false, // 是否插入冒号
  "stylusSupremacy.insertSemicolons": false, // 是否插入分好
  "stylusSupremacy.insertBraces": false, // 是否插入大括号
  "stylusSupremacy.insertNewLineAroundImports": false, // import之后是否换行
  "stylusSupremacy.insertNewLineAroundBlocks": false,
  "git.autofetch": true,

  // 格式化
  "window.zoomLevel": 0,
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "cssrem.rootFontSize": 37.5,
  "java.configuration.checkProjectSettingsExclusions": false,
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "workbench.iconTheme": "material-icon-theme" // 两个选择器中是否换行
}
```

- 参考
  [VScode 格式化 ESlint](https://www.cnblogs.com/benbentu/p/9661998.html)
