define(function(require){
    var RandomNumberGenerator = require("Random");
    var ParsePbm = require("ParsePbm");
    var Timer = require("Timer");

    var r = RandomNumberGenerator(11);

    var geo = new THREE.Geometry();

    _.each(_.range(1, 20000), function () {
        var vector;
        vector = new THREE.Vector3(
            -10,
            r.random() * 10,
            r.random() * 10
        );

        vector.speed = 0.8 + r.random() * 0.2;
        vector.destination = vector.clone();

        geo.vertices.push(vector);
    });

    var sprite = THREE.ImageUtils.loadTexture("images/dust.png");
    var particleSystemMaterial = new THREE.ParticleSystemMaterial({
        map: sprite,
        size: 0.2,
        opacity: 1,
        depthTest: false,
        // blending: THREE.AdditiveBlending,
        transparent: true
        // vertexColors: true
    });
    var particleSystem = new THREE.ParticleSystem(geo, particleSystemMaterial);
    particleSystem.sortParticles = true;


    var timer = new Timer();
    return {
        setTitle: function(titlePbm){

            var title = ParsePbm(titlePbm);

            // Assign particle destinations
            var x = 0;
            var y = 0;
            var vertNumber = 0;
            const separation = 0.02;
            _.each(title.data, function(row){
                _.each(row, function(pixel){
                    if(pixel){
                        var vertex = particleSystem.geometry.vertices[vertNumber++];
                        vertex.destination.x = (title.position.x - (title.width * separation / 2))+ x * separation;
                        vertex.destination.y = (title.position.y + (title.height * separation / 2)) + y * separation;
                        vertex.destination.z  = title.position.z;
                    }
                    x++;
                });
                x = 0;
                y--;
            });

            // Assign unneeded particles destinations away from screen
        },

        render: function(time){
            var passed = timer.getPassed(time);
            _.each(particleSystem.geometry.vertices, function(vert){
                var direction = vert.destination.clone();
                direction.sub(vert);
                if(direction.length() < 0.1) {
                    return;
                }
                direction.normalize();
                direction.multiplyScalar(vert.speed * passed * 4);
                vert.add(direction);
            });


            // Move particles toward their destinations
        },
        getSystem: function(){
            return particleSystem;
        }

    }
});