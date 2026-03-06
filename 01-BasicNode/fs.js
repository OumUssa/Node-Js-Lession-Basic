const fs = require("fs");

// fs.readFile("./text.txt", (err, data) => {
//   if (err) console.log(err);
//   console.log(data.toString());
// });

// fs.writeFile('./text.txt','this is a test',(err)=>{
//     if(err)console.log(err);

//     console.log('File written successfully');

// })

// fs.appendFile("./text.txt", "\n this write appendfile successfilly ", (err) => {
//   if (err) console.log(err);

//   console.log("write successfully");
// });

if (fs.existsSync("./text.txt")) {
  fs.unlink("./text.txt", (err) => {
    if (err) console.log(err);

    console.log("File Delete successfully"); // open it if want delete file
  });
}else{
    console.log("file Not found please create file for delete");   
}

// fs.mkdir('./myfolder',(err)=>{
//     if(err)console.log(err);
//     console.log("create folder successfully !!");
// })



fs.rmdir('./myfolder',(err)=>{
    if(err)console.log(err);

    console.log("folder deleted");
    
    
})