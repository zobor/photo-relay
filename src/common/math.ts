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
