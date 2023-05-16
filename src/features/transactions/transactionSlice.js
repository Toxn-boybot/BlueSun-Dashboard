import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from 'axios';

const initialState = {
	loading: false,
	transactions: [],
	error: '',
};

export const fetchTransactions = createAsyncThunk(
	'transaction/fetchTransactions',
	async () => {
		const response = await axios
			.get('data.json')
			.then((response) => response.data.transactions);
		return response;
	}
);

const transactionSlice = createSlice({
	name: 'transaction',
	initialState,
	extraReducers: (builder) => {
		builder.addCase(fetchTransactions.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchTransactions.fulfilled, (state, action) => {
			state.loading = false;
			state.transactions = action.payload;
			state.error = '';
		});
		builder.addCase(fetchTransactions.rejected, (state, action) => {
			state.loading = false;
			state.transactions = [];
			state.error = action.error.message;
		});
	},
});

export default transactionSlice.reducer;
