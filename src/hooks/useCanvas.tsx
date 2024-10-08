import * as fabric from 'fabric';
import { useContext } from 'react';
import { PototoContext } from '../Pototo';
interface CanvasOptions {
  canvasElementRef: React.MutableRefObject<HTMLCanvasElement | null>;
  canvasWidth: number;
  canvasHeight: number;
  containerWidth?: number;
  containerHeight?: number;
  backgroundImageUrl?: string | null;
  gradientColors?: string[];
}
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

export const useCanvas = () => {
  const { setFabricCanvas, fabricCanvas, setCurrentZoom, setSelectedObject } =
    useContext(PototoContext);

  let _clipboard: fabric.FabricObject;

  // 기본값
  let canvasWidth = 1080;
  let canvasHeight = 1920;
  let containerWidth = 1080;
  let containerHeight = 1920;

  const scaleFactor = 1;
  const center = { x: 0, y: 0 };

  let isDragging = false;
  let lastPosX: number;
  let lastPosY: number;

  const history: Record<string, unknown>[] = [];

  let isHistoryLocked = false;
  let historyIndex = 0;



  const init = (opt: CanvasOptions) => {
    if (opt.canvasElementRef.current === null) return;

    canvasWidth = opt.canvasWidth ?? canvasWidth;
    canvasHeight = opt.canvasHeight ?? canvasHeight;

     containerWidth = opt.containerWidth ?? canvasWidth;
     containerHeight = opt.containerHeight ?? canvasHeight;
    
    const widthRatio = containerWidth / canvasWidth;
    const heightRatio = containerHeight / canvasHeight;
    const scaleFactor = Math.min(widthRatio, heightRatio);
    
    const dimensionWidth = canvasWidth * scaleFactor;
    const dimensionHeight = canvasHeight * scaleFactor;

    const canvas = new fabric.Canvas(opt.canvasElementRef.current, {
      fireRightClick: true,
      fireMiddleClick: true,
      stopContextMenu: true,
      selection: false,
      width: canvasWidth,
      height: canvasHeight,
    });

    canvas.setDimensions({
      width: dimensionWidth,
      height: dimensionHeight,
    });

    fabric.InteractiveFabricObject.ownDefaults = {
      ...fabric.InteractiveFabricObject.ownDefaults,
      cornerStyle: 'circle',

      cornerStrokeColor: '#fff',
      cornerSize: 10,
      cornerColor: '#312CBF',
      padding: 10,
      transparentCorners: false,
      borderColor: '#312CBF',
      borderDashArray: [7],

      _controlsVisibility: {
        mt: false,
        mb: false,
        ml: false,
        mr: false,
      },

      ...(isMobile ? { controls: {} } : {}),
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
      if (canvas.viewportTransform) {
        canvas.setViewportTransform(canvas.viewportTransform);
      }
      isDragging = false;
    });

    canvas.on('object:modified', _saveHistory);
    canvas.on('object:added', _saveHistory);
    canvas.on('object:removed', _saveHistory);

    canvas.on('mouse:down', (event: fabric.TPointerEventInfo) => {
      if (event.target) {
        canvas.bringObjectToFront(event.target);
        setSelectedObject!(event.target);
      } else {
        setSelectedObject!(undefined);
      }
    });

    if (setFabricCanvas) {
      setFabricCanvas(canvas);
    }

    setZoom(scaleFactor, { x: 0, y: 0 });

    if (opt.backgroundImageUrl) {
      addBackgroundImage(opt.backgroundImageUrl, opt.gradientColors ?? []);
    }
  };

  const canvas2Json = async () => {
    return await fabricCanvas?.current?.toJSON();
  };

  const json2Canvas = async (json: object) => {
    await fabricCanvas?.current?.loadFromJSON(json);
    fabricCanvas?.current?.renderAll();
  };

  const _lockHistory = () => {
    isHistoryLocked = true;
  };

  const _unlockHistory = () => {
    isHistoryLocked = false;
  };

  const undo = async () => {
    if (historyIndex < 0 || history.length < 0) return;

    _lockHistory();
    historyIndex -= 1;
    const prev = history[historyIndex];
    await json2Canvas(prev);
    _unlockHistory();
  };

  const redo = async () => {
    if (historyIndex >= history.length - 1) return;

    _lockHistory();
    historyIndex += 1;
    const next = history[historyIndex];
    await json2Canvas(next);
    _unlockHistory();
  };

  const _saveHistory = async () => {
    if (isHistoryLocked) return;

    // historyIndex 이후의 히스토리 삭제
    history.splice(historyIndex + 1);

    const current = await canvas2Json();
    history.push(current);
    historyIndex = history.length - 1;
  };

  const exportJson = () => {
    return fabricCanvas?.current?.toObject();
  };

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
    const point = new fabric.Point(
      pos?.x ?? containerWidth / 2,
      pos?.y ?? containerHeight / 2
    );

    fabricCanvas?.current?.zoomToPoint(point, zoom);
    if (setCurrentZoom) {
      setCurrentZoom(zoom);
    }
  };

  const resetZoom = () => {
    setZoom(scaleFactor);
    fabricCanvas?.current?.absolutePan(new fabric.Point(-center.x, -center.y));
  };

  const _getSelectedObjects = () => {
    return fabricCanvas?.current?.getActiveObjects();
  };

  const deleteObject = () => {
    const selectedObjects = _getSelectedObjects();
    if (selectedObjects?.length) {
      selectedObjects.forEach((object) =>
        fabricCanvas?.current?.remove(object)
      );
      fabricCanvas?.current?.discardActiveObject();
      fabricCanvas?.current?.renderAll();
    }
  };

  const addImage = async (url: string) => {
    const image = await fabric.FabricImage.fromURL(url);
    fabricCanvas?.current?.add(image);
  };

  const addBackgroundImage = async (url: string, colors: string[]) => {

    const rect = new fabric.Rect({
      left: 0,
      top: 0,
      width: canvasWidth,
      height: canvasHeight,
      selectable: false,
      evented: false,
    });

    const gradient = new fabric.Gradient({
      type: 'linear',
      gradientUnits: 'pixels', // 그라디언트의 단위
      coords: { x1: 0, y1: 0, x2: canvasWidth, y2: canvasHeight },
      colorStops: [
        { offset: 0, color: colors[0] },
        { offset: 1, color: colors[1] }
      ],
    });

    rect.set('fill', gradient);

    fabricCanvas?.current?.add(rect);

    const image = await fabric.FabricImage.fromURL(url);
    const w = canvasWidth / image.width;
    const h = canvasHeight / image.height;
    const scale = Math.min(w, h);

    image.scale(scale);
    image.set({
      left: (canvasWidth - image.getScaledWidth()) / 2, // 가운데 정렬 (가로)
      top: (canvasHeight - image.getScaledHeight()) / 2, // 가운데 정렬 (세로)
      originX: 'left',
      originY: 'top',
      selectable: false,
      evented: false,
    });
    fabricCanvas?.current?.add(image);
  };

  const copy = async () => {
    const cloned = await fabricCanvas?.current?.getActiveObject()?.clone();
    if (cloned) {
      _clipboard = cloned;
    }
  };

  const paste = async () => {
    if (!_clipboard) return;
    const clonedObj = await _clipboard.clone();
    fabricCanvas?.current?.discardActiveObject();

    clonedObj.set({
      left: clonedObj.left + 10,
      top: clonedObj.top + 10,
      evented: true,
    });
    if (clonedObj instanceof fabric.ActiveSelection) {
      clonedObj.canvas = fabricCanvas?.current ?? undefined;
      clonedObj.forEachObject((obj) => {
        fabricCanvas?.current?.add(obj);
      });
      clonedObj.setCoords();
    } else {
      fabricCanvas?.current?.add(clonedObj);
    }
    _clipboard.top += 10;
    _clipboard.left += 10;
    fabricCanvas?.current?.setActiveObject(clonedObj);
    fabricCanvas?.current?.requestRenderAll();
  };

  const setScale = (d: number) => {
    const objs = _getSelectedObjects();

    if (objs) {
      objs.forEach((obj) => {
        obj.scaleX = obj.scaleY = d;
      });
      fabricCanvas?.current?.renderAll();
    }
  };

  const setAngle = (angle: number) => {
    const objs = _getSelectedObjects();
    if (objs) {
      objs.forEach((obj) => {
        obj.angle = angle;
      });
      fabricCanvas?.current?.renderAll();
    }
  };

  return {
    addText,
    init,
    resetZoom,
    exportJson,
    deleteObject,
    updateTextOptions,
    addImage,
    addBackgroundImage,
    copy,
    paste,
    redo,
    undo,
    setScale,
    setAngle,
  };
};
