import { rx } from '@/common/rx';
import { getDPR } from '../../common/client.js';
import { fetchText } from '../../common/file.js';
import { isImage, isObject } from '../../common/is.js';
import { getRandString } from '../../common/math.js';
import { imagePrefix } from './Constant.js';
import config from './config.js';
import fabric from './preset.js';

const dpr = getDPR();

class ApiService {
  canvas: any = undefined;

  static instance: any;

  static getInstance = (): ApiService => {
    if (!(ApiService as any).instance) {
      this.instance = new ApiService();
    }
    return this.instance;
  };

  setCanvas = (canvas: any) => {
    this.canvas = canvas;
  };

  updateCanvasRect = (width: number, height: number) => {
    const { canvas } = this;
    canvas.setWidth(parseInt(`${width / dpr}`, 10));
    canvas.setHeight(parseInt(`${height / dpr}`, 10));
  };

  addImage = ({
    imageTag,
    width,
    height,
    selectable = false,
    autocenter = true,
    position = {},
    scale = 1,
    autoFocus = true,
    removeCurrentSelected = true,
  }: any) => {
    const { canvas, getSelected } = this;
    const image = imageTag;
    image.setAttribute('crossOrigin', 'Anonymous');
    image.crossOrigin = true;

    const rect = {
      width,
      height,
      top: 0,
      left: 0,
    };

    if (autocenter && selectable && isObject(position)) {
      let w = width;
      let h = height;

      if (scale !== 0) {
        w *= scale;
        h *= scale;
      }
      rect.left = (canvas.width - w) / 2;
      rect.top = (canvas.height - h) / 2;
    }
    if (!isObject(position)) {
      rect.left = position.left;
      rect.top = position.top;
    }

    if (removeCurrentSelected) {
      const selected = getSelected();

      // eslint-disable-next-line no-underscore-dangle
      if (selected && !selected._objects) {
        canvas.remove(selected);
        rect.left = selected.left;
        rect.top = selected.top;
      }
    }

    fabric.Image.fromURL(
      image.src,
      (img) => {
        img.set({ ...{ selectable }, ...rect });

        if (selectable) {
          if (scale !== 1) {
            img.scaleToHeight(height * scale);
            img.scaleToWidth(width * scale);
          }
          canvas.add(img);
          if (autoFocus) {
            canvas.setActiveObject(img);
          }
        } else {
          // disable to select background
          if (!selectable) {
            img.scaleToHeight(canvas.height);
            img.scaleToWidth(canvas.width);
          }
          canvas.backgroundImage = img;
        }
        canvas.renderAll();
      },
      { crossOrigin: 'Anonymous', id: getRandString() } as any,
    );
  };

  removeBackgroundImage = () => {
    const { canvas } = this;
    canvas.backgroundImage = undefined;
    canvas.renderAll();
  };

  setBackgroundColor = ({ color }: any) => {
    const { canvas } = this;
    canvas.backgroundColor = color;
    canvas.renderAll();
  };

  getCanvasRect = () => {
    const { canvas } = this;
    const el = canvas.lowerCanvasEl;
    const { width, height } = el;

    return { width: Math.floor(width / dpr), height: Math.floor(height / dpr) };
  };

  addImageFromURL = ({
    url,
    selectable = true,
    scale = 1,
    position = {},
  }: {
    url: string;
    selectable?: boolean;
    scale?: number;
    position?: {
      x?: number;
      y?: number;
    };
  }) => {
    const { canvas, getSelected, getSelectedType, getCanvasRect, addImage } = this;
    const image = new Image();
    let zoom = scale;
    const selected = getSelected();

    if (selected) {
      const type = getSelectedType(selected);

      if (type === 'i-text') {
        return Promise.reject(new Error('文本不能替换为图片'));
      }
    }

    return new Promise((resolve, reject) => {
      image.setAttribute('crossOrigin', 'Anonymous');
      // image.crossOrigin = 'true';
      image.onload = () => {
        image.onload = () => {};
        const { width, height } = image;
        const artboardRect = getCanvasRect();

        if (width > artboardRect.width || height > artboardRect.height) {
          zoom = Math.min((artboardRect.width / width) * 0.8, (artboardRect.height / height) * 0.8);
        }

        if (selected && selected.scaleX) {
          zoom = selected.scaleX;
        }

        addImage({
          canvas,
          imageTag: image,
          width,
          height,
          selectable,
          scale: zoom,
          position,
        });
      };
      image.onerror = () => {
        image.onerror = () => {};
        reject(new Error('贴纸资源获取失败'));
      };

      image.src = url;
    });
  };

  getSelected = () => {
    const { canvas } = this;
    if (!canvas) {
      return null;
    }

    return canvas.getActiveObject();
  };

  getSelectedType = (selected: any) => {
    if (!selected) {
      return '';
    }

    return selected.type;
  };

  unSelectAll = () => {
    const { canvas } = this;
    if (canvas && canvas.discardActiveObject) {
      canvas.discardActiveObject();
      canvas.renderAll();
    }
  };

  changeCanvasBackgroundImage = (image: any) => {
    const { canvas } = this;
    image.crossOrigin = true;
    fabric.Image.fromURL(
      image.src,
      (img) => {
        img.scaleToHeight(canvas.height);
        img.scaleToWidth(canvas.width);
        canvas.backgroundImage = img;
        canvas.renderAll();
      },
      { crossOrigin: 'Anonymous' },
    );
  };

  insertText = ({ text = 'DuelPeak', defaultStyle = config.textStyle, autocenter = true }: any) => {
    const { canvas, changeStyle } = this;
    const rect = {
      width: 150,
    };

    const textParams = {
      id: getRandString(),
      ...{
        left: 0,
        top: 10,
        fontSize: 60,
        fontWeight: 400,
        fill: '#333',
        charSpacing: 0,
        paintFirst: 'stroke',
      },
      ...rect,
      ...defaultStyle,
    };

    const textbox: any = new fabric.IText(text, textParams);

    if (autocenter) {
      const { width, height } = canvas;

      const left = parseInt(`${(width - textbox.width) / 2}`, 10);
      const top = parseInt(`${(height - textbox.height) / 2}`, 10);

      textbox.set({ left, top });
    }

    textbox.bringToFront();
    canvas.add(textbox);
    canvas.renderAll();
    canvas.setActiveObject(textbox);
    console.log('addFont', textParams);
    changeStyle({ fill: defaultStyle.fill || '#333' });
  };

  translateFontCss2Attribute = (styles: Record<string, string>) => {
    const cssMap: Record<string, string> = {
      borderWidth: 'strokeWidth',
      borderColor: 'stroke',
      shadowColor: 'shadowColor',
    };
    const newStyle: Record<string, any> = {};

    Object.keys(styles).forEach((key) => {
      const newKey = cssMap[key];

      if (key === 'shadowColor') {
        newStyle.shadow = new fabric.Shadow({
          color: styles.shadowColor,
          offsetX: 3,
          offsetY: 3,
          blur: 0,
        });
      } else if (newKey) {
        newStyle[newKey] = styles[key];
      } else {
        newStyle[key] = styles[key];
      }
    });

    return newStyle;
  };

  changeStyle = (styles = {}) => {
    const { canvas, getSelected, translateFontCss2Attribute } = this;
    const text = getSelected();

    if (text && text.set) {
      const styleAttr = translateFontCss2Attribute(styles);

      if (!styleAttr.shadow) {
        styleAttr.shadow = {};
      }

      text.set(styleAttr);
      console.log(111, styleAttr);
      canvas.renderAll();
      rx.next({
        type: 'object:modified',
        data: text,
      });
    } else {
      return new Error('Please Select Text first!');
    }

    return true;
  };

  setLayout = (dir: 'top' | 'right' | 'bottom' | 'left' | 'center') => {
    const { canvas, getSelected } = this;
    const el = getSelected();

    if (el) {
      switch (dir) {
        case 'top':
          el.set('top', 0);
          break;
        case 'right':
          el.set('left', canvas.width - el.width * el.scaleX);
          break;
        case 'bottom':
          el.set('top', canvas.height - el.height * el.scaleY);
          break;
        case 'left':
          el.set('left', 0);
          break;
        case 'center':
          el.center();
      }
      canvas.renderAll();
    }
  };

  changeShapeFillColor = (color: string) => {
    const { canvas, getSelected } = this;
    if (!color) {
      return;
    }
    const shape = getSelected();
    const img = shape.getElement();

    if (!isImage(img)) {
      return;
    }

    if (img.src.startsWith('http:') || img.src.startsWith('https:')) {
      if (img.src.includes('.svg')) {
        fetchText(img.src).then((text: any) => {
          if (!text) {
            return;
          }
          if (!text.includes('fill=')) {
            text = text.replace('<path ', '<path fill="#333" ');
          }
          const newText = text.replace(/#[\w]{3,6}/g, color);

          img.src = `${imagePrefix},${encodeURIComponent(newText)}`;
          img.onload = () => {
            img.onload = () => {};
            canvas.renderAll();
          };
        });
      }
    } else if (img.src.startsWith(imagePrefix)) {
      const { src } = img;
      let newSrc = decodeURIComponent(src);
      if (!newSrc.includes('fill=')) {
        newSrc = newSrc.replace('<path ', '<path fill="#333" ');
      }
      newSrc = newSrc.replace(`${imagePrefix},`, '').replace(/#[\w]{3,6}/g, color);

      img.src = `${imagePrefix},${encodeURIComponent(newSrc)}`;
      img.onload = () => {
        img.onload = () => {};
        canvas.renderAll();
      };
    }
  };

  checkImageCanBeColored = (img: any) => {
    if (img?.src?.startsWith('http:') || img?.src?.startsWith('https:')) {
      if (img.src.includes('.svg')) {
        return true;
      }
    }

    return img?.src?.startsWith(imagePrefix);
  };

  changeTextOrShapeColor = (color: string) => {
    const { getSelectedType, getSelected, changeStyle, changeShapeFillColor } = this;
    const type = getSelectedType(getSelected());
    if (type === 'i-text') {
      changeStyle({ fill: color });
    } else {
      changeShapeFillColor(color);
    }
  };

  markGroup = () => {
    const { canvas } = this;
    const active = canvas.getActiveObject();
    if (active?._objects?.length > 1) {
      active.toGroup();
      active.id = getRandString();
    }
  };

  ungroup = () => {
    const { canvas } = this;
    const active = canvas.getActiveObject();
    if (active?.type === 'group') {
      active.toActiveSelection();
    }
  };

  selectById = (id: string) => {
    const { canvas } = this;
    const objs = canvas.getObjects();
    const item = objs.find((obj: any) => obj.id === id);

    if (item) {
      canvas.setActiveObject(item);
      canvas.renderAll();
    }
  };

  noSelect = () => {
    const { canvas } = this;
    const active = canvas.getActiveObject();
    if (active) {
      active.set('selectable', false);
    }
  };

  canSelect = () => {
    const { canvas } = this;
    const active = canvas.getActiveObject();
    if (active) {
      active.set('selectable', true);
    }
  };

  updateProps = (key: string, value: string | number | boolean) => {
    const { canvas } = this;
    const active = canvas.getActiveObject();
    if (active) {
      active.set(key, value);
      canvas.renderAll();
      console.log('update', key, value);
    }
  };

  moveDirOfZ = (dir: '-1' | '+1' | 'top' | 'bottom') => {
    const { canvas } = this;
    const active = canvas.getActiveObject();

    if (active && canvas && canvas.bringForward) {
      switch (dir) {
        case '+1':
          canvas.bringForward(active);
          break;
        case 'top':
          canvas.bringToFront(active);
          break;
        case '-1':
          canvas.sendBackwards(active);
          break;
        case 'bottom':
          canvas.sendToBack(active);
          break;
      }
    }
  };
}

const api = ApiService.getInstance();
export default api;

(window as any).ccc = api;
