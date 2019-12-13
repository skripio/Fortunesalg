class point {
	constructor(x, y, isSite,points) {
	  this.x = x;
	  this.y = y;
	  this.isSite = isSite;
	  this.points = points;
	}

	addcenter(p){
		if(this.isSite){
			this.points.push(p);
		}
	}

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
		var points = [];
		points.push(p1,p2,p3);
		return new point(lastX,lastY,false,points);
	}

	static distance(a, b) {
		const dx = a.x - b.x;
		const dy = a.y - b.y;
	
		return Math.hypot(dx, dy);
	}

	static isSamePoint(a, b){
		return a.x == b.x && a.y == b.y;
	}
}