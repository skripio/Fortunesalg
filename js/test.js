import RbTree from "../node_modules/red-black-tree-js/src/rbTree.js"


var rbTree = new RbTree();
var i;
// rbTree.insert(1, "foo");
var p1 = new point(115.8, 39.8,true);
var p2 = new point(116.3, 39.9,true);
var p3 = new point(117, 39.5,true);
var arr = [p1,p2,p3];
for(i=0;i<=2;i++){
    var p = arr[i];
    rbTree.insert(p.y, p);
    // console.log(rbTree.size);
}
var center = point.center(p1,p2,p3);
var radius = point.distance(center,p2);
rbTree.insert(center.y - radius,center);
rbTree.print();
console.log(rbTree.size)
var c = point.center(p1,p2,p3);
var r = point.distance(center,p2);
rbTree.remove(c.y - r);
console.log(rbTree.size);
console.log(point.paraIntersection(p1,p2,c.y-r));
console.log(point.paraIntersection(p2,p3,c.y-r));
console.log(point.xEqualwithEpsilon(c.x, point.paraIntersection(p2,p3,c.y-r)[0]));
// var arr = rbTree.toSortedArray();
// // console.log(BS(arr,0,arr.length,3));
// function BS(arr,left,right,value){
//     if(left == right){
//         return neighbor(arr,left,arr.length);
//     }
//     var mid = left+Math.floor((right-left)/2);
    
//     if(arr[mid].key == value){
//         return neighbor(arr,mid,arr.length);
//     }
//     if(arr[mid].key < value){
//         return BS(arr,mid+1,right,value);
//     }else{
//         return BS(arr,left,mid,value);
//     }
// }
// function neighbor(array,mid,length){
//     var i;
//     var arr = [];
//     for(i=-2;i<=2;i++){
//         var j = mid+i;
//         if(j>=0 && j<length){
//             arr.push(array[j].value);
//         }
//     }
//     return arr;
// }
// var p1 = new point(116.3, 39.9,true);
// var p2 = new point(115.8, 39.8,true);
// var p3 = new point(117, 39.5,true);
// var c = point.center(p1,p2,p3);
// console.log(point.distance(p1,c));
// console.log(point.distance(p2,c));
// console.log(point.distance(p3,c));

// for(i=1;i<=6;i++){
//     rbTree.remove(i);
//     // console.log(rbTree.size);
// }

// const iterator = rbTree.createIterator();

// let result = [];
// while (iterator.hasNext()) {
//   console.log(iterator.next());
// }