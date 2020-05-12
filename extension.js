// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

function removeLeadingAndTrailingSpaces(text) {
  let lines = text.split('\n');
  let result = '';

  for(let i = 0; i < lines.length; i ++) {
    let lineText = lines[i]
    lineText = lineText.trim();
    result += lineText + '\n';
  }

  return result.substring(0, result.length - 1);
}


function convertMultipleSpacesToSingleSpace(text) {
  return text.replace(/ {1,}/g, " ");
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "many-to-one" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('many-to-one.run', function () {
		// The code you place here will be executed every time your command is executed
	
		var editor = vscode.window.activeTextEditor;

		if(editor) {
			let document = editor.document;
  
			let lineCount = document.lineCount;
			lineCount -= 1;			
			
			editor.edit(editBuilder => {			
        let text = document.getText();
				text = convertMultipleSpacesToSingleSpace(text);
        text = removeLeadingAndTrailingSpaces(text);

        editBuilder.replace(
          new vscode.Selection(
            new vscode.Position(0, 0), 
            new vscode.Position(lineCount, document.lineAt(lineCount).text.length)
          ), 
          text
        );
      
			}).then(() => {
        vscode.window.showInformationMessage('Success');
        editor.selection.active = editor.selection.anchor;
			}, () => {
				vscode.window.showErrorMessage('Error removing spaces');
			});
		}
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
  deactivate,
  convertMultipleSpacesToSingleSpace,
  removeLeadingAndTrailingSpaces,
}
