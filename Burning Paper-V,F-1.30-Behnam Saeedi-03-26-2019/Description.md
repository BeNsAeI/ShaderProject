#Title:
- Burning Paper

#Author:
- Behnam Saeedi

#Date: MM-DD-YYYY:
- 03-26-2019

#Type of the shader:
- Vertex
- Fragment

#Version of GLSL needed:
- 1.30

#Uniform variables:
- uX,uY,uZ
- uKa, uKd, uKs,uAd,uBd,uNoiseFreq,uNoiseAmp,uTime,uDelta, uShininess
- Noise3
- uColor1
- uColor2
- uSpecularColor

#Effect of changing each Uniform variable (refrence the figures and screenshots):
- uX,uY,uZ: Vertex movement parameters
- uKa, uKd, uKs,uAd,uBd,uNoiseFreq,uNoiseAmp,uTime,uDelta, uShininess: Lighting parameters.
- Noise3: Loads the noise needed for samplers.
- uColor1: First color for camo pattern.
- uColor2: Second color for camo pattern.
- uSpecularColor: Lighting color.

#Potential use cases for the shader:
- Burning paper, fabric, wreckage, wood, match, thin flamable material, etc.