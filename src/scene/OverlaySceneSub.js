define(function(require){

    var Random = require("Random");
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, 16 / 9, 0.1, 5000);

    camera.position.set(0, 0, 10);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    var backgroundPlane = new THREE.Mesh(
        new THREE.PlaneGeometry(16, 9, 32, 32),
        new THREE.MeshLambertMaterial({color: 0xFFFFFF})
    );
    backgroundPlane.scale.multiplyScalar(4);
    backgroundPlane.position.z = -10;
    scene.add(backgroundPlane);

    var lightSystem = new THREE.Object3D();

    var lightColours = [
        0x666666
    ];

    var maxLightDistance = 10;
    var lightTriggerIntensity = 0.6;

    var r = Random(2);
    var lights = [];
    var curLight = 0;
    _.each(_.range(0, 10), function(idx){
        var light = new THREE.PointLight(lightColours[idx % lightColours.length], 0, 20);
        light.position.x = r.randInt(-maxLightDistance, maxLightDistance);
        light.position.y = r.randInt(-maxLightDistance, maxLightDistance);
        light.position.z = r.randInt(-maxLightDistance, maxLightDistance);
        lights.push(light);
        console.log(light);
        lightSystem.add(light)
    });

    scene.add(lightSystem);

    return {
        scene: scene,
        camera: camera,
        render: function(time){
            lightSystem.rotation.y = time;
            lightSystem.rotation.z = time;
            lightSystem.rotation.x = time;
            _.each(lights, function(light){
                light.intensity = Math.max(0, light.intensity - 0.005);
            })
        },
        onEvent: function(event) {
            if(event.instrument == 2){
                lights[curLight].intensity = lightTriggerIntensity;
            }
            if(event.instrument == 1 && event.note == "C-3" || event.note == "D-3"){
                lights[curLight].intensity = lightTriggerIntensity / 4;
            }
            curLight = (curLight + 1) % lights.length;
        },
        init: function(args){

        }
    };
});
