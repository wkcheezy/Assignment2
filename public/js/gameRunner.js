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
                balloons = document.querySelectorAll('.balloon');
                balloons.forEach(element => {
                    element.destroy();
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
                document.querySelector('#balloons').insertAdjacentHTML("beforeend", '<a-entity balloon class="balloon interactive" geometry="primitive:sphere; radius:0.5;" position="0 1 -3" material="color:red;"></a - entity >');
            }
      }
    }
});
