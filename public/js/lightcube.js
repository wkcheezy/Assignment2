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
        if (CONTEXT_AF.data.moveTowards){
            camLoc = document.querySelector("a-entity[camera]").object3D.position.clone();
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
    }
});
