//TODO: Maybe make the player pick up money dropped by ballon and drop into bucket? Alyx possible through https://threejs.org/docs/index.html#api/en/math/Vector3.lerp
AFRAME.registerComponent('balloon', {
    schema: {
        startHeight: {
            type: 'number',
            default: 1
        },
        maxheight: { 
            type: 'number', 
            default: 10
        },
        riseRate:{
            type: 'number',
            default: 0.05
        }
    },

    init: function () {
        const CONTEXT_AF = this;
        //Set balloon geometry
        CONTEXT_AF.el.setAttribute('geometry',{
            primitive: 'sphere',
            radius: 0.5
        });
        //Set the balloon material
        CONTEXT_AF.el.setAttribute('material', {
            opacity: 0.5
        });
        //Set balloon scale based on point value
        let scaleVal = (10 - (Math.floor(Math.random() * 9) + 1)) * 0.1;
        CONTEXT_AF.el.setAttribute('scale', { x: scaleVal, y: scaleVal, z: scaleVal });
        //If a click is detected on the balloon
        CONTEXT_AF.el.addEventListener('click', () => {
            //TODO: Fix sound on Firefox
            document.querySelector('[sound]').components.sound.playSound();
            CONTEXT_AF.el.firstChild.setAttribute('visible', true);
        });
        //Add light
        let light = document.createElement('a-entity');
        light.setAttribute('light',{
            color: getRandomColor(),
            type: 'point'
        });
        light.setAttribute('visible', false);
        CONTEXT_AF.el.appendChild(light);
    },

    update: function() {
        const CONTEXT_AF = this;
        //TODO: Use Object3D distance
        let bx = 0;
        let bz = 0;
        while (true) {
            bx = Math.floor(Math.random() * (5 - (-5) + 1) ) + -5;
            bz = Math.floor(Math.random() * (5 - (-5) + 1) ) + -5;
            if (Math.sqrt(bx * bx + bz * bz) < 5) {
                break;
            }
        }
        CONTEXT_AF.el.object3D.position.set(bx, CONTEXT_AF.data.startHeight, bz);
    },

    tick: function () {
        const CONTEXT_AF = this;
        if (CONTEXT_AF.el.object3D.position.y >= CONTEXT_AF.data.maxheight){
            if (CONTEXT_AF.el.firstChild.getAttribute('visible')) {
                //Set sky and environemnt lights to ball color
                document.querySelector('a-sky').setAttribute('material', 'topColor', CONTEXT_AF.el.firstChild.getAttribute('light').color);
            }
            //Delete balloon
            CONTEXT_AF.el.parentNode.removeChild(CONTEXT_AF.el);
        }
        else{
            CONTEXT_AF.el.object3D.position.y += CONTEXT_AF.data.riseRate;
        }
    }
});

// Function from https://aframe.io/docs/1.1.0/guides/building-a-minecraft-demo.html#random-color-component
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}