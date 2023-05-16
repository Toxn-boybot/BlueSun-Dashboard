import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './customers.css';
import { FaSort } from 'react-icons/fa';
import Head from '../head/Head';
function Customers() {
	const transactions = useSelector((state) => state.transaction.transactions);
	const customers = useSelector((state) => state.customer.customers);

	const [sortColumn, setSortColumn] = useState(null);
	const [filterName, setFilterName] = useState('');
	const [filterAmount, setFilterAmount] = useState('');

	console.log('1', transactions);
	console.log('2', [...transactions]);
	const sortedTransactions = sortColumn
		? [...transactions].sort((a, b) => {
				if (a[sortColumn] < b[sortColumn]) return -1;
				if (a[sortColumn] > b[sortColumn]) return 1;
				return 0;
		  })
		: transactions;

	const filteredTransactions = sortedTransactions.filter((transaction) => {
		const customer = customers.find((c) => c.id === transaction.customer_id);
		const nameMatch =
			customer.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1;
		const amountMatch =
			filterAmount === '' || transaction.amount === parseInt(filterAmount, 10);
		return nameMatch && amountMatch;
	});

	return (
		<>
			<Head name={'Customers'}/>
			<div className='table-container'>
				<input
					type='text'
					placeholder='Filter by customer name'
					value={filterName}
					onChange={(e) => setFilterName(e.target.value)}
				/>
				<span>OR</span>
				<input
					type='text'
					placeholder='Filter by transaction amount'
					value={filterAmount}
					onChange={(e) => setFilterAmount(e.target.value)}
				/>
				<table>
					<thead>
						<tr>
							<th onClick={() => setSortColumn('id')}>
								ID
								<span className='head-icon'>
									<FaSort />
								</span>
							</th>
							<th onClick={() => setSortColumn('name')}>
								Name
								<span className='head-icon'>
									<FaSort />
								</span>
							</th>
							<th onClick={() => setSortColumn('date')}>
								Date
								<span className='head-icon'>
									<FaSort />
								</span>
							</th>
							<th onClick={() => setSortColumn('amount')}>
								Amount
								<span className='head-icon'>
									<FaSort />
								</span>
							</th>
						</tr>
					</thead>
					<tbody>
						{filteredTransactions.map((transaction) => {
							const customer = customers.find(
								(c) => c.id === transaction.customer_id
							);
							return (
								<tr key={transaction.id}>
									<td>{customer.id}</td>
									<td>{customer.name}</td>
									<td>{transaction.date}</td>
									<td>{transaction.amount}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</>
	);
}

export default Customers;
