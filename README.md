# pack-info-webpack-plugin
# 用来记录webpack打包时git相关信息

### 展示信息
- git 仓库地址
- git 分支
- git 提交节点信息
- 构建时间
- 构建人信息

> 最终生成 `buildInfo.json` 的文件,位于最终产物的根目录

### Usage
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
  
// 或者
configureWebpack: (config) => {
    ...
    _module.plugins = [
      new PackInfoWebpackPlugin()
    ]
    ...
    return _module
  }

```

### options
```javascript
// 可以配置参数, 排除显示那些字段
new PackInfoWebpackPlugin({
    excludeKeys: ['buildUserEmail'],
    isBase64: true // 是否对结果进行base64编码,避免泄露信息
})

// 全部字段如下:
{
    gitUrl: 'gitUrl', 
    branch: 'branch',
    commitHash: 'commitHash',
    commitAuthor: 'name',
    commitTime: 'date',
    commitMessage: 'message',
    buildTime: '',
    buildUserName: 'buildUserName',
    buildUserEmail: 'buildUserEmail'
}

```
