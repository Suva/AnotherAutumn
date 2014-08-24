define(function(require) {
    var BasicScene               = require("scene/BasicScene");
    var CCLogoScene              = require("scene/CCLogoScene");

    var renderScene;

    var renderer = null;

    var currentScene;


    var allScenes = [
        BasicScene,
        CCLogoScene
    ];

    function initRenderScene(scenes){
        var renderTarget = new THREE.WebGLRenderTarget(16, 9);
        var renderCam = new THREE.PerspectiveCamera(80, 16 / 9, 0.1, 5000);
        var renderScene = new THREE.Scene();

        renderCam.position.set(0, 0, -1000);
        renderCam.lookAt(new THREE.Vector3());

        renderScene.fog = new THREE.FogExp2(0, 0);

        _.each(scenes, function(scene){
            renderScene.add(scene.scene);
        });
        renderer.render(renderScene, renderCam, renderTarget);
        return renderScene;
    }

    var oldScene = null;

    return {
        getScene: function(){
            return {
                renderScene: renderScene,
                sceneObject: currentScene
            };
        },
        onEvent: function(event){
            if(typeof(event.pattern) == 'undefined') return;
            switch(event.pattern){
                case 0:
                    currentScene = CCLogoScene;
                    break;
            }

            renderScene = renderScenes[getSceneId(currentScene)];

            if(oldScene != currentScene){
                if(currentScene.init){
                    currentScene.init({renderScene: renderScene, renderer: renderer});
                }
                oldScene = currentScene;
            }
        },
        setRenderer: function(r){
            renderer = r;
            renderScenes = _.map(allScenes, function(scene){
                return initRenderScene([scene])
            });

        }
    };

    function getSceneId(scene){
        for(var i = 0; i < allScenes.length; i++){
            if(allScenes[i] == scene){
                return i;
            }
        }
        return false;
    }
});