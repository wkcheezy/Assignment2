AFRAME.registerComponent('gamerunner', {
    schema: {
        countdown: { 
            type: 'number',
            default: 100
        },
        countdownReset:{
            type: 'number',
            default: 100
        },
        gameRunning: {
            type: 'boolean',
            default: false
        }
    },

    init: function () {
        const self = this;
        self.el.addEventListener('click', () => {
            if (self.data.gameRunning === true){
                document.querySelectorAll('.balloon').forEach(element => {
                    //TODO: Switch the destroy method in the balloon to this?
                    element.parentNode.removeChild(element);
                });
                self.data.gameRunning = false;
            }
            else{
                console.log("Game start!");
                self.data.gameRunning = true;
            }
        })
    },
    tick: function () {
        if (this.data.gameRunning === true){
            if (this.data.countdown > 0){
                this.data.countdown--;
            }
            else{
                this.data.countdown = this.data.countdownReset;
                //Create new balloon element
                document.querySelector('#balloons').insertAdjacentHTML("beforeend", '<a-entity balloon class="balloon interactive"></a-entity >');
            }
      }
    }
});
