const  pool = require('../config/db');
const { getbyID } = require('../controllers/productController');

const getAll=async function name() {    
    const rows=await pool.query("select * from products");
    return rows;
}
const create =async function name(body) {
    let sql =
      "INSERT INTO products (name_cf,category,description) VALUES (?,?,?)";
    let data = [body.name_cf, body.category, body.description];
    let [result] = await pool.query(sql, data);
    let [row] = await pool.query("SELECT * FROM products WHERE id=?", [
      result.insertId,
    ]);

    return row;

}
const update=async function name(id,body) {
    let sql =
      "UPDATE products SET name_cf=?,category=?,description=? WHERE id=?";
    let data = [body.name_cf, body.category, body.description, id];
    let [result] = await pool.query(sql, data);

    let [row] = await pool.query("SELECT * FROM products WHERE id =?", [id]);

    return row;
    
}
const deleted=async function name(id,res) {
        let [row] = await pool.query("select * from products where id = ? ", [
      id
    ]);

    if (row.length == 0) {
      return res.json({
        result: false,
        msg: "product is not found !!",
      });
    }

    let [result] = await pool.query("DELETE FROM products WHERE id=?", [
      id
    ]);

    return result;
}
const getID = async function name(id,res) {

    let [row] = await pool.query("SELECT * FROM products WHERE id=?", [id]);

    if (row.length == 0) {
      return res.json({
        result: false,
        msg: "profucts is not found !",
      });
    }

    return row;
}


module.exports = {
    getAll,
    create,
    update,
    deleted,
    getID
}


