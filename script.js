// Create a scene
var scene = new THREE.Scene();

// Create a camera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create a renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a cylinder
var geometry = new THREE.CylinderGeometry(1, 1, 2, 32);
var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
var cylinder = new THREE.Mesh(geometry, material);
scene.add(cylinder);

// Render the scene
function animate() {
  requestAnimationFrame(animate);
  cylinder.rotation.x += 0.01;
  cylinder.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
