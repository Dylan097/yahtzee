// The dice on the board
let dice = document.getElementsByClassName('dice');

// Event listener for DOM load
document.addEventListener("DOMContentLoaded", function () {
    // Dice roll button
    let diceRollButton = document.getElementById("roll-dice");
    diceRollButton.addEventListener('click', rollDice);
    for (let i = 0; i < dice.length; i++) {

        // Add or remove the hold class
        dice[i].addEventListener('click', function () {
            if (dice[i].classList.contains('hold')) {
                dice[i].classList.remove('hold');
            } else {
                dice[i].classList.add('hold');
            }
        });
    }

    // Gets all the selectable scores
    let selections = document.getElementsByClassName('selectable');
    for (let i = 0; i < selections.length; i++) {
        selections[i].addEventListener('click', newRound);
    }
})

// How many rolls are left this round
let diceRoll = 3;
let rollNumber = document.getElementById('remaining-rolls');

/**
 * Rolls any dice that doesn't have the
 * hold class
 */
function rollDice() {
    if (diceRoll > 0) {
        for (let i = 0; i < dice.length; i++) {
            // Check if the dice contains the hold class
            if (dice[i].classList.contains('hold')) {
                continue;
            } else {

                // Check what class this dice contains
                if (dice[i].classList.contains('one')) {
                    dice[i].classList.remove('one');
                } else if (dice[i].classList.contains('two')) {
                    dice[i].classList.remove('two');
                } else if (dice[i].classList.contains('three')) {
                    dice[i].classList.remove('three');
                } else if (dice[i].classList.contains('four')) {
                    dice[i].classList.remove('four');
                } else if (dice[i].classList.contains('five')) {
                    dice[i].classList.remove('five');
                } else if (dice[i].classList.contains('six')) {
                    dice[i].classList.remove('six');
                }

                // Random number for the dice
                let randomNumber = Math.floor(Math.random() * 6);

                // Switch statement to add the relevant class to the selected dice
                switch (randomNumber) {
                    case 0:
                        dice[i].classList.add('one');
                        break;
                    case 1:
                        dice[i].classList.add('two');
                        break;
                    case 2:
                        dice[i].classList.add('three');
                        break;
                    case 3:
                        dice[i].classList.add('four');
                        break;
                    case 4:
                        dice[i].classList.add('five');
                        break;
                    case 5:
                        dice[i].classList.add('six');
                        break;
                    default:
                        console.log(`An error has occurred! randomNumber = ${randomNumber}`);
                }
            }
        }

        // Lower the amount of rolls left this round
        diceRoll--;
        rollNumber.innerHTML = diceRoll;
    }
}

/**
 * Starts a new round when a selectable scores
 * button is clicked
 */
function newRound() {
    if (!this.classList.contains('selected')) {
        this.classList.add('selected');
        if (this.id === 'ones-score') {
            onesScore();
        } else if (this.id === 'twos-score') {
            twosScore();
        } else if (this.id === 'threes-score') {
            threesScore();
        } else if (this.id === 'fours-score') {
            foursScore();
        }
    }
}

/**
 * Increments the ones score by
 * 1 times number of 1's
 */
function onesScore() {
    let score = 0;
    for (let i = 0; i < dice.length; i++) {
        if (dice[i].classList.contains('one')) {
            score++;
        }
    }
    document.getElementById('ones-score').innerHTML = score;
}

/**
 * Increments the twos score by
 * 2 times number of 2's
 */
function twosScore() {
    let score = 0;
    for (let i = 0; i < dice.length; i++) {
        if (dice[i].classList.contains('two')) {
            score += 2;
        }
    }
    document.getElementById('twos-score').innerHTML = score;
}

/**
 * Increments the threes score by
 * 3 times number of 3's
 */
function threesScore() {
    let score = 0;
    for (let i = 0; i < dice.length; i++) {
        if (dice[i].classList.contains('three')) {
            score += 3;
        }
    }
    document.getElementById('threes-score').innerHTML = score;
}

/**
 * Increments the fours score by
 * 4 times number of 4's
 */
function foursScore() {
    let score = 0;
    for (let i = 0; i < dice.length; i++) {
        if (dice[i].classList.contains('four')) {
            score += 4;
        }
    }
    document.getElementById('fours-score').innerHTML = score;
}