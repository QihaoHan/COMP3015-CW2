# COMP3015-CW2

## System Version
 Visual Studio Version: Visual Studio 2022(17.1.0)<br/>
 Operating System Version: Windows10 Home Edition 22H2

## How to do open and control prototype
Open:<br/>
Open the file and double-click to run the Project_Template.exe file.

Control:<br/>
Move the mouse to control the turn<br/>
"W", "A", "S" and "D" control forward, left, backward and left movement respectively.<br/>
T: Turn on the light<br/>
F: Turn off the light

## How does the program work

Courework2 is based on the original Courework1 implementation of Bloom, shadow map and PBR.<br/>

Bloom: 1. Render the scene to the texture and extract the highlighted parts: bloom.vert/bloom.frag
2. blur the highlighted part with two pass Gaussian blur: blur.vert/blur.frag
3. Synthesize the highlighted part and normal scene (including the HDR Tonemapping part) : bloom_final.vert/bloom_final.frag

Shadow Map: Depth map generated: shadow_mapping_dept. vert/ shadow_mapping_dept. frag

PBR: Implementation of advanced PBR shaders in pbr.vert/pbr.frag

## Video Link
YouTube: 

## Git Repository
GitHub: https://github.com/QihaoHan/COMP3015-CW2
