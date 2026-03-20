const express = require("express");

const productsRoute = require("./routes/productRoute");
const categoryRoute = require('./routes/categoryRoute')


const app = express();

app.use(express.json());


app.use(productsRoute);
app.use(categoryRoute);



app.listen(3000, () => {
  console.log("server run successfully!");
});
