const mailer = require('nodemailer');

const transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'kernelpanicg1@gmail.com',
      pass: 'insacvl1234@'
    }
  });


const sendMail = (mailOptions, func) => {
    mailOptions.from = 'admin@kernelpanic.com';
    console.log(mailOptions)
    transporter.sendMail(mailOptions, func);
};

module.exports = sendMail;