import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Customers from './components/customers/Customers';
import Overview from './components/overview/Overview';
import Sidebar from './components/sidebar/Sidebar';
import { fetchCustomers } from './features/customers/customerSlice';
import { fetchTransactions } from './features/transactions/transactionSlice';
const App = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchCustomers());
		dispatch(fetchTransactions());
	}, []);
	return (
		<BrowserRouter>
			<div className='app'>
				<Sidebar />
				<main>
					<Routes>
						<Route index path='/' element={<Overview />} />

						<Route path='/customers' element={<Customers />} />
					</Routes>
				</main>
			</div>
		</BrowserRouter>
	);
};

export default App;
