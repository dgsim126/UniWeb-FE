import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  // useParams를 통해 post_key를 가져옴
import { game } from '../APIs/postAPI';  // 게임 API 호출 함수 가져오기

const Play = () => {
  const { post_key } = useParams();  // URL에서 post_key를 가져옴
  const [gameData, setGameData] = useState(null);  // 게임 데이터를 저장하는 상태
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 유니티 WebGL 빌드에 게임 데이터를 전달하는 함수
  const sendGameDataToUnity = (data) => {
    const unityInstance = window.unityInstance;  // 유니티 WebGL 인스턴스 확인
    
    if (unityInstance && data) {
      const jsonString = JSON.stringify(data);  // JSON 데이터를 문자열로 변환
      unityInstance.SendMessage('GameController', 'StartGameWithData', jsonString);  // 유니티의 메서드로 데이터 전달
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
      sendGameDataToUnity(gameData);  // 유니티에 데이터 전달
    } catch (error) {
      setError('게임 데이터를 불러오는 중 문제가 발생했습니다.');
      console.error('API 호출 실패:', error);
    } finally {
      setLoading(false);  // 로딩 상태 종료
    }
  };

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
    <div>
      <h2>게임 데이터 상세 정보</h2>
      <pre>{JSON.stringify(gameData, null, 2)}</pre>  {/* JSON 데이터를 보기 쉽게 출력 */}
    </div>

    // 연동 성공 시 웹에 표시
    // {/* Unity WebGL 빌드 표시 (iframe으로 WebGL 파일 로드) */}
  //   <div id="unityContainer">
  //   <iframe
  //     title="Unity WebGL Game"
  //     src="/Build/UnityGame/index.html"  // 유니티 WebGL 빌드된 파일 경로
  //     width="800"
  //     height="600"
  //     style={{ border: 'none' }}
  //     allowFullScreen
  //   />
  // </div>
  );
};

export default Play;
