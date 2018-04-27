$(function () {
    $('#drawingButton').on('click', function () {
        $("#p").val(randomProbablePrime($('#pBits').val()).toString(10));
        $('#a').val(drawEncryptionKey(bigInt($("#p").val())));
        $('#b').val(drawEncryptionKey(bigInt($("#p").val())));
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