export async function getLocalFonts(): Promise<string[]> {
  const pickedFonts = await (self as any).queryLocalFonts();
  const hash: Record<string, number> = {};
  for (const fontData of pickedFonts) {
    const { family } = fontData;
    hash[family] = 1;
  }

  return Object.keys(hash);
}
