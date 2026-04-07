// Semi-implicit (Symplectic) Euler: velocity updated first, then position uses that current-frame velocity.
// v' = v + a*dt,  x' = x + v'*dt,  then recompute a at new x.
// Order 1, symplectic.
function semiImplicitEulerStep(particles, dt, gravityPull, precision) {
    const f = (v) => makeFloat(v, precision);
    dt = f(dt);

    for (const p of particles) {
        p.velocity.x = f(p.velocity.x + f(p.acceleration.x * dt));
        p.velocity.y = f(p.velocity.y + f(p.acceleration.y * dt));
        p.position.x = f(p.position.x + f(p.velocity.x * dt));
        p.position.y = f(p.position.y + f(p.velocity.y * dt));
    }
    for (const p of particles) {
        const force = gravityPull(p);
        p.acceleration.x = f(force.x);
        p.acceleration.y = f(force.y);
    }
}
