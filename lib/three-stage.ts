import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/addons/libs/meshopt_decoder.module.js";

// Renderer, scene, camera and lighting shared by every molecule viewer,
// so all models on the site are lit the same way. The rim light defaults to
// a cool white; the hero passes red to match hemoglobin. Viewers that only
// draw on demand pass keepFrame so the last frame stays on screen.
export function createStage(
  container: HTMLElement,
  { rimColor = 0xdff4f6, keepFrame = false } = {},
) {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    preserveDrawingBuffer: keepFrame,
  });
  // 1.5× is sharp enough for molecules and draws far fewer pixels than 2–3×
  // on retina laptops and phones.
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envMap = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envMap;
  scene.environmentIntensity = 0.6;

  const camera = new THREE.PerspectiveCamera(30, 1, 0.01, 100);

  const key = new THREE.DirectionalLight(0xffffff, 2.2);
  key.position.set(2, 3, 4);
  const rim = new THREE.DirectionalLight(rimColor, 3);
  rim.position.set(-3, 1, -3);
  scene.add(key, rim, new THREE.AmbientLight(0xffffff, 0.25));

  function dispose() {
    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.geometry.dispose();
        const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
        mats.forEach((m) => m.dispose());
      }
    });
    envMap.dispose();
    pmrem.dispose();
    renderer.dispose();
    // Release the WebGL context now rather than waiting for garbage
    // collection; browsers only allow a handful at once.
    renderer.forceContextLoss();
    renderer.domElement.remove();
  }

  return { renderer, scene, camera, dispose };
}

// Moves a loaded model so its bounding sphere is centred on the origin.
export function centreModel(model: THREE.Object3D) {
  const sphere = new THREE.Box3()
    .setFromObject(model)
    .getBoundingSphere(new THREE.Sphere());
  model.position.sub(sphere.center);
  return sphere.radius;
}

// GLTF loader that can also read meshopt-compressed models (the protein
// models in public/models are compressed this way to keep downloads small).
export function createLoader() {
  return new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
}
