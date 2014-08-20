define(function(){
   return {
       uniforms: {
           "tDiffuse": { type: "t", value: null },
           brightness: {type: "f", value: 0},
           globalBrightness: {type: "f", value: 1},
           aberration: {type: "f", value: 0}
       },
       fragmentShader:[
            "precision highp float;",
            "varying vec2 vUv;",
            "uniform sampler2D tDiffuse;",
            "uniform float brightness;",
            "uniform float globalBrightness;",
            "uniform float aberration;",
            "float rand(vec2 co){",
            "   return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);",
            "}",
            "void main(void)",
            "{",
                "vec3 color = texture2D(tDiffuse,vUv).rgb;",
                "if(aberration > 0.0){",
                "   color.r = texture2D(tDiffuse,vUv + vec2(aberration, 0)).r;",
                "   color.g = texture2D(tDiffuse,vUv + vec2(-aberration, 0)).g;",
                "}",
                "vec3 randColor = vec3(rand(vUv*globalBrightness)*0.1+0.95, rand(vUv*globalBrightness)*0.1+0.95, rand(vUv*globalBrightness)*0.1+0.95);",
                "gl_FragColor = vec4((color+brightness)*globalBrightness*randColor,1.0);",
            "}"
       ].join("\n"),
       vertexShader:[

           "varying vec2 vUv;",

           "void main() {",

           "vUv = uv;",
           "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

           "}"
       ].join("\n")
   }
});