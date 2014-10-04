define(function(require){

    var OverlayEffects = require("OverlayEffects");
    var OverlaySceneAdd = require("scene/OverlaySceneAdd");
    var Wiggle = require("Wiggle");

    return function(imageUrl, initRotation, rotationSpeed) {
        var Timer = require("Timer");
        var scene = new THREE.Object3D();
        var camera = new THREE.PerspectiveCamera(75, 16 / 9, 0.1, 5000);

        camera.position.set(0, 0, 0);
        var lookAtPoint = new THREE.Vector3(0, 0, -10);

        camera.rotation.y = initRotation?initRotation.y:0.8;
        camera.rotation.x = initRotation?initRotation.x:-0.05;

        var jsonLoader = new THREE.JSONLoader();
        jsonLoader.load("models/panorama.js", function(geometry) {
            var material;
            material = new THREE.MeshBasicMaterial({
                map: THREE.ImageUtils.loadTexture(imageUrl)
            });

            var model = new THREE.Mesh(geometry, material);
            scene.add(model);
        });

        var timer = new Timer();
        var wiggle = Wiggle(0.5, 0.005);
        return {
            scene: scene,
            camera: camera,
            render: function(time){
                var passed = timer.getPassed(time);
                camera.rotation.x += passed * (rotationSpeed?rotationSpeed.x:0.005);
                camera.rotation.y -= passed * (rotationSpeed?rotationSpeed.y:0.15);
                wiggle(camera);
                overlayPass.uniforms.overlayAmount.value = Math.max(overlayPass.uniforms.overlayAmount.value - passed * 2, 0);
            },
            onEvent: function(event) {
                if(event.instrument == 1 && event.note == "D-3"){
                    overlayPass.uniforms.overlayAmount.value = 1;
                }
            },
            init: function(args){
                OverlayEffects.resetGlitchers();
                OverlaySceneAdd.disableFloaters();
            }
        };
    }
});