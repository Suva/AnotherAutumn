define(function (require){
    var MusicPlayer = require("MusicPlayer");

    return {
        moveGlitchers: function(){
            var gt = MusicPlayer.getTime();
            overlayPass.uniforms.modifyPos.value = (Math.sin(gt/2) + 1) / 2 * 0.5 + 0.25;
            overlayPass.uniforms.modifyPos1.value = (Math.sin(gt/3) + 1) / 2 * 0.5 + 0.25;
            overlayPass.uniforms.modifyPos2.value = (Math.sin(gt/4) + 1) / 2 * 0.5 + 0.25;
            overlayPass.uniforms.modifyPos3.value = (Math.sin(gt / 2.1) + 1) / 2 * 0.5 + 0.25;
            overlayPass.uniforms.modifyPos4.value = (Math.sin(gt/2.5) + 1) / 2 * 0.5 + 0.25;
            overlayPass.uniforms.modifyPos5.value = (Math.sin(gt/3.5) + 1) / 2 * 0.5 + 0.25;
            overlayPass.uniforms.modifyPos6.value = (Math.sin(gt/4.5) + 1) / 2 * 0.5 + 0.25;
            overlayPass.uniforms.modifyPos7.value = (Math.sin(gt/1.5) + 1) / 2 * 0.5 + 0.25;

        },

        resetGlitchers: function(){
            var gt = MusicPlayer.getTime();
            overlayPass.uniforms.modifyPos.value = 0;
            overlayPass.uniforms.modifyPos1.value = 0;
            overlayPass.uniforms.modifyPos2.value = 0;
            overlayPass.uniforms.modifyPos3.value = 0;
            overlayPass.uniforms.modifyPos4.value = 0;
            overlayPass.uniforms.modifyPos5.value = 0;
            overlayPass.uniforms.modifyPos6.value = 0;
            overlayPass.uniforms.modifyPos7.value = 0;

        }
    };

})