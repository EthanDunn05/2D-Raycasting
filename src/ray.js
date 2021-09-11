class Ray extends Line {
	constructor(x, y, direction, magnitude) {
		super(x, y, direction, magnitude);

		this.intersects = false;
		this.findIntersection();
	}

	draw() {
		super.draw();
		circle(this.x1, this.y1, 7);
	}

	findIntersection() {
		let inters = this.getIntersections();

		// Get the closes intersection
		let closest = null;
		for (let i = 0; i < inters.length; i++) {
			let inter = inters[i];

			if (closest == null) closest = inter;

			let currentDist = Math.hypot(closest.x - this.x, closest.y - this.y);
			let newDist = Math.hypot(inter.x - this.x, inter.y - this.y);

			if (newDist < currentDist) closest = inter;
		}

		if (closest == null) return;
		this.x1 = closest.x;
		this.y1 = closest.y;
	}

	getIntersections() {
		let ints = [];

		for (let w = 0; w < walls.length; w++) {
			let seg = walls[w];

			// Ignore parallel lines
			if (seg.dir == this.dir) continue;

			// Get the magnitudes where the ray and segment are at the same location
			var segMag = (this.dx*(seg.y-this.y) + this.dy*(this.x-seg.x))/(seg.dx*this.dy - seg.dy*this.dx);
			var thisMag = (seg.x+seg.dx*segMag-this.x)/this.dx;

			// Check if it's a valid magnitude
			if(thisMag < 0) continue;
			if(segMag < 0 || segMag > seg.mag) continue;

			ints.push ({
				x:this.x + this.dx * thisMag,
				y:this.y + this.dy * thisMag
			});
		}
		return ints;
	}
}