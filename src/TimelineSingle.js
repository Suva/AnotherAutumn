define(function(require){
    var scene = require("scene/BasicScene");
    var Timer = require("Timer");

    var renderScene = new THREE.Scene();
    var renderer = null;

    renderScene.fog = new THREE.FogExp2(0, 0);
    renderScene.add(scene.scene);

    var sceneInitialized = false;

    return {
        getScene: function(){
            if(!sceneInitialized && scene.init) {
                scene.init({renderScene: renderScene, renderer: renderer});
                sceneInitialized = true;
            }

            return {
                renderScene: renderScene,
                sceneObject: scene
            };
        },
        setRenderer: function(r){
            renderer = r;
        }

    }
});