 import RbTree from "../node_modules/red-black-tree-js/src/rbTree.js"
 import point from "./Point.js"
 import circle from "./circle.js"
 
 //draw (len) random points of (range) with (attr) on brd, concate new points to current point set 
 function drawRandomPoints(len, brd, attr, range){
	if(len <= 0) return;
	range = (typeof range !== 'undefined') ?  range :  [-10, 10, 10, -10];
	var p = [];
	var i;
	for (i=0;i<len;i++) 
		p[i] = brd.create('point',[Math.random() * (range[1] - range[0]) + range[0], Math.random() * (range[3] - range[2]) + range[2]],attr);
	points = points.concat(p);
	return p;
 }
 
 //draw parabolas on brd base on points in p and line mp
 function drawParabolas(p, brd){
	 p.forEach(function (value) {
	  	var pra = board.create('functiongraph', [function(x){return parabola(value, x);}],{dash:2});
		if(!showPara) pra.hideElement();
		parabolas.push(pra);
	 }); 
 }
 
 function parabola(p1, x) { //site and x coordinate
 	var y1 = p1.Y();
	var x1 = p1.X();
	var l = mp.Y();
	if(y1 > l)
	  return 1/(2*(y1 - l))*(Math.pow((x - x1),2) + Math.pow(y1, 2) - Math.pow(l, 2));
	else
	  return Number.POSITIVE_INFINITY;
 }
 
 function hideAllParabolas(){
	 showPara = false;
	 parabolas.forEach(function (value) {
	  	value.hideElement();
	 }); 
 }
 
 function showAllParabolas(){
	 showPara = true;
	 parabolas.forEach(function (value) {
	  	value.showElement();
	 }); 
 }
 
 function onclickGenerate(){
	 var number = document.getElementById("pointNumber").value;
     drawParabolas(drawRandomPoints(number, board, attr), board);
 }
 
 function onclickRun(){
	//  document.getElementById("stepBtn").setAttribute("disabled","");
	//  mp.moveTo([1,-9],6000);
	SS = [];
	EL = new RbTree();
	VD = [];
	map = new Hashtable();
	for(var pt of points){
		var ptclass = new point(pt.X(),pt.Y(),true);
		EL.insert(ptclass.y,ptclass);
	}
 }
 
 function onclickStart(){
	 if(startClicked) return;
	 startClicked = true;
	 for(var pt of points){
		var ptclass = new point(pt.X(),pt.Y(),true);
        EL.insert(ptclass.y,ptclass);
    }
	 document.getElementById("runBtn").removeAttribute("disabled");
	 document.getElementById("stepBtn").removeAttribute("disabled");
	 document.getElementById("generateBtn").setAttribute("disabled","");
	 
 }
 
 function moveSweepline(toY){
	 var diff = Math.abs(toY - oldY);
	 var runingTime = 1000 * diff / 2;
	 mp.moveTo([1,toY],runingTime);
	 oldY = toY;
 }
 
 //add one point pt [x, y]
 function addPoint(pt, brd){
	 brd.create('point',pt,{
		fillColor: "red",
		strokeColor: "red",
		withLabel: false
		//size: 2,
		//face:'<>'
	 });
 }
 
 function addEdge(point1, point2){
	 var edgeAttr = {straightFirst:false, straightLast:false, strokeWidth:2, strokeColor:'black'};
	 var li3 = board.create('line',[[point1[0],point1[1]],[point2[0],point2[1]]], edgeAttr);
 }
 
 function onclickNextStep(){
	if(EL.size > 0){
        var node = EL.maxNode();
        var pt = node.value;
		var line = node.key;
		moveSweepline(line);
		var index = -1;
		EL.remove(node.key);
        if(pt.isSite){
            if(SS.length == 0){
                SS.push(pt);
            }else{
                index = BSarc(SS,0,SS.length,pt.x,line);
                var above = SS[index];
                if(index > 0 && index < SS.length - 1 && !point.isSamePoint(SS[index-1],SS[index+1])){
					var cir = map.get(new circle(SS[index-1],above,SS[index+1]));
					if(cir != null){
						var center = cir[0];
						var radius = cir[1];
						// console.log(SS[index-1],above,SS[index+1]);
						// console.log(EL.toSortedArray());
						// console.log(EL.findNode(center.y-radius));
						EL.remove(center.y-radius);
					}
                }
                SS.splice(index,0,above,pt);
				index++;
				console.log(SS,index);
				if(index > 1 && !map.containsKey(new circle(SS[index-2],SS[index-1],SS[index]))){
					
					var center = point.center(SS[index-2],SS[index-1],SS[index]);
					var radius = point.distance(center,SS[index-1]);
					console.log("left",center,radius,center.y - radius < line);
					// may need a set to store added centers
					if(center.y - radius < line && center.x < pt.x){
						console.log("left in");
						EL.insert(center.y - radius,center);
						map.put(new circle(SS[index-2],SS[index-1],SS[index]),[center,radius]);
					}
				}
				if(index < SS.length-2 && !map.containsKey(new circle(SS[index],SS[index+1],SS[index+2]))){
					var center = point.center(SS[index],SS[index+1],SS[index+2]);
					var radius = point.distance(center,SS[index+1]);
					console.log("right",center,radius,center.y - radius < line);
					// may need a set to store added centers
					if(center.y - radius < line && center.x > pt.x){
						console.log("right in");
						EL.insert(center.y - radius,center);
						map.put(new circle(SS[index],SS[index+1],SS[index+2]),[center,radius]);
					}
				}
            }
        }else{
			index = BScenter(SS,0,SS.length,pt.x,line);
			console.log(index,pt);
			if(index > 1 && index < SS.length-1 && !map.containsKey(new circle(SS[index-2],SS[index-1],SS[index+1]))){
				var yarr = [SS[index-2].y,SS[index-1].y,SS[index+1].y];
				var miny = Math.min(...yarr);
				var center = point.center(SS[index-2],SS[index-1],SS[index+1]);
				var radius = point.distance(center,SS[index-1]);
				console.log("vertex left",center,radius,(yarr[0] == miny && center.x > SS[index-2].x) || (yarr[2] == miny && center.x < SS[index+1].x),center.y - radius < line);
				if((yarr[0] == miny && center.x > SS[index-2].x) || (yarr[2] == miny && center.x < SS[index+1].x))
					if(center.y - radius < line){
						EL.insert(center.y - radius,center);
						map.put(new circle(SS[index-2],SS[index-1],SS[index+1]),[center,radius]);
					}
			}
			if(index < SS.length-2 && index > 0 && !map.containsKey(new circle(SS[index-1],SS[index+1],SS[index+2]))){
				var yarr = [SS[index-1].y,SS[index+1].y,SS[index+2].y];
				var miny = Math.min(...yarr);
				var center = point.center(SS[index-1],SS[index+1],SS[index+2]);
				var radius = point.distance(center,SS[index+1]);
				console.log("vertex right",center,radius,(yarr[0] == miny && center.x > SS[index-1].x) || (yarr[2] == miny && center.x < SS[index+2].x),center.y - radius < line);
				if((yarr[0] == miny && center.x > SS[index-1].x) || (yarr[2] == miny && center.x < SS[index+2].x))
					if(center.y - radius < line){
						EL.insert(center.y - radius,center);
						map.put(new circle(SS[index-1],SS[index+1],SS[index+2]),[center,radius]);
					}
			}

			if(index > 1){
				var cir = map.get(new circle(SS[index-2],SS[index-1],SS[index]));
				if(cir != null){
					var center = cir[0];
					var radius = cir[1];
					EL.remove(center.y-radius);
				}
			}
			if(index < SS.length-2){
				var cir = map.get(new circle(SS[index],SS[index+1],SS[index+2]));
				if(cir != null){
					var center = cir[0];
					var radius = cir[1];
					EL.remove(center.y-radius);
				}
			}
            SS.splice(index,1);
			console.log(SS);
			VD.push(pt);
			addPoint([pt.x,pt.y],board);
        }
    }
 }

 function BSarc(arr,left,right,value,line){
    if(left >= right){
		// console.log(left);
        return left;
    }
    var li = Number.NEGATIVE_INFINITY,ri = Number.POSITIVE_INFINITY;
	var mid = left+Math.floor((right-left)/2);
	var arc = arr[mid];
	if(mid > 0 && mid < arr.length-1 && point.isSamePoint(arr[mid-1],arr[mid+1])){
		var temparr = point.paraIntersection(arr[mid-1],arc,line);
		li = temparr[0], ri = temparr[1];
	}else{
		if(mid > 0){
			var boundindex = arr[mid-1].y < arc.y ? 1 : 0;
			li = point.paraIntersection(arr[mid-1],arc,line)[boundindex];
		}
		if(mid < arr.length-1){
			var boundindex = arr[mid+1].y < arc.y ? 0 : 1;
			ri = point.paraIntersection(arc,arr[mid+1],line)[boundindex];
		}
	}
	// console.log(mid,li,ri);
    if(value > li && value <= ri){
		// console.log(mid);
        return mid;
    }
    if(value > ri){
        return BSarc(arr,mid+1,right,value,line);
    }else{
        return BSarc(arr,left,mid-1,value,line);
    }
}

function BScenter(arr,left,right,value,line){
    if(left >= right){
        return left;
    }
    var li = Number.NEGATIVE_INFINITY,ri = Number.POSITIVE_INFINITY;
    var mid = left+Math.floor((right-left)/2);
	var arc = arr[mid];
	if(mid > 0 && mid < arr.length-1 && point.isSamePoint(arr[mid-1],arr[mid+1])){
		var temparr = point.paraIntersection(arr[mid-1],arc,line);
		li = temparr[0], ri = temparr[1];
	}else{
		if(mid > 0){
			var boundindex = arr[mid-1].y < arc.y ? 1 : 0;
			li = point.paraIntersection(arr[mid-1],arc,line)[boundindex];
		}
		if(mid < arr.length-1){
			var boundindex = arr[mid+1].y < arc.y ? 0 : 1;
			ri = point.paraIntersection(arc,arr[mid+1],line)[boundindex];
		}
	}
	console.log(mid,li,ri);
    if(point.xEqualwithEpsilon(li,value) && point.xEqualwithEpsilon(ri,value)){
        return mid;
    }else if(point.xEqualwithEpsilon(li,value)){
        return mid-1;
    }else if(point.xEqualwithEpsilon(ri,value)){
        return mid+1;
    }
    if(value > ri){
        return BScenter(arr,mid+1,right,value,line);
    }else{
        return BScenter(arr,left,mid-1,value,line);
    }
}
 
 var beachline;
 var points = [];
 var parabolas = [];
 var showPara = true;
 var startClicked = false;
 var SS = [];
 var EL = new RbTree();
 var VD = [];
 var map = new Hashtable();
 //var stepPosistions = [10,8,6,4,2,0,-2,-4,-6,-8,-10], currStep = 0;
 var attr = {
		fillColor: "black",
		strokeColor: "black",
		withLabel: false
	};
	
 var board = JXG.JSXGraph.initBoard('jxgbox', {boundingbox: [-10, 10, 10, -10], axis:false});
 
 document.getElementById("generateBtn").onclick = onclickGenerate;
 document.getElementById("option1").onclick = showAllParabolas;
 document.getElementById("option2").onclick = hideAllParabolas;
 document.getElementById("startBtn").onclick = onclickStart;
 document.getElementById("runBtn").onclick = onclickRun;
 document.getElementById("stepBtn").onclick = onclickNextStep;
 
 //beachline, initialize only once because reference to points array
 board.create('functiongraph', [function(x){
		 var minimum = Number.POSITIVE_INFINITY;
		 points.forEach(function (value) {
			if(parabola(value, x) < minimum) minimum = parabola(value, x);
		 }); 
		 return minimum;}], {strokeColor:'red', strokeWidth:2});

 //initialize horizontal gdragable line
 var mp = board.create('point',[1,9],{name:"drag", withLabel: false, face:'o', size:8, strokeColor:'red', fillOpacity:0.6, strokeOpacity: 0.6});
 var horizontalLine = board.create('line',["drag",[20000,"Y(drag)"]], {straightFirst:true, straightLast:true, strokeWidth:1});
 var oldY = mp.Y();
 //drawParabolas(drawRandomPoints(10, board, attr), board);

 var getMouseCoords = function(e, i) {
        var cPos = board.getCoordsTopLeftCorner(e, i),
            absPos = JXG.getPosition(e, i),
            dx = absPos[0]-cPos[0],
            dy = absPos[1]-cPos[1];

        return new JXG.Coords(JXG.COORDS_BY_SCREEN, [dx, dy], board);
    },
    down = function(e) {
        var canCreate = true, i, coords, el;

        if (e[JXG.touchProperty]) {
            // index of the finger that is used to extract the coordinates
            i = 0;
        }
        coords = getMouseCoords(e, i);

        for (el in board.objects) {
            if(JXG.isPoint(board.objects[el]) && board.objects[el].hasPoint(coords.scrCoords[1], coords.scrCoords[2])) {
                canCreate = false;
                break;
            }
        }
		
		//if(mp.hasPoint(coords.scrCoords[1], coords.scrCoords[2])) canCreate = false;
               
        if (canCreate) {
            var tmp = board.create('point', [coords.usrCoords[1], coords.usrCoords[2]], attr);
			points.push(tmp);
			var tmpArr = [tmp];
			drawParabolas(tmpArr, board);
        }
    };

 board.on('down', down);

 //addEdge([1,1], [2,2]);