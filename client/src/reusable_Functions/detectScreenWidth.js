export const detectWidth = (currentWidth) => {
    const width = currentWidth;
    //console.log(`Window width: ${width}px`);
    return width;
}
detectWidth();
window.addEventListener("resize", detectWidth);
  

