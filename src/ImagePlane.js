define(function(){

    return function (imageUrl, initialScale) {
        initialScale = initialScale ? initialScale : 4.6;
        var geo = new THREE.PlaneGeometry(initialScale,initialScale);
        var store = {mesh: null};

        var tex = THREE.ImageUtils.loadTexture(imageUrl, null, function(tex){
            mesh.scale.x = tex.image.width / tex.image.height;
        });

        var mesh = new THREE.Mesh(
            geo,
            new THREE.MeshBasicMaterial({
                map: tex,
                transparent: true
            })
        );

        store.mesh = mesh;

        return mesh;
    }
});