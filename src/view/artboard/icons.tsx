interface SVGS {
  [key: string]: {
    default: string;
  };
}
const svgs: SVGS = import.meta.glob('@/assets/icons/*.svg', { eager: true });
const icons = Object.keys(svgs).map((key) => svgs[key].default);

export default icons;
