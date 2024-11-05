// import React, { useState } from "react";
// import { Container, Button, Form, Row, Col } from "react-bootstrap";
// import styled from "styled-components";
// import { createPost } from "../APIs/postAPI"; // API 호출 함수
// import { useNavigate } from 'react-router-dom';

// function CreatePost() {
//     const [title, setTitle] = useState(""); // 게시글 제목
//     const [problems, setProblems] = useState([ // 최소 3개의 문제 생성
//         { problem_text: "", answers: [{ answer_text: "", is_correct: false }] },
//         { problem_text: "", answers: [{ answer_text: "", is_correct: false }] },
//         { problem_text: "", answers: [{ answer_text: "", is_correct: false }] }
//     ]);
//     const navigate = useNavigate();

//     // 문제 텍스트 수정
//     const handleProblemChange = (index, value) => {
//         const newProblems = [...problems];
//         newProblems[index].problem_text = value;
//         setProblems(newProblems);
//     };

//     // 답변 추가
//     const handleAddAnswer = (problemIndex) => {
//         const newProblems = [...problems];
//         newProblems[problemIndex].answers.push({ answer_text: "", is_correct: false });
//         setProblems(newProblems);
//     };

//     // 답변 텍스트 수정
//     const handleAnswerChange = (problemIndex, answerIndex, value) => {
//         const newProblems = [...problems];
//         newProblems[problemIndex].answers[answerIndex].answer_text = value;
//         setProblems(newProblems);
//     };

//     // 정답 선택
//     const handleCorrectChange = (problemIndex, answerIndex) => {
//         const newProblems = [...problems];
//         newProblems[problemIndex].answers.forEach((answer, index) => {
//             answer.is_correct = index === answerIndex; // 하나만 정답으로 설정
//         });
//         setProblems(newProblems);
//     };

//     // 문제 추가
//     const handleAddProblem = () => {
//         setProblems([...problems, { problem_text: "", answers: [{ answer_text: "", is_correct: false }] }]);
//     };

//     // 게시글 작성 API 호출
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const postData = {
//             title,
//             date: new Date().toISOString().split("T")[0], // 현재 날짜
//             problems,
//         };

//         try {
//             await createPost(postData); // 게시글 작성 API 호출
//             alert("게시글이 성공적으로 작성되었습니다.");
//             navigate('/');
//         } catch (error) {
//             console.error("게시글 작성 실패:", error);
//             alert("게시글 작성에 실패했습니다.");
//         }
//     };

//     return (
//         <Container>
//             <PageTitle>⚔ 게임 생성하기</PageTitle>
//             <Form onSubmit={handleSubmit}>
//                 <Form.Group controlId="formTitle">
//                     <Form.Label>[게시글 제목]</Form.Label>
//                     <Form.Control
//                         type="text"
//                         placeholder="제목을 입력하세요"
//                         value={title}
//                         onChange={(e) => setTitle(e.target.value)}
//                         required
//                     />
//                 </Form.Group>

//                 {problems.map((problem, problemIndex) => (
//                     <ProblemContainer key={problemIndex}>
//                         <Form.Group controlId={`formProblem${problemIndex}`}>
//                             <Form.Label>문제 {problemIndex + 1}</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 placeholder="문제를 입력하세요"
//                                 value={problem.problem_text}
//                                 onChange={(e) => handleProblemChange(problemIndex, e.target.value)}
//                                 required
//                             />
//                         </Form.Group>

//                         {problem.answers.map((answer, answerIndex) => (
//                             <Row key={answerIndex}>
//                                 <Col xs={8}>
//                                     <Form.Control
//                                         type="text"
//                                         placeholder={`보기 ${answerIndex + 1}`}
//                                         value={answer.answer_text}
//                                         onChange={(e) =>
//                                             handleAnswerChange(problemIndex, answerIndex, e.target.value)
//                                         }
//                                         required
//                                     />
//                                 </Col>
//                                 <Col xs={4}>
//                                     <Form.Check
//                                         type="radio"
//                                         label="정답"
//                                         checked={answer.is_correct}
//                                         onChange={() => handleCorrectChange(problemIndex, answerIndex)}
//                                     />
//                                 </Col>
//                             </Row>
//                         ))}

//                         <Button variant="secondary" onClick={() => handleAddAnswer(problemIndex)}>
//                             보기 추가
//                         </Button>
//                     </ProblemContainer>
//                 ))}

//                 <ButtonContainer>
//                     <Button variant="info" onClick={handleAddProblem}>
//                         + 문제 추가
//                     </Button>
//                 </ButtonContainer>

//                 <ButtonContainer>
//                     <SubmitButton type="submit" variant="primary">
//                         게시글 작성
//                     </SubmitButton>
//                 </ButtonContainer>
//             </Form>
//         </Container>
//     );
// }

// export default CreatePost;

// // Styled Components

// const PageTitle = styled.h1`
//   margin: 20px 0;
//   text-align: center;
//   font-size: 2.5rem;
//   font-weight: bold;
// `;

// const ProblemContainer = styled.div`
//   margin-bottom: 30px;
//   padding: 20px;
//   border: 1px solid #ddd;
//   border-radius: 5px;
//   background-color: #f9f9f9;
// `;

// const ButtonContainer = styled.div`
//   text-align: center;
//   margin-top: 20px;
// `;

// const SubmitButton = styled(Button)`
//   padding: 10px 20px;
//   font-size: 1.2rem;
// `;


// 문제 20문항, 보기 5개 고정
import React, { useState } from "react";
import { Container, Button, Form, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import { createPost } from "../APIs/postAPI";
import { useNavigate } from 'react-router-dom';

function CreatePost() {
    const [title, setTitle] = useState("");
    const [problems, setProblems] = useState(Array.from({ length: 20 }, () => ({
        problem_text: "",
        answers: Array.from({ length: 5 }, () => ({ answer_text: "", is_correct: false })),
    })));
    const navigate = useNavigate();

    const handleProblemChange = (index, value) => {
        const newProblems = [...problems];
        newProblems[index].problem_text = value;
        setProblems(newProblems);
    };

    const handleAnswerChange = (problemIndex, answerIndex, value) => {
        const newProblems = [...problems];
        newProblems[problemIndex].answers[answerIndex].answer_text = value;
        setProblems(newProblems);
    };

    const handleCorrectChange = (problemIndex, answerIndex) => {
        const newProblems = [...problems];
        newProblems[problemIndex].answers.forEach((answer, index) => {
            answer.is_correct = index === answerIndex;
        });
        setProblems(newProblems);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const postData = {
            title,
            date: new Date().toISOString().split("T")[0],
            problems,
        };

        try {
            await createPost(postData);
            alert("게시글이 성공적으로 작성되었습니다.");
            navigate('/');
        } catch (error) {
            console.error("게시글 작성 실패:", error);
            alert("게시글 작성에 실패했습니다.");
        }
    };

    return (
        <Container>
            <PageTitle>⚔ 게임 생성하기 ⚔</PageTitle>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formTitle" style={{ marginBottom: "50px" }}>
                    <Form.Label>[게시글 제목]</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="제목을 입력하세요"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </Form.Group>
                
                {problems.map((problem, problemIndex) => (
                    <ProblemContainer key={problemIndex}>
                        <Form.Group controlId={`formProblem${problemIndex}`}>
                            <Form.Label style={{ marginBottom: "10px" }}>문제 {problemIndex + 1} --- ✔ 정답에 반드시 체크해주세요!</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="문제를 입력하세요"
                                value={problem.problem_text}
                                onChange={(e) => handleProblemChange(problemIndex, e.target.value)}
                                required
                                style={{ marginBottom: "20px" }}
                            />
                        </Form.Group>

                        {problem.answers.map((answer, answerIndex) => (
                            <Row key={answerIndex}>
                                <Col xs={8}>
                                    <Form.Control
                                        type="text"
                                        placeholder={`보기 ${answerIndex + 1}`}
                                        value={answer.answer_text}
                                        onChange={(e) =>
                                            handleAnswerChange(problemIndex, answerIndex, e.target.value)
                                        }
                                        required
                                    />
                                </Col>
                                <Col xs={4}>
                                    <Form.Check
                                        type="radio"
                                        label="정답"
                                        checked={answer.is_correct}
                                        onChange={() => handleCorrectChange(problemIndex, answerIndex)}
                                    />
                                </Col>
                            </Row>
                        ))}
                    </ProblemContainer>
                ))}

                <ButtonContainer>
                    <SubmitButton type="submit" variant="primary">
                        게시글 작성
                    </SubmitButton>
                </ButtonContainer>
            </Form>
        </Container>
    );
}

export default CreatePost;

// Styled Components
const PageTitle = styled.h1`
  margin: 20px 0;
  text-align: center;
  font-size: 2.5rem;
  font-weight: bold;
`;

const ProblemContainer = styled.div`
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

const ButtonContainer = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const SubmitButton = styled(Button)`
  padding: 10px 20px;
  font-size: 1.2rem;
`;
