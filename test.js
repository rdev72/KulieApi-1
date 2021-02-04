const nodemailer = require("nodemailer");
 
async function main() {
 
    let transporter = nodemailer.createTransport({
        host: 'smtp.googlemail.com', // Gmail Host
        port: 465, // Port
        secure: true, // this is true as port is 465
        auth: {
            user: 'rohandev.dev74@gmail.com', // generated ethereal user
            pass: 'Devroh@n9080', // generated ethereal password
        },
    });
 
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"roshan" <rdev74@gmail.com>', // sender address
        to: "rohandev.dev72@gmail.com", // list of receivers
        subject: "Welcome Email", // Subject line
        text: "Hello", // plain text body
        // html: "This email is sent through <b>GMAIL SMTP SERVER</b>", // html body
    });
 
    console.log("Message sent: %s", info.messageId);
}
 
main().catch(console.error);