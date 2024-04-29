#ifndef SCENEBASIC_UNIFORM_H
#define SCENEBASIC_UNIFORM_H

#include "helper/scene.h"

#include <glad/glad.h>
#include "helper/glslprogram.h"
#include "helper/objmesh.h"

class SceneBasic_Uniform : public Scene
{
private:
    //GLuint vaoHandle;
    GLuint quadVaoHandle;
    GLSLProgram prog;
	GLSLProgram progModel;
	GLSLProgram progModelPBR;
	GLSLProgram proDepth;
	GLSLProgram proDebugQuad;
    GLSLProgram projSkybox;
    GLSLProgram shader;
    GLSLProgram shaderLight;
    GLSLProgram shaderBlur;
    GLSLProgram shaderBloomFinal;

    GLuint sVAO;
    unsigned int skyboxTexture;

    unsigned int planeVAO;
	unsigned int depthMapFBO;
	unsigned int depthMap;
	unsigned int hdrFBO;
	unsigned int pingpongFBO[2];
	unsigned int pingpongColorbuffers[2];
	unsigned int colorBuffers[2];

    const unsigned int SHADOW_WIDTH = 1024, SHADOW_HEIGHT = 1024;

    float angle;

    void compile();

    Camera myCamera;

    GLuint texVec[3];
    GLuint woodTexture;
    GLuint containerTexture;

    std::unique_ptr<TriangleMesh> pModelTable;
    std::unique_ptr<TriangleMesh> pModelPhong;

	glm::vec3 lightPositions[4] = {
    glm::vec3(-10.0f,  10.0f, 10.0f),
    glm::vec3(10.0f,  10.0f, 10.0f),
    glm::vec3(-10.0f, -10.0f, 10.0f),
    glm::vec3(10.0f, -10.0f, 10.0f),
	};

	glm::vec3 lightColors[4] = {
		glm::vec3(300.0f, 300.0f, 300.0f),
		glm::vec3(300.0f, 300.0f, 300.0f),
		glm::vec3(300.0f, 300.0f, 300.0f),
		glm::vec3(300.0f, 300.0f, 300.0f)
	};

	std::vector<glm::vec3> bloomLightPositions;
	std::vector<glm::vec3> bloomLightColors;

	bool bloom = true;
	float exposure = 1.0f;

    glm::vec3 lightPos{ -2.0f, 4.0f, -1.0f };

	glm::mat4 lightSpaceMatrix;

    void renderQuad();
    void renderCube();
    void renderScene(GLSLProgram& shader);
public:
    SceneBasic_Uniform();

    void initScene();
    void update( float t );
    void render();

    void renderScene();

    void depthPass();

	void resize(int, int);
};

#endif // SCENEBASIC_UNIFORM_H
