AFRAME.registerComponent('lightcube', {
    schema: {
        speed:{
            type: 'number',
            default: 0.1
        },
        moveTowards:{
            type: 'boolean',
            default: false
        }
    },

    init: function () {

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
                cube.setAttribute('lightcube');
                cube.classList.add('lightcube');
                cube.setAttribute('geometry',{
                    primitive: 'box',
                    width: 0.1,
                    depth: 0.1,
                    height: 0.1
                });
                cube.object3D.position.set(0.2, -0.15, -0.3);
                cube.setAttribute('material', {
                    color: 'white'
                });
                //Add cube to camera
                document.querySelector("a-entity[camera]").appendChild(cube);
            }
        }  
    }
});
