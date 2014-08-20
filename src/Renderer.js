define(function(require){
    var EffectShader = require("EffectShader");
    var TimeLine = null;

    var renderer = new THREE.WebGLRenderer( {antialias: false, alpha:true} );

    var renderModel = new THREE.RenderPass();

    var composer = InitializeComposer();
    var frameUrl = null;

    var scene;
    var timeSource;
    var framenum = 0;

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
                scene.render(timeSource.getTime());

                if(!frameUrl)
                    requestAnimationFrame(render);

                renderModel.scene = renderScene;
                renderModel.camera = scene.camera;

                effectPass.uniforms.globalBrightness.value = Math.random() * 0.05 + 0.95;
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

        composer.setSize(width, height);

        renderer.setSize(width, height);
        $("canvas").css("margin-top", position + "px");
    }

    function InitializeComposer() {
        var effectCopy = new THREE.ShaderPass(THREE.CopyShader);
        effectBloom = new THREE.BloomPass(0.8);
        var effectVignette = new THREE.ShaderPass(THREE.VignetteShader);
        effectPass = new THREE.ShaderPass(EffectShader);
        effectCopy.renderToScreen = true;

        var composer = new THREE.EffectComposer(renderer);
        composer.addPass(renderModel);
        composer.addPass(effectBloom);
        composer.addPass(effectVignette);
        composer.addPass(effectPass);
        composer.addPass(effectCopy);
        return composer;
    }
});