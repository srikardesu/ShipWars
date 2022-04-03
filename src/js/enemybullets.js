class EnemyBullets {
    constructor(scene, x, y, z) {
        this.VELOCITY = 0.1;
        this.healthChange = -2;
        this.x = x, this.y = y, this.z = z;
        this.initRenderData(scene, x, y, z);
    }

    initRenderData(scene, x, y, z) {
        var loader = new THREE.GLTFLoader();
        loader.load("src/js/models/bullet.glb", (obj) => {
            obj.scene.scale.set(0.1, 0.1, 0.1);
            obj.scene.position.x = x;
            obj.scene.position.y = y;
            obj.scene.position.z = z;
            obj.scene.rotation.y += Math.PI;
            this.x = x, this.y = y; this.z = z;
            this.obj = obj.scene;
            scene.add(obj.scene);
        });
    }
}