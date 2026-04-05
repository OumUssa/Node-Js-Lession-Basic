const jwt = require("jsonwebtoken");
const jwtConfig = require("../configs/jwt");

const islogin = (req, res, next) => {
  try {
    let Authorization = req.headers.authorization;
    if(!Authorization){
      return res.json({
        result:false,
        msg:"inavlid token!! "
      })
    }  
    
    let parts = Authorization.split(' ');
    // console.log(parts);
    
    if(parts.length !==2 || parts[0]!=='Bearer'){
        return res.json({
        result:false,
        msg:"inavlid token!! l"
      })
    }
    let token = parts[1];
    const decode = jwt.verify(token,jwtConfig.secret);

    res.user=decode;
    // console.log(res.user.id);
    
    next();
            
  } catch (e) {
    res.json({
        result:false,
        msg:e.message
    })
  }
};

module.exports = {
  islogin,
};
