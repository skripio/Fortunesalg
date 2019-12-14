 //draw (len) random points of (range) with (attr) on brd, concate new points to current point set 
 function drawRandomPoints(len, brd, attr, range){
	if(len <= 0) return;
	range = (typeof range !== 'undefined') ?  range :  [-10, 10, 10, -10];
	var p = [];
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
 
 function setSteps(p){
	 stepPosistions = p;
 }
 
 function onclickNextStep(){
	 if(currStep < stepPosistions.length)
	 	mp.moveTo([1,stepPosistions[currStep++]],1000);
 }
 
 var beachline;
 var points = [];
 var parabolas = [];
 var showPara = true;
 var stepPosistions = [10,8,6,4,2,0,-2,-4,-6,-8,-10], currStep = 0;
 var attr = {
		fillColor: "black",
		strokeColor: "black",
		withLabel: false
	};
	
 var board = JXG.JSXGraph.initBoard('jxgbox', {boundingbox: [-10, 10, 10, -10], axis:false});
 
 //beachline, initialize only once because reference to points array
 board.create('functiongraph', [function(x){
		 var minimum = Number.POSITIVE_INFINITY;
		 points.forEach(function (value) {
			if(parabola(value, x) < minimum) minimum = parabola(value, x);
		 }); 
		 return minimum;}], {strokeColor:'red', strokeWidth:2});
 
// var li3 = board.create('line',[[-1,1],[1,-1]], {straightFirst:false, straightLast:false, strokeWidth:2});

 //initialize horizontal gdragable line
 var mp = board.create('point',[1,0],{name:"drag", withLabel: false, face:'o', size:8, strokeColor:'red', fillOpacity:0.6, strokeOpacity: 0.6});
 var horizontalLine = board.create('line',["drag",[20000,"Y(drag)"]], {straightFirst:true, straightLast:true, strokeWidth:1});
 
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
