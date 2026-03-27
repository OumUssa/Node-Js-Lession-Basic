const categoryModel = require('../models/categoryModel')


const getAll = async function name() {
    const result = await categoryModel.getAll();

    return result;
}

const create = async function name(body) {
    const result = await categoryModel.create(body);
    const row = await categoryModel.getbyID(result)
    return row;
}

const update = async function name(id,body) {
    // let [category] = await pool.query(
    //   "SELECT * FROM category WHERE id=?",
    //   id
    // );

    let category = await categoryModel.getbyID(id)
    console.log(category);
    
    if (category.length == 0) {
      throw new Error('Category not found ');
    }

    await categoryModel.update(id,body);
    let row = await categoryModel.getbyID(id);

   return row;
}

const deleted= async function name(id,res) {
     let category = await categoryModel.getbyID(id);

    if (category.length == 0) {
      throw new Error('category is not found !!');
    }

    await categoryModel.deleted(id);
    
}


module.exports = {
    getAll,
    create,
    update,
    deleted
}
