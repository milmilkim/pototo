import { MutableRefObject, createContext, useRef, useState } from 'react';
import fabric from 'fabric';
import Canvas from './components/Canvas';
import Toolbar from './components/Toolbar';

export interface PototoContext {
  fabricCanvas?: MutableRefObject<fabric.Canvas | null>;
  // eslint-disable-next-line no-unused-vars
  setFabricCanvas: (canvas: fabric.Canvas) => void;
  currentZoom: number;
  setCurrentZoom: React.Dispatch<React.SetStateAction<number>>;
  selectedObject: fabric.FabricObject;
  setSelectedObject: React.Dispatch<React.SetStateAction<fabric.FabricObject | undefined>>
}

export const PototoContext = createContext<Partial<PototoContext>>({
  fabricCanvas: undefined,
  setFabricCanvas: undefined,
  setCurrentZoom: undefined,
  selectedObject: undefined,
  setSelectedObject: undefined
});

interface PototoProps {}

const Pototo: React.FC<PototoProps> = () => {
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const setFabricCanvas = (canvas: fabric.Canvas) => {
    fabricCanvasRef.current = canvas;
  };

  const [currentZoom, setCurrentZoom] = useState(1);
  const [selectedObject, setSelectedObject] = useState<fabric.FabricObject | undefined>(undefined)

  return (
    <PototoContext.Provider value={{ fabricCanvas: fabricCanvasRef, setFabricCanvas, currentZoom, setCurrentZoom, selectedObject, setSelectedObject }}>
      <Toolbar />
      <Canvas elementWidth={500} elementHeight={500} />
    </PototoContext.Provider>
  );
};

export default Pototo;
