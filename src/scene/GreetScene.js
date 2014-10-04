define(function(require){

    var ImagePlane = require("ImagePlane");
    var Wiggle = require("Wiggle");
    var Timer = require("Timer");

    return function(fgImg, bgImg, greetImage){
        var scene = new THREE.Object3D();
        var camera = new THREE.PerspectiveCamera(75, 16 / 9, 0.1, 5000);

        camera.position.set(0, 0, 5);
        camera.lookAt(new THREE.Vector3(0, 0, 0));

        var sky = ImagePlane(bgImg, 15);
        var greet = ImagePlane(greetImage, 1);
        var fg = ImagePlane(fgImg);

        sky.position.z = -10;
        greet.position.z = -1;
        greet.position.x = 10;

        scene.add(sky);
        scene.add(greet);
        scene.add(fg);

        var wiggle = Wiggle(0.3, 0.001);
        var timer = new Timer();
        return {
            scene: scene,
            camera: camera,
            render: function(time){
                var passed = timer.getPassed(time);
                greet.position.x -= passed * 2;
                wiggle(camera);
                overlayPass.uniforms.overlayAmount.value = Math.max(overlayPass.uniforms.overlayAmount.value - passed * 2, 0);
                scene.position.z += passed / 8;
            },
            onEvent: function(event) {
                if(event.instrument == 1 && event.note == "D-3"){
                    overlayPass.uniforms.overlayAmount.value = 1;
                }
            },
            init: function(args){

            }
        };
    };
});