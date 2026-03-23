const pool = require('../config/db')

const getAll = async function name() {
    let sql = "SELECT * FROM category";
    let [result] = await pool.query(sql);

    return result;
}
const create = async function name(body) {
    let sql = "INSERT INTO category(category_name) VALUE (?)";
    let data = [body.category_name];
    let [result] = await pool.query(sql, data);

    return result;

}
const update = async function name(id,body) {
    let [category] = await pool.query(
      "SELECT * FROM category WHERE id=?",
      id
    );
    if (category.length == 0) {
      return res.status(500).json({
        result: false,
        msg: "Category not found !!",
      });
    }

    let sql = "UPDATE category SET category_name=? WHERE id =?";
    let data = [body.category_name, id];
    let [result] = await pool.query(sql, data);
    let [row] = await pool.query("SELECT * FROM category WHERE id=?", [
      id
    ]);

    return row;
}

const deleted= async function name(id,res) {
     let [category] = await pool.query(
      "SELECT * FROM category WHERE id=?",
      [id],
    );
    if (category.length == 0) {
      return res.json({
        result: false,
        msg: "Category not found !!",
      });
    }

    let sql = "DELETE FROM  category  WHERE id =?";
    let [result] = await pool.query(sql, [id]);
}


module.exports = {
    getAll,
    create,
    update,
    deleted
}
