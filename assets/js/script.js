// The dice on the board
let dice = document.getElementsByClassName('dice');
let gotYahtzee = false;
let round = 0;
let newGameButton = document.getElementById('new-game');
// Event listener for DOM load
document.addEventListener("DOMContentLoaded", function () {
    // Dice roll button
    let diceRollButton = document.getElementById("roll-dice");
    diceRollButton.addEventListener('click', rollDice);
    for (let i = 0; i < dice.length; i++) {

        // Add or remove the hold class
        dice[i].addEventListener('click', function () {
            if (dice[i].classList.length >= 2) {
                if (dice[i].classList.contains('hold')) {
                    dice[i].classList.remove('hold');
                } else {
                    dice[i].classList.add('hold');
                }
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

// individual dice values
let dices = [0, 0, 0, 0, 0];

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
                        dices[i] = 1;
                        break;
                    case 1:
                        dice[i].classList.add('two');
                        dices[i] = 2;
                        break;
                    case 2:
                        dice[i].classList.add('three');
                        dices[i] = 3;
                        break;
                    case 3:
                        dice[i].classList.add('four');
                        dices[i] = 4;
                        break;
                    case 4:
                        dice[i].classList.add('five');
                        dices[i] = 5;
                        break;
                    case 5:
                        dice[i].classList.add('six');
                        dices[i] = 6;
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

// Left scores subtotal (before bonus)
let leftScoreSub = document.getElementById('left-subtotal');

// Left scores total (After bonus)
let leftScoreTotal = document.getElementsByClassName('left-total');

// Right scores total
let rightScoreTotal = document.getElementById('right-scores');

// Both total right scores
let bothRightScores = document.getElementsByClassName('right-total')

// Total score
let totalScore = document.getElementById('game-total');

// High score
let highScore = document.getElementById('high-score-total');

/**
 * Starts a new round when a selectable scores
 * button is clicked
 */
function newRound() {
    let score;
    if (!this.classList.contains('selected')) {
        this.classList.add('selected');
        for (let i = 0; i < dice.length; i++) {
            if (dice[i].classList.contains('hold')) {
                dice[i].classList.remove('hold');
            }
        }
        if (this.id === 'ones-score') {
            score = onesScore();
            document.getElementById('ones-score').innerHTML = score;
            leftScore(score);
        } else if (this.id === 'twos-score') {
            score = twosScore();
            document.getElementById('twos-score').innerHTML = score;
            leftScore(score);
        } else if (this.id === 'threes-score') {
            score = threesScore();
            document.getElementById('threes-score').innerHTML = score;
            leftScore(score);
        } else if (this.id === 'fours-score') {
            score = foursScore();
            document.getElementById('fours-score').innerHTML = score;
            leftScore(score);
        } else if (this.id === 'fives-score') {
            score = fivesScore();
            document.getElementById('fives-score').innerHTML = score;
            leftScore(score);
        } else if (this.id === 'sixes-score') {
            score = sixesScore();
            document.getElementById('sixes-score').innerHTML = score;
            leftScore(score);
        } else if (this.id === 'three-of-a-kind-score') {
            score = threeOfAKind();
            document.getElementById('three-of-a-kind-score').innerHTML = score;
            rightScore(score);
        } else if (this.id === 'four-of-a-kind-score') {
            score = fourOfAKind();
            document.getElementById('four-of-a-kind-score').innerHTML = score;
            rightScore(score);
        } else if (this.id === 'small-straight-score') {
            score = smallStraight();
            document.getElementById('small-straight-score').innerHTML = score;
            rightScore(score);
        } else if (this.id === 'large-straight-score') {
            score = largeStraight();
            document.getElementById('large-straight-score').innerHTML = score;
            rightScore(score);
        } else if (this.id === 'full-house-score') {
            score = fullHouse();
            document.getElementById('full-house-score').innerHTML = score;
            rightScore(score);
        } else if (this.id === 'yahtzee-score') {
            score = yahtzee();
            document.getElementById('yahtzee-score').innerHTML = score;
            rightScore(score);
        } else if (this.id === 'chance-score') {
            score = chance();
            document.getElementById('chance-score').innerHTML = score;
            rightScore(score);
        }
        round++;
        if (round < 13) {
            diceRoll = 3;
            rollDice();
        } else {
            newGameButton.style.display = 'inline-block';
            newGameButton.addEventListener('click', newGame);
            newHighScore();
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
    return score;
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
    return score;
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
    return score;
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
    return score;
}

/**
 * Increments the fives score by
 * 5 times number of 5's
 */
function fivesScore() {
    let score = 0;
    for (let i = 0; i < dice.length; i++) {
        if (dice[i].classList.contains('five')) {
            score += 5;
        }
    }
    return score;
}

/**
 * Increments the sixes score by
 * 6 times number of 6's
 */
function sixesScore() {
    let score = 0;
    for (let i = 0; i < dice.length; i++) {
        if (dice[i].classList.contains('six')) {
            score += 6;
        }
    }
    return score;
}

/**
 * Adds the subtotal score and then
 * the total score
 */
function leftScore(scoreUpdate) {
    let score = parseInt(leftScoreSub.innerText);
    score += scoreUpdate;
    leftScoreSub.innerHTML = score;
    let bonus = document.getElementById('bonus-score');
    if (score >= 63) {
        bonus.innerHTML = 35;
    }
    for (let i = 0; i < leftScoreTotal.length; i++) {
        leftScoreTotal[i].innerHTML = parseInt(bonus.innerText) + score;
        if (score + parseInt(bonus.innerText) >= 100 && !leftScoreTotal[i].classList.contains('expanded')) {
            leftScoreTotal[i].classList.add('expanded');
        }
    }
    finalScore();
    if (score >= 100 && !leftScoreSub.classList.contains('expanded')) {
        leftScoreSub.classList.add('expanded');
    }
}

/**
 * Increments the three of a kind score
 * by all the numbers on the dice
 * if 3 of the dice are equal
 */
function threeOfAKind() {
    let counter = 0;
    let score = 0;
    dices.sort();
    for (let i = 0; i < 4; i++) {
        if (dices[i] === dices[i+1]) {
            counter++;
        } else if (counter === 1 && dices[i] !== dices[i+1]) {
            counter = 0;
        }
        if (counter === 2) {
            for (let j = 0; j < 5; j++) {
                score += dices[j];
            }
            break;
        }
    }
    return score;
}

/**
 * Increments the four of a kind score
 * by all the numbers in the dice
 * if 4 of the dice are equal
 */
function fourOfAKind() {
    let counter = 0;
    let score = 0;
    dices.sort();
    for (let i = 0; i < 4; i++) {
        if (dices[i] === dices[i+1]) {
            counter++;
        } else if (counter >= 1 && dices[i] !== dices[i+1]) {
            break;
        }
        if (counter === 3) {
            for (let j = 0; j < 5; j++) {
                score += dices[j];
            }
            break;
        }
    }
    return score;
}

/**
 * Increments the small straight score
 * by 30 points if there is a sequence of
 * 4 dice either from 1-4, 2-5 or 3-6.
 * If not, returns a score of 0
 */
function smallStraight() {
    let counter = 0;
    let score = 0;
    dices.sort();
    for (let i = 0; i < 4; i++) {
        if (dices[i] + 1 === dices[i+1]) {
            counter++;
        } else if (dices[i] === dices[i+1]) {
            continue;
        } else if (counter >= 1 && dices[i] + 1 !== dices[i+1]) {
            break;
        }
        if (counter === 3) {
            score = 30;
            break;
        }
    }
    return score;
}

/**
 * Increments the large straight score
 * by 40 points if there is a sequence of
 * 5 dice either from 1-5 or 2-6.
 * If not, returns a score of 0
 */
function largeStraight() {
    dices.sort();
    let score = 0;
    let counter = 0;
    for (let i = 0; i < dice.length - 1; i++) {
        if (dices[i] + 1 === dices[i + 1]) {
            counter++;
        } else {
            break;
        }
        if (counter === 4) {
            score = 40;
        }
    }
    return score;
}

/**
 * Checks if the dice forms
 * 3 of a kind and a pair.
 * Scores 25 points if so, if not
 * then scores 0
 */
function fullHouse() {
    dices.sort();
    let score = 0;
    let counter = 0;
    let pair = false;
    let triple = false;
    for (let i = 0; i < 4; i++) {
        if (dices[i] === dices[i+1]) {
            counter++;
        }
        if (counter === 1 && dices[i] !== dices[i+1] && !pair) {
            pair = true;
            continue;
        }
        if (counter === 2 && dices[i] !== dices[i+1] && !pair) {
            triple = true;
            continue;
        }
        if (dices[i] !== dices[i+1]) {
            break;
        }
        if (counter === 3 && !triple && !pair && dices[i] !== dices[i+1]) {
            break;
        }
        if ((counter === 3 && (triple || pair)) || counter === 4) {
            score = 25;
        }
    }
    return score;
}

/**
 * Check if player got all 5 dice
 * the same number, and if they are,
 * player receives 50 points. Otherwise,
 * player receives a score of 0
 */
function yahtzee() {
    let counter = 0;
    let score = 0;
    for (let i = 0; i < dices.length - 1; i++) {
        if (dices[i] === dices[i + 1]) {
            counter++;
        } else {
            break;
        }
        if (counter === 4) {
            score = 50;
            gotYahtzee = true;
        }
    }
    return score;
}

/**
 * Adds all the dice together.
 * Always shows the sum of all dice together
 */
function chance() {
    let sum = 0;
    for (let i = 0; i < dices.length; i++) {
        sum += dices[i];
    }
    return sum;
}

/**
 * Adds the total score of 
 * the right board
 */
function rightScore(scoreUpdate) {
    let score = parseInt(rightScoreTotal.innerText);
    score += scoreUpdate;
    for (let i = 0; i < bothRightScores.length; i++) {
        bothRightScores[i].innerHTML = score;
        if (score >= 100 && !bothRightScores[i].classList.contains('expanded')) {
            bothRightScores[i].classList.add('expanded');
        }
    }
    finalScore();
}

/**
 * Adds the total score of
 * the game
 */
function finalScore() {
    let score = parseInt(totalScore.innerText);
    score = parseInt(leftScoreTotal[1].innerText) + parseInt(bothRightScores[1].innerText);
    totalScore.innerHTML = score;
    if (score >= 100 && !totalScore.classList.contains('expanded')) {
        totalScore.classList.add('expanded');
    }
}

/**
 * resets the game back to 0
 */
function newGame() {
    let selected = document.getElementsByClassName('selected');
    for (let i = selected.length - 1; i >= 0; i--) {
        selected[i].innerHTML = '';
        selected[i].classList.remove('selected');
    }
    newGameButton.style.display = 'none';
    for (let i = 0; i < 2; i++) {
        if (leftScoreTotal[i].classList.contains('expanded')) {
            leftScoreTotal[i].classList.remove('expanded');
        }
        leftScoreTotal[i].innerHTML = 0;
        if (bothRightScores[i].classList.contains('expanded')) {
            bothRightScores[i].classList.remove('expanded');
        }
        bothRightScores[i].innerHTML = 0;
    }
    if (totalScore.classList.contains('expanded')) {
        totalScore.classList.remove('expanded');
    }
    totalScore.innerHTML = 0;
    if (leftScoreSub.classList.contains('expanded')) {
        leftScoreSub.classList.remove('expanded');
    }
    leftScoreSub.innerHTML = 0;
    document.getElementById('bonus-score').innerHTML = 0;
    diceRoll = 3;
    round = 0;
    rollDice();
}

/**
 * Checks the current highest score
 * and changes it if the new score
 * is higher than the current high score
 */
function newHighScore() {
    let currentHighScore = parseInt(highScore.innerText);
    let score = parseInt(totalScore.innerText);
    score = Math.max(score, currentHighScore);
    highScore.innerHTML = score;
}