const express = require("express");
const morgan = require("morgan");
const app = express();

// app.use((req,res,next)=>{
//     console.log(req.url);
//     console.log(req.method);
//     next();
// })

// app.use(morgan('tiny'))
// app.use(morgan('dev'))

// function isAdmin(req,res,next){
//     let role=false;
//     if(role){
//         next();
//     }
//     else{
//         res.json({
//             msg:"You are not Admin !!<3"
//         })
//     }
// }
let requestCount = 3;
app.use((req, res, next) => {
  requestCount--;
  if (requestCount > 0) {
    //if auth is true it mean user is login and can using our website
    let auth = true;

    if (auth) {
      next();
    } else {
      res.json({
        msg: "Please Login !!<3",
      });
    }
  } else {
    res.json({
      msg: "Your IP is Blocked !!<3",
    });
  }
});

app.get("/", (req, res) => {
  res.json({
    name: "This is Home Page",
  });
});

app.get("/contact", (req, res) => {
  res.json({
    name: "This is Contact Page",
  });
});
app.get("/about", (req, res) => {
  res.json({
    name: "This is About Page",
  });
});
app.get("/services/:id", (req, res) => {
  res.json({
    name: `This is Services Page ${req.params.id}`,
  });
});

app.listen(3000, () => {
  console.log("Server Run Successfully !");
});
