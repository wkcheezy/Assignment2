AFRAME.registerComponent('balloon', {
    schema: {
        points: {
            type: 'number',
            default: 1
        },
        speed: {
            type: 'number',
            default: 1
        }
    },

    init: function () {
        const CONTEXT_AF = this;

        CONTEXT_AF.el.setAttribute('animation', {
            property: 'position.y',
            from: 1,
            to: 1000,
            loop: false,
            dur: 200000,
            enabled: true
        });
        CONTEXT_AF.el.addEventListener('click', function () {
            CONTEXT_AF.el.remove();
        });
    },

    update: function () {
      // Do something when component's data is updated.
    },

    remove: function () {
      // Do something the component or its entity is detached.
      //Check balloon's height, and if it's not at max height, add points to total
    },

    tick: function (time, timeDelta) {
      // Do something on every scene tick or frame.
      //TODO: Add check for height, and if the balloon is high enough, remove it
    }
});
