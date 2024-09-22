import { atom } from 'recoil';

export const loginState = atom({
    key: 'loginState',
    default: JSON.parse(localStorage.getItem('isLoggedIn')) || false, // 로컬스토리지에 저장.
});