function makeFloat(value, precision) {
    return precision === "f32" ? Math.fround(value) : value;
}
