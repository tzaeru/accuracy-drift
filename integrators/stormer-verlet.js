// Störmer-Verlet (Position Verlet): tracks current and previous position, no explicit velocity.
// x' = 2*x - x_prev + a*dt^2.  Velocity recovered via centered difference for display.
// On first call, x_prev is bootstrapped from x - v*dt + 0.5*a*dt^2.
// Order 2, symplectic.
function stormerVerletStep(particles, dt, gravityPull, precision) {
    const f = (v) => makeFloat(v, precision);
    dt = f(dt);
    const dtSq = f(dt * dt);
    const inv2dt = f(1 / f(2 * dt));

    // Bootstrap previous positions on first step
    for (const p of particles) {
        if (p._xPrev === undefined) {
            p._xPrev = {
                x: f(p.position.x - f(p.velocity.x * dt) + f(p.acceleration.x * dtSq * 0.5)),
                y: f(p.position.y - f(p.velocity.y * dt) + f(p.acceleration.y * dtSq * 0.5)),
            };
        }
    }
    // Compute forces at current (consistent) positions
    for (const p of particles) {
        const force = gravityPull(p);
        p._ax = f(force.x);
        p._ay = f(force.y);
    }
    // Advance all positions, recover velocity, slide window
    for (const p of particles) {
        const nx = f(f(2 * p.position.x) - p._xPrev.x + f(p._ax * dtSq));
        const ny = f(f(2 * p.position.y) - p._xPrev.y + f(p._ay * dtSq));

        p.velocity.x = f((nx - p._xPrev.x) * inv2dt);
        p.velocity.y = f((ny - p._xPrev.y) * inv2dt);
        p.acceleration.x = p._ax;
        p.acceleration.y = p._ay;
        p._xPrev = { x: p.position.x, y: p.position.y };
        p.position = { x: nx, y: ny };
    }
}
