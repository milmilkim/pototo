import { useContext, useEffect, useRef } from 'react';
import { useCanvas } from '../hooks/useCanvas';
import { PototoContext } from '../Pototo';

interface CanvasProps {
  elementWidth: number;
  elementHeight: number;
}

const Canvas: React.FC<CanvasProps> = (props) => {
  const canvasElRef = useRef<HTMLCanvasElement | null>(null);

  const { fabricCanvas } = useContext(PototoContext);
  const { init, deleteObject, copy, paste } = useCanvas();

  useEffect(() => {
    init(canvasElRef, props.elementWidth, props.elementHeight);
    const fabricCanvasRef = fabricCanvas?.current;

    const handleKeyDown = (e: KeyboardEvent) => {
      const { key } = e;

      if (e.ctrlKey || e.metaKey) {
        switch (key) {
          case 'c':
            copy()
            break;

          case 'v':
            paste()
            break;

          default:
            break;
        }
      }

      switch (key) {
        case 'Backspace':
        case 'Delete':
          deleteObject();
          break;

        default:
          break;
      }
    };

    window.document.addEventListener('keydown', handleKeyDown);

    return () => {
      fabricCanvasRef?.dispose();
      window.document.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <canvas
        width={500}
        height={500}
        style={{
          border: '1px solid #e6e6e6',
        }}
        ref={canvasElRef}></canvas>
    </>
  );
};

export default Canvas;
