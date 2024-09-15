import logo from './logo.svg';
import './App.css';

function App() {
  const [authenticate, setAuthenticate] = useState(false);
  useEffect(() => {
    console.log(authenticate);
  }, [authenticate]) // authenticate값이 바뀔 때 마다 실행.
  return (
    <div>
      <Navbar authenticate={authenticate} setAuthenticate={setAuthenticate} />
      <Routes>
        <Route path="/" element={<ProductAll/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Login/>}/>

        <Route path="/:id" element={<PrivateRoute authenticate={authenticate} />}/>
        <Route path="/play" element={<PrivateRoute authenticate={authenticate} />}/>
        <Route path="/create" element={<PrivateRoute authenticate={authenticate} />}/>
        <Route path="/my" element={<PrivateRoute authenticate={authenticate} />}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
