import { useContext } from 'react';
import { PototoContext } from '../Pototo';
import * as fabric from 'fabric';

const CONTAINER_WIDTH = 500;
const CONTAINER_HEIGHT = 500;

export const useCanvas = () => {
  const { setFabricCanvas, fabricCanvas } = useContext(PototoContext);

  let canvasWidth = 500;
  let canvasHeight = 500;

  let scaleFactor = 1;
  let currentZoom = 1;
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
        lastPosX = opt.viewportPoint.x;
        lastPosY = opt.viewportPoint.y;
      }
    });

    canvas.on('mouse:move', (opt) => {
      if (isDragging) {
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

    setFabricCanvas(canvas);
  };

  const addText = (text: string) => {
    fabricCanvas?.current?.add(new fabric.IText(text));
  };

  const setZoom = (zoom: number) => {
    const point = new fabric.Point(CONTAINER_WIDTH / 2, CONTAINER_HEIGHT / 2);
    fabricCanvas?.current?.zoomToPoint(point, zoom);
    currentZoom = zoom;
  };

  const resetZoom = () => {
    setZoom(scaleFactor);
    fabricCanvas?.current?.absolutePan(new fabric.Point(-center.x, -center.y));
  };

  const setCenter = (width: number, height: number) => {
    canvasWidth = width;
    canvasHeight = height;
  };

  return { addText, init, resetZoom };
};
