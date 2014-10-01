define(function(require){

    var OverlayEffects = require("OverlayEffects");
    var OverlaySceneAdd = require("scene/OverlaySceneAdd");

    return function(imageUrl, initRotation, rotationSpeed) {
        var Timer = require("Timer");
        var scene = new THREE.Object3D();
        var camera = new THREE.PerspectiveCamera(75, 16 / 9, 0.1, 5000);

        camera.position.set(0, 0, 0);
        var lookAtPoint = new THREE.Vector3(0, 0, -10);

        camera.rotation.y = initRotation?initRotation.y:0.8;
        camera.rotation.x = initRotation?initRotation.x:-0.05;

        var jsonLoader = new THREE.JSONLoader();
        jsonLoader.load("models/panorama.js", function(geometry, materials) {
            var material;
            if(imageUrl){
                material = new THREE.MeshBasicMaterial({
                    map: THREE.ImageUtils.loadTexture(imageUrl)
                });
            } else {
                material =  materials[0]
            }
            var model = new THREE.Mesh(geometry, material);
            scene.add(model);
        });

        var timer = new Timer();
        return {
            scene: scene,
            camera: camera,
            render: function(time){
                var passed = timer.getPassed(time);
                camera.rotation.x += passed * (rotationSpeed?rotationSpeed.x:0.005);
                camera.rotation.y -= passed * (rotationSpeed?rotationSpeed.y:0.15);

                blurPass.uniforms.delta.value.x = Math.max(0, blurPass.uniforms.delta.value.x - passed * 0.1);
                blurPass.uniforms.delta.value.y = Math.max(0, blurPass.uniforms.delta.value.y - passed * 0.1);
                effectPass.uniforms.brightness.value = Math.min(0, effectPass.uniforms.brightness.value + passed * 0.1);

            },
            onEvent: function(event) {

            },
            init: function(args){
                blurPass.uniforms.delta.value.x = 0.1;
                blurPass.uniforms.delta.value.y = 0.1;
                effectPass.uniforms.brightness.value = -0.1;
                OverlayEffects.resetGlitchers();
                OverlaySceneAdd.disableFloaters();
            }
        };
    }
});