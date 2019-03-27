#version 130
uniform float uKa, uKd, uKs;
uniform float uChromaBlue;
uniform float uChromaRed;
uniform bool uUseChromaDepth;
uniform vec4 uSpecularColor;
uniform float uShininess;
uniform sampler3D Noise3;
in vec2 vST;
in vec3 vN;
in vec3 vL;
in vec3 vE;
in vec3 vMCposition;
in float depth;
vec3
Rainbow( float t )
{
	t = clamp( t, 0., 1. );

	float r = 1.;
	float g = 0.0;
	float b = 1.  -  6. * ( t - (5./6.) );

        if( t <= (5./6.) )
        {
                r = 6. * ( t - (4./6.) );
                g = 0.;
                b = 1.;
        }

        if( t <= (4./6.) )
        {
                r = 0.;
                g = 1.  -  6. * ( t - (3./6.) );
                b = 1.;
        }

        if( t <= (3./6.) )
        {
                r = 0.;
                g = 1.;
                b = 6. * ( t - (2./6.) );
        }

        if( t <= (2./6.) )
        {
                r = 1.  -  6. * ( t - (1./6.) );
                g = 1.;
                b = 0.;
        }

        if( t <= (1./6.) )
        {
                r = 1.;
                g = 6. * t;
        }

	return vec3( r, g, b );
}

void
main( )
{
	vec3 myColor = vec3(1., 1., 1.);

	if( uUseChromaDepth )
	{
		float t = (2./3.) * ( normalize(vE).z - uChromaRed ) / ( uChromaBlue - uChromaRed );
		t = clamp( t, 0., 2./3. );
		myColor = Rainbow( t );
	}
	
	vec3 Normal = normalize(vN);
	vec3 Light = normalize(vL);
	vec3 Eye = normalize(vE);
	vec3 ambient = uKa * myColor;
	float dif = max( dot(Normal,Light), 0. );
	vec3 diffuse = uKd * dif * myColor;
	float s = 0.;
	if( dot(Normal,Light) > 0. ) // only do specular if the light can see the point
	{
		vec3 ref = normalize( reflect( -Light, Normal ) );
		s = pow( max( dot(Eye,ref),0. ), uShininess );
	}
	vec3 specular = uKs * s * vec3(uSpecularColor.r,uSpecularColor.g,uSpecularColor.b);
	
	gl_FragColor = vec4( ambient + diffuse + specular, 1 );
}
