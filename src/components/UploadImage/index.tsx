import { forwardRef, useRef } from 'react';
import { readLocalFileAsDataURL } from '../../common/file';

interface UploadImageProps {
  onChange: (dataURLArray: string[]) => void;
  myRef: any;
}

export default function UploadImage({ onChange, myRef }: UploadImageProps) {
  const form: any = useRef();
  const onSelected = (e: any) => {
    const files = e.target.files;
    Promise.all(Array.from(files).map((file: any) => readLocalFileAsDataURL(file))).then((dataURLArray) => {
      onChange(dataURLArray);
    });

    form.current?.reset();
  };

  return (
    <form ref={form} style={{ display: 'none' }}>
      <input ref={myRef} multiple type="file" onChange={onSelected} />
    </form>
  );
}

export const UploadImageForward = forwardRef((props: UploadImageProps, myRef) => (
  <UploadImage {...props} myRef={myRef} />
));
