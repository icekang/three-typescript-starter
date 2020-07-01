// add styles
import "./style.css";
// three.js
import * as THREE from "three";
const innerWidth = window.innerWidth;
const innerHeight = document.documentElement.clientHeight;
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);
// const innerHeight = ;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  50,
  innerWidth / innerHeight,
  0.1,
  1000
);

camera.position.z = 15;
let cameraX = 0;
let cameraY = 0;
const mouseMoveNormalizer = 3500;
camera.lookAt(cameraX, cameraY, 5);
var renderer = new THREE.WebGLRenderer();

renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();

let prevX;
let prevY;
const moveCamera = (ev: MouseEvent) => {
  cameraX = cameraX + (ev.clientX - prevX) / mouseMoveNormalizer;
  cameraY = cameraY + (prevY - ev.clientY) / mouseMoveNormalizer;
  camera.lookAt(cameraX, cameraY, 0);
};
const addMouseMoveListener = (ev: MouseEvent) => {
  prevX = ev.clientX;
  prevY = ev.clientY;

  document.body.addEventListener("mousemove", moveCamera);
};
const removeMouseMoveListener = (ev: MouseEvent) => {
  document.body.removeEventListener("mousemove", moveCamera);
};

document.body.addEventListener("mousedown", addMouseMoveListener);
document.body.addEventListener("mouseup", removeMouseMoveListener);

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
