import { MutableRefObject, createContext, useRef } from 'react';
import fabric from 'fabric';
import Canvas from './components/Canvas';
import Toolbar from './components/Toolbar';

export interface PototoContext {
  fabricCanvas: MutableRefObject<fabric.Canvas | null> | null;
  setFabricCanvas: (canvas: fabric.Canvas) => void;
}

export const PototoContext = createContext<PototoContext>({
  fabricCanvas: null,
  setFabricCanvas: () => {},
});

interface PototoProps {}

const Pototo: React.FC<PototoProps> = () => {
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const setFabricCanvas = (canvas: fabric.Canvas | null) => {
    fabricCanvasRef.current = canvas;
  };

  return (
    <PototoContext.Provider value={{ fabricCanvas: fabricCanvasRef, setFabricCanvas }}>
      <Toolbar />
      <Canvas elementWidth={500} elementHeight={500} />
    </PototoContext.Provider>
  );
};

export default Pototo;
