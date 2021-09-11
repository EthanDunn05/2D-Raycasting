class Light {

	constructor(x, y) {
		this.x = x;
		this.y = y;

		this.update();
	}

	update() {
		this.castRays();
		this.fillSight();
	}

	castRays() {
		rays = [];

		// Cast rays towards each wall's ends
		for (let w = 0; w < walls.length; w++) {
			let wall = walls[w];

			// Cast a ray to the start of the wall
			let direction = Math.atan2(wall.y - this.y, wall.x - this.x);
			rays.push(new Ray(this.x, this.y, direction + 0.00001, 1000));
			rays.push(new Ray(this.x, this.y, direction - 0.00001, 1000));

			// Cast a ray to the end of the wall
			direction = Math.atan2(wall.y1 - this.y, wall.x1 - this.x);
			rays.push(new Ray(this.x, this.y, direction + 0.00001, 1000));
			rays.push(new Ray(this.x, this.y, direction - 0.00001, 1000));
		}

		this.sortRays();

		/* Debug code
		fill(255);
		for (let i = 0; i < rays.length; i++) {
			let ray = rays[i];
			text(rays.indexOf(ray), ray.x1, ray.y1);
		}
		*/
	}

	sortRays() {
		let that = this;

		// Sort by angle - lowest to highest
		rays.sort(function (ray1, ray2) {
			return ray1.dir - ray2.dir;
		});
	}

	fillSight() {
		fill(40, 40, 40, 100);
		//noStroke();
		stroke(200);

		// Create a polygon through each ray
		beginShape();
		for (let i = 0; i < rays.length; i++) {
			let ray1 = rays[i];
			vertex(ray1.x1, ray1.y1);
		}
		endShape(CLOSE);
	}
}