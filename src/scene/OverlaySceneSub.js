define(function(require){

    var Random = require("Random");
    var Title = require("component/TitleParticleSystem");
    var anotherTitle = require("text!titles/another.pbm");
    var bdTitle = require("text!titles/browser-demo.pbm");
    var musicTitle = require("text!titles/music.pbm");
    var photoTitle = require("text!titles/photo.pbm");
    var endTitle = require("text!titles/fun.pbm");

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, 16 / 9, 0.1, 5000);
    var Timer = require("Timer");

    camera.position.set(0, 0, 10);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    var backgroundPlane = new THREE.Mesh(
        new THREE.PlaneGeometry(16, 9, 32, 32),
        new THREE.MeshLambertMaterial({color: 0xFFFFFF, transparent: true, opacity: 0.1})
    );

    backgroundPlane.scale.multiplyScalar(4);
    backgroundPlane.position.z = -10;
    scene.add(backgroundPlane);

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
            if(event.pattern){
                switch (event.pattern){
                    case 2:
                        Title.setTitle(anotherTitle, new THREE.Vector3(0, 2.5, 0));
                        break;
                    case 3:
                        Title.setTitle(bdTitle, new THREE.Vector3(2.6, -1.5));
                        break;
                    case 4:
                        Title.setTitle(musicTitle, new THREE.Vector3(0, 2.5, 0));
                        break;
                    case 5:
                        Title.setTitle(photoTitle, new THREE.Vector3(2.6, 1.5));
                        break;
                    case 6:
                        Title.clear();
                        break;
                    case 18:
                        Title.setTitle(endTitle);
                        break;
                    default:
                }
            }

        },
        init: function(args){

        }
    };
});
