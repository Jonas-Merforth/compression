import Decimal from 'decimal.js';

function encodeString(inputString: string): string {
    let encodedString = "0.";
    [...inputString].forEach((char, index) => {
        const code = encodedString.charCodeAt(index);
        encodedString += encodedString.charCodeAt(index);
    })
    return encodedString;
}

function decodeString(inputString: string): string {
    const numbersStringArray: string[] = [...inputString.slice(2, inputString.length)];
    const charArray: number[] = [];
    for (let i = 0; i < numbersStringArray.length; i += 2) {
        const charString = "" + numbersStringArray[i] + numbersStringArray[i+1];
        charArray.push(parseInt(charString));
    }
    console.log('charArray: ', charArray);
    return String.fromCharCode(...charArray);
}

const startTime = performance.now();

const endTime = performance.now();

console.log(`Took ${endTime - startTime} milliseconds`)
const testString = "Hello";
const encoded = encodeString(testString);
console.log('encoded: ', encoded);
const decoded = decodeString(encoded);
console.log('decoded: ', decoded);
