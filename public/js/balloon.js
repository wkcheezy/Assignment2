AFRAME.registerComponent('balloon', {
    schema: {
        points: {
            type: 'number',
            default: 1
        },
        duration: {
            type: 'number',
            default: 10000
        },
        startHeight: {
            type: 'number',
            default: 1
        },
        maxheight: { 
            type: 'number', 
            default: 10
        }
    },

    init: function () {
        const CONTEXT_AF = this;

        CONTEXT_AF.el.setAttribute('animation', {
            property: 'position.y',
            from: CONTEXT_AF.data.startHeight,
            to: CONTEXT_AF.data.maxheight,
            loop: false,
            dur: CONTEXT_AF.data.duration,
            enabled: true
        });
        //Set random point value
        //TODO: Add const value for max point value (and by extension max width). Current: 9/0.9
        CONTEXT_AF.data.points = Math.floor(Math.random() * 9) + 1;
        console.log(CONTEXT_AF.data.points);
        //Set balloon scale based on point value
        let scaleVal = (10 - CONTEXT_AF.data.points) * 0.1;
        CONTEXT_AF.el.setAttribute('scale', { x: scaleVal, y: scaleVal, z: scaleVal });
        //If a click is detected on the balloon
        CONTEXT_AF.el.addEventListener('click', () => {
            //TODO: Add points
            //TODO: Fix sound on Firefox
            document.querySelector('[sound]').components.sound.playSound();
            CONTEXT_AF.el.remove();
        });
    },

    tick: function () {
        if (this.el.getAttribute('position').y >= this.data.maxheight){
            this.el.remove();
        }
    }
});
