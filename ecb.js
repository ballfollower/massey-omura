function ecb(plaintext){
        var ciphertextA = powerModArray(plaintext, a, p);
        $('#aEncrypted').val(ciphertextA);

        var ciphertextAB = powerModArray(ciphertextA, b, p);
        $('#bEncrypted').val(ciphertextAB);

        var ciphertextABA = powerModArray(ciphertextAB, aInv, p);
        $('#aDecrypted').val(ciphertextABA);

        var ciphertextABAB = powerModArray(ciphertextABA, bInv, p);
    $('#outputEncoded').val(ciphertextABAB);

    return ciphertextABAB;
}

function powerModArray(numbers, exponent, modulus) {
    var result = [];

    for (var i = 0; i < numbers.length; i++) {
        result.push(numbers[i].modPow(exponent, modulus));
    }

    return result;
}
