const pool = require('../config/db')
const categoryService = require('../services/categoryService')

const create =async (req, res) => {
  try {
    const result =await categoryService.create( )

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
const getAll= async (req, res) => {
  try {

    const result = await categoryService.getAll();

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
    const result =await categoryService.update(req.params.id,req.body)

    res.json({
      result: true,
      msg: " Category Update Successfully ",
      data: result,
    });
  } catch (e) {
    res.status(500).json({
      result: false,
      msg: "Update fail category !!",
    });
  }
}

const deletes=async (req, res) => {

  const result = await categoryService.deleted(req.params.id,res.status(401))
  try {
    res.status(200).json({
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