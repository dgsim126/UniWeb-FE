import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import AppRouter from './routes/Router';
import Footer from './components/Footer';

import { RecoilRoot, useSetRecoilState } from 'recoil';
import { loginState } from './state/atoms';
// import PrivateRoute from './route/PrivateRoute';
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // const [authenticate, setAuthenticate] = useState(false); // 로그인 유무 파악
  // useEffect(() => {
  //   console.log(authenticate);
  // }, [authenticate]) // authenticate값이 바뀔 때 마다 실행

  const ResetLoginState = () => {
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

  return (
    <div>
      <RecoilRoot>
        <Navbar authenticate={authenticate} setAuthenticate={setAuthenticate} />
        <AppRouter />
        <Footer />
      </RecoilRoot>
    </div>
  );
}

export default App;
