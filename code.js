$(function () {
    const BITS_PER_CHAR=8;
    
    $('#drawingButton').on('click', function () {
        $("#p").val(randomProbablePrime($('#pBits').val()).toString(10));
        p=bigInt($("#p").val());
        
        charsPerBlock=Math.ceil($('#pBits').val()/BITS_PER_CHAR)-1;
        
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
        $('#inputEncoded').val(encode(this.value, charsPerBlock, BITS_PER_CHAR));
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

function splitIntoBlocks(text, chars_per_block){
    return text.match(new RegExp('.{1,' + chars_per_block + '}', 'g')).join('\u2605');
}

function encode(text, chars_per_block, bits_per_char){
    var output=[];
    const BLOCKS=Math.floor(text.length/chars_per_block);
    
    for (var i=0;i<BLOCKS;i++) {
        var bitString="";
        
        for(var j=0;j<chars_per_block;j++){
            bitString+=text[i*chars_per_block+j].charCodeAt(0).toString(2);
        }
        
        output.push(bigInt(bitString,2));
    }
    
    return output;
}