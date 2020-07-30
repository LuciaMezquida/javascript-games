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
                position -= 3;
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
        let obstaclePosition = 1500; //1000 px desde donde está nuestro dino
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

    const generateClouds = () => {
        let randomTime = Math.random() * 9000; //generar obstaculos al azar
        let cloudPosition = 1500; //1500 px desde donde está nuestro dino
        const cloud = document.createElement('div');
        if (!isGameOver) cloud.classList.add('cloud'); //al dejar de generar style al obstaculo, dejan de verse
        grid.appendChild(cloud);
        cloud.style.left = cloudPosition + 'px';
    
        let timerId = setInterval(function(){
            cloudPosition -= 9; //queremos restar 9px cada 30 milisegundos
            cloud.style.left = cloudPosition + 'px'; //queremos mover el obstaculo a la izq
        }, 35);
        if (!isGameOver) setTimeout(generateClouds, randomTime); //temporizador que ejecuta una función dp de que transcurre un tiempo establecido.
    }
    
    generateClouds();

    const generateBirds = () => {
        let randomTime = Math.random() * 7000; //generar obstaculos al azar
        let birdPosition = 1500; //1500 px desde donde está nuestro dino
        const bird = document.createElement('div');
        if (!isGameOver) bird.classList.add('bird'); //al dejar de generar style al obstaculo, dejan de verse
        grid.appendChild(bird);
        bird.style.left = birdPosition + 'px';
    
        let timerId = setInterval(function(){
            birdPosition -= 9; //queremos restar 9px cada 25 milisegundos
            bird.style.left = birdPosition + 'px'; //queremos mover el obstaculo a la izq
        }, 25);
        if (!isGameOver) setTimeout(generateBirds, randomTime); //temporizador que ejecuta una función dp de que transcurre un tiempo establecido.
    }
    
    generateBirds();

    const generateUfo = () => {
        let randomTime = 13000; //generar obstaculos al azar
        let ufoPosition = 1500; //1500 px desde donde está nuestro dino
        const ufo = document.createElement('div');
        if (!isGameOver) ufo.classList.add('ufo'); //al dejar de generar style al obstaculo, dejan de verse
        grid.appendChild(ufo);
        ufo.style.left = ufoPosition + 'px';
    
        let timerId = setInterval(function(){
            ufoPosition -= 10; //queremos restar 10px cada 18 milisegundos
            ufo.style.left = ufoPosition + 'px'; //queremos mover el obstaculo a la izq
        }, 13);
        if (!isGameOver) setTimeout(generateUfo, randomTime); //temporizador que ejecuta una función dp de que transcurre un tiempo establecido.
    }
    
    generateUfo();

    const generateRock = () => {
        let randomTime = Math.random() * 5000; //generar obstaculos al azar
        let rockPosition = 1500; //1500 px desde donde está nuestro dino
        const rock = document.createElement('div');
        if (!isGameOver) rock.classList.add('rock'); //al dejar de generar style al obstaculo, dejan de verse
        grid.appendChild(rock);
        rock.style.left = rockPosition + 'px';
    
        let timerId = setInterval(function(){
            rockPosition -= 10; //queremos restar 10px cada 18 milisegundos
            rock.style.left = rockPosition + 'px'; //queremos mover el obstaculo a la izq
        }, 20);
        if (!isGameOver) setTimeout(generateRock, randomTime); //temporizador que ejecuta una función dp de que transcurre un tiempo establecido.
    }
    
    generateRock();

});

