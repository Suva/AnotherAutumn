define(function(require){

    var ImagePlane = require("ImagePlane");
    var Wiggle = require("Wiggle");

    var scene = new THREE.Object3D();
    var camera = new THREE.PerspectiveCamera(75, 16 / 9, 0.1, 5000);

    camera.position.set(0, 0, 5);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    var plane = ImagePlane("images/sunset.jpg");
    scene.add(plane);

    var wiggle = Wiggle(0.3, 0.001);

    return {
        render: function(time){
            wiggle(camera);
            var fadeOutTime = 12;
            if(time > fadeOutTime) {
                blurPass.uniforms.delta.value.x = (time - fadeOutTime) * 0.005;
                blurPass.uniforms.delta.value.y = (time - fadeOutTime) * 0.005;
                effectPass.uniforms.brightness.value = Math.max(0 - (time - fadeOutTime) * 0.1, -1);
            }
        },
        scene: scene,
        camera: camera,
        onEvent: function(event) {

        },
        init: function(args){

        }
    };
});