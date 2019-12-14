class arc {
	constructor(point) {
      this.point = point;
    }
    static intersection(p1, p2, yp) {
        var ans = [];
        // if(p1 == null){
        //     ans.push(Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY);
        //     return ans;
        // }
        // if(p2 == null){
        //     ans.push(Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY);
        //     return ans;
        // }
        var x1 = p1.x, y1 = p1.y, x2 = p2.x, y2 = p2.y;
        var a1 = 1/(2*(y1-yp)), b1 = -x1/(y1-yp), c1 = (x1*x1+y1*y1-yp*yp)/(2*(y1-yp));
        var a2 = 1/(2*(y2-yp)), b2 = -x2/(y2-yp), c2 = (x2*x2+y2*y2-yp*yp)/(2*(y2-yp));
        var a = a1-a2, b = b1-b2, c = c1-c2;
        var sq = Math.sqrt(b*b - 4*a*c);
        var ax1 = (-b - sq)/(2*a), ax2 = (-b + sq)/(2*a);
        // var ay1 = a1*x1*x1 + b1 * x1 + c1, ay2 = a2*x2*x2 + b2 * x2 + c2;
        ans.push(ax1,ax2);
		return ans;
	}
}