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
        },
        colorFadeRate: {
            type: 'number',
            default: 1
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
            //Reduce sky color
            let skyColor = document.querySelector('a-sky').getAttribute('material').topColor;
            if (skyColor !== '#0d0d0d'){
                //Convert RGB to Hex
                let hex = '#';
                //Convert the sky's color from hex to RGB for reducing
                rgb = convertToRGB(skyColor);
                //Reduce the value of each RGB value (not below 13)
                for (let i = 0; i < rgb.length; i++) {
                    if (rgb[i] - self.data.colorFadeRate < 13 || rgb[i] === 13){
                        rgb[i] = 13;
                    }
                    else{
                        rgb[i] -= self.data.colorFadeRate;
                    }
                    rgb[i] = rgb[i].toString(16);
                    rgb[i].length == 1 ? hex += "0" + rgb[i] : hex += rgb[i]; 
                }
                console.log(hex);
                document.querySelector('a-sky').setAttribute('material', 'topColor', hex);
            }
        }
    }
});

// Function modified from: https://www.tutorialspoint.com/hexadecimal-color-to-rgb-color-javascript
function convertToRGB(hex){
    let r = 0, g = 0, b = 0;
    r = "0x" + hex[1] + hex[2];
    g = "0x" + hex[3] + hex[4];
    b = "0x" + hex[5] + hex[6];
    return [+r, +g, +b];
}