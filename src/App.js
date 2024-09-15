import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import AppRouter from './routes/Router';
import Footer from './components/Footer';

// import PrivateRoute from './route/PrivateRoute';
// import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [authenticate, setAuthenticate] = useState(false); // 로그인 유무 파악
  useEffect(() => {
    console.log(authenticate);
  }, [authenticate]) // authenticate값이 바뀔 때 마다 실행

  return (
    <div>
      <Navbar authenticate={authenticate} setAuthenticate={setAuthenticate} />
      <AppRouter />
      <Footer />
    </div>
  );
}

export default App;
