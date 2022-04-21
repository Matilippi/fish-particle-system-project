(function () {

  var fishes = []
  var swimPath = []
  
  var n = 200;  //fishes number

  //different fish size
  var small = 0.2
  var medium = 0.5
  var big = 0.8
  var biggest = 1.1

  //fish swim path random
  for (var i = 0; i < n; i++) {

    fishes[i] = new Fish()
    swimPath[i] = fishes[i].swimPath([
      new THREE.Vector3(Math.random() * (150 - (-150)) - 150, Math.random() * (100 - (-100)) - 100, Math.random() * (50 - (-50)) - 50), //bl
      new THREE.Vector3(Math.random() * (150 - (-150)) - 150, Math.random() * (100 - (-100)) - 100, Math.random() * (50 - (-50)) - 50), //l
      new THREE.Vector3(Math.random() * (150 - (-150)) - 150, Math.random() * (100 - (-100)) - 100, Math.random() * (50 - (-50)) - 50), //fl
      new THREE.Vector3(Math.random() * (150 - (-150)) - 150, Math.random() * (100 - (-100)) - 100, Math.random() * (50 - (-50)) - 50), //f
      new THREE.Vector3(Math.random() * (150 - (-150)) - 150, Math.random() * (100 - (-100)) - 100, Math.random() * (50 - (-50)) - 50), //fr
      new THREE.Vector3(Math.random() * (150 - (-150)) - 150, Math.random() * (100 - (-100)) - 100, Math.random() * (50 - (-50)) - 50), //r
      new THREE.Vector3(Math.random() * (150 - (-150)) - 150, Math.random() * (100 - (-100)) - 100, Math.random() * (50 - (-50)) - 50), //br
      new THREE.Vector3(Math.random() * (150 - (-150)) - 150, Math.random() * (100 - (-100)) - 100, Math.random() * (50 - (-50)) - 50), //b
      new THREE.Vector3(Math.random() * (150 - (-150)) - 150, Math.random() * (100 - (-100)) - 100, Math.random() * (50 - (-50)) - 50),
    ])

  }

  var scene = new THREE.Scene()
  scene.background = new THREE.Color('#005e97');

  //Fog Effect
  scene.fog = new THREE.Fog('#005e97', 1, 350);

  {
    const color = 'blue';
    const intensity = 0.5;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(0, 0, 0);
    scene.add(light);
  }

  var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 500 )
  var renderer = new THREE.WebGLRenderer({ alpha: true })
  renderer.shadowMapEnabled = true;

  var up = new THREE.Vector3(0, 1, 0)
  var axis = new THREE.Vector3()
  var pt, axis, tangent

  //Directional Light
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

  //Point light 
  const pointLight = new THREE.PointLight(  0xffffff, 7, 100 );
  pointLight.position.set( 0, 100, 100 );
  scene.add( pointLight );

  //Waves Effect
  var vertexHeight = 150,
  planeDefinition = 100,
  planeSize = 12450

  var planeGeo = new THREE.PlaneGeometry(planeSize, planeSize, planeDefinition, planeDefinition);
	var plane = new THREE.Mesh(planeGeo, new THREE.MeshBasicMaterial({
		color:'white', 
    transparent: true,
	}));
	plane.rotation.x -= -Math.PI * 0.4;
  plane.position.set( 0, 150, 0 )

	scene.add(plane);


  updatePlane();

	function updatePlane() {
		for (var i = 0; i < planeGeo.vertices.length; i++) {
      planeGeo.vertices[i].z += Math.random() * vertexHeight - vertexHeight;
      planeGeo.vertices[i]._myZ = planeGeo.vertices[i].z
		}
	};

  render();

  //


  var count = 0
	function render() {
		requestAnimationFrame(render);

    for (var i = 0; i < planeGeo.vertices.length; i++) {
      var z = +planeGeo.vertices[i].z;
      planeGeo.vertices[i].z = Math.sin(( i + count * 0.00002)) * (planeGeo.vertices[i]._myZ - (planeGeo.vertices[i]._myZ* 0.6))
      plane.geometry.verticesNeedUpdate = true;

      count += 0.1
    }

		renderer.render(scene, camera);
	}

  
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize( window.innerWidth, window.innerHeight ) //dimensioni finestra
  document.querySelector('.goldfish').appendChild(renderer.domElement)


  camera.position.x = -3
  camera.position.y = 0
  camera.position.z = 150

  // Build Fish group

  var fishObject = []
  var fishCenter = []

  for (var i = 0; i < n; i++) {

    var sizeFish = small;
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
  var wiggleValue = 0


  const offset = -1.5707963267948966 // fishObject.rotation.y initial rotation

  var mouse = new THREE.Vector2(); 

  //Bread
  const geometry = new THREE.SphereGeometry( 3, 3, 0 );


  const material = new THREE.MeshBasicMaterial()

  material.color = new THREE.Color(0xffff00)

  const sphere = new THREE.Mesh( geometry, material );

  var spheres = []

  //Variables used for mouse click and mouse move control
  var click = 0;
  var SphereonMove = false;
  var last = false;
 
  function onMouseMove(event) {
    //take mouse position
    mouse.x = ( ( event.clientX - renderer.domElement.offsetLeft ) / renderer.domElement.clientWidth ) * 2 - 1;
    mouse.y = - ( ( event.clientY - renderer.domElement.offsetTop ) / renderer.domElement.clientHeight ) * 2 + 1;
    var vector = new THREE.Vector3(mouse.x, mouse.y, 0);
    vector.unproject( camera );
    var dir = vector.sub( camera.position ).normalize();
    var distance = - camera.position.z / dir.z;
    var pos = camera.position.clone().add( dir.multiplyScalar( distance ) );  

    //if the sphere is moving with the mouse and 
    if(SphereonMove && !last){
      spheres[spheres.length-1].position.copy(pos);
    }
    renderer.render(scene, camera)
  }     

  window.addEventListener('mousemove', onMouseMove, false)
  function onClick(event) {

    //the first click create a new sphere, the second stop the sphere
    click = click+1
    
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
 
    if((click % 2) == 1){
      SphereonMove=true;
      last = false;
      spheres.push(new THREE.Mesh( geometry, material ));
      //adding sphere
      var vector = new THREE.Vector3(mouse.x, mouse.y, 0);
      vector.unproject( camera );
      var dir = vector.sub( camera.position ).normalize();
      var distance = - camera.position.z / dir.z;
      var pos = camera.position.clone().add( dir.multiplyScalar( distance ) );
      spheres[spheres.length-1].position.copy(pos);//ultima aggiunta         
      scene.add( spheres[spheres.length-1] );
      move = false;
      //fishes look at near sphere
      for (var i = 0; i < n; i++) {
        if(Math.abs(Math.trunc(fishCenter[i].position.x)-Math.trunc(spheres[spheres.length-1].position.x))<50 && Math.abs(Math.trunc(fishCenter[i].position.y)-Math.trunc(spheres[spheres.length-1].position.y))<30 ){
          fishCenter[i].lookAt(spheres[spheres.length-1].position)
        }            
      }                   
    } else {
      SphereonMove=false;
      spheres[spheres.length-1].position=new THREE.Vector3(mouse.x, mouse.y, 0);
    }
           
      
    renderer.render(scene, camera)
    
    }
    window.addEventListener('click', onClick, true)


  function animate() {
    request=requestAnimationFrame(animate)
    
    for (var i = 0; i < n; i++) {
      //every fish has velocity random
      speed = Math.random()* 0.000003
      
          
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

      for(var j=0; j<spheres.length;j++){
        if(Math.abs(Math.trunc(fishCenter[i].position.x)-Math.trunc(spheres[j].position.x))<50 && Math.abs(Math.trunc(fishCenter[i].position.y)-Math.trunc(spheres[j].position.y))<30 ){
          fishCenter[i].lookAt(spheres[j].position)
        }else{
          fishCenter[i].lookAt(pt.add(new THREE.Vector3(tangent.x, tangent.y, tangent.z)))
        }
        
      }


      // if there are spheres on scene 
      if(spheres.length!=0){
        var vector = new THREE.Vector3(mouse.x, mouse.y, 0);
        vector.unproject( camera );
        //var dir = vector.sub( camera.position ).normalize();
        //var distance = - camera.position.z / dir.z;
        //var pos = camera.position.clone().add( dir.multiplyScalar( distance ) );

        fishCenter[i].position.copy(new THREE.Vector3(pt.x,pt.y,pt.z))       
        
        for(var j=0; j<spheres.length;j++){
          if(Math.abs(Math.trunc(fishCenter[i].position.x)-Math.trunc(spheres[j].position.x))<50 && Math.abs(Math.trunc(fishCenter[i].position.y)-Math.trunc(spheres[j].position.y))<30 )
            fishCenter[i].lookAt(spheres[j].position)
          if(Math.trunc(fishCenter[i].position.x)==Math.trunc(spheres[j].position.x) && Math.trunc(fishCenter[i].position.y)==Math.trunc(spheres[j].position.y)){//se va sulla sfera un pesce, la sfera viene tolta.                   
              scene.remove(spheres[j])
              if(j==(spheres.length-1)){
                last=true;
                click=0;
              }
              spheres.splice(j,1)//remove the sphere from list
              //when fish eat become first medium until biggest.
              if(fishObject[i].scale.x==small){
                fishObject[i].scale.set(medium, medium, medium)
              }else if(fishObject[i].scale.x==medium){
                fishObject[i].scale.set(big, big, big)
              }else if(fishObject[i].scale.x==big){
                fishObject[i].scale.set(biggest, biggest, biggest)
              }
          } 
        }
      } else {
        //fishes look everywhere
        fishCenter[i].position.copy(new THREE.Vector3(pt.x,pt.y,pt.z))
        fishCenter[i].lookAt(pt.add(new THREE.Vector3(tangent.x, tangent.y, tangent.z)))
      }
      
      // calculate the axis to rotate around
      axis.crossVectors(up, tangent).normalize()
      fishObject[i].rotation.y = wiggleValue + offset
   
    }

    renderer.render(scene, camera)

    

  }
  animate()


})()
