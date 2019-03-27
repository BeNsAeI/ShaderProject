#version 130
in vec2  vST;
in vec4 vColor;
uniform sampler2D uTexUnit;
uniform float uScenter,uTcenter,uDs,uDt,uDr,uMagFactor,uRotAngle,uSharpFactor;
uniform bool uRound;
void
main( )
{
	bool aInMagicLense = false;
	if(uRound)
	{
		if((uScenter-vST.s)*(uScenter-vST.s) + (uTcenter-vST.t)*(uTcenter-vST.t) <=  uDr)
		aInMagicLense = true;
	}
	else
	{
		if(((vST.s < uScenter && vST.s > uScenter-uDs)||(vST.s > uScenter && vST.s < uScenter+uDs)) &&
		   ((vST.t < uTcenter && vST.t > uTcenter-uDt)||(vST.t > uTcenter && vST.t < uTcenter+uDt)))
			aInMagicLense = true;
	}
	vec3 newcolor;
	if(aInMagicLense)	// inside magic lense
	{
		float relS = ((uScenter-vST.s)*cos(uRotAngle)-(uTcenter-vST.t)*sin(uRotAngle))/uMagFactor;
		float relT = ((uScenter-vST.s)*sin(uRotAngle)+(uTcenter-vST.t)*cos(uRotAngle))/uMagFactor;
		float myS = uScenter-relS;
		float myT = uTcenter-relT;
		
		
		newcolor = vec3( 1, 0, 0);
		vec3 a = texture2D( uTexUnit, vec2(fract(relS),fract(relT))-vec2(1/fract(relS),1/fract(relT))).rgb;
		vec3 b = texture2D( uTexUnit, vec2(fract(relS),fract(relT))+vec2(1/fract(relS),-1/fract(relT))).rgb;
		vec3 c = texture2D( uTexUnit, vec2(fract(relS),fract(relT))+vec2(1/fract(relS),1/fract(relT))).rgb;
		vec3 d = texture2D( uTexUnit, vec2(fract(relS),fract(relT))-vec2(1/fract(relS),-1/fract(relT))).rgb;
		vec3 e =  texture2D( uTexUnit, vec2(fract(relS),fract(relT))-vec2(1/fract(relS),0)).rgb;
		vec3 f =  texture2D( uTexUnit, vec2(fract(relS),fract(relT))+vec2(1/fract(relS),0)).rgb;
		vec3 g =  texture2D( uTexUnit, vec2(fract(relS),fract(relT))-vec2(0,1/fract(relT))).rgb;
		vec3 h =  texture2D( uTexUnit, vec2(fract(relS),fract(relT))+vec2(0,1/fract(relT))).rgb;
		vec3 outSharp = vec3(0,0,0);
		outSharp += 1*(a+b+c+d);
		outSharp += 2*(e+f+g+h);
		outSharp += 4*(texture2D( uTexUnit, vec2(fract(relS),fract(relT)) ).rgb);
		outSharp /= 16;
		
		newcolor = vec3( mix( outSharp, texture2D( uTexUnit,  vec2(fract(myS),fract(myT)) ).rgb, uSharpFactor ) );
	}
	else	// not inside magic lense
	{
		newcolor = texture( uTexUnit, vec2(fract( vST.s),fract( vST.t)) ).rgb;
	}
	gl_FragColor = vec4( newcolor, 1.0 );
}
