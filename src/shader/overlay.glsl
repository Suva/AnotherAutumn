uniform sampler2D tInput;
uniform sampler2D tOverlayAdd;
uniform sampler2D tOverlaySub;
uniform float overlayAmount;

varying vec2 vUv;

void main()
{
	gl_FragColor = 
		(
			texture2D(tInput, vUv) 
			+ texture2D(tOverlayAdd, vUv) 
			- texture2D(tOverlaySub, vUv)
			- 0.5
		)
		* 1.5 + 0.5;
}
