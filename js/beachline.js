import RbTree from "../node_modules/red-black-tree-js/src/rbTree.js"

function Beachline(points){
    var SS = [];
    var EL = new RbTree();
    var VD = [];
    var line = Infinity;
    var point;
    for(point in points){
        EL.insert(point.y,point);
    }
    while(EL.size > 0){
        var node = EL.maxNode();
        var point = node.value;
        line = node.key;
        var index = -1;
        if(point.isSite){
            if(SS.length == 0){
                SS.push(point);
            }else{
                index = BSarc(SS,0,SS.length,point.x);
                var above = SS[index];
                if(index > 0 && index < SS.length - 1){
                    var center = point.center(SS[index-1],above,SS[i+1]);
                    var radius = point.distance(center,above);
                    EL.remove(center.y-radius);
                }
                SS.splice(index,0,above,point);
                index++;
                for(var i in [-1,1]){
                    var center = point.center(SS[index+2*i],SS[index+i],SS[index]);
                    var radius = point.distance(center,SS[index+i]);
                    EL.insert(center.y - radius,center);
                }
            }
        }else{
            var index = BScenter(SS,0,SS.length,point.x);
            for(var i in [-1,1]){
                var center = point.center(SS[index+2*i],SS[index+i],SS[index]);
                var radius = point.distance(center,SS[index+i]);
                if(EL.find(center.y - radius) == null)
                    EL.insert(center.y - radius,center);
            }
            SS.splice(index,1);
            // var ne = BS(SS,0,SS.length,point.x);
            // var index,i=0;
            // for(;i<ne.length-2;i++){
            //     if(point.isSamePoint(ne[i],point)){
            //         index = i;
            //     }
            // }
            // for(;i<ne.length-2;i++){
            //     var center = point.center(ne[i],ne[i+1],ne[i+2]);
            //     var radius = point.distance(center,ne[i]);
            //     EL.insert(center.y-radius,center);
            // }
            // ne.splice(index,1);
            // SS.remove(points[1].x);
            VD.push(point);
        }
        EL.remove(node.key);
    }
}

function BSarc(arr,left,right,value,line){
    if(left >= right){
        return left;
    }
    var li = Number.NEGATIVE_INFINITY,ri = Number.POSITIVE_INFINITY;
    var mid = left+Math.floor((right-left)/2);
    var arc = arr[mid];
    if(mid > 0){
        li = point.paraIntersection(arr[mid-1],arc,line)[1];
    }
    if(mid < arr.length-1){
        ri = point.paraIntersection(arc,arr[mid+1],line)[0];
    }
    if(value > li && value <= ri){
        return mid;
    }
    if(value > ri){
        return BSarc(arr,mid+1,right,value);
    }else{
        return BSarc(arr,left,mid-1,value);
    }
}

function BScenter(arr,left,right,value,line){
    if(left >= right){
        return left;
    }
    var li = Number.NEGATIVE_INFINITY,ri = Number.POSITIVE_INFINITY;
    var mid = left+Math.floor((right-left)/2);
    var arc = arr[mid];
    if(mid > 0){
        li = point.paraIntersection(arr[mid-1],arc,line)[1];
    }
    if(mid < arr.length-1){
        ri = point.paraIntersection(arc,arr[mid+1],line)[0];
    }
    if(point.xEqualwithEpsilon(li,value) && point.xEqualwithEpsilon(ri,value)){
        return mid;
    }else if(point.xEqualwithEpsilon(li,value)){
        return mid-1;
    }else if(point.xEqualwithEpsilon(ri,value)){
        return mid+1;
    }
    if(value > ri){
        return BScenter(arr,mid+1,right,value);
    }else{
        return BScenter(arr,left,mid-1,value);
    }
}

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
// function neighbor(array,mid){
//     var i;
//     var arr = [];
//     for(i=-2;i<=2;i++){
//         var j = mid+i;
//         if(j>=0 && j<array.length){
//             arr.push(array[j].value);
//         }
//     }
//     return arr;
// }