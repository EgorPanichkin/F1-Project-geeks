import * as THREE from 'three';
import { GLTFLoader } from 'GLTFLoader';
import { OrbitControls } from 'OrbitControls';

const modelBlock = document.querySelector('.main__inner-left')

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 35, 1200 / 600, 0.1, 1000 );


const renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
renderer.setClearColor( 0xffffff, 0)
renderer.setSize(1200, 550);
modelBlock.appendChild( renderer.domElement );

// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

// const controls = new OrbitControls(camera, renderer.domElement)
// controls.addEventListener('change', () => {renderer.render(scene, camera)})

camera.position.z = 275
camera.position.y = 75
camera.position.x = 0.75
camera.rotation.x = -0.2
camera.rotation.y = -0.05


const loader = new GLTFLoader()
let obj = null

loader.load('../models/scene.gltf', function(gltf) {
  obj = gltf
  scene.add(obj.scene)
})

const aLight = new THREE.PointLight(0x404040, 5)
aLight.position.set(2, 3, -2)
scene.add( aLight )
const bLight = new THREE.PointLight(0x404040, 5)
bLight.position.set(-1, -1, 1)
scene.add( bLight )
const cLight = new THREE.AmbientLight(0xffffff, 5)
cLight.position.set(5, 2, 6)
scene.add(cLight)

// const Helper1 = new THREE.PointLightHelper(bLight)
// const Helper2 = new THREE.PointLightHelper(aLight)
// const Helper3 = new THREE.AmbientLightProbe(cLight)
// scene.add(Helper1)
// scene.add(Helper2)
// scene.add(Helper3)

function animate() {
  requestAnimationFrame( animate );
  obj.scene.rotation.y += 0.01
  renderer.render( scene, camera );
}
animate();