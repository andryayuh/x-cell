const fs = require('fs');
const TableModel = require('../table-model');
const TableView = require('../table-view');

describe('table-view', () => {
	
	beforeEach(() => {
		// load html skeleton from disk and parse into the dom
		const fixturePath = './client/js/test/fixtures/sheet-containter.html';
		const html = fs.readFileSync(fixturePath, 'utf8');
		document.documentElement.innerHTML = html;
	});

	describe('formula bar', () => {
		it('makes changes TO the value of the current cell', () => {
			//set up init
			const model = new TableModel(3, 3);
			const view = new TableView(model);
			view.init();

			// inspect init state
			let trs = document.querySelectorAll('TBODY TR');
			let td = trs[0].cells[0];
			expect(td.textContent).toBe('');

			// simulate user action
			document.querySelector('#formula-bar').value = '65';
			view.handleFormulaBarChange();

			//inspect resulting state
			trs = document.querySelectorAll('TBODY TR');
			expect(trs[0].cells[0].textContent).toBe('65');
		});

		it('updates FROM the value of the current cell', () => {
			// set up initial state
			const model = new TableModel(3, 3);
			const view = new TableView(model);
			model.setValue({col: 2, row: 1}, '123');
			view.init();

			//inspect init state
			const formulaBarEl = document.querySelector('#formula-bar');
			expect(formulaBarEl.value).toBe('');

			// simulate user action
			const trs = document.querySelectorAll('TBODY TR');
			trs[1].cells[2].click();

			// inspect the resulting state
			expect(formulaBarEl.value).toBe('123')
		});
	});

	describe('table body', () => {
		it('highlights the current cell when clicked', () => {
			// set up initi state
			const model = new TableModel(10, 5);
			const view = new TableView(model);
			view.init();

			// inspect init
			let trs = document.querySelectorAll('TBODY TR');
			let td = trs[2].cells[3];
			expect(td.className).toBe('');

			// simulate user action
			td.click();

			// inspect resulting state
			trs = document.querySelectorAll('TBODY TR')
			td = trs[2].cells[3];
			expect(td.className).not.toBe('');
			});

			it('has the right size', () => {
			// set up initial state
			const numCols = 6;
			const numRows = 10;
			const model = new TableModel(numCols, numRows);
			const view = new TableView(model);
			view.init();

			//inspect initial state
			let ths = document.querySelectorAll('THEAD TH');
			expect(ths.length).toBe(numCols);
		});

		it('fills in values from the model', () => {
			//set up init
			const model = new TableModel(3, 3);
			const view = new TableView(model);
			model.setValue({col: 2, row: 1}, '123');
			view.init()

			//inspect init
			const trs = document.querySelectorAll('TBODY TR');
			expect(trs[1].cells[2].textContent).toBe('123');
		});
	});

	describe('table header', () => {
		it('has valid column header labels', () => {
			// set up initial state
			const numCols = 6;
			const numRows = 10;
			const model = new TableModel(numCols, numRows);
			const view = new TableView(model);
			view.init();

			// inspect initial state
			let ths = document.querySelectorAll('THEAD TH');
			expect(ths.length).toBe(numCols);

			let labelTexts = Array.from(ths).map(el => el.textContent);
			expect(labelTexts).toEqual(['A', 'B', 'C', 'D', 'E', 'F']);
		});
	});
});