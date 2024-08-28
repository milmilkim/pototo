import { useCanvas } from '../hooks/useCanvas';
import { PototoContext } from '../Pototo';
import { useContext } from 'react';

interface ToolbarProps {}

const Toolbar: React.FC<ToolbarProps> = () => {
  const canvas = useCanvas();
  const { currentZoom } = useContext(PototoContext);

  const handleClickAddText = () => {
    canvas.addText('hello world');
  };

  const handleClickDeleteObjects = () => {
    canvas.deleteObject();
  };

  const handleClickChangeColor = () => {
    canvas.updateTextOptions({
      fill: 'red',
    });
  };

  const handleClickAddImage = (imageUrl: string) => {
    canvas.addImage(imageUrl);
  };

  return (
    <div>
      <button onClick={handleClickAddText}>텍스트 추가</button>
      <button onClick={handleClickDeleteObjects}>선택된 오브젝트 삭제</button>
      <button onClick={handleClickChangeColor}>선택 텍스트 색상 변경</button>
      <button
        onClick={() =>
          handleClickAddImage(
            'https://private-user-images.githubusercontent.com/65494214/362314952-2d15bb19-5f83-4fc8-8692-d8be85caeb60.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjQ4NTQzMDcsIm5iZiI6MTcyNDg1NDAwNywicGF0aCI6Ii82NTQ5NDIxNC8zNjIzMTQ5NTItMmQxNWJiMTktNWY4My00ZmM4LTg2OTItZDhiZTg1Y2FlYjYwLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA4MjglMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwODI4VDE0MDY0N1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTI3YThiODMzYmEzMmJlMjc1MGJhNDgyOTVjMDA3NjZmZjk4ZjkxYTQ5MzNjMTJlNGEwNzdlZWMyMzA2YTc1M2QmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.U-bzXBVZLVQbQ5hRuVxLOyLal0A47lWQuyLVXifjIRY'
          )
        }
      >
        이미지 추가
      </button>
    </div>
  );
};

export default Toolbar;
