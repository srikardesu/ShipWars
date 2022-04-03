class Scenery {
    constructor(scene, renderer) {
        this.water;
        this.sky;
        this.pmremGenerator;
        this.sun;
        this.init(scene, renderer);
    }

    init(scene, renderer) {
        const waterGeometry = new THREE.PlaneGeometry(10000, 10000);
        this.water = new THREE.Water(
            waterGeometry,
            {
                textureWidth: 512,
                textureHeight: 512,
                waterNormals: new THREE.TextureLoader().load('src/textures/waternormals.jpg', function (texture) {

                    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

                }),
                sunDirection: new THREE.Vector3(),
                sunColor: 0xffffff,
                waterColor: 0x001e0f,
                distortionScale: 3.7,
                fog: scene.fog !== undefined
            }
        );

        this.water.position.y -= 4;
        this.water.rotation.x = - Math.PI / 2;
        scene.add(this.water);
        // Skybox
        this.sky = new THREE.Sky();
        this.sky.scale.setScalar(10000);
        scene.add(this.sky);
        const skyUniforms = this.sky.material.uniforms;
        skyUniforms['turbidity'].value = 10;
        skyUniforms['rayleigh'].value = 2;
        skyUniforms['mieCoefficient'].value = 0.005;
        skyUniforms['mieDirectionalG'].value = 0.8;
        // sun
        this.sun = new THREE.Vector3();
        this.pmremGenerator = new THREE.PMREMGenerator(renderer);
    }

    updateSun(scene) {
        const theta = Math.PI * (-.01);
        const phi = 2 * Math.PI * (-.295);

        this.sun.x = Math.cos(phi);
        this.sun.y = Math.sin(phi) * Math.sin(theta);
        this.sun.z = Math.sin(phi) * Math.cos(theta);

        this.sky.material.uniforms['sunPosition'].value.copy(this.sun);
        this.water.material.uniforms['sunDirection'].value.copy(this.sun).normalize();
        scene.environment = this.pmremGenerator.fromScene(this.sky).texture;
    }

    updateWaves(scene) {
        this.water.material.uniforms['time'].value += 1.0 / 60.0;
    }
}