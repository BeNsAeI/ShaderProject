varying float LightIntensity;
varying vec2 ST;
varying vec3 MC;

void
main( void )
{
	ST = gl_MultiTexCoord0.st;
	MC = gl_Vertex.xyz;

	vec3 tnorm      = normalize( gl_NormalMatrix * gl_Normal );
	vec3 LightPos   = vec3( 2., 10., 10. );
	vec3 ECposition = vec3( gl_ModelViewMatrix * gl_Vertex );
	LightIntensity  = dot( normalize(LightPos - ECposition), tnorm );
	LightIntensity = abs( LightIntensity );
	//LightIntensity *= 1.5;

	gl_Position = gl_ModelViewProjectionMatrix * gl_TextureMatrix[0] * gl_Vertex;
}
