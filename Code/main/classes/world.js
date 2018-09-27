class World {
	constructor(grav, dens) {
		this.gravity = grav;
		this.density = dens;
		this.particles = [];
	}

	// Add particle to simulation
	addParticle(p) {
		p.radius = this.massToRadius(p.mass);
		this.particles.push(p);
	}

	// Remove particle from simulation
	removeParticle(p) {
		for (var i = 0; i < this.particles.length; i++) {
			if (p == this.particles[i]) {
				this.particles.splice(i, 1);
				break;
			}
		}
	}

	// Does physics calculations to all particles and draws them to canvas
	// afterwards.
	tick() {
		for (var i = 0; i < this.particles.length; i++) {
			var p1 = this.particles[i];
			p1.tick();
			p1.show();

			// Adds gravitational force between particles;
			for (var j = 0; j < this.particles.length; j++) {
				var p2 = this.particles[j];

				// Particles should not attract themselves
				if (p1 != p2) {
					p1.addForce(this.calculateForce(p1.pos, p1.mass, p2.pos, p2.mass));
					this.checkCollision(p1, p2);
				}
			}
		}
	}

	// Checks if theres collision between two particles
	checkCollision(p1, p2) {
		if (createVector(p1.pos.x - p2.pos.x, p1.pos.y - p2.pos.y).mag() < p1.radius + p2.radius) {
			this.collision(p1, p2);
		}
	}

	// Handle collision between particles
	collision(p1, p2) {
		this.moveMassRatio(p1, p2);
		this.addParticles(p1, p2);
		this.removeParticle(p2);
	}

	// Adds velocity and mass of particle2 to particle1
	addParticles(p1, p2) {
		p1.vel.x = (p1.vel.x * p1.mass + p2.vel.x * p2.mass) / (p1.mass + p2.mass);
		p1.vel.y = (p1.vel.y * p1.mass + p2.vel.y * p2.mass) / (p1.mass + p2.mass);
		p1.mass += p2.mass;
		p1.radius = this.massToRadius(p1.mass);
	}

	// Moves particle1 to the mass midpoint of particle1 and particle2
	moveMassRatio(p1, p2) {
		var ratio = p2.mass / (p1.mass + p2.mass);
		var newPos = createVector(p2.pos.x - p1.pos.x, p2.pos.y - p1.pos.y);
		newPos.mult(ratio);
		p1.pos.add(newPos);
	}

	// Calculates radius based on mass and current density
	massToRadius(mass) {
		var radius = this.density * Math.pow(mass / (Math.PI * 4.0 / 3.0), 1.0 / 3.0);
		return radius;
	}

	// Calculates and returns the attraction force between two points in space
	calculateForce(pos1, mass1, pos2, mass2) {
		var force = createVector(pos2.x - pos1.x, pos2.y - pos1.y);
		var magnitude = this.gravity * (mass1 * mass2 / pow(force.mag(), 2));
		// Constrain magnitude to avoid pinging
		magnitude = constrain(magnitude, 0, 1000);
		force.setMag(magnitude);

		return force;
	}
}