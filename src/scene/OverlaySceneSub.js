define(function(require){

    var Random = require("Random");
    var Title = require("component/TitleParticleSystem");
    var anotherTitle = require("text!titles/another.pbm");

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, 16 / 9, 0.1, 5000);
    var Timer = require("Timer");

    camera.position.set(0, 0, 10);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    var backgroundPlane = new THREE.Mesh(
        new THREE.PlaneGeometry(16, 9, 32, 32),
        new THREE.MeshLambertMaterial({color: 0xFFFFFF})
    );

    backgroundPlane.scale.multiplyScalar(4);
    backgroundPlane.position.z = -10;
    scene.add(backgroundPlane);

    Title.setTitle(anotherTitle);

    scene.add(Title.getSystem());

    var timer = new Timer();
    return {
        scene: scene,
        camera: camera,
        render: function(time){
            var passed = timer.getPassed(time);
            Title.render(time);
        },
        onEvent: function(event) {

        },
        init: function(args){

        }
    };
});
