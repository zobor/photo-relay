import { useEffect } from 'react';

export function useResize(callback: any) {
  useEffect(() => {
    const resize = () => {
      callback();
    };

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('reset', resize);
    };
  }, []);
}

export function useHotKey({
  keyUpCallback,
  keyDownCallback,
}: {
  keyUpCallback: (e: React.KeyboardEvent) => void;
  keyDownCallback: (e: React.KeyboardEvent) => void;
}) {
  useEffect(() => {
    // 键盘事件
    const keyDown = (e: any) => {
      if (keyDownCallback) {
        keyDownCallback(e);
      }
    };
    const keyUp = (e: any) => {
      if (keyUpCallback) {
        keyUpCallback(e);
      }
    };

    document.addEventListener('keydown', keyDown);
    document.addEventListener('keyup', keyUp);

    return () => {
      document.removeEventListener('keydown', keyDown);
      document.removeEventListener('keyup', keyUp);
    };
  }, []);
}

export function useDisableMouseWheel() {
  useEffect(() => {
    function onWheel(e: MouseEvent) {
      e.preventDefault();
    }
    window.addEventListener('wheel', onWheel, { passive: false });
  }, []);
}
