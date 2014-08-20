/**
 * Seeded random number generator. Based on proposal by Antti Sykäri
 * http://stackoverflow.com/questions/521295/javascript-random-seeds
 */
define(function(){
    return function(seed){
        function random () {
            var x = Math.sin(seed++) * 10000;
            return x - Math.floor(x);
        }

        return {
            random: random,
            randInt: function (low, high){
                return low + Math.floor( random() * ( high - low + 1 ) )
            },
            randFloat: function(low, high){
                return low + random() * ( high - low + 1 )
            }
        }
    }
});
