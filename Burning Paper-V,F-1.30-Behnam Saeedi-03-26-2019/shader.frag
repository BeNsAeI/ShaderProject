#version 330 compatibility
uniform float uKa, uKd, uKs,uAd,uBd,uNoiseFreq,uNoiseAmp,uTime,uDelta;
uniform float uShininess;
uniform vec4 uColor1;
uniform vec4 uColor2;
uniform vec4 uSpecularColor;
uniform sampler3D Noise3;

in vec2 gST;
in vec3 gN;
in vec3 gL;
in vec3 gE;
in vec4 gColor;
in vec3 gMCposition;
layout(location = 0) out vec3 color;

void
main( )
{
	vec3 camoColor = vec3(uColor1.r, uColor1.g, uColor1.b);
	vec3 baseColor = vec3(uColor2.r, uColor2.g, uColor2.b);
	
	vec3 myColor = baseColor;
	
	float Ar = uAd/2.;
	float Br = uBd/2.;
	int numins = int( gST.s / uAd );
	int numint = int( gST.t / uBd );
	float u_c = numins *uAd + Ar ;
	float v_c = numint *uBd + Br ;
	
	vec4 nv = texture3D( Noise3, uNoiseFreq*gMCposition );
	float n = nv.r + nv.g + nv.b + nv.a;    //  1. -> 3.
	n = n - 2.;
	
	float sc = float(numins) * uAd  +  Ar;
	float ds = gST.s - sc;                   // wrt ellipse center
	float tc = float(numint) * uBd  +  Br;
	float dt = gST.t - tc;                   // wrt ellipse center

	float oldDist = sqrt( ds*ds + dt*dt );
	float newDist = oldDist + uNoiseAmp*n;
	float scale = newDist / oldDist;        // this could be < 1., = 1., or > 1.

	ds *= scale;                            // scale by noise factor
	ds /= Ar;                               // ellipse equation

	dt *= scale;                            // scale by noise factor
	dt /= Br;                               // ellipse equation

	float dist = ds*ds + dt*dt;
	float a=1.;
	float rand = gST.s*abs(sin(1000*uTime*1))*fract(sin(dot(vec2(gST.t*abs(sin(1000*uTime*1)),gST.s*abs(sin(1000*uTime*1))),vec2(12.9898,78.233)))*43758.5453);
	float aTol = gMCposition.z*3 + uTime;
	float aAlpha = max((-gMCposition.z)*20-uTime*4+3,0);
	if(dist < 1 - aTol * 2 * rand)
	{
		if (aAlpha==0)
			discard;
		else
			a=aAlpha;
	}
	if(dist < 1 - aTol)
	{
		myColor=camoColor;
	}
	if( abs( dist - 1 ) < aTol )
	{
		float t = smoothstep( 1 - aTol, 1 + aTol, dist );
		myColor = vec3(1,mix( vec4( baseColor, 1. ), vec4( camoColor, 1. ), t ).g*3/4,0);
	}
	a = min (a,-gMCposition.z*3 + 1 - uTime/2);
	vec3 Normal = normalize(gN);
	vec3 Light = normalize(gL);
	vec3 Eye = normalize(gE);
	vec3 ambient = uKa * myColor;
	float d = max( dot(Normal,Light), 0. ); // only do diffuse if the light can see the point
	vec3 diffuse = uKd * d * myColor;
	float s = 0.;
	if( dot(Normal,Light) > 0. ) // only do specular if the light can see the point
	{
		vec3 ref = normalize( reflect( -Light, Normal ) );
		s = pow( max( dot(Eye,ref),0. ), uShininess );
	}
	vec3 specular = uKs * s * vec3(uSpecularColor.r,uSpecularColor.g,uSpecularColor.b);
	vec3 shaded = ambient + diffuse + specular;
	
	//Toon shading:
	float uMagTol=1;
	float uQuantize=200;
	// Store the buffer to a texture unit
	
	
	gl_FragColor = vec4( shaded, a );
}