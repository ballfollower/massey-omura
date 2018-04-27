$(function () {
    $('#drawingButton').on('click', function () {
        $("#p").val(randomProbablePrime($('#pBits').val()).toString(10));
    });
});

function randomProbablePrime(len) {
    var a;
    var lowerBound=bigInt(2).pow(len-1);
    var upperBound=bigInt(2).pow(len).prev();

    do {
        a=bigInt.randBetween(lowerBound, upperBound);
    } while (!a.isProbablePrime());

    return a;
}

function drawEncryptionKey(){
    
}