function ofb(plaintext, a, aInv, b, bInv, p) {
    var iv = bigInt.randBetween(1, p.prev());

    var ciphertextA = ofbEncrypt(plaintext, a, p, iv);
    $('#aEncrypted').val(ciphertextA);

    var ciphertextAB = ofbEncrypt(ciphertextA, b, p, iv);
    $('#bEncrypted').val(ciphertextAB);

    var ciphertextABA = ofbEncrypt(ciphertextAB, aInv, p, iv);
    $('#aDecrypted').val(ciphertextABA);

    var ciphertextABAB = ofbEncrypt(ciphertextABA, bInv, p, iv);
    $('#outputEncoded').val(ciphertextABAB);

    return ciphertextABAB;
}

function ofbEncrypt(numbers, exponent, modulus, iv) {
    var result = [];
    var output;

    output = iv.modPow(exponent, modulus);
    result.push(
            output.xor(numbers[0])
            );
    for (var i = 1; i < numbers.length; i++) {
        output = output.modPow(exponent, modulus);
        result.push(
                numbers[i].xor(output)
                );
    }

    return result;
}