import { useContext, useEffect, useRef } from 'react';
import { useCanvas } from '../hooks/useCanvas';
import { PototoContext } from '../Pototo';
import { useGesture } from '@use-gesture/react';

interface CanvasProps {
  originalWidth: number;
  originalHeight: number;
  backgroundImage?: string | null;
  gradientColors?: string[];

}

const Canvas: React.FC<CanvasProps> = (props) => {
  const canvasElRef = useRef<HTMLCanvasElement | null>(null);
  const wrapperElRef = useRef<HTMLDivElement | null>(null);

  const { fabricCanvas } = useContext(PototoContext);
  const { init, deleteObject, copy, paste, undo, redo, setScale, setAngle } = useCanvas();

  useEffect(() => {
    init(canvasElRef, props.originalWidth, props.originalHeight, wrapperElRef.current?.clientHeight ?? props.originalHeight, props.backgroundImage, props.gradientColors);

 
    const fabricCanvasRef = fabricCanvas?.current;

    const handleKeyDown = (e: KeyboardEvent) => {
      const { key } = e;

      if (e.ctrlKey || e.metaKey) {
        switch (key) {
          case 'c':
            copy();
            break;

          case 'v':
            paste();
            break;

          case 'z':
            if (e.shiftKey) {
              redo();
            } else {
              undo();
            }
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

  const gesture = useGesture(
    {
      onDrag: () => {},
      onPinch: ({ offset: [scale, angle] }) => {
        setAngle(angle);
        setScale(scale);
      },

      onHover: () => {},
    },
    {}
  );

  return (
    <div style={{ touchAction: 'none' }} ref={wrapperElRef} className="border w-full flex flex-grow justify-center items-center" {...gesture()}>
      <canvas
        style={{
          touchAction: 'none',
        }}
        ref={canvasElRef}
        {...gesture()}
      ></canvas>
    </div>
  );
};

export default Canvas;
