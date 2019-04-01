/*
* A JavaScript implementation of the SHA256 hash function.
*
* FILE:	sha256.js
* VERSION:	0.8
* AUTHOR:	Christoph Bichlmeier <informatik@zombiearena.de>
*
* NOTE: This version is not tested thoroughly!
*
* Copyright (c) 2003, Christoph Bichlmeier
* All rights reserved.
*
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions
* are met:
* 1. Redistributions of source code must retain the above copyright
*    notice, this list of conditions and the following disclaimer.
* 2. Redistributions in binary form must reproduce the above copyright
*    notice, this list of conditions and the following disclaimer in the
*    documentation and/or other materials provided with the distribution.
* 3. Neither the name of the copyright holder nor the names of contributors
*    may be used to endorse or promote products derived from this software
*    without specific prior written permission.
*
* ======================================================================
*
* THIS SOFTWARE IS PROVIDED BY THE AUTHORS ''AS IS'' AND ANY EXPRESS
* OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
* WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
* ARE DISCLAIMED.  IN NO EVENT SHALL THE AUTHORS OR CONTRIBUTORS BE
* LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
* CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
* SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR
* BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
* WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE
* OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
* EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

const K256 = new Array(
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
    0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
    0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
    0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
    0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
    0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
    0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
    0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
    0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
)
const sha256_hex_digits = "0123456789abcdef";
export class SHA2Util {

    constructor() {
        this.ihash = new Array(8);
        this.count = new Array(2);
        this.buffer = new Array(64);
        this.count[0] = this.count[1] = 0;
        this.ihash[0] = 0x6a09e667;
        this.ihash[1] = 0xbb67ae85;
        this.ihash[2] = 0x3c6ef372;
        this.ihash[3] = 0xa54ff53a;
        this.ihash[4] = 0x510e527f;
        this.ihash[5] = 0x9b05688c;
        this.ihash[6] = 0x1f83d9ab;
        this.ihash[7] = 0x5be0cd19;
    }


    /* SHA256 logical functions */
    rotateRight(n, x) {
        return ((x >>> n) | (x << (32 - n)));
    }
    choice(x, y, z) {
        return ((x & y) ^ (~x & z));
    }
    majority(x, y, z) {
        return ((x & y) ^ (x & z) ^ (y & z));
    }
    sha256_Sigma0(x) {
        return (this.rotateRight(2, x) ^ this.rotateRight(13, x) ^ this.rotateRight(22, x));
    }
    sha256_Sigma1(x) {
        return (this.rotateRight(6, x) ^ this.rotateRight(11, x) ^ this.rotateRight(25, x));
    }
    sha256_sigma0(x) {
        return (this.rotateRight(7, x) ^ this.rotateRight(18, x) ^ (x >>> 3));
    }
    sha256_sigma1(x) {
        return (this.rotateRight(17, x) ^ this.rotateRight(19, x) ^ (x >>> 10));
    }
    sha256_expand(W, j) {
        return (W[j & 0x0f] += this.sha256_sigma1(W[(j + 14) & 0x0f]) + W[(j + 9) & 0x0f] +
            this.sha256_sigma0(W[(j + 1) & 0x0f]));
    }

    /* Add 32-bit integers with 16-bit operations (bug in some JS-interpreters: 
    overflow) */
    safe_add(x, y) {
        var lsw = (x & 0xffff) + (y & 0xffff);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xffff);
    }

    /* Transform a 512-bit message block */
    sha256_transform() {
        var a, b, c, d, e, f, g, h, T1, T2;
        var W = new Array(16);

        /* Initialize registers with the previous intermediate value */
        a = this.ihash[0];
        b = this.ihash[1];
        c = this.ihash[2];
        d = this.ihash[3];
        e = this.ihash[4];
        f = this.ihash[5];
        g = this.ihash[6];
        h = this.ihash[7];

        /* make 32-bit words */
        for (var i = 0; i < 16; i++)
            W[i] = ((this.buffer[(i << 2) + 3]) | (this.buffer[(i << 2) + 2] << 8) | (this.buffer[(i << 2) + 1]
                << 16) | (this.buffer[i << 2] << 24));

        for (var j = 0; j < 64; j++) {
            T1 = h + this.sha256_Sigma1(e) + this.choice(e, f, g) + K256[j];
            if (j < 16) T1 += W[j];
            else T1 += this.sha256_expand(W, j);
            T2 = this.sha256_Sigma0(a) + this.majority(a, b, c);
            h = g;
            g = f;
            f = e;
            e = this.safe_add(d, T1);
            d = c;
            c = b;
            b = a;
            a = this.safe_add(T1, T2);
        }

        /* Compute the current intermediate hash value */
        this.ihash[0] += a;
        this.ihash[1] += b;
        this.ihash[2] += c;
        this.ihash[3] += d;
        this.ihash[4] += e;
        this.ihash[5] += f;
        this.ihash[6] += g;
        this.ihash[7] += h;
    }

    /* Read the next chunk of data and update the SHA256 computation */
    sha256_update(data, inputLen) {
        var i, index, curpos = 0;
        /* Compute number of bytes mod 64 */
        index = ((this.count[0] >> 3) & 0x3f);
        var remainder = (inputLen & 0x3f);

        /* Update number of bits */
        if ((this.count[0] += (inputLen << 3)) < (inputLen << 3)) this.count[1]++;
        this.count[1] += (inputLen >> 29);

        /* Transform as many times as possible */
        for (i = 0; i + 63 < inputLen; i += 64) {
            for (var j = index; j < 64; j++)
                this.buffer[j] = data.charCodeAt(curpos++);
            this.sha256_transform();
            index = 0;
        }

        /* Buffer remaining input */
        for (var j = 0; j < remainder; j++)
            this.buffer[j] = data.charCodeAt(curpos++);
    }

    /* Finish the computation by operations such as padding */
    sha256_final() {
        var index = ((this.count[0] >> 3) & 0x3f);
        this.buffer[index++] = 0x80;
        if (index <= 56) {
            for (var i = index; i < 56; i++)
                this.buffer[i] = 0;
        } else {
            for (var i = index; i < 64; i++)
                this.buffer[i] = 0;
            this.sha256_transform();
            for (var i = 0; i < 56; i++)
                this.buffer[i] = 0;
        }
        this.buffer[56] = (this.count[1] >>> 24) & 0xff;
        this.buffer[57] = (this.count[1] >>> 16) & 0xff;
        this.buffer[58] = (this.count[1] >>> 8) & 0xff;
        this.buffer[59] = this.count[1] & 0xff;
        this.buffer[60] = (this.count[0] >>> 24) & 0xff;
        this.buffer[61] = (this.count[0] >>> 16) & 0xff;
        this.buffer[62] = (this.count[0] >>> 8) & 0xff;
        this.buffer[63] = this.count[0] & 0xff;
        this.sha256_transform();
    }

    /* Split the internal hash values into an array of bytes */
    sha256_encode_bytes() {
        var j = 0;
        var output = new Array(32);
        for (var i = 0; i < 8; i++) {
            output[j++] = ((this.ihash[i] >>> 24) & 0xff);
            output[j++] = ((this.ihash[i] >>> 16) & 0xff);
            output[j++] = ((this.ihash[i] >>> 8) & 0xff);
            output[j++] = (this.ihash[i] & 0xff);
        }
        return output;
    }

    /* Get the internal hash as a hex string */
    sha256_encode_hex() {
        var output = new String();
        for (var i = 0; i < 8; i++) {
            for (var j = 28; j >= 0; j -= 4)
                output += sha256_hex_digits.charAt((this.ihash[i] >>> j) & 0x0f);
        }
        return output;
    }

    /* Main function: returns a hex string representing the SHA256 value of the 
    given data */
    sha256_digest(data) {
        this.sha256_update(data, data.length);
        this.sha256_final();
        return this.sha256_encode_hex();
    }

    /* test if the JS-interpreter is working properly */
    sha256_self_test() {
        return this.sha256_digest("message digest") ==
            "f7846f55cf23e14eebeab5b4e1550cad5b509e3348fbc4efa3a1413d393cb650";
    }

}