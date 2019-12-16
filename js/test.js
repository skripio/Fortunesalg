import RbTree from "../node_modules/red-black-tree-js/src/rbTree.js"
import point from "./Point.js"
import circle from "./circle.js"
import vdedge from "./vdedge.js"

var vde = new Hashtable();
var p1 = new point(-9.199503121270546,9.951479730921626,true);
var p2 = new point(-9.910233839978812, 9.674065716873068,true);
var p3 = new point(-9.96147497094292,7.2166756120903885,true);
var p4 = new point(-5.323, -2.636,true);
var c = new circle(p1,p2,p3);
var center = point.center(p1,p2,p3);
console.log(center);
console.log(point.paraIntersection(p1,p2,center.line),point.paraIntersection(p2,p3,center.line));
// var radius = point.distance(center,p2);
// var inter = p2.pointInpara(p1.x,p1.y);
// vde.put(new vdedge(p1,p2),[inter]);
// updateVertex([p1,p2,p3],center);
// console.log(vde.get(new vdedge(p1,p2)),vde.get(new vdedge(p1,p3)),vde.get(new vdedge(p2,p3)));
// map.put(new circle(p1,p2,p4),[center,radius]);
// console.log(map.get(c));
// // may need a set to store added centers
// if(center.y - radius < p1.y && center.x > p1.x){
// 	//EL.insert(center.y - radius,center);
// 	map.put(new circle(p1,p2,p3),[center,radius]);
// }

// var rbTree = new RbTree();
// var i;
// rbTree.insert(1, "foo");
// rbTree.insert(1, "var");
// rbTree.remove(1);
// rbTree.print();
// console.log(rbTree.toSortedArray());
function updateVertex(points,center){
	for(var i = 0; i < 3; i++){
		var p1 = points[i], p2 = points[(i+1)%3];
		var inter = vde.get(new vdedge(p1,p2));
		if(inter == null){
			inter = [center];
		}else if(inter.length == 1){
			inter.push(center);
		}else if(inter.length == 2){
			if(!inter[0].isVD){
				inter[0] = center;
			}else if(!inter[1].isVD){
				inter[1] = center;
			}
			addEdge([inter[0].x,inter[0].y],[inter[1].x,inter[1].y]);
        }
        vde.put(new vdedge(p1,p2),inter);
	}
 }
// var p1 = new point(115.8, 39.8,true);
// var p2 = new point(116.3, 39.9,true);
// var p3 = new point(117, 39.5,true);
// var arr = [p1,p2,p3];
// for(i=0;i<=2;i++){
//     var p = arr[i];
//     rbTree.insert(p.y, p);
//     // console.log(rbTree.size);
// }
// var center = point.center(p1,p2,p3);
// var radius = point.distance(center,p2);
// rbTree.insert(center.y - radius,center);
// rbTree.print();
// console.log(rbTree.size)
// var c = point.center(p1,p2,p3);
// var r = point.distance(center,p2);
// rbTree.remove(c.y - r);
// console.log(rbTree.size);
// console.log(point.paraIntersection(p1,p2,c.y-r));
// console.log(point.paraIntersection(p2,p3,c.y-r));
// console.log(point.xEqualwithEpsilon(c.x, point.paraIntersection(p2,p3,c.y-r)[0]));
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