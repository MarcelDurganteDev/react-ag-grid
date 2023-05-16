import React, { Component } from 'react';
import './App.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-balham.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
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

	render() {
		return (
			<div
				className='ag-theme-balham'
				style={{ height: '500px', width: '600px' }}>
				<AgGridReact
					rowSelection='multiple'
					columnDefs={this.state.columnDefs}
					rowData={this.state.rowData}></AgGridReact>
			</div>
		);
	}
}
export default App;
