import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Post from '../pages/Post';
import Login from '../pages/Login';
import Register from '../pages/Register';

import PostDetail from '../pages/PostDetail';
import Play from '../pages/Play';
import CreateForm from '../pages/CreateForm';
import MyPage from '../pages/MyPage';

import ProtectedRoute from "../components/ProtectedRoute"; // 🌟🌟🌟 보호된 라우트 컴포넌트

// 라우트 코드 모음
const AppRouter = ({ isLoggedIn, handleLogin }) => {
  return (
    <Routes>
      <Route path="/" element={<Post handleLogin={handleLogin} />}/>
      <Route path="/login" element={<Login handleLogin={handleLogin} />}/>
      <Route path="/register" element={<Register handleLogin={handleLogin} />}/>

      <Route path="/post/:post_key" element={<PostDetail />}/>
      <Route
        path="/post/:post_key/game"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Play />
          </ProtectedRoute>
        }
      />
      <Route
        path="/create"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <CreateForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <MyPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default AppRouter
