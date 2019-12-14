class point {
	constructor(x, y, isSite) {
	  this.x = x;
	  this.y = y;
	  this.isSite = isSite;
	//   this.points = points;
	}

	// addcenter(p){
	// 	if(this.isSite){
	// 		this.points.push(p);
	// 	}
	// }

	static center(p1, p2, p3) {
		var x1 = p1.x, y1 = p1.y, x2 = p2.x, y2 = p2.y, x3 = p3.x, y3 = p3.y;
		var a, b;
		a = (y2 - y1) / (x2 - x1);
		b = y1 - a * x1;
	
		var xMiddle = (x1 + x2) / 2;
		var yMiddle = (y1 + y2) / 2;
		var c, lastX, lastY;
		if (a != 0) {
			c = yMiddle - (-1 / a) * xMiddle;
			lastX = (Math.pow(x1, 2) + Math.pow(y1, 2) - Math.pow(x3, 2) - Math.pow(y3, 2) - 2 * c * y1 + 2 * c * y3) / (2 * ((x1 - x3) - (1 / a) * (y1 - y3)));
			lastY = (-1 / a) * lastX + c;
		} else {
			lastX = c = xMiddle;
			lastY = (Math.pow(x1, 2) + Math.pow(y1, 2) - Math.pow(x3, 2) - Math.pow(y3, 2) + 2 * lastX * (x3 - x1)) / (2 * (y1 - y3));
		}
		// var points = [];
		// points.push(p1,p2,p3);
		return new point(lastX,lastY,false);
	}

	static distance(a, b) {
		const dx = a.x - b.x;
		const dy = a.y - b.y;
	
		return Math.hypot(dx, dy);
	}

	static paraIntersection(p1, p2, yp) {
        var x1 = p1.x, y1 = p1.y, x2 = p2.x, y2 = p2.y;
        var a1 = 1/(2*(y1-yp)), b1 = -x1/(y1-yp), c1 = (x1*x1+y1*y1-yp*yp)/(2*(y1-yp));
        var a2 = 1/(2*(y2-yp)), b2 = -x2/(y2-yp), c2 = (x2*x2+y2*y2-yp*yp)/(2*(y2-yp));
        var a = a1-a2, b = b1-b2, c = c1-c2;
        var sq = Math.sqrt(b*b - 4*a*c);
        var ax1 = (-b - sq)/(2*a), ax2 = (-b + sq)/(2*a);
        // var ay1 = a1*x1*x1 + b1 * x1 + c1, ay2 = a2*x2*x2 + b2 * x2 + c2;
        var ans = [Math.min(ax1,ax2),Math.max(ax1,ax2)];
		return ans;
	}

	static xEqualwithEpsilon(p1x,p2x){
		var e = 1e-9;
		return Math.abs(p1x-p2x) < e;
	}

	static isSamePoint(a, b){
		return a.x == b.x && a.y == b.y;
	}
}