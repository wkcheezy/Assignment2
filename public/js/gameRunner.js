AFRAME.registerComponent('gamerunner', {
    schema: {
        countdown: { 
            type: 'number',
            default: 20000
        },
        gameRunning: {
            type: 'boolean',
            default: false
        }
    },

    init: function () {
        const self = this;

        self.el.addEventListener('click', function (){
            if (self.data.gameRunning === true){
                //TODO: Switch to that new method
                balloons = document.getElementsByClassName('balloon');
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

    update: function () {
      // Do something when component's data is updated.
    },

    remove: function () {
      // Do something the component or its entity is detached.
    },

    tick: function (time, timeDelta) {
      if (this.data.gameRunning === true){
            /* if (CONTEXT_AF.countdown > 0){
                countdown--;
            }
            else{
                countdown = 20000;
                document.getElementById('balloons').insertAdjacentHTML("beforeend", '<a-entity balloon class="balloon interactive" geometry="primitive:sphere; radius:0.5;" position="0 1 -3" material="color:red;"></a - entity >')
            } */
        console.log("Should be creating balloons!");
        // document.getElementById('balloons').insertAdjacentHTML("beforeend", '<a-entity balloon class="balloon interactive" geometry="primitive:sphere; radius:0.5;" position="0 1 -3" material="color:red;"></a - entity >');
      }
    }
});
