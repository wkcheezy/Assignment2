AFRAME.registerComponent('touchpadcontrols', {
    init: function () {
        let el = this.el;
        //Daydream, Gear VR, Vive
        el.addEventListener('trackpaddown', function () {
            el.emit('teleStart');
            console.log('trackteleStart');
        });

        el.addEventListener('trackpadup', function () {
            el.emit('teleEnd');
            console.log('trackteleEnd');
        });
        //Oculus Go, WMR
        el.addEventListener('touchpaddown', function () {
            el.emit('teleStart');
            console.log('touchteleStart');
        });

        el.addEventListener('touchpadup', function () {
            el.emit('teleEnd');
            console.log('touchteleEnd');
        });
        //Oculus Touch
        el.addEventListener('surfacedown', function () {
            el.emit('teleStart');
            console.log('surfaceteleStart');
        });

        el.addEventListener('surfaceup', function () {
            el.emit('teleEnd');
            console.log('surfaceteleEnd');
        });
    }
});
