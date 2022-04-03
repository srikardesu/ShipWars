class Stars {
    constructor(scene, x, y, z) {
        this.init(scene, x, y, z);
    }
    init(scene, x, y, z) {
        var objloader = new THREE.GLTFLoader();
        objloader.load("src/js/models/star.glb", (obj) => {
            obj.scene.scale.set(.2, .2, .2);
            obj.scene.position.x = x;
            obj.scene.position.z = z;
            obj.scene.position.y = y;
            this.obj = obj.scene;
            scene.add(obj.scene);
        });
    }
    updatepos(x, y, z) {
        this.x = x; this.y = y; this.z = z;
    }
}