import * as THREE from '../jsm/three.module.js';
import { OrbitControls }from './jsm/OrbitControls.js';
import * as CANNON from '../jsm/cannon-es.js';
import CannonDebugRenderer from "./jsm/CannonDebugRenderer.js";
import { GLTFLoader } from "./jsm/GLTFLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1,/*150*/130);
const renderer = new THREE.WebGLRenderer({
  antialias: false,
  powerPreference: "high-performance"
/*  antialias:true,
  alpha: true,
 premultipliedAlpha: false,
powerPreference: "low-power"
*/
});

/*
const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({
  canvas,
  //alpha: true,
  //premultipliedAlpha: false,
  antialias: true
});
*/

renderer.setPixelRatio(window.devicePixelRatio);


renderer.setSize(window.innerWidth, window.innerHeight);



//____L

document.body.appendChild(renderer.domElement);
renderer.setClearColor('lightblue');
//===================================

var light = new THREE.AmbientLight(0xffffff,1);
scene.add(light);

var light1 = new THREE.PointLight(0xffffff, 0.1);
//scene.add(light1);
  

const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
//hemiLight.position.set(0, 20, 0);
//scene.add(hemiLight);

// ☀ Directional Light (sun light + shadow)
const dirLight = new THREE.DirectionalLight(0xffffff, 1);

//scene.add(dirLight);




  
//_______map______ 
  /*
var geometry = new THREE.BoxGeometry(2000,1,2000); 
 
  var material = new THREE.MeshBasicMaterial( 
  { 
  map: new THREE.TextureLoader().load('./pmap.jpg')
  }); 
 
  var mesh = new THREE.Mesh(geometry, material); 
  mesh.position.set(-80,-20,330); 
  mesh.rotation.y = 2/1;
  scene.add(mesh); 
   
  */
  
  
  
//_____end map____
  
  
  
  
  
  
  






//======================================
const world = new CANNON.World({
  gravity: new CANNON.Vec3(0, -9.82, 0),
});
const cannonDebugRenderer = new CannonDebugRenderer(scene, world);
//______________________________


//_____ car box
var geometry = new THREE.BoxGeometry(6, 1, 2); 
var material = new THREE.MeshBasicMaterial({ 
   color:'gray'
}); 

var mesh = new THREE.Mesh(geometry, material); 
scene.add(mesh); 
//________one
//4, 0.5, 1
var geometry = new THREE.BoxGeometry(6, 1, 2); 
var material = new THREE.MeshBasicMaterial({ 
   color:'gray'
}); 

var mesh1 = new THREE.Mesh(geometry, material); 
scene.add(mesh1); 



//__________________
  var geometry = new THREE.BoxGeometry(1, 1,1); 
var material = new THREE.MeshBasicMaterial({ 
   color: 'gray'
}); 
  var meshCamera = new THREE.Mesh(geometry, material);
  
  scene.add(meshCamera); 
meshCamera.visible=false;









//________________________________
//.        Car body 
let chassisBody,chassisShape;

const chassisShape1 = new CANNON.Box(new CANNON.Vec3(1.7, 0.5, 1));
 chassisShape = new CANNON.Box(new CANNON.Vec3(3, 0.5, 1))
 
 chassisBody = new CANNON.Body({ mass: 150
 })

 const chassisBody1 = new CANNON.Body({ mass: 150 })


chassisBody.addShape(chassisShape)
chassisBody.addShape(chassisShape1)
chassisBody1.addShape(chassisShape1)
//ArnalA
chassisBody.position.set(69,0,450)

 //chassisBody.position.set(-1.1,5,0.7);


chassisBody.angularVelocity.set(0,0.5, 0)
world.addBody(chassisBody)




//_____________TWOA____________
const chassisBody2 = new CANNON.Body({ mass: 150 });
chassisBody2.addShape(new CANNON.Box(new CANNON.Vec3(3, 0.5, 1)));
chassisBody2.position.set(5, 5, -0)
world.addBody(chassisBody2);




//______________________________
const vehicle = new CANNON.RaycastVehicle({
  chassisBody,
})


const vehicle1 = new CANNON.RigidVehicle({
  chassisBody,chassisBody1
})
    
 const vehicle2 = new CANNON.RaycastVehicle({
  chassisBody: chassisBody2,
});   
    
const pivotA = new CANNON.Vec3(3.7,0.2, 0); // Local pivot on box1
const pivotB = new CANNON.Vec3(-3.8, 0, 0); // Local pivot on box2

// Create the joint
const joint = new CANNON.PointToPointConstraint(chassisBody, pivotA, chassisBody2, pivotB);

// Add to world
//world.addConstraint(joint);

   
   
   
   
   
   
      

const mass =1;
const mass1 = 0;
const axixWhidth = 5;
const wheelA =new CANNON.Box(new CANNON.Vec3(1,0.5,1));
const wheelB =new CANNON.Box(new CANNON.Vec3(1,0.5,0.5));
const wheelMaterial1 = new CANNON.Material('ground');
const down = new CANNON.Vec3(0,-1,0);


let wheelBodyA1,wheelBodyA2,wheelBodyA3;
wheelBodyA1 = new CANNON.Body({
  mass,
  wheelMaterial1,
});
wheelBodyA1 = new CANNON.Body({ mass: 60 });
wheelBodyA1.addShape(wheelA);
vehicle1.addWheel({
  body:wheelBodyA1,
  position:new CANNON.Vec3(-0.5,1.2,0),
  axis: new CANNON.Vec3(0,0,0),
  direction:down
})
wheelBodyA1.angularFactor.set(0, 0,1);

//Arnal 
vehicle1.addToWorld(world)











//_______
const wheelOptions = {
  radius: 0.5,
  directionLocal: new CANNON.Vec3(0, -1, 0),
  suspensionStiffness: 30,
  suspensionRestLength: 0.3,
  frictionSlip: 1.4,
  dampingRelaxation: 0.9,
  dampingCompression: 0.9,
  maxSuspensionForce: 100000,
  rollInfluence: 0.01,
  axleLocal: new CANNON.Vec3(0, 0, 1),
  chassisConnectionPointLocal: new CANNON.Vec3(-1, 0, 1),
  maxSuspensionTravel: 0.3,
  customSlidingRotationalSpeed: -30,
  useCustomSlidingRotationalSpeed: true,
}


wheelOptions.chassisConnectionPointLocal.set(-2.0, -0.3, 1)
vehicle.addWheel(wheelOptions)


wheelOptions.chassisConnectionPointLocal.set(-2.0, -0.3, -1)
vehicle.addWheel(wheelOptions)

wheelOptions.chassisConnectionPointLocal.set(2, -0.3, 1)
vehicle.addWheel(wheelOptions)

wheelOptions.chassisConnectionPointLocal.set(2, -0.3, -1);
vehicle.addWheel(wheelOptions)
//___________two__________________

wheelOptions.chassisConnectionPointLocal.set(1.6, -0.5, 1)
vehicle2.addWheel(wheelOptions)


wheelOptions.chassisConnectionPointLocal.set(1.6, -0.5, -1)
vehicle2.addWheel(wheelOptions)

wheelOptions.chassisConnectionPointLocal.set(3, -0.5, 1)
vehicle2.addWheel(wheelOptions)

wheelOptions.chassisConnectionPointLocal.set(3, -0.5, -1);
vehicle2.addWheel(wheelOptions)

//_____




vehicle.addToWorld(world)

vehicle2.addToWorld(world)

      // Add the wheel bodies
  
  
  









  
  
  
  //******************************
  const wheelBodies = [];
  const wheelBodies1 = [];
  
  
  let wi,wi1;
   wi = new CANNON.Sphere(0.6)
   wi1 = new CANNON.Sphere(0.6)

  const wheelMaterial = new CANNON.Material('wheel')
        
  vehicle.wheelInfos.forEach((wheel)=>{

  const wheelBody = new CANNON.Body({
    mass: 0,
    material: wheelMaterial,
  })
  wheelBody.type = CANNON.Body.KINEMATIC
  wheelBody.collisionFilterGroup = 0
  
  
  const quaternion = new CANNON.Quaternion().setFromEuler(-Math.PI / 2, 0, 0)
  
  wheelBody.addShape(wi, new CANNON.Vec3(), quaternion)
  wheelBodies.push(wheelBody)
  world.addBody(wheelBody)
 
  })
//____Update the wheel bodies_____
  
  world.addEventListener('postStep',() =>{
  for (let i = 0; i < vehicle.wheelInfos.length; i++){
    
    
  vehicle.updateWheelTransform(i)
  
  const transform = vehicle.wheelInfos[0].worldTransform
 
  const wheelBody = wheelBodies[0]
  wheelBody.position.copy(transform.position)
  wheelBody.quaternion.copy(transform.quaternion)
  //-----------
 tire1.position.copy(transform.position)
 tire1.quaternion.copy(transform.quaternion)
 
 
   //-----1
   const transform1 = vehicle.wheelInfos[1].worldTransform
  
  const wheelBody1 = wheelBodies[1]
  wheelBody1.position.copy(transform1.position)
  wheelBody1.quaternion.copy(transform1.quaternion)
 
 tire2.position.copy(transform1.position)
 tire2.quaternion.copy(transform1.quaternion)
 
 
 
    //-----2
   const transform2 = vehicle.wheelInfos[2].worldTransform
  
  const wheelBody2 = wheelBodies[2]
  wheelBody2.position.copy(transform2.position)
  wheelBody2.quaternion.copy(transform2.quaternion)
 
 tire3.position.copy(transform2.position)
 tire3.quaternion.copy(transform2.quaternion)
 
 
     //-----3
const transform3 = vehicle.wheelInfos[3].worldTransform
 
const wheelBody3 = wheelBodies[3]
wheelBody3.position.copy(transform3.position)
wheelBody3.quaternion.copy(transform3.quaternion)
 
tire4.position.copy(transform3.position)
tire4.quaternion.copy(transform3.quaternion)
 
//________________________
 }
 
})
//______________________________
//_____________TWOB______________
vehicle2.wheelInfos.forEach((wheel) => {
  
  const wheelBody = new CANNON.Body({
    mass: 0,
    material: wheelMaterial,
  })
  wheelBody.type = CANNON.Body.KINEMATIC
  wheelBody.collisionFilterGroup = 0
  
  
  const quaternion = new CANNON.Quaternion().setFromEuler(-Math.PI / 2, 0, 0)
  
  wheelBody.addShape(wi1, new CANNON.Vec3(), quaternion)
  wheelBodies1.push(wheelBody)
  world.addBody(wheelBody)
  
})

world.addEventListener('postStep', () => {
  for (let i = 0; i < vehicle2.wheelInfos.length; i++) {
    
    
    vehicle2.updateWheelTransform(i)
    
    const transform = vehicle2.wheelInfos[0].worldTransform
    
    const wheelBody = wheelBodies1[0]
    wheelBody.position.copy(transform.position)
    wheelBody.quaternion.copy(transform.quaternion)
    //-----------
   
    tire5.position.copy(transform.position)
    tire5.quaternion.copy(transform.quaternion)
    
    
    //-----1
    const transform1 = vehicle2.wheelInfos[1].worldTransform
    
    const wheelBody1 = wheelBodies1[1]
    wheelBody1.position.copy(transform1.position)
    wheelBody1.quaternion.copy(transform1.quaternion)
    
    tire6.position.copy(transform1.position)
    tire6.quaternion.copy(transform1.quaternion)
    
    
    
    //-----2
    const transform2 = vehicle2.wheelInfos[2].worldTransform
    
    const wheelBody2 = wheelBodies1[2]
    wheelBody2.position.copy(transform2.position)
    wheelBody2.quaternion.copy(transform2.quaternion)
    
    tire7.position.copy(transform2.position)
    tire7.quaternion.copy(transform2.quaternion)
    
    
    //-----3
    const transform3 = vehicle2.wheelInfos[3].worldTransform
    
    const wheelBody3 = wheelBodies1[3]
    wheelBody3.position.copy(transform3.position)
    wheelBody3.quaternion.copy(transform3.quaternion)
    
    
    tire8.position.copy(transform3.position)
    tire8.quaternion.copy(transform3.quaternion)
    
    //________________________
  }
  
})



//carBody end
//______________________________



//_______________








//______________________________________

const move1=document.getElementById('m1');
const move2=document.getElementById('m2');     
const move3=document.getElementById('m3');     

const move4=document.getElementById('m4');   
const move5=document.getElementById('m5');   

move1.addEventListener('touchstart',function(){
  
  const maxForce = 500
  
  
  vehicle.applyEngineForce(-maxForce, 2)
  vehicle.applyEngineForce(-maxForce, 3)
});        

move1.addEventListener('touchend', function() {
  
  const maxForce = 0
  
  
  vehicle.applyEngineForce(-maxForce, 2)
  vehicle.applyEngineForce(-maxForce, 3)
});






move2.addEventListener('touchstart',function(){
const maxSteerVal = 0.3 ;


vehicle.setSteeringValue(maxSteerVal, 0)
vehicle.setSteeringValue(maxSteerVal, 1)
});
move2.addEventListener('touchend',function(){
  const maxSteerVal1 = 0
  vehicle.setSteeringValue(maxSteerVal1, 0)
  vehicle.setSteeringValue(maxSteerVal1, 1)
  
  
  
  
});


move3.addEventListener('touchstart', function() {
  const maxSteerVal = 0.3
  vehicle.setSteeringValue(-maxSteerVal, 0)
  vehicle.setSteeringValue(-maxSteerVal, 1)
});

move3.addEventListener('touchend', function() {
  const maxSteerVal2 = 0
  vehicle.setSteeringValue(maxSteerVal2, 0)
  vehicle.setSteeringValue(maxSteerVal2, 1)
});



move4.addEventListener('touchstart', function() {
  const brakeForce = 5;
vehicle.setBrake(0, 0)
vehicle.setBrake(0, 1)
vehicle.setBrake(0, 2)
vehicle.setBrake(0, 3)
  vehicle.setBrake(brakeForce,0)
  vehicle.setBrake(brakeForce,1)
  vehicle.setBrake(brakeForce,2)
  vehicle.setBrake(brakeForce,3)
    
    
    
  });
  
move4.addEventListener('touchend',function(){
  const brakeForce = 0;
  vehicle.setBrake(0, 0)
  vehicle.setBrake(0, 1)
  vehicle.setBrake(0, 2)
  vehicle.setBrake(0, 3)
  vehicle.setBrake(brakeForce,0)
  vehicle.setBrake(brakeForce,1)
  vehicle.setBrake(brakeForce,2)
  vehicle.setBrake(brakeForce,3)
    
  
  
})

move5.addEventListener('touchstart', function() {
  const maxForce1 = 350
  vehicle.applyEngineForce(maxForce1, 2)
  vehicle.applyEngineForce(maxForce1, 3)
})

move5.addEventListener('touchend', function() {
  const maxForce1 = 0;
  vehicle.applyEngineForce(maxForce1, 2)
  vehicle.applyEngineForce(maxForce1, 3)
})






document.addEventListener('keydown', (event) => {
    const maxSteerVal = 0.5
           const maxForce = 300
           const brakeForce = 10
  
           switch (event.key) {
             case 'w':
             case 'ArrowUp':
               vehicle.applyEngineForce(-maxForce, 2)
               vehicle.applyEngineForce(-maxForce, 3)
               break
  
             case 's':
             case 'ArrowDown':
               vehicle.applyEngineForce(maxForce, 2)
               vehicle.applyEngineForce(maxForce, 3)
               break
  
             case 'a':
             case 'ArrowLeft':
               vehicle.setSteeringValue(maxSteerVal, 0)
               vehicle.setSteeringValue(maxSteerVal, 1)
               break
               case 'd':
                case 'ArrowRight':
                  vehicle.setSteeringValue(-maxSteerVal, 0)
                  vehicle.setSteeringValue(-maxSteerVal, 1)
                  break
    
                case 'b':
                  vehicle.setBrake(brakeForce, 0)
                  vehicle.setBrake(brakeForce, 1)
                  vehicle.setBrake(brakeForce, 2)
                  vehicle.setBrake(brakeForce, 3)
                  break
  
                  case 'r':
                    restartCurrentScene()
                    break
              }
            })
  
            // restartCurrentScene
  
    // Reset force on keyup
    document.addEventListener('keyup', (event) => {
      switch (event.key) {
        case 'w':
        case 'ArrowUp':
          vehicle.applyEngineForce(0, 2)
          vehicle.applyEngineForce(0, 3)
          break
  
        case 's':
        case 'ArrowDown':
          vehicle.applyEngineForce(0, 2)
          vehicle.applyEngineForce(0, 3)
          break
  
        case 'a':
        case 'ArrowLeft':
          vehicle.setSteeringValue(0, 0)
          vehicle.setSteeringValue(0, 1)
          break
          case 'd':
            case 'ArrowRight':
              vehicle.setSteeringValue(0, 0)
              vehicle.setSteeringValue(0, 1)
              break
  
            case 'b':
              vehicle.setBrake(0, 0)
              vehicle.setBrake(0, 1)
              vehicle.setBrake(0, 2)
              vehicle.setBrake(0, 3)
              break
  }
  })   
              
//OBJECT 
const loader = new GLTFLoader();


let mixer, clock = new THREE.Clock();
let model,tire1,tire2,tire3,tire4,tire5, tire6,tire7,tire8;

const modelList = [
  './lowtruck.glb'
];




const randomIndex = Math.floor(Math.random() * modelList.length);
const modelUrl = modelList[randomIndex];









loader.load(modelUrl,function(gltf){
    model =gltf.scene;
    model.scale.set(1,0.8,1);
    model.position.set(0,-20, 0);
    
    //scene.add(model);
    
    /*
    mixer = new THREE.AnimationMixer(model);

// Play first animation
const action = mixer.clipAction(gltf.animations[0]);
//_____door open button
const doorOpen = document.getElementById('m0');
doorOpen.addEventListener('touchstart', function(){
  action.play();
  
})

doorOpen.addEventListener('touchend', function() {
  action.stop();
})

*/

    
    
    
    
    /*_________*/
    loader.load("./tire/tireA.glb",function(gltf){
    tire1 =gltf.scene;
    tire1.scale.set(0.6,0.6,0.7);
    tire1.position.set(40, 4, -12);
    scene.add(tire1);
  loader.load("./tire/tireA.glb", function(gltf) {
  tire2 = gltf.scene;
  tire2.scale.set(0.6,0.6,0.7);
  tire2.position.set(40, 4, -12);
  scene.add(tire2);
  loader.load("./tire/tireA.glb", function(gltf) {
  tire3 = gltf.scene;
  tire3.scale.set(0.6,0.6,0.9);
  tire3.position.set(40, 4, -12);
  scene.add(tire3);
  loader.load("./tire/tireA.glb", function(gltf) {
  tire4 = gltf.scene;
  tire4.scale.set(0.6,0.6,0.9);
  tire4.position.set(40, 4, -12);
  scene.add(tire4);
  loader.load("./tire/tireA.glb", function(gltf) {
  tire5 = gltf.scene;
  tire5.scale.set(0.6, 0.6, 0.9);
  tire5.position.set(40, 4, -12);
  scene.add(tire5);
  loader.load("./tire/tireA.glb", function(gltf) {
  tire6 = gltf.scene;
  tire6.scale.set(0.6, 0.6, 0.9);
  tire6.position.set(40, 4, -12);
  scene.add(tire6);
  loader.load("./tire/tireA.glb", function(gltf) {
  tire7 = gltf.scene;
  tire7.scale.set(0.6, 0.6, 0.9);
  tire7.position.set(40, 4, -12);
  scene.add(tire7);
  loader.load("./tire/tireA.glb", function(gltf) {
  tire8 = gltf.scene;
  tire8.scale.set(0.6, 0.6, 0.9);
  tire8.position.set(40, 4, -12);
  scene.add(tire8);
  animate();
  
});
});
});
});
});
});
});
});

});








// arnal
//_____________mapCode___________



//__________jaminA_______________
//_______________________________
//__________mauntan








//__________jangalA______________










//.......... roadCode
/*
MeshStandardMaterial
MeshBasicMaterial


*/


const jmi1 = new THREE.Mesh(
  new THREE.BoxGeometry(10,1.01, 5),
  new THREE.MeshBasicMaterial({ 
      
  })
);

// Clone
jmi1.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png')});

jmi1.position.set(2,0,0);
scene.add(jmi1);
//__physics
const road1 = new CANNON.Box(new CANNON.Vec3(5,0.7,2.5));

const R1 = new CANNON.Body({
  mass: 0,
})

R1.addShape(road1);
R1.quaternion.setFromEuler(0,0,0.0);
R1.position.set(0,1.91,0);
world.addBody(R1);

//____2
const r2 = jmi1.clone();
r2.material = jmi1.material.clone();  // independent material
//r2.material.color.set('red');
r2.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png')});
r2.position.set(-2, 0, 0);
scene.add(r2)
//__physics 2
const road2 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R2 = new CANNON.Body({
  mass: 0,
})

R2.addShape(road2);
R2.quaternion.setFromEuler(0, 0, 0);
R2.position.set(-9.5, 1.9, 0);
world.addBody(R2);


//____3
const r3 = jmi1.clone();
r3.material = jmi1.material.clone();  // independent material
//r3.material.color.set('red');

r3.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png')});
r3.position.set(-2, 0, 0);
scene.add(r3)
//__physics 2
const road3 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R3 = new CANNON.Body({
  mass: 0,
})

R3.addShape(road3);
R3.quaternion.setFromEuler(0, 0, -0);
R3.position.set(-19.4, 1.9, 0);
world.addBody(R3);


//____4
const r4 = jmi1.clone();
r4.material = jmi1.material.clone();  // independent material
//r3.material.color.set('red');

r4.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png')});
r4.position.set(-2, 0, 0);
scene.add(r4)
//__physics 2
const road4 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R4 = new CANNON.Body({
  mass: 0,
})

R4.addShape(road4);
R4.quaternion.setFromEuler(0,0,-0.1);
R4.position.set(-28, 2.3, 0);
world.addBody(R4);


//____5
const r5 = jmi1.clone();
r5.material = jmi1.material.clone();  // independent material
//r3.material.color.set('red');

r5.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png')});
r5.position.set(-2, 0, 0);
scene.add(r5)
//__physics 2
const road5 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R5 = new CANNON.Body({
  mass: 0,
})

R5.addShape(road5);
R5.quaternion.setFromEuler(0,0,-0.2);
R5.position.set(-37.3, 3.7, 0);
world.addBody(R5);


//____6
const r6 = jmi1.clone();
r6.material = jmi1.material.clone();  // independent material
//r3.material.color.set('red');

r6.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png')});
r6.position.set(-2, 0, 0);
scene.add(r6)
//__physics 2
const road6 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R6 = new CANNON.Body({
  mass: 0,
})

R6.addShape(road6);
R6.quaternion.setFromEuler(0,0,-0.001);
R6.position.set(-47,4.7, 0);
world.addBody(R6);



//____7
const r7 = jmi1.clone();
r7.material = jmi1.material.clone();  // independent material
//r3.material.color.set('red');

r7.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png')});
r7.position.set(-2, 0, 0);
scene.add(r7)
//__physics 2
const road7 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R7 = new CANNON.Body({
  mass: 0,
})

R7.addShape(road7);
R7.quaternion.setFromEuler(0,0.3,-0.001);
R7.position.set(-56,4.7, 1.3);
world.addBody(R7);


//____8
const r8 = jmi1.clone();
r8.material = jmi1.material.clone();  // independent material
//r3.material.color.set('red');

r8.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png')});
r8.position.set(-2, 0, 0);
scene.add(r8)
//__physics 2
const road8 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R8 = new CANNON.Body({
  mass: 0,
})

R8.addShape(road8);
R8.quaternion.setFromEuler(0,0.5,-0.001);
R8.position.set(-64.7,4.7, 5);
world.addBody(R8);


//____9
const r9 = jmi1.clone();
r9.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r9.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r9.position.set(-2, 0, 0);
scene.add(r9)
//__physics 2
const road9 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R9 = new CANNON.Body({
  mass: 0,
})

R9.addShape(road9);
R9.quaternion.setFromEuler(0, 0.8, -0.001);
R9.position.set(-72.01, 4.7, 10.5);
world.addBody(R9);


//____10
const r10 = jmi1.clone();
r10.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r10.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r10.position.set(-2, 0, 0);
scene.add(r10)
//__physics 2
const road10 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R10 = new CANNON.Body({
  mass: 0,
})

R10.addShape(road10);
R10.quaternion.setFromEuler(0,1, -0.001);
R10.position.set(-77.7, 4.67, 17.7);
world.addBody(R10);



//____11
const r11 = jmi1.clone();
r11.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r11.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r11.position.set(-2, 0, 0);
scene.add(r11)
//__physics 2
const road11 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R11 = new CANNON.Body({
  mass: 0,
})

R11.addShape(road11);
R11.quaternion.setFromEuler(0,1.2, -0.1);
R11.position.set(-82, 5.2, 26);
world.addBody(R11);



//____12
const r12 = jmi1.clone();
r12.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r12.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r12.position.set(-2, 0, 0);
scene.add(r12)
//__physics 2
const road12 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R12 = new CANNON.Body({
  mass: 0,
})

R12.addShape(road12);
R12.quaternion.setFromEuler(0,1.4, -0.1);
R12.position.set(-84.5, 6.2, 35);
world.addBody(R12);


//____13
const r13 = jmi1.clone();
r13.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r13.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r13.position.set(-2, 0, 0);
scene.add(r13)
//__physics 2
const road13 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R13 = new CANNON.Body({
  mass: 0,
})

R13.addShape(road12);
R13.quaternion.setFromEuler(0,1.6, -0.1);
R13.position.set(-85.1,7,43);
world.addBody(R13);


//____14
const r14 = jmi1.clone();
r14.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r14.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r14.position.set(-2, 0, 0);
scene.add(r14)
//__physics 2
const road14 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R14 = new CANNON.Body({
  mass: 0,
})

R14.addShape(road14);
R14.quaternion.setFromEuler(0,1.7, -0.1);
R14.position.set(-84.3,7.9,52);
world.addBody(R14);


//____15
const r15 = jmi1.clone();
r15.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r15.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r15.position.set(-2, 0, 0);
scene.add(r15)
//__physics 2
const road15 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R15 = new CANNON.Body({
  mass: 0,
})

R15.addShape(road15);
R15.quaternion.setFromEuler(0,1.7, -0);
R15.position.set(-83.1,8.4,61.4);
world.addBody(R15);


//____16
const r16 = jmi1.clone();
r16.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r16.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r16.position.set(-2, 0, 0);
scene.add(r16)
//__physics 2
const road16 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R16 = new CANNON.Body({
  mass: 0,
})

R16.addShape(road16);
R16.quaternion.setFromEuler(0,1.5, -0.001);
R16.position.set(-82.8,8.4,70);
world.addBody(R16);


//____17
const r17 = jmi1.clone();
r17.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r17.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r17.position.set(-2, 0, 0);
scene.add(r17)
//__physics 2
const road17 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R17 = new CANNON.Body({
  mass: 0,
})

R17.addShape(road17);
R17.quaternion.setFromEuler(0,1.4, -0.001);
R17.position.set(-83.7,8.4,78);
world.addBody(R17);


//____18
const r18 = jmi1.clone();
r18.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r18.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r18.position.set(-2, 0, 0);
scene.add(r18)
//__physics 2
const road18 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R18 = new CANNON.Body({
  mass: 0,
})

R18.addShape(road18);
R18.quaternion.setFromEuler(0,1.2, -0.001);
R18.position.set(-86,8.4,86.4);
world.addBody(R18);


//____19
const r19 = jmi1.clone();
r19.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r19.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r19.position.set(-2, 0, 0);
scene.add(r19)
//__physics 2
const road19 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R19 = new CANNON.Body({
  mass: 0,
})

R19.addShape(road19);
R19.quaternion.setFromEuler(0,1, -0.001);
R19.position.set(-90.1,8.4,94.4);
world.addBody(R19);


//____20
const r20 = jmi1.clone();
r20.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r20.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r20.position.set(-2, 0, 0);
scene.add(r20)
//__physics 2
const road20 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R20 = new CANNON.Body({
  mass: 0,
})

R20.addShape(road20);
R20.quaternion.setFromEuler(0,0.8, -0.001);
R20.position.set(-95.5,8.4,101.2);
world.addBody(R20);


//____21
const r21 = jmi1.clone();
r21.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r21.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r21.position.set(-2, 0, 0);
scene.add(r21)
//__physics 2
const road21 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R21 = new CANNON.Body({
  mass: 0,
})

R21.addShape(road21);
R21.quaternion.setFromEuler(0,0.6, -0.001);
R21.position.set(-102,8.4,106.7);
world.addBody(R21);


//____22
const r22 = jmi1.clone();
r22.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r22.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r22.position.set(-2, 0, 0);
scene.add(r22)
//__physics 2
const road22 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R22 = new CANNON.Body({
  mass: 0,
})

R22.addShape(road22);
R22.quaternion.setFromEuler(0,0.5, -0.001);
R22.position.set(-110,8.4,111.6);
world.addBody(R22);


//____23
const r23 = jmi1.clone();
r22.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r23.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r23.position.set(-2, 0, 0);
scene.add(r23)
//__physics 2
const road23 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R23 = new CANNON.Body({
  mass: 0,
})

R23.addShape(road23);
R23.quaternion.setFromEuler(0,0.5, 0.03);
R23.position.set(-118.5,8.3,116.3);
world.addBody(R23);


//____24
const r24 = jmi1.clone();
r24.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r24.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r24.position.set(-2, 0, 0);
scene.add(r24)
//__physics 2
const road24 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R24 = new CANNON.Body({
  mass: 0,
})

R24.addShape(road24);
R24.quaternion.setFromEuler(0,0.5, 0.03);
R24.position.set(-126,8.03,120.4);
world.addBody(R24);


//____25
const r25 = jmi1.clone();
r25.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r25.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r25.position.set(-2, 0, 0);
scene.add(r25)
//__physics 2
const road25 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R25 = new CANNON.Body({
  mass: 0,
})

R25.addShape(road25);
R25.quaternion.setFromEuler(0,0.5, 0.02);
R25.position.set(-133.7,7.8,124.6);
world.addBody(R25);

//____26
const r26 = jmi1.clone();
r26.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r26.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r26.position.set(-2, 0, 0);
scene.add(r26)
//__physics 2
const road26 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R26 = new CANNON.Body({
  mass: 0,
})

R26.addShape(road26);
R26.quaternion.setFromEuler(0,0.5, 0.02);
R26.position.set(-142,7.6,129.1);
world.addBody(R26);


//____27
const r27 = jmi1.clone();
r27.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r27.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r27.position.set(-2, 0, 0);
scene.add(r27)
//__physics 2
const road27 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R27 = new CANNON.Body({
  mass: 0,
})

R27.addShape(road27);
R27.quaternion.setFromEuler(0,0.5, 0.03);
R27.position.set(-150,7.4,133.5);
world.addBody(R27);


//____28
const r28 = jmi1.clone();
r28.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r28.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r28.position.set(-2, 0, 0);
scene.add(r28)
//__physics 2
const road28 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R28 = new CANNON.Body({
  mass: 0,
})

R28.addShape(road28);
R28.quaternion.setFromEuler(0,0.5, 0.07);
R28.position.set(-158.6,6.9,138.2);
world.addBody(R28);


//____29
const r29 = jmi1.clone();
r29.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r29.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r29.position.set(-2, 0, 0);
scene.add(r29)
//__physics 2
const road29 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R29 = new CANNON.Body({
  mass: 0,
})

R29.addShape(road29);
R29.quaternion.setFromEuler(0,0.5, 0.08);
R29.position.set(-166.5,6.2,142.5);
world.addBody(R29);


//____30
const r30 = jmi1.clone();
r30.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r30.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r30.position.set(-2, 0, 0);
scene.add(r30)
//__physics 2
const road30 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R30 = new CANNON.Body({
  mass: 0,
})

R30.addShape(road30);
R30.quaternion.setFromEuler(0,0.5, 0.08);
R30.position.set(-175,5.4,147.1);
world.addBody(R30);


//____31
const r31 = jmi1.clone();
r31.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r31.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r31.position.set(-2, 0, 0);
scene.add(r31)
//__physics 2
const road31 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R31 = new CANNON.Body({
  mass: 0,
})

R31.addShape(road31);
R31.quaternion.setFromEuler(0,0.5, 0.09);
R31.position.set(-183,4.6,151.4);
world.addBody(R31);


//____32
const r32 = jmi1.clone();
r32.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r32.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r32.position.set(-2, 0, 0);
scene.add(r32)
//__physics 2
const road32 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R32 = new CANNON.Body({
  mass: 0,
})

R32.addShape(road32);
R32.quaternion.setFromEuler(0,0.6, 0.08);
R32.position.set(-191,3.8,156.3);
world.addBody(R32);


//____33
const r33 = jmi1.clone();
r33.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r33.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r33.position.set(-2, 0, 0);
scene.add(r33)
//__physics 2
const road33 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R33 = new CANNON.Body({
  mass: 0,
})

R33.addShape(road33);
R33.quaternion.setFromEuler(0,0.7, 0.09);
R33.position.set(-198,3.05,161.5);
world.addBody(R33);


//____34
const r34 = jmi1.clone();
r34.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r34.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r34.position.set(-2, 0, 0);
scene.add(r34)
//__physics 2
const road34 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R34 = new CANNON.Body({
  mass: 0,
})

R34.addShape(road34);
R34.quaternion.setFromEuler(0,0.9, 0.09);
R34.position.set(-204,2.3,167.7);
world.addBody(R34);


//____35
const r35 = jmi1.clone();
r35.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r35.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r35.position.set(-2, 0, 0);
scene.add(r35)
//__physics 2
const road35 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R35 = new CANNON.Body({
  mass: 0,
})

R35.addShape(road35);
R35.quaternion.setFromEuler(0,1.01, 0.09);
R35.position.set(-209,1.5,174.8);
world.addBody(R35);


//____36
const r36 = jmi1.clone();
r36.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r36.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r36.position.set(-2, 0, 0);
scene.add(r36)
//__physics 2
const road36 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R36 = new CANNON.Body({
  mass: 0,
})

R36.addShape(road36);
R36.quaternion.setFromEuler(0, 1.02, 0.09);
R36.position.set(-213.6, 0.7, 182.1);
world.addBody(R36);


//____37
const r37 = jmi1.clone();
r37.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r37.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r37.position.set(-2, 0, 0);
scene.add(r37)
//__physics 2
const road37 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R37 = new CANNON.Body({
  mass: 0,
})

R37.addShape(road37);
R37.quaternion.setFromEuler(0, 1.1, 0.09);
R37.position.set(-218.2,-0.15, 190.3);
world.addBody(R37);


//____38
const r38 = jmi1.clone();
r38.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r38.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r38.position.set(-2, 0, 0);
scene.add(r38)
//__physics 2
const road38 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R38 = new CANNON.Body({
  mass: 0,
})

R38.addShape(road38);
R38.quaternion.setFromEuler(0, 1.2, 0.09);
R38.position.set(-221.5,-0.9, 197.6);
world.addBody(R38);


//____39
const r39 = jmi1.clone();
r39.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r39.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r39.position.set(-2, 0, 0);
scene.add(r39)
//__physics 2
const road39 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R39 = new CANNON.Body({
  mass: 0,
})

R39.addShape(road39);
R39.quaternion.setFromEuler(0, 1.2, 0);
R39.position.set(-224.6,-1.3,205.6);
world.addBody(R39);


//____40
const r40 = jmi1.clone();
r40.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r40.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r40.position.set(-2, 0, 0);
scene.add(r40)
//__physics 2
const road40 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R40 = new CANNON.Body({
  mass: 0,
})

R40.addShape(road40);
R40.quaternion.setFromEuler(0, 1.2, 0.001);
R40.position.set(-228,-1.3,214.4);
world.addBody(R40);


//____41
const r41 = jmi1.clone();
r41.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r41.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r41.position.set(-2, 0, 0);
scene.add(r41)
//__physics 2
const road41 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R41 = new CANNON.Body({
  mass: 0,
})

R41.addShape(road41);
R41.quaternion.setFromEuler(0, 1.2, 0.001);
R41.position.set(-231.3,-1.3,223);
world.addBody(R41);



//____42
const r42 = jmi1.clone();
r42.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r42.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r42.position.set(-2, 0, 0);
scene.add(r42)
//__physics 2
const road42 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R42 = new CANNON.Body({
  mass: 0,
})

R42.addShape(road42);
R42.quaternion.setFromEuler(0, 1.1, 0.001);
R42.position.set(-234.9,-1.3,231);
world.addBody(R42);


//____43
const r43 = jmi1.clone();
r43.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r43.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r43.position.set(-2, 0, 0);
scene.add(r43)
//__physics 2
const road43 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R43 = new CANNON.Body({
  mass: 0,
})

R43.addShape(road43);
R43.quaternion.setFromEuler(0, 1, 0.001);
R43.position.set(-239.6,-1.3,239.3);
world.addBody(R43);


//pulStart

//____44
const r44 = jmi1.clone();
r44.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r44.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r44.position.set(-2, 0, 0);
scene.add(r44)
//__physics 2
const road44 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R44 = new CANNON.Body({
  mass: 0,
})

R44.addShape(road44);
R44.quaternion.setFromEuler(0, 1, 0.001);
R44.position.set(-244.5,-1.3,247);
world.addBody(R44);


//____45
const r45 = jmi1.clone();
r45.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r45.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r45.position.set(-2, 0, 0);
scene.add(r45)
//__physics 2
const road45 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R45 = new CANNON.Body({
  mass: 0,
})

R45.addShape(road45);
R45.quaternion.setFromEuler(0, 1, 0.001);
R45.position.set(-249.7,-1.3,255);
world.addBody(R45);

//pulEnd

//____46
const r46 = jmi1.clone();
r46.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r46.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r46.position.set(-2, 0, 0);
scene.add(r46)
//__physics 2
const road46 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R46 = new CANNON.Body({
  mass: 0,
})

R46.addShape(road46);
R46.quaternion.setFromEuler(0, 0.8, 0.001);
R46.position.set(-255.3, -1.3,262);
world.addBody(R46);


//____47
const r47 = jmi1.clone();
r47.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r47.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r47.position.set(-2, 0, 0);
scene.add(r47)
//__physics 2
const road47 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R47 = new CANNON.Body({
  mass: 0,
})

R47.addShape(road47);
R47.quaternion.setFromEuler(0, 0.6, 0.001);
R47.position.set(-262.3, -1.3,268);
world.addBody(R47);


//____48
const r48 = jmi1.clone();
r48.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r48.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r48.position.set(-2, 0, 0);
scene.add(r48)
//__physics 2
const road48 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R48 = new CANNON.Body({
  mass: 0,
})

R48.addShape(road48);
R48.quaternion.setFromEuler(0,0.4,0.001);
R48.position.set(-269.2,-1.3,271.7);
world.addBody(R48);


//____49
const r49 = jmi1.clone();
r49.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r49.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r49.position.set(-2, 0, 0);
scene.add(r49)
//__physics 2
const road49 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R49 = new CANNON.Body({
  mass: 0,
})

R49.addShape(road49);
R49.quaternion.setFromEuler(0,0.4,-0.2);
R49.position.set(-277,-0.5,275);
world.addBody(R49);

//____50
const r50 = jmi1.clone();
r50.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r50.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r50.position.set(-2, 0, 0);
scene.add(r50)
//__physics 2
const road50 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R50 = new CANNON.Body({
  mass: 0,
})

R50.addShape(road50);
R50.quaternion.setFromEuler(0,0.4,-0.1);
R50.position.set(-285.9,0.95,278.8);
world.addBody(R50);


//____51
const r51 = jmi1.clone();
r51.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r51.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r51.position.set(-2, 0, 0);
scene.add(r51)
//__physics 2
const road51 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R51 = new CANNON.Body({
  mass: 0,
})

R51.addShape(road51);
R51.quaternion.setFromEuler(0,0.4,-0.05);
R51.position.set(-294.9,1.7,282.6);
world.addBody(R51);


//____52
const r52 = jmi1.clone();
r52.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r52.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r52.position.set(-2, 0, 0);
scene.add(r52)
//__physics 2
const road52 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R52 = new CANNON.Body({
  mass: 0,
})

R52.addShape(road52);
R52.quaternion.setFromEuler(0,0.4,-0.03);
R52.position.set(-304,2.1,286.5);
world.addBody(R52);


//____53
const r53 = jmi1.clone();
r53.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r53.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r53.position.set(-2, 0, 0);
scene.add(r53)
//__physics 2
const road53 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R53 = new CANNON.Body({
  mass: 0,
})

R53.addShape(road53);
R53.quaternion.setFromEuler(0, 0.4, -0.03);
R53.position.set(-313, 2.4, 290.3);
world.addBody(R53);


//____54
const r54 = jmi1.clone();
r54.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r54.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r54.position.set(-2, 0, 0);
scene.add(r54)
//__physics 2
const road54 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R54 = new CANNON.Body({
  mass: 0,
})

R54.addShape(road54);
R54.quaternion.setFromEuler(0, 0.4, -0.03);
R54.position.set(-322, 2.7, 294.1);
world.addBody(R54);


//____55
const r55 = jmi1.clone();
r55.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r55.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r55.position.set(-2, 0, 0);
scene.add(r55)
//__physics 2
const road55 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R55 = new CANNON.Body({
  mass: 0,
})

R55.addShape(road55);
R55.quaternion.setFromEuler(0, 0.4, -0.03);
R55.position.set(-331,3,297.9);
world.addBody(R55);


//____56
const r56 = jmi1.clone();
r56.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r56.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r56.position.set(-2, 0, 0);
scene.add(r56)
//__physics 2
const road56 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R56 = new CANNON.Body({
  mass: 0,
})

R56.addShape(road56);
R56.quaternion.setFromEuler(0, 0.4, -0.01);
R56.position.set(-340,3.2,301.7);
world.addBody(R56);

//____57
const r57 = jmi1.clone();
r57.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r57.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r57.position.set(-2, 0, 0);
scene.add(r57)
//__physics 2
const road57 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R57 = new CANNON.Body({
  mass: 0,
})

R57.addShape(road57);
R57.quaternion.setFromEuler(0, 0.4, 0.01);
R57.position.set(-349,3.2,305.5);
world.addBody(R57);


//____58
const r58 = jmi1.clone();
r58.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r58.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r58.position.set(-2, 0, 0);
scene.add(r58)
//__physics 2
const road58 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R58 = new CANNON.Body({
  mass: 0,
})

R58.addShape(road58);
R58.quaternion.setFromEuler(0, 0.4, 0.09);
R58.position.set(-358,2.7,309.3);
world.addBody(R58);

//____59
const r59 = jmi1.clone();
r59.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r59.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r59.position.set(-2, 0, 0);
scene.add(r59)
//__physics 2
const road59 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R59 = new CANNON.Body({
  mass: 0,
})

R59.addShape(road59);
R59.quaternion.setFromEuler(0, 0.4, 0.1);
R59.position.set(-366.7,1.8,313);
world.addBody(R59);


//____60
const r60 = jmi1.clone();
r60.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r60.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r60.position.set(-2, 0, 0);
scene.add(r60)
//__physics 2
const road60 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R60 = new CANNON.Body({
  mass: 0,
})

R60.addShape(road60);
R60.quaternion.setFromEuler(0, 0.6, 0.09);
R60.position.set(-374.7,0.92,317.4);
world.addBody(R60);


//____61
const r61 = jmi1.clone();
r61.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r61.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r61.position.set(-2, 0, 0);
scene.add(r61)
//__physics 2
const road61 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R61 = new CANNON.Body({
  mass: 0,
})

R61.addShape(road61);
R61.quaternion.setFromEuler(0, 0.8, 0.09);
R61.position.set(-381.8, 0.092, 323.2);
world.addBody(R61);


//____62
const r62 = jmi1.clone();
r62.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r62.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r62.position.set(-2, 0, 0);
scene.add(r62)
//__physics 2
const road62 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R62 = new CANNON.Body({
  mass: 0,
})

R62.addShape(road62);
R62.quaternion.setFromEuler(0,1, 0.01);
R62.position.set(-387.3,-0.4, 330.1);
world.addBody(R62);

//____63
const r63 = jmi1.clone();
r63.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r63.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r63.position.set(-2, 0, 0);
scene.add(r63)
//__physics 2
const road63 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R63 = new CANNON.Body({
  mass: 0,
})

R63.addShape(road63);
R63.quaternion.setFromEuler(0,1.2,-0.1);
R63.position.set(-391,-0.1, 337);
world.addBody(R63);


//____64
const r64 = jmi1.clone();
r64.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r64.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r64.position.set(-2, 0, 0);
scene.add(r64)
//__physics 2
const road64 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R64 = new CANNON.Body({
  mass: 0,
})

R64.addShape(road64);
R64.quaternion.setFromEuler(0,1,-0.091);
R64.position.set(-395.2,0.8, 345.2);
world.addBody(R64);


//____65
const r65 = jmi1.clone();
r65.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r65.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r65.position.set(-2, 0, 0);
scene.add(r65)
//__physics 2
const road65 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R65 = new CANNON.Body({
  mass: 0,
})

R65.addShape(road65);
R65.quaternion.setFromEuler(0,1,-0.2);
R65.position.set(-400,2.1,352.8);
world.addBody(R65);


//____66
const r66 = jmi1.clone();
r66.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r66.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r66.position.set(-2, 0, 0);
scene.add(r66)
//__physics 2
const road66 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R66 = new CANNON.Body({
  mass: 0,
})

R66.addShape(road66);
R66.quaternion.setFromEuler(0,1,-0.2);
R66.position.set(-405.2,4.05,360.9);
world.addBody(R66);


//____67
const r67 = jmi1.clone();
r67.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r67.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r67.position.set(-2, 0, 0);
scene.add(r67)
//__physics 2
const road67 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R67 = new CANNON.Body({
  mass: 0,
})

R67.addShape(road67);
R67.quaternion.setFromEuler(0, 1, -0.1);
R67.position.set(-410.4,5.52, 369.1);
world.addBody(R67);

//____68
const r68 = jmi1.clone();
r68.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r68.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r68.position.set(-2, 0, 0);
scene.add(r68)
//__physics 2
const road68 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R68 = new CANNON.Body({
  mass: 0,
})

R68.addShape(road68);
R68.quaternion.setFromEuler(0, 1, -0.08);
R68.position.set(-415.4,6.36, 377);
world.addBody(R68);

//____69
const r69 = jmi1.clone();
r69.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r69.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r69.position.set(-2, 0, 0);
scene.add(r69)
//__physics 2
const road69 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R69 = new CANNON.Body({
  mass: 0,
})

R69.addShape(road69);
R69.quaternion.setFromEuler(0, 1, -0.06);
R69.position.set(-420.6,7.01, 385);
world.addBody(R69);

//____70
const r70 = jmi1.clone();
r70.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r70.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r70.position.set(-2, 0, 0);
scene.add(r70)
//__physics 2
const road70 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R70 = new CANNON.Body({
  mass: 0,
})

R70.addShape(road70);
R70.quaternion.setFromEuler(0, 1, -0);
R70.position.set(-425.9,7.3, 393.2);
world.addBody(R70);


//____71
const r71 = jmi1.clone();
r71.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r71.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r71.position.set(-2, 0, 0);
scene.add(r71)
//__physics 2
const road71 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R71 = new CANNON.Body({
  mass: 0,
})

R71.addShape(road71);
R71.quaternion.setFromEuler(0, 1, -0.001);
R71.position.set(-431,7.3,401.1);
world.addBody(R71);


//____72
const r72 = jmi1.clone();
r72.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r72.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r72.position.set(-2, 0, 0);
scene.add(r72)
//__physics 2
const road72 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R72 = new CANNON.Body({
  mass: 0,
})

R72.addShape(road72);
R72.quaternion.setFromEuler(0, 1, 0.1);
R72.position.set(-436.3,6.81,409.4);
world.addBody(R72);


//____73
const r73 = jmi1.clone();
r73.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r73.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r73.position.set(-2, 0, 0);
scene.add(r73)
//__physics 2
const road73 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R73 = new CANNON.Body({
  mass: 0,
})

R73.addShape(road73);
R73.quaternion.setFromEuler(0, 1, 0.2);
R73.position.set(-441.5,5.35,417.5);
world.addBody(R73);


//____74
const r74 = jmi1.clone();
r74.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r74.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r74.position.set(-2, 0, 0);
scene.add(r74)
//__physics 2
const road74 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R74 = new CANNON.Body({
  mass: 0,
})

R74.addShape(road74);
R74.quaternion.setFromEuler(0, 1, 0.2);
R74.position.set(-446.8,3.36,425.7);
world.addBody(R74);

//____75
const r75 = jmi1.clone();
r75.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r75.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r75.position.set(-2, 0, 0);
scene.add(r75)
//__physics 2
const road75 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R75 = new CANNON.Body({
  mass: 0,
})

R75.addShape(road75);
R75.quaternion.setFromEuler(0, 1, 0.2);
R75.position.set(-452,1.40,433.8);
world.addBody(R75);


//____76
const r76 = jmi1.clone();
r76.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r76.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r76.position.set(-2, 0, 0);
scene.add(r76)
//__physics 2
const road76 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R76 = new CANNON.Body({
  mass: 0,
})

R76.addShape(road76);
R76.quaternion.setFromEuler(0.05,0.8, 0.1);
R76.position.set(-457,-0.011,440.3);
world.addBody(R76);


//____77
const r77 = jmi1.clone();
r77.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r77.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r77.position.set(-2, 0, 0);
scene.add(r77)
//__physics 2
const road77 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R77 = new CANNON.Body({
  mass: 0,
})

R77.addShape(road77);
R77.quaternion.setFromEuler(0.06,0.6, 0.1);
R77.position.set(-464,-1.26,446.2);
world.addBody(R77);


//____78
const r78 = jmi1.clone();
r78.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r78.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r78.position.set(-2, 0, 0);
scene.add(r78)
//__physics 2
const road78 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R78 = new CANNON.Body({
  mass: 0,
})

R78.addShape(road78);
R78.quaternion.setFromEuler(0.09,0.4, 0.1);
R78.position.set(-472,-2.5,450.5);
world.addBody(R78);


//____79
const r79 = jmi1.clone();
r79.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r79.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r79.position.set(-2, 0, 0);
scene.add(r79)
//__physics 2
const road79 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R79 = new CANNON.Body({
  mass: 0,
})

R79.addShape(road79);
R79.quaternion.setFromEuler(0.11,0.2, 0.1);
R79.position.set(-480,-3.6,453);
world.addBody(R79);


//____80
const r80 = jmi1.clone();
r80.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r80.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r80.position.set(-2, 0, 0);
scene.add(r80)
//__physics 2
const road80 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R80 = new CANNON.Body({
  mass: 0,
})

R80.addShape(road80);
R80.quaternion.setFromEuler(0.11,0.2, 0.1);
R80.position.set(-489.6,-4.8,454.8);
world.addBody(R80);

//____81
const r81 = jmi1.clone();
r81.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r81.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r81.position.set(-2, 0, 0);
scene.add(r81)
//__physics 2
const road81 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R81 = new CANNON.Body({
  mass: 0,
})

R81.addShape(road81);
R81.quaternion.setFromEuler(0.11,0, 0);
R81.position.set(-497.6,-5.4,455.7);
world.addBody(R81);

//____82
const r82 = jmi1.clone();
r82.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r82.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r82.position.set(-2, 0, 0);
scene.add(r82)
//__physics 2
const road82 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R82 = new CANNON.Body({
  mass: 0,
})

R82.addShape(road82);
R82.quaternion.setFromEuler(0.11,0.2, 0);
R82.position.set(-506,-5.48,456.4);
world.addBody(R82);


//____83
const r83 = jmi1.clone();
r83.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r83.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r83.position.set(-2, 0, 0);
scene.add(r83)
//__physics 2
const road83 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R83 = new CANNON.Body({
  mass: 0,
})

R83.addShape(road83);
R83.quaternion.setFromEuler(0.11,0.3, 0);
R83.position.set(-514.8,-5.75,458.6);
world.addBody(R83);


//____84
const r84 = jmi1.clone();
r84.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r84.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r84.position.set(-2, 0, 0);
scene.add(r84)
//__physics 2
const road84 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R84 = new CANNON.Body({
  mass: 0,
})

R84.addShape(road84);
R84.quaternion.setFromEuler(0.12,-0.7,-0.02);
R84.position.set(-514.8,-5.31,454.6);
world.addBody(R84);


//____85
const r85 = jmi1.clone();
r85.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r85.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r85.position.set(-2, 0, 0);
scene.add(r85)
//__physics 2
const road85 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R85 = new CANNON.Body({
  mass: 0,
})

R85.addShape(road85);
R85.quaternion.setFromEuler(0.12,-0.9,-0.02);
R85.position.set(-521.3,-4.3,448);
world.addBody(R85);


//____86
const r86 = jmi1.clone();
r86.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r86.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r86.position.set(-2, 0, 0);
scene.add(r86)
//__physics 2
const road86 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R86 = new CANNON.Body({
  mass: 0,
})

R86.addShape(road86);
R86.quaternion.setFromEuler(0.12,-0.9,-0.0);
R86.position.set(-527,-3.37,441);
world.addBody(R86);


//____87
const r87 = jmi1.clone();
r87.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r87.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r87.position.set(-2, 0, 0);
scene.add(r87)
//__physics 2
const road87 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R87 = new CANNON.Body({
  mass: 0,
})

R87.addShape(road87);
R87.quaternion.setFromEuler(0.12,-0.9,-0.0);
R87.position.set(-532.6,-2.52,434);
world.addBody(R87);


//____88
const r88 = jmi1.clone();
r88.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r88.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r88.position.set(-2, 0, 0);
scene.add(r88)
//__physics 2
const road88 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R88 = new CANNON.Body({
  mass: 0,
})

R88.addShape(road88);
R88.quaternion.setFromEuler(0.11,0.5, 0);
R88.position.set(-523.3,-6.15,462.2);
world.addBody(R88);

//____89
const r89 = jmi1.clone();
r89.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r89.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r89.position.set(-2, 0, 0);
scene.add(r89)
//__physics 2
const road89 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R89 = new CANNON.Body({
  mass: 0,
})

R89.addShape(road89);
R89.quaternion.setFromEuler(0.11,0.7, 0);
R89.position.set(-530.6,-6.71,467.1);
world.addBody(R89);


//____90
const r90 = jmi1.clone();
r90.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r90.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r90.position.set(-2, 0, 0);
scene.add(r90)
//__physics 2
const road90 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R90 = new CANNON.Body({
  mass: 0,
})

R90.addShape(road90);
R90.quaternion.setFromEuler(0.11,0.9, 0);
R90.position.set(-537,-7.44,473.6);
world.addBody(R90);

//____91
const r91 = jmi1.clone();
r91.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r91.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r91.position.set(-2, 0, 0);
scene.add(r91)
//__physics 2
const road91 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R91 = new CANNON.Body({
  mass: 0,
})

R91.addShape(road91);
R91.quaternion.setFromEuler(0.11,1.1, 0);
R91.position.set(-542,-8.28,481.2);
world.addBody(R91);


//____92
const r92 = jmi1.clone();
r92.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r92.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r92.position.set(-2, 0, 0);
scene.add(r92)
//__physics 2
const road92 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R92 = new CANNON.Body({
  mass: 0,
})

R92.addShape(road92);
R92.quaternion.setFromEuler(0.12,1.5,0.02);
R92.position.set(-518.8,-5.35,455.2);
world.addBody(R92);


//____93
const r93 = jmi1.clone();
r93.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r93.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r93.position.set(-2, 0, 0);
scene.add(r93)
//__physics 2
const road93 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R93 = new CANNON.Body({
  mass: 0,
})

R93.addShape(road93);
R93.quaternion.setFromEuler(0.11,1.3, 0);
R93.position.set(-545,-9.06,488.2);
world.addBody(R93);


//____94
const r94 = jmi1.clone();
r94.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r94.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r94.position.set(-2, 0, 0);
scene.add(r94)
//__physics 2
const road94 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R94 = new CANNON.Body({
  mass: 0,
})

R94.addShape(road94);
R94.quaternion.setFromEuler(0,1.3, 0);
R94.position.set(-547,-9.5,495.2);
world.addBody(R94);


//____95
const r95 = jmi1.clone();
r95.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r95.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r95.position.set(-2, 0, 0);
scene.add(r95)
//__physics 2
const road95 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R95 = new CANNON.Body({
  mass: 0,
})

R95.addShape(road95);
R95.quaternion.setFromEuler(0,1.3, 0.001);
R95.position.set(-549.5,-9.5,504.2);
world.addBody(R95);


//____96
const r96 = jmi1.clone();
r96.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r96.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r96.position.set(-2, 0, 0);
scene.add(r96)
//__physics 2
const road96 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R96 = new CANNON.Body({
  mass: 0,
})

R96.addShape(road96);
R96.quaternion.setFromEuler(0,1.3, 0.001);
R96.position.set(-552,-9.5,513);
world.addBody(R96);


//____97
const r97 = jmi1.clone();
r97.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r97.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r97.position.set(-2, 0, 0);
scene.add(r97)
//__physics 2
const road97 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R97 = new CANNON.Body({
  mass: 0,
})

R97.addShape(road97);
R97.quaternion.setFromEuler(0,1.3, 0.001);
R97.position.set(-554.5,-9.5,522);
world.addBody(R97);


//____98
const r98 = jmi1.clone();
r98.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r98.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r98.position.set(-2, 0, 0);
scene.add(r98)
//__physics 2
const road98 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R98 = new CANNON.Body({
  mass: 0,
})

R98.addShape(road98);
R98.quaternion.setFromEuler(0,1.3,0.001);
R98.position.set(-557,-9.5,531);
world.addBody(R98);


//____99
const r99 = jmi1.clone();
r99.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r99.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r99.position.set(-2, 0, 0);
scene.add(r99)
//__physics 2
const road99 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R99 = new CANNON.Body({
  mass: 0,
})

R99.addShape(road99);
R99.quaternion.setFromEuler(0,1.5,0.001);
R99.position.set(-558.6,-9.5,540);
world.addBody(R99);


//____100
const r100 = jmi1.clone();
r100.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r100.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r100.position.set(-2, 0, 0);
scene.add(r100)
//__physics 2
const road100 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R100 = new CANNON.Body({
  mass: 0,
})

R100.addShape(road100);
R100.quaternion.setFromEuler(-0.1,1.7,0.001);
R100.position.set(-558.3,-9.1,547);
world.addBody(R100);


//____101
const r101 = jmi1.clone();
r101.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r101.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r101.position.set(-2, 0, 0);
scene.add(r101)
//__physics 2
const road101 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R101 = new CANNON.Body({
  mass: 0,
})

R101.addShape(road101);
R101.quaternion.setFromEuler(-0.11,1.7,0.001);
R101.position.set(-557,-8.1,556.4);
world.addBody(R101);


//____102
const r102 = jmi1.clone();
r102.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r102.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r102.position.set(-2, 0, 0);
scene.add(r102)
//__physics 2
const road102 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R102 = new CANNON.Body({
  mass: 0,
})

R102.addShape(road102);
R102.quaternion.setFromEuler(-0,1.8,0.001);
R102.position.set(-555.3,-7.6,565.8);
world.addBody(R102);


//____103
const r103 = jmi1.clone();
r103.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r103.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r103.position.set(-2, 0, 0);
scene.add(r103)
//__physics 2
const road103 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R103 = new CANNON.Body({
  mass: 0,
})

R103.addShape(road103);
R103.quaternion.setFromEuler(-0,2.1,0.001);
R103.position.set(-552,-7.6,574);
world.addBody(R103);


//____104
const r104 = jmi1.clone();
r104.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r104.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r104.position.set(-2, 0, 0);
scene.add(r104)
//__physics 2
const road104 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R104 = new CANNON.Body({
  mass: 0,
})

R104.addShape(road104);
R104.quaternion.setFromEuler(-0,2.2,0.001);
R104.position.set(-547,-7.6,581.8);
world.addBody(R104);


//____105
const r105 = jmi1.clone();
r105.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r105.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r105.position.set(-2, 0, 0);
scene.add(r105)
//__physics 2
const road105 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R105 = new CANNON.Body({
  mass: 0,
})

R105.addShape(road105);
R105.quaternion.setFromEuler(-0,2.4,0.001);
R105.position.set(-541,-7.6,588.5);
world.addBody(R105);

//____106
const r106 = jmi1.clone();
r106.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r106.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r106.position.set(-2, 0, 0);
scene.add(r106)
//__physics 2
const road106 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R106 = new CANNON.Body({
  mass: 0,
})

R106.addShape(road106);
R106.quaternion.setFromEuler(-0,2.7,0.001);
R106.position.set(-534,-7.6,593.2);
world.addBody(R106);

//____107
const r107 = jmi1.clone();
r107.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r107.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r107.position.set(-2, 0, 0);
scene.add(r107)
//__physics 2
const road107 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R107 = new CANNON.Body({
  mass: 0,
})

R107.addShape(road107);
R107.quaternion.setFromEuler(-0,2.9,0.001);
R107.position.set(-526,-7.6,596);
world.addBody(R107);


//____108
const r108 = jmi1.clone();
r108.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r108.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r108.position.set(-2, 0, 0);
scene.add(r108)
//__physics 2
const road108 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R108 = new CANNON.Body({
  mass: 0,
})

R108.addShape(road108);
R108.quaternion.setFromEuler(-0,3.1,-0.1);
R108.position.set(-519,-7.3,597);
world.addBody(R108);


//____109
const r109 = jmi1.clone();
r109.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r109.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r109.position.set(-2, 0, 0);
scene.add(r109)
//__physics 2
const road109 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R109 = new CANNON.Body({
  mass: 0,
})

R109.addShape(road109);
R109.quaternion.setFromEuler(-0,0,0.1);
R109.position.set(-510,-6.4,597.2);
world.addBody(R109);


//____110
const r110 = jmi1.clone();
r110.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r110.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r110.position.set(-2, 0, 0);
scene.add(r110)
//__physics 2
const road110 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R110 = new CANNON.Body({
  mass: 0,
})

R110.addShape(road110);
R110.quaternion.setFromEuler(-0, 0, 0.1);
R110.position.set(-501, -5.5, 597.2);
world.addBody(R110);


//____111
const r111 = jmi1.clone();
r111.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r111.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r111.position.set(-2, 0, 0);
scene.add(r111)
//__physics 2
const road111 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R111 = new CANNON.Body({
  mass: 0,
})

R111.addShape(road111);
R111.quaternion.setFromEuler(-0, 0, 0.08);
R111.position.set(-492, -4.69, 597.2);
world.addBody(R111);


//____112
const r112 = jmi1.clone();
r112.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r112.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r112.position.set(-2, 0, 0);
scene.add(r112)
//__physics 2
const road112 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R112 = new CANNON.Body({
  mass: 0,
})

R112.addShape(road112);
R112.quaternion.setFromEuler(-0, 0, 0.001);
R112.position.set(-482.3, -4.31, 597.2);
world.addBody(R112);


//____113
const r113 = jmi1.clone();
r113.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r113.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r113.position.set(-2, 0, 0);
scene.add(r113)
//__physics 2
const road113 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R113 = new CANNON.Body({
  mass: 0,
})

R113.addShape(road113);
R113.quaternion.setFromEuler(-0, 0, 0.001);
R113.position.set(-472.5, -4.31, 597.2);
world.addBody(R113);

//____114
const r114 = jmi1.clone();
r114.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r114.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r114.position.set(-2, 0, 0);
scene.add(r114)
//__physics 2
const road114 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R114 = new CANNON.Body({
  mass: 0,
})

R114.addShape(road114);
R114.quaternion.setFromEuler(-0, 0, 0.001);
R114.position.set(-462.7, -4.31, 597.2);
world.addBody(R114);


//____115
const r115 = jmi1.clone();
r115.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r115.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r115.position.set(-2, 0, 0);
scene.add(r115)
//__physics 2
const road115 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R115 = new CANNON.Body({
  mass: 0,
})

R115.addShape(road115);
R115.quaternion.setFromEuler(-0, 0, 0.001);
R115.position.set(-452.9, -4.31, 597.2);
world.addBody(R115);


//____116
const r116 = jmi1.clone();
r116.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r116.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r116.position.set(-2, 0, 0);
scene.add(r116)
//__physics 2
const road116 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R116 = new CANNON.Body({
  mass: 0,
})

R116.addShape(road116);
R116.quaternion.setFromEuler(-0, 0, 0.001);
R116.position.set(-443.3, -4.31, 597.2);
world.addBody(R116);


//____117
const r117 = jmi1.clone();
r117.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r117.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r117.position.set(-2, 0, 0);
scene.add(r117)
//__physics 2
const road117 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R117 = new CANNON.Body({
  mass: 0,
})

R117.addShape(road117);
R117.quaternion.setFromEuler(-0, 0,-0.1);
R117.position.set(-433.6, -4.79, 597.2);
world.addBody(R117);


//____118
const r118 = jmi1.clone();
r118.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r118.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r118.position.set(-2, 0, 0);
scene.add(r118)
//__physics 2
const road118 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R118 = new CANNON.Body({
  mass: 0,
})

R118.addShape(road118);
R118.quaternion.setFromEuler(-0, -0.1,-0.1);
R118.position.set(-424.6, -5.7, 597.6);
world.addBody(R118);


//____119
const r119 = jmi1.clone();
r119.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r119.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r119.position.set(-2, 0, 0);
scene.add(r119)
//__physics 2
const road119 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R119 = new CANNON.Body({
  mass: 0,
})

R119.addShape(road119);
R119.quaternion.setFromEuler(-0, -0.2,-0.1);
R119.position.set(-415.6,-6.6, 598.9);
world.addBody(R119);

//____120
const r120 = jmi1.clone();
r120.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r120.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r120.position.set(-2, 0, 0);
scene.add(r120)
//__physics 2
const road120 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R120 = new CANNON.Body({
  mass: 0,
})

R120.addShape(road120);
R120.quaternion.setFromEuler(-0, -0.3,-0.1);
R120.position.set(-406.6,-7.55,601.2);
world.addBody(R120);


//____121
const r121 = jmi1.clone();
r121.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r121.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r121.position.set(-2, 0, 0);
scene.add(r121)
//__physics 2
const road121 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R121 = new CANNON.Body({
  mass: 0,
})

R121.addShape(road121);
R121.quaternion.setFromEuler(-0, -0.5,-0.1);
R121.position.set(-398.6,-8.41,604.5);
world.addBody(R121);


//____122
const r122 = jmi1.clone();
r122.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r122.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r122.position.set(-2, 0, 0);
scene.add(r122)
//__physics 2
const road122 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R122 = new CANNON.Body({
  mass: 0,
})

R122.addShape(road122);
R122.quaternion.setFromEuler(-0, -0.7,-0.1);
R122.position.set(-391.6,-9.25,608.98);
world.addBody(R122);

//____123
const r123 = jmi1.clone();
r123.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r123.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r123.position.set(-2, 0, 0);
scene.add(r123)
//__physics 2
const road123 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R123 = new CANNON.Body({
  mass: 0,
})

R123.addShape(road123);
R123.quaternion.setFromEuler(-0, -0.9,-0.001);
R123.position.set(-385.4,-9.67,615.5);
world.addBody(R123);

//____124
const r124 = jmi1.clone();
r124.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r124.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r124.position.set(-2, 0, 0);
scene.add(r124)
//__physics 2
const road124 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R124 = new CANNON.Body({
  mass: 0,
})

R124.addShape(road124);
R124.quaternion.setFromEuler(-0, -1.1,-0.001);
R124.position.set(-381,-9.67,622.5);
world.addBody(R124);

//____125
const r125 = jmi1.clone();
r125.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r125.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r125.position.set(-2, 0, 0);
scene.add(r125)
//__physics 2
const road125 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R125 = new CANNON.Body({
  mass: 0,
})

R125.addShape(road125);
R125.quaternion.setFromEuler(-0, -1.3,-0.001);
R125.position.set(-378,-9.67,630.5);
world.addBody(R125);


//____126
const r126 = jmi1.clone();
r126.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r126.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r126.position.set(-2, 0, 0);
scene.add(r126)
//__physics 2
const road126 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R126 = new CANNON.Body({
  mass: 0,
})

R126.addShape(road126);
R126.quaternion.setFromEuler(-0, -1.4,-0.001);
R126.position.set(-376,-9.67,639);
world.addBody(R126);


//____127
const r127 = jmi1.clone();
r127.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r127.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r127.position.set(-2, 0, 0);
scene.add(r127)
//__physics 2
const road127 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R127 = new CANNON.Body({
  mass: 0,
})

R127.addShape(road127);
R127.quaternion.setFromEuler(-0, -1.4,-0.001);
R127.position.set(-374.4,-9.67,648);
world.addBody(R127);

//____128
const r128 = jmi1.clone();
r128.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r128.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r128.position.set(-2, 0, 0);
scene.add(r128)
//__physics 2
const road128 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R128 = new CANNON.Body({
  mass: 0,
})

R128.addShape(road128);
R128.quaternion.setFromEuler(-0, -1.4,-0.001);
R128.position.set(-372.97,-9.67,657);
world.addBody(R128);

//____129
const r129 = jmi1.clone();
r129.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r129.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r129.position.set(-2, 0, 0);
scene.add(r129)
//__physics 2
const road129 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R129 = new CANNON.Body({
  mass: 0,
})

R129.addShape(road129);
R129.quaternion.setFromEuler(-0, -1.4,-0.001);
R129.position.set(-371.5,-9.67,665.9);
world.addBody(R129);

//____130
const r130 = jmi1.clone();
r130.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r130.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r130.position.set(-2, 0, 0);
scene.add(r130)
//__physics 2
const road130 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R130 = new CANNON.Body({
  mass: 0,
})

R130.addShape(road130);
R130.quaternion.setFromEuler(-0, -1.4,-0.001);
R130.position.set(-370,-9.67,675);
world.addBody(R130);


//____131
const r131 = jmi1.clone();
r131.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r131.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r131.position.set(-2, 0, 0);
scene.add(r131)
//__physics 2
const road131 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R131 = new CANNON.Body({
  mass: 0,
})

R131.addShape(road131);
R131.quaternion.setFromEuler(-0, -1.4,-0.1);
R131.position.set(-368.4,-10.17,684.6);
world.addBody(R131);


//____132
const r132 = jmi1.clone();
r132.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r132.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r132.position.set(-2, 0, 0);
scene.add(r132)
//__physics 2
const road132 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R132 = new CANNON.Body({
  mass: 0,
})

R132.addShape(road132);
R132.quaternion.setFromEuler(-0.08, -1.2,-0.1);
R132.position.set(-366.7,-10.7,691.6);
world.addBody(R132);


//____133
const r133 = jmi1.clone();
r133.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r133.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r133.position.set(-2, 0, 0);
scene.add(r133)
//__physics 2
const road133 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R133 = new CANNON.Body({
  mass: 0,
})

R133.addShape(road133);
R133.quaternion.setFromEuler(-0.08, -1,-0.1);
R133.position.set(-363,-10.94,699);
world.addBody(R133);


//____134
const r134 = jmi1.clone();
r134.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r134.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r134.position.set(-2, 0, 0);
scene.add(r134)
//__physics 2
const road134 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R134 = new CANNON.Body({
  mass: 0,
})

R134.addShape(road134);
R134.quaternion.setFromEuler(-0.08, -0.8,-0.1);
R134.position.set(-357.6,-11.25,706);
world.addBody(R134);


//____135
const r135 = jmi1.clone();
r135.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r135.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r135.position.set(-2, 0, 0);
scene.add(r135)
//__physics 2
const road135 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R135 = new CANNON.Body({
  mass: 0,
})

R135.addShape(road135);
R135.quaternion.setFromEuler(-0.08, -0.6,-0.1);
R135.position.set(-351.7,-11.62,711);
world.addBody(R135);


//____136
const r136 = jmi1.clone();
r136.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r136.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r136.position.set(-2, 0, 0);
scene.add(r136)
//__physics 2
const road136 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R136 = new CANNON.Body({
  mass: 0,
})

R136.addShape(road136);
R136.quaternion.setFromEuler(-0.08, -0.4,-0.1);
R136.position.set(-344.7,-12.12,714.8);
world.addBody(R136);


//____137
const r137 = jmi1.clone();
r137.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r137.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r137.position.set(-2, 0, 0);
scene.add(r137)
//__physics 2
const road137 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R137 = new CANNON.Body({
  mass: 0,
})

R137.addShape(road137);
R137.quaternion.setFromEuler(-0.08, -0.2,-0.1);
R137.position.set(-336.4,-12.78,717.5);
world.addBody(R137);


//____138
const r138 = jmi1.clone();
r138.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r138.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r138.position.set(-2, 0, 0);
scene.add(r138)
//__physics 2
const road138 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R138 = new CANNON.Body({
  mass: 0,
})

R138.addShape(road138);
R138.quaternion.setFromEuler(-0.08, 0.1,-0.1);
R138.position.set(-328.4,-13.55,718);
world.addBody(R138);


//____139
const r139 = jmi1.clone();
r139.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r139.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r139.position.set(-2, 0, 0);
scene.add(r139)
//__physics 2
const road139 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R139 = new CANNON.Body({
  mass: 0,
})

R139.addShape(road139);
R139.quaternion.setFromEuler(-0.025, 0.4,-0.1);
R139.position.set(-319.8,-14.55,715.8);
world.addBody(R139);


//____140
const r140 = jmi1.clone();
r140.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r140.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r140.position.set(-2, 0, 0);
scene.add(r140)
//__physics 2
const road140 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R140 = new CANNON.Body({
  mass: 0,
})

R140.addShape(road140);
R140.quaternion.setFromEuler(-0.025, 0.6,-0.1);
R140.position.set(-312.3,-15.52,711.8);
world.addBody(R140);

//____141
const r141 = jmi1.clone();
r141.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r141.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r141.position.set(-2, 0, 0);
scene.add(r141)
//__physics 2
const road141 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R141 = new CANNON.Body({
  mass: 0,
})

R141.addShape(road141);
R141.quaternion.setFromEuler(-0, 0.8,-0.001);
R141.position.set(-306.5,-15.87,706.8);
world.addBody(R141);

//____142
const r142 = jmi1.clone();
r142.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r142.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r142.position.set(-2, 0, 0);
scene.add(r142)
//__physics 2
const road142 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R142 = new CANNON.Body({
  mass: 0,
})

R142.addShape(road142);
R142.quaternion.setFromEuler(-0, 45,-0.001);
R142.position.set(-301.1,-15.87,700);
world.addBody(R142);


//____143
const r143 = jmi1.clone();
r143.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r143.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r143.position.set(-2, 0, 0);
scene.add(r143)
//__physics 2
const road143 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R143 = new CANNON.Body({
  mass: 0,
})

R143.addShape(road143);
R143.quaternion.setFromEuler(-0, 45,-0.001);
R143.position.set(-296.1,-15.87,692);
world.addBody(R143);


//____144
const r144 = jmi1.clone();
r144.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r144.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r144.position.set(-2, 0, 0);
scene.add(r144)
//__physics 2
const road144 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R144 = new CANNON.Body({
  mass: 0,
})

R144.addShape(road144);
R144.quaternion.setFromEuler(-0, 45,0.1);
R144.position.set(-291.16,-15.37,684);
world.addBody(R144);

//____145
const r145 = jmi1.clone();
r145.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r145.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r145.position.set(-2, 0, 0);
scene.add(r145)
//__physics 2
const road145 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R145 = new CANNON.Body({
  mass: 0,
})

R145.addShape(road145);
R145.quaternion.setFromEuler(-0, 45,0.1);
R145.position.set(-286.17,-14.42,676);
world.addBody(R145);


//____146
const r146 = jmi1.clone();
r146.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r146.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r146.position.set(-2, 0, 0);
scene.add(r146)
//__physics 2
const road146 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R146 = new CANNON.Body({
  mass: 0,
})

R146.addShape(road146);
R146.quaternion.setFromEuler(-0, 0.9,0.1);
R146.position.set(-281.3,-13.55,669);
world.addBody(R146);


//____147
const r147 = jmi1.clone();
r147.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r147.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r147.position.set(-2, 0, 0);
scene.add(r147)
//__physics 2
const road147 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R147 = new CANNON.Body({
  mass: 0,
})

R147.addShape(road147);
R147.quaternion.setFromEuler(-0, 0.7,0.1);
R147.position.set(-275.5,-12.7,663);
world.addBody(R147);


//____148
const r148 = jmi1.clone();
r148.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r148.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r148.position.set(-2, 0, 0);
scene.add(r148)
//__physics 2
const road148 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R148 = new CANNON.Body({
  mass: 0,
})

R148.addShape(road148);
R148.quaternion.setFromEuler(0.02, 0.5,0.1);
R148.position.set(-268,-11.76,658);
world.addBody(R148);


//____149
const r149 = jmi1.clone();
r149.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r149.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r149.position.set(-2, 0, 0);
scene.add(r149)
//__physics 2
const road149 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R149 = new CANNON.Body({
  mass: 0,
})

R149.addShape(road149);
R149.quaternion.setFromEuler(0.02, 0.4,0.017);
R149.position.set(-259.4,-11.12,653.88);
world.addBody(R149);

//____150
const r150 = jmi1.clone();
r150.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r150.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r150.position.set(-2, 0, 0);
scene.add(r150)
//__physics 2
const road150 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R150 = new CANNON.Body({
  mass: 0,
})

R150.addShape(road150);
R150.quaternion.setFromEuler(0.02, 0.4,0.001);
R150.position.set(-250.5,-10.97,650.2);
world.addBody(R150);

//____151
const r151 = jmi1.clone();
r151.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r151.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r151.position.set(-2, 0, 0);
scene.add(r151)
//__physics 2
const road151 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R151 = new CANNON.Body({
  mass: 0,
})

R151.addShape(road151);
R151.quaternion.setFromEuler(0.02, 0.4,0.001);
R151.position.set(-241.5,-10.88,646.4);
world.addBody(R151);


//____152
const r152 = jmi1.clone();
r152.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r152.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r152.position.set(-2, 0, 0);
scene.add(r152)
//__physics 2
const road152 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R152 = new CANNON.Body({
  mass: 0,
})

R152.addShape(road152);
R152.quaternion.setFromEuler(0.02, 0.4,0.001);
R152.position.set(-233,-10.79,642.8);
world.addBody(R152);

//____153
const r153 = jmi1.clone();
r153.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r153.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r153.position.set(-2, 0, 0);
scene.add(r153)
//__physics 2
const road153 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R153 = new CANNON.Body({
  mass: 0,
})

R153.addShape(road153);
R153.quaternion.setFromEuler(0.02, 0.4,0.001);
R153.position.set(-224,-10.694,639);
world.addBody(R153);


//____154
const r154 = jmi1.clone();
r154.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r154.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r154.position.set(-2, 0, 0);
scene.add(r154)
//__physics 2
const road154 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R154 = new CANNON.Body({
  mass: 0,
})

R154.addShape(road154);
R154.quaternion.setFromEuler(0.02, 0.4,0.001);
R154.position.set(-215,-10.61,635.2);
world.addBody(R154);

//____155
const r155 = jmi1.clone();
r155.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r155.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r155.position.set(-2, 0, 0);
scene.add(r155)
//__physics 2
const road155 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R155 = new CANNON.Body({
  mass: 0,
})

R155.addShape(road155);
R155.quaternion.setFromEuler(0.02, 0.4,0.001);
R155.position.set(-206,-10.52,631.4);
world.addBody(R155);

//____156
const r156 = jmi1.clone();
r156.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r156.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r156.position.set(-2, 0, 0);
scene.add(r156)
//__physics 2
const road156 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R156 = new CANNON.Body({
  mass: 0,
})

R156.addShape(road156);
R156.quaternion.setFromEuler(0.02, 0.5,0.001);
R156.position.set(-198,-10.43,627.6);
world.addBody(R156);


//____157
const r157 = jmi1.clone();
r157.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r157.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r157.position.set(-2, 0, 0);
scene.add(r157)
//__physics 2
const road157 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R157 = new CANNON.Body({
  mass: 0,
})

R157.addShape(road157);
R157.quaternion.setFromEuler(0.02, 0.6,0.001);
R157.position.set(-190,-10.33,622.7);
world.addBody(R157);


//____158
const r158 = jmi1.clone();
r158.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r158.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r158.position.set(-2, 0, 0);
scene.add(r158)
//__physics 2
const road158 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R158 = new CANNON.Body({
  mass: 0,
})

R158.addShape(road158);
R158.quaternion.setFromEuler(0.02, 0.7,0.001);
R158.position.set(-183,-10.21,617.5);
world.addBody(R158);


//____159
const r159 = jmi1.clone();
r159.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r159.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r159.position.set(-2, 0, 0);
scene.add(r159)
//__physics 2
const road159 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R159 = new CANNON.Body({
  mass: 0,
})

R159.addShape(road159);
R159.quaternion.setFromEuler(0.02, 0.8,0.001);
R159.position.set(-176.5,-10.08,611.5);
world.addBody(R159);

//____160
const r160 = jmi1.clone();
r160.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r160.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r160.position.set(-2, 0, 0);
scene.add(r160)
//__physics 2
const road160 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R160 = new CANNON.Body({
  mass: 0,
})

R160.addShape(road160);
R160.quaternion.setFromEuler(0.02, 0.9, 0.001);
R160.position.set(-170.3, -9.92, 604.5);
world.addBody(R160);

//____161
const r161 = jmi1.clone();
r161.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r161.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r161.position.set(-2, 0, 0);
scene.add(r161)
//__physics 2
const road161 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R161 = new CANNON.Body({
  mass: 0,
})

R161.addShape(road161);
R161.quaternion.setFromEuler(0.02, 0.9,-0.1);
R161.position.set(-164.2, -10.25, 596.9);
world.addBody(R161);

//____162
const r162 = jmi1.clone();
r162.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r162.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r162.position.set(-2, 0, 0);
scene.add(r162)
//__physics 2
const road162 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R162 = new CANNON.Body({
  mass: 0,
})

R162.addShape(road162);
R162.quaternion.setFromEuler(0.02, 0.9,-0.1);
R162.position.set(-158.8, -10.98, 590);
world.addBody(R162);

//____163
const r163 = jmi1.clone();
r163.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r163.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r163.position.set(-2, 0, 0);
scene.add(r163)
//__physics 2
const road163 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R163 = new CANNON.Body({
  mass: 0,
})

R163.addShape(road163);
R163.quaternion.setFromEuler(0.02, 0.9,-0.1);
R163.position.set(-152.9, -11.78, 582.57);
world.addBody(R163);


//____164
const r164 = jmi1.clone();
r164.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r164.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r164.position.set(-2, 0, 0);
scene.add(r164)
//__physics 2
const road164 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R164 = new CANNON.Body({
  mass: 0,
})

R164.addShape(road164);
R164.quaternion.setFromEuler(0.02, 0.9,-0.1);
R164.position.set(-146.9, -12.59, 575);
world.addBody(R164);

//____165
const r165 = jmi1.clone();
r165.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r165.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r165.position.set(-2, 0, 0);
scene.add(r165)
//__physics 2
const road165 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R165 = new CANNON.Body({
  mass: 0,
})

R165.addShape(road165);
R165.quaternion.setFromEuler(0.02, 0.9,-0.1);
R165.position.set(-141.3, -13.35, 568);
world.addBody(R165);

//____166
const r166 = jmi1.clone();
r166.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r166.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r166.position.set(-2, 0, 0);
scene.add(r166)
//__physics 2
const road166 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R166 = new CANNON.Body({
  mass: 0,
})

R166.addShape(road166);
R166.quaternion.setFromEuler(0.01, 0.8,-0.1);
R166.position.set(-135.3, -14.14, 561.3);
world.addBody(R166);

//____167
const r167 = jmi1.clone();
r167.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r167.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r167.position.set(-2, 0, 0);
scene.add(r167)
//__physics 2
const road167 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R167 = new CANNON.Body({
  mass: 0,
})

R167.addShape(road167);
R167.quaternion.setFromEuler(-0.004, 0.6,-0.1);
R167.position.set(-128.5, -15, 555.6);
world.addBody(R167);

//____168
const r168 = jmi1.clone();
r168.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r168.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r168.position.set(-2, 0, 0);
scene.add(r168)
//__physics 2
const road168 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R168 = new CANNON.Body({
  mass: 0,
})

R168.addShape(road168);
R168.quaternion.setFromEuler(-0.032, 0.4,-0.1);
R168.position.set(-120.8,-15.95, 551.4);
world.addBody(R168);

//____169
const r169 = jmi1.clone();
r169.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r169.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/r_1.png') });
r169.position.set(-2, 0, 0);
scene.add(r169)
//__physics 2
const road169 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R169 = new CANNON.Body({
  mass: 0,
})

R169.addShape(road169);
R169.quaternion.setFromEuler(-0.033, 0.2,-0.1);
R169.position.set(-112,-16.95, 548.7);
world.addBody(R169);

//--------mainRoad-------
//____170
const r170 = jmi1.clone();
r170.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r170.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r170.position.set(-2, 0, 0);
scene.add(r170)
//__physics 2
const road170 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R170 = new CANNON.Body({
  mass: 0,
})

R170.addShape(road170);
R170.quaternion.setFromEuler(-0.033, 0.2,-0);
R170.position.set(-102.5,-17.5, 546.8);
world.addBody(R170);

//____171
const r171 = jmi1.clone();
r171.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r171.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r171.position.set(-2, 0, 0);
scene.add(r171)
//__physics 2
const road171 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R171 = new CANNON.Body({
  mass: 0,
})

R171.addShape(road171);
R171.quaternion.setFromEuler(-0.033, 0.2,-0);
R171.position.set(-93,-17.57, 544.9);
world.addBody(R171);

//____172
const r172 = jmi1.clone();
r172.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r172.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r172.position.set(-2, 0, 0);
scene.add(r172)
//__physics 2
const road172 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R172 = new CANNON.Body({
  mass: 0,
})

R172.addShape(road172);
R172.quaternion.setFromEuler(-0.033, 0.2,-0);
R172.position.set(-84,-17.61, 543.1);
world.addBody(R172);

//____173
const r173 = jmi1.clone();
r173.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r173.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r173.position.set(-2, 0, 0);
scene.add(r173)
//__physics 2
const road173 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R173 = new CANNON.Body({
  mass: 0,
})

R173.addShape(road173);
R173.quaternion.setFromEuler(-0.033, 0.2,-0);
R173.position.set(-75,-17.66, 541.3);
world.addBody(R173);


//____174
const r174 = jmi1.clone();
r174.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r174.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r174.position.set(-2, 0, 0);
scene.add(r174)
//__physics 2
const road174 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R174 = new CANNON.Body({
  mass: 0,
})

R174.addShape(road174);
R174.quaternion.setFromEuler(-0.033, 0.3,0.1);
R174.position.set(-66.4,-17.26, 539.09);
world.addBody(R174);

//____175
const r175 = jmi1.clone();
r175.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r175.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r175.position.set(-2, 0, 0);
scene.add(r175)
//__physics 2
const road175 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R175 = new CANNON.Body({
  mass: 0,
})

R175.addShape(road175);
R175.quaternion.setFromEuler(-0.039, 0.4,0.1);
R175.position.set(-57.4,-16.42, 535.8);
world.addBody(R175);

//____176
const r176 = jmi1.clone();
r176.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r176.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r176.position.set(-2, 0, 0);
scene.add(r176)
//__physics 2
const road176 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R176 = new CANNON.Body({
  mass: 0,
})

R176.addShape(road176);
R176.quaternion.setFromEuler(-0.045, 0.5,0.1);
R176.position.set(-48.8,-15.63, 531.62);
world.addBody(R176);

//____177
const r177 = jmi1.clone();
r177.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r177.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r177.position.set(-2, 0, 0);
scene.add(r177)
//__physics 2
const road177 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R177 = new CANNON.Body({
  mass: 0,
})

R177.addShape(road177);
R177.quaternion.setFromEuler(-0.053, 0.6, 0.1);
R177.position.set(-41, -14.95, 526.8);
world.addBody(R177);


//____178
const r178 = jmi1.clone();
r178.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r178.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r178.position.set(-2, 0, 0);
scene.add(r178)
//__physics 2
const road178 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R178 = new CANNON.Body({
  mass: 0,
})

R178.addShape(road178);
R178.quaternion.setFromEuler(-0.053, 0.6, 0.0);
R178.position.set(-32.9, -14.74, 521.27);
world.addBody(R178);

//____179
const r179 = jmi1.clone();
r179.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r179.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r179.position.set(-2, 0, 0);
scene.add(r179)
//__physics 2
const road179 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R179 = new CANNON.Body({
  mass: 0,
})

R179.addShape(road179);
R179.quaternion.setFromEuler(-0.053, 0.6, 0.0);
R179.position.set(-25, -15.02, 515.9);
world.addBody(R179);

//____180
const r180 = jmi1.clone();
r180.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r180.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r180.position.set(-2, 0, 0);
scene.add(r180)
//__physics 2
const road180 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R180 = new CANNON.Body({
  mass: 0,
})

R180.addShape(road180);
R180.quaternion.setFromEuler(-0.053, 0.6, 0.0);
R180.position.set(-18, -15.27, 511.13);
world.addBody(R180);

//____181
const r181 = jmi1.clone();
r181.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r181.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r181.position.set(-2, 0, 0);
scene.add(r181)
//__physics 2
const road181 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R181 = new CANNON.Body({
  mass: 0,
})

R181.addShape(road181);
R181.quaternion.setFromEuler(-0.053, 0.6, 0.1);
R181.position.set(-10, -15.07, 505.69);
world.addBody(R181);

//____182
const r182 = jmi1.clone();
r182.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r182.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r182.position.set(-2, 0, 0);
scene.add(r182)
//__physics 2
const road182 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R182 = new CANNON.Body({
  mass: 0,
})

R182.addShape(road182);
R182.quaternion.setFromEuler(-0.053, 0.6, 0.1);
R182.position.set(-2,-14.4,500.2);
world.addBody(R182);

//____183
const r183 = jmi1.clone();
r183.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r183.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r183.position.set(-2, 0, 0);
scene.add(r183)
//__physics 2
const road183 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R183 = new CANNON.Body({
  mass: 0,
})

R183.addShape(road183);
R183.quaternion.setFromEuler(-0.05, 0.5, 0.1);
R183.position.set(5.6,-13.74,495.53);
world.addBody(R183);


//____184
const r184 = jmi1.clone();
r184.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r184.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r184.position.set(-2, 0, 0);
scene.add(r184)
//__physics 2
const road184 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R184 = new CANNON.Body({
  mass: 0,
})

R184.addShape(road184);
R184.quaternion.setFromEuler(-0.03, 0.38, 0.1);
R184.position.set(14,-12.97,491.6);
world.addBody(R184);

//____185
const r185 = jmi1.clone();
r185.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r185.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r185.position.set(-2, 0, 0);
scene.add(r185)
//__physics 2
const road185 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R185 = new CANNON.Body({
  mass: 0,
})

R185.addShape(road185);
R185.quaternion.setFromEuler(-0.02, 0.28, 0.1);
R185.position.set(23,-12.1,488.5);
world.addBody(R185);

//____186
const r186 = jmi1.clone();
r186.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r186.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r186.position.set(-2, 0, 0);
scene.add(r186)
//__physics 2
const road186 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R186 = new CANNON.Body({
  mass: 0,
})

R186.addShape(road186);
R186.quaternion.setFromEuler(-0.01, 0.18, 0.1);
R186.position.set(32,-11.21,486.4);
world.addBody(R186);

//____187
const r187 = jmi1.clone();
r187.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r187.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r187.position.set(-2, 0, 0);
scene.add(r187)
//__physics 2
const road187 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R187 = new CANNON.Body({
  mass: 0,
})

R187.addShape(road187);
R187.quaternion.setFromEuler(0.004, 0.08, 0.1);
R187.position.set(41,-10.31,485.23);
world.addBody(R187);

//____188
const r188 = jmi1.clone();
r188.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r188.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r8.png') });
r188.position.set(-2, 0, 0);
scene.add(r188)
//__physics 2
const road188 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R188 = new CANNON.Body({
  mass: 0,
})

R188.addShape(road188);
R188.quaternion.setFromEuler(0.006,-0.01, 0);
R188.position.set(50.6,-9.83,485);
world.addBody(R188);

//____189
const r189 = jmi1.clone();
r189.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r189.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r189.position.set(-2, 0, 0);
scene.add(r189)
//__physics 2
const road189 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R189 = new CANNON.Body({
  mass: 0,
})

R189.addShape(road189);
R189.quaternion.setFromEuler(0,-0.1, 0);
R189.position.set(60,-9.83,485.43);
world.addBody(R189);

//____190
const r190 = jmi1.clone();
r190.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r190.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r190.position.set(-2, 0, 0);
scene.add(r190)
//__physics 2
const road190 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R190 = new CANNON.Body({
  mass: 0,
})

R190.addShape(road190);
R190.quaternion.setFromEuler(0.006,-2.3, 0);
R190.position.set(51,-9.83,480.6);
world.addBody(R190);

//____191
const r191 = jmi1.clone();
r191.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r191.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r191.position.set(-2, 0, 0);
scene.add(r191)
//__physics 2
const road191 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R191 = new CANNON.Body({
  mass: 0,
})

R191.addShape(road191);
R191.quaternion.setFromEuler(0.006,-2.3, 0);
R191.position.set(56.97,-9.81,474);
world.addBody(R191);

//____192
const r192 = jmi1.clone();
r192.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r192.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r192.position.set(-2, 0, 0);
scene.add(r192)
//__physics 2
const road192 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R192 = new CANNON.Body({
  mass: 0,
})

R192.addShape(road192);
R192.quaternion.setFromEuler(0.006,-2.1, 0);
R192.position.set(62.16,-9.78,467);
world.addBody(R192);


//____193
const r193 = jmi1.clone();
r193.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r193.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r8.png') });
r193.position.set(-2, 0, 0);
scene.add(r193)
//__physics 2
const road193 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R193 = new CANNON.Body({
  mass: 0,
})

R193.addShape(road193);
R193.quaternion.setFromEuler(0.006,-1.9, 0);
R193.position.set(65.6,-9.76,460);
world.addBody(R193);

//____194
const r194 = jmi1.clone();
r194.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r194.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r194.position.set(-2, 0, 0);
scene.add(r194)
//__physics 2
const road194 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R194 = new CANNON.Body({
  mass: 0,
})

R194.addShape(road194);
R194.quaternion.setFromEuler(0.006,-1.3, 0);
R194.position.set(68,-9.8,463);
world.addBody(R194);

//____195
const r195 = jmi1.clone();
r195.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r195.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r195.position.set(-2, 0, 0);
scene.add(r195)
//__physics 2
const road195 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R195 = new CANNON.Body({
  mass: 0,
})

R195.addShape(road195);
R195.quaternion.setFromEuler(0.006,-1.1, 0);
R195.position.set(71,-9.83,470);
world.addBody(R195);

//____196
const r196 = jmi1.clone();
r196.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r196.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r196.position.set(-2, 0, 0);
scene.add(r196)
//__physics 2
const road196 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R196 = new CANNON.Body({
  mass: 0,
})

R196.addShape(road196);
R196.quaternion.setFromEuler(0.006,-1, 0);
R196.position.set(75.6,-9.88,478);
world.addBody(R196);

//____197
const r197 = jmi1.clone();
r197.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r197.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r197.position.set(-2, 0, 0);
scene.add(r197)
//__physics 2
const road197 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R197 = new CANNON.Body({
  mass: 0,
})

R197.addShape(road197);
R197.quaternion.setFromEuler(0.006,-0.96, 0);
R197.position.set(79,-9.9,483);
world.addBody(R197);


//____198
const r198 = jmi1.clone();
r198.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r198.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r198.position.set(-2, 0, 0);
scene.add(r198)
//__physics 2
const road198 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R198 = new CANNON.Body({
  mass: 0,
})

R198.addShape(road198);
R198.quaternion.setFromEuler(0,-0.1, 0);
R198.position.set(69,-9.84,486.4);
world.addBody(R198);

//____199
const r199 = jmi1.clone();
r199.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r199.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r199.position.set(-2, 0, 0);
scene.add(r199)
//__physics 2
const road199 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R199 = new CANNON.Body({
  mass: 0,
})

R199.addShape(road199);
R199.quaternion.setFromEuler(0,-0.1, 0);
R199.position.set(73,-9.86,486.8);
world.addBody(R199);

//____200
const r200 = jmi1.clone();
r200.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r200.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r8.png') });
r200.position.set(-2, 0, 0);
scene.add(r200)
//__physics 2
const road200 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R200 = new CANNON.Body({
  mass: 0,
})

R200.addShape(road200);
R200.quaternion.setFromEuler(0,-0.1, 0);
R200.position.set(80,-9.89,487.5);
world.addBody(R200);

//____201
const r201 = jmi1.clone();
r201.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r201.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r201.position.set(-2, 0, 0);
scene.add(r201)
//__physics 2
const road201 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R201 = new CANNON.Body({
  mass: 0,
})

R201.addShape(road201);
R201.quaternion.setFromEuler(0,-0.3, 0);
R201.position.set(88,-9.9,488.8);
world.addBody(R201);
//mod

//____202
const r202 = jmi1.clone();
r202.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r202.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r202.position.set(-2, 0, 0);
scene.add(r202)
//__physics 2
const road202 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R202 = new CANNON.Body({
  mass: 0,
})

R202.addShape(road202);
R202.quaternion.setFromEuler(0.006,-1.9, 0);
R202.position.set(68.8,-9.7,451);
world.addBody(R202);

//____203
const r203 = jmi1.clone();
r203.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r203.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r203.position.set(-2, 0, 0);
scene.add(r203)
//__physics 2
const road203 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R203 = new CANNON.Body({
  mass: 0,
})

R203.addShape(road203);
R203.quaternion.setFromEuler(0.006,-1.9,0.05);
R203.position.set(71.9,-9.88,442);
world.addBody(R203);

//____204
const r204 = jmi1.clone();
r204.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r204.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r204.position.set(-2, 0, 0);
scene.add(r204)
//__physics 2
const road204 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R204 = new CANNON.Body({
  mass: 0,
})

R204.addShape(road204);
R204.quaternion.setFromEuler(0.006,-1.9,0.05);
R204.position.set(75,-10.3,433);
world.addBody(R204);

//____205
const r205 = jmi1.clone();
r205.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r205.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r205.position.set(-2, 0, 0);
scene.add(r205)
//__physics 2
const road205 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R205 = new CANNON.Body({
  mass: 0,
})

R205.addShape(road204);
R205.quaternion.setFromEuler(0.006,-1.9,0.09);
R205.position.set(78.1,-10.9,424);
world.addBody(R205);

//____206
const r206 = jmi1.clone();
r206.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r206.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r206.position.set(-2, 0, 0);
scene.add(r206)
//__physics 2
const road206 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R206 = new CANNON.Body({
  mass: 0,
})

R206.addShape(road206);
R206.quaternion.setFromEuler(0.006,-1.9,0.09);
R206.position.set(81.2,-11.7,415);
world.addBody(R206);

//____207
const r207 = jmi1.clone();
r207.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r207.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r207.position.set(-2, 0, 0);
scene.add(r207)
//__physics 2
const road207 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R207 = new CANNON.Body({
  mass: 0,
})

R207.addShape(road207);
R207.quaternion.setFromEuler(0.006,-1.9,0.09);
R207.position.set(84.3,-12.5,406);
world.addBody(R207);


//____208
const r208 = jmi1.clone();
r208.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r208.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r208.position.set(-2, 0, 0);
scene.add(r208)
//__physics 2
const road208 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R208 = new CANNON.Body({
  mass: 0,
})

R208.addShape(road208);
R208.quaternion.setFromEuler(0.006,-1.9,0);
R208.position.set(87.4,-12.9,397);
world.addBody(R208);


//____209
const r209 = jmi1.clone();
r209.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r209.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r209.position.set(-2, 0, 0);
scene.add(r209)
//__physics 2
const road209 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R209 = new CANNON.Body({
  mass: 0,
})

R209.addShape(road209);
R209.quaternion.setFromEuler(0.006,-1.9,0);
R209.position.set(90.5,-12.86,388);
world.addBody(R209);

//____210
const r210 = jmi1.clone();
r210.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r210.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r210.position.set(-2, 0, 0);
scene.add(r210)
//__physics 2
const road210 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R210 = new CANNON.Body({
  mass: 0,
})

R210.addShape(road210);
R210.quaternion.setFromEuler(0.006,-1.9,0);
R210.position.set(93.57,-12.81,379);
world.addBody(R210);

//____211
const r211 = jmi1.clone();
r211.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r211.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r211.position.set(-2, 0, 0);
scene.add(r211)
//__physics 2
const road211 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R211 = new CANNON.Body({
  mass: 0,
})

R211.addShape(road211);
R211.quaternion.setFromEuler(0.006,-1.9,0);
R211.position.set(96.68,-12.76,370);
world.addBody(R211);

//____212
const r212 = jmi1.clone();
r212.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r212.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r212.position.set(-2, 0, 0);
scene.add(r212)
//__physics 2
const road212 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R212 = new CANNON.Body({
  mass: 0,
})

R212.addShape(road212);
R212.quaternion.setFromEuler(-0.018,-1.7,-0.08);
R212.position.set(98.8,-12.45,361);
world.addBody(R212);

//____213
const r213 = jmi1.clone();
r213.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r213.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r213.position.set(-2, 0, 0);
scene.add(r213)
//__physics 2
const road213 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R213 = new CANNON.Body({
  mass: 0,
})

R213.addShape(road213);
R213.quaternion.setFromEuler(-0.018,-1.7,-0.08);
R213.position.set(100,-11.9,352);
world.addBody(R213);

//____214
const r214 = jmi1.clone();
r214.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r214.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r214.position.set(-2, 0, 0);
scene.add(r214)
//__physics 2
const road214 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R214 = new CANNON.Body({
  mass: 0,
})

R214.addShape(road214);
R214.quaternion.setFromEuler(-0.01,-1.6,-0.08);
R214.position.set(100.76,-11.31,343);
world.addBody(R214);


//____215
const r215 = jmi1.clone();
r215.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r215.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r215.position.set(-2, 0, 0);
scene.add(r215)
//__physics 2
const road215 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R215 = new CANNON.Body({
  mass: 0,
})

R215.addShape(road215);
R215.quaternion.setFromEuler(-0.01,-1.6,-0.08);
R215.position.set(101.07,-10.64,333.5);
world.addBody(R215);

//____216
const r216 = jmi1.clone();
r216.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r216.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r216.position.set(-2, 0, 0);
scene.add(r216)
//__physics 2
const road216 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R216 = new CANNON.Body({
  mass: 0,
})

R216.addShape(road216);
R216.quaternion.setFromEuler(-0.01,-1.6,-0.08);
R216.position.set(101.35,-9.98,324);
world.addBody(R216);

//____217
const r217 = jmi1.clone();
r217.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r217.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r217.position.set(-2, 0, 0);
scene.add(r217)
//__physics 2
const road217 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R217 = new CANNON.Body({
  mass: 0,
})

R217.addShape(road217);
R217.quaternion.setFromEuler(-0.01,-1.6,-0.08);
R217.position.set(101.65,-9.32,314.5);
world.addBody(R217);

//____218
const r218 = jmi1.clone();
r218.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r218.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r218.position.set(-2, 0, 0);
scene.add(r218)
//__physics 2
const road218 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R218 = new CANNON.Body({
  mass: 0,
})

R218.addShape(road218);
R218.quaternion.setFromEuler(0.09,-1.8,-0.08);
R218.position.set(102.85,-8.22,305.5);
world.addBody(R218);

//____219
const r219 = jmi1.clone();
r219.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r219.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r219.position.set(-2, 0, 0);
scene.add(r219)
//__physics 2
const road219 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R219 = new CANNON.Body({
  mass: 0,
})

R219.addShape(road219);
R219.quaternion.setFromEuler(0.09,-1.8,-0.08);
R219.position.set(104.92,-6.69,296.7);
world.addBody(R219);

//____220
const r220 = jmi1.clone();
r220.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r220.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r220.position.set(-2, 0, 0);
scene.add(r220)
//__physics 2
const road220 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R220 = new CANNON.Body({
  mass: 0,
})

R220.addShape(road220);
R220.quaternion.setFromEuler(0.09,-1.8,-0.08);
R220.position.set(107,-5.18,288);
world.addBody(R220);

//____221
const r221 = jmi1.clone();
r221.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r221.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r221.position.set(-2, 0, 0);
scene.add(r221)
//__physics 2
const road221 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R221 = new CANNON.Body({
  mass: 0,
})

R221.addShape(road221);
R221.quaternion.setFromEuler(0.09,-1.8,0.002);
R221.position.set(109.26,-3.94,278.5);
world.addBody(R221);

//____222
const r222 = jmi1.clone();
r222.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r222.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r222.position.set(-2, 0, 0);
scene.add(r222)
//__physics 2
const road222 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R222 = new CANNON.Body({
  mass: 0,
})

R222.addShape(road222);
R222.quaternion.setFromEuler(0.09,-1.8,0);
R222.position.set(111.5,-3.1,269);
world.addBody(R222);

//____223
const r223 = jmi1.clone();
r223.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r223.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r223.position.set(-2, 0, 0);
scene.add(r223)
//__physics 2
const road223 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R223 = new CANNON.Body({
  mass: 0,
})

R223.addShape(road223);
R223.quaternion.setFromEuler(0.09,-1.8,0);
R223.position.set(113.6,-2.29,260);
world.addBody(R223);

//____224
const r224 = jmi1.clone();
r224.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r224.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r224.position.set(-2, 0, 0);
scene.add(r224)
//__physics 2
const road224 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R224 = new CANNON.Body({
  mass: 0,
})

R224.addShape(road224);
R224.quaternion.setFromEuler(0.09,-1.6,0);
R224.position.set(114.9,-1.48,251);
world.addBody(R224);

//____225
const r225 = jmi1.clone();
r225.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r225.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r225.position.set(-2, 0, 0);
scene.add(r225)
//__physics 2
const road225 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R225 = new CANNON.Body({
  mass: 0,
})

R225.addShape(road225);
R225.quaternion.setFromEuler(0.09,-1.6,0);
R225.position.set(115.2,-0.62,241.5);
world.addBody(R225);

//____226
const r226 = jmi1.clone();
r226.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r226.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r226.position.set(-2, 0, 0);
scene.add(r226)
//__physics 2
const road226 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R226 = new CANNON.Body({
  mass: 0,
})

R226.addShape(road226);
R226.quaternion.setFromEuler(0.09,-1.6,0);
R226.position.set(115.5,0.23,232);
world.addBody(R226);

//____227
const r227 = jmi1.clone();
r227.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r227.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r227.position.set(-2, 0, 0);
scene.add(r227)
//__physics 2
const road227 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R227 = new CANNON.Body({
  mass: 0,
})

R227.addShape(road227);
R227.quaternion.setFromEuler(0,-1.6,0);
R227.position.set(115.75,0.66,222.5);
world.addBody(R227);

//____228
const r228 = jmi1.clone();
r228.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r228.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r228.position.set(-2, 0, 0);
scene.add(r228)
//__physics 2
const road228 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R228 = new CANNON.Body({
  mass: 0,
})

R228.addShape(road228);
R228.quaternion.setFromEuler(0,-1.6,0);
R228.position.set(115.99,0.65,213);
world.addBody(R228);

//____229
const r229 = jmi1.clone();
r229.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r229.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r229.position.set(-2, 0, 0);
scene.add(r229)
//__physics 2
const road229 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R229 = new CANNON.Body({
  mass: 0,
})

R229.addShape(road229);
R229.quaternion.setFromEuler(0,-1.6,0);
R229.position.set(116.25,0.64,203.5);
world.addBody(R229);

//____230
const r230 = jmi1.clone();
r230.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r230.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r230.position.set(-2, 0, 0);
scene.add(r230)
//__physics 2
const road230 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R230 = new CANNON.Body({
  mass: 0,
})

R230.addShape(road230);
R230.quaternion.setFromEuler(0, -1.6, 0);
R230.position.set(116.49, 0.63, 194);
world.addBody(R230);

//____231
const r231 = jmi1.clone();
r231.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r231.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r231.position.set(-2, 0, 0);
scene.add(r231)
//__physics 2
const road231 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R231 = new CANNON.Body({
  mass: 0,
})

R231.addShape(road231);
R231.quaternion.setFromEuler(0, -1.6, 0);
R231.position.set(116.75,0.62, 184.5);
world.addBody(R231);

//____232
const r232 = jmi1.clone();
r232.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r232.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r232.position.set(-2, 0, 0);
scene.add(r232)
//__physics 2
const road232 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R232 = new CANNON.Body({
  mass: 0,
})

R232.addShape(road232);
R232.quaternion.setFromEuler(0, -1.6, 0);
R232.position.set(116.99, 0.61, 175);
world.addBody(R232);

//____233
const r233 = jmi1.clone();
r233.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r233.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r233.position.set(-2, 0, 0);
scene.add(r233)
//__physics 2
const road233 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R233 = new CANNON.Body({
  mass: 0,
})

R233.addShape(road233);
R233.quaternion.setFromEuler(0, -1.6, 0);
R233.position.set(117.28,0.6,166);
world.addBody(R233);

//____234
const r234 = jmi1.clone();
r234.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r234.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r234.position.set(-2, 0, 0);
scene.add(r234)
//__physics 2
const road234 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R234 = new CANNON.Body({
  mass: 0,
})

R234.addShape(road234);
R234.quaternion.setFromEuler(0, -1.6, 0);
R234.position.set(117.52,0.59,157);
world.addBody(R234);

//____235
const r235 = jmi1.clone();
r235.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r235.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r235.position.set(-2, 0, 0);
scene.add(r235)
//__physics 2
const road235 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R235 = new CANNON.Body({
  mass: 0,
})

R235.addShape(road235);
R235.quaternion.setFromEuler(0, -1.6, 0);
R235.position.set(117.75,0.58,148);
world.addBody(R235);

//____236
const r236 = jmi1.clone();
r236.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r236.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r236.position.set(-2, 0, 0);
scene.add(r236)
//__physics 2
const road236 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R236 = new CANNON.Body({
  mass: 0,
})

R236.addShape(road236);
R236.quaternion.setFromEuler(0, -1.6, 0);
R236.position.set(117.99,0.57,139);
world.addBody(R236);

//____237
const r237 = jmi1.clone();
r237.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r237.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r237.position.set(-2, 0, 0);
scene.add(r237)
//__physics 2
const road237 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R237 = new CANNON.Body({
  mass: 0,
})

R237.addShape(road237);
R237.quaternion.setFromEuler(0, -1.6, 0);
R237.position.set(118.27,0.56,130);
world.addBody(R237);

//____238
const r238 = jmi1.clone();
r238.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r238.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r238.position.set(-2, 0, 0);
scene.add(r238)
//__physics 2
const road238 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R238 = new CANNON.Body({
  mass: 0,
})

R238.addShape(road238);
R238.quaternion.setFromEuler(0, -1.6, 0);
R238.position.set(118.49,0.55,121);
world.addBody(R238);

//____239
const r239 = jmi1.clone();
r239.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r239.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r239.position.set(-2, 0, 0);
scene.add(r239)
//__physics 2
const road239 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R239 = new CANNON.Body({
  mass: 0,
})

R239.addShape(road239);
R239.quaternion.setFromEuler(0, -1.6, 0);
R239.position.set(118.74,0.54,112);
world.addBody(R239);

//____240
const r240 = jmi1.clone();
r240.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r240.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r240.position.set(-2, 0, 0);
scene.add(r240)
//__physics 2
const road240 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R240 = new CANNON.Body({
  mass: 0,
})

R240.addShape(road240);
R240.quaternion.setFromEuler(0, -1.6, 0);
R240.position.set(119,0.53,102.4);
world.addBody(R240);

//____241
const r241 = jmi1.clone();
r241.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r241.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r241.position.set(-2, 0, 0);
scene.add(r241)
//__physics 2
const road241 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R241 = new CANNON.Body({
  mass: 0,
})

R241.addShape(road241);
R241.quaternion.setFromEuler(0, -1.6, 0);
R241.position.set(119.3,0.52,93);
world.addBody(R241);

//____242
const r242 = jmi1.clone();
r242.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r242.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r8.png') });
r242.position.set(-2, 0, 0);
scene.add(r242)
//__physics 2
const road242 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R242 = new CANNON.Body({
  mass: 0,
})

R242.addShape(road242);
R242.quaternion.setFromEuler(0, -1.6, 0);
R242.position.set(119.5,0.51,83.3);
world.addBody(R242);

//____243
const r243 = jmi1.clone();
r243.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r243.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r243.position.set(-2, 0, 0);
scene.add(r243)
//__physics 2
const road243 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R243 = new CANNON.Body({
  mass: 0,
})

R243.addShape(road243);
R243.quaternion.setFromEuler(0, -1.6,-0.05);
R243.position.set(119.85,0.71,74);
world.addBody(R243);

//____244
const r244 = jmi1.clone();
r244.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r244.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r244.position.set(-2, 0, 0);
scene.add(r244)
//__physics 2
const road244 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R244 = new CANNON.Body({
  mass: 0,
})

R244.addShape(road244);
R244.quaternion.setFromEuler(0, -1.6,-0.05);
R244.position.set(120.1,1.15,65);
world.addBody(R244);

//____245
const r245 = jmi1.clone();
r245.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r245.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r245.position.set(-2, 0, 0);
scene.add(r245)
//__physics 2
const road245 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R245 = new CANNON.Body({
  mass: 0,
})

R245.addShape(road245);
R245.quaternion.setFromEuler(0.07, -1.4,-0.05);
R245.position.set(119.55,1.9,56);
world.addBody(R245);

//____246
const r246 = jmi1.clone();
r246.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r246.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r8.png') });
r246.position.set(-2, 0, 0);
scene.add(r246)
//__physics 2
const road246 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R246 = new CANNON.Body({
  mass: 0,
})

R246.addShape(road246);
R246.quaternion.setFromEuler(0.13, -1.2,-0.05);
R246.position.set(117,3.28,47);
world.addBody(R246);

//____247
const r247 = jmi1.clone();
r247.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r247.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r247.position.set(-2, 0, 0);
scene.add(r247)
//__physics 2
const road247 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R247 = new CANNON.Body({
  mass: 0,
})

R247.addShape(road247);
R247.quaternion.setFromEuler(0.13, -1.1,-0);
R247.position.set(113.26,4.63,38.5);
world.addBody(R247);

//____248
const r248 = jmi1.clone();
r248.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r248.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r248.position.set(-2, 0, 0);
scene.add(r248)
//__physics 2
const road248 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R248 = new CANNON.Body({
  mass: 0,
})

R248.addShape(road248);
R248.quaternion.setFromEuler(0.13,-1,-0);
R248.position.set(108.9,5.6,31.1);
world.addBody(R248);


//____249
const r249 = jmi1.clone();
r249.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r249.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r249.position.set(-2, 0, 0);
scene.add(r249)
//__physics 2
const road249 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R249 = new CANNON.Body({
  mass: 0,
})

R249.addShape(road249);
R249.quaternion.setFromEuler(0,-1,-0.18);
R249.position.set(107,6.19,28.15);
world.addBody(R249);

//____250
const r250 = jmi1.clone();
r250.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r250.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r250.position.set(-2, 0, 0);
scene.add(r250)
//__physics 2
const road250 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R250 = new CANNON.Body({
  mass: 0,
})

R250.addShape(road250);
R250.quaternion.setFromEuler(0.09,-0.8,-0.2);
R250.position.set(102.1,8,22.1);
world.addBody(R250);

//____251
const r251 = jmi1.clone();
r251.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r251.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r251.position.set(-2, 0, 0);
scene.add(r251)
//__physics 2
const road251 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R251 = new CANNON.Body({
  mass: 0,
})

R251.addShape(road251);
R251.quaternion.setFromEuler(0.09,-0.8,0.06);
R251.position.set(95.5,9.29,15.4);
world.addBody(R251);

//____252
const r252 = jmi1.clone();
r252.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r252.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r252.position.set(-2, 0, 0);
scene.add(r252)
//__physics 2
const road252 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R252 = new CANNON.Body({
  mass: 0,
})

R252.addShape(road252);
R252.quaternion.setFromEuler(0.075,-0.6,0.06);
R252.position.set(88.6,9.23,9.5);
world.addBody(R252);

//____253
const r253 = jmi1.clone();
r253.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r253.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r253.position.set(-2, 0, 0);
scene.add(r253)
//__physics 2
const road253 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R253 = new CANNON.Body({
  mass: 0,
})

R253.addShape(road253);
R253.quaternion.setFromEuler(0.05,-0.4,0.06);
R253.position.set(81,8.98,5.3);
world.addBody(R253);

//____254
const r254 = jmi1.clone();
r254.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r254.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r254.position.set(-2, 0, 0);
scene.add(r254)
//__physics 2
const road254 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R254 = new CANNON.Body({
  mass: 0,
})

R254.addShape(road254);
R254.quaternion.setFromEuler(0.03,-0.2,0.08);
R254.position.set(72.4,8.45,2.5);
world.addBody(R254);

//____255
const r255 = jmi1.clone();
r255.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r255.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r255.position.set(-2, 0, 0);
scene.add(r255)
//__physics 2
const road255 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R255 = new CANNON.Body({
  mass: 0,
})

R255.addShape(road255);
R255.quaternion.setFromEuler(0.01,-0,0.08);
R255.position.set(63.4,7.75,1.55);
world.addBody(R255);

//____256
const r256 = jmi1.clone();
r256.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r256.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r256.position.set(-2, 0, 0);
scene.add(r256)
//__physics 2
const road256 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R256 = new CANNON.Body({
  mass: 0,
})

R256.addShape(road256);
R256.quaternion.setFromEuler(0.01,-0,0.1);
R256.position.set(54,6.9,1.55);
world.addBody(R256);

//____257
const r257 = jmi1.clone();
r257.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r257.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r257.position.set(-2, 0, 0);
scene.add(r257)
//__physics 2
const road257 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R257 = new CANNON.Body({
  mass: 0,
})

R257.addShape(road257);
R257.quaternion.setFromEuler(0.01,-0,0.1);
R257.position.set(44.5,5.95,1.55);
world.addBody(R257);

//____258
const r258 = jmi1.clone();
r258.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r258.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r258.position.set(-2, 0, 0);
scene.add(r258)
//__physics 2
const road258 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R258 = new CANNON.Body({
  mass: 0,
})

R258.addShape(road258);
R258.quaternion.setFromEuler(0.01,-0,0.1);
R258.position.set(35,5,1.55);
world.addBody(R258);

//____259
const r259 = jmi1.clone();
r259.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r259.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r259.position.set(-2, 0, 0);
scene.add(r259)
//__physics 2
const road259 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R259 = new CANNON.Body({
  mass: 0,
})

R259.addShape(road259);
R259.quaternion.setFromEuler(0.01,-0.1,0.1);
R259.position.set(26,4.1,1.1);
world.addBody(R259);

//____260
const r260 = jmi1.clone();
r260.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r260.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r260.position.set(-2, 0, 0);
scene.add(r260)
//__physics 2
const road260 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R260 = new CANNON.Body({
  mass: 0,
})

R260.addShape(road260);
R260.quaternion.setFromEuler(0.01,-0.1,0.1);
R260.position.set(18,3.31,0.3);
world.addBody(R260);

//____261
const r261 = jmi1.clone();
r261.material = jmi1.material.clone(); // independent material
//r3.material.color.set('red');

r261.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/roadT/r7.png') });
r261.position.set(-2, 0, 0);
scene.add(r261)
//__physics 2
const road261 = new CANNON.Box(new CANNON.Vec3(5, 0.7, 2.5));

const R261 = new CANNON.Body({
  mass: 0,
})

R261.addShape(road261);
R261.quaternion.setFromEuler(0.01,0.02,0.1);
R261.position.set(9,2.4,-0.14);
world.addBody(R261);





//--------mainroadend---------
  //------roadA


















 
 //___________mapCodeEnd_________

camera.position.z = 15;

meshCamera.add(camera)

renderer.setClearColor("lightcyan");
 
 const controls = new OrbitControls( camera, renderer.domElement );
controls.maxPolarAngle = Math.PI * 0.495;
controls.enableDamping=true;
controls.dampingFactor = 0.05;
//controls.minDistance = 7.0;
//controls.maxDistance = 15.0;



//controls.autoRotate=true;













//===============================

//==== 
function animate(){
  requestAnimationFrame(animate);
  world.fixedStep();
 cannonDebugRenderer.update();
  controls.update();
camera.lookAt(meshCamera.position);
meshCamera.lookAt(camera.position);
  
  
mesh.position.copy(chassisBody.position)
mesh.quaternion.copy(chassisBody.quaternion)
mesh1.position.copy(chassisBody2.position)
mesh1.quaternion.copy(chassisBody2.quaternion)



meshCamera.position.copy(wheelBodyA1.position)
meshCamera.quaternion.copy(wheelBodyA1.quaternion)



model.position.copy(chassisBody.position)
model.quaternion.copy(chassisBody.quaternion)
//model.rotateY(-Math.PI/2.0);

//________________________________
//______placeCodehere.....  

//__________jaminB_______________
/*


*/



//__________jangalB______________


jmi1.position.copy(R1.position)
jmi1.quaternion.copy(R1.quaternion)
r2.position.copy(R2.position)
r2.quaternion.copy(R2.quaternion)

r3.position.copy(R3.position)
r3.quaternion.copy(R3.quaternion)

r4.position.copy(R4.position)
r4.quaternion.copy(R4.quaternion)

r5.position.copy(R5.position)
r5.quaternion.copy(R5.quaternion)

r6.position.copy(R6.position)
r6.quaternion.copy(R6.quaternion)

r7.position.copy(R7.position)
r7.quaternion.copy(R7.quaternion)

r8.position.copy(R8.position)
r8.quaternion.copy(R8.quaternion)

r9.position.copy(R9.position)
r9.quaternion.copy(R9.quaternion)

r10.position.copy(R10.position)
r10.quaternion.copy(R10.quaternion)

r11.position.copy(R11.position)
r11.quaternion.copy(R11.quaternion)

r12.position.copy(R12.position)
r12.quaternion.copy(R12.quaternion)

r13.position.copy(R13.position)
r13.quaternion.copy(R13.quaternion)

r14.position.copy(R14.position)
r14.quaternion.copy(R14.quaternion)

r15.position.copy(R15.position)
r15.quaternion.copy(R15.quaternion)

r16.position.copy(R16.position)
r16.quaternion.copy(R16.quaternion)

r17.position.copy(R17.position)
r17.quaternion.copy(R17.quaternion)

r18.position.copy(R18.position)
r18.quaternion.copy(R18.quaternion)

r19.position.copy(R19.position)
r19.quaternion.copy(R19.quaternion)

r20.position.copy(R20.position)
r20.quaternion.copy(R20.quaternion)

r21.position.copy(R21.position)
r21.quaternion.copy(R21.quaternion)

r22.position.copy(R22.position)
r22.quaternion.copy(R22.quaternion)

r23.position.copy(R23.position)
r23.quaternion.copy(R23.quaternion)

r24.position.copy(R24.position)
r24.quaternion.copy(R24.quaternion)

r25.position.copy(R25.position)
r25.quaternion.copy(R25.quaternion)

r26.position.copy(R26.position)
r26.quaternion.copy(R26.quaternion)

r27.position.copy(R27.position)
r27.quaternion.copy(R27.quaternion)

r28.position.copy(R28.position)
r28.quaternion.copy(R28.quaternion)

r29.position.copy(R29.position)
r29.quaternion.copy(R29.quaternion)

r30.position.copy(R30.position)
r30.quaternion.copy(R30.quaternion)

r31.position.copy(R31.position)
r31.quaternion.copy(R31.quaternion)

r32.position.copy(R32.position)
r32.quaternion.copy(R32.quaternion)

r33.position.copy(R33.position)
r33.quaternion.copy(R33.quaternion)

r34.position.copy(R34.position)
r34.quaternion.copy(R34.quaternion)

r35.position.copy(R35.position)
r35.quaternion.copy(R35.quaternion)

r36.position.copy(R36.position)
r36.quaternion.copy(R36.quaternion)

r37.position.copy(R37.position)
r37.quaternion.copy(R37.quaternion)

r38.position.copy(R38.position)
r38.quaternion.copy(R38.quaternion)

r39.position.copy(R39.position)
r39.quaternion.copy(R39.quaternion)

r40.position.copy(R40.position)
r40.quaternion.copy(R40.quaternion)

r41.position.copy(R41.position)
r41.quaternion.copy(R41.quaternion)

r42.position.copy(R42.position)
r42.quaternion.copy(R42.quaternion)

r43.position.copy(R43.position)
r43.quaternion.copy(R43.quaternion)

r44.position.copy(R44.position)
r44.quaternion.copy(R44.quaternion)

r45.position.copy(R45.position)
r45.quaternion.copy(R45.quaternion)

r46.position.copy(R46.position)
r46.quaternion.copy(R46.quaternion)

r47.position.copy(R47.position)
r47.quaternion.copy(R47.quaternion)

r48.position.copy(R48.position)
r48.quaternion.copy(R48.quaternion)

r49.position.copy(R49.position)
r49.quaternion.copy(R49.quaternion)

r50.position.copy(R50.position)
r50.quaternion.copy(R50.quaternion)

r51.position.copy(R51.position)
r51.quaternion.copy(R51.quaternion)

r52.position.copy(R52.position)
r52.quaternion.copy(R52.quaternion)

r53.position.copy(R53.position)
r53.quaternion.copy(R53.quaternion)

r54.position.copy(R54.position)
r54.quaternion.copy(R54.quaternion)

r55.position.copy(R55.position)
r55.quaternion.copy(R55.quaternion)

r56.position.copy(R56.position)
r56.quaternion.copy(R56.quaternion)

r57.position.copy(R57.position)
r57.quaternion.copy(R57.quaternion)

r58.position.copy(R58.position)
r58.quaternion.copy(R58.quaternion)

r59.position.copy(R59.position)
r59.quaternion.copy(R59.quaternion)

r60.position.copy(R60.position)
r60.quaternion.copy(R60.quaternion)

r61.position.copy(R61.position)
r61.quaternion.copy(R61.quaternion)

r62.position.copy(R62.position)
r62.quaternion.copy(R62.quaternion)

r63.position.copy(R63.position)
r63.quaternion.copy(R63.quaternion)

r64.position.copy(R64.position)
r64.quaternion.copy(R64.quaternion)

r65.position.copy(R65.position)
r65.quaternion.copy(R65.quaternion)

r66.position.copy(R66.position)
r66.quaternion.copy(R66.quaternion)

r67.position.copy(R67.position)
r67.quaternion.copy(R67.quaternion)

r68.position.copy(R68.position)
r68.quaternion.copy(R68.quaternion)

r69.position.copy(R69.position)
r69.quaternion.copy(R69.quaternion)

r70.position.copy(R70.position)
r70.quaternion.copy(R70.quaternion)

r71.position.copy(R71.position)
r71.quaternion.copy(R71.quaternion)

r72.position.copy(R72.position)
r72.quaternion.copy(R72.quaternion)

r73.position.copy(R73.position)
r73.quaternion.copy(R73.quaternion)

r74.position.copy(R74.position)
r74.quaternion.copy(R74.quaternion)

r75.position.copy(R75.position)
r75.quaternion.copy(R75.quaternion)

r76.position.copy(R76.position)
r76.quaternion.copy(R76.quaternion)

r77.position.copy(R77.position)
r77.quaternion.copy(R77.quaternion)

r78.position.copy(R78.position)
r78.quaternion.copy(R78.quaternion)

r79.position.copy(R79.position)
r79.quaternion.copy(R79.quaternion)

r80.position.copy(R80.position)
r80.quaternion.copy(R80.quaternion)

r81.position.copy(R81.position)
r81.quaternion.copy(R81.quaternion)

r82.position.copy(R82.position)
r82.quaternion.copy(R82.quaternion)

r83.position.copy(R83.position)
r83.quaternion.copy(R83.quaternion)

r84.position.copy(R84.position)
r84.quaternion.copy(R84.quaternion)

r85.position.copy(R85.position)
r85.quaternion.copy(R85.quaternion)

r86.position.copy(R86.position)
r86.quaternion.copy(R86.quaternion)

r87.position.copy(R87.position)
r87.quaternion.copy(R87.quaternion)

r88.position.copy(R88.position)
r88.quaternion.copy(R88.quaternion)

r89.position.copy(R89.position)
r89.quaternion.copy(R89.quaternion)

r90.position.copy(R90.position)
r90.quaternion.copy(R90.quaternion)

r91.position.copy(R91.position)
r91.quaternion.copy(R91.quaternion)

r92.position.copy(R92.position)
r92.quaternion.copy(R92.quaternion)

r93.position.copy(R93.position)
r93.quaternion.copy(R93.quaternion)

r94.position.copy(R94.position)
r94.quaternion.copy(R94.quaternion)

r95.position.copy(R95.position)
r95.quaternion.copy(R95.quaternion)

r96.position.copy(R96.position)
r96.quaternion.copy(R96.quaternion)

r97.position.copy(R97.position)
r97.quaternion.copy(R97.quaternion)

r98.position.copy(R98.position)
r98.quaternion.copy(R98.quaternion)

r99.position.copy(R99.position)
r99.quaternion.copy(R99.quaternion)

r100.position.copy(R100.position)
r100.quaternion.copy(R100.quaternion)

r101.position.copy(R101.position)
r101.quaternion.copy(R101.quaternion)

r102.position.copy(R102.position)
r102.quaternion.copy(R102.quaternion)

r103.position.copy(R103.position)
r103.quaternion.copy(R103.quaternion)

r104.position.copy(R104.position)
r104.quaternion.copy(R104.quaternion)

r105.position.copy(R105.position)
r105.quaternion.copy(R105.quaternion)

r106.position.copy(R106.position)
r106.quaternion.copy(R106.quaternion)

r107.position.copy(R107.position)
r107.quaternion.copy(R107.quaternion)

r108.position.copy(R108.position)
r108.quaternion.copy(R108.quaternion)

r109.position.copy(R109.position)
r109.quaternion.copy(R109.quaternion)

r110.position.copy(R110.position)
r110.quaternion.copy(R110.quaternion)

r111.position.copy(R111.position)
r111.quaternion.copy(R111.quaternion)

r112.position.copy(R112.position)
r112.quaternion.copy(R112.quaternion)

r113.position.copy(R113.position)
r113.quaternion.copy(R113.quaternion)

r114.position.copy(R114.position)
r114.quaternion.copy(R114.quaternion)

r115.position.copy(R115.position)
r115.quaternion.copy(R115.quaternion)

r116.position.copy(R116.position)
r116.quaternion.copy(R116.quaternion)

r117.position.copy(R117.position)
r117.quaternion.copy(R117.quaternion)

r118.position.copy(R118.position)
r118.quaternion.copy(R118.quaternion)

r119.position.copy(R119.position)
r119.quaternion.copy(R119.quaternion)

r120.position.copy(R120.position)
r120.quaternion.copy(R120.quaternion)

r121.position.copy(R121.position)
r121.quaternion.copy(R121.quaternion)

r122.position.copy(R122.position)
r122.quaternion.copy(R122.quaternion)

r123.position.copy(R123.position)
r123.quaternion.copy(R123.quaternion)

r124.position.copy(R124.position)
r124.quaternion.copy(R124.quaternion)

r125.position.copy(R125.position)
r125.quaternion.copy(R125.quaternion)

r126.position.copy(R126.position)
r126.quaternion.copy(R126.quaternion)

r127.position.copy(R127.position)
r127.quaternion.copy(R127.quaternion)

r128.position.copy(R128.position)
r128.quaternion.copy(R128.quaternion)

r129.position.copy(R129.position)
r129.quaternion.copy(R129.quaternion)

r130.position.copy(R130.position)
r130.quaternion.copy(R130.quaternion)

r131.position.copy(R131.position)
r131.quaternion.copy(R131.quaternion)

r132.position.copy(R132.position)
r132.quaternion.copy(R132.quaternion)

r133.position.copy(R133.position)
r133.quaternion.copy(R133.quaternion)

r134.position.copy(R134.position)
r134.quaternion.copy(R134.quaternion)

r135.position.copy(R135.position)
r135.quaternion.copy(R135.quaternion)

r136.position.copy(R136.position)
r136.quaternion.copy(R136.quaternion)

r137.position.copy(R137.position)
r137.quaternion.copy(R137.quaternion)

r138.position.copy(R138.position)
r138.quaternion.copy(R138.quaternion)

r139.position.copy(R139.position)
r139.quaternion.copy(R139.quaternion)

r140.position.copy(R140.position)
r140.quaternion.copy(R140.quaternion)

r141.position.copy(R141.position)
r141.quaternion.copy(R141.quaternion)

r142.position.copy(R142.position)
r142.quaternion.copy(R142.quaternion)

r143.position.copy(R143.position)
r143.quaternion.copy(R143.quaternion)

r144.position.copy(R144.position)
r144.quaternion.copy(R144.quaternion)

r145.position.copy(R145.position)
r145.quaternion.copy(R145.quaternion)

r146.position.copy(R146.position)
r146.quaternion.copy(R146.quaternion)

r147.position.copy(R147.position)
r147.quaternion.copy(R147.quaternion)

r148.position.copy(R148.position)
r148.quaternion.copy(R148.quaternion)

r149.position.copy(R149.position)
r149.quaternion.copy(R149.quaternion)

r150.position.copy(R150.position)
r150.quaternion.copy(R150.quaternion)

r151.position.copy(R151.position)
r151.quaternion.copy(R151.quaternion)

r152.position.copy(R152.position)
r152.quaternion.copy(R152.quaternion)

r153.position.copy(R153.position)
r153.quaternion.copy(R153.quaternion)

r154.position.copy(R154.position)
r154.quaternion.copy(R154.quaternion)

r155.position.copy(R155.position)
r155.quaternion.copy(R155.quaternion)

r156.position.copy(R156.position)
r156.quaternion.copy(R156.quaternion)

r157.position.copy(R157.position)
r157.quaternion.copy(R157.quaternion)

r158.position.copy(R158.position)
r158.quaternion.copy(R158.quaternion)

r159.position.copy(R159.position)
r159.quaternion.copy(R159.quaternion)

r160.position.copy(R160.position)
r160.quaternion.copy(R160.quaternion)

r161.position.copy(R161.position)
r161.quaternion.copy(R161.quaternion)

r162.position.copy(R162.position)
r162.quaternion.copy(R162.quaternion)

r163.position.copy(R163.position)
r163.quaternion.copy(R163.quaternion)

r164.position.copy(R164.position)
r164.quaternion.copy(R164.quaternion)

r165.position.copy(R165.position)
r165.quaternion.copy(R165.quaternion)

r166.position.copy(R166.position)
r166.quaternion.copy(R166.quaternion)

r167.position.copy(R167.position)
r167.quaternion.copy(R167.quaternion)

r168.position.copy(R168.position)
r168.quaternion.copy(R168.quaternion)

r169.position.copy(R169.position)
r169.quaternion.copy(R169.quaternion)
//---------mainRoad---------
r170.position.copy(R170.position)
r170.quaternion.copy(R170.quaternion)

r171.position.copy(R171.position)
r171.quaternion.copy(R171.quaternion)

r172.position.copy(R172.position)
r172.quaternion.copy(R172.quaternion)
r173.position.copy(R173.position)
r173.quaternion.copy(R173.quaternion)

r174.position.copy(R174.position)
r174.quaternion.copy(R174.quaternion)

r175.position.copy(R175.position)
r175.quaternion.copy(R175.quaternion)

r176.position.copy(R176.position)
r176.quaternion.copy(R176.quaternion)

r177.position.copy(R177.position)
r177.quaternion.copy(R177.quaternion)

r178.position.copy(R178.position)
r178.quaternion.copy(R178.quaternion)

r179.position.copy(R179.position)
r179.quaternion.copy(R179.quaternion)

r180.position.copy(R180.position)
r180.quaternion.copy(R180.quaternion)
r181.position.copy(R181.position)
r181.quaternion.copy(R181.quaternion)

r182.position.copy(R182.position)
r182.quaternion.copy(R182.quaternion)

r183.position.copy(R183.position)
r183.quaternion.copy(R183.quaternion)

r184.position.copy(R184.position)
r184.quaternion.copy(R184.quaternion)

r185.position.copy(R185.position)
r185.quaternion.copy(R185.quaternion)

r186.position.copy(R186.position)
r186.quaternion.copy(R186.quaternion)

r187.position.copy(R187.position)
r187.quaternion.copy(R187.quaternion)

r188.position.copy(R188.position)
r188.quaternion.copy(R188.quaternion)

r189.position.copy(R189.position)
r189.quaternion.copy(R189.quaternion)

r190.position.copy(R190.position)
r190.quaternion.copy(R190.quaternion)

r191.position.copy(R191.position)
r191.quaternion.copy(R191.quaternion)

r192.position.copy(R192.position)
r192.quaternion.copy(R192.quaternion)

r193.position.copy(R193.position)
r193.quaternion.copy(R193.quaternion)

r194.position.copy(R194.position)
r194.quaternion.copy(R194.quaternion)

r195.position.copy(R195.position)
r195.quaternion.copy(R195.quaternion)
r196.position.copy(R196.position)
r196.quaternion.copy(R196.quaternion)

r197.position.copy(R197.position)
r197.quaternion.copy(R197.quaternion)

r198.position.copy(R198.position)
r198.quaternion.copy(R198.quaternion)

r199.position.copy(R199.position)
r199.quaternion.copy(R199.quaternion)

r200.position.copy(R200.position)
r200.quaternion.copy(R200.quaternion)

r201.position.copy(R201.position)
r201.quaternion.copy(R201.quaternion)

r202.position.copy(R202.position)
r202.quaternion.copy(R202.quaternion)

r203.position.copy(R203.position)
r203.quaternion.copy(R203.quaternion)

r204.position.copy(R204.position)
r204.quaternion.copy(R204.quaternion)

r205.position.copy(R205.position)
r205.quaternion.copy(R205.quaternion)

r206.position.copy(R206.position)
r206.quaternion.copy(R206.quaternion)

r207.position.copy(R207.position)
r207.quaternion.copy(R207.quaternion)

r208.position.copy(R208.position)
r208.quaternion.copy(R208.quaternion)

r209.position.copy(R209.position)
r209.quaternion.copy(R209.quaternion)

r210.position.copy(R210.position)
r210.quaternion.copy(R210.quaternion)

r211.position.copy(R211.position)
r211.quaternion.copy(R211.quaternion)

r212.position.copy(R212.position)
r212.quaternion.copy(R212.quaternion)

r213.position.copy(R213.position)
r213.quaternion.copy(R213.quaternion)

r214.position.copy(R214.position)
r214.quaternion.copy(R214.quaternion)

r215.position.copy(R215.position)
r215.quaternion.copy(R215.quaternion)

r216.position.copy(R216.position)
r216.quaternion.copy(R216.quaternion)

r217.position.copy(R217.position)
r217.quaternion.copy(R217.quaternion)

r218.position.copy(R218.position)
r218.quaternion.copy(R218.quaternion)

r219.position.copy(R219.position)
r219.quaternion.copy(R219.quaternion)

r220.position.copy(R220.position)
r220.quaternion.copy(R220.quaternion)

r221.position.copy(R221.position)
r221.quaternion.copy(R221.quaternion)

r222.position.copy(R222.position)
r222.quaternion.copy(R222.quaternion)

r223.position.copy(R223.position)
r223.quaternion.copy(R223.quaternion)

r224.position.copy(R224.position)
r224.quaternion.copy(R224.quaternion)

r225.position.copy(R225.position)
r225.quaternion.copy(R225.quaternion)

r226.position.copy(R226.position)
r226.quaternion.copy(R226.quaternion)

r227.position.copy(R227.position)
r227.quaternion.copy(R227.quaternion)
r228.position.copy(R228.position)
r228.quaternion.copy(R228.quaternion)

r229.position.copy(R229.position)
r229.quaternion.copy(R229.quaternion)

r230.position.copy(R230.position)
r230.quaternion.copy(R230.quaternion)

r231.position.copy(R231.position)
r231.quaternion.copy(R231.quaternion)

r232.position.copy(R232.position)
r232.quaternion.copy(R232.quaternion)
r233.position.copy(R233.position)
r233.quaternion.copy(R233.quaternion)

r234.position.copy(R234.position)
r234.quaternion.copy(R234.quaternion)

r235.position.copy(R235.position)
r235.quaternion.copy(R235.quaternion)

r236.position.copy(R236.position)
r236.quaternion.copy(R236.quaternion)

r237.position.copy(R237.position)
r237.quaternion.copy(R237.quaternion)

r238.position.copy(R238.position)
r238.quaternion.copy(R238.quaternion)

r239.position.copy(R239.position)
r239.quaternion.copy(R239.quaternion)

r240.position.copy(R240.position)
r240.quaternion.copy(R240.quaternion)

r241.position.copy(R241.position)
r241.quaternion.copy(R241.quaternion)
r242.position.copy(R242.position)
r242.quaternion.copy(R242.quaternion)

r243.position.copy(R243.position)
r243.quaternion.copy(R243.quaternion)
r244.position.copy(R244.position)
r244.quaternion.copy(R244.quaternion)

r245.position.copy(R245.position)
r245.quaternion.copy(R245.quaternion)

r246.position.copy(R246.position)
r246.quaternion.copy(R246.quaternion)

r247.position.copy(R247.position)
r247.quaternion.copy(R247.quaternion)

r248.position.copy(R248.position)
r248.quaternion.copy(R248.quaternion)

r249.position.copy(R249.position)
r249.quaternion.copy(R249.quaternion)

r250.position.copy(R250.position)
r250.quaternion.copy(R250.quaternion)

r251.position.copy(R251.position)
r251.quaternion.copy(R251.quaternion)

r252.position.copy(R252.position)
r252.quaternion.copy(R252.quaternion)

r253.position.copy(R253.position)
r253.quaternion.copy(R253.quaternion)

r254.position.copy(R254.position)
r254.quaternion.copy(R254.quaternion)

r255.position.copy(R255.position)
r255.quaternion.copy(R255.quaternion)

r256.position.copy(R256.position)
r256.quaternion.copy(R256.quaternion)

r257.position.copy(R257.position)
r257.quaternion.copy(R257.quaternion)

r258.position.copy(R258.position)
r258.quaternion.copy(R258.quaternion)

r259.position.copy(R259.position)
r259.quaternion.copy(R259.quaternion)

r260.position.copy(R260.position)
r260.quaternion.copy(R260.quaternion)

r261.position.copy(R261.position)
r261.quaternion.copy(R261.quaternion)




//---------mainRoadEnd---------
//------roadB


  //world.broadphase = new CANNON.SAPBroadphase(world);
  //world.defaultContactMaterial.friction = 0;
  
  
  // GameControlButton
document.getElementById('m0').style.display='block'  
document.getElementById('m1').style.display='block'
document.getElementById('m2').style.display='block'
document.getElementById('m3').style.display='block' 
document.getElementById('m4').style.display='block' 
document.getElementById('m5').style.display='block'  
document.getElementById('m6').style.display='block'

document.getElementById('fullscreenIcon').style.display='block'

document.getElementById('loader').style.display='none'

document.getElementById('spinner').style.display='none'
document.getElementById('text').style.display='none'

  // GameControlButtonEnd
  



  renderer.render(scene,camera);
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
 
 