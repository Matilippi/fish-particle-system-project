class Fish {
  constructor() {
    this.speed = 10
    this.isWiggling = false
    this.wigglesToDo = 0
    this.xRotation = { x: 0 }
  
    this.INTERVAL = 1000
    this.INERTIA = 0.012
    this.WIGGLE_DURATION = 1000
    this.RATE = 16
    this.MAX_SPEED = 10
    this.MIN_SPEED = 5
    this.PUSH = 0.02
    this.WIGGLE_PROBABILITY = 0.3
    this.MAX_WIGGLE_ROTATAION = 0.12
  }

  getFish() {
    var geometry, material
    // Head
    geometry = new THREE.DodecahedronGeometry(19.5, 2)
    material = new THREE.MeshLambertMaterial({ color: 0xffb200 })
    var fishHead = new THREE.Mesh(geometry, material)
    fishHead.scale.z = .5
    fishHead.scale.y = .8
    fishHead.scale.x = .8
    fishHead.position.x = -2

    // Eyes
    geometry = new THREE.RingGeometry(1, 3, 10)
    material = new THREE.MeshBasicMaterial({ color: 0xffffff })
    var fishEyeRight = new THREE.Mesh(geometry, material)

    fishEyeRight.position.set(0, 5, 7.2)
    fishEyeRight.rotation.y = 0.39
    fishEyeRight.rotation.x = -.3

    var fishEyeLeft = new THREE.Mesh(geometry, material)

    fishEyeLeft.position.set(0, 5, -7.3)
    fishEyeLeft.rotation.y = Math.PI + -.38
    fishEyeLeft.rotation.x = .3

    // Body
    var points = []
    var WIDTH = 21
    var CURVE_FASTNESS = 0.9
    var POS_FROM_HEAD = 10
    var STRETCH = 15
    for (var i = 0; i < 3; i++) {
      points.push(
        new THREE.Vector2(
          Math.sin(i * CURVE_FASTNESS) * WIDTH,
          i * STRETCH - POS_FROM_HEAD
        )
      )
    }

    WIDTH = 21
    CURVE_FASTNESS = .80
    POS_FROM_HEAD = 1
    STRETCH = 11
    for (var i = 3; i < 4; i++) {
      points.push(
        new THREE.Vector2(
          Math.sin(i * CURVE_FASTNESS) * WIDTH,
          i * STRETCH - POS_FROM_HEAD
        )
      )
    }

    WIDTH = 21
    CURVE_FASTNESS = .785
    POS_FROM_HEAD = 5
    STRETCH = 11
    for (var i = 4; i < 5; i++) {
      points.push(
        new THREE.Vector2(
          Math.sin(i * CURVE_FASTNESS) * WIDTH,
          i * STRETCH - POS_FROM_HEAD
        )
      )
    }


    geometry = new THREE.LatheGeometry(points, 50)
    material = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff }) //colore giallo
    var fishBody = new THREE.Mesh(geometry, material)
    fishBody.scale.x = .5
    fishBody.scale.z = .7
    fishBody.scale.y = .7

    fishBody.position.set(-20, 0, 0)
    fishBody.rotation.x = 11
    fishBody.rotation.z = 11

    // Tail (top)
    points = []
    WIDTH = 8
    CURVE_FASTNESS = 1.04
    POS_FROM_HEAD = 10
    STRETCH = 7.5

    for (var i = 0; i < 4; i++) {
      points.push(
        new THREE.Vector2(
          Math.sin(i * CURVE_FASTNESS) * WIDTH,
          i * STRETCH - POS_FROM_HEAD
        )
      )
    }

    geometry = new THREE.LatheGeometry(points)
    material = new THREE.MeshLambertMaterial({ color: 0x0000ff })//colore blu
    var fishTail = new THREE.Mesh(geometry, material)

    fishTail.rotation.z = 0.4
    fishTail.rotation.y = 0
    fishTail.position.set(-28, 5, 0)
    fishTail.scale.z = .1
    fishTail.scale.x = .9
    fishTail.scale.y = .7

    // Tail (bottom)
    var fishTailBottom = new THREE.Mesh(geometry, material)

    fishTailBottom.rotation.z = Math.PI - 0.4
    fishTailBottom.position.set(-28, -6, 0)
    fishTailBottom.scale.z = .1
    fishTailBottom.scale.x = .7
    fishTailBottom.scale.y = 1

    var fish = new THREE.Group()
    fish.add(fishEyeRight)
    fish.add(fishEyeLeft)
    fish.add(fishBody)
    fish.add(fishTail)
    fish.add(fishTailBottom)

    fish.castShadow = true

    return fish
  }

  swimPath(arr) {
    var spline = new THREE.SplineCurve3(arr)
    return {
      spline
    }
  }
}
