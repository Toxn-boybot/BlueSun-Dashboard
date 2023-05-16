import { configureStore } from '@reduxjs/toolkit';
import customerReducer from '../features/customers/customerSlice';
import transactionReducer from '../features/transactions/transactionSlice';

const store = configureStore({
	reducer: {
		customer: customerReducer,
		transaction: transactionReducer,
	},
});

export default store;
