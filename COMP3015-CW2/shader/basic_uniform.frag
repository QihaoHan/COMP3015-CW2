#version 460

in vec3 Color;
layout (location = 0) out vec4 FragColor;

uniform vec3 floorColor;
uniform bool openLight;

void main() {
    vec3 result;
    if(!openLight) {
        result = floorColor * 0.2;
    }
    else {
        result = floorColor;
    }

    FragColor = vec4(result, 1.0);
}
