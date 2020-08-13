document.addEventListener('DOMContentLoaded', () =>{
    //let's pick out the classes and ids with querySelectors
    const squares = document.querySelectorAll('.grid div');
    const resultDisplay = document.querySelector('#result');
    let width = 15; //we want the width of the grid to be 15
    let currentShooterIndex = 202; //we want the shooter to start at index 202
    let currentInvaderIndex = 0; //we want our invader to start at index 0
    let alienInvadersTakenDown = []; //invaders we have shot down
    let result = 0;
    let direction = 1; //the direction we want to go
    let invaderId = null;

    //Defining the alien invaders
    const alienInvaders = [0 ,1, 2, 3, 4, 5, 6, 7, 8, 9,            //indexes we want our invaders to be in
                           15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
                           30, 31, 32, 33, 34, 35, 36, 37, 38, 39];
    
    //Draw the alien invaders
    alienInvaders.forEach( invader => squares[currentInvaderIndex + invader].classList.add('invader'));

    //Draw the shooter
    squares[currentShooterIndex].classList.add('shooter');

    //Move the shooter along the line
    function moveShooter(e) {
        squares[currentShooterIndex].classList.remove('shooter');
        switch(e.keyCode) {
            case 37: //left arrow
                if (currentShooterIndex % width !== 0) currentShooterIndex -= 1;
                break;
            case 39: //right arrow
                if (currentShooterIndex % width < width - 1) currentShooterIndex += 1;
                break;
            default:
                console.log("NOT THAT KEY!!!")
        }
        squares[currentShooterIndex].classList.add('shooter');
    }
    document.addEventListener('keydown', moveShooter);

    //Move the alien invaders
    function moveInvaders() {
        const leftEdge = alienInvaders[0] % width === 0;
        const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1;

        if ((leftEdge && direction === -1) || (rightEdge && direction === 1)) {
            direction = width; //it will move down a whole row in the grid
        } else if (direction === width) {
            if (leftEdge) direction = 1;
            else direction = -1;
        }
        //let's move over the alien array to move any invader
        for (let i = 0; i <= alienInvaders.length - 1; i++) {
            squares[alienInvaders[i]].classList.remove('invader');
        }
        for (let i = 0; i <= alienInvaders.length - 1; i++) {
            alienInvaders[i] += direction;
        }
        for (let i = 0; i <= alienInvaders.length - 1; i++) {
            if(!alienInvadersTakenDown.includes(i)) {
                squares[alienInvaders[i]].classList.add('invader');
            }
        }

        //Declare a win
        if (alienInvadersTakenDown.length === alienInvaders.length) {
            resultDisplay.textContent = 'YOU WIN!!';
            clearInterval(invaderId);
        }

        //Decide a game over
        if (squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
            resultDisplay.textContent = 'Game Over';
            squares[currentShooterIndex].classList.add('boom');
            clearInterval(invaderId);
        }
        //If any of the aliens miss the shooter but reach the end of the grid, the game is over
        for (let i = 0; i <= alienInvaders.length - 1; i++) {
            if (alienInvaders[i] > (squares.length - (width - 1))) { //the alien is in the last 15 squares
                resultDisplay.textContent = 'Game Over';
                clearInterval(invaderId);
            }
        }
    }
    //We need to invert the last function every 500 miliseconds
    invaderId = setInterval(moveInvaders, 700);

    //Shoot at aliens
    function shoot(e) {
        let laserId = null;
        let currentLaserIndex = currentShooterIndex;
        //move the laser from the shooter to the invader
        function moveLaser() {
            squares[currentLaserIndex].classList.remove('laser');
            currentLaserIndex -= width;
            squares[currentLaserIndex].classList.add('laser');
            if(squares[currentLaserIndex].classList.contains('invader')) {
                squares[currentLaserIndex].classList.remove('laser');
                squares[currentLaserIndex].classList.remove('invader');
                squares[currentLaserIndex].classList.add('boom');
                //We want the boom to appear for a very short time. We'll remove the boom after 250 milliseconds
                setTimeout(() => squares[currentLaserIndex].classList.remove('boom'), 250);
                clearInterval(laserId);
                //Array of invaders we are taken down. We push a new item to our alienInvadersTakenDown array
                const alienTakenDown = alienInvaders.indexOf(currentLaserIndex);
                alienInvadersTakenDown.push(alienTakenDown);
                result++; //Then we add 1 to our result;
                resultDisplay.textContent = result; // and display the result in our resultDisplay
            }
            //If the laser is in the very first 15 squares we want to clear this interval and remove the laser class from the grid
            if (currentLaserIndex < width) {
                clearInterval(laserId);
                setTimeout(() => squares[currentLaserIndex].classList.remove('laser'), 100);
            }
        }


 //       document.addEventListener('keyup', e => {
 //           if (e.keyCode === 32) {
 //               laserId = setInterval(moveLaser, 100);
 //           }
 //       })
          
        switch(e.keyCode) {
            case 32:
                laserId = setInterval(moveLaser, 100);
                break;
        }
    }

    document.addEventListener('keyup', shoot);


})