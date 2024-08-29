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
  setSelectedObject: React.Dispatch<
    React.SetStateAction<fabric.FabricObject | undefined>
  >;
  backgroundImage: string | null;
}

export const PototoContext = createContext<Partial<PototoContext>>({
  fabricCanvas: undefined,
  setFabricCanvas: undefined,
  setCurrentZoom: undefined,
  selectedObject: undefined,
  setSelectedObject: undefined,
  backgroundImage: undefined,
});

interface PototoProps {
  backgroundImage?: string | null;
}

const Pototo: React.FC<PototoProps> = ({ backgroundImage }) => {
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const setFabricCanvas = (canvas: fabric.Canvas) => {
    fabricCanvasRef.current = canvas;
  };

  const [currentZoom, setCurrentZoom] = useState(1);
  const [selectedObject, setSelectedObject] = useState<
    fabric.FabricObject | undefined
  >(undefined);

  return (
    <PototoContext.Provider
      value={{
        fabricCanvas: fabricCanvasRef,
        setFabricCanvas,
        currentZoom,
        setCurrentZoom,
        selectedObject,
        setSelectedObject,
      }}>
      <div className='flex flex-col h-full'>
        <Toolbar />
        <Canvas
          originalWidth={1080}
          originalHeight={1920}
          backgroundImage={backgroundImage}
        />
      </div>
    </PototoContext.Provider>
  );
};

export default Pototo;
