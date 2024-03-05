import { createRoot } from 'react-dom/client';
import App from './App';
import './style.css';

const container = document.getElementById('root');

const root = createRoot(container!);

root.render(<App />);

console.log('v: ', import.meta.env.__RELEASE__);
