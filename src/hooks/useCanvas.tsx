import { useContext, useRef } from 'react';
import { PototoContext } from '../Pototo';
import * as fabric from 'fabric';

export const useCanvas = () => {
  const { fabricCanvas } = useContext(PototoContext);

  const history = useRef<fabric.FabricObject[]>([]);

  const addHistory = () => {
    history.current = [...history.current];
  };

  const exportJson = () => {
    checkCanvasInitialized();
    return fabricCanvas?.current?.toObject();
  };

  const checkCanvasInitialized = () => {
    if (!fabricCanvas?.current) {
      throw new Error('캔버스가 초기화되지 않았습니다.');
    }
  };

  const addText = (text: string) => {
    checkCanvasInitialized();
    fabricCanvas?.current?.add(new fabric.IText(text));
  };

  return { addText, addHistory, exportJson };
};
