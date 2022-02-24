(function () {

  var fishes = []
  var swimPath = []
  var n = 10;  //fra pesci random

  for (var i = 0; i < n; i++) {

    fishes[i] = new Fish()
    swimPath[i] = fishes[i].swimPath([  //MOVIMENTI DEI PESCI // da fare tutto random
      new THREE.Vector3(Math.random() * (60 - (-60)) - 60, Math.random() * (60 - (-60)) - 60, Math.random() * (130 - 75) + 75), //bl
      new THREE.Vector3(Math.random() * (60 - (-60)) - 60, Math.random() * (60 - (-60)) - 60, Math.random() * (130 - 75) + 75), //l
      new THREE.Vector3(Math.random() * (60 - (-60)) - 60, Math.random() * (60 - (-60)) - 60, Math.random() * (130 - 75) + 75), //fl
      new THREE.Vector3(Math.random() * (60 - (-60)) - 60, Math.random() * (60 - (-60)) - 60, Math.random() * (130 - 75) + 75), //f
      new THREE.Vector3(Math.random() * (60 - (-60)) - 60, Math.random() * (60 - (-60)) - 60, Math.random() * (130 - 75) + 75), //fr
      new THREE.Vector3(Math.random() * (60 - (-60)) - 60, Math.random() * (60 - (-60)) - 60, Math.random() * (130 - 75) + 75), //r
      new THREE.Vector3(Math.random() * (60 - (-60)) - 60, Math.random() * (60 - (-60)) - 60, Math.random() * (130 - 75) + 75), //br
      new THREE.Vector3(Math.random() * (60 - (-60)) - 60, Math.random() * (60 - (-60)) - 60, Math.random() * (130 - 75) + 75), //b
      new THREE.Vector3(Math.random() * (60 - (-60)) - 60, Math.random() * (60 - (-60)) - 60, Math.random() * (130 - 75) + 75),

    ])

    /*
    swimPath[i] = fishes[i].swimPath[  //MOVIMENTI DEI PESCI // da fare tutto random
      new THREE.Vector3(-17-i, 16+i, 90+i), //bl
      new THREE.Vector3(-20-i , 15+i, 98+i), //l
      new THREE.Vector3(-14-i, 13+i, 110+i), //fl
      new THREE.Vector3(0-i , 13+i, 113+i), //f
      new THREE.Vector3(16-i , 16+i, 110+i), //fr
      new THREE.Vector3(15-i , 21+i, 92+i), //r
      new THREE.Vector3(5-i , 20+i, 77+i), //br
      new THREE.Vector3(-7-i , 17+i, 79+i), //b
      new THREE.Vector3(-17-i , 16+i, 90+i),

    ])*/

  }





  var scene = new THREE.Scene()
  // scene.background = new THREE.Color( 0x363129 )
  // scene.background = new THREE.Color( 0x363129 )
  var camera = new THREE.PerspectiveCamera(80, 320 / 150, .1, 250)
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

  // var helper = new THREE.CameraHelper( light.shadow.camera );
  // scene.add( helper );

  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(innerWidth, innerHeight) //dimensioni finestra
  document.querySelector('.goldfish').appendChild(renderer.domElement)


  camera.position.x = -3
  camera.position.y = 0
  camera.position.z = 150


  // Build Group

  var fishObject = []
  var fishCenter = []


  for (var i = 0; i < n; i++) {

    var sizeFish = 0.08//Math.random() * (0. - 0.05) + 0.05;//pesci dmensione random tra 0.3 e 0.05
    fishObject[i] = fishes[i].getFish()
    fishObject[i].scale.set(sizeFish, sizeFish, sizeFish)
    fishObject[i].rotation.set(i, -i - Math.PI / 2, i)
    // scene.add(fishObject[i])

    fishCenter[i] = new THREE.AxesHelper(200)
    fishCenter[i] = new THREE.Object3D()
    fishCenter[i].add(fishObject[i])
    scene.add(fishCenter[i])
  }






  // scene.add(swimPath.line)

  var t = 0
  var speed = 0.001
  var swimData
  var wiggleValue = 0


  const offset = -1.5707963267948966 // fishObject.rotation.y initial rotation


  for (var i = 0; i < n; i++) {
    fishes[i].swim()
  }

  //prova mouse
  /*
    document.addEventListener('click', onClick, false)
  
  function onClick( event ) 
  {
    
    for(var i=0;i<n;i++){
      swimPath[i] = fishes[i].swimPath([  //MOVIMENTI DEI PESCI // da fare tutto random
        new THREE.Vector3(Math.random() * (60 - (-60)) -60, Math.random() * (60 - (-60)) -60, Math.random() * (130 - 75) +75), //bl
        new THREE.Vector3(Math.random() * (60 - (-60)) -60, Math.random() * (60 - (-60)) -60, Math.random() * (130 - 75) +75), //l
        new THREE.Vector3(Math.random() * (60 - (-60)) -60, Math.random() * (60 - (-60)) -60, Math.random() * (130 - 75) +75), //fl
        new THREE.Vector3(Math.random() * (60 - (-60)) -60 , Math.random() * (60 - (-60)) -60, Math.random() * (130 - 75) +75), //f
        new THREE.Vector3(Math.random() * (60 - (-60)) -60 , Math.random() * (60 - (-60)) -60, Math.random() * (130 - 75) +75), //fr
        new THREE.Vector3(Math.random() * (60 - (-60)) -60, Math.random() * (60 - (-60)) -60, Math.random() * (130 - 75) +75), //r
        new THREE.Vector3(Math.random() * (60 - (-60)) -60 , Math.random() * (60 - (-60)) -60, Math.random() * (130 - 75) +75), //br
        new THREE.Vector3(Math.random() * (60 - (-60)) -60 , Math.random() * (60 - (-60)) -60, Math.random() * (130 - 75) +75), //b
        new THREE.Vector3(Math.random() * (60 - (-60)) -60 , Math.random() * (60 - (-60)) -60, Math.random() * (130 - 75) +75),
  
      ])
    }
  
  }*/





  var mouse = new THREE.Vector2();
  var raycaster = new THREE.Raycaster();
  function onmousemove(event) {
   // cancelAnimationFrame(request)
    // Update the mouse variable
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
   
      renderer.render(scene, camera)
  }

  window.addEventListener("mousemove", onmousemove, false);



  function animate() {
    request=requestAnimationFrame(animate)
    
    speed = fishes[0].update().speed / 200000
    for (var i = 0; i < n; i++) {
      swimData = fishes[i].update()
      wiggleValue = swimData.xRotation.x
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
      fishCenter[i].position.copy(pt)
      
      fishCenter[i].lookAt(
        pt.add(new THREE.Vector3(mouse.x, mouse.y, tangent.z))
      )/
      
      // calculate the axis to rotate around
      axis.crossVectors(up, tangent).normalize()
      fishObject[i].rotation.y = wiggleValue + offset
    }

    renderer.render(scene, camera)

  }
  animate()








  function toRadians(angle) {
    return angle * (Math.PI / 180)
  }

  function toDegrees(angle) {
    return angle * (180 / Math.PI)
  }




})()
