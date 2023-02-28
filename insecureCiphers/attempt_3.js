/*
WARNING: VERY INSECURE, DO NOT USE.
KNOWN PLAINTEXT ATTACK = REKT
It does work though, but it encrypts arrays of numbers and not strings.
*/
let arr = Array.from({ length: 1024 }, () => Math.floor(Math.random() * 1024)); // Any random array that's long enough
class PRNG {
    /**
     * @param [number] PseudoRNG starting number
     */
    constructor(number = 1024)
    {
        this.number = number;
        this.arr = [...arr]; // Clone the array
        return this;
    }
    /**
     * @returns {number} Pseudo random number
     */
    shuffle()
    {
        for (let i of this.arr) {
            this.number ^= i;
        }
        for (let i in this.arr) {
            let im = this.arr[i - 1];
            let ip = this.arr[i + 1];
            this.arr[i] ^= (im | ip) ^ (im ^ ip);
        }
        return this.number;
    }
}

class Shuffler {
    /**
     * @param [number] PseudoRNG starting number
     */
    constructor(num)
    {
        this.PRNG = new PRNG(num);
        return this;
    }
    /**
     * @returns {number} Returns the next pseudo random number within 0-255 only.
     */
    getNextNum()
    {
        return this.PRNG.shuffle() & 255;
    }
    /**
     * @param {number[]} packet - The packet to be shuffled
     * @returns {number[]} packet - The shuffled packet
     */
    shuffle(packet)
    {
        let num = this.getNextNum();
        for (let i = 0; i < num; i++)
        {
            packet[0] ^= this.getNextNum();
        }
        for (let i = 1; i < packet.length; i++)
        {
            packet[i] ^= this.getNextNum();
        }
        return packet;
    }
}

let shuf = new Shuffler();
let unshuf = new Shuffler();
let packet = [1, 2, 3, 4, 5];
console.log("Original packet", packet);
let shuffled = shuf.shuffle(packet);
console.log("Shuffled packet", shuffled);
let unshuffled = unshuf.shuffle(shuffled);
console.log("Unshuffled packet", unshuffled);
