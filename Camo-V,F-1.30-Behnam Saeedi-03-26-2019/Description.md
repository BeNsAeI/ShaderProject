#Title:
- Camo

#Author:
- Behnam Saeedi

#Date:
- 03-26-2019

#Type of the shader:
- Vertex, Fragment

#Version of GLSL needed:
- 1.30

#Uniform variables:
- uKa, uKd, uKs, uAd, uBd, uTol,uNoiseFreq,uNoiseAmp,uAlpha, uShininess
- uChromaBlue, uChromaRed, uUseChromaDepth, 
- uColor1
- uColor2
- uSpecularColor
- Noise3

#Effect of changing each Uniform variable (refrence the figures and screenshots):
- uKa, uKd, uKs, uAd, uBd, uTol,uNoiseFreq,uNoiseAmp,uAlpha, uShininess: Lighting Parameters.
- uChromaBlue, uChromaRed, uUseChromaDepth: Depth heat map, look at heat map shaders.
- uColor1: Camo color 1.
- uColor2: Camo color 2.
- uSpecularColor: specular lighting color.
- Noise3: Sampler noise generator.

#Potential use cases for the shader:
- Video games, military hardware, outfits, generation of uniform and non-uniform patterns.