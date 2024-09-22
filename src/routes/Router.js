import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Post from '../pages/Post';
import Login from '../pages/Login';
import Register from '../pages/Register';

import PostDetail from '../pages/PostDetail';
import Play from '../pages/Play';
import CreateForm from '../pages/CreateForm';
import MyPage from '../pages/MyPage';

// 라우트 코드 모음
const AppRouter = ({ handleLogin }) => {
  return (
    <Routes>
      <Route path="/" element={<Post handleLogin={handleLogin} />}/>
      <Route path="/login" element={<Login handleLogin={handleLogin} />}/>
      <Route path="/register" element={<Register handleLogin={handleLogin} />}/>

      <Route path="/post/:post_key" element={<PostDetail />}/>
      <Route path="/play" element={<Play />}/>
      <Route path="/create" element={<CreateForm />}/>
      <Route path="/my" element={<MyPage />}/>
    </Routes>
  )
}

export default AppRouter
