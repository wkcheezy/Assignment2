AFRAME.registerComponent('lightcube', {
    schema: {
        speed:{
            type: 'number',
            default: 0.1
        },
        moveTowards:{
            type: 'boolean',
            default: false
        },
        width:{
            type: 'number',
            default: 1
        },
        height:{
            type: 'number',
            default: 1
        },
        depth:{
            type: 'number',
            default: 1
        },
        x:{
            type: 'number',
            default: 1
        },
        y:{
            type: 'number',
            default: 1
        },
        z:{
            type: 'number',
            default: 1
        }
    },

    init: function () {
        const CONTEXT_AF = this;
        CONTEXT_AF.el.classList.add('lightcube');
        CONTEXT_AF.el.classList.add('interactive');
        CONTEXT_AF.el.setAttribute('geometry', {
            primitive: 'box',
            width: CONTEXT_AF.data.width,
            depth: CONTEXT_AF.data.depth,
            height: CONTEXT_AF.data.height
        });
        CONTEXT_AF.el.object3D.position.set(CONTEXT_AF.data.x, CONTEXT_AF.data.y, CONTEXT_AF.data.z);
        CONTEXT_AF.el.setAttribute('material', {
            color: 'white'
        });
    },

    update: function () {
      // Do something when component's data is updated.
    },

    remove: function () {
      // Do something the component or its entity is detached.
    },

    tick: function () {
        const CONTEXT_AF = this;
        //Get location data for color
        let pos = new THREE.Vector3(0, 0, 0);
        CONTEXT_AF.el.object3D.getWorldPosition(pos);
        if (CONTEXT_AF.data.moveTowards){
            let camLoc = new THREE.Vector3(0, 0, 0);
            document.querySelector("a-entity[camera]").object3D.getWorldPosition(camLoc);
            camLoc.z += 1.5
            if (CONTEXT_AF.el.object3D.position.distanceTo(camLoc) > 3.0){
                CONTEXT_AF.el.object3D.position.lerp(camLoc, CONTEXT_AF.data.speed);
            }
            else {
                //When the cube is close enough, remove it from game world and add it to possession
                CONTEXT_AF.data.moveTowards = false;
                //Remove cube from game world
                CONTEXT_AF.el.parentNode.removeChild(CONTEXT_AF.el);
                //Create a new lightcube for camera
                let cube = document.createElement('a-entity');
                cube.setAttribute('lightcube',{
                    width: 0.1,
                    depth: 0.1,
                    height: 0.1,
                    x: 0.2,
                    y: -0.15,
                    z: -0.3
                });
                //Add cube to camera
                document.querySelector("a-entity[camera]").appendChild(cube);
            }
        }
        const color = HSVtoRGB(pos, new THREE.Vector3(0, 0, 0));
        CONTEXT_AF.el.setAttribute('material', 'color', color);
    }
});

// adjusted from https://css-tricks.com/converting-color-spaces-in-javascript/
function HSVtoRGB(pos, origin) {
    let s = 100.0;
    let h = (180 / Math.PI) * new THREE.Vector2(pos.x, pos.y).angle();
    if (pos.z > 0){
        h = 360 - h;
    }
    //Clamping function from https://www.w3resource.com/javascript-exercises/fundamental/javascript-fundamental-exercise-266.php
    let l = Math.max(Math.min(origin.distanceTo(pos) * 4, Math.max(0, 100)), Math.min(0, 100));
    
    s /= 100;
    l /= 100;
    let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs((h / 60) % 2 - 1)),
        m = l - c / 2,
        r = 0,
        g = 0,
        b = 0;

    if (0 <= h && h < 60) {
        r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
        r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
        r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
        r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
        r = c; g = 0; b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return "rgb(" + r + "," + g + "," + b + ")";
}
