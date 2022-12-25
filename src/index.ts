import Decimal from 'decimal.js';
import {decodeMap, encodeMap} from "./maps";
import {measureMemory} from "vm";
import {webcrypto} from "crypto";
import bigIntGCD from "./gcd_own";

interface CompressedString {
    message: bigint;
    denominator: bigint;
    length: number;
}

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
    //console.log('charArray: ', charArray);
    return charArray.map((number: number) => {
        return decodeMap.get(number) || '';
    }).join('');
}

function compress(encodedString: string): CompressedString {
    const length = encodedString.length;
    const numerator = BigInt(encodedString);
    const denominator = BigInt(Math.pow(10, length));
    console.log('num/den: ', numerator, '/', denominator);
    const greatestDivisor = BigInt(bigIntGCD(numerator, denominator));
    console.log('gcd: ', greatestDivisor);
    const compressed = numerator/greatestDivisor;
    console.log('compressed: ', compressed, ', length: ', ('' + compressed).length);
    return {
        message: compressed,
        denominator: denominator/greatestDivisor,
        length: length
    };
}

function decompress(compressedString: CompressedString): string {
    const denominator =  BigInt(Math.pow(10, compressedString.length));
    const greatestDivisor = denominator / compressedString.denominator;
    const original = greatestDivisor * BigInt(compressedString.message);
    console.log('original: ', original);
    return '' + original;
}


console.log(bigIntGCD(BigInt(200), BigInt(25)));

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
console.log(`Took ${Math.round(endTime - startTime)} milliseconds`)
