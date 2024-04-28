import _ from 'lodash';

export function rand(min: number, max: number): number {
  return parseInt(`${Math.random() * (max - min + 1) + min}`, 10);
}

export function getRandString(len = 12): string {
  const base = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const max = base.length - 1;
  return Array(len)
    .fill(undefined)
    .map((_, idx) => base[rand(idx === 0 ? 10 : 0, max)])
    .join('');
}

export function getCurrentDate(): string {
  const now: Date = new Date();
  const year: number = now.getFullYear();
  const month: number = now.getMonth() + 1;
  const day: number = now.getDate();

  // 添加前导零，确保月份和日期为两位数
  const formattedMonth: string = month < 10 ? `0${month}` : `${month}`;
  const formattedDay: string = day < 10 ? `0${day}` : `${day}`;

  return `${year}-${formattedMonth}-${formattedDay}`;
}

export function rgbaToHex(rgba: string): string {
  if (typeof rgba !== 'string') {
    return '';
  }
  const values: any = rgba.replace(/[\sa-z()]/ig, '').split(',');

  if (values.length < 3 || values.length > 4) {
    return '';
  }

  const hex =
    '#' +
    values
      .slice(0, 3)
      .map((value: string) => {
        const hexValue = parseInt(value, 10).toString(16);
        return hexValue.length === 1 ? '0' + hexValue : hexValue;
      })
      .join('');

  return hex;
}

export function removeUndefined(data: Record<string, any>) {
  return _.omitBy(data, _.isNil);
}

export function sortArray(arr1: any[], arr2: any[]) {
  const arr1Map = new Map(arr1.map((item: string) => [item, true]));
  const combinedArr = arr1.concat(arr2);
  combinedArr.sort((a, b) => {
    if (arr1Map.has(a) && !arr1Map.has(b)) {
      return -1;
    } else if (!arr1Map.has(a) && arr1Map.has(b)) {
      return 1;
    } else {
      return a - b;
    }
  });
  return combinedArr;
}
