const  pool = require('../config/db');
const { getID } = require('../services/productService');


const getAll = async function name() {
     const rows=await pool.query("select * from products");

     return rows;
} 

const getbyID=async function name(id) {
    const row = pool.query('SELECT * FROM products WHERE id =?',[id])
    return row;
}
const create = async function name(body) {
      let sql =
      "INSERT INTO products (name_cf,category,description) VALUES (?,?,?)";
    let data = [body.name_cf, body.category, body.description];
    let [result] = await pool.query(sql, data);

    return result.insertId;
}
const update = async function name(id,body) {
    let sql =
      "UPDATE products SET name_cf=?,category=?,description=? WHERE id=?";
    let data = [body.name_cf, body.category, body.description, id];
    let [result] = await pool.query(sql, data);

    const row = await getbyID(id)
    return row;
}

const deleted = async function name() {
    
}

module.exports ={
    getAll,
    getbyID,
    create,
    update
}
