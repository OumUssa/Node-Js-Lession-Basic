const pool = require("../config/db");

const getAll = async function name() {
  let sql = "SELECT * FROM category";
  let [result] = await pool.query(sql);

  return result;
};

const getbyID = async function name(id) {
  let [row] = await pool.query("SELECT * FROM category WHERE id=?", [id]);

  return row;
};

const create = async function name(body) {
  let sql = "INSERT INTO category(category_name) VALUE (?)";
  let data = [body.category_name];
  let [result] = await pool.query(sql, data);

  return result.insertId;
};

const update = async function name(id, body) {
  let sql = "UPDATE category SET category_name=? WHERE id =?";
  let data = [body.category_name, id];
  let [result] = await pool.query(sql, data);

  return result;
};

const deleted = async function name(id) {
  let sql = "DELETE FROM  category  WHERE id =?";
  let [result] = await pool.query(sql, [id]);

};
module.exports = {
  getAll,
  create,
  getbyID,
  update,
  deleted,
};
