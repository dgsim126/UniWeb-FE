import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import uniweb from '../images/uniweb.png'
import { useNavigate } from 'react-router-dom'
import { logout } from '../APIs/loginAPI'

const Navbar = ({ isLoggedIn, handleLogin }) => {
  // const menuList = ["Home", "게임 생성하기", "마이 페이지"];
  const menuList = [
    { label: "Home", path: "/" },              // Home
    { label: "게임 생성하기", path: "/create" },  // 게임 생성하기
    { label: "마이페이지", path: "/my" }    // 마이페이지
  ];

  const navigate = useNavigate();
  const goToLogin = async() => {
    if( isLoggedIn ){ // 로그인 상태일 땐 로그아웃 상태 만들고 홈으로 리디렉션
      console.log(isLoggedIn);

      await logout(); // 로그아웃 진행

      console.log("Logout successful");

      handleLogin(); // 상태 로그아웃으로 변경
      navigate("/");
    } else { // 로그인 x 상태일 땐 로그인페이지 이동
      navigate("/login");
    }
  }
  const goToMain = () => {
    navigate("/");
  }

  return (
    <div>
      <div>
        <div className="login-button" onClick={goToLogin}>
          <FontAwesomeIcon icon={faUser} />
          <div className="login-text">{isLoggedIn===true ? "Logout" : "Login"}</div>
        </div>
      </div>

      <div className="logo">
        <img onClick={goToMain} cursor="pointer" width="120" height="40" src={uniweb} alt="유니웹" />
      </div>

      <div className="menu-area">
        <ul className="menu-list">
          {/* {}가 아니라 ()임에 유의 */}
          {menuList.map((menu, index) => (
            <li key={index} onClick={() => navigate(menu.path)} style={{ cursor: 'pointer' }}>
              {menu.label}
            </li>
          ))}
        </ul>
        <div className='searchbox'>
          <FontAwesomeIcon icon={faSearch} />
          <input type="text" />
        </div>
      </div>
    </div>
  )
}

export default Navbar