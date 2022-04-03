var ship, camera, d, initz, initx, justaboveship, shipbullet;

var enemy = [], enemyBullets = [], shipBullets = [], blast = [], stars = [];
let flag = 0;
var starttime;
main();

function onKeyPress(event) {
    var keyCode = event.which;
    if (keyCode == 38) { // up

        // ship.obj.position.z -= ship.VELOCITY;
        // camera.position.z -= ship.VELOCITY;
        let direction = new THREE.Vector3;
        let shipup = new THREE.Vector3;
        let cam = new THREE.Vector3;
        shipup.x = ship.obj.position.x;
        shipup.y = 0;
        shipup.z = ship.obj.position.z;
        cam.x = -camera.position.x;
        cam.y = 0;
        cam.z = -camera.position.z;
        console.log(camera.position);
        console.log(ship.obj.position);
        let speed = 1;
        direction.addVectors(shipup, cam);
        direction.normalize();
        camera.position.addScaledVector(direction, speed);
        ship.obj.position.addScaledVector(direction, speed);
        ship.updatepos(ship.obj.position.x, ship.obj.position.y, ship.obj.position.z);
        ship.dist += 1;
    } else if (keyCode == 40) { // down
        const direction = new THREE.Vector3;
        const shipup = new THREE.Vector3;
        const cam = new THREE.Vector3
        shipup.x = -ship.obj.position.x;
        shipup.y = 0;
        shipup.z = -ship.obj.position.z;
        cam.x = camera.position.x;
        cam.y = 0;
        cam.z = camera.position.z;
        let speed = 1;
        direction.addVectors(shipup, cam);
        direction.normalize();
        camera.position.addScaledVector(direction, speed);
        ship.obj.position.addScaledVector(direction, speed);
        ship.updatepos(ship.obj.position.x, ship.obj.position.y, ship.obj.position.z);
    } else if (keyCode == 37) { // left
        var y = camera.position.y;
        camera.position.y = 0;
        let justaboveship = new THREE.Vector3;
        justaboveship.y = camera.position.y;
        justaboveship.x = ship.obj.position.x;
        justaboveship.z = ship.obj.position.z;
        /// step 1: calculate move direction and move distance:
        let moveDir = new THREE.Vector3(
            justaboveship.x - camera.position.x,
            justaboveship.y - camera.position.y,
            justaboveship.z - camera.position.z
        );
        moveDir.normalize();
        let moveDist = camera.position.distanceTo(justaboveship);
        console.log(moveDist);
        console.log(moveDir);
        /// step 2: move camera to anchor point
        console.log(camera.position);
        // camera.translateOnAxis(moveDir, moveDist);
        camera.translateZ(-moveDist);
        console.log(justaboveship)
        console.log(camera.position);
        /// step 3: rotate camera
        camera.rotateY(0.1);
        ship.obj.rotation.y += 0.1;
        /// step4: move camera along the opposite direction
        moveDir.multiplyScalar(-1);
        // camera.translateOnAxis(moveDir, moveDist);
        camera.translateZ(moveDist);
        camera.position.y = y;
        // if (flag == 0)
        //     camera.position.y = 5;
        // else
        //     camera.position.y = 50;
        console.log(camera.position);
        console.log((camera.position.x - justaboveship.x) * (camera.position.x - justaboveship.x) + (camera.position.z - justaboveship.z) * (camera.position.z - justaboveship.z))
        console.log(camera.rotation.y)

        // camera.position.set(newpos.x, newpos.y, newpos.z);
    } else if (keyCode == 39) { // right
        var y = camera.position.y;
        camera.position.y = 0;
        let justaboveship = new THREE.Vector3;
        justaboveship.y = camera.position.y;
        justaboveship.x = ship.obj.position.x;
        justaboveship.z = ship.obj.position.z;
        /// step 1: calculate move direction and move distance:
        let moveDir = new THREE.Vector3(
            justaboveship.x - camera.position.x,
            justaboveship.y - camera.position.y,
            justaboveship.z - camera.position.z
        );
        moveDir.normalize();
        let moveDist = camera.position.distanceTo(justaboveship);
        console.log(moveDist);
        console.log(moveDir);
        /// step 2: move camera to anchor point
        console.log(camera.position);
        // camera.translateOnAxis(moveDir, moveDist);
        camera.translateZ(-moveDist);
        console.log(justaboveship)
        console.log(camera.position);
        /// step 3: rotate camera
        camera.rotateY(-0.1);
        ship.obj.rotation.y -= 0.1;
        /// step4: move camera along the opposite direction
        moveDir.multiplyScalar(-1);
        // camera.translateOnAxis(moveDir, moveDist);
        camera.translateZ(moveDist);
        camera.position.y = y;
        // if (flag == 0)
        //     camera.position.y = 5;
        // else
        //     camera.position.y = 50;
        console.log(camera.position);
        console.log((camera.position.x - justaboveship.x) * (camera.position.x - justaboveship.x) + (camera.position.z - justaboveship.z) * (camera.position.z - justaboveship.z))
        console.log(camera.rotation.y)

        // camera.position.set(newpos.x, newpos.y, newpos.z);
    } else if (keyCode == 84) {            // T
        let birdseye = new THREE.Vector3;
        birdseye.x = camera.position.x;
        birdseye.y = 50;
        birdseye.z = camera.position.z;
        camera.position.set(birdseye.x, birdseye.y, birdseye.z);
    } else if (keyCode == 79) {            // O
        let birdseye = new THREE.Vector3;
        birdseye.x = camera.position.x;
        birdseye.y = 5;
        birdseye.z = camera.position.z;
        camera.position.set(birdseye.x, birdseye.y, birdseye.z);
    } else if (keyCode == 32) {
        var shipbullet = new ShipBullets(scene, ship.obj.position.x, ship.obj.position.y, ship.obj.position.z);
        this.shipBullets.push(shipbullet);
    }
};

function movetowards(object, x) {
    let direction = new THREE.Vector3;
    let shipup = new THREE.Vector3;
    let cam = new THREE.Vector3;
    shipup.x = object.position.x;
    shipup.y = 0;
    shipup.z = object.position.z;
    cam.x = -ship.obj.position.x;
    cam.y = 0;
    cam.z = -ship.obj.position.z;
    let speed = x;
    direction.addVectors(shipup, cam);
    direction.normalize();
    object.position.addScaledVector(direction, -speed);
}

function movetowards2(object, x, spid) {
    let direction = new THREE.Vector3;
    let shipup = new THREE.Vector3(0, 0, 0);
    let cam = new THREE.Vector3;
    cam = x;
    let speed = spid;
    direction.addVectors(shipup, cam);
    direction.normalize();
    object.position.addScaledVector(direction, speed);
}

function removeobjects() {
    for (var enemies of this.enemy) {
        if (enemies.z > camera.position.z) {
            scene.remove(enemies.obj);
        }
    }
    for (var bullets of this.enemyBullets) {
        if (bullets.z > camera.position.z) {
            scene.remove(bullets.obj);
        }
    }
    for (var bullets of this.enemyBullets) {
        if (bullets.z < camera.position.z - 100) {
            scene.remove(bullets.obj);
        }
    }
}

function enemies() {
    var posx = ship.obj.position.x - 30 * Math.cos(Math.random() * 4 * (Math.PI / 2));
    var posz = ship.obj.position.z - 100 * Math.sin(Math.random() * 2 * Math.PI);
    var posx_ = ship.obj.position.x + 30 * Math.cos(Math.random() * 4 * (Math.PI / 2));
    var posz_ = ship.obj.position.z - 100 * Math.sin(Math.random() * 2 * Math.PI);
    var posx__ = ship.obj.position.x - 30 * Math.cos(Math.random() * 4 * (Math.PI / 2));
    var posz__ = ship.obj.position.z + 100 * Math.sin(Math.random() * 2 * Math.PI);
    var posx___ = ship.obj.position.x + 30 * Math.cos(Math.random() * 4 * (Math.PI / 2));
    var posz___ = ship.obj.position.z + 100 * Math.sin(Math.random() * 2 * Math.PI);
    var x = posx;
    var z = posz;
    var x_ = posx_;
    var z_ = posz_;
    var x__ = posx__;
    var z__ = posz__;
    var x___ = posx___;
    var z___ = posz___;
    var y = ship.obj.position.y;
    var offset = 10;
    numEnemies = 8;
    console.log(x, ship.obj.position.x);
    console.log(x_, ship.obj.position.x);
    for (i = 0; i < numEnemies / 4; i++) {
        enemy.push(new Ship2(scene, x - i * offset, y, z - i * offset, ship.x, ship.y, ship.z, 0));
    }
    for (i = 0; i < numEnemies / 4; i++) {
        enemy.push(new Ship2(scene, x_ + i * offset, y, z_ - i * offset, ship.x, ship.y, ship.z, 1));
    }
    for (i = 0; i < numEnemies / 4; i++) {
        enemy.push(new Ship2(scene, x__ + i * offset, y, z__ - i * offset, ship.x, ship.y, ship.z, 1));
    }
    for (i = 0; i < numEnemies / 4; i++) {
        enemy.push(new Ship2(scene, x___ + i * offset, y, z___ - i * offset, ship.x, ship.y, ship.z, 1));
    }
    ship.dist = 0;
}

function starspawn() {
    var posx = ship.obj.position.x, deltaX = 10;
    var posz = ship.obj.position.z - 50, deltaZ = 30;
    var x = posx - deltaX + Math.random() * (deltaX);
    var z = posz - deltaZ + Math.random() * (deltaZ);
    var y = ship.obj.position.y;
    var offset = 10;
    numstars = 2;
    // console.log(x, ship.obj.position.x);
    for (i = 0; i < numstars; i++) {
        this.stars.push(new Stars(scene, x - i * offset, y, z - i * offset));
    }
}

function touching(obj1, obj2) {
    if (obj1.position.distanceTo(obj2.position) < 2) {
        return true;
    }
    else {
        return false;
    }
}

function checkcollision() {
    var updatedEnemies = []
    for (var enemies of this.enemy) {
        if (enemies.obj) {
            if (touching(ship.obj, enemies.obj)) {
                ship.health -= 20;
                scene.remove(enemies.obj);
            }
            else updatedEnemies.push(enemies);
        }
        else updatedEnemies.push(enemies);
    }
    enemy = updatedEnemies;

    var updatedEnemyBullets = []
    for (var bullets of this.enemyBullets) {
        if (bullets.obj) {
            if (touching(ship.obj, bullets.obj)) {
                ship.health -= 8;
                scene.remove(bullets.obj);
            }
            else updatedEnemyBullets.push(bullets);
        }
        else updatedEnemyBullets.push(bullets);
    }
    enemyBullets = updatedEnemyBullets;

    updatedBullets = [];
    for (var bullet of this.shipBullets) {
        if (bullet.obj) {
            flag = 0
            updatedEnemies = [];
            for (const enemies of this.enemy) {
                if (enemies.obj) {
                    if (touching(bullet.obj, enemies.obj)) {
                        scene.remove(enemies.obj);
                        flag = 1;
                    }
                    else updatedEnemies.push(enemies);
                }
                else updatedEnemies.push(enemies);
            }
            enemy = updatedEnemies;
            if (flag) {
                ship.score += bullet.firedScore;
                scene.remove(bullet.obj);
            }
            else updatedBullets.push(bullet);
        }
        else updatedBullets.push(bullet);
    }
    shipBullets = updatedBullets;
    updatedstars = [];
    for (var star of this.stars) {
        if (star.obj) {
            if (touching(ship.obj, star.obj)) {
                ship.score += 5;
                scene.remove(star.obj);
            }
            else updatedstars.push(star);
        }
        else updatedstars.push(star);
    }
    stars = updatedstars;
}

function enemybullets() {
    for (const enemies of this.enemy) {
        if (enemies.obj) {
            if (enemies.interval >= enemies.threshold) {
                if (Math.random() <= 0.01) {
                    var ob = new EnemyBullets(scene, enemies.obj.position.x, enemies.obj.position.y, enemies.obj.position.z);
                    this.enemyBullets.push(ob);
                }
                enemies.interval = 0;
            }
            else enemies.interval += 1;
        }
    }
}

function moveObjects() {
    for (const enemies of this.enemy) {
        if (enemies.obj) {
            movetowards(enemies.obj, 0.1);
        }
    }
    for (const bullets of this.enemyBullets) {
        if (bullets.obj) {
            movetowards(bullets.obj, 0.2);
        }
    }
    for (const bullets of this.shipBullets) {
        if (bullets.obj) {
            let dir = new THREE.Vector3;
            ship.obj.getWorldDirection(dir);
            console.log(dir);
            movetowards2(bullets.obj, dir, 0.6);
        }
    }
}

function scoreboard() {
    document.getElementById("score").innerHTML = "Score: " + ship.score;
    document.getElementById("health").innerHTML = "Health: " + Math.max(ship.health, 0);
    document.getElementById("time").innerHTML = "Time Left: " + ship.time;
}

function sleep(miliseconds) {
    var currentTime = new Date().getTime();

    while (currentTime + miliseconds >= new Date().getTime()) {
    }
}

function sinkingship() {
    for (let i = 0; i < 1000; i++) {
        ship.obj.position.y -= 0.001;
        camera.position.z -= 0.0001;
    }
}

function animate() {
    var pt = new THREE.Vector3(ship.x, ship.y, ship.z);
    camera.lookAt(pt);
}


function main() {
    starttime = Date.now();
    scene = new THREE.Scene();
    var Light = new THREE.DirectionalLight(0x404040, 10);
    scene.add(Light);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 20000);
    d = 3

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    document.body.appendChild(renderer.domElement);

    window.addEventListener('resize', function () {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    })

    camera.position.set(0, 5, 8);

    // const listener = new THREE.AudioListener();
    // camera.add(listener);

    // // create a global audio source
    // const sound = new THREE.Audio(listener);

    // // load a sound and set it as the Audio object's buffer
    // const audioLoader = new THREE.AudioLoader();
    // audioLoader.load('src/js/assets/sounds/example.mp3', function (buffer) {
    //     sound.setBuffer(buffer);
    //     sound.setLoop(true);
    //     sound.setVolume(0.5);
    //     sound.play();
    //     // getAudioContext().resume();
    // });

    scenery = new Scenery(scene, renderer);
    scenery.updateSun(scene);

    ship = new Ship(scene);
    // d = ship.obj.position.z - camera.position.z;



    window.addEventListener('keydown', onKeyPress, false);
    var render = function () {
        scenery.updateWaves(scene);
        renderer.render(scene, camera);
    }

    var game = function () {
        removeobjects();
        if (ship.dist >= 50) {
            starspawn();
            enemies();
            ship.dist = 0;
        }
        if (Date.now() - starttime >= 1000) {
            ship.time = ship.time - 1;
            starttime = Date.now();
        }
        if (ship.health <= 0) {
            ship.health = 0;
            sinkingship();
            document.getElementById("over").innerHTML = "Game Over!";
            return;
        }
        if (ship.time <= 0) {
            ship.time = 0;
            scoreboard();
            sinkingship();
            document.getElementById("over").innerHTML = "You Survived!";
            return;
        }

        moveObjects();
        enemybullets();
        checkcollision();
        scoreboard();
    }

    var GameLoop = function () {
        game();
        animate();
        render();
        requestAnimationFrame(GameLoop);
    };

    GameLoop();
}