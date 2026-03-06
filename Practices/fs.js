const fs = require("fs");

// fs.writeFile('./note.txt','this is my file i want to write it for test',(err)=>{
//     if(err)console.log(err);

//     console.log('write successfully file');
// })

// for(let i=0;i<100;i++){
//     fs.appendFile('./note.txt','\n this file is append file for test',(err)=>{
//     if(err)console.log(err);
//     console.log("file addpend add successfully!!!");

// })
// }

fs.readFile("./fileSystem/prepender.txt", (err, data) => {
  if (err) console.log(err);
  const word = "\n This add more content for test";
  const addMore = word + data;
  if (data) {
    fs.writeFile("./fileSystem/prepender.txt", addMore, (err) => {
      if (err) console.log(err);
      console.log("file updated successfully !!");
    });
  } else {
    fs.writeFile("./fileSystem/prepender.txt", word + " Hello world", (err) => {
      if (err) console.log(err);
      console.log("file updated successfully");
    });
  }
});

const filePathToDelete = "./fileSystem/prepender.txt";

if (!fs.existsSync('./filesystem')) {
  fs.mkdir("./fileSystem", { recursive: true }, (err) => {
    if (err) console.log(err);
    console.log("create folder successfully");
  });
}

if(!fs.existsSync(filePathToDelete)){
  fs.writeFile(filePathToDelete, "This is a new file to delete", (err) => {
    if (err) console.log(err);
    console.log("file created successfully");
  });
}

