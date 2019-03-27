varying float LightIntensity; 
varying vec2  ST;
varying vec3  MC;

uniform float Ad;
uniform float Bd;
uniform float NoiseAmp;
uniform float NoiseFreq;
uniform float Tol;
uniform sampler3D Noise3;

const vec3 BEAVER = vec3( 1., .5, 0. );
const vec3 OTHER  = vec3( 1., .9, .2);

void
main( void )
{
	vec4  nv  = texture3D( Noise3, NoiseFreq*MC );
	float n = nv[0] + nv[1] + nv[2] + nv[3];	// 1. -> 3.
	n = ( n - 2. );				// -1. -> 1.

	vec2 st = ST;

	float Ar = Ad/2.;
	float Br = Bd/2.;

	float numins = floor( st.s / Ad );
	float numint = floor( st.t / Bd );

	vec3 TheColor = OTHER;

	vec2 center = vec2( numins*Ad + Ar , numint*Bd + Br );
	vec2 delta = st - center;
	float oldrad = length( delta );
	float newrad = oldrad + NoiseAmp*n;
	delta = delta * newrad / oldrad;
	float ds = delta.s/Ar;
	float dt = delta.t/Br;
	float d = ds*ds + dt*dt;
	float t = smoothstep( 1.-Tol, 1.+Tol, d );
	TheColor = mix( BEAVER, OTHER, t );

	gl_FragColor = vec4( LightIntensity*TheColor, 1. );
}