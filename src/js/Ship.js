class Ship {
    constructor(scene) {
        this.dist = 0;
        this.score = 0;
        this.treasurechests = 0;
        this.health = 100;
        this.time = 40;
        this.x = 0;
        this.y = 0;
        this.z = -1;
        this.VELOCITY = 0.1;
        this.init(scene);
    }
    init(scene) {
        var objloader = new THREE.GLTFLoader();
        objloader.load("src/js/models/scene.gltf", (obj) => {
            obj.scene.scale.set(.01, .01, .01);
            obj.scene.rotation.y += Math.PI;
            obj.scene.position.z = -1;
            this.z = -1;
            this.obj = obj.scene;
            scene.add(obj.scene);
        });
    }
    updatepos(x, y, z) {
        this.x = x; this.y = y; this.z = z;
    }
}