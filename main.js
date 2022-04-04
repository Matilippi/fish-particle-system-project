(function () {

  var fishes = []
  var swimPath = []
  
  var n = 200;  //fra pesci random
 var small = 0.2
 var medium = 0.5
 var big = 0.8
 var biggest = 1.1
  for (var i = 0; i < n; i++) {

    fishes[i] = new Fish()
    swimPath[i] = fishes[i].swimPath([  //MOVIMENTI DEI PESCI // da fare tutto random
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
  scene.background = new THREE.Color('lightblue');
  scene.fog = new THREE.Fog('lightblue', 1, 350);


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

  const pointLight = new THREE.PointLight(  0xffffff, 7, 100 );
  pointLight.position.set( 0, 100, 100 );
  scene.add( pointLight );

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

//BREAD
const geometry = new THREE.BoxGeometry( 5, 5, Math.random()*10 );


const material = new THREE.MeshBasicMaterial()

material.color = new THREE.Color(0xffff00)

const sphere = new THREE.Mesh( geometry, material );

var spheres = []
var click = 0;


function onMouseMove(event) {
   
 
    /* mouse.x = ( event.clientX / renderer.domElement.width ) * 2 - 1;
    mouse.y = - ( event.clientY / renderer.domElement.height ) * 2 + 1; */

    mouse.x = ( ( event.clientX - renderer.domElement.offsetLeft ) / renderer.domElement.clientWidth ) * 2 - 1;
    mouse.y = - ( ( event.clientY - renderer.domElement.offsetTop ) / renderer.domElement.clientHeight ) * 2 + 1;
     

    if((click % 2) == 1){
       var vector = new THREE.Vector3(mouse.x, mouse.y, 0);
        vector.unproject( camera );
        var dir = vector.sub( camera.position ).normalize();
        var distance = - camera.position.z / dir.z;
        var pos = camera.position.clone().add( dir.multiplyScalar( distance ) );
        spheres[spheres.length-1].position.copy(pos);
        
    }



  renderer.render(scene, camera)
    
  }
         

  window.addEventListener('mousemove', onMouseMove, false)
  function onClick(event) {

        click = click+1
        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

      

        if((click % 2) == 1){
          spheres.push(new THREE.Mesh( geometry, material ));
          ;
          
          
        //aggiungo la sfera da attaccare al mouse
            var vector = new THREE.Vector3(mouse.x, mouse.y, 0);
            vector.unproject( camera );
            var dir = vector.sub( camera.position ).normalize();
            var distance = - camera.position.z / dir.z;
            var pos = camera.position.clone().add( dir.multiplyScalar( distance ) );
            spheres[spheres.length-1].position.copy(pos);//ultima aggiunta         
            scene.add( spheres[spheres.length-1] );

            //i pesci se vicini guardano l'ultima sfera inserita
            for (var i = 0; i < n; i++) {
            
              if(Math.abs(Math.trunc(fishCenter[i].position.x)-Math.trunc(spheres[spheres.length-1].position.x))<50 && Math.abs(Math.trunc(fishCenter[i].position.y)-Math.trunc(spheres[spheres.length-1].position.y))<30 ){
                fishCenter[i].lookAt(spheres[spheres.length-1].position)
              }
                         
            }
                          
        }else{
          spheres[spheres.length-1].position=new THREE.Vector3(mouse.x, mouse.y, 0);
        }

        
      
   
      
    renderer.render(scene, camera)
    
    }
    window.addEventListener('click', onClick, true)


  function animate() {
    request=requestAnimationFrame(animate)
    
    for (var i = 0; i < n; i++) {
      
      speed = Math.random()* 0.0000018
      
      for(var j=0; j<spheres.length;j++){
        if(Math.abs(Math.trunc(fishCenter[i].position.x)-Math.trunc(spheres[j].position.x))<50 && Math.abs(Math.trunc(fishCenter[i].position.y)-Math.trunc(spheres[j].position.y))<30 ) 
         
        fishCenter[i].lookAt(spheres[j].position)
      }
          
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

      
      if(spheres.length!=0){

 
        var vector = new THREE.Vector3(mouse.x, mouse.y, 0);
        vector.unproject( camera );
        var dir = vector.sub( camera.position ).normalize();
        var distance = - camera.position.z / dir.z;
        var pos = camera.position.clone().add( dir.multiplyScalar( distance ) );

        fishCenter[i].position.copy(new THREE.Vector3(pt.x,pt.y,pt.z))       
        
        for(var j=0; j<spheres.length;j++){

          if(Math.trunc(fishCenter[i].position.x)==Math.trunc(spheres[j].position.x) && Math.trunc(fishCenter[i].position.y)==Math.trunc(spheres[j].position.y)){//se va sulla sfera un pesce, la sfera viene tolta.                   
            
              scene.remove(spheres[j])
              spheres.splice(j,1)//rimuove la sfera
              if(fishObject[i].scale.x==small){
                fishObject[i].scale.set(medium, medium, medium)
              }else if(fishObject[i].scale.x==medium){
                fishObject[i].scale.set(big, big, big)
              }else if(fishObject[i].scale.x==big){
                fishObject[i].scale.set(biggest, biggest, biggest)
              }

              click=0;   
          }
                

        }
      } else {
        
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
