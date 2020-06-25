const env = require('gulp-env');
env({ 
  file: '.env.json'
});
const to = {
  subject: process.env.SUBJECT,
  to: [process.env.TO],
  cc: [process.env.CC],
  from: process.env.FROM,
  smtp: {
    auth: {
      user: process.env.AUTH_USER,
      pass: process.env.AUTH_PASS,
    },
    host: process.env.SMTP_HOST,
    secureConnection: process.env.SMTP_SECURE_CONNECTION,
    port: process.env.SMTP_PORT,
  }
}

module.exports = to