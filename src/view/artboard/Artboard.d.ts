namespace NSArtboard {
  type Position = {
    left?: number;
    top?: number;
  };

  type SelectedType = '' | 'i-text' | 'image' | 'group';

  type TextStyles = {
    color?: string;
    fontWeight?: string;
    fontSize?: number;
    fontFamily?: string;
    fill?: string;
    shadowColor?: string;
    borderWidth?: number;
    borderColor?: string;
    fontStyle?: string;
    underline?: boolean;
    overline?: boolean;
    linethrough?: boolean;
  };

  type Dir = 'top' | 'right' | 'bottom' | 'left' | 'center';

  interface addImageParams {
    imageTag: HTMLImageElement;
    width: number;
    height: number;
    selectable?: boolean;
    autocenter?: boolean;
    position?: Position;
    scale?: number;
    autoFocus?: boolean;
    removeCurrentSelected?: boolean;
  }

  interface addImageFromURLParams {
    url: string;
    selectable?: boolean;
    scale?: number;
    position?: Position;
  }

  interface insertTextParams {
    text?: string;
    defaultStyle: Partial<TextStyles>;
    autocenter?: boolean;
    scale?: number;
  }
}
