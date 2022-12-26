import Decimal from 'decimal.js';
import {decodeMap, encodeMap} from "./maps";
import {measureMemory} from "vm";
import {webcrypto} from "crypto";
import bigIntGCD from "./gcd_own";

interface CompressedString {
    message: bigint;
    gcd: bigint;
    length: number; //not needed, use instead of gcd?
    base: number; // //not needed, use instead of gcd?
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

function findBestBase(numerator: bigint, length: number, tries: number): number {
    let bestTuple: [number, bigint] = [0, BigInt(0)];
    for (let i = 2; i < tries - 2; i++) {
        const denominator = BigInt(Math.pow(i, length));
        //if (denominator > numerator) break; //TODO can be the case?
        const greatestDivisor = BigInt(bigIntGCD(numerator, denominator));
        if (greatestDivisor > bestTuple[1]) bestTuple = [i, greatestDivisor];
    }
    console.log('best: ', bestTuple);
    return bestTuple[0];
}

function compress(encodedString: string): CompressedString {
    const length = encodedString.length;
    const numerator = BigInt(encodedString);
    const bestBase = findBestBase(numerator, length, 10000);
    const denominator = BigInt(Math.pow(bestBase, length));
    const greatestDivisor = BigInt(bigIntGCD(numerator, denominator));
    const compressed = numerator/greatestDivisor;
    console.log('compressed length: ', ('' + compressed).length);
    return {
        message: compressed,
        //denominator: denominator/greatestDivisor,
        gcd: greatestDivisor,
        length: length,
        base: bestBase
    };
}

function decompress(compressedString: CompressedString): string {
    const denominator =  BigInt(Math.pow(compressedString.base, compressedString.length));
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
console.log(`Took ${Math.round(endTime - startTime)} milliseconds`)
