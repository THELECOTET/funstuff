/*
WARNING: DO NOT USE.
Tried to imitate the Blowfish encryption and failed miserably. It's just too insecure because of known plaintext attack.
*/
class CWTCipher {
    constructor(password)
    {
        this.password = Array.from(new TextEncoder().encode(password));
        this.len = this.password.length;
    }
    encipher(plainText)
    {
        let arr = [];
        for (let i in plainText) {
            let encoded = plainText.charCodeAt(i);
            for (let j in this.password) {
                encoded ^= this.password[j];
            }
            arr.push(encoded);
        }
        return btoa(arr.join(","));
    }
    decipher(base64)
    {
        let encoded = atob(base64).split(",");
        let arr = [];
        for (let i in encoded) {
            let decoded = parseInt(encoded[i]);
            for (let j in this.password) {
                decoded ^= this.password[j];
            }
            arr.push(decoded);
        }
        for (let i in arr) {
            arr[i] = String.fromCharCode(arr[i]);
        }
        return arr.join("");
    }
}

let fs = require("fs");
let cipher = new CWTCipher("");
// etc...
