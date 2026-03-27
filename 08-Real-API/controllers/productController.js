const pool = require("../config/db");
const productsService=require('../services/productService')

const getAll = async (req, res) => {
  try {
    const [rows] =  await productsService.getAll();
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
    const result = await productsService.create(req.body)

    res.json({
      result: true,
      msg: "Create products successfully ",
      data: result[0],
    });
  } catch (e) {
    res.status(500).json({
      result: false,
      msg: "Create Product Feild !!",
    });
  }
};


const update = async (req, res) => {
  try {

    const result = await productsService.update(req.params.id, req.body)
    

    res.json({
      result: true,
      msg: "Update sucessfully",
      data: result,
    });
  } catch (e) {
    res.status(500).json({
      result: false,
      msg: e.message,
    });
  }
};
const deletes = async (req, res) => {
  try {

    const result=await productsService.deleted(req.params.id,res.status(401))
    res.status(200).json({
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
  try {

    const result = await productsService.getID(req.params.id,res.status(401));

      res.status(200).json({
        result: true,
        msg: "this your product ",
        data:result
      });

  } catch (e) {
    res.json({
      result: false,
    });
  }
};
module.exports = { getAll, create, update, deletes, getbyID };
