## 自动生成vue页面目录

基于vue的标准页面组织方式为 ./src/views/[pageFolder]/index.vue + index.styl。 因此此插件是为了解决新建一个页面需要手动创建对应页面文件夹及文件及初始化文件内容而开发的插件。

vue项目的目录结构为`src/views`, 因此生成后的文件夹为`src/views/[pageFolder]`, 最终生成`./src/views/[pageFolder]/index.vue + index.styl`

### 安装

切换到扩展（extensions, 快捷键ctrl + shift + x） => 插件窗口右上角 ... => 从VSIX安装（install from VSIX）


### 使用 - 快速创建页面目录

在vue项目`src(含)下`右键选择`CYTOOL - 快速生成VUE页面目录`，输入文件夹名即可。


### 使用 - 代码提示（自动生成新建vue的模板文件内容

在 .vue 页面中输入 `vt` tab键后，即可生成vue模板文件内容




### 教程 - 创建vscode插件

[VSCode插件开发](https://juejin.cn/post/6884964643400318983)


publisher code => `m75pghitoue7b7tkcmdj5hq7ebqmok3igtlidqdihsk2ofr23x6q`