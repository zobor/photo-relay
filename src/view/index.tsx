import { ChakraProvider } from '@chakra-ui/react';
import { lazy, useMemo } from 'react';
import usePhotoStore from '../store/photo';
import { LazyComponent } from '../components/Loading';

const Gallery = lazy(() => import('./gallery'));
const Artboard = lazy(() => import('./artboard'));
const Cropper = lazy(() => import('./cropper'));
const Viewer = lazy(() => import('./viewer'));

export default function View(): any {
  const { step } = usePhotoStore();
  const ShowTheView = useMemo(() => {
    switch (step) {
      case 2:
        return (
          <LazyComponent>
            <Gallery />
          </LazyComponent>
        );
      case 3:
        return (
          <LazyComponent>
            <Cropper />
          </LazyComponent>
        );
      case 4:
        return (
          <LazyComponent>
            <Viewer />
          </LazyComponent>
        );
      case 5:
        return (
          <LazyComponent>
            <Artboard />
          </LazyComponent>
        );
      default:
        break;
    }
  }, [step]);

  return <ChakraProvider>{ShowTheView}</ChakraProvider>;
}
