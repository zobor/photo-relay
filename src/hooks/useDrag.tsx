import { readLocalFileAsDataURL } from '@/common/file';
import { useEffect } from 'react';

export default function useDrag(drag: any, callback: (dataURL: string) => void) {
  useEffect(() => {
    const drag$: any = drag.current;
    drag$.addEventListener('dragenter', function (e: any) {
      e.preventDefault();
      e.stopPropagation();
    });

    drag$.addEventListener('dragover', function (e: any) {
      e.preventDefault();
      e.stopPropagation();
    });
    drag$.addEventListener('dragleave', function (e: any) {
      e.preventDefault();
      e.stopPropagation();
    });

    drag$.addEventListener('drop', function (e: any) {
      e.preventDefault();
      e.stopPropagation();

      const df = e.dataTransfer;
      const dropFiles = [];

      if (df.items !== undefined) {
        for (let i = 0; i < df.items.length; i++) {
          const item = df.items[i];
          if (item.kind === 'file' && item.webkitGetAsEntry().isFile) {
            const file = item.getAsFile();
            dropFiles.push(file);
          }
        }
        if (dropFiles?.length) {
          dropFiles.forEach((file) => {
            readLocalFileAsDataURL(file).then((dataURL) => {
              callback(dataURL);
            });
          });
        }
      }
    });
  }, []);
}
