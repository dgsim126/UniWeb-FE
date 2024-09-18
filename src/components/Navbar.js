import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import uniweb from '../images/uniweb.png'
import { useNavigate } from 'react-router-dom'

const Navbar = ({authenticate, setAuthenticate}) => {
  const menuList = ["메인 페이지", "게임 생성하기"];
  const navigate = useNavigate();
  const goToLogin = () => {
    if( authenticate ){ // 로그인 상태일 땐 로그아웃 상태 만들고 홈으로 리디렉션.
      setAuthenticate(false);
      navigate("/");
    } else { // 로그인 x 상태일 땐 로그인페이지 이동.
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
          <div className="login-text">{authenticate===true ? "Logout" : "Login"}</div>
        </div>
      </div>

      <div className="logo" onClick={goToMain}>
        <img width="150" height="120" src={uniweb} alt="유니웹" />
      </div>

      <div className="menu-area">
        <ul className="menu-list">
          {/* {}가 아니라 ()임에 유의 */}
          {menuList.map((menu, index) => (
            <li key={index}>{menu}</li>
          ))}
        </ul>
        <div>
          <FontAwesomeIcon icon={faSearch} />
          <input type="text" />
        </div>
      </div>
    </div>
  )
}

export default Navbar