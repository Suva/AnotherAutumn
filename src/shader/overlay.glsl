uniform sampler2D tInput;
uniform sampler2D tOverlayAdd;
uniform sampler2D tOverlaySub;
uniform float overlayAmount;

varying vec2 vUv;

void main()
{

    bool modified = false;
    /*
    if(vUv.x > 0.4 && vUv.x < 0.5 && vUv.y > 0.6 && vUv.y < 0.8){
       modified = true;
    }*/
	gl_FragColor = 
		((
			texture2D(tInput, modified?(vUv - 0.5) * 0.5 + 0.5:vUv)
			+ texture2D(tOverlayAdd, vUv)
			- texture2D(tOverlaySub, vUv)
			- 0.5
		)
		* 1.2 + 0.5) + (((texture2D(tInput, (vUv - 0.5) * (overlayAmount) + 0.5)) * overlayAmount) * 0.3);
}
