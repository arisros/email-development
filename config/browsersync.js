const { DIR_DEVELOPMENT, DIR_PATH } = require('./constants');

const config = {
  injectChanges: true,
  files: `${DIR_PATH.temp}/${DIR_DEVELOPMENT}/template.html`,
  server: {
    baseDir: `./${DIR_PATH.temp}/${DIR_DEVELOPMENT}/`,
    index: 'template.html'
  },
};

module.exports = config;
