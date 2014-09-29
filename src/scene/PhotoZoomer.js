define(function(require){
    var ImagePlane = require("ImagePlane");
    var Timer = require("Timer");
    var Wiggle = require("Wiggle");

    return function(image, speed, initialScale){
        var scene = new THREE.Object3D();
        var camera = new THREE.PerspectiveCamera(75, 16 / 9, 0.1, 5000);

        camera.position.set(0, 0, 5);
        camera.lookAt(new THREE.Vector3(0, 0, 0));

        var plane = ImagePlane(image, initialScale);

        scene.add(plane);

        var timer = new Timer();

        var wiggle = Wiggle(0.3, 0.001);
        return {
            scene: scene,
            camera: camera,
            render: function(time){
                var passed = timer.getPassed(time);
                plane.position.z += passed * speed;
                wiggle(camera);
                overlayPass.uniforms.overlayAmount.value = Math.max(overlayPass.uniforms.overlayAmount.value - passed * 2, 0);
            },
            onEvent: function(event) {
                if(event.instrument == 1 && event.note == "D-3"){
                    overlayPass.uniforms.overlayAmount.value = 1;
                }

            },
            init: function(args){
                blurPass.uniforms.delta.value.x = 0;
                blurPass.uniforms.delta.value.y = 0;
                effectPass.uniforms.brightness.value = 0;
            }
        };
    }
});
