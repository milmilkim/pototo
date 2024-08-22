import * as fabric from 'fabric';

const CONTAINER_WIDTH = 500;
const CONTAINER_HEIGHT = 500;
import { useContext, useRef } from 'react';
import { PototoContext } from '../Pototo';

export const useCanvas = () => {
  const { setFabricCanvas, fabricCanvas, setCurrentZoom } = useContext(PototoContext);

  let canvasWidth = 500;
  let canvasHeight = 500;

  const scaleFactor = 1;
  const center = { x: 0, y: 0 };

  let isDragging = false;
  let lastPosX: number;
  let lastPosY: number;

  const init = (canvasElementRef: React.MutableRefObject<HTMLCanvasElement | null>, _canvasnWidth: number, _canvasHeight: number) => {
    if (canvasElementRef.current === null) return;
    const canvas = new fabric.Canvas(canvasElementRef.current, {
      fireRightClick: true,
      fireMiddleClick: true,
      stopContextMenu: true,
      width: CONTAINER_WIDTH,
      height: CONTAINER_HEIGHT,
    });

    canvasWidth = _canvasnWidth ?? CONTAINER_WIDTH;
    canvasHeight = _canvasHeight ?? CONTAINER_HEIGHT;

    setCenter(canvasWidth, canvasHeight);

    fabric.InteractiveFabricObject.ownDefaults = {
      ...fabric.InteractiveFabricObject.ownDefaults,
      cornerStyle: 'rect',
      cornerStrokeColor: '#5771FF',
      cornerSize: 8,
      cornerColor: '#FFF',
      padding: 10,
      transparentCorners: false,
      borderColor: '#5771FF',

      _controlsVisibility: {
        mt: false,
        mb: false,
        ml: false,
        mr: false,
      },
    };

    canvas.on('mouse:wheel', (opt) => {
      const delta = opt.e.deltaY;
      let zoom = canvas!.getZoom();
      zoom *= 0.999 ** delta;
      if (zoom > 20) zoom = 20;
      if (zoom < 0.01) zoom = 0.01;

      setZoom(zoom);

      opt.e.preventDefault();
      opt.e.stopPropagation();
    });

    canvas.on('mouse:down', (opt) => {
      const evt = opt.e;
      if (evt.altKey === true) {
        isDragging = true;
        canvas.setCursor('grabbing');
        canvas.selection = false;
        lastPosX = opt.viewportPoint.x;
        lastPosY = opt.viewportPoint.y;
      }
    });

    canvas.on('mouse:move', (opt) => {
      if (isDragging) {
        canvas.setCursor('grabbing');
        const vpt = canvas.viewportTransform;
        const deltaX = opt.viewportPoint.x - lastPosX;
        const deltaY = opt.viewportPoint.y - lastPosY;
        vpt[4] += deltaX;
        vpt[5] += deltaY;
        canvas.requestRenderAll();
        lastPosX = opt.viewportPoint.x;
        lastPosY = opt.viewportPoint.y;
      }
    });
    canvas.on('mouse:up', () => {
      if (canvas.viewportTransform) canvas.setViewportTransform(canvas.viewportTransform);
      isDragging = false;
    });

    if (setFabricCanvas) {
      setFabricCanvas(canvas);
    }
  };

  const history = useRef<fabric.FabricObject[]>([]);

  const addHistory = () => {
    history.current = [...history.current];
  };

  const exportJson = () => {
    return fabricCanvas?.current?.toObject();
  };

  // const checkCanvasInitialized = () => {
  //   if (!fabricCanvas?.current) {
  //     throw new Error('캔버스가 초기화되지 않았습니다.');
  //   }
  // };

  const addText = (text: string, options?: Partial<fabric.ITextProps>) => {
    fabricCanvas?.current?.add(new fabric.IText(text, options));
  };

  const updateTextOptions = (options: Partial<fabric.ITextProps>) => {
    const selectedObjects = _getSelectedObjects();

    selectedObjects?.forEach((object) => {
      if (object.type === 'i-text') {
        object.set(options);
      }
    });

    fabricCanvas?.current?.renderAll();
  };

  const setZoom = (zoom: number, pos?: { x: number; y: number }) => {
    const point = new fabric.Point(pos?.x ?? CONTAINER_WIDTH / 2, pos?.y ?? CONTAINER_HEIGHT / 2);
    fabricCanvas?.current?.zoomToPoint(point, zoom);
    if (setCurrentZoom) {
      setCurrentZoom(zoom);
    }
  };

  const resetZoom = () => {
    setZoom(scaleFactor);
    fabricCanvas?.current?.absolutePan(new fabric.Point(-center.x, -center.y));
  };

  const setCenter = (width: number, height: number) => {
    canvasWidth = width;
    canvasHeight = height;
  };

  const _getSelectedObjects = () => {
    return fabricCanvas?.current?.getActiveObjects();
  };

  const deleteObject = () => {
    const selectedObjects = _getSelectedObjects();
    if (selectedObjects?.length) {
      selectedObjects.forEach((object) => fabricCanvas?.current?.remove(object));
      fabricCanvas?.current?.discardActiveObject();
      fabricCanvas?.current?.renderAll();
    }
  };

  const addImage = async (url: string) => {
    const image = await fabric.FabricImage.fromURL(url);
    fabricCanvas?.current?.add(image);
  };

  return { addText, init, resetZoom, exportJson, addHistory, deleteObject, updateTextOptions, addImage };
};
