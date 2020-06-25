const fs = require('fs');

fs.readdir('./src', (err, files) => {
  files.forEach(file => {
    console.log(file);
  });
});