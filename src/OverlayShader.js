define(function(require){
   var fs = require("text!shader/overlay.glsl");
   var vs = require("text!shader/basic-vs.glsl");
   return {
       uniforms: {
           "tInput": { type: "t", value: null },
           "tOverlayAdd": { type: "t", value: null },
           "tOverlaySub": { type: "t", value: null },
           "overlayAmount": { type: "f", value: 0}
       },
       fragmentShader: fs,
       vertexShader: vs
   }
});
