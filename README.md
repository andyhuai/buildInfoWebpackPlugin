# pack-info-webpack-plugin
# 用来记录webpack打包时git相关信息

### 展示信息
- git 仓库地址
- git 分支
- git 提交节点信息
- 打包时间
- 打包人员信息

> 最终生成 `buildInfo.json` 的文件,位于最终产物的根目录

### 使用方法
```
npm i pack-info-webpack-plugin -D

// 在webpack config中配置插件

const PackInfoWebpackPlugin = require('pack-info-webpack-plugin')

configureWebpack: {
    ...
    plugins: [
      new PackInfoWebpackPlugin()
    ]
    ...
  }

```
