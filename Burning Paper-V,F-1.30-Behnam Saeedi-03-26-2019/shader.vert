#version 130
uniform float uX,uY,uZ;
uniform float uKa, uKd, uKs,uAd,uBd,uNoiseFreq,uNoiseAmp,uTime,uDelta; // coefficients of each type of lighting
uniform float uShininess; // specular exponent
uniform sampler3D Noise3;
out vec2 vST; // texture coords
out vec3 vN; // normal vector
out vec3 vL; // vector from point to light
out vec3 vE; // vector from point to eye
out vec3 vMCposition;
out vec4 vColor;

out vec2 gST; // texture coords
out vec3 gN; // normal vector
out vec3 gL; // vector from point to light
out vec3 gE; // vector from point to eye
out vec3 gMCposition;
out vec4 gColor;

void
main( )
{
	vST = gl_MultiTexCoord0.st;
	vec3 LIGHTPOSITION = vec3( uX, uY, uZ );
	vec4 ECposition = gl_ModelViewMatrix * gl_Vertex;
	vN = normalize( gl_NormalMatrix * gl_Normal ); // normal vector
	vL = LIGHTPOSITION - ECposition.xyz; // vector from the point
	// to the light position
	vE = vec3( 0., 0., 0. ) - ECposition.xyz; // vector from the point
	// to the eye position
	vColor = gl_Color;
	vMCposition = gMCposition  = gl_Vertex.xyz;
	gST = vST;
	gN = vN;
	gL = vL;
	gE = vE;
	gColor = vColor;
	
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
		{
			gMCposition.x = gMCposition.x;
			gMCposition.y = gMCposition.y+uTime*uTime;
			gMCposition.z = gMCposition.z+uTime;
		}
	}
	
	gl_Position = gl_ModelViewProjectionMatrix * vec4( gMCposition, 1. );
}