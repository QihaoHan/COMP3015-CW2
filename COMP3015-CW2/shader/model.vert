#version 460

layout (location = 0) in vec3 VertexPosition;
layout (location = 1) in vec3 VertexNormal;
layout (location = 2) in vec2 VertexTexcoord;

out vec3 FragPos;
out vec3 Normal;
out vec2 TextureCoord;
out vec4 FragPosLightSpace;

uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;
uniform mat4 lightSpaceMatrix;

void main()
{
    FragPos = vec3(model * vec4(VertexPosition, 1.0));
    Normal = mat3(transpose(inverse(model))) * VertexNormal;  
	TextureCoord = VertexTexcoord;
    FragPosLightSpace = lightSpaceMatrix * vec4(FragPos, 1.0);
	gl_Position = projection * view * model * vec4(VertexPosition, 1.0f);
}
