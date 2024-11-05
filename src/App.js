import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import AppRouter from './routes/Router';
import Footer from './components/Footer';

import { useSetRecoilState, useRecoilState } from 'recoil';
import { loginState } from './states/atoms';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const ResetLoginState = () => {
    // 로그인 상태 초기화
    const setLoginState = useSetRecoilState(loginState);

    useEffect(() => {
      const isSessionActive = sessionStorage.getItem('isSessionActive');
      if (!isSessionActive) {
        setLoginState(false);
        localStorage.setItem('isLoggedIn', JSON.stringify(false));
        sessionStorage.setItem('isSessionActive', 'true');
      }
    }, [setLoginState]);

    return null;
  };

  const [isSignUp, setIsSignUp] = useState(false); // 회원가입 유무
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState); // 로그인 유무

  useEffect(() => {
    console.log('현재 로그인 상태:', isLoggedIn); // 로그인 상태가 바뀔 때마다 출력
  }, [isLoggedIn]);

  // 로그인 상태를 바꿔주는 함수
  const handleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <div>
      <ResetLoginState />
      <Navbar isLoggedIn={isLoggedIn} handleLogin={handleLogin}/>
      <AppRouter isLoggedIn={isLoggedIn} handleLogin={handleLogin}/>
      <Footer />
    </div>
  );
}

export default App;
