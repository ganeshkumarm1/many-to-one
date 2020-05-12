const assert = require('assert');

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
const vscode = require('vscode');
const manyToOne = require('../../extension');

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Convert multiple spaces to single space', () => {
		let inputText = 'Remove multiple     spaces and   convert it to    single space';
		
		let expectedResult = 'Remove multiple spaces and convert it to single space';
		let acutalResult = manyToOne.convertMultipleSpacesToSingleSpace(inputText);
		assert.equal(acutalResult, expectedResult);
	});

	test('Remove leading and trailing spaces', () => {
		let inputText = 'Remove multiple     spaces and   convert it to    single space  \n  Remove leading and trailing spaces  ';
		inputText = manyToOne.convertMultipleSpacesToSingleSpace(inputText);
		
		let expectedResult = 'Remove multiple spaces and convert it to single space\nRemove leading and trailing spaces';
		let acutalResult = manyToOne.removeLeadingAndTrailingSpaces(inputText);

		assert.equal(acutalResult, expectedResult);
	});
});
