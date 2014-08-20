define(function(require){
    var Random = require("Random");
    var r = Random(11);

    return function(distance, amount){
        var originalPosition = null;
        return function(object){
            if(!originalPosition){
                originalPosition = {
                    x: object.position.x,
                    y: object.position.y
                }
            }

            var xDist = (r.randFloat(-1, 1) - 0.5) * amount;
            var yDist = (r.randFloat(-1, 1) - 0.5) * amount;

            object.position.x += xDist;
            object.position.y += yDist;

            if(Math.abs(originalPosition.x - object.position.x) > distance)
                object.position.x -= xDist;
            if(Math.abs(originalPosition.y - object.position.y) > distance)
                object.position.y -= yDist;

        }
    }
});