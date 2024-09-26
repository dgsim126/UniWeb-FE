import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  // useParams를 통해 post_key를 가져옴
import { game } from '../APIs/postAPI';  // 게임 API 호출 함수 가져오기
import { Container } from "react-bootstrap";

const Play = () => {
  const { post_key } = useParams();  // URL에서 post_key를 가져옴
  const [gameData, setGameData] = useState(null);  // 게임 데이터를 저장하는 상태
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unityLoaded, setUnityLoaded] = useState(false); // Unity가 로드되었는지 상태로 확인

  // 유니티 WebGL 빌드에 게임 데이터를 전달하는 함수
  const sendGameDataToUnity = (data) => {
    if (window.unityInstance && data) {
      const jsonString = JSON.stringify(data);  // JSON 데이터를 문자열로 변환
      window.unityInstance.SendMessage('GameController', 'StartGameWithData', jsonString);  // 유니티의 메서드로 데이터 전달
      console.log("유니티에 데이터 전달:", jsonString);  // 확인용 로그
    } else {
      console.error("유니티 인스턴스가 없거나 데이터가 없습니다.");
    }
  };

  // API를 호출해 게임 데이터를 가져오는 함수
  const fetchGameData = async () => {
    setLoading(true);  // 로딩 상태 시작
    try {
      const response = await game(post_key);  // API 호출, post_key로 데이터 요청
      const gameData = response.data;  // 받은 데이터에서 필요한 부분 추출
      setGameData(gameData);  // 상태에 게임 데이터 저장

      console.log("게임 데이터:", gameData);  // 받은 JSON 데이터를 console에 출력
    } catch (error) {
      setError('게임 데이터를 불러오는 중 문제가 발생했습니다.');
      console.error('API 호출 실패:', error);
    } finally {
      setLoading(false);  // 로딩 상태 종료
    }
  };

  // Unity WebGL 빌드가 로드되었는지 확인하는 함수
  const onUnityLoaded = () => {
    setUnityLoaded(true);  // Unity가 로드되면 상태를 true로 변경
    if (gameData) {
      sendGameDataToUnity(gameData);  // Unity가 로드된 후에 데이터 전달
    }
  };

  // Unity iframe의 로딩이 끝나면 호출
  useEffect(() => {
    window.addEventListener('message', (event) => {
      if (event.data === 'UnityLoaded') {
        onUnityLoaded();  // Unity가 완전히 로드된 후에 실행
      }
    });
  }, [gameData]);

  // 컴포넌트가 마운트될 때 API 호출
  useEffect(() => {
    if (post_key) {
      fetchGameData();
    }
  }, [post_key]);

  if (loading) {
    return <div>로딩 중...</div>;  // 데이터 로딩 중 표시
  }

  if (error) {
    return <div>{error}</div>;  // 에러 발생 시 에러 메시지 표시
  }

  return (
    <Container
      style={{
        display: 'flex',
        justifyContent: 'center',  // 수평 정렬
        alignItems: 'center',      // 수직 정렬
        minHeight: '100vh'         // 화면의 최소 높이를 100%로 설정하여 중앙 정렬 가능
      }}
    >
      <div id="unityContainer">
        <iframe
          title="Unity WebGL Game"
          src="/Build/UnityGame/index.html"  // 유니티 WebGL 빌드된 파일 경로
          width="1000"
          height="1000"
          style={{ border: 'none' }}
          allowFullScreen
          onLoad={onUnityLoaded}  // iframe이 로드되면 Unity 로드 상태를 업데이트
        />
      </div>
    </Container>
  );
};

export default Play;
