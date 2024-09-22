import axiosInstance from "./axiosInstance";

export const myPageAPI = async () => {
    try {
        const response = await axiosInstance.get(`/api/my`, {
            headers: {
                'Cache-Control': 'no-cache'
            },
            withCredentials: true,
        }); 
        return response;
    } catch (error) {
        console.error('마이페이지 불러오기 실패:', error);
        throw error;
    }
};

export const updateProfile = async (profileData) => {
    try {
        const response = await axiosInstance.put(`/api/my/update`, profileData, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        return response;
    } catch (error) {
        console.error('프로필 수정 실패:', error);
        throw error;
    }
};

// export const deleteProfile = async () => {
//     try {
//         const response = await axiosInstance.delete(`/api/my/delete`);
//         if (response.status >= 200 && response.status < 300) {

//         } else {
//             throw new Error('회원 탈퇴 실패');
//         }
//     } catch (error) {
//         console.error('회원탈퇴 실패: ', error);
//         throw error;
//     }
// }