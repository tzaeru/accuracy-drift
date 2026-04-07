// Leapfrog (Kick-Drift-Kick): half-step velocity kicks, staggering a full position drift.
// Assumes p.acceleration is already computed at current position (from init or previous step).
// v_half = v + a*dt/2,  x' = x + v_half*dt,  a' = F(x'),  v' = v_half + a'*dt/2.
// Order 2, symplectic.
function leapfrogStep(particles, dt, gravityPull, precision) {
    const f = (v) => makeFloat(v, precision);
    dt = f(dt);
    const halfDt = f(dt * 0.5);

    // Kick 1: half-step velocity, then drift: full-step position
    for (const p of particles) {
        p.velocity.x = f(p.velocity.x + f(p.acceleration.x * halfDt));
        p.velocity.y = f(p.velocity.y + f(p.acceleration.y * halfDt));
        p.position.x = f(p.position.x + f(p.velocity.x * dt));
        p.position.y = f(p.position.y + f(p.velocity.y * dt));
    }
    // Kick 2: recompute acceleration at new position, complete velocity step
    for (const p of particles) {
        const force = gravityPull(p);
        p.acceleration.x = f(force.x);
        p.acceleration.y = f(force.y);
        p.velocity.x = f(p.velocity.x + f(p.acceleration.x * halfDt));
        p.velocity.y = f(p.velocity.y + f(p.acceleration.y * halfDt));
    }
}
