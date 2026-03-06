const fs = require("fs");
const user = [];
user[0] = "name";
if (!fs.existsSync("./docs")) {
  fs.mkdir("./docs", (err) => {
    if (err) console.log(err);
    console.log("Folder create Successfully!");
  });
}

fetch("https://jsonplaceholder.typicode.com/users", {
  method: "GET",
  headers: {
    "content-type": "application/json",
  },
})
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    if (fs.existsSync("./docs/data.txt")) {
      fs.writeFile("./docs/data.txt", JSON.stringify(data, null, 2), (err) => {
        if (err) console.log(err);
        console.log("filewrite successfully");
      });
    }
  });

if (!fs.existsSync("./docs/data.txt")) {
  fs.writeFile("./docs/data.txt", "hello", (err) => {
    if (err) console.log(err);
    console.log("filewrite successfully");
  });
}
