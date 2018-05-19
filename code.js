$(function () {
    const BITS_PER_CHAR = 8;

    $('#drawingButton').on('click', function () {
        clear();
        
        $("#p").val(randomProbablePrime($('#pBits').val()).toString(10));
        p = bigInt($("#p").val());

        charsPerBlock = Math.ceil($('#pBits').val() / BITS_PER_CHAR) - 1;

        $('#a').val(drawEncryptionKey(bigInt($("#p").val())));
        a = bigInt($('#a').val());

        $('#b').val(drawEncryptionKey(bigInt($("#p").val())));
        b = bigInt($('#b').val());

        $('#aInv').val(a.modInv(p.prev()));
        aInv = bigInt($('#aInv').val());

        $('#bInv').val(b.modInv(p.prev()));
        bInv = bigInt($('#bInv').val());
    });

    $('#input').on('change', function () {
        var plaintext = encode(this.value, charsPerBlock, BITS_PER_CHAR);
        $('#inputEncoded').val(plaintext);

        var ciphertextABAB = ecb(plaintext);

        var output = decode(ciphertextABAB, charsPerBlock, BITS_PER_CHAR);
        $('#output').val(output);
    });
});

/**
 * Clears all the message-related input fields
 */
function clear(){
    $(".centerCellDiv input").val("");
}

function randomProbablePrime(len) {
    var a;
    const LOWER_BOUND = bigInt(2).pow(len - 1);
    const UPPER_BOUND = bigInt(2).pow(len).prev();

    do {
        a = bigInt.randBetween(LOWER_BOUND, UPPER_BOUND);
    } while (!a.isProbablePrime());

    return a;
}

function drawEncryptionKey(prime) {
    var key;
    const LOWER_BOUND = bigInt(2);
    const UPPER_BOUND = prime.subtract(2);

    do {
        key = bigInt.randBetween(LOWER_BOUND, UPPER_BOUND);
    } while (bigInt.gcd(key, prime.prev()).compare(1));

    return key;
}

function splitIntoBlocks(text, chars_per_block) {
    return text.match(new RegExp('.{1,' + chars_per_block + '}', 'g')).join('\u2605');
}

function charTo8bitString(char) {
    var result = char.charCodeAt(0).toString(2);

    return "00000000".substr(result.length) + result;
}

function padBitString(bitstring, length) {
    while (bitstring.length < length) {
        bitstring = "0" + bitstring;
    }

    return bitstring;
}

/**
 * Encodes character blocks as numbers. The last character/byte informs how
 * many random characters have been padded. The illustration follows
 * ('r' - a random character, 'a' - an appendix, i.e. the last character,
 * '-' - a regular character, '|' - a block separator):
 * 
 * -----|-----|--rra
 * 
 * @param {type} text
 * @param {type} chars_per_block
 * @param {type} bits_per_char
 * @returns {Array|encode.output}
 */
function encode(text, chars_per_block, bits_per_char) {
    var output = [];
    const BLOCKS = Math.floor(text.length / chars_per_block);

    var bitString;

    var currentPosition = 0;
    for (var i = 0; i < BLOCKS; i++) {
        bitString = "";

        for (var j = 0; j < chars_per_block; j++) {
            bitString += charTo8bitString(text[currentPosition++]);
        }

        output.push(bigInt(bitString, 2));
    }

    const REMAINDER = text.length % chars_per_block;
    const CHARACTERS_TO_PAD = chars_per_block - 1 - REMAINDER;

    bitString = "";
    while (currentPosition < text.length) {
        bitString += charTo8bitString(text[currentPosition++]);
    }
    for (var i = 0; i < CHARACTERS_TO_PAD; i++) {
        var randomCharBitstring = bigInt.randBetween(0, 255).toString(2);

        bitString += padBitString(randomCharBitstring, bits_per_char);
    }
    bitString += padBitString(CHARACTERS_TO_PAD.toString(2), bits_per_char);

    output.push(bigInt(bitString, 2));

    return output;
}

function decode(numbers, chars_per_block, bits_per_char) {
    var output = "";

    for (var i = 0; i < numbers.length - 1; i++) {
        const NUMBER_BITSTRING = padBitString(numbers[i].toString(2),
                chars_per_block * bits_per_char);

        for (var j = 0; j < chars_per_block; j++) {
            const CHAR_BITSTRING = NUMBER_BITSTRING.slice(j * bits_per_char,
                    (j + 1) * bits_per_char);
            output += String.fromCharCode(parseInt(CHAR_BITSTRING, 2));
        }
    }

    const LAST_NUMBER_BITSTRING = padBitString(
            numbers[numbers.length - 1].toString(2), chars_per_block * bits_per_char);
    const CHARACTERS_PADDED = parseInt(LAST_NUMBER_BITSTRING.substring(
            LAST_NUMBER_BITSTRING.length - bits_per_char), 2);


    for (var i = 0; i < chars_per_block - 1 - CHARACTERS_PADDED; i++) {
        const CHAR_BITSTRING = LAST_NUMBER_BITSTRING.slice(i * bits_per_char,
                (i + 1) * bits_per_char);
        output += String.fromCharCode(parseInt(CHAR_BITSTRING, 2));
    }

    return output;
}

function ecb(plaintext) {
    var ciphertextA = ecbTransform(plaintext, a, p);
    $('#aEncrypted').val(ciphertextA);

    var ciphertextAB = ecbTransform(ciphertextA, b, p);
    $('#bEncrypted').val(ciphertextAB);

    var ciphertextABA = ecbTransform(ciphertextAB, aInv, p);
    $('#aDecrypted').val(ciphertextABA);

    var ciphertextABAB = ecbTransform(ciphertextABA, bInv, p);
    $('#outputEncoded').val(ciphertextABAB);

    return ciphertextABAB;
}

function ecbTransform(numbers, exponent, modulus) {
    var result = [];

    for (var i = 0; i < numbers.length; i++) {
        result.push(numbers[i].modPow(exponent, modulus));
    }

    return result;
}