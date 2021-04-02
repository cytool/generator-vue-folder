// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode')
const { pug, styl } = require('./tpl/vue')
const { transform, types } = require("@babel/core")


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "generator-vue-folder" is now active!')

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('generator-vue-folder.vue', async (e) => {
        // The code you place here will be executed every time your command is executed

        const viewsPath = e.path.match(/.*src/)[0] + '/views/'
        const routerFilePath = e.path.match(/.*src/)[0] + '/router/index.js'
        let userInputValue = await vscode.window.showInputBox({
            ignoreFocusOut: true,
            password: false,
            prompt: '请输入要创建的页面文件夹名称'
        })
        userInputValue = userInputValue.trim()
        if (userInputValue === undefined || userInputValue === '') {
            return
        }
        if (/^(\d|\.|[\u4e00-\u9fa5]|[A-Z]){1,}/gu.test(userInputValue)) {
            return vscode.window.showErrorMessage('文件夹名称不能以数字或者.开头！')
        }

        const pages = await vscode.workspace.fs.readDirectory(vscode.Uri.file(viewsPath))
        const isFolderExist = pages.find(item => item[1] === 2 && item[0] === userInputValue)
        if (isFolderExist) {
            return vscode.window.showErrorMessage('文件夹已存在，请检查！')
        }

        const folderPath = vscode.Uri.file(viewsPath + userInputValue)
        vscode.workspace.fs.createDirectory(folderPath)
        vscode.workspace.fs.writeFile(vscode.Uri.file(viewsPath + userInputValue + '/index.vue'), new Uint8Array(Buffer.from(pug(userInputValue))))
        vscode.workspace.fs.writeFile(vscode.Uri.file(viewsPath + userInputValue + '/index.styl'), new Uint8Array(Buffer.from(styl(userInputValue))))


        // 注入到router.js
        const NAME = userInputValue.replace(/\w/, m => m.toLocaleUpperCase())
        const route = (await vscode.workspace.fs.readFile(vscode.Uri.file(routerFilePath))).toString()
        // const route = fs.readFileSync(routerFilePath).toString()
        // 定义一个 babel 插件，拦截并修改 routes 的数组表达式
        const visitor = {
            // 注入 import XXX from 'XXX'
            Program(path) {
                const bodyPath = path.get('body');
                const hasImport = bodyPath.some(nodePath => {
                    // 判断是否有 import Xxx from 'xxx' 语句
                    if (nodePath.isImportDeclaration()) {
                        return nodePath.get('source').isStringLiteral() && nodePath.get('source').node.value === NAME
                    }
                })

                if (!hasImport) {
                    // @ts-ignore
                    const importDefaultSpecifier = [types.ImportDefaultSpecifier(types.Identifier(NAME))]
                    // @ts-ignore
                    const importDeclaration = types.ImportDeclaration(importDefaultSpecifier, types.StringLiteral('../views/' + userInputValue + '/index.vue'))
                    path.get('body')[0].insertBefore(importDeclaration)
                }
            },

            // routes注入新页面
            ArrayExpression(path) {
                const elements = path.node.elements
                // 新增一个构建出来的 route 对象
                elements.push(types.objectExpression([
                    types.objectProperty(types.identifier('path'), types.stringLiteral('/' + userInputValue)),
                    types.objectProperty(types.identifier('name'), types.stringLiteral(NAME)),
                    types.objectProperty(types.identifier('component'), types.identifier(NAME))
                ]))
            }
        }
        // 通过 plugin 转换源代码 parse 出来的AST 抽象语法树，并且返回结果
        let result = transform(route, {
            plugins: [
                { visitor }
            ]
        });

        // 重新写入文件
        vscode.workspace.fs.writeFile(vscode.Uri.file(routerFilePath), new Uint8Array(Buffer.from(result.code)))
        // fs.writeFileSync(routerFilePath, result.code)
        // vscode.window.showInformationMessage('页面创建成功！')

        // 如果没有eslint, 则没有效果
        vscode.window.createTerminal().sendText(`eslint ${routerFilePath} --fix`)

        // 运行 eslint
        // eslint routerFilePath --fix
    })

    context.subscriptions.push(disposable)
}

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
    activate,
    deactivate
}
