#version 460

layout (location = 0) in vec3 VertexPosition;

out vec3 TextureCoord;

uniform mat4 view;
uniform mat4 projection;


void main()
{
	TextureCoord = VertexPosition;
	vec4 pos = projection * view  * vec4(VertexPosition, 1.0f);
	gl_Position = pos.xyww;
}
