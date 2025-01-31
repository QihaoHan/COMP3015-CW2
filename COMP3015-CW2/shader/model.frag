

#version 460

in vec3 FragPos;
in vec3 Normal;
in vec2 TextureCoord;
in vec4 FragPosLightSpace;

layout (location = 0) out vec4 FragColor;

struct Material {
    vec3 amibent;
    vec3 diffuse;
    vec3 specular;
};

struct PointLight {
    vec3 position;	
    vec3 amibent;
    vec3 diffuse;
    vec3 specular;
};


uniform sampler2D texture1;
uniform sampler2D shadowMap;
uniform Material material;
uniform PointLight pointLights[1];
uniform vec3 viewPos;
uniform vec3 lightPos;
uniform bool openLight;

float ShadowCalculation(vec4 fragPosLightSpace)
{
    // perform perspective divide
    vec3 projCoords = fragPosLightSpace.xyz / fragPosLightSpace.w;
    // transform to [0,1] range
    projCoords = projCoords * 0.5 + 0.5;
    // get closest depth value from light's perspective (using [0,1] range fragPosLight as coords)
    float closestDepth = texture(shadowMap, projCoords.xy).r; 
    // get depth of current fragment from light's perspective
    float currentDepth = projCoords.z;
    // calculate bias (based on depth map resolution and slope)
    vec3 normal = normalize(Normal);
    vec3 lightDir = normalize(lightPos - FragPos);
    float bias = max(0.05 * (1.0 - dot(normal, lightDir)), 0.005);
    // check whether current frag pos is in shadow
    // float shadow = currentDepth - bias > closestDepth  ? 1.0 : 0.0;
    // PCF
    float shadow = 0.0;
    vec2 texelSize = 1.0 / textureSize(shadowMap, 0);
    for(int x = -1; x <= 1; ++x)
    {
        for(int y = -1; y <= 1; ++y)
        {
            float pcfDepth = texture(shadowMap, projCoords.xy + vec2(x, y) * texelSize).r; 
            shadow += currentDepth - bias > pcfDepth  ? 1.0 : 0.0;        
        }    
    }
    shadow /= 9.0;
    
    // keep the shadow at 0.0 when outside the far_plane region of the light's frustum.
    if(projCoords.z > 1.0)
        shadow = 0.0;
        
    return shadow;
}

vec3 CalcPointLight(PointLight light, vec3 normal, vec3 fragPos, vec3 viewDir)
{
    vec3 color;
    color = texture(texture1, TextureCoord).rgb;

    vec3 lightDir = normalize(light.position - fragPos);
    // diffuse shading
    float diff = max(dot(normal, lightDir), 0.0);
    // specular shading
    vec3 reflectDir = reflect(-lightDir, normal);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32.f);
    // combine results
    vec3 amibent = light.amibent * color * material.amibent;
    vec3 diffuse = light.diffuse * diff * color * material.diffuse;
    vec3 specular = light.specular * spec * material.specular;

    vec3 result;
    if(!openLight) {
        result = amibent;
    }
    else {
        result = amibent + diffuse + specular;
    }
    return result;
}


void main() {
    // properties
    vec3 norm = normalize(Normal);
    vec3 viewDir = normalize(viewPos - FragPos);
    
    vec3 result = vec3(0.f);
    for(int i = 0; i < 1; i++)
        result += CalcPointLight(pointLights[i], norm, FragPos, viewDir);

    float shadow = ShadowCalculation(FragPosLightSpace);

    FragColor = vec4(result * (1.0 - shadow), 1.0);
}
