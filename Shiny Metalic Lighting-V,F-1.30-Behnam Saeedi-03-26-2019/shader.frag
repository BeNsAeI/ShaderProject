#version 130
uniform float uKa, uKd, uKs;
uniform vec4 uColor;
uniform vec4 uSpecularColor;
uniform float uShininess;
uniform sampler3D Noise3;
in vec2 vST;
in vec3 vN;
in vec3 vL;
in vec3 vE;
in vec3 vMCposition;

void
main( )
{
	
	vec3 Normal = normalize(vN);
	vec3 Light = normalize(vL);
	vec3 Eye = normalize(vE);
	vec3 ambient = uKa * vec3(uColor.r, uColor.g, uColor.b);
	float dif = max( dot(Normal,Light), 0. ); // only do diffuse if the light can see the point
	vec3 diffuse = uKd * dif * vec3(uColor.r, uColor.g, uColor.b);
	float s = 0.;
	if( dot(Normal,Light) > 0. ) // only do specular if the light can see the point
	{
		vec3 ref = normalize( reflect( -Light, Normal ) );
		s = pow( max( dot(Eye,ref),0. ), uShininess );
	}
	vec3 specular = uKs * s * vec3(uSpecularColor.r, uSpecularColor.g, uSpecularColor.b);
	
	gl_FragColor = vec4( ambient + diffuse + specular, 1 );
}
