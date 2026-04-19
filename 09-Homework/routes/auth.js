const express = require("express");
const router = express.Router();
const authController = require('../controllers/auth')
const middleware = require('../middlewares/auth')

router.post("/", authController.create);

router.post("/login",authController.login );
router.get("/users",authController.users);
router.get("/getme", middleware.islogin ,authController.getme);
router.delete('/logout',middleware.islogin,authController.logout);

module.exports = router;
