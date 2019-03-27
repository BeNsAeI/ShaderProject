#version 130
uniform float uKa, uKd, uKs, uS;
uniform vec4 uColor;
uniform vec4 uSpecularColor;
in vec2 vST;
in vec3 vN;
in vec3 vL;
in vec3 vE;
void
main( )
{
	vec3 Normal = normalize(vN);
	vec3 Light = normalize(vL);
	vec3 Eye = normalize(vE);
	vec3 ambient = uKa * vec3(uColor.r, uColor.g, uColor.b);
	float d = max( dot(Normal,Light), 0. );
	vec3 diffuse = uKd * d * vec3(uColor.r, uColor.g, uColor.b);
	vec3 specular = uKs * uS * vec3(uSpecularColor.r, uSpecularColor.g, uSpecularColor.b);
	gl_FragColor = vec4( ambient + diffuse + specular, 1. );
}
