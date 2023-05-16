import axios from 'axios';

export const baseURL = 'https://test.com/api';

const axiosInstance = axios.create({ baseURL });

// Request interceptor for API calls
axiosInstance.interceptors.request.use(
	async (config) => {
		const token = localStorage.get('accessToken');
		config.headers = {
			Authorization: `Bearer ${token}`,
			Accept: 'application/json',
			'Content-Type': 'application/x-www-form-urlencoded',
		};
		return config;
	},
	(error) => {
		Promise.reject(error);
	}
);

// Response interceptor for API calls
axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	async function (error) {
		const originalRequest = error.config;
		if (error.response.status === 403 && !originalRequest._retry) {
			originalRequest._retry = true;
			const access_token = localStorage.get("accessToken");
            const response = await axios.get(`${baseURL}/refreshToken`)
            if(response.data.data.accessToken) {
                localStorage.add("accessToken", response.data.data.accessToken)
            }
            
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
			return axiosInstance(originalRequest);
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;




// accessToken = valid for 1 day //not valid
// refreshToken = 1 valid for 30days


// request(data)


// request(refreshToken) > accessToken valid for 1 day

// request(data)


// /silent refresh token