import { useState, useRef, useEffect } from 'react';

const NumAnswer = () => {
  const canvasRef = useRef(null);
  const [userPoints, setUserPoints] = useState([]); 
  const [isDrawing, setIsDrawing] = useState(false); 
  const canvasWidth = 400;
  const canvasHeight = 500;
  const centerX = canvasWidth / 2; 
  const targetCenterY = 250;
  const targetOuterR = 150;
  const targetInnerR = 110;
  const initQuiz = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    setUserPoints([]); 

    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, canvasHeight);
    ctx.stroke();
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';

    ctx.beginPath();
    ctx.arc(centerX, targetCenterY, targetOuterR, Math.PI * 0.5, Math.PI * 1.5, false);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(centerX, targetCenterY, targetInnerR, Math.PI * 0.45, Math.PI * 1.55, false);
    ctx.stroke();
  };

  useEffect(() => {
    initQuiz();
  }, []);

  const handleMouseDown = () => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.beginPath();
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (x >= centerX) {
      setUserPoints((prevPoints) => [...prevPoints, { x, y }]);

      ctx.lineWidth = 8;
      ctx.strokeStyle = '#0056b3'; 
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleCheckAnswer = () => {
    if (userPoints.length < 10) {
      alert('선을 충분히 그려주세요!');
      return;
    }

    let correctPoints = 0;

    userPoints.forEach((pt) => {

      const distance = Math.sqrt(
        Math.pow(pt.x - centerX, 2) + Math.pow(pt.y - targetCenterY, 2)
      );

      if (distance >= targetInnerR - 15 && distance <= targetOuterR + 15) {
        correctPoints++;
      }
    });

    const score = (correctPoints / userPoints.length) * 100;

    if (score > 80) {
      alert(`🎉 합격! 정답률: ${score.toFixed(1)}%\n대칭 구조를 정확하게 이해하여 숫자 0을 완성했습니다.`);
    } else {
      alert(`❌ 불합격! 정답률: ${score.toFixed(1)}%\n좌우 대칭이 맞지 않습니다. 다시 그려보세요.`);
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.title}>숫자의 나머지 부분을 완성해보세요</div>
      
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        style={styles.canvas}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp} 
      />

      <div style={styles.buttons}>
        <span style={styles.info}>보기: ①</span>
        <button onClick={initQuiz} style={styles.button}>초기화</button>
        <button onClick={handleCheckAnswer} style={styles.checkBtn}>정답 확인</button>
      </div>
    </div>
  );
};

const styles = {
  body: {
    fontFamily: 'sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: '#fafafa',
    padding: '20px',
  },
  title: {
    background: '#d2e7b9',
    padding: '10px 30px',
    fontWeight: 'bold',
    margin: '20px',
  },
  canvas: {
    border: '2px solid #333',
    background: '#fff',
    cursor: 'crosshair',
  },
  buttons: {
    marginTop: '15px',
    display: 'flex',
    alignItems: 'center',
  },
  info: {
    marginRight: '10px',
  },
  button: {
    padding: '8px 16px',
    fontSize: '14px',
    fontWeight: 'bold',
    margin: '0 5px',
    cursor: 'pointer',
    background: '#fff',
    border: '1px solid #333',
  },
  checkBtn: {
    padding: '8px 16px',
    fontSize: '14px',
    fontWeight: 'bold',
    margin: '0 5px',
    cursor: 'pointer',
    background: '#4CAF50',
    color: 'white',
    border: 'none',
  }
};

export default NumAnswer;