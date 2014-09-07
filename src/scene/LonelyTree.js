define(function(require){

    var Wiggle = require("Wiggle");

    var scene = new THREE.Object3D();
    var camera = new THREE.PerspectiveCamera(50, 16 / 9, 0.1, 5000);

    camera.position.set(0, 0, 14);
    camera.lookAt(new THREE.Vector3(0, 0, 0));


    var jsonLoader = new THREE.JSONLoader();
    jsonLoader.load("models/lonely-tree.js", function(geometry, materials) {
        var model = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
        scene.add(model);
        jsonLoader.load("models/lonely-tree-fg.js", function(geometry, materials) {
            var model = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
            scene.add(model);
        });
    });

    var origin = new THREE.Vector3();

    return {
        scene: scene,
        camera: camera,
        render: function(time){
            camera.position.x = -1 + time * 0.2;
            camera.lookAt(origin);
        },
        onEvent: function(event) {

        },
        init: function(args){

            blurPass.uniforms.delta.value.x = 0;
            blurPass.uniforms.delta.value.y = 0;
            effectPass.uniforms.brightness.value = 0;

        }
    };
});