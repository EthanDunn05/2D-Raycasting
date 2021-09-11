let walls = [];
let rays = [];
let map;
let light;

function preload() {
	map = new Map('default');
}

function setup() {
	noStroke();
  	let canv = createCanvas(500, 500);
	background(10);

	// Load Map from json
	map.load();

	light = new Light(width/2, height/2);
}

// Runs Every Frame
function draw() {
  	background(5)
	light.x = mouseX;
	light.y = mouseY;
	light.update();
	
	//rays.forEach((e) => e.draw());
	//walls.forEach((e) => e.draw());
}