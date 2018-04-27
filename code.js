$(function () {
    const BITS_PER_CHAR = 8;

    $('#drawingButton').on('click', function () {
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
        $('#inputEncoded').val(encode(this.value, charsPerBlock, BITS_PER_CHAR));
    });
});

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
            bitString += text[currentPosition++].charCodeAt(0).toString(2);
        }

        output.push(bigInt(bitString, 2));
    }

    const REMAINDER = text.length % chars_per_block;
    const CHARACTERS_TO_PAD = chars_per_block - 1 - REMAINDER;

    bitString = "";
    while (currentPosition < text.length) {
        bitString += text[currentPosition++].charCodeAt(0).toString(2);
    }
    for (var i = 0; i < CHARACTERS_TO_PAD; i++) {
        bitString += bigInt.randBetween(0, 255).toString(2);
    }
    bitString += CHARACTERS_TO_PAD.toString(2);

    output.push(bigInt(bitString, 2));

    return output;
}