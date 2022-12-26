"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const maps_1 = require("./maps");
const gcd_own_1 = __importDefault(require("./gcd_own"));
function encodeString(inputString) {
    let encodedString = "";
    [...inputString].forEach((char) => {
        const code = maps_1.encodeMap.get(char);
        encodedString += code;
    });
    return encodedString;
}
function decodeString(inputString) {
    const numbersStringArray = [...inputString];
    const charArray = [];
    for (let i = 0; i < numbersStringArray.length; i += 2) {
        const charString = "" + numbersStringArray[i] + numbersStringArray[i + 1];
        charArray.push(parseInt(charString));
    }
    //console.log('charArray: ', charArray);
    return charArray.map((number) => {
        return maps_1.decodeMap.get(number) || '';
    }).join('');
}
function findBestBase(numerator, length, tries) {
    let bestTuple = [0, BigInt(0)];
    for (let i = 2; i < tries - 2; i++) {
        const denominator = BigInt(Math.pow(i, length));
        //if (denominator > numerator) break; //TODO can be the case?
        const greatestDivisor = BigInt((0, gcd_own_1.default)(numerator, denominator));
        if (greatestDivisor > bestTuple[1])
            bestTuple = [i, greatestDivisor];
    }
    console.log('best: ', bestTuple);
    return bestTuple[0];
}
function compress(encodedString) {
    const length = encodedString.length;
    const numerator = BigInt(encodedString);
    const bestBase = findBestBase(numerator, length, 10000);
    const denominator = BigInt(Math.pow(bestBase, length));
    const greatestDivisor = BigInt((0, gcd_own_1.default)(numerator, denominator));
    const compressed = numerator / greatestDivisor;
    console.log('compressed length: ', ('' + compressed).length);
    return {
        message: compressed,
        //denominator: denominator/greatestDivisor,
        gcd: greatestDivisor,
        length: length,
        base: bestBase
    };
}
function decompress(compressedString) {
    const denominator = BigInt(Math.pow(compressedString.base, compressedString.length));
    const greatestDivisor = compressedString.gcd;
    //const greatestDivisor = BigInt(bigIntGCD(compressedString.message, denominator));
    const original = greatestDivisor * BigInt(compressedString.message);
    console.log('original: ', original);
    return '' + original;
}
const startTime = performance.now();
const testString = "Hello1234567890123567890";
//const testString = "Hello World test lmao hello does it work?"; //error?
//const testString = "abcd";
const encoded = encodeString(testString);
console.log('encoded: ', encoded);
const compressed = compress(encoded);
console.log('compressed: ', compressed);
const originalEncoded = decompress(compressed);
const decoded = decodeString(originalEncoded);
console.log('decoded: ', decoded);
const endTime = performance.now();
console.log(`Took ${Math.round(endTime - startTime)} milliseconds`);
