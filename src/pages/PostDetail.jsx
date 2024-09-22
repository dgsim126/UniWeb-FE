import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom"; // URL에서 post_key 추출
import styled from "styled-components";
import { getPostDetail } from "../APIs/postAPI"; // API 호출 함수

function PostDetail() {
    const { post_key } = useParams(); // post_key를 URL에서 가져옴
    const [ post, setPost ] = useState(null); // 게시글 데이터 상태

    // API를 호출하여 게시글 상세 데이터를 가져오는 useEffect
    useEffect(() => {
        const fetchPostDetail = async () => {
            try {
                const response = await getPostDetail(post_key); // 게시글 상세보기 API 호출
                setPost(response.data); // 응답 데이터를 상태에 저장
            } catch (error) {
                console.error('게시글 상세보기 불러오기 실패:', error);
            }
        };
        fetchPostDetail();
    }, [post_key]);

    // 로딩 중일 때 표시
    if (!post) {
        return <div>로딩 중...</div>;
    }

    return (
        <Container>
            <PageTitle>{post.title}</PageTitle>
            <PostDate>작성일: {new Date(post.date).toLocaleDateString()}</PostDate>
            {post.problems.map((problem) => (
                <ProblemContainer key={problem.problem_key}>
                    <ProblemTitle>{problem.problem_text}</ProblemTitle>
                    <ListGroup variant="flush">
                        {problem.answers.map((answer) => (
                            <ListGroup.Item key={answer.answer_key}>
                                {answer.answer_text} {answer.is_correct && <CorrectBadge>정답</CorrectBadge>}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </ProblemContainer>
            ))}
            <ButtonContainer>
                <BackButton variant="secondary" href="/">목록으로 돌아가기</BackButton>
            </ButtonContainer>
        </Container>
    );
}

export default PostDetail;

// Styled Components

const PageTitle = styled.h1`
  margin: 20px 0;
  text-align: center;
  font-size: 2.5rem;
  font-weight: bold;
`;

const PostDate = styled.div`
  text-align: right;
  color: #666;
  font-size: 1rem;
  margin-bottom: 20px;
`;

const ProblemContainer = styled.div`
  margin-bottom: 30px;
`;

const ProblemTitle = styled.h3`
  margin-bottom: 15px;
  font-size: 1.5rem;
  font-weight: bold;
`;

const CorrectBadge = styled.span`
  margin-left: 10px;
  color: #fff;
  background-color: #28a745;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
`;

const ButtonContainer = styled.div`
  text-align: center;
  margin-top: 40px;
`;

const BackButton = styled(Button)`
  padding: 10px 20px;
  font-size: 1.2rem;
`;

