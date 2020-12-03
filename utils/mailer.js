const mailer = require('nodemailer');

const transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'barrygims@gmail.com',
      pass: '669750160Ab'
    }
  });


const sendMail = (mailOptions, func) => {
    mailOptions.from = 'admin@barry.com';
    console.log(mailOptions)
    transporter.sendMail(mailOptions, func);
};

module.exports = sendMail;