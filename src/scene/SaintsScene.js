define(function(require){

    var ImagePlane = require("ImagePlane");
    var Wiggle = require("Wiggle");

    var scene = new THREE.Object3D();
    var camera = new THREE.PerspectiveCamera(75, 16 / 9, 0.1, 5000);

    camera.position.set(0, 0, 5);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    var sky = ImagePlane("images/saints-sky.jpg", 15);
    var fg = ImagePlane("images/saints-fg.png");

    sky.position.z = -10;

    scene.add(sky);
    scene.add(fg);

    var wiggle = Wiggle(0.3, 0.001);

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