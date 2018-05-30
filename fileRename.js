const ExifImage = require('exif').ExifImage;
const fs = require('fs');
const path = require('path');

function rename(oldPath, newPath) {
  fs.rename(oldPath, newPath, function (err) {
    if (err) {
      console.log(err);
      throw err;
    }
  })
}

function renameForDate(imagePath) {
  let baseName = path.basename(imagePath);
  let arr = baseName.split("_");
  let newName = `images/${arr[1]}-${arr[0]}_${arr[2]}`;

  console.log(`rename ${imagePath} to ${newName}!`);
  rename(imagePath, newName);
}

function renameWithPre(imagePath, pre) {
  let dirPath = path.dirname(imagePath);
  let baseName = path.basename(imagePath);
  const index = baseName.indexOf("【爱上古诗】");
  baseName = baseName.substring(index);
  let newName = `${dirPath}/${baseName}`;

  console.log(`rename ${imagePath} to ${newName}!`);
  rename(imagePath, newName);
}

function readdir(dirPath) {
  fs.readdir(dirPath, function (err, files) {
    if (err) {
      console.log(err);
    } else {
      console.log(files);
      for (var i = 0; i < files.length; i++) {
        // 2. renameWithPre
        let pre = "";
        renameWithPre(dirPath + '/' + files[i], pre);

        // 3. renameForDate
        // renameForDate(dirPath + '/' + files[i]);
      }
    }
  })
}

const imagePath = "/Users/wubill/Movies/爱上古诗";
readdir(imagePath);