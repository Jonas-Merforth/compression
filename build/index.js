"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const maps_1 = require("./maps");
const gcd = require('compute-gcd');
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
    const numerator = Number(encodedString);
    const denominator = Math.pow(10, length);
    console.log('num/den: ', numerator, '/', denominator);
    const greatestDivisor = gcd(numerator, denominator);
    console.log('gcd: ', greatestDivisor);
    const compressed = '' + numerator / greatestDivisor;
    console.log('compressed: ', compressed, ', length: ', compressed.length);
    return {
        message: compressed,
        denominator: denominator / greatestDivisor,
        length: length
    };
}
function decompress(compressedString) {
    const denominator = Math.pow(10, compressedString.length);
    const greatestDivisor = denominator / compressedString.denominator;
    const original = greatestDivisor * Number(compressedString.message);
    console.log('original: ', original);
    return '' + original;
}
// m1 = message/gcd
// l1 == (length+1) / gcd
// value = m1/l1
const startTime = performance.now();
const testString = "Hello1234";
//const testString = "Hello World test lmao hello does it work?"; //error?
//const testString = "abc";
const encoded = encodeString(testString);
console.log('encoded: ', encoded);
/*
const decoded = decodeString(encoded);
console.log('decoded: ', decoded);
 */
const compressed = compress(encoded);
console.log('compressed: ', compressed);
const originalEncoded = decompress(compressed);
const decoded = decodeString(originalEncoded);
console.log('decoded: ', decoded);
const endTime = performance.now();
console.log(`Took ${Math.round(endTime - startTime)} milliseconds`);
