const sharp = require("sharp");

const reduceSize = image => {
  return new Promise((resolve, reject) => {
    sharp(image)
      .resize(100, undefined)
      .toBuffer()
      .then(data => {
        resolve(data);
      })
      .catch(err => reject(err));
  });
};

module.exports = { reduceSize };
