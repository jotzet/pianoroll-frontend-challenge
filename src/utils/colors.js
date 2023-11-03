export function generateGradientTable(startColor, endColor, steps) {
  const gradientTable = [];
  for (let i = 0; i < steps; i++) {
    const r = startColor.r + ((endColor.r - startColor.r) * i) / (steps - 1);
    const g = startColor.g + ((endColor.g - startColor.g) * i) / (steps - 1);
    const b = startColor.b + ((endColor.b - startColor.b) * i) / (steps - 1);
    gradientTable.push(
      `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`
    );
  }
  return gradientTable;
}

// export function getVelocityFromColor(color) {
//   const rgbRegex = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/;
//   const match = color.match(rgbRegex);
//   if (match) {
//     const r = parseInt(match[1], 10);
//     const g = parseInt(match[2], 10);
//     const b = parseInt(match[3], 10);
//     const velocity = Math.round((r + g + b) / 3);
//     return velocity;
//   } else {
//     return 0;
//   }
// }
