document.addEventListener('DOMContentLoaded', () =>{
    //let's pick out the classes and ids with querySelectors
    const square = document.querySelectorAll('.grid div');
    const resultDisplay = document.querySelector('#result');
    let width = 15; //we want the width of the grid to be 15
    let currentShooterIndex = 202; //we want the shooter to start at index 202
    let currentInvederIndex = 0; //we want our invader to start at index 0
    let alienInvadersTakenDown = []; //invaders we have shot down
    let result = 0;
    let direction = 1; //the direction we want to go
    let invaderId = null;
})