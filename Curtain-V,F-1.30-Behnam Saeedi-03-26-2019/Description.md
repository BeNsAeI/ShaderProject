#Title:
- Curtain

#Author:
- Behnam Saeedi

#Date:
- 03-26-2019

#Type of the shader:
- Vertex, Fragment

#Version of GLSL needed:
- 1.30

#Uniform variables:
- uK,uP,uY,uLightX,uLightY,uLightZ,uKa, uKd, uKs,uNoiseFreq,uNoiseAmp, uShininess
- uColor
- uSpecularColor
- Noise3

#Effect of changing each Uniform variable (refrence the figures and screenshots):
- uK,uP,uY,uLightX,uLightY,uLightZ,uKa, uKd, uKs,uNoiseFreq,uNoiseAmp, uShininess: Lighting Parameters.
- uColor: Color of the Curtain.
- uSpecularColor: Specular lighting olor.
- Noise3: Noise used for bumpmapping and the sampler.

#Potential use cases for the shader:
- Fast GPU computer Curtain for video games, house design, etc