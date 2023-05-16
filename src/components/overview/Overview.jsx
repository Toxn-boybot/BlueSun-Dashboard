import React, { useState, useEffect }  from 'react';
import Head from '../head/Head';
import Chart from 'chart.js/auto';

import { Line } from "react-chartjs-2";
import { useSelector } from 'react-redux';

import './overview.css'


const Overview = () => {

	const transactions = useSelector((state) => state.transaction.transactions);
	const customers = useSelector((state) => state.customer.customers);
	const [selectedCustomerId, setSelectedCustomerId] = useState('');
	const [chart, setChart] = useState(null);
  
	useEffect(() => {
		const canvas = document.getElementById('transaction-chart');
		if (!canvas) return;
	
		const ctx = canvas.getContext('2d');
		const newChart = new Chart(ctx, {
		  type: 'line',
		  data: {
			labels: [],
			datasets: [{
			  label: 'Total Amount',
			  data: [],
			  borderColor: 'blue',
			  fill: false,
			  lineTension: 0
			}]
		  },
		  options: {
			title: {
			  display: true,
			  text: 'Total Transaction Amount per Day'
			},
			legend: {
			  display: true,
			  position: 'bottom'
			},
			scales: {
			  xAxes: [{
				type: 'time',
				time: {
				  unit: 'day'
				}
			  }]
			}
		  }
		});
		setChart(newChart);
	  }, []);

	
	



	useEffect(() => {
    if (!chart) return;

    const filteredTransactions = transactions.filter(t => t.customer_id === selectedCustomerId);
    const groupedTransactions = groupTransactionsByDate(filteredTransactions);

    const labels = Object.keys(groupedTransactions);
    const amounts = Object.values(groupedTransactions);

    chart.data.labels = labels;
    chart.data.datasets[0].data = amounts;
    chart.update();
  }, [selectedCustomerId, transactions, chart]);

  function groupTransactionsByDate(transactions) {
    const groupedTransactions = {};
    for (const transaction of transactions) {
      const date = transaction.date;
      if (groupedTransactions[date]) {
        groupedTransactions[date] += transaction.amount;
      } else {
        groupedTransactions[date] = transaction.amount;
      }
    }
    return groupedTransactions;
  }

  function handleCustomerSelect(event) {
    setSelectedCustomerId(event.target.value);
  }

  return (
    <div className='overview'>
		<Head name={'Overview'}/>
      <label htmlFor="customer-select">Select Customer:</label>
      <select id="customer-select" value={selectedCustomerId} onChange={handleCustomerSelect}>
        <option value="">Select a customer</option>
        {customers.map(customer => (
          <option key={customer.id} value={customer.id}>{customer.name}</option>
        ))}
      </select>
      <canvas id="transaction-chart"></canvas>
    </div>
  );
}

export default Overview;
