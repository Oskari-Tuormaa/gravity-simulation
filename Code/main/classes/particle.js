class Particle {
	constructor(m, x, y, xs, ys) {
		this.mass = m;
		this.pos = createVector(x, y, 0);
		this.vel = createVector(xs, ys, 0);
		this.acc = createVector(0, 0, 0);
		this.radius = 10;
		this.wrapAround = false;
	}

	// Draw particles to canvas
	show() {
		push();
		noStroke();
		translate(this.pos.x, this.pos.y);
		ellipse(0, 0, this.radius * 2, this.radius * 2);
		pop();
	}

	// Advance particles 1 physics tick
	tick() {
		// If wrapAround is true -> Wrap around
		if (this.wrapAround) {
			this.pos.x = (this.pos.x + width) % width;
			this.pos.y = (this.pos.y + height) % height;
		}

		this.pos.add(this.vel);
		this.vel.add(this.acc);
		this.acc.mult(0);
	}

	// Adds force f to particle acceleration
	addForce(f) {
		this.acc.add(f.div(this.mass));
	}
}