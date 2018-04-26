var bigInt = require("big-integer");

function nextProbablePrime(number){
    if(number.isEven())
        number=number.prev();
        
    do{
        number=number.add(2);
    }
    while(!number.isProbablePrime());
    
    return number;
}

$(function(){
    $('#drawingButton').click(function(){
        $("#p").val(nextProbablePrime(bigInt(2).pow($('#pBits').val()-1)));
    });
});