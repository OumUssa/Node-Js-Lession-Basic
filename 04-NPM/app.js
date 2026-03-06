const _ =require('lodash')

const items=[1,[2,[3,[4]]]]

const newItems=_.flattenDeep(items)
console.log(newItems);

const array=[1,1,2,3,4,5,5,6,7,8,9,10];

// console.log(_.uniq(array));
// console.log(_.chunk(array,2));

console.log(_.random(1,10));
