const pool = require('../config/db')

const create =async (req, res) => {
  try {
    let sql = "INSERT INTO category(category_name) VALUE (?)";
    let body = req.body;
    let data = [body.category_name];
    let [result] = await pool.query(sql, data);

    res.json({
      result: true,
      msg: "Create Category Successfully ",
    });
  } catch (e) {
    res.status(500).json({
      result: false,
      msg: "create fail !!",
    });
  }
}
const getAll=async (req, res) => {
  try {
    let sql = "SELECT * FROM category";
    let [result] = await pool.query(sql);

    res.json({
      result: true,
      msg: "Create Category Successfully ",
      data: result,
    });
  } catch (e) {
    res.status(500).json({
      result: false,
      msg: "Get fail category !!",
    });
  }
}
const update = async (req, res) => {
  try {
    let [category] = await pool.query(
      "SELECT * FROM category WHERE id=?",
      req.params.id,
    );
    if (category.length == 0) {
      return res.status(500).json({
        result: false,
        msg: "Category not found !!",
      });
    }

    let sql = "UPDATE category SET category_name=? WHERE id =?";
    let data = [req.body.category_name, req.params.id];
    let [result] = await pool.query(sql, data);
    let [row] = await pool.query("SELECT * FROM category WHERE id=?", [
      req.params.id,
    ]);

    res.json({
      result: true,
      msg: " Category Update Successfully ",
      data: row,
    });
  } catch (e) {
    res.status(500).json({
      result: false,
      msg: "Update fail category !!",
    });
  }
}
const deletes=async (req, res) => {
  try {
    let [category] = await pool.query(
      "SELECT * FROM category WHERE id=?",
      req.params.id,
    );
    if (category.length == 0) {
      return res.status(500).json({
        result: false,
        msg: "Category not found !!",
      });
    }

    let sql = "DELETE FROM  category  WHERE id =?";
    let data = [req.params.id];
    let [result] = await pool.query(sql, data);

    res.json({
      result: true,
      msg: " Category DELETE Successfully ",
    });
  } catch (e) {
    res.status(500).json({
      result: false,
      msg: "DELETE fail category !!",
    });
  }
}


module.exports={create,getAll,update,deletes};