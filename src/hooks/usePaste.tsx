import { getClipboardData, readLocalFileAsDataURL } from '@/common/file';
import { useEffect } from 'react';

type usePasteCallback = (dataURL: string) => void;
export default function usePaste(callback: usePasteCallback) {
  useEffect(() => {
    const onPaste = async (e: ClipboardEvent) => {
      const file = await getClipboardData(e);

      // read image from web browser
      if (typeof file === 'string' && file.startsWith('data:image/')) {
        callback(file);
      } else {
        // read image from local pc file
        readLocalFileAsDataURL(file as any).then((dataURL: any) => {
          callback(dataURL);
        });
      }
    };
    document.addEventListener('paste', onPaste);

    return () => {
      document.removeEventListener('paste', onPaste);
    };
  }, []);
}
