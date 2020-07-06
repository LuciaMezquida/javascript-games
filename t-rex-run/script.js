//vamos a mover el dino 150px arriba y 150 px abajo usando el teclado
document.addEventListener('DOMContentLoaded', () => {
    const dino = document.querySelector('.dino')

    const control = (e) => {
        if (e.keyCode === 32) { //32 is the space bar
            jump();
        }
    }
    document.addEventListener('keyup', control);

    //se moverá arriba 30px cada vez hasta alcanzar 150px
    const jump = () => {
        let position = 0;
        let timerId = setInterval(function(){//creamos timerId para parar la ejecucion del intervalo
            
            //move down
            if (position === 150) {
                clearInterval(timerId) // with clearInterval we stop the up functionality
                console.log('down')
                    let downTimerId = setInterval(function(){
                        if (position === 0) {
                            clearInterval(downTimerId);// we stop de down functionality
                        }
                position -= 30;
                dino.style.bottom = position + 'px';
                }, 20)
            }
            position += 30;
            dino.style.bottom = position + 'px';
            //move up
            console.log('up')
           
        }, 20) //20 milliseconds
    }

});