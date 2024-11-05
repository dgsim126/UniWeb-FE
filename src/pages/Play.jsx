import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { game } from '../APIs/postAPI';
import { Container } from "react-bootstrap";

const Play = () => {
  const { post_key } = useParams();
  const [gameData, setGameData] = useState(null);  // 게임 데이터를 저장하는 상태
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unityLoaded, setUnityLoaded] = useState(false); // Unity가 로드되었는지 상태로 확인

  // API를 호출해 게임 데이터를 가져오는 함수
  const fetchGameData = async () => {
    setLoading(true);  // 로딩 상태 시작
    try {
      const response = await game(post_key);  // API 호출, post_key로 데이터 요청
      const gameData = response.data;  // 받은 데이터에서 필요한 부분 추출
      setGameData(gameData);  // 상태에 게임 데이터 저장
      console.log("게임 데이터:", gameData);
    } catch (error) {
      setError('게임 데이터를 불러오는 중 문제가 발생했습니다.');
      console.error('API 호출 실패:', error);
    } finally {
      setLoading(false);  // 로딩 상태 종료
    }
  };

  // Unity로 데이터를 전달하는 함수
  const sendGameDataToUnity = (data) => {
    const iframe = document.getElementById('unityContainer').querySelector('iframe');
    if (iframe && data) {
      const jsonString = JSON.stringify(data);  // JSON 데이터를 문자열로 변환
      console.log("Unity에 전달될 데이터:", jsonString);  // React에서 Unity로 전달될 JSON 데이터 확인
      iframe.contentWindow.postMessage({
        type: 'SendMessageToUnity',
        functionName: 'ReceiveJsonData',
        data: jsonString
      }, '*');
    } else {
      console.error("iframe 또는 데이터가 없습니다.");
    }
  };

  // 컴포넌트가 처음 렌더링될 때 게임 데이터 로드
  useEffect(() => {
    if (post_key) {
      fetchGameData();
    }
  }, [post_key]);

  useEffect(() => {
    const handleUnityMessage = (event) => {
      if (event.data.type === "UnityLoaded" && event.data.message === "JIH") {
        console.log("React: Unity의 UnityLoaded 메시지를 받았습니다.");
        setUnityLoaded(true); // Unity 로드 상태를 true로 설정
      }
    };
    window.addEventListener('message', handleUnityMessage);
  
    return () => {
      window.removeEventListener('message', handleUnityMessage);
    };
  }, []);

  useEffect(() => {
    if (unityLoaded && gameData) {
      console.log("unityLoaded : ", unityLoaded);
      console.log("gameData : ", gameData);
      console.log("React: Unity 로드 완료 및 데이터 존재. Unity에 데이터 전달 시작");
      sendGameDataToUnity(gameData);  // 데이터 전달
    }
  }, [unityLoaded, gameData]);  // unityLoaded와 gameData가 변경될 때만 실행
  
  if (loading) {
    return <div>로딩 중...</div>;  // 데이터 로딩 중 표시
  }

  if (error) {
    return <div>{error}</div>;  // 에러 발생 시 에러 메시지 표시
  }

  // 최신 유니티 빌드 파일 적용완료
  return (
    <Container
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
      }}
    >
      <div id="unityContainer">
        <iframe
          title="Unity WebGL Game"
          src="/Build/UnityGame/index.html"
          width="1000"
          height="700"
          style={{ border: 'none' }}
          allowFullScreen
        />
      </div>
    </Container>
  );
};

export default Play;