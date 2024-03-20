import { getDPR } from '@/common/client';

const dpr = getDPR();

export default class Template {
  init = (extendsApi: any) => {
    for (const api in extendsApi) {
      (this as any)[api] = extendsApi[api];
    }
  };

  demos = [
    'https://img.duelpeak.com/duelpeak/202403/c2f7273b11ec9c76bb64f8f02063f154e812041654f6e8c12d7780c715c72e79.webp',
  ];

  data = (id: number) => {
    const data: Record<string, any[]> = {
      1: [
        {
          type: 'resizeArtboard',
          props: {
            width: 800 * dpr,
            height: 520 * dpr,
          },
        },
        {
          type: 'setBackgroundColor',
          props: {
            color: 'rgb(179, 102, 204)',
          },
        },
        {
          type: 'addImageFromURL',
          props: {
            url: 'https://img.duelpeak.com/duelpeak/202403/7b918aa98b05449576dd1791e70e13bb385b7613831925cc592a56c1c4968623.webp',
            position: {
              left: 56,
              top: 162,
            },
          },
        },
        {
          type: 'insertText',
          props: {
            text: 'PhotoRelay',
            autocenter: false,
            defaultStyle: {
              fontFamily: 'Lucida Handwriting',
              left: 304,
              top: 235,
              fill: '#FFF',
            },
          },
        },
      ],
    };

    if (id) return data[id];

    return data;
  };

  run = (id: number) => {
    const tasks: any = this.data(id);
    tasks.forEach(async (task: any) => {
      const fn = (this as any)[task.type] || (this as any).api[task.type];

      if (fn.constructor.name === 'AsyncFunction') {
        await fn(task.props);
      } else {
        fn(task.props);
      }
      (this as any).api.unSelectAll();
    });
  };
}
