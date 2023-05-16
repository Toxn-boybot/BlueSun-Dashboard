import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from 'axios';

const initialState = {
	loading: false,
	customers: [],
	error: '',
};

// Generates pending, fulfilled and rejected action types
export const fetchCustomers = createAsyncThunk(
	'customer/fetchCustomers',
	async () => {
		
		const response = await axios
			.get('data.json')
			.then((response) => response.data.customers);
		console.log(response);
		return response;
	}
);

const customerSlice = createSlice({
	name: 'customer',
	initialState,
	extraReducers: (builder) => {
		//fetching customers
		builder
			.addCase(fetchCustomers.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchCustomers.fulfilled, (state, action) => {
				state.loading = false;
				state.customers = action.payload;
				state.error = '';
			})
			.addCase(fetchCustomers.rejected, (state, action) => {
				state.loading = false;
				state.customers = [];
				state.error = action.error.message;
			});
	},
});

export default customerSlice.reducer;
