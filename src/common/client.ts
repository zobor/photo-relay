export function getDPR(): number {
  return window.devicePixelRatio;
}

export function getDPI(): number {
  return window.devicePixelRatio * 96;
}

export type PaperSizes = {
  [key in 'A1' | 'A2' | 'A3' | 'A4']: {
    width: number;
    height: number;
  };
};

export const paperSizes: PaperSizes = {
  A1: { width: 23.4, height: 33.1 },
  A2: { width: 16.5, height: 23.4 },
  A3: { width: 11.7, height: 16.5 },
  A4: { width: 8.3, height: 11.7 },
};

export function getPaperSize(size: keyof PaperSizes): { width: number; height: number } | Error {
  const dpi = 96;

  if (paperSizes.hasOwnProperty(size)) {
    const widthInches = paperSizes[size].width;
    const heightInches = paperSizes[size].height;

    const widthPixels = Math.round(widthInches * dpi);
    const heightPixels = Math.round(heightInches * dpi);

    const DPR = getDPR();

    return { width: widthPixels * DPR, height: heightPixels * DPR };
  } else {
    return new Error('Invalid paper size');
  }
}

export function loadScriptSync(url: string, props: Record<string, string | number | boolean>) {
  return new Promise<void>((resolve) => {
    const script: any = document.createElement('script');
    if (script.readyState) {
      script.onreadystatechange = function () {
        if (script.readyState == 'loaded' || this.readyState == 'complete') {
          resolve();
        }
      };
    } else {
      script.onload = () => {
        resolve();
      };
    }
    script.src = url;
    Object.keys(props || {}).forEach((key) => {
      script.setAttribute(key, props[key]);
    });
    document.head.appendChild(script);
  });
}
