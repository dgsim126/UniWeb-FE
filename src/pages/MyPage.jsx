import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { myPageAPI, updateProfile } from "../APIs/myPageAPI";
import { useNavigate } from 'react-router-dom';
import { Container } from "react-bootstrap";

function MyPage({ handleLogin }) {
    const [userData, setUserData] = useState(null); // 사용자 데이터 상태
    const [formData, setFormData] = useState({ name: '', password: '', age: '' }); // 폼 입력 상태
    const navigate = useNavigate();

    // API를 호출하여 사용자 데이터를 가져오는 useEffect
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await myPageAPI(); // 만들어둔 마이페이지 api 실행
                const data = response.data;
                setUserData(data);
                setFormData({ name: data.name, age: data.age, password: '' });
            } catch (error) {
                console.error('데이터 불러오기 실패:', error);
            }
        };
        fetchData();
    }, []);

    // 입력 필드 값이 변경될 때 상태를 업데이트하는 함수
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // 수정 폼 제출 시 API에 POST 요청을 보내는 함수
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProfile(formData); // 수정한 정보 POST 요청
            alert('정보가 성공적으로 수정되었습니다.');
            handleLogin(); // 로그인 상태 true로 변경
            navigate('/');  // 메인 페이지 리디렉션
        } catch (error) {
            alert('수정 실패: ' + error.message);
        }
    };

    if (!userData) {
        return <div>로딩 중...</div>; // 데이터 로딩 중일 때 표시
    }

    return (
        <Container>
          <Frame>
            <Sidebar>
                <SidebarItem>내 정보</SidebarItem>
                <SidebarItem>작성한 글</SidebarItem>
            </Sidebar>
            <MainContent>
                <WelcomeMessage>{userData.name}님 환영합니다!</WelcomeMessage>
                <Form onSubmit={handleSubmit}>
                    <Label>이름</Label>
                    <Input name="name" value={formData.name} onChange={handleInputChange} />
                    <Label>나이</Label>
                    <Input name="age" value={formData.age} onChange={handleInputChange} type="number" />
                    <Label>비밀번호</Label>
                    <Input name="password" value={formData.password} onChange={handleInputChange} type="password" />
                    <SubmitButton type="submit">수정하기</SubmitButton>
                </Form>
            </MainContent>
          </Frame>
        </Container>
    );
}

export default MyPage;

const Frame = styled.div`
  display: flex;
  height: 100%;
  background-color: #fff;
`;

const Sidebar = styled.div`
  width: 200px;
  border-right: 1px solid #ccc;
  padding: 20px;
`;

const SidebarItem = styled.div`
  margin-bottom: 10px;
  font-size: 18px;
  cursor: pointer;
  color: #999;
  font-weight: normal;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
`;

const WelcomeMessage = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 16px;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SubmitButton = styled.button`
  padding: 10px;
  background-color: skyblue;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #577074;
  }
`;
