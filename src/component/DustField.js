define(function(require){
    var RandomNumberGenerator = require("Random");
    var Timer = require("Timer");

    return {
        create: createStarSystem
    };


    function getRandomStarPosition(r) {
        return (r.randInt(0, 1) ? 1 : -1) * (r.random() * 10);
    }

    function createStarSystem(seed) {

        var r = RandomNumberGenerator(seed);

        var geo = new THREE.Geometry();
        var colors = [];
        _.each(_.range(1, 1000), function () {
            var vector;
            vector = new THREE.Vector3(
                getRandomStarPosition(r),
                getRandomStarPosition(r),
                getRandomStarPosition(r)
            );

            vector.speed = new THREE.Vector3(
                r.random() - 0.5,
                r.random() - 0.5,
                r.random() - 0.5
            );

            console.log(vector);

            geo.vertices.push(vector);
            var color = new THREE.Color(0xffffff);
            color.setHSL(r.random(), 0.5, 0.9);
            colors.push(color);
        });
        geo.colors = colors;
        var sprite = THREE.ImageUtils.loadTexture("images/dust.png");
        var particleSystemMaterial = new THREE.ParticleSystemMaterial({
            map: sprite,
            size: 0.1,
            opacity: 0.1,
            depthTest: false,
            // blending: THREE.AdditiveBlending,
            transparent: true
            // vertexColors: true
        });
        var particleSystem = new THREE.ParticleSystem(geo, particleSystemMaterial);
        particleSystem.sortParticles = true;

        var timer = new Timer();

        return {
            system: particleSystem,
            update: function (time) {
                var passed = timer.getPassed(time);
                _.each(particleSystem.geometry.vertices, function(vert){
                    vert.x = calcVertPos(vert.x, vert.speed.x, passed);
                    vert.y = calcVertPos(vert.y, vert.speed.y, passed);
                    vert.z = calcVertPos(vert.z, vert.speed.z, passed);

                    vert.speed.x = Math.max(-1, Math.min(1, vert.speed.x + ((r.random() - 0.5) * 0.1)));
                    vert.speed.y = Math.max(-1, Math.min(1, vert.speed.y + ((r.random() - 0.5) * 0.1)));
                    vert.speed.z = Math.max(-1, Math.min(1, vert.speed.z + ((r.random() - 0.5) * 0.1)));

                });

                function calcVertPos(pos, amount, passed) {
                    var val = pos + amount * passed * 0.3;
                    if(val > 10) val = -10;
                    if(val < -10) val = 10;
                    return val;
                }
            }
        };
    }
});