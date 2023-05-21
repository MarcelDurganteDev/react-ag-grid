import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-balham.css';
import data from './data.json';

class Data extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modelVisibility: true,
			columnDefs: [
				{ headerName: 'Name', field: 'name' },
				{ headerName: 'Street', field: 'address.street1' },
				{ headerName: 'City', field: 'address.city' },
			],
			defaultColDef: {
				resizable: true,
				sortable: true,
				filter: true,
			},
			rowData: [],
		};
	}

	componentDidMount() {
		this.setState({ rowData: data.customers.map((customer) => customer) });
	}

	onGridReady = (params) => {
		this.gridApi = params.api;
		this.columnApi = params.columnApi;
		this.gridApi.sizeColumnsToFit();
		console.log(this.state.rowData);
	};

	render() {
		return (
			<div className='ag-theme-balham' style={{ height: '800px' }}>
				<AgGridReact
					onGridReady={this.onGridReady}
					columnDefs={this.state.columnDefs}
					rowData={this.state.rowData}
					defaultColDef={this.state.defaultColDef}></AgGridReact>
			</div>
		);
	}
}

export default Data;
