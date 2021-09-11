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

	// Bounding wall
	Map.createBlock({
		x:0,
		y:0,
		w:width,
		h:height
	});

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
	
	if (Settings.viewRays) rays.forEach((e) => e.draw());
	if (Settings.viewWalls) walls.forEach((e) => e.draw());
}

// Global Object for ease of access in HTML
let Settings = {
	viewRays:false,
	toggleRays:() => Settings.viewRays = !Settings.viewRays,

	viewWalls:true,
	toggleWalls:() => Settings.viewWalls = !Settings.viewWalls,
};