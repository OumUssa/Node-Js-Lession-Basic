const app = require("./app");


console.log('===========================================');

const arr=app.testArr;
console.log(arr);

console.log('================ loop Array====================');

app.testArr.forEach(element => {

    console.log(element);
    
});
// console.log(app.i);

const os =require('os');
console.log(os.platform());
