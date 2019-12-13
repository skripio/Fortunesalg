import RbTree from "../node_modules/red-black-tree-js/src/rbTree.js"
function Beachline(points){
    var SS = new RbTree();
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
        if(point.isSite){
            SS.insert(point.x,point);
            var arr = SS.toSortedArray();
            var ne = BS(arr,0,arr.length,point.x);
            var i=0,index=-1;
            for(;i<ne.length-2;i++){
                if(point.isSamePoint(ne[i],point)){
                    index = i;
                }
                var center = point.center(ne[i],ne[i+1],ne[i+2]);
                var radius = point.distance(center,ne[i]);
                EL.insert(center.y - radius,center);
            }
            ne.splice(index,1);
            for(;i<ne.length-2;i++){
                var center = point.center(ne[i],ne[i+1],ne[i+2]);
                var radius = point.distance(center,ne[i]);
                EL.remove(center.y-radius);
            }
        }else{
            var points = point.points;
            if(points[1].y > points[0].y && points[1].y > points[2].y){
                var arr = SS.toSortedArray();
                var ne = BS(arr,0,arr.length,point.x);
                var index,i=0;
                for(;i<ne.length-2;i++){
                    if(point.isSamePoint(ne[i],point)){
                        index = i;
                    }
                }
                for(;i<ne.length-2;i++){
                    var center = point.center(ne[i],ne[i+1],ne[i+2]);
                    var radius = point.distance(center,ne[i]);
                    EL.insert(center.y-radius,center);
                }
                ne.splice(index,1);
                SS.remove(points[1].x);
            }
            VD.push(point);
        }
        EL.remove(node.key);
    }
}

function BS(arr,left,right,value){
    if(left == right){
        return neighbor(arr,left,arr.length);
    }
    var mid = left+Math.floor((right-left)/2);
    
    if(arr[mid].key == value){
        return neighbor(arr,mid,arr.length);
    }
    if(arr[mid].key < value){
        return BS(arr,mid+1,right,value);
    }else{
        return BS(arr,left,mid,value);
    }
}
function neighbor(array,mid,length){
    var i;
    var arr = [];
    for(i=-2;i<=2;i++){
        var j = mid+i;
        if(j>=0 && j<length){
            arr.push(array[j].value);
        }
    }
    return arr;
}