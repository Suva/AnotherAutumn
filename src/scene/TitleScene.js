define(function(require){
    var Wiggle = require("Wiggle");
    var Random = require("Random");
    var Timer = require("Timer");
    var Ease = require("Ease");

    var scene = new THREE.Object3D();
    var camera = new THREE.PerspectiveCamera(75, 16 / 9, 0.1, 5000);

    const cameraPosition = 11;
    const logoPosition = 3;

    camera.position.set(0, 0, cameraPosition);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    var titleOverlay = THREE.ImageUtils.loadTexture("images/title-overlay.png");

    var sky = THREE.ImageUtils.loadTexture("images/l04.jpg");
    var fgTextures = [
        THREE.ImageUtils.loadTexture("images/l01.png"),
        THREE.ImageUtils.loadTexture("images/l02.png"),
        THREE.ImageUtils.loadTexture("images/l03.png"),
    ];
    var logo = THREE.ImageUtils.loadTexture("images/another-autumn-logo.png");

    var plane = new THREE.Mesh(
        new THREE.PlaneGeometry(16, 9),
        new THREE.MeshBasicMaterial({
            map: sky,
            depthWrite: false,
            depthTest: false
        })
    );

    var fgPlane = new THREE.Object3D();

    _.each(fgTextures, function(texture, idx) {
        var plane = new THREE.Mesh(
            new THREE.PlaneGeometry(16, 9),
            new THREE.MeshBasicMaterial({
                map: texture,
                transparent: true,
                depthWrite: false,
                depthTest: false
            })
        );
        plane.position.z = -idx * 5;
        plane.scale.multiplyScalar(1 + idx * 0.5);
        fgPlane.add(plane);
    });


    scene.add(plane);
    scene.add(fgPlane);

    plane.scale.multiplyScalar(1.5);
    plane.position.z = -5;

    var wiggle = Wiggle(0.02, 0.006);
    var r = Random(11);
    var blurriness = 0;
    var timer = new Timer();
    var logoFlashTime = 0;
    var flashLogo = false;
    var flashNumber = 0;
    return {
        scene: scene,
        camera: camera,
        render: function(time){

            if(flashLogo){
                flashLogo = false;
                logoFlashTime = time;
            }
            var passed = timer.getPassed(time);
            const fadeOutTime = 7;
            const fadeInTime = 0.1;
            if(time < fadeInTime) {
                blurPass.uniforms.delta.value.x = (fadeInTime - time) / fadeInTime * 0.01;
                blurPass.uniforms.delta.value.y = (fadeInTime - time) / fadeInTime * 0.01;
                effectPass.uniforms.brightness.value = Ease.inCubic((time - fadeInTime) / fadeInTime);
            } else if(time > fadeOutTime) {
                blurPass.uniforms.delta.value.x = (time - fadeOutTime) * 0.01;
                blurPass.uniforms.delta.value.y = (time - fadeOutTime) * 0.01;
                effectPass.uniforms.brightness.value = Math.max(0 - (time - fadeOutTime) * 0.2, -1);
            } else {
                blurriness = Math.max(0, blurriness - passed * 0.1);
                effectPass.uniforms.brightness.value = Math.max(0, effectPass.uniforms.brightness.value - passed * 0.5);
                blurPass.uniforms.delta.value.x = blurriness;
                blurPass.uniforms.delta.value.y = blurriness;
            }


            camera.position.z = cameraPosition - time * 0.1;
            camera.position.x = -0.5 + time * 0.2;

            wiggle(camera);

        },
        onEvent: function(event) {
            if(event.instrument == 2){
                flashLogo = true;
                flashNumber = (flashNumber + 1) % 2;
                effectPass.uniforms.brightness.value = 0.1;
            }
        },
        init: function(args){
        }
    };
});