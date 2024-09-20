import React, { useState } from 'react';
import styled from 'styled-components';
import { regist } from '../APIs/loginAPI';
import { useNavigate } from 'react-router-dom';

function RegisterComponent({ toggleComponent }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    const registData = {
      id: email,
      password,
      name,
      age,
    };

    try {
      const response = await regist(registData);

      if (response.status >= 200 && response.status < 300) {
        const message = await response.data;
        alert(message);
        navigate('/login');
      } else {
        const errorMessage = await response.data;
        throw new Error(errorMessage);
      }

    } catch (error) {
      console.error('회원가입 실패: ', error);
      alert('회원가입에 실패했습니다');
    }
  };

  return (
    <div>
      <RegisterForm onSubmit={handleSubmit}>
        <RegisterHeader>🔑 회원가입 🔑</RegisterHeader>
        
        <div id="namecomp" style={{ width: '60%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <InputDiv className="registerName">
            <Input
              type="text"
              maxLength="30"
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder='이름'
            />
          </InputDiv>
        </div>

        <div id="agecomp" style={{ width: '60%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <InputDiv className="registerAge">
            <Input
              type="number"
              id="age"
              value={age}
              onChange={(event) => setAge(event.target.value)}
              placeholder='나이'
            />
          </InputDiv>
        </div>

        <div id="idcomp" style={{ width: '60%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <InputDiv className="registerId">
            <Input
              type="text"
              maxLength="30"
              id="username"
              value={email}
              autoComplete="new-password"
              onChange={(event) => setEmail(event.target.value)}
              placeholder='아이디'
            />
          </InputDiv>
        </div>

        <div id="pwcomp" style={{ width: '60%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <InputDiv className="registerPassword">
            <Input
              type="password"
              id="password"
              value={password}
              autoComplete="new-password"
              onChange={(event) => setPassword(event.target.value)}
              placeholder='비밀번호'
            />
          </InputDiv>
        </div>

        <div id="pwcheckcomp" style={{ width: '60%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <InputDiv className="confirmPassword">
            <Input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              autoComplete="new-password"
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder='비밀번호 확인'
            />
          </InputDiv>
        </div>

        <RegisterButton type="submit">회원가입</RegisterButton>
        <SignInButton type="button" onClick={toggleComponent}>로그인으로 돌아가기</SignInButton>
      </RegisterForm>
    </div>
  );
}

export default RegisterComponent;

const RegisterHeader = styled.div`
  margin-bottom: 30px;
`;

const RegisterForm = styled.form`
  font-size: 15px;
  padding-top: 80px;
  padding-bottom: 100px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  border-radius: 10px;
`;

const Input = styled.input`
  width: 100%;
  border: none;
  border-bottom: 1px solid #000;
  margin-bottom: 30px;
  padding-bottom: 15px;

  &:focus {
    outline: none;
  }
`;

const InputDiv = styled.div`
  width: 100%;
`;

const RegisterButton = styled.button`
  width: 60%;
  height: 50px;
  color: black;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;

const SignInButton = styled.button`
  width: 60%;
  height: 50px;
  color: black;
  background-color: #fff;
  border-radius: 10px;
  cursor: pointer;
`;
