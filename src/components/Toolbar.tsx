import { useCanvas } from '../hooks/useCanvas';

interface ToolbarProps {}

const Toolbar: React.FC<ToolbarProps> = () => {
  const canvas = useCanvas();

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
            'https://picsum.photos/200/300'
          )
        }
      >
        이미지 추가
      </button>
    </div>
  );
};

export default Toolbar;
