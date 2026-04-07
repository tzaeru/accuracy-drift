// Velocity Verlet: position advanced with acceleration term, velocity averaged over accel of previous+current frames.
// Assumes p.acceleration is already computed at current position (from init or previous step).
// x' = x + v*dt + 0.5*a*dt^2,  a' = F(x'),  v' = v + 0.5*(a + a')*dt.
// Order 2, symplectic.
function velocityVerletStep(particles, dt, gravityPull, precision) {
    const f = (v) => makeFloat(v, precision);
    dt = f(dt);
    const halfDt = f(dt * 0.5);
    const halfDtSq = f(halfDt * dt);

    // Advance all positions first
    for (const p of particles) {
        p.position.x = f(p.position.x + f(p.velocity.x * dt) + f(p.acceleration.x * halfDtSq));
        p.position.y = f(p.position.y + f(p.velocity.y * dt) + f(p.acceleration.y * halfDtSq));
    }
    // Compute new acceleration at new positions, then complete velocity update
    for (const p of particles) {
        const force = gravityPull(p);
        const newAx = f(force.x);
        const newAy = f(force.y);
        p.velocity.x = f(p.velocity.x + f((p.acceleration.x + newAx) * halfDt));
        p.velocity.y = f(p.velocity.y + f((p.acceleration.y + newAy) * halfDt));
        p.acceleration.x = newAx;
        p.acceleration.y = newAy;
    }
}
