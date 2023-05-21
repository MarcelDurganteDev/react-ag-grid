import React, { useState } from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-balham.css';

import GettingStarted from './../src/Components/GettingStarted/GettingStarted.js';
import Data from './../src/Components/Data/Data.js';
// import Infinite from './src/Components/Infinite/Infinite.js';
// import Redux from './src/Components/Redux/Redux.js';
import './App.css';

const App = () => {
	const [currentPage, setCurrentPage] = useState(null);

	const renderPage = () => {
		switch (currentPage) {
			case 'Getting Started':
				return <GettingStarted />;
			case 'Data':
				return <Data />;
			default:
				return null;
		}
	};

	return (
		<div>
			<button onClick={() => setCurrentPage('Getting Started')}>
				Getting Started
			</button>
			<button onClick={() => setCurrentPage('Data')}>Data</button>
			<button onClick={() => setCurrentPage('Infinite')}>Infinite</button>
			<button onClick={() => setCurrentPage('Redux')}>Redux</button>
			{renderPage()}
		</div>
	);
};

export default App;
