import { isFileLike } from './is';

export async function getFileFromNavClipboard(): Promise<Blob | undefined> {
  let file;
  const item_list = await navigator.clipboard.read();
  const [clipboardItem] = item_list || [];
  if (clipboardItem && clipboardItem.types && clipboardItem.types.length) {
    const latestType = clipboardItem.types[clipboardItem.types.length - 1];
    file = await clipboardItem.getType(latestType);
  }

  return file;
}

export function getFileFromClipboard(event: any) {
  const { clipboardData } = event || window;
  const { items } = clipboardData;

  let file = null;
  if (items && items.length) {
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        file = items[i].getAsFile();
        break;
      }
    }
  }

  return file;
}

export function getClipboardData(e: ClipboardEvent): Promise<string> {
  return new Promise(async (resolve) => {
    let file;
    try {
      file = await getFileFromClipboard(e);
      if (!isFileLike(file)) {
        file = await getFileFromNavClipboard();
      }
    } catch (err) {
      // ...
    }
    if (file) {
      getFileBase64(file).then((rs) => {
        resolve(rs);
      });
    } else {
      resolve('');
    }
  });
}

export function getFileBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const isImage = isFileLike(file) && file.type.includes('image');
    if (isImage) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result as string);
      };
    } else {
      console.log(file);
      reject(new Error(`The selected file is not in image format, your file type=${file.type}`));
    }
  });
}

export function readLocalFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (evt: any) => {
      resolve(evt.target.result as string);
    };
    reader.readAsDataURL(file);
  });
}

export function downloadFile(file: any, fileName: string) {
  const dataURL = URL.createObjectURL(file);
  const a = document.createElement('a');
  const filename = fileName || `file_${+new Date()}`;
  a.href = dataURL;
  a.setAttribute('download', filename);
  a.innerHTML = 'downloading...';
  a.style.display = 'none';
  document.body.appendChild(a);
  setTimeout(() => {
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(dataURL);
  }, 66);
}

export function dataURLtoFile(dataurl: string, filename: string): File {
  const arr = dataurl.split(',');
  const mime = (arr[0].match(/:(.*?);/) || [])[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n) {
    n -= 1;
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}

export function fetchText(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((rs) => rs.text())
      .then((text) => {
        resolve(text);
      })
      .catch(() => {
        reject();
      });
  });
}

export function getImageRect(url: string): Promise<{ width: number; height: number }> {
  const img = new Image();
  return new Promise((resolve) => {
    img.src = url;
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height,
      });
    };
  });
}
