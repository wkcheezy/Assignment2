//TODO: Maybe make the player pick up money dropped by ballon and drop into bucket? Alyx possible through https://threejs.org/docs/index.html#api/en/math/Vector3.lerp
AFRAME.registerComponent('balloon', {
    schema: {
        points: {
            type: 'number',
            default: 1
        },
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
        //Set random point value
        //TODO: Add const value for max point value (and by extension max width). Current: 9/0.9
        CONTEXT_AF.data.points = Math.floor(Math.random() * 9) + 1;
        //Set balloon geometry
        CONTEXT_AF.el.setAttribute('geometry',{
            primitive: 'sphere',
            radius: 0.5
        });
        //Set the balloon material
        //TODO: Set the balloon color based on its point value
        CONTEXT_AF.el.setAttribute('material', {
            opacity: 0.5
        });
        //Set balloon scale based on point value
        let scaleVal = (10 - CONTEXT_AF.data.points) * 0.1;
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
        //TODO: Reduce the play circle radius
        let bx = 0;
        let bz = 0;
        while (true) {
            bx = Math.floor(Math.random() * 25) + 1;
            bz = Math.floor(Math.random() * 25) + 1;
            if (Math.sqrt(bx * bx + bz * bz) < 25) {
                break;
            }
        }
        CONTEXT_AF.el.object3D.position.set(bx, CONTEXT_AF.data.startHeight, bz);
    },

    tick: function () {
        if (this.el.object3D.position.y >= this.data.maxheight){
            if (this.el.firstChild.getAttribute('visible')) {
                //Add points
                document.querySelector('#gamerunner').components.gamerunner.data.score += this.data.points;
                //Set sky and environemnt lights to ball color
                document.querySelector('a-sky').setAttribute('material', 'topColor', this.el.firstChild.getAttribute('light').color);
            }
            //Delete balloon
            this.el.parentNode.removeChild(this.el);
        }
        else{
            this.el.object3D.position.y += this.data.riseRate;
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