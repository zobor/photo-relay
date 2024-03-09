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
