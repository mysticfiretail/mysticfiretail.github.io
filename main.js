import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
document.body.appendChild( renderer.domElement );

scene.background = new THREE.Color(0xB997F4);
const orbit = new OrbitControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );
//plane.recieveshadow = true;
cube.castShadow = true;
const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const cubeId = cube.id;
cube.name = 'cube';

const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8);
scene.add(directionalLight);
directionalLight.position.set(0,15,20);
directionalLight.castShadow = true;

const dLightHelper = new THREE.DirectionalLightHelper(directionalLight);
scene.add(dLightHelper);

camera.position.set(0,2,5);
orbit.update();

let step =0;

const mousePosition = new THREE.Vector2();

window.addEventListener('mousemove', function(e){
	mousePosition.x = (e.clientX / window.innerWidth) * 2 -1;
	mousePosition.y = -(e.clientY / window.innerHeight) * 2 +1;
});

const rayCaster = new THREE.Raycaster();

function animate(time){
	rayCaster.setFromCamera(mousePosition,camera);
	const intersects = rayCaster.intersectObjects(scene.children);
	console.log(intersects);

	for(let i =0; i<intersects.length; i++){
		if(intersects[i].object.name === 'cube'){
			intersects[i].object.rotation.x = time /1000;
			intersects[i].object.rotation.y = time /1000;
		}
	}

	renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);


