function ecb(plaintext){
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
