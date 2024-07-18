/* 
    - Array is JS object that can hold elements
    - Engine will auto allocate correct size and change if needed
    - Array type will be interpreted based on content.
    - Can specify amount of bytes given to an array, for performance
        - Can call array type directly or assign buffer
        - With buffer need view to work with array of certain type (Int16Array)
        - View is needed to access buffer, cannot access like normal data
        - Int16Array will be sequence of 16 bit or 2 byte integers. Total amount it can hold will be bufferSize in bytes / 2 (bytes)
    - Typed arrays do not have usual methods like push() and pop() and will fail Array.isArray
*/

let i8 = new Int16Array(3);
console.log('i8: ' + i8);

console.log('-------------------------------');

let byteSize = 6; 
let buffer = new ArrayBuffer(byteSize);
let i8View = new Int16Array(buffer);
console.log('buffer.byteLength: ' + buffer.byteLength);
console.log('i8View.byteLength: ' + i8View.byteLength);
console.log('i8View: ' + i8View);

console.log('-------------------------------');

let buffer64 = new ArrayBuffer(64);
let i32View = new Int32Array(buffer64);
console.log('i32View: ' + i32View);
