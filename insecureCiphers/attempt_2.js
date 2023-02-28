/*
WARNING: SEVERELY BROKEN.
DO NOT USE.
EXTREMELY INSECURE AS WELL.
*/
let alphabet = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', ' ', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
let arr = [...Array(1024)].map(() => Math.floor(Math.random() * 1024));

class PRNG {
    /**
     * @param {number[]} Array
     * @param {number} PseudoRNG starting number
     */
    constructor(arr, number = 1024) {
        this.i = 0;
        this.number = number;
        this.arr = [...arr]; // Clone the array
        return this;
    }

    /**
     * @returns {number} Number continually increasing and looping around
     */
    shuffleI() {
        return (this.i = (this.i + 1) % this.arr.length);
    }

    /**
     * @returns {number} Pseudo random number
     */
    shuffleNum() {
        this.number ^= this.arr[this.i];
        let im = this.arr[this.i - 1];
        let ip = this.arr[this.i + 1];
        this.arr[this.i] ^= (im | ip) ^ (im ^ ip);
        this.shuffleI();
        return this.number;
    }
}

class Shuffler extends PRNG {
    shuffle(string) {
        let out = "";
        for (let i of string) {
            out += alphabet[alphabet.indexOf(i) ^ (this.shuffleNum() % alphabet.length)];
        }
        return out;
    }
}

let shuffler = new Shuffler(arr);
let unshuffler = new Shuffler(arr);
let string = "hello there LOL 1234";
console.log(`Original string: ${string}`);
let shuffled = shuffler.shuffle(string);
console.log(`Shuffled string: ${shuffled}`);
console.log(`Unshuffled string: ${unshuffler.shuffle(shuffled)}`);
