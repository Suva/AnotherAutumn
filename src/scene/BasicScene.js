define(function(require){

    var scene = new THREE.Object3D();
    var camera = new THREE.PerspectiveCamera(75, 16 / 9, 0.1, 5000);

    camera.position.set(0, 0, 5);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    var cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({color: 0xFF88FF})
    );

    scene.add(cube);

    return {
        scene: scene,
        camera: camera,
        render: function(time){
            cube.rotation.x = time;
            cube.rotation.y = time;
        },
        onEvent: function(event) {

        },
        init: function(args){

        }
    };
});