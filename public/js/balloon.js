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
        //If a click is detected on the balloon
        CONTEXT_AF.el.addEventListener('click', () => {
            //TODO: Add points
            CONTEXT_AF.el.remove();
        });
    },

    tick: function () {
        if (this.el.getAttribute('position').y >= this.data.maxheight){
            this.el.remove();
        }
    }
});
