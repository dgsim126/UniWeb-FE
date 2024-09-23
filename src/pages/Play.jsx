import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  // useParams를 통해 post_key를 가져옴
import { game } from '../APIs/postAPI';  // 게임 API 호출 함수 가져오기

const Play = () => {
  const { post_key } = useParams();  // URL에서 post_key를 가져옴
  const [ post, setPost ] = useState(null); // 게시글 데이터 상태

  // const [gameData, setGameData] = useState(null);  // 게임 데이터를 저장하는 상태
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // API를 호출하여 게시글 상세 데이터를 가져오는 useEffect
  useEffect(() => {
    const fetchPostDetail = async () => {
        try {
            const response = await game(post_key); // 게시글 상세보기 API 호출
            setPost(response.data); // 응답 데이터를 상태에 저장

            console.log(response);
        } catch (error) {
            console.error('게시글 상세보기 불러오기 실패:', error);
        }
    };
    fetchPostDetail();
}, [post_key]);

  // // API를 호출해 게임 데이터를 가져오는 함수
  // const fetchGameData = async () => {
  //   setLoading(true);  // 로딩 상태 시작
  //   try {
  //     const response = await game(post_key);  // API 호출, post_key로 데이터 요청
  //     const gameData = response.data;  // 받은 데이터에서 필요한 부분 추출
  //     setGameData(gameData);  // 상태에 게임 데이터 저장

  //     console.log("게임 데이터:", gameData);  // 받은 JSON 데이터를 console에 출력
  //   } catch (error) {
  //     setError('게임 데이터를 불러오는 중 문제가 발생했습니다.');
  //     console.error('API 호출 실패:', error);
  //   } finally {
  //     setLoading(false);  // 로딩 상태 종료
  //   }
  // };

  // // 컴포넌트가 마운트될 때 API 호출
  // useEffect(() => {
  //   if (post_key) {
  //     fetchGameData();
  //   }
  // }, [post_key]);

  // if (loading) {
  //   return <div>로딩 중...</div>;  // 데이터 로딩 중 표시
  // }

  // if (error) {
  //   return <div>{error}</div>;  // 에러 발생 시 에러 메시지 표시
  // }

  // return (
  //   <div>
  //     {/* JSON 데이터를 화면에 보여주기 */}
  //     <h2>게임 데이터 상세 정보</h2>
  //     <pre>{JSON.stringify(gameData, null, 2)}</pre>  {/* JSON 데이터를 보기 쉽게 출력 */}
  //   </div>
  // );
};

export default Play;
