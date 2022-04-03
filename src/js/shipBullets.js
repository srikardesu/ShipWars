class ShipBullets {
    constructor(scene, x, y, z) {
        this.VELOCITY = -1.3;
        this.dist = 0;
        this.firedScore = 10;
        this.x = x, this.y = y, this.z;
        this.init(scene, x, y, z);
    }

    init(scene, x, y, z) {
        var loader = new THREE.GLTFLoader();
        loader.load("src/js/models/enemyBullet.glb", (obj) => {
            obj.scene.scale.set(0.1, 0.1, 0.1);
            obj.scene.position.x = x;
            obj.scene.position.y = y;
            obj.scene.position.z = z;
            this.x = x; this.y = y; this.z = z;
            this.obj = obj.scene;
            scene.add(obj.scene);
        });
    }
}