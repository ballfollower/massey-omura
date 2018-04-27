$(function () {
    $('#drawingButton').on('click', function () {
        $("#p").val(randomProbablePrime($('#pBits').val()).toString(10));
        p=bigInt($("#p").val());
        
        $('#a').val(drawEncryptionKey(bigInt($("#p").val())));
        a=bigInt($('#a').val());
        
        $('#b').val(drawEncryptionKey(bigInt($("#p").val())));
        b=bigInt($('#b').val());
        
        $('#aInv').val(a.modInv(p.prev()));
        aInv=bigInt($('#aInv').val());
        
        $('#bInv').val(b.modInv(p.prev()));
        bInv=bigInt($('#bInv').val());
    });
    
    $('#input').on('change', function(){
        
    });
});

function randomProbablePrime(len) {
    var a;
    const LOWER_BOUND=bigInt(2).pow(len-1);
    const UPPER_BOUND=bigInt(2).pow(len).prev();

    do {
        a=bigInt.randBetween(LOWER_BOUND, UPPER_BOUND);
    } while (!a.isProbablePrime());

    return a;
}

function drawEncryptionKey(prime){
    var key;
    const LOWER_BOUND=bigInt(2);
    const UPPER_BOUND=prime.subtract(2);

    do {
        key=bigInt.randBetween(LOWER_BOUND, UPPER_BOUND);
    } while (bigInt.gcd(key,prime.prev()).compare(1));

    return key;
}