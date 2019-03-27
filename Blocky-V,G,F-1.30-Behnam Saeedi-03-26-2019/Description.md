#Title:
- Blocky

#Author:
- Behnam Saeedi

#Date:
- 03-26-2019

#Type of the shader:
- Vertex
- Geometry
- Fragment

#Version of GLSL needed:
- 1.30

#Uniform variables:
- uLevel
- uQuantize
- uModelCoords
- uCool
- uNormal
- uColor

#Effect of changing each Uniform variable (refrence the figures and screenshots):
- uLevel: Increase the detail of the each block.
- uQuantize: Changes the number of blocks used.
- uModelCoords: Switches between world and model coordinates.
- uCool: Adds a variable to displace each block and creates a spiky effect.
- uNormal: switches between per block or per model normal for lighting.
- uColor: Changes the color of the model.

#Potential use cases for the shader:
- Could be an 8-bit shader in a video game as a power up or effect.