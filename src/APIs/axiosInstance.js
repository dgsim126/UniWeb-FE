import axios from 'axios';

// const API_URL = 'http://localhost:8080/'; // 로컬 테스트시 사용
// const API_URL = 'https://uniwebbackend.duckdns.org';

// const API_URL = 'https://uniwebb.freeddns.org'; // 바뀐 백엔드 URL[AWS]
const API_URL = 'https://uniweb-backend.duckdns.org'; // 🌟 형석's 백엔드 배포주소

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
      'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default axiosInstance;