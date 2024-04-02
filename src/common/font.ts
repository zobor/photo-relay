export const localFont: {
  list: string[];
} = {
  list: [],
};

export async function getLocalFonts(): Promise<string[]> {
  if (localFont.list.length) {
    return Promise.resolve(localFont.list);
  }
  const pickedFonts = await (self as any).queryLocalFonts();
  const hash: Record<string, number> = {};
  for (const fontData of pickedFonts) {
    const { family } = fontData;
    hash[family] = 1;
  }

  localFont.list = Object.keys(hash);

  return localFont.list;
}
