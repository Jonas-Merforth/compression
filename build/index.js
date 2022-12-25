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
function compress(encodedString) {
    const length = encodedString.length;
    const numerator = BigInt(encodedString);
    const denominator = BigInt(Math.pow(10, length));
    console.log('num/den: ', numerator, '/', denominator);
    const greatestDivisor = BigInt((0, gcd_own_1.default)(numerator, denominator));
    console.log('gcd: ', greatestDivisor);
    const compressed = numerator / greatestDivisor;
    console.log('compressed: ', compressed, ', length: ', ('' + compressed).length);
    return {
        message: compressed,
        denominator: denominator / greatestDivisor,
        length: length
    };
}
function decompress(compressedString) {
    const denominator = BigInt(Math.pow(10, compressedString.length));
    const greatestDivisor = denominator / compressedString.denominator;
    const original = greatestDivisor * BigInt(compressedString.message);
    console.log('original: ', original);
    return '' + original;
}
console.log((0, gcd_own_1.default)(BigInt(200), BigInt(25)));
const startTime = performance.now();
const testString = "Hello1234567890123567890";
//const testString = "Hello World test lmao hello does it work?"; //error?
//const testString = "abc";
const encoded = encodeString(testString);
console.log('encoded: ', encoded);
const compressed = compress(encoded);
console.log('compressed: ', compressed);
const originalEncoded = decompress(compressed);
const decoded = decodeString(originalEncoded);
console.log('decoded: ', decoded);
const endTime = performance.now();
console.log(`Took ${Math.round(endTime - startTime)} milliseconds`);
