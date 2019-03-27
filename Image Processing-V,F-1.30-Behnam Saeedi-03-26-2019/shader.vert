#version 130
out vec2  vST;
out vec4 vColor;
void
main( )
{
	vColor = gl_Color;
	vST = gl_MultiTexCoord0.st;
	gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;
}
