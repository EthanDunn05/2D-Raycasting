class Map {
	constructor(map) {
		// Load the json file
		let URL = './maps/' + map + '.json';
		this.json = loadJSON(URL);
	}

	load() {
		let json = this.json;
		// Load each type of thing
		if (json.blocks != null) this.loadBlocks();
		if (json.lines != null) this.loadLines();
	}

	loadLines() {
		let lines = this.json.lines;

		for (let i = 0; i < lines.length; i++) {
			let l = lines[i];
			if (l.x == null || l.y == null || l.x1 == null || l.y1 == null) return;

			walls.push(Line.fromPoints(l.x, l.y, l.x1, l.y1));
		} 
	}

	loadBlocks() {
		let blocks = this.json.blocks;
		print("Blocks: " + blocks);
		
		for (let i = 0; i < blocks.length; i++) {
			Map.createBlock(blocks[i]);
		} 
	}

	static createBlock(b) {
		// Gotta make sure it doesn't crash due to a bad map
		if (b.x == null || b.y == null || b.w == null || b.h == null) return;
		
		walls.push(Line.fromPoints(b.x, b.y, b.x, b.y+b.h)),
		walls.push(Line.fromPoints(b.x, b.y+b.h, b.x+b.w, b.y+b.h)),
		walls.push(Line.fromPoints(b.x+b.w, b.y+b.h, b.x+b.w, b.y)),
		walls.push(Line.fromPoints(b.x+b.w, b.y, b.x, b.y));
	}
}