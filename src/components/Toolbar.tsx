import { useContext } from 'react';
import { PototoContext } from '../Pototo';
import * as fabric from 'fabric';

import { useCanvas } from '../hooks/useCanvas';

interface ToolbarProps {}

const Toolbar: React.FC<ToolbarProps> = () => {
  const { fabricCanvas } = useContext(PototoContext);

  const handleClickAddText = (e: React.MouseEvent) => {
    e.preventDefault();
    fabricCanvas?.current?.add(new fabric.IText('Hello, world!'));
  };

  return (
    <div>
      <button onClick={handleClickAddText}>add text</button>
    </div>
  );
};

export default Toolbar;
