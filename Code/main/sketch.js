var world;

function setup() {
	createCanvas(windowWidth, windowHeight);

	world = new World(0.1, 1);
	for (var i = 0; i < 100; i++) {
		var newPart = new Particle(1, 10, random(0, width), random(0, height), 0, 0);
		newPart.wrapAround = true;
		world.addParticle(newPart);
	}
}

function draw() {
	background(51);

	world.tick();
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}