function getRect(image) {
  let width = image.naturalWidth;
  let height = image.naturalHeight;
  return { width, height };
}
function toBlob(image, quality) {
  const rect = getRect(image);
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    if (!canvas.getContext) {
      reject('Unsupport Canvas!');
    } else {
      const ctx = canvas.getContext('2d');
      canvas.width = rect.width;
      canvas.height = rect.height;
      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.drawImage(image, 0, 0, rect.width, rect.height);
      const done = (blob) => {
        if (blob) {
          resolve(blob);
        }
      }
      // 导出为jpg和webp格式的时候quality参数才有效果
      canvas.toBlob(done, 'image/webp', quality);
    }
  });
}
function compressImage(url, quality, cb) {
  const image = new Image();
  image.src = url
  image.onload = () => {
    toBlob(image, quality).then(bolb => {
      cb(bolb)
    })
  }
}
export default compressImage