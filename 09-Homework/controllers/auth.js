const authService = require('../services/auth')
const create = async (req, res) => {
  try{
    row = await authService.Register(req.body)

    res.json({
        result:true,
        msg:"Create Account Successfully",
        data:row
    })
  }
  catch(e){
    res.status(401).json({
        result:false,
        msg:e.message
    });
    
  }
}


module.exports={
    create,
}