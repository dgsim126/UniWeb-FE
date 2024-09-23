import axiosInstance from "./axiosInstance";

// 모든 게시글 불러오기
export const getAllPosts = async () => {
    const token = localStorage.getItem('token');
    try {
        const response = await axiosInstance.get(`/api/post`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Cache-Control': 'no-cache'
            },
            withCredentials: true,
        });
        return response;
    } catch (error) {
        console.error('게시글 목록 불러오기 실패:', error);
        throw error;
    }
};

// 게시글 상세보기
export const getPostDetail = async (postKey) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axiosInstance.get(`/api/post/${postKey}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Cache-Control': 'no-cache'
            },
            withCredentials: true,
        });
        return response;
    } catch (error) {
        console.error('게시글 상세보기 실패:', error);
        throw error;
    }
};

// 게시글 내 게임시작 [/api/post/:key/game]
export const game = async (postKey) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axiosInstance.get(`/api/post/${postKey}/game`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Cache-Control': 'no-cache'
            },
            withCredentials: true,
        });
        return response;
    } catch (error) {
        console.error('게임시작 실패:', error);
        throw error;
    }
};

// 게시글 작성하기
export const createPost = async (postData) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axiosInstance.post(`/api/post/create`, postData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        return response;
    } catch (error) {
        console.error('게시글 작성 실패:', error);
        throw error;
    }
};

// 게시글 삭제하기
export const deletePost = async (postKey) => {
    try {
        const response = await axiosInstance.delete(`/api/post/delete/${postKey}`, {
            withCredentials: true,
        });
        return response;
    } catch (error) {
        console.error('게시글 삭제 실패:', error);
        throw error;
    }
};
