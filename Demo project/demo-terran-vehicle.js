import * as THREE from '../jsm/three.module.js';
import { OrbitControls }from './jsm/OrbitControls.js';
import * as CANNON from '../jsm/cannon-es.js';
import CannonDebugRenderer from "./jsm/CannonDebugRenderer.js";
//import { GLTFLoader } from "./jsm/GLTFLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 50000);
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  //alpha: true,
 //premultipliedAlpha: false,
// powerPreference: "low-power"
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
document.body.appendChild(renderer.domElement);
renderer.setClearColor('cyan');
//===================================
var light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);

var light1 = new THREE.PointLight(0xffffff, 0.5);
scene.add(light1);
//======================================
const world = new CANNON.World({
  gravity: new CANNON.Vec3(0, -9.82, 0),
});
const cannonDebugRenderer = new CannonDebugRenderer(scene, world);
//______________________________
const p = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Box(new CANNON.Vec3(100, 1, 100)),
  position: new CANNON.Vec3(-9, -1, 0)
});

world.addBody(p)
//_______





var geometry = new THREE.BoxGeometry(6,1,2); 
 
  var material = new THREE.MeshLambertMaterial( 
  { 
   color: 'red'
  }); 
 
  var mesh = new THREE.Mesh(geometry, material); 
  mesh.position.set(0, 0,0); 
  scene.add(mesh); 
 

var geometry = new THREE.BoxGeometry(4,0.8,2,5,5,5,5); 
 
  var material = new THREE.MeshBasicMaterial( 
  { 
   color:'white',
   wireframe:true
  }); 
 
  var mesh1 = new THREE.Mesh(geometry, material); 
  mesh1.position.set(0, 0,0); 
  scene.add(mesh1); 


const radius = 0.49;

const sphe1= new THREE.Mesh(
  new THREE.SphereGeometry(radius),
  new THREE.MeshBasicMaterial({ color: 'orange',
  wireframe:true,
    
  })
)
scene.add(sphe1)

const sphe2= new THREE.Mesh(
  new THREE.SphereGeometry(radius),
  new THREE.MeshBasicMaterial({ color: 'orange',
  wireframe:true,
    
  })
)
scene.add(sphe2)


const sphe3= new THREE.Mesh(
  new THREE.SphereGeometry(radius),
  new THREE.MeshBasicMaterial({ color: 'orange',
  wireframe:true,
    
  })
)
scene.add(sphe3)


const sphe4= new THREE.Mesh(
  new THREE.SphereGeometry(radius),
  new THREE.MeshBasicMaterial({ color: 'orange',
  wireframe:true,
    
  })
)
scene.add(sphe4)






//carBody start 

const chassisBody1 = new CANNON.Body({ mass: 50,
//axis: new CANNON.Vec3(0,1,0),
 });

//chassisBody1.angularFactor.set(1, 1, 1);

chassisBody1.addShape(new CANNON.Box(new CANNON.Vec3(3, 0.5,1)));
chassisBody1.position.set(15,2,0)





world.addBody(chassisBody1);

const car2 = new CANNON.Box(new CANNON.Vec3(2, 0.4, 1));
//Arnala 4,0.8,2
const chassisBody2 = new CANNON.Body({
  mass: 150 
});




chassisBody2.addShape(car2);
chassisBody2.position.set(0,3,0)
//chassisBody3.position.set(-5,7,-0)

chassisBody2.angularVelocity.set(0, 0.5, 0)
world.addBody(chassisBody2);

//______


//______
const vehicle1 = new CANNON.RaycastVehicle({
  chassisBody: chassisBody1,
});

const vehicle2 = new CANNON.RaycastVehicle({
  chassisBody: chassisBody2,
});
/*
var constraint = new CANNON.LockConstraint(chassisBody1,chassisBody2);
world.addConstraint(constraint);
*/

const pivotA = new CANNON.Vec3(-3,-0.2, 0); // Local pivot on box1
const pivotB = new CANNON.Vec3(3, 0, 0); // Local pivot on box2

// Create the joint
const joint = new CANNON.PointToPointConstraint(chassisBody1, pivotA, chassisBody2, pivotB);

// Add to world
//world.addConstraint(joint);


//Arnal 

//______












//______
//__________wheelOptions_________
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

//_______wheelOptions End _______







//_____________________________


vehicle1.addWheel(wheelOptions);
vehicle2.addWheel(wheelOptions);
  
wheelOptions.chassisConnectionPointLocal.set(-1, 0, 1)
vehicle2.addWheel(wheelOptions)


wheelOptions.chassisConnectionPointLocal.set(-1, 0, -1)
vehicle2.addWheel(wheelOptions)

wheelOptions.chassisConnectionPointLocal.set(1, 0, 1)
vehicle2.addWheel(wheelOptions)

wheelOptions.chassisConnectionPointLocal.set(1, 0, -1)

vehicle2.addWheel(wheelOptions)
  

  
  
  //______1 One
  
  
  
  
  
wheelOptions.chassisConnectionPointLocal.set(0.2, 0, 1)
vehicle1.addWheel(wheelOptions)


wheelOptions.chassisConnectionPointLocal.set(0.2, 0, -1)
vehicle1.addWheel(wheelOptions)

wheelOptions.chassisConnectionPointLocal.set(2, 0, 1)
vehicle1.addWheel(wheelOptions)

wheelOptions.chassisConnectionPointLocal.set(2, 0, -1)

vehicle1.addWheel(wheelOptions)
  
  
  








vehicle1.addToWorld(world);







vehicle2.addToWorld(world);
  

//__________________________





const wheelBodies1 = []
const wheelBodies2 = []

const wheelBodies = []
  
  
  let wi;
   wi = new CANNON.Sphere(0.49)
   
  
   
   
const wheelMaterial = new CANNON.Material('wheel')
const wheelMaterial1 = new CANNON.Material('wheel')
     
vehicle1.wheelInfos.forEach((wheel)=>{
  const cylinderShape = new CANNON.Cylinder(wheel.radius, wheel.radius, wheel.radius / 2, 20)

  const wheelBody = new CANNON.Body({
    mass: 0,
    material: wheelMaterial,
  })
  wheelBody.type = CANNON.Body.KINEMATIC
  wheelBody.collisionFilterGroup= 0
  
  const quaternion = new CANNON.Quaternion().setFromEuler(-Math.PI / 2, 0, 0)
  
  wheelBody.addShape(wi, new CANNON.Vec3(), quaternion)
  wheelBodies1.push(wheelBody)
  world.addBody(wheelBody)
 
  })


//______
world.addEventListener('postStep', () => {
  for (let i = 0; i < vehicle1.wheelInfos.length; i++) {

  vehicle1.updateWheelTransform(i)
  /*  
  const transform = vehicle1.wheelInfos[0].worldTransform
    
    const wheelBody= wheelBodies1[0]
    wheelBody.position.copy(transform.position)
    wheelBody.quaternion.copy(transform.quaternion)
    //-----------
    transform.position.copy(transform.position)
    transform.quaternion.copy(transform.quaternion)
   */ 
    
   //____2 
    const trans1 = vehicle1.wheelInfos[1].worldTransform
    
    const wheelBod1= wheelBodies1[1]
    wheelBod1.position.copy(trans1.position)
    wheelBod1.quaternion.copy(trans1.quaternion)
    //-----------
    trans1.position.copy(trans1.position)
    trans1.quaternion.copy(trans1.quaternion)
    
    
   //____3
    const trans2 = vehicle1.wheelInfos[2].worldTransform
    
    const wheelBod2= wheelBodies1[2]
    wheelBod2.position.copy(trans2.position)
    wheelBod2.quaternion.copy(trans2.quaternion)
    //-----------
    trans2.position.copy(trans2.position)
    trans2.quaternion.copy(trans2.quaternion)
    
    
      //____3
    const trans3 = vehicle1.wheelInfos[3].worldTransform
    
    const wheelBod3= wheelBodies1[3]
    wheelBod3.position.copy(trans3.position)
    wheelBod3.quaternion.copy(trans3.quaternion)
    //-----------
    trans3.position.copy(trans3.position)
    trans3.quaternion.copy(trans3.quaternion)
     
    
        //____3
    const trans4 = vehicle1.wheelInfos[4].worldTransform
    
    const wheelBod4= wheelBodies1[4]
    wheelBod4.position.copy(trans4.position)
    wheelBod4.quaternion.copy(trans4.quaternion)
    //-----------

trans4.position.copy(trans4.position)
trans4.quaternion.copy(trans4.quaternion)   
    
    
    
    
    
    
    
  }
})






//______vehicle2_____

vehicle2.wheelInfos.forEach((wheel)=>{
  const cylinderShape = new CANNON.Cylinder(wheel.radius, wheel.radius, wheel.radius / 2, 20)

  const wheelBody = new CANNON.Body({
    mass: 0,
    material: wheelMaterial,
  })
  wheelBody.type = CANNON.Body.KINEMATIC
  wheelBody.collisionFilterGroup= 0
  
  //const quaternion = new CANNON.Quaternion().setFromEuler(-Math.PI / 2, 0, 0)
  
  const quaternion = new CANNON.Quaternion().setFromEuler(-Math.PI / 2, 0, 0)
  
  
  
  wheelBody.addShape(wi, new CANNON.Vec3(), quaternion)
  wheelBodies2.push(wheelBody)
  world.addBody(wheelBody)
 
  })


//______
world.addEventListener('postStep', () => {
  for (let i = 0; i < vehicle2.wheelInfos.length; i++) {

  vehicle2.updateWheelTransform(i)
    
  const transform = vehicle2.wheelInfos[0].worldTransform
 /*
  const wheelBody = wheelBodies2[0]
  wheelBody.position.copy(transform.position)
  wheelBody.quaternion.copy(transform.quaternion)
  //-----------
 transform.position.copy(transform.position)
transform.quaternion.copy(transform.quaternion)
 */
 
 
   //-----1
   const transform1 = vehicle2.wheelInfos[1].worldTransform
  
  const wheelBody1 = wheelBodies2[1]
  
wheelBody1.position.copy(transform1.position)
wheelBody1.quaternion.copy(transform1.quaternion)
  
sphe1.position.copy(transform1.position)
sphe1.quaternion.copy(transform1.quaternion)

 
 
 
    //-----2
const transform2 = vehicle2.wheelInfos[2].worldTransform
  const wheelBody2 = wheelBodies2[2]
  
  wheelBody2.position.copy(transform2.position)
  wheelBody2.quaternion.copy(transform2.quaternion)

sphe2.position.copy(transform2.position)
sphe2.quaternion.copy(transform2.quaternion)
 
 
 
 
 
     //-----3
const transform3 = vehicle2.wheelInfos[3].worldTransform
 
const wheelBody3 = wheelBodies2[3]
wheelBody3.position.copy(transform3.position)
wheelBody3.quaternion.copy(transform3.quaternion)
 
sphe3.position.copy(transform3.position)
sphe3.quaternion.copy(transform3.quaternion)
 
     //-----4
const transform4 = vehicle2.wheelInfos[4].worldTransform
 
const wheelBody4 = wheelBodies2[4]
wheelBody4.position.copy(transform4.position)
wheelBody4.quaternion.copy(transform4.quaternion)
 
sphe4.position.copy(transform4.position)
sphe4.quaternion.copy(transform4.quaternion)
 
 
 
 
 
 
  


    
    
    
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
  
  const maxForce = 300
  
  
  vehicle2.applyEngineForce(-maxForce, 2)
  vehicle2.applyEngineForce(-maxForce, 3)
});        

move1.addEventListener('touchend', function() {
  
  const maxForce = 0
  
  
  vehicle2.applyEngineForce(-maxForce, 2)
  vehicle2.applyEngineForce(-maxForce, 3)
});






move2.addEventListener('touchstart',function(){
const maxSteerVal = 0.5 ;


vehicle2.setSteeringValue(maxSteerVal, 2)
vehicle2.setSteeringValue(maxSteerVal, 1)
});
move2.addEventListener('touchend',function(){
  const maxSteerVal1 = 0
  vehicle2.setSteeringValue(maxSteerVal1, 2)
  vehicle2.setSteeringValue(maxSteerVal1, 1)
  
  
  
  
});


move3.addEventListener('touchstart', function() {
  const maxSteerVal = 0.5
  vehicle2.setSteeringValue(-maxSteerVal, 2)
  vehicle2.setSteeringValue(-maxSteerVal, 1)
});

move3.addEventListener('touchend', function() {
  const maxSteerVal2 = 0
  vehicle2.setSteeringValue(maxSteerVal2, 2)
  vehicle2.setSteeringValue(maxSteerVal2, 1)
});



move4.addEventListener('touchstart', function() {
  const brakeForce = 5;
vehicle2.setBrake(0, 0)
vehicle2.setBrake(0, 1)
vehicle2.setBrake(0, 2)
vehicle2.setBrake(0, 3)
  vehicle2.setBrake(brakeForce,0)
  vehicle2.setBrake(brakeForce,1)
  vehicle2.setBrake(brakeForce,2)
  vehicle2.setBrake(brakeForce,3)
    
    
    
  });
  
move4.addEventListener('touchend',function(){
  const brakeForce = 0;
  vehicle2.setBrake(0, 0)
  vehicle2.setBrake(0, 1)
  vehicle2.setBrake(0, 2)
  vehicle2.setBrake(0, 3)
  vehicle2.setBrake(brakeForce,0)
  vehicle2.setBrake(brakeForce,1)
  vehicle2.setBrake(brakeForce,2)
  vehicle2.setBrake(brakeForce,3)
    
  
  
})

move5.addEventListener('touchstart', function() {
  const maxForce1 = 300
  vehicle2.applyEngineForce(maxForce1, 2)
  vehicle2.applyEngineForce(maxForce1, 3)
})

move5.addEventListener('touchend', function() {
  const maxForce1 = 0;
  vehicle2.applyEngineForce(maxForce1, 2)
  vehicle2.applyEngineForce(maxForce1, 3)
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
              
                          
  




/*
// Step 2: Create two cube bodies
const boxShape = new CANNON.Box(new CANNON.Vec3(1, 1, 1));

// First cube
const box1Body = new CANNON.Body({
  mass: 1, // movable
  position: new CANNON.Vec3(0, 5, 0),
  shape: boxShape
});

// Second cube
const box2Body = new CANNON.Body({
  mass: 1,
  position: new CANNON.Vec3(8, 5, 0),
  shape: boxShape
});

// Add to world
world.addBody(box1Body);
world.addBody(box2Body);

// Step 3: Add a constraint (joint)
const pivotA = new CANNON.Vec3(3, 0, 0);  // Local pivot on box1
const pivotB = new CANNON.Vec3(-1, 0, 0); // Local pivot on box2

// Create the joint
const joint = new CANNON.PointToPointConstraint(box1Body, pivotA, box2Body, pivotB);

// Add to world
world.addConstraint(joint);

*/

//___________MAP_________________


let vertices,indices;

const terrainGeo = new THREE.BufferGeometry();

var x1 = 0;
var x2 = 0;
var x3 = 0;
var x4 = 0;
var x5 = 0;

var x6 = 0;
var x7 = 0.6;
var x8 = 0.3;
var x9 = 0.4;
var x10 = 0;

var x11 = 0;
var x12 = 0.4;
var x13 = 0.6;
var x14 = 0.3;
var x15 = 0.1;


var x16 = 0.1;
var x17 = 0.1;
var x18 = 0;
var x19 = 0.3;
var x20 = 0;

var x21 = 0;
var x22 = 0.2;
var x23 = 0;
var x24 = 0;
var x25 = 0;




vertices =new Float32Array([

-5,5,x1,//1
-2.5,5,x2,//2
0,5,x3,//3
2.5,5,x4,//4
5,5,x5,//5

-5,2.5,x6,//6
-2.5,2.5,x7,//7

0,2.5,x8,//8

2.5,2.5,x9,//9
5,2.5,x10,//10


-5,0,x11,//11
-2.5,0,x12,//12
0,0,x13,//13
2.5,0,x14,//14
5,0,x15,//15


-5,-2.5,x16,//16
-2.5,-2.5,x17,//17
0,-2.5,x18,//18
2.5,-2.5,x19,//19
5,-2.5,x20,//20


-5,-5,x21,//21
-2.5,-5,x22,//22
 0,-5,x23,//23
2.5,-5,x24,//24
 5,-5, x25,//25



])
indices = [0, 5, 1,
5, 6, 1,

1, 6, 2,
6, 7, 2,

2, 7, 3,
7, 8, 3,
3, 8, 4,
8, 9, 4,
5, 10, 6,


10, 11, 6,
6, 11, 7,
11, 12, 7,


7, 12, 8,
12, 13, 8,
8, 13, 9,
13, 14, 9,
10, 15, 11,

15, 16, 11,
11, 16, 12,

16, 17, 12,

12, 17, 13,

17, 18, 13,

13, 18, 14,

18, 19, 14,
15, 20, 16,
20, 21, 16,

16, 21, 17,
21, 22, 17,
17, 22, 18,
22, 23, 18,

18, 23, 19,
23, 24, 19]

// Three Mesh

terrainGeo.setAttribute(
  'position',new THREE.Float32BufferAttribute(vertices,3));
 

  
terrainGeo.setIndex(indices)
terrainGeo.computeVertexNormals()

const terrainMesh = new THREE.Mesh(
  terrainGeo,
  new THREE.MeshBasicMaterial({ 
    color:'green',
  side: THREE.DoubleSide
    
  })
)
scene.add(terrainMesh)




// Cannon Trimesh
const terrainShape = new CANNON.Trimesh(vertices, indices);

console.log(terrainShape)
const terrainBody = new CANNON.Body({ mass: 0 })
terrainBody.addShape(terrainShape)
//
terrainBody.position.set(0, 0, 0);
terrainBody.quaternion.setFromEuler(-Math.PI /2,0,0);
world.addBody(terrainBody)



//_________seTn


terrainGeo.setIndex(indices);
terrainGeo.computeVertexNormals();

// 4️⃣ Materia




const material1 = new THREE.MeshBasicMaterial({
  color: 'white',
  side: THREE.DoubleSide,
 wireframe:true,
  
});

// 5️⃣ Mesh
const triangleMesh = new THREE.Mesh(terrainGeo, material1);





  
  
  
  


const triangleVerts = [
  new CANNON.Vec3(-5, 5, x1),
  new CANNON.Vec3(-2.5, 5,x2),
  new CANNON.Vec3(0, 5, x3),
  new CANNON.Vec3(2.5, 5,x4),
  new CANNON.Vec3(5, 5,x5),
  new CANNON.Vec3(-5, 2.5,x6),
  new CANNON.Vec3(-2.5, 2.5,x7),
  new CANNON.Vec3(0, 2.5,x8), //8
  new CANNON.Vec3(2.5,2.5,x9),//9
  new CANNON.Vec3(5,2.5,x10),//10
  
  new CANNON.Vec3(-5,0,x11),//11
new CANNON.Vec3(-2.5,0,x12),//12

  new CANNON.Vec3(0, 0,x13),//13
  new CANNON.Vec3(2.5, 0,x14),
  new CANNON.Vec3(5, 0,x15),
new CANNON.Vec3(-5,-2.5,x16),//16
  
new CANNON.Vec3(-2.5, -2.5,x17),
  new CANNON.Vec3(0,-2.5,x18),
  new CANNON.Vec3(2.5, -2.5,x19),
  new CANNON.Vec3(5, -2.5,x20),
  
  
  
  
  
  
  
  
  new CANNON.Vec3(-5, -5,x21),
  new CANNON.Vec3(-2.5, -5,x22),
  new CANNON.Vec3(0, -5,x23),
  new CANNON.Vec3(2.5,-5,x24),
  new CANNON.Vec3(5,-5,x25),
  ];
  const triangleFaces =[[0,5,1,5,6,1,1,6,2,6,7,2,2,7,3,7,8,3,3,8,4,8,9,4,5,10,6,10,11,6,6,11,7,11,12,7,7,12,8,12,13,8,8,13,9,13,14,9,10,15,11,15,16,11,11,16,12,16,17,12,12,17,13,17,18,13,13,18,14,18,19,14,15,20,16,20,21,16,16,21,17,21,22,17,17,22,18,22,23,18,18,23,19,23,24,19]];
  
  const triangleShape = new CANNON.ConvexPolyhedron({ vertices: triangleVerts, 
  faces: triangleFaces 
    
  });
  
  

  
  
  
  const triangleBody = new CANNON.Body({ mass:0});
 
  triangleBody.addShape(triangleShape);
  triangleBody.position.set(0,0, 0);
  
  triangleBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
  world.addBody(triangleBody);
  scene.add(triangleMesh);

//terrain End__________

const boxGeo = new THREE.BoxGeometry(1,1, 1);
const boxMat = new THREE.MeshStandardMaterial({
  color: 0xff0000,
  wireframe: true,
  
});
const boxMesh = new THREE.Mesh(boxGeo, boxMat);


const boxShape = new CANNON.Box(new CANNON.Vec3(0.5,0.5,0.5));
//const boxShape = new CANNON.Sphere(0.5); 


const boxBody = new CANNON.Body({ mass: 1 });
boxBody.addShape(boxShape);
boxBody.position.set(1,5,2);
boxBody.quaternion.setFromEuler(0, 0, 0);

scene.add(boxMesh);
world.addBody(boxBody);

















 
 //___________MAP________________

 
 const controls = new OrbitControls(camera, renderer.domElement);
 
 //controls.autoRotate=true
//mesh1.add(camera);
 camera.position.set(0,1,10);
//=================================== 
function animate(){
  requestAnimationFrame(animate);
  //camera.lookAt(triangleMesh.position);
//camera.lookAt(mesh1.position);

 
controls.update();
 
 
  world.fixedStep();
 // cannonDebugRenderer.update();
 // world.broadphase = new CANNON.SAPBroadphase(world);
  //world.defaultContactMaterial.friction = 0;
  
  
  mesh.position.copy(chassisBody1.position)
  mesh.quaternion.copy(chassisBody1.quaternion)

mesh1.position.copy(chassisBody2.position)
  mesh1.quaternion.copy(chassisBody2.quaternion)
  


  terrainMesh.position.copy(terrainBody.position)
terrainMesh.quaternion.copy(terrainBody.quaternion)

triangleMesh.position.copy(triangleBody.position);
    triangleMesh.quaternion.copy(triangleBody.quaternion);

  
  boxMesh.position.copy(boxBody.position);
boxMesh.quaternion.copy(boxBody.quaternion);

  
  
  
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
animate();
 
 
 