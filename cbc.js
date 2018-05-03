function cbc(plaintext){
    var iv=bigInt.randBetween(1,p.prev());
    
    var ciphertextA = ecbEncrypt(plaintext, a, p, iv);
    $('#aEncrypted').val(ciphertextA);

    var ciphertextAB = ecbEncrypt(ciphertextA, b, p, iv);
    $('#bEncrypted').val(ciphertextAB);

    var ciphertextABA = ecbEncrypt(ciphertextAB, aInv, p, iv);
    $('#aDecrypted').val(ciphertextABA);

    var ciphertextABAB = ecbEncrypt(ciphertextABA, bInv, p, iv);
    $('#outputEncoded').val(ciphertextABAB);

    return ciphertextABAB;
}

function ecbEncrypt(numbers, exponent, modulus, iv) {
    var result = [];

    result.push(iv.xor(numbers[0].modPow(exponent, modulus)))
    for (var i = 1; i < numbers.length; i++) {
        result.push(numbers[i-1].xor(numbers[i].modPow(exponent, modulus)));
    }

    return result;
}
