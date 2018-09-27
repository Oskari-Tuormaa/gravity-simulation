class QTree {
	constructor(x, y, w, h) {
		this.particles = [];
		this.bounds = new Rectangle(x, y, w, h);
	}

	// Add particle to QTree
	addParticle(p) {
		this.particles.push(p);
	}
}

class Rectangle {
	constructor(x, y, w, h) {
		this.pos = createVector(x, y);
		this.size = createVector(w, h);
	}

	// Return true if point x, y is inside the rectangle
	contains(x, y) {
		var insideW = abs(this.pos.x - this.x) < this.size.x;
		var insideH = abs(this.pos.y - this.y) < this.size.y;
		return insideW && insideH;
	}

	// Return true if this rectangle and rec are intersecting
	intersects(rec) {
		var insideW = abs(this.pos.x - rec.pos.x) < this.size.x / 2 + rec.size.x / 2;
		var insideH = abs(this.pos.y - rec.pos.y) < this.size.y / 2 + rec.size.y / 2;
		return insideW && insideH;
	}
}