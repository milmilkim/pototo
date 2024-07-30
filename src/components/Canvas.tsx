import { useContext, useEffect, useRef } from 'react';
import { PototoContext } from '../Pototo';
import { useCanvas } from '../hooks/useCanvas';

const Canvas = () => {
  const canvasElRef = useRef<HTMLCanvasElement | null>(null);

  const { fabricCanvas } = useContext(PototoContext);
  const { init } = useCanvas();

  useEffect(() => {
    init(canvasElRef, 500, 500);

    return () => {
      fabricCanvas?.current?.dispose();
    };
  }, []);

  return (
    <>
      <canvas width={500} height={500} ref={canvasElRef}></canvas>
    </>
  );
};

export default Canvas;
