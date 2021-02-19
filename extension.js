// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode')
const { pug, styl } = require('./tpl/vue')

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
        let userInputValue = await vscode.window.showInputBox({
            ignoreFocusOut: true,
            password: false,
            prompt: '请输入要创建的页面文件夹名称'
        })
        userInputValue = userInputValue.trim()
        if (userInputValue === undefined || userInputValue === '') {
            return
        }
        if (/^(\d|\.){1,}/igu.test(userInputValue)) {
            return vscode.window.showErrorMessage('文件夹名称不能以数字或者.开头！')
        }

        const pages = await vscode.workspace.fs.readDirectory(vscode.Uri.file(viewsPath))
        const isFolderExist = pages.find(item => item[1] === 2 && item[0] === userInputValue)
        if (isFolderExist) {
            return vscode.window.showErrorMessage('文件夹已存在，请检查！')
        }

        const folderPath = vscode.Uri.file(viewsPath + userInputValue)
        vscode.workspace.fs.createDirectory(folderPath)
        vscode.workspace.fs.writeFile(vscode.Uri.file(viewsPath + userInputValue + '/index.vue'), new Uint8Array(Buffer.from(pug)))
        vscode.workspace.fs.writeFile(vscode.Uri.file(viewsPath + userInputValue + '/index.styl'), new Uint8Array(Buffer.from(styl)))
        // vscode.window.showInformationMessage('页面创建成功！')
    })

    context.subscriptions.push(disposable)
}

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
    activate,
    deactivate
}
