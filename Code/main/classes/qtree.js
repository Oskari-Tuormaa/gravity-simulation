class QTree {
	constructor(x, y, w, h, limit) {
		this.particles = [];
		this.bounds = new Rectangle(x, y, w, h);
		this.limit = limit;
		this.children = [];
		this.isSplit = false;
	}

	// Add particle to QTree
	addParticle(p) {

		// If particle is not within QTree bounds, ignore particle
		if (!this.bounds.contains(p.pos.x, p.pos.y)) {
			return;
		}

		// If QTree is split, add particle to all children
		if (this.isSplit) {
			this.addParticleChildren(p);
			return;
		}

		// If amount of particles + 1 doesn't excede limit, add particle
		if (this.particles.length + 1 < this.limit) {
			this.particles.push(p);
			return;

		}

		// If particle is within bounds, QTree isn't split and particles + 1 excedes
		// limit, split the QTree and add particle to children.
		this.split();
		this.addParticleChildren(p);
	}

	// Split QTree into 4 children
	split() {
		children[0] = new QTree(this.bounds.x - this.bounds.x / 4,
			this.bounds.y - this.bounds.y / 4,
			this.bounds.w / 2, this.bounds.h / 2,
			this.limit);

		children[1] = new QTree(this.bounds.x + this.bounds.x / 4,
			this.bounds.y - this.bounds.y / 4,
			this.bounds.w / 2, this.bounds.h / 2,
			this.limit);

		children[2] = new QTree(this.bounds.x - this.bounds.x / 4,
			this.bounds.y + this.bounds.y / 4,
			this.bounds.w / 2, this.bounds.h / 2,
			this.limit);

		children[3] = new QTree(this.bounds.x + this.bounds.x / 4,
			this.bounds.y + this.bounds.y / 4,
			this.bounds.w / 2, this.bounds.h / 2,
			this.limit);

		this.isSplit = true;

		// Feed current particles to children and delete own particles
		for (var i = 0; i < this.particles.length; i++) {
			for (var j = 0; j < this.children.length; j++) {
				this.children[j].addParticle(particles[i]);
			}
		}

		this.particles = [];
	}

	// Add particle to children
	addParticleChildren(p) {
		for (var i = 0; i < this.children.length; i++) {
			this.children[i].addParticle(p);
		}
	}

	// Fetch all particles of child-QTrees that intersect rect
	fetch(rect) {
		var temp = [];

		// If rect doesn't intersect bounds, return an empty array
		if (!this.bounds.intersects(rect)) {
			return temp;
		}

		// If QTree is split, fetch particles from children and add those to temp
		if (this.isSplit) {
			for (var i = 0; i < this.children.length; i++) {
				temp = temp.concat(this.children[i].fetch(rect));
			}
		} else {
			temp.concat(particles);
		}
		return temp;
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