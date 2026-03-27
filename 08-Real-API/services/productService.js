const productModel = require("../models/productModel");

const getAll = async function name() {
  const rows = await productModel.getAll();
  return rows;
};
const create = async function name(body) {
  const result = await productModel.create(body);
  const row = await productModel.getbyID(result);

  return row;
};
const update = async function name(id, body) {
  const product = await productsService.getbyID(req.params.id);

  if (product.length == 0) {
    throw new Error("Not found product !! ");
  }
  const [row] = await productModel.update(id, body);

  return row;
};
const deleted = async function name(id, res) {
  let [row] = await pool.query("select * from products where id = ? ", [id]);

  if (row.length == 0) {
    return res.json({
      result: false,
      msg: "product is not found !!",
    });
  }

  let [result] = await pool.query("DELETE FROM products WHERE id=?", [id]);

  return result;
};
const getID = async function name(id, res) {
  let [row] = await productModel.getbyID(id);

  if (row.length == 0) {
    return res.json({
      result: false,
      msg: "profucts is not found !",
    });
  }

  return row;
};

module.exports = {
  getAll,
  create,
  update,
  deleted,
  getID,
};
