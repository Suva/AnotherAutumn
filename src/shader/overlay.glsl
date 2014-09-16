uniform sampler2D tInput;
uniform sampler2D tOverlay;
uniform float overlayAmount;

varying vec2 vUv;

void main()
{
	gl_FragColor = texture2D(tInput, vUv) + texture2D(tOverlay, vUv);
}
