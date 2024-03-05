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
  keyUpCallback: () => void;
  keyDownCallback: (keyCode: number) => void;
}) {
  useEffect(() => {
    // 键盘事件
    const keyDown = (e: KeyboardEvent) => {
      if (keyDownCallback) {
        keyDownCallback(e.keyCode);
      }
      if (e.keyCode === 32) {
        e.preventDefault();
      }
    };
    const keyUp = () => {
      if (keyUpCallback) {
        keyUpCallback();
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
