"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function encodeString(inputString) {
    let encodedString = "0.";
    [...inputString].forEach((char, index) => {
        const code = encodedString.charCodeAt(index);
        encodedString += encodedString.charCodeAt(index);
    });
    return encodedString;
}
function decodeString(inputString) {
    const numbersStringArray = [...inputString.slice(2, inputString.length)];
    const charArray = [];
    for (let i = 0; i < numbersStringArray.length; i += 2) {
        const charString = "" + numbersStringArray[i] + numbersStringArray[i + 1];
        charArray.push(parseInt(charString));
    }
    console.log('charArray: ', charArray);
    return String.fromCharCode(...charArray);
}
const startTime = performance.now();
const endTime = performance.now();
console.log(`Took ${endTime - startTime} milliseconds`);
const testString = "Hello";
const encoded = encodeString(testString);
console.log('encoded: ', encoded);
const decoded = decodeString(encoded);
console.log('decoded: ', decoded);
