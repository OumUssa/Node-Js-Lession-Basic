const express = require("express");
const app = express();
const lo = require("lodash");

let count = 0;
let randomNum = lo.random(0, 10);
setInterval(() => {
    app.use((req, res, next) => {
        console.log('hello');
        
    })

}, 100);

app.get("/", async (req, res) => {
  // res.send('welcome to home page');
  const respone = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await respone.json();
  //  console.log(data)
  res.json(data);
});

app.get("/contact", (req, res) => {
  res.send("<h1>Welcome to contact page</h1>");
});
app.listen(3000, () => {
  console.log("run server successfully");
});
