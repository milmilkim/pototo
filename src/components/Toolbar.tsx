import { useContext } from 'react';
import { useCanvas } from '../hooks/useCanvas';
import { PototoContext } from '../Pototo';

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

  return (
    <div>
      {currentZoom}
      <button onClick={handleClickAddText}>텍스트 추가</button>
      <button onClick={handleClickDeleteObjects}>선택된 오브젝트 삭제</button>
      <button onClick={handleClickChangeColor}>선택 텍스트 색상 변경</button>
    </div>
  );
};

export default Toolbar;
