const nodemailer = require("nodemailer");

//for Node Mailer
//const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "test.test@gmail.com",
    pass: "test123"
  }
});
// Accept mail
const mailOptions1 = {
  from: '"test" <test.test@gmail.com>',
  to: "test2.test@gmail.com",
  subject: "Mail for Application",
  text: "your application is accepted for licence"
};
//reject mail
const mailOptions2 = {
  from: '"test" <test.test@gmail.com>',
  to: "test2.test@gmail.com",
  subject: "Mail for Application",
  text: "your application is rejected for licence"
};

module.exports = {transporter,mailOptions1,mailOptions2}
