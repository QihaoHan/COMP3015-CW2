#version 330 core
out vec4 FragColor;

in vec3 TextureCoord;

uniform samplerCube skyboxTex;

void main()
{    
    FragColor = texture(skyboxTex, TextureCoord);
}