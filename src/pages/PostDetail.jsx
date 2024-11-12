import React, { useState, useEffect } from "react";
import { Container, Button, ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getPostDetail } from "../APIs/postAPI";
import { useNavigate } from "react-router-dom";

function PostDetail() {
    const { post_key } = useParams();
    const [post, setPost] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPostDetail = async () => {
            try {
                const response = await getPostDetail(post_key);
                setPost(response.data);
            } catch (error) {
                console.error('게시글 상세보기 불러오기 실패:', error);
            }
        };
        fetchPostDetail();
    }, [post_key]);

    if (!post) {
        return <div>로딩 중...</div>;
    }

    return (
        <Container>
            <TitleContainer>
                <PageTitle>{post.title}</PageTitle>
                <TopPlayButton variant="secondary" onClick={() => navigate(`/post/${post.post_key}/game`)}>
                    게임 플레이
                </TopPlayButton>
            </TitleContainer>
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
                <PlayButton variant="secondary" onClick={() => navigate(`/post/${post.post_key}/game`)}>게임 플레이하기!</PlayButton>
                <BackButton variant="secondary" onClick={() => navigate('/')}>목록으로 돌아가기</BackButton>
            </ButtonContainer>
        </Container>
    );
}

export default PostDetail;

// Styled Components

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
  position: relative;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  flex-grow: 1;
`;

const TopPlayButton = styled(Button)`
  position: absolute;
  right: 0;
  padding: 10px 20px;
  font-size: 1.2rem;
  background-color: green;
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

const PlayButton = styled(Button)`
  padding: 10px 20px;
  margin: 10px;
  font-size: 1.2rem;
  background-color: green;
`;

const BackButton = styled(Button)`
  padding: 10px 20px;
  margin: 10px;
  font-size: 1.2rem;
`;
