// https://github.com/fengyuanchen/cropperjs
import 'cropperjs/dist/cropper.css';
import { useEffect, useRef, useState } from 'react';
import Cropper, { ReactCropperElement } from 'react-cropper';
import { dataURLtoFile, downloadFile } from '../../common/file';
import { getRandString } from '../../common/math';
import './index.scss';
import usePhotoStore from '@/store/photo';

const { innerWidth: maxWidth, innerHeight: maxHeight } = window;

export default function CropperPic() {
  const { photos, updateStep, selected, updateImage } = usePhotoStore();
  const image: any = photos.find((item) => item.id === selected);
  const cropperRef = useRef<ReactCropperElement>(null);
  const [imageSize, setImageSize] = useState<{ width?: number; height?: number }>({});
  const [stat, setStat] = useState<{ width?: number; height?: number }>({});
  const onCrop = () => {
    const cropper: any = cropperRef.current?.cropper;
    const { top, left, width, height } = cropper.getCropBoxData();
    setStat({ width: parseInt(width, 10), height: parseInt(height, 10) });
  };
  const onExport = () => {
    const cropper: any = cropperRef.current?.cropper;
    const str = cropper.getCroppedCanvas().toDataURL();
    const filename = `${getRandString()}.png`;
    const file = dataURLtoFile(str, filename);
    downloadFile(file, filename);
  };
  const presetBox = ({ width, height }: any) => {
    const cropper: any = cropperRef.current?.cropper;
    cropper.setCropBoxData({ width, height });
  };
  const onSave = () => {
    const cropper: any = cropperRef.current?.cropper;
    const str = cropper.getCroppedCanvas().toDataURL();
    updateImage(selected, { url: str });
    updateStep(2);
  };

  useEffect(() => {
    const img = new Image();
    img.src = image.url;
    img.onload = () => {
      setImageSize({ width: Math.min(img.width, maxWidth), height: Math.min(img.height, maxHeight) });
    };
  }, [image]);

  if (!imageSize.width || !imageSize.height) return null;

  return (
    <div className="cropper-page">
      <div className="cropper-box-wrap fullPage flex-center">
        <Cropper
          src={image?.url}
          className="cropper-box"
          style={imageSize}
          // Cropper.js options
          initialAspectRatio={imageSize.width / imageSize.height}
          zoomTo={1}
          crop={onCrop}
          ref={cropperRef}
          // viewMode={2}
          minCropBoxHeight={50}
          minCropBoxWidth={50}
          // autoCropArea={1}
          guides={true}
          responsive={true}
          rotatable
        />
      </div>
      <div className="control">
        <div className="button-2">
          width: {stat.width} height: {stat.height}
        </div>
        <button className="button-17" onClick={() => presetBox({ width: 800, height: 520 })}>
          800 x 520
        </button>
        <button className="button-17" onClick={onExport}>
          Download
        </button>
        <button className="button-17" onClick={onSave}>
          Save
        </button>
      </div>
    </div>
  );
}
