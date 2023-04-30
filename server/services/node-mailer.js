const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: process.env.EMAIL_USER, // generated ethereal user
    pass: process.env.EMAIL_PASSWORD, // generated ethereal password
  },
});

exports.sendEmail = (to, subject, html) => {
  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: subject,
    html: html,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
