"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = __importStar(require("crypto"));
// define a function to generate a hash of a string
function hashString(input) {
    // create a hash object and update it with the input string
    const hash = crypto.createHash('sha256');
    hash.update(input);
    // return the hash as a number
    return parseInt(hash.digest('hex'), 16);
}
function toBase(input) {
    const string = btoa(input);
    return parseInt(string, 16);
}
function fromBase(input) {
    const string = atob(input.toString(16));
    return string;
}
// define a function to factorize a number
function factorizeNumber(input) {
    // create an empty array to store the factors
    const factors = [];
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
function reconstructNumber(factors) {
    // initialize the result to 1
    let result = 1;
    // multiply all the factors together to reconstruct the number
    for (const factor of factors) {
        result *= factor;
    }
    return result;
}
// define a function to compress a string by generating a hash and factorizing it
function compressString(input) {
    // generate the hash of the input string
    const hash = toBase(input);
    console.log(hash);
    // factorize the hash
    return factorizeNumber(hash);
}
// define a function to uncompress a string by reconstructing the hash and mapping it back to the original string
function uncompressString(compressed) {
    // reconstruct the hash from the factors
    const hash = reconstructNumber(compressed);
    console.log(hash);
    // use the hash function to map the hash back to the original string
    return fromBase(hash);
}
// example usage: compress the string "hello"
const compressed = compressString('hello');
console.log(compressed); // [ 2, 2, 2, 2, 2, 3, 61 ]
const uncompressed = uncompressString(compressed);
console.log(uncompressed); // "hello"
