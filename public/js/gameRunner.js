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
        },
        score: {
            type: 'number',
            default: 0
        }
    },

    init: function () {
        const self = this;
        self.el.addEventListener('click', () => {
            if (self.data.gameRunning === true){
                document.querySelectorAll('.balloon').forEach(element => {
                    element.parentNode.removeChild(element);
                });
                self.data.gameRunning = false;
                //Set button to display 'Start Game'
                document.querySelectorAll('.gameText').forEach(textElement => {
                    textElement.setAttribute('text', {
                        value: 'Start Game'
                    });
                });
            }
            else{
                console.log("Game start!");
                self.data.gameRunning = true;
            }
        })
    },
    tick: function () {
        //TODO: Add point and countdown text updates
        const self = this
        if (self.data.gameRunning === true){
            if (self.data.countdown > 0){
                self.data.countdown--;
            }
            else{
                self.data.countdown = self.data.countdownReset;
                //Create new balloon element
                document.querySelector('#balloons').insertAdjacentHTML("beforeend", '<a-entity balloon class="balloon interactive"></a-entity >');
            }
            //Set button text to display score
            document.querySelectorAll('.gameText').forEach(textElement => {
                textElement.setAttribute('text', {
                    value: self.data.score
                });
            });
        }
    }
});
