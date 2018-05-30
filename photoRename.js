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

  // let name = baseName.replace("undefined-", "");
  // name = name.replace(".jpg_undefined", ".jpg")
  // let newName = `images/${name}`;

  console.log(`rename ${imagePath} to ${newName}!`);
  rename(imagePath, newName);
}

function renameWithPre(imagePath, pre) {
  let baseName = path.basename(imagePath);
  let newName = `images/${pre}-${baseName}`;

  console.log(`rename ${imagePath} to ${newName}!`);
  rename(imagePath, newName);
}

function renameWithExif(imagePath) {
  try {
    new ExifImage({ image: imagePath }, function (error, exifData) {
      if (error) {
        console.log('Error: ' + error.message);
      } else {
        // console.log(exifData.exif);
        let createDate = exifData.exif.DateTimeOriginal ?
          exifData.exif.DateTimeOriginal :
          exifData.exif.createDate;
        
        if (createDate) {
          let arr = createDate.toString().substring(0, 10).split(":");
          let pre = arr.join("");
          if (pre !== "00000000") {
            renameWithPre(imagePath, pre);
          }
        }     
      }
    });
  } catch (error) {
    console.log('Error: ' + error.message);
  }
}

function readdir(dirPath) {
  fs.readdir(dirPath, function (err, files) {
    if (err) {
      console.log(err);
    } else {
      console.log(files);
      for (var i = 0; i < files.length; i++) {
        // 1. renameWithExif
        // renameWithExif(dirPath + '/' + files[i]);

        // 2. renameWithPre
        let pre = "20170202";
        renameWithPre(dirPath + '/' + files[i], pre);

        // 3. renameForDate
        // renameForDate(dirPath + '/' + files[i]);
      }
    }
  })
}

const imagePath = "images";
readdir(imagePath);