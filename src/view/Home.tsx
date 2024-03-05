import { useRef } from 'react';
import logo from '../assets/images/logo.webp';
import Icon from '../components/Icon';
import UploadImage from '../components/UploadImage';
import useDrag from '../hooks/useDrag';
import usePaste from '../hooks/usePaste';
import usePhotoStore from '../store/photo';
import './Home.scss';

export default function Home() {
  const input = useRef<HTMLInputElement>(null);
  const { addOneImage, updateStep, photos } = usePhotoStore();
  const dragRef = useRef<HTMLDivElement>(null);
  const onUploadedImages = (dataURLArray: string[]) => {
    if (Array.isArray(dataURLArray) && dataURLArray.length) {
      dataURLArray.forEach((dataURL: string) => addOneImage(dataURL));
      updateStep(2);
    }
  };

  usePaste((dataURL: any) => {
    addOneImage(dataURL as string);
    updateStep(2);
  });

  useDrag(dragRef, (dataURL: any) => {
    addOneImage(dataURL as string);
    updateStep(2);
  });

  return (
    <div className="homePage grid-background" ref={dragRef}>
      <div className="github" />
      <Icon
        className={['githubIcon']}
        type="github"
        fill="#FFF"
        onClick={() => window.open('https://www.github.com/zobor/photo-relay')}
      />
      <div className="top">
        <div className="logo">
          <img className="logoImage" src={logo} />
          <span className="flex-center">PHOTORELAY</span>
        </div>
        <div className="desc">Beautify your pictures in a simple way by cropping, merging, and stickers</div>
      </div>
      <div className="bottom">
        <div className="upload">
          <div className="btnArea">
            <div className="icons flex-center">
              <img
                className="btnImage"
                onClick={() => updateStep(5)}
                src="https://img.duelpeak.com/duelpeak/202312/dce67fa7f4efcee69a8862c33e097d6441745520e1801a2fed0e7de9dab80ac2.svg"
              />
              {/* <img
                className="btnImage"
                onClick={() => undefined}
                src="https://img.duelpeak.com/duelpeak/202312/17a80d02fd2761db0b41e68424122ea5d4cd7a624f5582d24d9c8f65413c9931.png"
                style={{ transform: 'scale(0.8)' }}
              /> */}
              <img
                className="btnImage"
                onClick={() => updateStep(2)}
                src="https://img.duelpeak.com/duelpeak/202312/b0b8880989382012a49a0f4e39895e13649ff18fcccdb6f1421838064e2a7ae0.svg"
              />
            </div>
            <span className="btnText" onClick={() => input.current?.click()}>
              Drop Or Paste Image Here
            </span>
          </div>
        </div>
        <footer className="footer">
          <a href="https://www.duelpeak.com/article/100.html" target="_blank">
            @duelpeak
          </a>
          <UploadImage onChange={onUploadedImages} myRef={input} />
        </footer>
      </div>
    </div>
  );
}
