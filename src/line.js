class Line {
	constructor(x, y, direction, magnitude) {
		this.x = x;
		this.y = y;
		this.dir = direction;
		this.mag = magnitude;

		this.dx = cos(this.dir);
		this.dy = sin(this.dir);

		this.x1 = this.dx * this.mag + this.x;
		this.y1 = this.dy * this.mag + this.y;
	}

	
	static fromPoints(x1, y1, x2, y2) {
		let dir = Math.atan2(y2 - y1, x2 - x1);
		let mag = Math.hypot(y2 - y1, x2 - x1);
		
		return new this(x1, y1, dir, mag);
	}

	draw() {
		noFill();
		stroke(100);

		line(this.x, this.y, this.x1, this.y1);
	}
}