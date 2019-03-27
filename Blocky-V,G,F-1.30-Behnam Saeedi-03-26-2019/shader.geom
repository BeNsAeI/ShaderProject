#version 400 compatibility
#extension GL_EXT_gpu_shader4: enable
#extension GL_EXT_geometry_shader4: enable

uniform int   uLevel;
uniform float uQuantize;
uniform bool uModelCoords;
uniform bool uCool;
uniform bool uNormal;

in vec3 vN[]; // normal vector
in vec3 vL[]; // vector from point to light
in vec3 vE[]; // vector from point to eye
in vec4 vModel[];

out vec3 gN; // normal vector
out vec3 gL; // vector from point to light
out vec3 gE; // vector from point to eye
out float gLightIntensity;

layout( triangles )  in;
layout( triangle_strip, max_vertices=204 )  out;

float
Quantize( float f )
{
	f *= uQuantize;
	f += .5;		// round-off
	int fi = int( f );
	f = float( fi ) / uQuantize;
	return f;
}

vec3
QuantizeVec3( vec3 v )
{
	vec3 vv;
	vv.x = Quantize( v.x );
	vv.y = Quantize( v.y );
	vv.z = Quantize( v.z );
	return vv;
}

vec3 V0, V01, V02;
vec3 N0, N01, N02;
vec3 lightPos;

void
ProduceVertex( float s, float t )
{
	vec3 model = V0 + s*V01 + t*V02;
	
		vec3 tnorm;
	if (uNormal)
		tnorm = N0 + s*N01 + t*N02;
	else
		tnorm = normalize( gl_NormalMatrix * model );

	if(uCool)
		model = gl_PositionIn[0].xyz + s*gl_PositionIn[1].xyz + t*gl_PositionIn[2].xyz;

	//model = QuantizeVec3(model);
		
	vec4 ECposition;
	if (uModelCoords)
		ECposition = gl_ModelViewMatrix * vec4( QuantizeVec3(model),1);
	else
		ECposition = vec4(QuantizeVec3(vec3(gl_ModelViewMatrix * vec4(model,1)).xyz),1);
	
	gLightIntensity  = abs(  dot( normalize(lightPos - ECposition.xyz), tnorm )  );
	gl_Position = gl_ProjectionMatrix * ECposition;
	EmitVertex();

}

void
main( )
{
	lightPos = vec3(5,5,0);
	V01 = ( gl_PositionIn[1] - gl_PositionIn[0] ).xyz;
	V02 = ( gl_PositionIn[2] - gl_PositionIn[0] ).xyz;
	V0  =   gl_PositionIn[0].xyz;
	
	N01 = normalize( gl_NormalMatrix * ( gl_PositionIn[1] - gl_PositionIn[0] ).xyz);
	N02 = normalize( gl_NormalMatrix * ( gl_PositionIn[2] - gl_PositionIn[0] ).xyz);
	N0  = normalize( gl_NormalMatrix * gl_PositionIn[0].xyz);
	
	int numLayers = 1 << uLevel;
	
	float dt = 1. / float( numLayers );
	float t_top = 1.;
	
	for( int it = 0; it < numLayers; it++ )
	{
		float t_bot = t_top - dt;
		float smax_top = 1. - t_top;
		float smax_bot = 1. - t_bot;

		int nums = it + 1;
		float ds_top = smax_top / float( nums - 1 );
		float ds_bot = smax_bot / float( nums );

		float s_top = 0.;
		float s_bot = 0.;

		for( int is = 0; is < nums; is++ )
		{
			ProduceVertex( s_bot, t_bot );
			ProduceVertex( s_top, t_top );
			s_top += ds_top;
			s_bot += ds_bot;
		}

		ProduceVertex( s_bot, t_bot );
		EndPrimitive();

		t_top = t_bot;
		t_bot -= dt;
	}

    EndPrimitive();
}