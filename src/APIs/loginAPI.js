import axiosInstance from './axiosInstance';

export const login = async (userData) => {
    try {
        const response = await axiosInstance.post(`/api/login`, userData);

        if (response.status === 200) {
            // 로그인 성공 시 토큰 또는 로그인 상태를 저장 -> 🌟새로고침 시 로그인 풀리는 문제 해결
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('isLoggedIn', JSON.stringify(true));
        }

        console.log(response.status)
        return response;
    } catch (error) {
        console.error('로그인 실패사유:', error);
        throw error;
    }
};

export const regist = async (registData) => {
    try {
        const response = await axiosInstance.post(`/api/register`, registData);
        return response;
    } catch (error) {
        console.error('회원가입 실패사유:', error);
        throw error;
    }
};

export const logout = async () => {
    try {
        const response = await axiosInstance.post(`/api/logout`);
        return response;
    } catch (error) {
        console.error('로그아웃 실패사유:', error);
        throw error;
    }
};