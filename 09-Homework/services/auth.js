const bcrypt = require("bcryptjs");
const modelAuth = require("../Models/auth");
const jwt = require("jsonwebtoken");
const jwtConfig = require("../configs/jwt");
const crypto = require("crypto");
const mailServer = require("../services/mailService");

const Register = async function name(body) {
  if (!body.name || !body.email || !body.password) {
    throw new Error("info is not require !!");
  }
  let hashpassword = await bcrypt.hash(body.password, 10);

  let verifycationToken = crypto.randomBytes(32).toString("hex");

  let verifycationExpire = new Date(Date.now() + 60 * 60 * 1000);

  let data = [
    body.name,
    body.email,
    hashpassword,
    verifycationToken,
    verifycationExpire,
  ];
  let row = await modelAuth.Register(body, data);

  await mailServer.sendVerificationEmail(body.email, verifycationToken);

  let result = await modelAuth.getbyId(row);
  return result;
};

const login = async function (body) {
  let rows = await modelAuth.login(body);

  if (rows.length === 0) {
    throw new Error("User not found");
  }

  let [user] = rows;

  let match = await bcrypt.compare(body.password, user.password);
  // console.log(match); return true false  result

  // check password
  if (!match) {
    throw new Error("Wrong password");
  }
  const token = jwt.sign({ id: user.id, email: user.email }, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn,
  });

  await modelAuth.addToken(token, user.id);
  let row = await modelAuth.getbyId(user.id);

  if (!row[0].is_verified) {
    throw new Error("this account is not verified !! ");
  }

  return row;
};

const users = async function name() {
  let rows = await modelAuth.users();
  return rows;
};

const getMe = async function name(id) {
  let row = await modelAuth.getbyId(id);

  return row;
};

const logout = async function name(token) {
  let row = await modelAuth.logout(token);

  return row;
};

const verifyEmail = async function name(token) {
  if (!token) {
    throw new Error("Token is not Required !!");
  }
  let isVerify = await modelAuth.verifyEmail(token);

  // console.log(isVerify);

  if (isVerify[0].is_verified) {
    throw new Error("Email is already verify /3");
  }
  if (
    !isVerify[0].verification_expires ||
    new Date(isVerify[0].verification_expires) < new Date()
  ) {
    throw new Error("token is Expired !!");
  }

  await modelAuth.isVerify(isVerify[0].verification_token);

  return;
};

const resendVerifyEmail = async function name(email) {
  if (!email) {
    throw new Error("Email is require !!");
  }
  let isVerifyEmail = await modelAuth.findByemail(email);
  console.log(isVerifyEmail[0].email);
  if (isVerifyEmail[0].email.length == 0) {
    throw new Error("Email is invalid !!");
  }
  if (isVerifyEmail[0].is_verified) {
    throw new Error("Email already verified !!");
  }
  let verificationToken = crypto.randomBytes(32).toString("hex");
  let verificationExpire = new Date(Date.now() + 2 * 60 * 1000);

  await modelAuth.resendExpireVerifyToken({
    verificationToken,
    verificationExpire,
    id : isVerifyEmail[0].id
  })
  await mailServer.sendVerificationEmail(email,verificationToken)
  return {message : "Email Resend Successfully"}
};

module.exports = {
  Register,
  login,
  users,
  getMe,
  logout,
  verifyEmail,
  resendVerifyEmail,
};
