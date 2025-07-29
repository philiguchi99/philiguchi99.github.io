
import * as THREE from './libs/three.module.js';
import { GLTFLoader } from './libs/GLTFLoader.js';

const container = document.getElementById('canvas-container');
const avatarSelector = document.getElementById('avatar-selector');

let scene, camera, renderer, loader, avatar, controls;

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 1.5, 3);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    loader = new GLTFLoader();
    loadAvatar(avatarSelector.value);

    const light = new THREE.HemisphereLight(0xffffff, 0x444444);
    light.position.set(0, 20, 0);
    scene.add(light);

    animate();
}

function loadAvatar(modelName) {
    if (avatar) {
        scene.remove(avatar);
    }
    loader.load(`assets/avatars/${modelName}`, gltf => {
        avatar = gltf.scene;
        avatar.position.y = 0;
        scene.add(avatar);
    });
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

avatarSelector.addEventListener('change', () => {
    loadAvatar(avatarSelector.value);
});

init();
