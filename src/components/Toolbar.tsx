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
      <button onClick={handleClickAddText}>add text</button>
      <button onClick={handleClickDeleteObjects}>delete</button>
      <button onClick={handleClickChangeColor}>change color</button>
    </div>
  );
};

export default Toolbar;
