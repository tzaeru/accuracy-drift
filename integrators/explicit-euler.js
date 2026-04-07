// Explicit Euler: both position and velocity updated from previous frame's values.
// x' = x + v*dt,  v' = v + a*dt, then recompute a at new x.
// Order 1, not symplectic.
function explicitEulerStep(particles, dt, gravityPull, precision) {
    const f = (v) => makeFloat(v, precision);
    dt = f(dt);

    for (const p of particles) {
        p.position.x = f(p.position.x + f(p.velocity.x * dt));
        p.position.y = f(p.position.y + f(p.velocity.y * dt));
        p.velocity.x = f(p.velocity.x + f(p.acceleration.x * dt));
        p.velocity.y = f(p.velocity.y + f(p.acceleration.y * dt));
    }
    for (const p of particles) {
        const force = gravityPull(p);
        p.acceleration.x = f(force.x);
        p.acceleration.y = f(force.y);
    }
}
