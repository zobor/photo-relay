/**
 * 用户信息数据
 */
import createStore from '.';
import { getRandString } from '../common/math';

type PhotoItem = {
  url?: string;
  width?: number;
  height?: number;
  id?: string;
};

enum Step {
  HOME = 1,
  Gallery = 2,
  Cropper = 3,
  Viewer = 4,
  Artboard = 5,
}

interface PhotoState {
  photos: PhotoItem[];
  selected: string;
  step: Step;
  fonts: string[];
  font: string;
  color: string;
  setColor: (color: string) => void;
  setFonts: (list: string[]) => void;
  addOneImage: (url: string) => void;
  updateStep: (nextStep: number) => void;
  updateSelected: (id: string) => void;
  setFont: (font: string) => void;
  updateImage: (id: string, newData: any) => void;
}

const usePhotoStore = createStore<PhotoState>((set, get) => ({
  step: 1,
  photos: [],
  selected: '',
  fonts: [],
  font: '',
  color: '',
  updateImage: (id: string, newData: any) => {
    const { photos } = get();
    const list = JSON.parse(JSON.stringify(photos));
    const index = list.findIndex((item: any) => item.id === id);
    const item = list[index];
    Object.assign(item, newData || {});
    list[index] = item;
    set((draft) => {
      draft.photos = list;
    });
  },
  setColor: (color: string) => {
    set((draft) => {
      draft.color = color;
    });
  },
  setFont: (font: string) => {
    set((draft) => {
      draft.font = font;
    });
  },
  setFonts: (list: string[]) => {
    set((draft) => {
      draft.fonts = list;
    });
  },
  updateSelected: (id: string) => {
    set((draft) => {
      draft.selected = id;
    });
  },
  addOneImage: (url: string) => {
    set((draft) => {
      draft.photos.push({ url, id: getRandString() });

      return draft;
    });
  },
  updateStep: (nextStep: number) => {
    set((draft) => {
      draft.step = nextStep;

      return draft;
    });
  },
}));

export default usePhotoStore;
