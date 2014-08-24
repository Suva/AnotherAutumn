define(function(require){
    var Wiggle = require("Wiggle");
    var Random = require("Random");
    var Timer = require("Timer");
    var Ease = require("Ease");

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
    var r = Random(11);
    var blurriness = 0;
    var timer = new Timer();
    return {
        scene: scene,
        camera: camera,
        render: function(time){
            var passed = timer.getPassed(time);
            const fadeOutTime = 7;
            const fadeInTime = 4;
            if(time < fadeInTime) {
                blurPass.uniforms.delta.value.x = (fadeInTime - time) / fadeInTime * 0.01;
                blurPass.uniforms.delta.value.y = (fadeInTime - time) / fadeInTime * 0.01;
                effectPass.uniforms.brightness.value = Ease.inCubic((time - fadeInTime) / fadeInTime);
            } else if(time > fadeOutTime) {
                blurPass.uniforms.delta.value.x = (time - fadeOutTime) * 0.01;
                blurPass.uniforms.delta.value.y = (time - fadeOutTime) * 0.01;
                effectPass.uniforms.brightness.value = Math.max(0 - (time - fadeOutTime) * 0.2, -1);
            } else {
                if(!r.randInt(0, 120)){
                    blurriness = 0.01;
                }

                blurriness = Math.max(0, blurriness - passed * 0.1);

                blurPass.uniforms.delta.value.x = blurriness;
                blurPass.uniforms.delta.value.y = blurriness;
            }
            camera.position.z =  5.5 - time * 0.1;
            wiggle(camera);


        },
        onEvent: function(event) {

        },
        init: function(args){

        }
    };
});