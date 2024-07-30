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

  return (
    <div>
      <button onClick={handleClickAddText}>add text</button>
      <button onClick={handleClickDeleteObjects}>delete</button>
    </div>
  );
};

export default Toolbar;
