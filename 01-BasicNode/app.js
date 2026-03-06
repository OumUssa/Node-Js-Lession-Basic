let i = 5;
let name = "John Doe";

console.log(i);
for (let f = 0; f <= i; f++) {
  console.log(name + " " + f);
}
console.log("____________________________________");

let arr = ["banana", "apple", "grape"];

arr.forEach((element) => {
  console.log(element);
});

//console.log(global); //big object that contains all the global variables and functions in Node.js

setTimeout(() => {
  console.log("This for test");
}, 2000); //it will show once in one second

// let second=0;
// let hour=0;
// let minute=0;
// let TimeInterval=setInterval(() => {
//     second++;
//     if(second==60){
//         minute++;
//         second=0;
//     }
// }, 1000);


// ------------------ Create Array for export to test.js ------------------
const testArr =[1,2,3,4,5,6,7,8,9,10];

module.exports = {
  name,
  i,
  testArr
};
