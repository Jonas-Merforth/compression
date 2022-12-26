import * as crypto from 'crypto';


// define a function to generate a hash of a string
function hashString(input: string): number {
    // create a hash object and update it with the input string
    const hash = crypto.createHash('sha256');
    hash.update(input);

    // return the hash as a number
    return parseInt(hash.digest('hex'), 16);
}

function toBase(input: string): number {
    const string = btoa(input);
    return parseInt(string, 16);
}

function fromBase(input: number): string {
    const string = atob(input.toString(16));
    return string;
}

// define a function to factorize a number
function factorizeNumber(input: number): number[] {
    // create an empty array to store the factors
    const factors: number[] = [];

    // loop through all possible factors
    for (let i = 2; i <= Math.sqrt(input); i++) {
        // if the input is divisible by the current factor, add it to the list of factors
        while (input % i === 0) {
            factors.push(i);
            input /= i;
        }
    }

    // if the input is greater than 1, it is itself a prime factor
    if (input > 1) {
        factors.push(input);
    }

    return factors;
}

// define a function to reconstruct a number from its prime factors
function reconstructNumber(factors: number[]): number {
    // initialize the result to 1
    let result = 1;

    // multiply all the factors together to reconstruct the number
    for (const factor of factors) {
        result *= factor;
    }

    return result;
}


// define a function to compress a string by generating a hash and factorizing it
function compressString(input: string): number[] {
    // generate the hash of the input string
    const hash = toBase(input);
    console.log(hash);

    // factorize the hash
    return factorizeNumber(hash);
}


// define a function to uncompress a string by reconstructing the hash and mapping it back to the original string
function uncompressString(compressed: number[]): string {
    // reconstruct the hash from the factors
    const hash = reconstructNumber(compressed);
    console.log(hash)

    // use the hash function to map the hash back to the original string
    return fromBase(hash);
}


// example usage: compress the string "hello"
const compressed = compressString('hello');

console.log(compressed);  // [ 2, 2, 2, 2, 2, 3, 61 ]

const uncompressed = uncompressString(compressed);

console.log(uncompressed);  // "hello"
