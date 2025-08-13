

const env = "dev";
const baseURL = (env === 'prod' 
  ? 'https://uncoverpro.onrender.com/api' 
  : 'http://localhost:3000/api');

const getToken = () => localStorage.getItem('api_token');

const setToken = (token) => localStorage.setItem('api_token', token);

const getAuthHeaders = () => {
  const token = getToken();
  return token ? { Authorization: 'Bearer ' + token } : {};
};

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    ...getAuthHeaders(),
  },
  withCredentials: true,
});


api.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    ...getAuthHeaders(),
  };
  return config;
});

api.interceptors.response.use(
  (response) => {
    if (response.data && response.data.token) {
      setToken(response.data.token);
    }
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);
