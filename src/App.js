import React, { Component } from 'react';
import './App.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-balham.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modelVisibility: true,
			columnDefs: [
				{
					headerName: 'Make',
					field: 'make',
					sortable: true,
					filter: true,
					checkboxSelection: true,
				},
				{
					headerName: 'Model',
					field: 'model',
					sortable: true,
					filter: true,
				},
				{
					headerName: 'Price',
					field: 'price',
					sortable: true,
					filter: true,
				},
			],
			rowData: [],
		};
	}

	componentDidMount() {
		fetch('https://www.ag-grid.com/example-assets/row-data.json')
			.then((result) => result.json())
			.then((rowData) => this.setState({ rowData }));
	}

	componentDidUpdate() {
		// workaround to stop 'ResizeObserver loop limit exceeded' error from appearing when toggling model column
		window.addEventListener('error', (e) => {
			if (e.message === 'ResizeObserver loop limit exceeded') {
				const resizeObserverErrDiv = document.getElementById(
					'webpack-dev-server-client-overlay-div'
				);
				const resizeObserverErr = document.getElementById(
					'webpack-dev-server-client-overlay'
				);
				if (resizeObserverErr) {
					resizeObserverErr.setAttribute('style', 'display: none');
				}
				if (resizeObserverErrDiv) {
					resizeObserverErrDiv.setAttribute('style', 'display: none');
				}
			}
		});
		this.columnApi.setColumnVisible('model', this.state.modelVisibility);
	}

	onGridReady = (params) => {
		this.gridApi = params.api; // output: GridApi
		this.columnApi = params.columnApi; // output: ColumnApi
	};

	toggleModelColumn = () => {
		this.setState({ modelVisibility: !this.state.modelVisibility });
	};

	onButtonClick = () => {
		const selectedNodes = this.gridApi.getSelectedNodes();
		const selectedData = selectedNodes.map((node) => node.data); // output: array of objects [{make: 'Porsche', model: 'Boxter', price: 72000}, ...]
		const selectedDataString = selectedData
			.map((node) => `${node.make} ${node.price}`)
			.join(', ');
		alert(`Selected nodes: ${selectedDataString}`);
	};

	render() {
		return (
			<div
				className='ag-theme-balham'
				style={{ height: '500px', width: '600px' }}>
				<button type='button' onClick={this.onButtonClick}>
					Seleted rows
				</button>
				<button type='button' onClick={this.toggleModelColumn}>
					Toggle Model Column
				</button>
				<AgGridReact
					onGridReady={this.onGridReady}
					rowSelection='multiple'
					columnDefs={this.state.columnDefs}
					rowData={this.state.rowData}></AgGridReact>
			</div>
		);
	}
}
export default App;
