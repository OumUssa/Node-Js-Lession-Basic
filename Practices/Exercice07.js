const express = require("express");
const app = express();
const fs = require("fs");

app.get("/", (req, res) => {
  fs.readFile("./docs/data.txt", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error reading file");
      return;
    }
    let obj = JSON.parse(data.toString());
    let html = "<h1>Users List</h1>";

    obj.forEach((element) => {
      html += `<ul>
<li><strong>Name:</strong> ${element.name}</li>
<li><strong>Username:</strong> ${element.username}</li>
<li><strong>Email:</strong> ${element.email}</li>
<li><strong>Phone:</strong> ${element.phone}</li>
<li><strong>Website:</strong> ${element.website}</li>
<li><strong>City:</strong> ${element.address.city}</li>
<li><strong>Company:</strong> ${element.company.name}</li>
</ul><hr>`;
    });

    res.send(html);
  });
});
app.listen(3000, () => {
  console.log("server running !");
});
