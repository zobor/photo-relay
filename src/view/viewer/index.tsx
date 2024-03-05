import usePhotoStore from '@/store/photo';
import './index.scss';
import Icon from '@/components/Icon';

export default function Viewer() {
  const { updateStep } = usePhotoStore();
  const { selected, photos } = usePhotoStore();
  const img: any = photos.find((item) => item.id === selected);
  return (
    <div className="Viewer fillPage flex-center">
      <div className="img-box">
        <div className="close flex-center" onClick={() => updateStep(2)}>
          <Icon type="close" fill="#FFF" />
        </div>
        <img src={img.url} />
      </div>
    </div>
  );
}
