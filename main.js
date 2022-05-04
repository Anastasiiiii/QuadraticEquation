'use strict'

const quadraticEquationsolver = (a, b, c) => {
    if (a == 0)
        return false;
    let x1;
    let x2;

    let D = b * b - 4 * a * c;
    console.log('D = ' + D);

    if (D < 0)
        console.log(`${D} < 0. There are no roots`);
    else if (D == 0) {
        x1 = (-b + Math.sqrt(D)) / (2 * a);
        console.log(`There is one root:\nx = ${x1}`);
    } else if (D > 0) {
        x1 = (-b + Math.sqrt(D)) / (2 * a);
        x2 = (-b - Math.sqrt(D)) / (2 * a);
        console.log(`There are two roots: \nx1 = ${x1}\nx2 = ${x2}`);
    }
    return x1, x2;
}
console.log(quadraticEquationsolver(4, 16, 1));