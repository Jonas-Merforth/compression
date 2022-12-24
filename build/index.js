"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const maps_1 = require("./maps");
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
    console.log('charArray: ', charArray);
    return charArray.map((number) => {
        return maps_1.decodeMap.get(number) || '';
    }).join('');
}
const startTime = performance.now();
const endTime = performance.now();
console.log(`Took ${endTime - startTime} milliseconds`);
const testString = "Hello";
const encoded = encodeString(testString);
console.log('encoded: ', encoded);
const decoded = decodeString(encoded);
console.log('decoded: ', decoded);
