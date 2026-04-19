const pool = require("../configs/DB");

const getbyId = async function name(id) {
  const sql = await "SELECT id,name,email,phone,address,role,is_active,email_verified_at,created_at,updated_at ,token FROM users WHERE id = ?";
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
  let sql = "INSERT INTO users(name,email,password) VALUE (?,?,?)";
 
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
const logout = async function name() {
  let sql = "update users set token=null where token = ?";
  let result = await pool.query(sql,[])
}
module.exports = {
  Register,
  getbyId,
  login,
  users,
  addToken,
  findbyToken,
  logout
};
