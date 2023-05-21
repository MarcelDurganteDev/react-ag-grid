import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-balham.css';

class GettingStarted extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// add a modelVisbility property to our state to toggle the visibility of this column by changing a piece of state and then using React's componentDidUpdate lifecycle method to call ag-Grid's Column API.
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

	// call the Column API's setColumnVisible function:
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
		}); // emd
		this.columnApi.setColumnVisible('model', this.state.modelVisibility);
	}

	// extracted our inline function for onGridReady into its method because we'll need to store the instance of both APIs on our class to get both the Column API and the Grid API:
	onGridReady = (params) => {
		this.gridApi = params.api; // output: GridApi
		this.columnApi = params.columnApi; // output: ColumnApi
	};

	// button's click handler calls setState and toggle modelVisibility:
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
				{/* button to toggle the model column visibility: */}
				<button type='button' onClick={this.toggleModelColumn}>
					Toggle Model Column
				</button>
				{/* Modify the use of AgGridReact for extracting previous inline onGridReady function */}
				<AgGridReact
					onGridReady={this.onGridReady}
					rowSelection='multiple'
					columnDefs={this.state.columnDefs}
					rowData={this.state.rowData}></AgGridReact>
			</div>
		);
	}
}
export default GettingStarted;
