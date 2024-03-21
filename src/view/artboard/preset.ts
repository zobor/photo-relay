import { fabric } from 'fabric';
import { cloneImg, deleteImg, rotateImg, zoomImg, zoomXImg, zoomYImg } from './assets.js';
import { controlsPostionMap } from './Constant.js';

const controlsUtils: any = (fabric as any).controlsUtils;
export const originalScaleControl = fabric.Object.prototype.controls.br;

// render fabric controller icon
export function renderIcon(iconObject: HTMLImageElement) {
  return function (
    this: { cornerSize: number },
    // ctx: OffscreenCanvasRenderingContext2D,
    ctx: any,
    left: number,
    top: number,
    styleOverride: any,
    fabricObject: any,
  ) {
    const size = this.cornerSize;

    ctx.save();
    ctx.translate(left, top);
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
    ctx.drawImage(iconObject, -size / 2, -size / 2, size, size);
    ctx.restore();
  };
}

// settings
fabric.Object.prototype.set({
  transparentCorners: true,
  borderColor: 'rgb(187, 143, 206)',
  borderScaleFactor: 2.5,
  borderOpacityWhenMoving: 1,
  cornerSize: 20,
  cornerStyle: 'circle',
  cornerColor: '#000',
  cornerStrokeColor: '#000',
});

// render middle left of zoomX
fabric.Object.prototype.controls.ml = new fabric.Control({
  x: -0.5,
  y: 0,
  offsetX: -1,
  offsetY: 0,
  cursorStyleHandler: controlsUtils.scaleSkewCursorStyleHandler,
  actionHandler: controlsUtils.scalingXOrSkewingY,
  getActionName: controlsUtils.scaleOrSkewActionName,
  render: renderIcon(zoomXImg),
  cornerSize: 20,
} as any);

// render middle right of zoomX
fabric.Object.prototype.controls.mr = new fabric.Control({
  x: 0.5,
  y: 0,
  offsetX: -1,
  offsetY: 0,
  cursorStyleHandler: controlsUtils.scaleSkewCursorStyleHandler,
  actionHandler: controlsUtils.scalingXOrSkewingY,
  getActionName: controlsUtils.scaleOrSkewActionName,
  render: renderIcon(zoomXImg),
  cornerSize: 20,
} as any);

// render middle top of zoomY
fabric.Object.prototype.controls.mt = new fabric.Control({
  x: 0,
  y: -0.5,
  offsetX: -1,
  offsetY: 0,
  cursorStyleHandler: controlsUtils.scaleSkewCursorStyleHandler,
  actionHandler: controlsUtils.scalingYOrSkewingX,
  getActionName: controlsUtils.scaleOrSkewActionName,
  render: renderIcon(zoomYImg),
  cornerSize: 20,
} as any);

// render bottom middle of zoomY
fabric.Object.prototype.controls.bt = new fabric.Control({
  x: 0,
  y: 0.5,
  offsetX: -1,
  offsetY: 0,
  cursorStyleHandler: controlsUtils.scaleSkewCursorStyleHandler,
  actionHandler: controlsUtils.scalingYOrSkewingX,
  getActionName: controlsUtils.scaleOrSkewActionName,
  render: renderIcon(zoomYImg),
  cornerSize: 20,
} as any);

// render bop left of delete
fabric.Object.prototype.controls.tl = new fabric.Control({
  ...controlsPostionMap.topLeft,
  ...{
    offsetY: 0,
    objectCaching: false,
    cursorStyle: 'pointer',
    mouseUpHandler: deleteObject,
    render: renderIcon(deleteImg),
    cornerSize: 20,
  },
} as any);

// render bottom left of clone
fabric.Object.prototype.controls.bl = new fabric.Control({
  ...controlsPostionMap.bottomLeft,
  ...{
    offsetY: 0,
    offsetX: 0,
    objectCaching: false,
    cursorStyle: 'pointer',
    mouseUpHandler: cloneObject,
    render: renderIcon(cloneImg),
    cornerSize: 20,
  },
} as any);

// render top right of rotate
fabric.Object.prototype.controls.tr = new fabric.Control({
  ...controlsPostionMap.topRight,
  ...{
    offsetY: 0,
    offsetX: 0,
    cursorStyle: 'pointer',
    objectCaching: false,
    actionHandler: controlsUtils.rotationWithSnapping,
    cursorStyleHandler: controlsUtils.rotationStyleHandler,
    render: renderIcon(rotateImg),
    cornerSize: 20,
    actionName: 'rotate',
  },
} as any);

// render bottom right of zoom
fabric.Object.prototype.controls.br = new fabric.Control({
  ...controlsPostionMap.bottomRight,
  ...{
    offsetY: 0,
    offsetX: 0,
    objectCaching: false,
    cursorStyle: 'pointer',
    actionHandler: originalScaleControl.actionHandler,
    cursorStyleHandler: originalScaleControl.cursorStyleHandler,
    render: renderIcon(zoomImg),
    cornerSize: 20,
    actionName: 'zoom',
  },
} as any);

// Hide the middle drag control point on the control bar
'mb|mtr'.split('|').forEach((key) => {
  fabric.Object.prototype.setControlVisible(key, false);
});

// delete element from canvas
export function deleteObject(eventData: Event, target: any) {
  const tar = target.target;
  const { canvas } = tar;

  canvas.remove(tar);
  canvas.requestRenderAll();
}

// clone element from canvas
export function cloneObject(eventData: Event, transform: any) {
  const { target } = transform;
  const { canvas } = target;

  target.clone((cloned: any) => {
    cloned.left += 50;
    cloned.top += 50;
    canvas.add(cloned);
    canvas.setActiveObject(cloned);
  });
}

export default fabric;
