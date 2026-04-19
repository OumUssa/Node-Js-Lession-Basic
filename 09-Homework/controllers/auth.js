const authService = require("../services/auth");
const create = async (req, res) => {
  try {
    let row = await authService.Register(req.body);

    res.json({
      result: true,
      msg: "Create Account Successfully",
      data: row,
    });
  } catch (e) {
    res.status(401).json({
      result: false,
      msg: e.message,
    });
  }
};

const login = async (req, res) => {
  try {
    let row = await authService.login(req.body);

    res.json({
      result: true,
      msg: "Login Account Successfully",
      data: row,
    });
  } catch (e) {
    res.status(401).json({
      result: false,
      msg: e.message,
    });
  }
};

const users=async (req,res)=>{
  try{
    let row = await authService.users();
    
    res.json({
      result: true,
      msg: "get  Account Successfully",
      data: row,
    });
  }
  catch(e){
    res.status(401).json({
      result: false,
      msg: e.message,
    });
  }
}
const getme=async(req,res)=>{
  
  try{
    let row = await authService.getMe(res.user.id)
    res.json({
      result: true,
      msg: "get  Account Successfully",
      data: row,
    });
  }catch(e){
     res.status(401).json({
      result: false,
      msg: e.message,
    });
  }
}

const logout = async(req,res)=>{
  try{
    let row = await authService.logout(getToken) 
    
  }
  catch(e){
     res.status(401).json({
      result: false,
      msg: e.message,
    });
  }
}
module.exports = {
  create,
  login,
  users,
  getme,
  logout
};
