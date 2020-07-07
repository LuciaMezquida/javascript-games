//vamos a mover el dino 150px arriba y 150 px abajo usando el teclado
document.addEventListener('DOMContentLoaded', () => {
    const dino = document.querySelector('.dino')
    const grid = document.querySelector('.grid');
    const alert = document.getElementById('alert');
    let isJumping = false;
    let gravity = 0.9;
    let isGameOver = false;

    const control = (e) => {
        if (e.keyCode === 32) { //32 is the space bar
            if (!isJumping) {
                isJumping = true;
                jump();
            }
        }
    }
    document.addEventListener('keyup', control);

    //se moverá arriba 30px cada vez hasta alcanzar 150px
    let position = 0;
    const jump = () => {
        let count = 0;
        let timerId = setInterval(function(){//creamos timerId para parar la ejecucion del intervalo
            //move down
            if (count === 15) {
                clearInterval(timerId) // with clearInterval we stop the up functionality
                let downTimerId = setInterval(function(){
                    if (count === 0) {
                        clearInterval(downTimerId);// we stop de down functionality
                        isJumping = false; //para asegurarnos que solo salta cuando está en el suelo, no a mitad de salto
                    }
                position -= 5;
                count--;
                position = position * gravity;
                dino.style.bottom = position + 'px';
                }, 20)
            }
            //move up
            position += 30;
            count++;
            position = position * gravity;
            dino.style.bottom = position + 'px';
        }, 20) //20 milliseconds
    }

    const generateObstacles = () => {
        let randomTime = Math.random() * 4000; //generar obstaculos al azar
        let obstaclePosition = 1000; //1000 px desde donde está nuestro dino
        const obstacle = document.createElement('div');
        if (!isGameOver) obstacle.classList.add('obstacle'); //al dejar de generar style al obstaculo, dejan de verse
        grid.appendChild(obstacle);
        obstacle.style.left = obstaclePosition + 'px';

        let timerId = setInterval(function(){
            //si se cumplen las 3 cond, coinciden el obstaculo con el dino y borramos el intervalo
            if (obstaclePosition > 0 && obstaclePosition < 80 && position < 80) { 
                clearInterval(timerId);
                alert.innerHTML = 'Game Over';
                isGameOver = true; //para que los obstaculos dejen de moverse
                //borrar todos los divs hijos
                while (grid.firstChild) {
                    grid.removeChild(grid.lastChild)
                }
            }
            obstaclePosition -= 10; //queremos restar 10px cada 20 milisegundos
            obstacle.style.left = obstaclePosition + 'px'; //queremos mover el dino a la izq
        }, 20);
        if (!isGameOver) setTimeout(generateObstacles, randomTime); //temporizador que ejecuta una función dp de que transcurre un tiempo establecido.

    }
    generateObstacles();

});