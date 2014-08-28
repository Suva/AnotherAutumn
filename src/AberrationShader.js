define(function(require){
   var fs = require("text!shader/chromatic-aberration-fs.glsl");
   var vs = require("text!shader/basic-vs.glsl");
   return {
       uniforms: {
           "tInput": { type: "t", value: null },
           "resolution": {type: "v2", value: new THREE.Vector2(1920, 1080) }
       },
       fragmentShader: fs,
       vertexShader: vs
   }
});
