var world;

function setup() {
	createCanvas(windowWidth, windowHeight);

	world = new World(0.01, 1);

	for (var i = 0; i < 1000; i++) {
		var newPart = new Particle(100, random(0, width), random(0, height), 0, 0);
		newPart.wrapAround = false;
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