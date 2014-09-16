define(function(require){
    var EffectShader = require("EffectShader");
    var AberrationShader = require("AberrationShader");
    var OverlayShader = require("OverlayShader");
    var OverlayScene = require("scene/OverlayScene");

    var TimeLine = null;

    var renderer = new THREE.WebGLRenderer( {antialias: false, alpha:true} );

    var renderModel = new THREE.RenderPass();

    var renderTarget = null;

    var composer = InitializeComposer();
    var frameUrl = null;

    var scene;
    var timeSource;
    var framenum = 0;
    var switchTime = 0;

    return {
        init:function(){
            renderer.autoClear = false;
            $(window).resize(resizeViewPort);
            document.body.appendChild( renderer.domElement );
            $("canvas").hide();
            resizeViewPort();
        },
        setTimeSource: function(argTimeSource){
            timeSource = argTimeSource;
        },
        setTimeLine: function(timeLine){
            TimeLine = timeLine;
        },
        start: function() {
            $("canvas").fadeIn(3000);
            function render() {
                var events = timeSource.getEvents();

                dispatchEvents(events, TimeLine);
                var sceneObj = TimeLine.getScene();
                var renderScene = sceneObj.renderScene;

                scene = sceneObj.sceneObject;

                if(!scene){
                    requestAnimationFrame(render);
                    return;
                }

                dispatchEvents(events, scene);
                dispatchEvents(events, OverlayScene);
                scene.render(timeSource.getTime() - switchTime);

                if(!frameUrl)
                    requestAnimationFrame(render);

                renderModel.scene = renderScene;
                renderModel.camera = scene.camera;

                OverlayScene.render(timeSource.getTime());
                renderer.render(OverlayScene.scene, OverlayScene.camera, renderTarget);
                overlayPass.uniforms.tOverlay.value = renderTarget;

                effectPass.uniforms.globalBrightness.value = Math.random() * 0.01 + 0.99;
                composer.render();

                if(frameUrl){
                    var dataUrl = $("canvas")[0].toDataURL("image/jpeg", 0.8);
                    framenum++;
                    $.post(frameUrl, { url: dataUrl, frameNumber: framenum}, function(){
                        render()
                    });
                }

            }
            render();
        },
        saveFramesTo: function(url){
            frameUrl = url;
        },
        resetSwitchTime: function(){
            switchTime = timeSource.getTime();
        },
        renderer: renderer
    };

    function dispatchEvents(events, target) {
        if (events) _.each(events, function (event) {
            if(target.onEvent)
                target.onEvent(event);
        });
    }

    function resizeViewPort() {
        var width = window.innerWidth;
        var height = width * (9 / 16);
        var position = (window.innerHeight - height) / 2;
        var scene = TimeLine ? TimeLine.getScene() : null;
        if(scene && scene.sceneObject){
            scene.sceneObject.camera.updateProjectionMatrix();
        }

        renderTarget = new THREE.WebGLRenderTarget(width, height);

        composer.setSize(width, height);

        renderer.setSize(width, height);
		  aberrationPass.uniforms.resolution.value.x = width;
		  aberrationPass.uniforms.resolution.value.y = height;
        $("canvas").css("margin-top", position + "px");
    }

    function InitializeComposer() {
        var effectCopy = new THREE.ShaderPass(THREE.CopyShader);
        effectBloom = new THREE.BloomPass(0.2);
        var effectVignette = new THREE.ShaderPass(THREE.VignetteShader);
        effectPass = new THREE.ShaderPass(EffectShader);
        aberrationPass = new THREE.ShaderPass(AberrationShader, "tInput");
        overlayPass = new THREE.ShaderPass(OverlayShader, "tInput");

        blurPass = new THREE.ShaderPass(THREE.TriangleBlurShader);

        effectVignette.uniforms.darkness.value = 1;
        effectCopy.renderToScreen = true;

        var composer = new THREE.EffectComposer(renderer);
        composer.addPass(renderModel);
        composer.addPass(overlayPass);
        composer.addPass(effectBloom);
        composer.addPass(blurPass);
		composer.addPass(aberrationPass);
        composer.addPass(effectVignette);
        composer.addPass(effectPass);
        composer.addPass(effectCopy);
        return composer;
    }
});
