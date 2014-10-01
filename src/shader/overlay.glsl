uniform sampler2D tInput;
uniform sampler2D tOverlayAdd;
uniform sampler2D tOverlaySub;
uniform float overlayAmount;
uniform float modifyPos;
uniform float modifyPos1;
uniform float modifyPos2;
uniform float modifyPos3;
uniform float modifyPos4;
uniform float modifyPos5;
uniform float modifyPos6;
uniform float modifyPos7;




varying vec2 vUv;

void main()
{

    float modified = 0.0;

    if (vUv.x > modifyPos && vUv.x < modifyPos + 0.03)   modified+=1.0;
    if (vUv.x > modifyPos1 && vUv.x < modifyPos1 + 0.03) modified+=1.0;
    if (vUv.x > modifyPos2 && vUv.x < modifyPos2 + 0.03) modified+=1.0;
    if (vUv.x > modifyPos3 && vUv.x < modifyPos3 + 0.03) modified+=1.0;
    if (vUv.x > modifyPos4 && vUv.x < modifyPos + 0.03)  modified+=1.0;
    if (vUv.x > modifyPos5 && vUv.x < modifyPos1 + 0.03) modified+=1.0;
    if (vUv.x > modifyPos6 && vUv.x < modifyPos2 + 0.03) modified+=1.0;
    if (vUv.x > modifyPos7 && vUv.x < modifyPos3 + 0.03) modified+=1.0;

	gl_FragColor = 
		((
			texture2D(tInput, (modified != 0.0)?(vUv - 0.5) * (0.99 - 0.01 * modified) + 0.5:vUv)
			+ texture2D(tOverlayAdd, vUv)
			- texture2D(tOverlaySub, vUv)
			- 0.5
		)
		* 1.2 + 0.5) + (((texture2D(tInput, (vUv - 0.5) * (overlayAmount) + 0.5)) * overlayAmount) * 0.3);
}
