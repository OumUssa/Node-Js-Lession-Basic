const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");
const pool = require('../config/db')
const productController=require('../controllers/productController')


router.get("/products", productController.getAll);
// Create Products
router.post("/products",productController.create );
router.put("/products/:id", productController.update);
router.delete("/products/:id",productController.deletes );
router.get('/product/:id',productController.getbyID)

module.exports = router;
