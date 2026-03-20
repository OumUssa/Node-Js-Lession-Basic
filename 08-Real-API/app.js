const express = require("express");
const mysql = require("mysql2/promise");
const app = express();

app.use(express.json());
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "oumussa@2292005",
  database: "coffee",
});

app.get("/products", async (req, res) => {
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
});
// Create Products
app.post("/products", async (req, res) => {
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
});

app.put("/products/:id", async (req, res) => {
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
});
app.delete("/products/:id", async (req, res) => {
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
});

// category

app.post("/category", async (req, res) => {
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
});

app.get("/categorys", async (req, res) => {
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
});

app.put("/category/:id", async (req, res) => {
  try {
    let [category] =await pool.query("SELECT * FROM category WHERE id=?",req.params.id);
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
});
app.delete("/category/:id", async (req, res) => {
  try {
    let [category] =await pool.query("SELECT * FROM category WHERE id=?",req.params.id);
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
});

app.listen(3000, () => {
  console.log("server run successfully!");
});
