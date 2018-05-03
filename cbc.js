function cbc(plaintext){
    var iv=bigInt.randBetween(1,p.prev());
    
    var ciphertextA = cbcEncrypt(plaintext, a, p, iv);
    $('#aEncrypted').val(ciphertextA);

    var ciphertextAB = ecbTransform(ciphertextA, b, p);
    $('#bEncrypted').val(ciphertextAB);

    var ciphertextABA = cbcDecrypt(ciphertextAB, aInv, p, iv);
    $('#aDecrypted').val(ciphertextABA);

    var ciphertextABAB = ecbTransform(ciphertextABA, bInv, p);
    $('#outputEncoded').val(ciphertextABAB);

    return ciphertextABAB;
}

function cbcEncrypt(numbers, exponent, modulus, iv) {
    var result = [];

    result.push(iv.xor(numbers[0]).modPow(exponent, modulus));
    for (var i = 1; i < numbers.length; i++) {
        result.push(numbers[i-1].xor(numbers[i]).modPow(exponent, modulus));
    }

    return result;
}

function cbcDecrypt(numbers, exponent, modulus, iv) {
    var result = [];

    result.push(numbers[0].modPow(exponent, modulus).xor(iv));
    for (var i = 1; i < numbers.length; i++) {
        result.push(numbers[i].modPow(exponent, modulus).xor(numbers[i-1]));
    }

    return result;
}
