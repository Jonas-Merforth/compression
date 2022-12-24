import Decimal from 'decimal.js';
import {decodeMap, encodeMap} from "./maps";

function encodeString(inputString: string): string {
    let encodedString = "";
    [...inputString].forEach((char: string) => {
        const code = encodeMap.get(char);
        encodedString += code;
    })
    return encodedString;
}

function decodeString(inputString: string): string {
    const numbersStringArray: string[] = [...inputString];
    const charArray: number[] = [];
    for (let i = 0; i < numbersStringArray.length; i += 2) {
        const charString = "" + numbersStringArray[i] + numbersStringArray[i+1];
        charArray.push(parseInt(charString));
    }
    console.log('charArray: ', charArray);
    return charArray.map((number: number) => {
        return decodeMap.get(number) || '';
    }).join('');
}


const startTime = performance.now();

const endTime = performance.now();

console.log(`Took ${endTime - startTime} milliseconds`)
const testString = "Hello";
const encoded = encodeString(testString);
console.log('encoded: ', encoded);
const decoded = decodeString(encoded);
console.log('decoded: ', decoded);
