function drawRandomPoints(len, brd, attr, range){
	if(len <= 0) return;
	range = (typeof range !== 'undefined') ?  range :  [-10, 10, 10, -10];
	p = [];
	for (i=0;i<len;i++) 
		p[i] = brd.createElement('point',[Math.random() * (range[1] - range[0]) + range[0], Math.random() * (range[3] - range[2]) + range[2]],attr);
	return p;
 }
 
 function drawParabolas(p, brd){
	 p.forEach(function (value) {
	  	board.create('functiongraph', [function(x){return parabola(value, x);}],{dash:2});
	 }); 
	 brd.create('functiongraph', [function(x){
		 var minimum = Number.POSITIVE_INFINITY;
		 p.forEach(function (value) {
			if(parabola(value, x) < minimum) minimum = parabola(value, x);
		 }); 
		 return minimum;}]);
 }
 
 function parabola(p1, x) { //site, horizontal line and x coordinate
 	var y1 = p1.Y();
	var x1 = p1.X();
	var l = mp.Y();
	if(y1 > mp.Y())
	  return 1/(2*(y1 - l))*(Math.pow((x - x1),2) + Math.pow(y1, 2) - Math.pow(l, 2));
	else
	  return Number.POSITIVE_INFINITY;
 }
 
 var attr = {
		fillColor: "black",
		strokeColor: "black",
		withLabel: false
	};
 var board = JXG.JSXGraph.initBoard('jxgbox', {boundingbox: [-10, 10, 10, -10], axis:true});
 
// var li3 = board.create('line',[[-1,1],[1,-1]], {straightFirst:false, straightLast:false, strokeWidth:2});

 //initialize horizontal gdragable line
 var mp = board.create('point',[1,0],{name:"drag", withLabel: false, face:'o', size:8, strokeColor:'red', fillOpacity:0.6, strokeOpacity: 0.6});
 var horizontalLine = board.create('line',["drag",[20000,"Y(drag)"]], {straightFirst:true, straightLast:true, strokeWidth:2});
 
 drawParabolas(drawRandomPoints(10, board, attr), board);

