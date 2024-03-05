import { Draft } from 'immer';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type SetFunction<T> = (fn: (state: Draft<T>) => void) => void;
type GetFunction<T> = () => T;

/**
 * 创建一个Store对象.
 * 集成了redux toolkit、immer
 *
 * @param stateFactory {Function} (set, get) => {}
 * @param ns {String} store的命名空间
 * @returns ReturnType<create>
 */
export default function createStore<T>(stateFactory: (set: SetFunction<T>, get: GetFunction<T>) => T, ns?: string) {
  return create<T>()(devtools(immer(stateFactory)));
}
