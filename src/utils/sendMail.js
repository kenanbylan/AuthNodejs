const nodeMailer = require("nodemailer");
require("dotenv").config();

const sendMailMailer = async (mailOptions) => {
  const transporter = nodeMailer.createTransport({
    // host: "smtp.gmail.com",
    service: "gmail",
    // port: 587, //465 bu iki port mesaj gönderimi için kullanılır. 587 submmission portu olarak kullanılır.
    // secure: false, //gönderilecek mesajın şifrelenip şifrelenmeyeceğini belirtir. true ise şifrelenir.
    auth: {
      user: "stocktracking1system.gmail.com",
      pass: "lqhlzuvjwgzzagzi",
    },
  });

  let infoData = await transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log("Error occured while sending mail : ", err);
    } else {
      console.log("Mail sent successfully : ", info);
    }
  });

  console.log("Message sent: %s", infoData);
  //console.log("Preview URL: %s", nodeMailer.getTestMessageUrl(info));
};

module.exports = sendMailMailer;
