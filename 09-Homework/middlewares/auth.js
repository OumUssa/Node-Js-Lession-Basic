const jwt = require("jsonwebtoken");

const islogin = (req, res, next) => {
  try {
    console.log(req.headers.authorization);                         
  } catch (e) {}
};

module.exports = {
  islogin,
};
