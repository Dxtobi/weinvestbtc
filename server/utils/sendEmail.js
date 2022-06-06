const nodemailer = require("nodemailer");
require("dotenv").config()
const sendEmail = (options) => {



  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service:"gmail",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'hackmankin@gmail.com', //process.env.EMAIL,// generated ethereal user
      pass:'jummy16snip'// process.env.PASSWORD, // generated ethereal password
    },
  });
  let details = {
    from:'hackmankin@gmail.com',//process.env.EMAIL,
    to: options.to,
    subject:  options.subject,
    html:  options.text,
  }
  
  transporter.sendMail(details, (err) => {
    if (err) {
      console.log(err)
    } else {
     
      console.log('sent', err)
     // return navigate("/error");
    }
  })
  
 /* const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE_PROVIDER,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: options.to,
    subject: options.subject,
    html: options.text,
  };*/
 /* transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.error(err);
    } else {
      console.log(info);
    }
  });*/
};





module.exports = sendEmail;
