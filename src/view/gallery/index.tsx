import classnames from 'classnames';
import './index.scss';
import usePhotoStore from '../../store/photo';
import Icon from '@/components/Icon';
import useArtboardStore from '@/store/artboard';
import { Badge } from '@chakra-ui/react';
import Empty from '@/components/Empty';

function Gallery() {
  const { photos, updateSelected, selected, updateStep } = usePhotoStore();
  const { updatePresetBackGround } = useArtboardStore();
  const onClick = (id?: string) => {
    updateSelected(id as string);
  };
  const onSelectImageForArtboard = () => {
    const img = photos.find((item) => item.id === selected);

    if (img) {
      updatePresetBackGround(img.url as string);
    }

    updateStep(5);
  };

  return (
    <div className="gallery fullPage grid-background flex-dir-column">
      <h1 className="flex-center">PHOTORELAY GALLERY</h1>
      <div className="galleryBox flex-center">
        <div className="close flex-center" onClick={() => updateStep(1)}>
          <Icon type="close" />
        </div>
        {!photos.length ? <Empty /> : null}
        {photos.map(({ url, id }) => (
          <div
            onClick={onClick.bind(null, id)}
            className={classnames('imgCard flex-center', {
              selected: selected === id,
            })}
            key={id}
          >
            <img src={url} />
            <div className="btns flex-center">
              <Badge cursor="pointer" colorScheme="purple" onClick={() => updateStep(3)}>
                Cropper
              </Badge>
              <Badge cursor="pointer" colorScheme="purple" onClick={() => updateStep(4)}>
                Detail
              </Badge>
              <Badge cursor="pointer" colorScheme="purple" onClick={onSelectImageForArtboard}>
                Artboard
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
