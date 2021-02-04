const nodemailer = require("nodemailer");

//for Node Mailer
//const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "rohandev.dev74@gmail.com",
    pass: "Devroh@n9080"
  }
});
// Accept mail
const mailOptions1 = {
  from: '"rohan" <rohandev.dev74@gmail.com>',
  to: "rohandev.dev72@gmail.com",
  subject: "Mail for Application",
  text: "your application is accepted for licence"
};
//reject mail
const mailOptions2 = {
  from: '"rohan" <rohandev.dev74@gmail.com>',
  to: "rohandev.dev72@gmail.com",
  subject: "Mail for Application",
  text: "your application is rejected for licence"
};

module.exports = {transporter,mailOptions1,mailOptions2}