import { useContext, useEffect, useRef } from 'react';
import { useCanvas } from '../hooks/useCanvas';
import { PototoContext } from '../Pototo';

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
