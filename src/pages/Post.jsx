import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import styled from "styled-components";
import { getAllPosts } from "../APIs/postAPI"; // API 호출 함수

function MainPage() {
    const [posts, setPosts] = useState([]); // 게시글 데이터 상태

    // API를 호출하여 게시글 목록을 가져오는 useEffect
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await getAllPosts(); // 모든 게시글 불러오는 API 호출
                setPosts(response.data); // 응답 데이터를 상태에 저장
            } catch (error) {
                console.error('게시글 불러오기 실패:', error);
            }
        };
        fetchPosts();
    }, []);

    // 로딩 중일 때 표시
    if (!posts.length) {
        return <div>로딩 중...</div>;
    }

    return (
        <Container>
            <PageTitle>📖 문제선택</PageTitle>
            {posts.map((post) => (
                <Row className="my-3" key={post.post_key}>
                    <Col>
                    <PostContainer>
                            <LeftContent>
                                <PostTitle>{post.title}</PostTitle>
                                <PostDate>{new Date(post.date).toLocaleDateString()}</PostDate>
                            </LeftContent>
                            <PostButton variant="primary" href={`/post/${post.post_key}`}>상세보기</PostButton>
                        </PostContainer>
                    </Col>
                </Row>
            ))}
        </Container>
    );
}

export default MainPage;

const PageTitle = styled.h1`
  margin: 20px 0;
  text-align: left;
  font-size: 2rem;
  font-weight: bold;
`;

const PostContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const PostTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0 0 10px 0;
`;

const PostDate = styled.div`
  color: #666;
  font-size: 0.9rem;
`;

const PostButton = styled(Button)`
  font-size: 1rem;
  padding: 10px 20px;
`;