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
        colorFadeRate: {
            type: 'number',
            default: 1
        }
    },

    init: function () {
        const CONTEXT_AF = this;
        CONTEXT_AF.el.addEventListener('click', () => {
            if (CONTEXT_AF.data.gameRunning === true){
                document.querySelectorAll('.balloon').forEach(element => {
                    element.parentNode.removeChild(element);
                });
                CONTEXT_AF.data.gameRunning = false;
                //Set button to display 'Start Game'
                document.querySelectorAll('.gameText').forEach(textElement => {
                    textElement.setAttribute('text', {
                        value: 'Start Balloons'
                    });
                });
            }
            else{
                console.log("Game start!");
                CONTEXT_AF.data.gameRunning = true;
            }
        })
    },
    tick: function () {
        const CONTEXT_AF = this
        if (CONTEXT_AF.data.gameRunning === true){
            if (CONTEXT_AF.data.countdown > 0){
                CONTEXT_AF.data.countdown--;
            }
            else{
                CONTEXT_AF.data.countdown = CONTEXT_AF.data.countdownReset;
                //Create new balloon element
                document.querySelector('#balloons').insertAdjacentHTML("beforeend", '<a-entity balloon class="balloon interactive"></a-entity >');
            }
            //Set button text to display stop text
            document.querySelectorAll('.gameText').forEach(textElement => {
                textElement.setAttribute('text', {
                    value: 'Stop Balloons'
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
                    if (rgb[i] - CONTEXT_AF.data.colorFadeRate < 13 || rgb[i] === 13){
                        rgb[i] = 13;
                    }
                    else{
                        rgb[i] -= CONTEXT_AF.data.colorFadeRate;
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