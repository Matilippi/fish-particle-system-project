(function () {

  var fishes = []
  var swimPath = []
  
  var n = 80;  //fra pesci random

  for (var i = 0; i < n; i++) {

    fishes[i] = new Fish()
    swimPath[i] = fishes[i].swimPath([  //MOVIMENTI DEI PESCI // da fare tutto random
      new THREE.Vector3(Math.random() * (150 - (-150)) - 150, Math.random() * (100 - (-100)) - 100, 0), //bl
      new THREE.Vector3(Math.random() * (150 - (-150)) - 150, Math.random() * (100 - (-100)) - 100, 0), //l
      new THREE.Vector3(Math.random() * (150 - (-150)) - 150, Math.random() * (100 - (-100)) - 100, 0), //fl
      new THREE.Vector3(Math.random() * (150 - (-150)) - 150, Math.random() * (100 - (-100)) - 100, 0), //f
      new THREE.Vector3(Math.random() * (150 - (-150)) - 150, Math.random() * (100 - (-100)) - 100, 0), //fr
      new THREE.Vector3(Math.random() * (150 - (-150)) - 150, Math.random() * (100 - (-100)) - 100, 0), //r
      new THREE.Vector3(Math.random() * (150 - (-150)) - 150, Math.random() * (100 - (-100)) - 100, 0), //br
      new THREE.Vector3(Math.random() * (150 - (-150)) - 150, Math.random() * (100 - (-100)) - 100, 0), //b
      new THREE.Vector3(Math.random() * (150 - (-150)) - 150, Math.random() * (100 - (-100)) - 100, 0),

    ])

  }

  var scene = new THREE.Scene()
  var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 )
  var renderer = new THREE.WebGLRenderer({ alpha: true })
  var request;
  renderer.shadowMapEnabled = true;

  var up = new THREE.Vector3(0, 1, 0)
  var axis = new THREE.Vector3()
  var pt, radians, axis, tangent

  var light = new THREE.DirectionalLight(0xffffff, .4)
  light.position.set(20, 30, 130)
  light.castShadow = true
  light.shadowCameraNear = 20;
  light.shadowCameraLeft = 50;
  light.shadowCameraRight = -10;
  light.shadowCameraTop = 100;
  light.shadowCameraBottom = -20;
  var lightTarget = new THREE.Object3D()
  lightTarget.position.set(-55, 0, 100)
  scene.add(lightTarget)
  light.target = lightTarget

  var ambLight = new THREE.AmbientLight(0x404040, 2.2); // soft white light
  scene.add(ambLight);


  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize( window.innerWidth, window.innerHeight ) //dimensioni finestra
  document.querySelector('.goldfish').appendChild(renderer.domElement)


  camera.position.x = -3
  camera.position.y = 0
  camera.position.z = 150


  // Build Group

  var fishObject = []
  var fishCenter = []




  for (var i = 0; i < n; i++) {

    var sizeFish = Math.random() * (0.05 - 0.2) + 0.2;//pesci dmensione random tra 0.3 e 0.05
    fishObject[i] = fishes[i].getFish()
    fishObject[i].scale.set(sizeFish, sizeFish, sizeFish)
    fishObject[i].rotation.set(i, -i - Math.PI / 2, i)

    fishCenter[i] = new THREE.AxesHelper(200)
    fishCenter[i] = new THREE.Object3D()
    fishCenter[i].add(fishObject[i])
    scene.add(fishCenter[i])
  }

  

  var t = 0
  var speed = 0.0000001
  var swimData
  var wiggleValue = 0


  const offset = -1.5707963267948966 // fishObject.rotation.y initial rotation



  var mouse = new THREE.Vector2();    

const geometry = new THREE.SphereGeometry( 3, 3, 0 );
// Materials

const material = new THREE.MeshBasicMaterial()

material.color = new THREE.Color(0xffff00)

const sphere = new THREE.Mesh( geometry, material );




  function onMouseMove(event) {
   
 
    /* mouse.x = ( event.clientX / renderer.domElement.width ) * 2 - 1;
    mouse.y = - ( event.clientY / renderer.domElement.height ) * 2 + 1; */

    mouse.x = ( ( event.clientX - renderer.domElement.offsetLeft ) / renderer.domElement.clientWidth ) * 2 - 1;
    mouse.y = - ( ( event.clientY - renderer.domElement.offsetTop ) / renderer.domElement.clientHeight ) * 2 + 1;
     
  
  var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
  vector.unproject( camera );
  var dir = vector.sub( camera.position ).normalize();
  var distance = - camera.position.z / dir.z;
  var pos = camera.position.clone().add( dir.multiplyScalar( distance ) );
  sphere.position.copy(pos);
  if(Math.trunc(fishCenter[i].position.x)==Math.trunc(mouse.x) && Math.trunc(fishCenter[i].position.y)==Math.trunc(mouse.y) ){//se va sulla sfera un pesce, la sfera viene tolta.
    scene.remove(sphere)
    isPresentSphere=false
    fishObject[i].scale.set(0.4, 0.4, 0.4)// il pesce che ha mangiato la sfera si è ingrossato
   
  }
  renderer.render(scene, camera)
    
  }
         
  
  window.addEventListener('mousemove', onMouseMove, false)
  var isPresentSphere = false;
  function onClick(event) {
        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        
      //aggiungo la sfera da attaccare al mouse
          var vector = new THREE.Vector3(mouse.x, mouse.y, 0);
          vector.unproject( camera );
          var dir = vector.sub( camera.position ).normalize();
          var distance = - camera.position.z / dir.z;
          var pos = camera.position.clone().add( dir.multiplyScalar( distance ) );
          sphere.position.copy(pos);
          if(!isPresentSphere){
            scene.add( sphere );
            isPresentSphere=true;
          }else{
            scene.remove(sphere)
            isPresentSphere = false;
          }
          if(Math.trunc(fishCenter[i].position.x)==Math.trunc(mouse.x) && Math.trunc(fishCenter[i].position.y)==Math.trunc(mouse.y) ){//se va sulla sfera un pesce, la sfera viene tolta.
            scene.remove(sphere)
            isPresentSphere=false
            fishObject[i].scale.set(0.4, 0.4, 0.4)// il pesce che ha mangiato la sfera si è ingrossato
           
          }
   
      
    renderer.render(scene, camera)
    
    }
    window.addEventListener('click', onClick, true)
 

  function animate() {
    request=requestAnimationFrame(animate)
    
    for (var i = 0; i < n; i++) {
      
      speed = Math.random()* 0.000009
      
          
      // set the marker position
      pt = swimPath[i].spline.getPoint(t)
      
      // get the tangent to the curve
      tangent = swimPath[i].spline.getTangent(t)
      t = t >= 1 ? 0 : t += speed
      
      // Make sure x is negative at the very end of the path. Otherwise there is a frame where the fish is backwards
      if (tangent.x > 0 && tangent.y < 0.06712 && tangent.y > 0.06710) {
        tangent.x *= -1
        tangent.z *= -1
        tangent.y *= -1
      }
    
     
      if(isPresentSphere){
        var vector = new THREE.Vector3(mouse.x, mouse.y, 0);
        vector.unproject( camera );
        var dir = vector.sub( camera.position ).normalize();
        var distance = - camera.position.z / dir.z;
        var pos = camera.position.clone().add( dir.multiplyScalar( distance ) );
       
        fishCenter[i].position.copy(new THREE.Vector3(pt.x-(mouse.x)*(-50),pt.y-(mouse.y)*(-30),0))
        fishCenter[i].lookAt(pos)
        
        if(Math.trunc(fishCenter[i].position.x)==Math.trunc(sphere.position.x) && Math.trunc(fishCenter[i].position.y)==Math.trunc(sphere.position.y) ){//se va sulla sfera un pesce, la sfera viene tolta.
          scene.remove(sphere)
          isPresentSphere=false
          fishObject[i].scale.set(0.4, 0.4, 0.4)// il pesce che ha mangiato la sfera si è ingrossato
         
        }
      } else {
        
        fishCenter[i].position.copy(new THREE.Vector3(pt.x,pt.y,0))
        fishCenter[i].lookAt(pt.add(new THREE.Vector3(tangent.x, tangent.y, tangent.z)))
      }
       


      // calculate the axis to rotate around
      axis.crossVectors(up, tangent).normalize()
      fishObject[i].rotation.y = wiggleValue + offset
   

    }

    renderer.render(scene, camera)

    

  }
  animate()








  /* function toRadians(angle) {
    return angle * (Math.PI / 180)
  }

  function toDegrees(angle) {
    return angle * (180 / Math.PI)
  } */




})()
