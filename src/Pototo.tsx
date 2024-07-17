import { MutableRefObject, createContext, useRef } from "react";
import fabric from "fabric";
import Canvas from "./components/Canvas";
import Toolbar from "./components/Toolbar";

export interface PototoContext {
  fabricCanvas: MutableRefObject<fabric.Canvas | null> | null;
  setFabricCanvas: (canvas: fabric.Canvas) => void;
}

export const PototoContext = createContext<PototoContext>({
  fabricCanvas: null,
  setFabricCanvas: () => {},
});

const Pototo = () => {
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const setFabricCanvas = (canvas: fabric.Canvas | null) => {
    fabricCanvasRef.current = canvas;
    console.log("fabricCanvasRef", fabricCanvasRef.current);
  };

  return (
    <PototoContext.Provider
      value={{ fabricCanvas: fabricCanvasRef, setFabricCanvas }}
    >
      <Toolbar />
      <Canvas />
    </PototoContext.Provider>
  );
};

export default Pototo;
