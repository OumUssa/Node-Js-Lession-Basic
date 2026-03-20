const pool = require("../config/db");

const getAll = async (req, res) => {
  try {
    const [rows] = await pool.query("select * from products");
    res.json({
      result: true,
      msg: "get products succressfully",
      data: rows,
    });
  } catch (e) {
    res.status(500).json({
      result: false,
      msg: "Error Internal Server",
    });
  }
};

const create = async (req, res) => {
  try {
    let body = req.body;
    let sql =
      "INSERT INTO products (name_cf,category,description) VALUES (?,?,?)";
    let data = [body.name_cf, body.category, body.description];
    let [result] = await pool.query(sql, data);
    let [row] = await pool.query("SELECT * FROM products WHERE id=?", [
      result.insertId,
    ]);
    // console.log(result);
    console.log(row);

    res.json({
      result: true,
      msg: "Create products successfully ",
      data: row,
    });
  } catch (e) {
    res.status(500).json({
      result: false,
      msg: "Create Product Feild !!",
    });
  }
};
const update = async (req, res) => {
  // console.log(req.body,req.params.id);
  try {
    let sql =
      "UPDATE products SET name_cf=?,category=?,description=? WHERE id=?";
    let body = req.body;
    let data = [body.name_cf, body.category, body.description, req.params.id];
    let [result] = await pool.query(sql, data);

    let [row] = await pool.query("SELECT * FROM products WHERE id =?", [
      req.params.id,
    ]);
    console.log(row);

    res.json({
      result: true,
      msg: "Update sucessfully",
      data: row,
    });
  } catch (e) {
    res.status(500).json({
      result: false,
      msg: "Update internal Server ! ",
    });
  }
};
const deletes = async (req, res) => {
  try {
    let [row] = await pool.query("select * from products where id = ? ", [
      req.params.id,
    ]);

    // console.log(req.params.id);
    if (row.length == 0) {
      return res.status(401).json({
        result: false,
        msg: "product is not found !!",
      });
    }

    let [result] = await pool.query("DELETE FROM products WHERE id=?", [
      req.params.id,
    ]);
    console.log(result);
    res.json({
      result: true,
      msg: "Delete profucts successfully ",
    });
  } catch (e) {
    res.status(500).json({
      result: false,
      msg: "Internal server !! ",
    });
  }
};
const getbyID = async (req, res) => {
  console.log(req.params.id);
  try {
    let [row] = await pool.query("SELECT * FROM products WHERE id=?", [
      req.params.id,
    ]);
    console.log(row);

    if (row.length == 0) {
      return res.json({
        result: false,
        msg: "profucts is not found !",
      });
    }
      res.json({
        result: true,
        msg: "this your product ",
        data:row
      });
  } catch (e) {
    res.json({
      result: false,
    });
  }
};
module.exports = { getAll, create, update, deletes, getbyID };
