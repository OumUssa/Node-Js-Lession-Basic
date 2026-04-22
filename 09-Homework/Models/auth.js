const pool = require("../configs/DB");

const getbyId = async function name(id) {
  const sql = await "SELECT id,name,email,phone,address,role,is_active,email_verified_at,created_at,updated_at ,token ,is_verified FROM users WHERE id = ?";
  const [result] = await pool.query(sql, [id]);

  return result;
};

const Register = async function name(body,data) {
  let [checkemail] = await pool.query(
    "SELECT email from users Where email = ?",
    [body.email],
  );

  if (checkemail.length > 0) {
    throw new Error("Email dublicate try again!!");
  }
  let sql = "INSERT INTO users(name,email,password,verification_token,verification_expires) VALUE (?,?,?,?,?)";
 
  let [result] = await pool.query(sql, data);

  return result.insertId;
};

const login = async function name(body) {
  // console.log(body);
  
  let [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
    body.email,
  ]);
  return rows;
};

const users = async function name() {
  let [rows] = await pool.query(
    "SELECT id,name,email,phone,address,role,is_active,email_verified_at,created_at,updated_at FROM users",
  );

  return rows;
};

const addToken= async function name(token,id) {
     await pool.query('update users set token = ? Where id  = ?',[token,id]) 
}

const findbyToken= async function name(token) {
  let sql= "SELECT token from users Where token = ?"
  let [row] = await pool.query(sql,[token]); 
  console.log(row);
  
  return row;
}
const logout = async function name(token) {
  let sql = "update users set token=null where token = ?";
  let result = await pool.query(sql,[token])
  
}

const verifyEmail = async function name(token) {
    let sql = "SELECT id,name,email,role,is_active,email_verified_at,created_at,updated_at,verification_token ,is_verified,verification_expires FROM users WHERE verification_token = ?"
    let [result] = await pool.query(sql,[token])

    console.log(result);
    
   
    if(result[0].length==0){
      throw new Error('Invalid Token !!');
    }
    return result;
}
const isVerify=async function name(token) {
    let sql = "update users set is_verified=1 where verification_token = ?"
    let result = await pool.query(sql,[token])
  return;
}

const findByemail=async function name(email) {
  const sql = await "SELECT id,name,email,phone,address,role,is_active,email_verified_at,created_at,updated_at ,token ,is_verified FROM users WHERE email = ?";
  let [row] = await pool.query(sql,[email])

  
  return row;
}

const resendExpireVerifyToken = async function name(body) {
    let sql = "update users set verification_token = ?, verification_expires=? where id = ? "
    let result = await pool.query(sql,[body.verificationToken,body.verificationExpire,body.id])
}
module.exports = {
  Register,
  getbyId,
  login,
  users,
  addToken,
  findbyToken,
  logout,
  verifyEmail,
  isVerify,
  findByemail,
  resendExpireVerifyToken
};
