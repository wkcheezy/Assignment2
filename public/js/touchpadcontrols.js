AFRAME.registerComponent('touchpadcontrols', {
    init: function () {
        let el = this.el;
        //Daydream, Gear VR, Vive
        el.addEventListener('trackpaddown', function () {
            el.emit('teleStart');
        });

        el.addEventListener('trackpadup', function () {
            el.emit('teleEnd');
        });
        //Oculus Go, WMR
        el.addEventListener('touchpaddown', function () {
            el.emit('teleStart');
        });

        el.addEventListener('touchpadup', function () {
            el.emit('teleEnd');
        });
        //Oculus Touch
        el.addEventListener('surfacedown', function () {
            el.emit('teleStart');
        });

        el.addEventListener('surfaceup', function () {
            el.emit('teleEnd');
        });
    }
});
