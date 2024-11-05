import { Navigate } from "react-router-dom";

// ProtectedRoute 컴포넌트: 로그인이 필요할 때 사용하는 보호된 라우트
// 마이페이지, 게임생성하기, 게임 플레이하기 등
const ProtectedRoute = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
