//TODO: Add dict for colors
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
        CONTEXT_AF.el.setAttribute('material', {color: 'red'});
        //Set balloon scale based on point value
        let scaleVal = (10 - CONTEXT_AF.data.points) * 0.1;
        CONTEXT_AF.el.setAttribute('scale', { x: scaleVal, y: scaleVal, z: scaleVal });
        //If a click is detected on the balloon
        CONTEXT_AF.el.addEventListener('click', () => {
            //Add points
            document.querySelector('#gamerunner').components.gamerunner.data.score += CONTEXT_AF.data.points;
            //TODO: Fix sound on Firefox
            document.querySelector('[sound]').components.sound.playSound();
            //Delete balloon
            CONTEXT_AF.el.parentNode.removeChild(CONTEXT_AF.el);
        });
    },

    update: function() {
        //TODO: Swap this variable creation with just setting the positions
        const CONTEXT_AF = this;
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
            this.el.remove();
        }
        else{
            this.el.object3D.position.y += this.data.riseRate;
        }
    }
});
