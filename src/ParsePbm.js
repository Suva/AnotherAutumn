define(function(){
    return function(pbmText){
        var lines = pbmText.split("\n");
        lines.shift(); // Discard header

        var dimensions = lines[0].split(" ");
        var width = parseInt(dimensions[0]);
        var height = parseInt(dimensions[1]);

        lines.shift();
        var imageData = lines.join("").replace(/[\n ]/g, ""); // Compact rest.

        var p = 0;
        var imageArray = [];
        for(var y = 0; y < height; y++){
            imageArray[y] = [];
            for(var x = 0; x < width; x++){
                imageArray[y][x] = parseInt(imageData[p++])?true:false;
            }
        }

        console.log(width, height)

        return {
            position: new THREE.Vector3(),
            data: imageArray,
            width: width,
            height: height
        };
    }
});