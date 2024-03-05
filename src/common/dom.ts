export const moveCenter = () => {
  const art = document.querySelector('#artboard');
  if (art) {
    art.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'center',
    });
  }
};
