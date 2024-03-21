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
    'https://img.duelpeak.com/duelpeak/202403/a678b63e5b96eb6d65ea7e258b96277590d8ccc8f781f1caf591346e5ce65ea3.webp',
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
      2: [
        {
          type: 'resizeArtboard',
          props: {
            width: 724 * dpr,
            height: 1024 * dpr,
          },
        },
        {
          type: 'setBackgroundColor',
          props: {
            color: 'rgb(24, 72, 92)',
          },
        },
        {
          type: 'insertText',
          props: {
            text: 'MONDAY & TUESDAY 5PM · 9AM',
            autocenter: false,
            defaultStyle: {
              fontFamily: 'Lucida Handwriting',
              left: 108,
              top: 30,
              fontSize: 30,
              fill: 'rgb(217, 205, 181)',
            },
          },
        },
        {
          type: 'insertText',
          props: {
            text: 'FREE',
            autocenter: false,
            defaultStyle: {
              fontFamily: 'Lucida Handwriting',
              left: 219,
              top: 82,
              fontSize: 100,
              fill: 'rgb(205, 158, 77)',
            },
          },
        },
        {
          type: 'insertText',
          props: {
            text: 'LOCAL',
            autocenter: false,
            defaultStyle: {
              fontFamily: 'Lucida Handwriting',
              left: 190,
              top: 172,
              fontSize: 100,
              fill: 'rgb(205, 158, 77)',
            },
          },
        },
        {
          type: 'insertText',
          props: {
            text: 'Deliver',
            autocenter: false,
            defaultStyle: {
              fontFamily: 'Snell Roundhand',
              left: 2,
              top: 206,
              fontSize: 150,
              fill: 'rgb(202, 196, 196)',
            },
            scale: 1.65,
          },
        },
        {
          type: 'addImageFromURL',
          props: {
            url: 'https://img.duelpeak.com/duelpeak/202403/9c8e5e44a4587729e8f6ca12f5233bbfe96575c1c0ce7f6f7c9f0d0b7a87af38.webp',
            position: {
              left: -17,
              top: 258,
            },
            scale: 1.48,
            autoFocus: false,
          },
        },
        {
          type: 'insertRect',
          props: {
            fill: 'rgb(24, 72, 92)',
            stroke: 'rgb(205, 158, 77)',
            width: 500,
            left: 100,
            top: 744,
            strokeWidth: 1,
          },
        },
        {
          type: 'insertText',
          props: {
            text: 'CALL 123 456 78 OR ORDER ONLINE\nWWW.DUELPEAK.COM',
            autocenter: false,
            defaultStyle: {
              fontFamily: 'Arial Black',
              left: 150,
              top: 772,
              fontSize: 20,
              fill: 'rgb(205, 158, 77)',
              textAlign: 'center',
            },
          },
        },
        {
          type: 'insertText',
          props: {
            text: 'CopyRight @DuelPeak.com',
            autocenter: false,
            defaultStyle: {
              fontFamily: 'Arial Black',
              left: 200,
              top: 919,
              fontSize: 20,
              fill: '#FFF',
              textAlign: 'center',
            },
          },
        },
      ],
    };

    if (id) return data[id];

    return data;
  };

  delay = (timeout: number) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, timeout);
    });
  };

  run = async (id: number) => {
    const tasks: any = this.data(id);
    // tasks.forEach(async (task: any) => {
    //   const fn = (this as any)[task.type] || (this as any).api[task.type];

    //   if (fn.constructor.name === 'AsyncFunction') {
    //     await fn(task.props);
    //   } else {
    //     fn(task.props);
    //   }
    //   (this as any).api.unSelectAll();
    // });

    for (const task of tasks) {
      const fn = (this as any)[task.type] || (this as any).api[task.type];

      if (fn.constructor.name === 'AsyncFunction') {
        await fn(task.props);
      } else {
        fn(task.props);
      }
      // await this.delay(300);
      (this as any).api.unSelectAll();
    }
  };
}
