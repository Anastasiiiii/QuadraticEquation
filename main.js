'use strict';

const readline = require('readline');
const fs = require('fs');


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const coeff = [];

rl.question('Please, choose mode. For interactive mode press In, for not interactive - NIn...\n', num => {
    if (num === 'In') interactiveMode();
    else if (num === 'NIn') FileMode();
    else {
        console.log('You entered invalid number!');
        process.exit(1);
    }
})

const interactiveMode = () => {
    console.log('Please insert coefficients a, b and c. (a != 0):');
    getArguments();
}

const getArguments = () => {
    rl.question('a = ', a => {
        checkInput(a);
        rl.question('b = ', b => {
            checkInput(b);
            rl.question('c = ', c => {
                checkInput(c);
            });
        });
    });
}

const checkInput = arg => {

    if (isNaN(arg)) {
        console.log(`Error. Expected a valid real number, got ${arg} instead`);
    } else if (arg === '0' && coeff.length === 0) {
        console.log('Error! a cannot be 0!');
        askFunc();
    } else {
        arg = +arg;
        coeff.push(arg);
    }

    if (coeff.length === 3) {
        rl.close();
        solver(coeff);
    }
}

const FileMode = () => {
    rl.question(`Please write the name of txt file with coefficients\ n In the file numbers should be without punktuation(ex.2 4 5)\n`, name => {
        fs.readFile(name, () => {
            if (!name.includes('.txt')) {
                console.log("Invalid file format");
                process.exit(1);
            } else if (fs.existsSync(name)) {
                const fileContent = fs.readFileSync(name, "utf-8");
                const numbers = fileContent.split(" ");
                const coeff = numbers.map(parseFloat);

                for (const element of coeff) {
                    if (coeff[0] === 0) {
                        console.log(`Error!Expected a value of a which is differ from 0`);
                        process.exit(1);
                    } else if (isNaN(element)) {
                        console.log(`Error!Expected a valid real number, got $ { element }
                                        instead`);
                        process.exit(1);
                    }
                }
                solver(coeff);
            } else {
                console.log(`Error!Can 't find a file with ${name}`)
                process.exist(1);
            }
        })
    })
}
const solver = ([...args]) => {


    const a = args[0];
    const b = args[1];
    const c = args[2];

    if (a == 0)
        return false;

    let x1;
    let x2;

    let equation = `(${a})x^2 + (${b})x + (${c}) = 0`;
    console.log(`The equation is: ${equation}`);

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
    process.exit(1);
}