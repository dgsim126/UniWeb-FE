import axios from 'axios';

const API_URL = 'http://localhost:8080/';
// const API_URL = ''; 도메인 정해지면 이걸로 변경.

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
      'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default axiosInstance;