class Ship2 {
    constructor(scene, x, y, z, x_, y_, z_, type) {
        this.dist = 0;
        this.score = 0;
        this.health = 100;
        this.time = 50;
        this.x = 0;
        this.y = 0;
        this.z = -1;
        this.vel_x = 0.1;
        this.vel_z = 0.5;
        this.VELOCITY = 1;
        this.threshold = 30;
        this.interval = 0;
        this.init(scene, x, y, z, x_, y_, z_, type);
    }
    init(scene, x, y, z, x_, y_, z_, type) {
        // console.log('ship moment')
        if (type == 1) {
            this.vel_x *= -1;
            this.vel_z *= -1;
        }
        var loader = new THREE.GLTFLoader();
        loader.load("src/js/models/enemy.glb", (obj) => {
            obj.scene.scale.set(.2, .2, .2);
            obj.scene.rotation.y += Math.PI;
            obj.scene.position.z = z;
            obj.scene.position.y = y;
            obj.scene.position.x = x;
            var pt = new THREE.Vector3(x_, y_, z_);
            obj.scene.lookAt(pt);
            this.x = x, this.y = y, this.z = z;
            this.obj = obj.scene;
            console.log(obj.scene.position);
            scene.add(obj.scene);
        });
    }
    updatepos(x, y, z) {
        this.x = x; this.y = y; this.z = z;
    }
    keeplooking(x, y, z) {
        var pt = new THREE.Vector3(x, y, z);
        this.lookAt(pt);
    }
}