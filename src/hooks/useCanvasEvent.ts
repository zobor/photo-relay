/**
 * fabricjs events doc: https://github.com/fabricjs/fabric.js/wiki/Working-with-events
 * fabricjs events demo: http://fabricjs.com/events
 */
import { rx } from '@/common/rx';
import { get } from 'lodash';
import { useEffect } from 'react';
import api from '../view/artboard/apiServices';

export function useCanvasEvent(ready: boolean) {
  useEffect(() => {
    if (!api.canvas) return;
    // selection
    api.canvas.on('before:selection:cleared', (event: any) => {
      console.log('before:selection:cleared');
    });
    api.canvas.on('selection:updated', (event: any) => {
      console.log('selection:updated');
      rx.next({
        type: 'selection:updated',
        data: get(event, 'selected[0]'),
      });
    });
    api.canvas.on('selection:cleared', (event: any) => {
      console.log('clear');
      rx.next({
        type: 'selection:cleared',
      });
    });
    api.canvas.on('selection:created', (event: any) => {
      console.log('selection:created');
      rx.next({
        type: 'selection:created',
        data: get(event, 'selected[0]'),
      });
    });
    api.canvas.on('object:moving', (event: any) => {
      console.log('object:moving');
      rx.next({
        type: 'object:moving',
        data: event.target,
      });
    });

    // object
    api.canvas.on('object:added', (event: any) => {
      console.log('object:added');
      rx.next({
        type: 'object:added',
        data: get(event, 'selected[0]'),
      });
    });
    api.canvas.on('object:modified', (event: any) => {
      console.log('object:modified');
      rx.next({
        type: 'object:modified',
        data: event.target,
      });
    });
    api.canvas.on('object:removed', (event: any) => {
      rx.next({
        type: 'object:removed',
      });
    });
    api.canvas.on('object:scaling', (event: any) => {
      rx.next({
        type: 'object:scaling',
        data: event.target,
      });
    });

    // mouse
    api.canvas.on('mouseup:before', (event: any) => {
      rx.next({
        type: 'mouseup:before',
        data: event,
      });
    });

    api.canvas.on('after:render', (event: any) => {
      rx.next({
        type: 'after:render',
      });
    });
  }, [ready]);
}
