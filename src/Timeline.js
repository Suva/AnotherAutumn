define(function(require) {
    var OverlaySceneAdd          = require("scene/OverlaySceneAdd");

    var Renderer                 = require("Renderer");
    var CCLogoScene              = require("scene/CCLogoScene");
    var TitleScene               = require("scene/TitleScene");
    var LonelyTreeScene          = require("scene/LonelyTree");
    var PanoramaScene            = require("scene/PanoramaScene");
    var PhotoZoomer              = require("scene/PhotoZoomer");
    var CleanPanorama            = require("scene/CleanPanorama");
    var GreetScene               = require("scene/GreetScene");
    var EndScene                 = require("scene/EndScene");

    var SaintsScene              = GreetScene("images/saints-fg.png", "images/saints-sky.jpg", "images/greets/Conspiracy.png");
    var LanternScene             = GreetScene("images/lantern-fg.png", "images/lantern-sky.jpg", "images/greets/Farbrausch.png");
    var PostScene                = GreetScene("images/post-fg.png", "images/post-bg.jpg", "images/greets/Rebels.png");
    var Post2Scene               = GreetScene("images/post2-fg.png", "images/post2-bg.jpg", "images/greets/Brainstorm.png");
    var EdgeScene                = GreetScene("images/edge-fg.png", "images/edge-bg.jpg", "images/greets/Darklite.png");
    var HydrantScene             = GreetScene("images/hydrant-fg.png", "images/hydrant-bg.jpg", "images/greets/Renoise.png");

    var CobwebScene   = PhotoZoomer("images/cobweb.jpg", 0.1);
    var LasnamaeScene = PhotoZoomer("images/lasnamae.jpg", 0.1);
    var GrassScene    = PhotoZoomer("images/grass.jpg", -0.4, 10);
    var PlaneScene    = PhotoZoomer("images/plane.jpg", 0.1);

    var GasmaskScene  = PhotoZoomer("images/gasmask.jpg", 0.1);
    var MountainScene = PanoramaScene("models/rummu_panorama.jpg");
    var BudaPanorama = CleanPanorama("images/buda-panorama.jpg");

    var renderScene;
    var renderer = null;
    var currentScene;

    var allScenes = [
        CCLogoScene,
        TitleScene,
        LonelyTreeScene,
        MountainScene,
        CobwebScene,
        LasnamaeScene,
        GrassScene,
        PlaneScene,
        GasmaskScene,
        BudaPanorama,
        SaintsScene,
        LanternScene,
        PostScene,
        Post2Scene,
        EdgeScene,
        HydrantScene,
        EndScene
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
                case 1:
                    currentScene = TitleScene;
                    break;
                case 2:
                    currentScene = LonelyTreeScene;
                    break;
                case 3:
                    currentScene = TitleScene;
                    break;
                case 4:
                    currentScene = MountainScene;
                    break;
                case 5:
                    currentScene = LonelyTreeScene;
                    break;
                case 6:
                    currentScene = CobwebScene;
                    break;
                case 7:
                    currentScene = LasnamaeScene;
                    break;
                case 8:
                    currentScene = GrassScene;
                    break;
                case 9:
                    currentScene = GasmaskScene;
                    break;
                case 10:
                    currentScene = PlaneScene;
                    break;
                case 11:
                    currentScene = BudaPanorama;
                    break;
                case 12:
                    currentScene = SaintsScene;
                    break;
                case 13:
                    currentScene = LanternScene;
                    break;
                case 14:
                    currentScene = PostScene;
                    break;
                case 15:
                    currentScene = Post2Scene;
                    break;
                case 16:
                    currentScene = EdgeScene;
                    break;
                case 17:
                    currentScene = HydrantScene;
                    break;
                case 18:
                    currentScene = EndScene;
                    break;
            }

            renderScene = renderScenes[getSceneId(currentScene)];

            if(oldScene != currentScene){
                OverlaySceneAdd.enableFloaters();
                if(currentScene.init){
                    currentScene.init({renderScene: renderScene, renderer: renderer});
                }
                oldScene = currentScene;
                Renderer.resetSwitchTime();
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