import { lazy } from 'react';
import './App.css';
import { LazyComponent } from './components/Loading';
import usePhotoStore from './store/photo';

const Home = lazy(() => import('./view/Home'));
const View = lazy(() => import('./view'));

export default function App(): any {
  const { step } = usePhotoStore();

  switch (step) {
    case 1:
      return (
        <LazyComponent>
          <Home />
        </LazyComponent>
      );
    default:
      return (
        <LazyComponent>
          <View />
        </LazyComponent>
      );
  }
}
