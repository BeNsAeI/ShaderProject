#version 130
out vec2 vST; // texture coords
out vec3 vN; // normal vector
out vec3 vL; // vector from point to light
out vec3 vE; // vector from point to eye
const vec3 LIGHTPOSITION = vec3( 5., 5., 0. );

void
main( )
{
	vec4 model = gl_Vertex;
	vST = gl_MultiTexCoord0.st;
	vec4 ECposition = gl_ModelViewMatrix * gl_Vertex;
	vN = normalize( gl_NormalMatrix * gl_Normal );
	vL = LIGHTPOSITION - ECposition.xyz;
	vE = vec3( 0., 0., 0. ) - ECposition.xyz;
	vec3 vert = gl_Vertex.xyz;
	gl_Position = gl_ModelViewProjectionMatrix * vec4( vert, 1. );
}
