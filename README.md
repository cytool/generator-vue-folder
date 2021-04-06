## 自动生成vue页面目录

![](https://img.shields.io/badge/version-0.0.4-brightgreen) 

基于 [cytool/vue-template](https://github.com/cytool/vue-template) 工程模板结构而创建的`Vscode插件`，用于 __快速创建__ 符合`cytool/vue-template`工程结构要求的 __Vue页面__。

> 在`cytool/vue-template`关于页面的要求为: __一个页面一个文件夹，且样式文件需要独立为文件__。因此一层层展开文件夹、一次次新建文件(夹)、写入同样的一些Vue默认写法...会很崩溃。

-------
### 安装

1. [下载最新版插件generator-vue-folder-0.0.?.visx](https://github.com/cytool/generator-vue-folder/releases/latest)

2. 安装: 切换到扩展（extensions, 快捷键ctrl + shift + x） => 扩展窗口右上角 ... => 从VSIX安装（install from VSIX）

    ![](https://user-images.githubusercontent.com/2832873/109098713-bdcda680-775c-11eb-8093-ce9175904981.png) 

------
### 使用

- #### 快速创建目录:

    在Vue项目`src/` __右键__ 然后选择 `CYTOOL - 快速生成VUE页面目录`，输入文件夹名（如: folderName）即可。

    ```yaml
    src/views/
        folderName/ #自动生成的文件夹
            index.vue #自动生成的文件
            index.styl #自动生成的文件

    src/router/
        index.js #自动修改此文件
    ```

- #### 代码提示（自动生成新建Vue的模板文件内容）:

    在`.vue`页面中输入 `vt` 然后按`tab键`，即可快速自动生成Vue模板文件内容.

------
### Todo

- [ ] 提供配置文件、用于配置生成的Vue形状（是否需要采用 文件夹 形式而是直接在 src/ 下创建等 ?
- [ ] 匹配 router 配置（非固定路径 src/router/index.js 可以是 src/route[r].js 等 ？

------
### 已知BUG

- 修改`router`文件后不符合Eslint规则

------
### 参考

- [Vscode开发教程 - VSCode插件开发](https://juejin.cn/post/6884964643400318983)
- [router文件注入教程 - 注入import](https://github.com/axuebin/babel-inject-dep-demo)
- [router文件注入教程 - babel 修改抽象语法树——入门与实践](https://www.jianshu.com/p/3c495dcbed49)
- [相关API - window](https://code.visualstudio.com/api/references/vscode-api#window)
- [相关API - when clause contexts](https://code.visualstudio.com/api/references/when-clause-contexts)

------

### 其他

- publisher code => `m75pghitoue7b7tkcmdj5hq7ebqmok3igtlidqdihsk2ofr23x6q`
- 打包命令 => `vsce package`
 



