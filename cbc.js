function cbc(plaintext){
    var iv=bigInt.randBetween(1,p.prev());
    
    var ciphertextA = powerModArray(plaintext, a, p);
    $('#aEncrypted').val(ciphertextA);

    var ciphertextAB = powerModArray(ciphertextA, b, p);
    $('#bEncrypted').val(ciphertextAB);

    var ciphertextABA = powerModArray(ciphertextAB, aInv, p);
    $('#aDecrypted').val(ciphertextABA);

    var ciphertextABAB = powerModArray(ciphertextABA, bInv, p);
    $('#outputEncoded').val(ciphertextABAB);

    return ciphertextABAB;
