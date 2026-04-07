class Particle {
    constructor(x, y) {
        this.position = { x, y };
        this.velocity = { x: 0, y: 0 };
        this.acceleration = { x: 0, y: 0 };
    }
}

function createParticles(existing, count) {
    const particles = existing.slice();
    for (let i = particles.length; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        particles.push(new Particle(Math.cos(angle), Math.sin(angle)));
    }
    return particles;
}
