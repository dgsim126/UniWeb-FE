import axios from 'axios';

const API_URL = 'http://localhost:8080/'; // 로컬 테스트시 사용
// const API_URL = 'https://uniwebbackend.duckdns.org';

// const API_URL = 'https://uniwebb.freeddns.org'; // 바뀐 백엔드 URL

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
      'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default axiosInstance;