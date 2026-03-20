const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categorycontroller");

// router.use(pool);

router.post("/category", categoryController.create);

router.get("/categorys", categoryController.getAll);

router.put("/category/:id", categoryController.update);
router.delete("/category/:id", categoryController.deletes);

module.exports = router;
