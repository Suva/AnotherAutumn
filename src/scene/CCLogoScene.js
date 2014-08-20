define(function(require){
    var Wiggle = require("Wiggle");

    var scene = new THREE.Object3D();
    var camera = new THREE.PerspectiveCamera(75, 16 / 9, 0.1, 5000);

    camera.position.set(0, 0, 5.5);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    var tex = THREE.ImageUtils.loadTexture("images/cc-logo-gritty.jpg");
    var plane = new THREE.Mesh(
        new THREE.PlaneGeometry(16, 9),
        new THREE.MeshBasicMaterial({
            map: tex
        })
    );

    scene.add(plane);


    var wiggle = Wiggle(0.2, 0.006);
    return {
        scene: scene,
        camera: camera,
        render: function(time){
            wiggle(camera);
        },
        onEvent: function(event) {

        },
        init: function(args){

        }
    };
});