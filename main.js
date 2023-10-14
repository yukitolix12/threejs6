import * as THREE from "./build/three.module.js";
import { OrbitControls } from "./controls/OrbitControls.js";

//シーン
const scene = new THREE.Scene();

// カメラ
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
);
camera.position.set(1, 1, 2);

//レンダラー
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

/**
 * ジオメトリを作ってみよう
 **/
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const sphereGeometry = new THREE.SphereGeometry(0.5, 16, 32);
const torusGeometry = new THREE.TorusGeometry(0.5, 0.2, 16, 100, Math.PI * 2);
const planeGeometry = new THREE.PlaneGeometry(10, 10);

//バッファジオメトリを作成してみよう
const geometry = new THREE.BufferGeometry();

const positionArray = new Float32Array(9);

positionArray[0] = 0;
positionArray[1] = 0;
positionArray[2] = 0;

positionArray[3] = 0;
positionArray[4] = 0;
positionArray[5] = 1;

positionArray[6] = 0;
positionArray[7] = 0;
positionArray[8] = 1;

console.log(positionArray);

const positionAttribute = new THREE.BufferAttribute(positionArray, 3);

geometry.setAttribute("position", positionAttribute);

//マテリアル
const material = new THREE.MeshNormalMaterial();
//material.wireframe = true;

//メッシュ化
const box = new THREE.Mesh(boxGeometry, material);
const sphere = new THREE.Mesh(sphereGeometry, material);
const torus = new THREE.Mesh(torusGeometry, material);
const plane = new THREE.Mesh(planeGeometry, material);

const buffer = new THREE.Mesh(geometry, material);

//position
sphere.position.x = 1.5;
torus.position.x = -1.5;
plane.position.y = -0.5;
plane.rotation.x = -Math.PI * 0.5;

//scene.add(box, sphere, torus, plane);

//ライト
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

//マウス操作
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

window.addEventListener("resize", onWindowResize);

const clock = new THREE.Clock();

function animate() {
    const elapsedTime = clock.getElapsedTime();

    // console.log(elapsedTime);

  //オブジェクトの回転
  // sphere.rotation.x = elapsedTime;
  // plane.rotation.x = elapsedTime;
  // octahedron.rotation.x = elapsedTime;
  // torus.rotation.x = elapsedTime;

  // sphere.rotation.y = elapsedTime;
  // plane.rotation.y = elapsedTime;
  // octahedron.rotation.y = elapsedTime;

  // torus.rotation.y = elapsedTime;


    controls.update();

    //レンダリング
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

//ブラウザのリサイズに対応
function onWindowResize(){
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

animate();