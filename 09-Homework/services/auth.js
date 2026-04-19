const bcrypt = require("bcryptjs");
const modelAuth = require("../Models/auth");
const jwt = require("jsonwebtoken")
const jwtConfig=require('../configs/jwt')

const Register = async function name(body) {
  if (!body.name || !body.email || !body.password) {
    throw new Error("info is not require !!");
  }
  let hashpassword = await bcrypt.hash(body.password, 10);
  let data = [body.name, body.email, hashpassword];

  let row = await modelAuth.Register(body, data);

  let result = await modelAuth.getbyId(row);

  return result;
};  

const login = async function (body) {
  let rows = await modelAuth.login(body);
  
  if (rows.length === 0) {
    throw new Error("User not found");
  }

  let [user] = rows;
  
  let match = await bcrypt.compare(body.password,user.password);
  // console.log(match); return true false  result
  
  // check password
  if (!match) {
    throw new Error("Wrong password");
  }
  const token = jwt.sign(
    {id: user.id,email : user.email},
    jwtConfig.secret,
    {expiresIn:jwtConfig.expiresIn}
  );

  await modelAuth.addToken(token,user.id)
  let row = await modelAuth.getbyId(user.id)
  return row;
};

const users = async function name() {
  let rows = await modelAuth.users();
  return rows;
};

const getMe= async function name(id) {
    let row =await modelAuth.getbyId(id)

    return row;
}

const logout = async function name(token) {
    let row = await modelAuth.getbyId(token)

    return row;
}

module.exports = {
  Register,
  login,
  users,
  getMe,
  logout
};
