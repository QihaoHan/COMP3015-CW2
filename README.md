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

Coursework2 is based on the original Coursework1 implementation of Bloom, shadow map and PBR.<br/>

Bloom: 1. Render the scene to the texture and extract the highlighted parts: bloom.vert/bloom.frag<br/>
2. blur the highlighted part with two pass Gaussian blur: blur.vert/blur.frag<br/>
3. Synthesize the highlighted part and normal scene (including the HDR Tonemapping part) : bloom_final.vert/bloom_final.frag<br/>

Shadow Map: Depth map generated: shadow_mapping_dept. vert/ shadow_mapping_dept. frag<br/>

PBR: Implementation of advanced PBR shaders in pbr.vert/pbr.frag

1. First it needs to render the entire scene into a framebuffer object, and the entire rendering result can be manipulated in the subsequent processing.

2. By extracting the bright part of the rendering result, the area where bloom effect needs to be applied can be obtained. A specific threshold value can be used to determine whether the brightness of the pixel has reached a certain requirement, and these parts with higher brightness can be extracted.

3. Gaussian blur is processed for the extracted part with high brightness, so that the surrounding pixels are smoothly mixed, thus simulating the scattering effect of light. This process can be iterated many times to enhance the blur effect.

4. Synthesize the original rendering result and the result after Gaussian blur processing to obtain the final bloom effect.

## Video Link
YouTube: https://youtu.be/FHyhOjigYQY

## Git Repository
GitHub: https://github.com/QihaoHan/COMP3015-CW2
