const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const crypto = require("crypto"); //Node.js'ın kendi kütüphanesi. Şifreleme için kullanılıyor.
const APIError = require("../utils/errors");
const Response = require("../utils/response");
const { createToken } = require("../middleware/Token/auth");
const User = require("../models/userModel");
const sendMailMailer = require("../utils/sendMail");
const moment = require("moment");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email: email });

  if (user) {
    const validPass = await bcrypt.compare(password, user.password);

    if (!validPass) {
      throw new APIError("Invalid password", 401);
    }

    createToken(user, res); // <---Token is created here and sent to the client
    //return new Response(user, "Login successfully").success(res);
  } else {
    throw new APIError("User not found", 401);
  }
};

const register = async (req, res) => {
  const { email, password } = req.body;
  const checkUser = await Users.findOne({ email: email });

  if (checkUser) {
    throw new APIError("User already exists", 401);
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt); //hash the password
  req.body.password = hashPassword;

  console.log(req.body.password);
  const userSave = new Users(req.body);

  await userSave
    .save()
    .then((data) => {
      return new Response(data, "User created successfully").created(res);
    })
    .catch((error) => {
      throw new APIError("User not created.", 401);
    });
};

const me = async (req, res) => {
  console.log("şuan authController.js deyim");

  //return Response(req.user, "User found").success(res);

  return new Response(req.user, "User found").success(res); //Success response 200 OK
};

const forgetPassword = async (req, res) => {
  const { email } = req.body;

  const userInfo = await User.findOne({ email: email }).select(
    "name surname email phone"
  ); //Find user by email address. Selecten sonra gelecek olan bilgileri seçiyoruz.

  if (!userInfo) {
    throw new APIError("User not found", 401);
  }

  console.log("userInfo : ", userInfo);

  //Her kullanıcı için farklı farklı kodlar oluşturduk.
  const resetCode = crypto.randomBytes(3).toString("hex"); //Random string oluşturuyoruz.

  console.log(resetCode);

  await sendMailMailer({
    from: process.env.EMAIL, //Gönderenin mail adresi
    to: userInfo.email, //Alıcı mail adresi
    subject: "Reset Password", //Mail konusu
    html: `<h1>Reset Password</h1>
    <p>Merhaba ${userInfo.name} ${userInfo.surname}</p>
    <p>Şifrenizi sıfırlamak için aşağıdaki kodu kullanabilirsiniz.</p>
    <p>Kodunuz : ${resetCode}</p>
    <p>İyi günler dileriz.</p>
    `, //Mail içeriği
  });

  await User.updateOne(
    { email: email },
    {
      reset: {
        code: resetCode,
        time: moment(new Date()).add(15, "minute").format("YYY-MM-DD HH:mm:ss"),
      },
    }
  );
  return new Response(sendMailMailer, "Please mailbox controle").success(res);
};

module.exports = {
  login,
  register,
  me,
  forgetPassword,
};
