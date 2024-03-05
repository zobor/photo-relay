/**
 * artboard data
 */
import createStore from '.';
import { getDPR } from '../common/client';

type Rect = { width?: number; height?: number };
type Layer = {
  fill?: string;
  color?: string;
  width?: number;
  height?: number;
  selectable?: boolean;
  stoke?: string;
  top?: number;
  left?: number;
  type?: string;
  id?: string;
  zoomX?: number;
  zoomY?: number;
  stroke?: string;
  strokeWidth?: number;
  scaleY?: number;
  scaleX?: number;
  _element?: any;

  // text
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: string;
  fontStyle?: string;
  underline?: boolean;
  overline?: boolean;
  linethrough?: boolean;
};

interface ArtboardState {
  width: number;
  height: number;
  rightPanelDetail: string;
  presetBackGround: string;
  scale: number;
  dragDisabled: boolean;
  selectedId: string;
  layer: Layer;
  changeRect: (rect: Rect) => void;
  changeRightPanelDetail: (type: string) => void;
  updatePresetBackGround: (url: string) => void;
  update: (data: Partial<ArtboardState>) => void;
}

const dpr = getDPR();
const save = (key: string, value: string | number) => {
  localStorage.setItem(key, value + '');
};
const getData = (key: string) => {
  const value = localStorage.getItem(key);
  return value ? Number(value) : undefined;
};

const useArtboardStore = createStore<ArtboardState>((set) => ({
  width: getData('artboardWidth') || (window.innerWidth - 550) * dpr,
  height: getData('artboardHeight') || (window.innerHeight - 100) * dpr,
  rightPanelDetail: '',
  presetBackGround: '',
  scale: 100,
  dragDisabled: true,
  selectedId: '',
  layer: {},
  update: (data: Partial<ArtboardState>) => {
    set((draft) => {
      Object.assign(draft, data);
    });
  },
  updateScale: (scale: number) => {
    set((draft) => {
      draft.scale = scale;
    });
  },
  updatePresetBackGround: (url: string) => {
    set((draft) => {
      draft.presetBackGround = url;
    });
  },
  changeRightPanelDetail: (type: string) => {
    set((draft) => {
      draft.rightPanelDetail = type;
    });
  },
  changeRect: (rect: Rect) => {
    set((draft) => {
      if (rect.width) {
        draft.width = rect.width;
        save('artboardWidth', rect.width);
      }
      if (rect.height) {
        draft.height = rect.height;
        save('artboardHeight', rect.height);
      }
    });
  },
}));

export default useArtboardStore;
