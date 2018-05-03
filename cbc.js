function cbc(plaintext){
    var iv=bigInt.randBetween(1,p.prev());
    
//    var ciphertextA = powerModArray(plaintext, a, p);
  //  $('#aEncrypted').val(ciphertextA);

    //var ciphertextAB = powerModArray(ciphertextA, b, p);
//    $('#bEncrypted').val(ciphertextAB);

//    var ciphertextABA = powerModArray(ciphertextAB, aInv, p);
//    $('#aDecrypted').val(ciphertextABA);

//    var ciphertextABAB = powerModArray(ciphertextABA, bInv, p);
//    $('#outputEncoded').val(ciphertextABAB);

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
