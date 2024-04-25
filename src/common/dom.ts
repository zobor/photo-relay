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

export const copy = (text: string) => {
  const invokeCopy = (textToCopy: string) => {
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = textToCopy;
    tempTextArea.style.cssText = 'position: absolute; top: -9999px; left: -9999px;';
    document.body.appendChild(tempTextArea);

    tempTextArea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextArea);
  };
  invokeCopy(text);
};

export const fetchSVG = (url: string, size = 64): Promise<string> => {
  return new Promise((resolve) => {
    fetch(url)
      .then((rs) => rs.text())
      .then((svg) => {
        const str = svg
          .replace('<svg ', `<svg width='${size}' height='${size}' `)
          .replace('<path ', svg.includes('fill=') ? '<path ' : '<path fill="#333" ');
        const dataURL = 'data:image/svg+xml,' + encodeURIComponent(str);

        resolve(dataURL);
      })
      .catch((err) => {
        console.error(err);
      });
  });
};
