import { useContext, useEffect, useRef } from 'react';
import * as fabric from 'fabric'; // v6
import { PototoContext } from '../Pototo';

const Canvas = () => {
  const canvasElRef = useRef<HTMLCanvasElement | null>(null);

  const { setFabricCanvas } = useContext(PototoContext);

  useEffect(() => {
    const canvasEl = canvasElRef.current;
    const canvas = new fabric.Canvas(canvasEl!);

    setFabricCanvas(canvas);

    return () => {
      canvas.dispose();
    };
  }, [setFabricCanvas]);

  return (
    <>
      <canvas
        width={500}
        height={500}
        style={{
          border: '1px solid #e6e6e6',
        }}
        ref={canvasElRef}
      ></canvas>
    </>
  );
};

export default Canvas;
