const express = require("express");
const app = express();

// convert json object to js javascript object
app.use(express.json());
let id = 2;
let products = [
  {
    id: 1,
    name: "Iphone 14 Pro Max",
    price: 120000,
    description: "This is Iphone 14 Pro Max",
  },
  {
    id: 2,
    name: "Iphone 15 Pro Max",
    price: 120000,
    description: "This is Iphone 15 Pro Max",
  },
];

app.get("/products", (req, res) => {
  res.json({
    result: true,
    msg: "get all priducts successfully",
    data: products,
  });
});

app.post("/products", (req, res) => {
  // console.log(req.body); // just want check it req or not
  id++;
  let newproducts = {
    id: id,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
  };
  products.push(newproducts);

  res.json({
    result: true,
    msg: "add new product successfully",
    data: newproducts,
  });
});

app.put("/products/:id", (req, res) => {
  products.forEach((element) => {
    // console.log(element);
    if (Number(req.params.id) === element.id) {
      element.name = req.body.name;
      element.price = req.body.price;
      element.description = req.body.description;

      res.json({
        result: true,
        msg: "Update successfully ! ",
        data: element,
      });
    } else {
      res.json({
        result: false,
        msg: "Product Is Not Found in Database ! ",
      });
    }
  });
});
app.delete("/products/delete/:id", (req, res) => {
  products.forEach((element) => {
    
    if (Number(req.params.id) === element.id) {
      console.log(element);
      
       
       

      res.json({
        result: true,
        msg: "Delete successfully ! ",
      });
    }
  });
});
app.listen(3000, () => {
  console.log("Server run successfully !! ");
});
