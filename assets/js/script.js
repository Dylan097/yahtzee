// The dice on the board
let dice = document.getElementsByClassName('dice');
let gotYahtzee = false;
let round = 0;
let newGameButton = document.getElementById('new-game');
// Event listener for DOM load
document.addEventListener("DOMContentLoaded", function () {
    // Dice roll button
    let diceRollButton = document.getElementById("roll-dice");
    // Roll the dice when the roll dice button is clicked
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
        // Start a new round when a score is clicked
        selections[i].addEventListener('click', newRound);
    }
    // Get the rules button
    let rulesButton = document.getElementById('rules-button');
    // Get the rules
    let rules = document.getElementsByClassName('rules-and-strats')[0];
    // Get the rules tab
    let rulesTab = document.getElementsByClassName('rules')[0];
    // Get the rules tab button
    let rulesTabButton = document.getElementById('game-rules');
    // Get the basic strategies tab
    let basicsTab = document.getElementsByClassName('basics')[0];
    // Get the basic strategies button
    let basicsButton = document.getElementById('basic-strat');
    // Get the advanced strategies tab
    let advancedTab = document.getElementsByClassName('advanced')[0];
    // Get the advanced strategies button
    let advancedButton = document.getElementById('advanced-strat');
    // Open or close rules when button is clicked
    rulesButton.addEventListener('click', function () {
        if (rules.classList.contains('display')) {
            // Close rules if they're open
            rules.classList.remove('display');
        } else {
            // Open rules if they're closed
            rules.classList.add('display');
            // Get the close button
            let close = document.getElementById('close');
            // Closes the rules
            close.addEventListener('click', function () {
                rules.classList.remove('display');
            });
        }
        rulesTabButton.addEventListener('click', function () {
            if (!rulesTab.classList.contains('display')) {
                document.getElementsByClassName('display')[1].classList.remove('display');
                rulesTab.classList.add('display');
                document.getElementsByClassName('active')[0].classList.remove('active');
                rulesTabButton.classList.add('active');
            }
        });
        basicsButton.addEventListener('click', function () {
            if (!basicsTab.classList.contains('display')) {
                document.getElementsByClassName('display')[1].classList.remove('display');
                basicsTab.classList.add('display');
                document.getElementsByClassName('active')[0].classList.remove('active');
                basicsButton.classList.add('active');
            }
        });
        advancedButton.addEventListener('click', function () {
            if (!advancedTab.classList.contains('display')) {
                document.getElementsByClassName('display')[1].classList.remove('display');
                advancedTab.classList.add('display');
                document.getElementsByClassName('active')[0].classList.remove('active');
                advancedButton.classList.add('active');
            }
        });
    });
});

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
    // Only roll the dice if there's rolls available
    if (diceRoll > 0) {
        for (let i = 0; i < dice.length; i++) {
            // Check if the dice contains the hold class
            if (dice[i].classList.contains('hold')) {
                // Checks what the dice number is and assigns it to the dices array position
                if (dice[i].classList.contains('one')) {
                    dices[i] = 1;
                } else if (dice[i].classList.contains('two')) {
                    dices[i] = 2;
                } else if (dice[i].classList.contains('three')) {
                    dices[i] = 3;
                } else if (dice[i].classList.contains('four')) {
                    dices[i] = 4;
                } else if (dice[i].classList.contains('five')) {
                    dices[i] = 5;
                } else {
                    dices[i] = 6;
                }
            } else {
                // If the dice isn't held
                // Check what class this dice contains and remove it
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
        // Show what scores a player can currently get
        potentialScore();
    }
}

// Left scores subtotal (before bonus)
let leftScoreSub = document.getElementById('left-subtotal');

// Left scores total (After bonus)
let leftScoreTotal = document.getElementsByClassName('left-total');

// Right scores total
let rightScoreTotal = document.getElementById('right-scores');

// Both total right scores
let bothRightScores = document.getElementsByClassName('right-total');

// Total score
let totalScore = document.getElementById('game-total');

// High score
let highScore = document.getElementById('high-score-total');

/**
 * Shows potential score with
 * current dice roll
 */
function potentialScore() {
    // Gets all the selectable scores
    let allScore = document.getElementsByClassName('selectable');
    for (let i = 0; i < allScore.length; i++) {
        let score = 0;
        // Check if the score is selected already or not
        if (allScore[i].classList.contains('selected')) {
            continue;
        }
        switch (i) {
            case 0:
                score = onesScore();
                break;
            case 1:
                score = twosScore();
                break;
            case 2:
                score = threesScore();
                break;
            case 3:
                score = foursScore();
                break;
            case 4:
                score = fivesScore();
                break;
            case 5:
                score = sixesScore();
                break;
            case 6:
                score = threeOfAKind();
                break;
            case 7:
                score = fourOfAKind();
                break;
            case 8:
                score = smallStraight();
                break;
            case 9:
                score = largeStraight();
                break;
            case 10:
                score = fullHouse();
                break;
            case 11:
                score = yahtzee();
                break;
            case 12:
                score = chance();
                break;
            default:
                console.log('Something has messed up somewhere!');
                console.log(`You're at index number ${i}`);
        }
        // Adds a score if the score isn't 0
        if (score !== 0) {
            allScore[i].innerHTML = score;
        } else {
            allScore[i].innerHTML = '';
        }
    }
}

/**
 * Starts a new round when a selectable scores
 * button is clicked
 */
function newRound() {
    let score;
    // Check if the chosen score has already been selected
    if (!this.classList.contains('selected')) {
        this.classList.add('selected');
        for (let i = 0; i < dice.length; i++) {
            // Removes the hold class ready for the next roll
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
        // Increase round number by 1
        round++;
        // All scores filled if round = 13
        if (gotYahtzee && score !== 0 && this.id !== 'yahtzee-score') {
            let extraScore = multiYahtzee();
            if (extraScore === 50) {
                score += 50;
                this.innerHTML = score;
            }
        }
        if (round < 13) {
            // Dice is reset then rerolled if round is not >= 13
            diceRoll = 3;
            rollDice();
        } else {
            // Displays the new game button
            newGameButton.style.display = 'inline-block';
            // Start a new game when button is clicked
            newGameButton.addEventListener('click', newGame);
            // Compare the new score to the high score
            // Replaces the high score if new score is higher
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
    // Score subtotal is increased
    leftScoreSub.innerHTML = score;
    let bonus = document.getElementById('bonus-score');
    // Check if score is greater than or equal to 63
    if (score >= 63) {
        // Set the bonus score if so
        bonus.innerHTML = 35;
    }
    for (let i = 0; i < leftScoreTotal.length; i++) {
        // Set left scores to subtotal + bonus
        // Shows the subtotal if subtotal is less than 63
        leftScoreTotal[i].innerHTML = parseInt(bonus.innerText) + score;
        // Expands the total scores box if total is greater than 100
        if (score + parseInt(bonus.innerText) >= 100 && !leftScoreTotal[i].classList.contains('expanded')) {
            leftScoreTotal[i].classList.add('expanded');
        }
    }
    finalScore();
    // Expands the subtotal scores box if subtotal is greater than 100
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
    // Increases by 1 when 2 numbers are equal
    let counter = 0;
    let score = 0;
    // Sort dice from lowest number to highest number
    dices.sort();
    for (let i = 0; i < 4; i++) {
        if (dices[i] === dices[i + 1]) {
            counter++;
        } else if (counter === 1 && dices[i] !== dices[i + 1]) {
            // Resets counter incase of 2 pairs, as will show 3 of a kind as true otherwise
            counter = 0;
        }
        if (counter === 2) {
            // Three of a kind found
            for (let j = 0; j < 5; j++) {
                // Adds the total of each dice face
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
    // Counter increases by 1 when 2 dice are the same
    let counter = 0;
    let score = 0;
    // Sorts dice from lowest number to highest number
    dices.sort();
    for (let i = 0; i < 4; i++) {
        if (dices[i] === dices[i + 1]) {
            counter++;
        } else if (counter >= 1 && dices[i] !== dices[i + 1]) {
            // Loop breaks if 1 pair is found, as four of a kind can't be done with 1 pair
            break;
        }
        if (counter === 3) {
            // Four of a kind found
            for (let j = 0; j < 5; j++) {
                // Adds the total of each dice face
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
    // Counter increases by 1 when the next number is 1 more than the current number
    let counter = 0;
    let score = 0;
    // Sorts dice from lowest number to highest number
    dices.sort();
    for (let i = 0; i < 4; i++) {
        if (dices[i] + 1 === dices[i + 1]) {
            counter++;
        } else if (dices[i] === dices[i + 1]) {
            // Both dice are the same, small straight can still be found
            continue;
        } else if (counter >= 1 && dices[i] + 1 !== dices[i + 1]) {
            // Dice are too far apart, can't find small straight
            break;
        }
        if (counter === 3) {
            // Small straight found
            // Score increases by 30
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
    // Sort dice from lowest number to highest number
    dices.sort();
    let score = 0;
    // Counter increases by 1 when 2 numbers increase by 1
    let counter = 0;
    for (let i = 0; i < dice.length - 1; i++) {
        if (dices[i] + 1 === dices[i + 1]) {
            counter++;
        } else {
            // Dice doesn't increase by 1, large straight not possible
            break;
        }
        if (counter === 4) {
            // Large straight found
            // Score increases by 40
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
    // Sort dice from lowest number to highest number
    dices.sort();
    let score = 0;
    // Counter increases by 1 when 2 dice are the same
    let counter = 0;
    // Returns true when a pair is found
    let pair = false;
    // Returns true when a three of a kind is found
    let triple = false;
    for (let i = 0; i < 4; i++) {
        if (dices[i] === dices[i + 1]) {
            counter++;
        }
        if (counter === 1 && dices[i] !== dices[i + 1] && !pair) {
            // Pair found, but next number isn't the same
            // Pair is now true
            pair = true;
            continue;
        }
        if (counter === 2 && dices[i] !== dices[i + 1] && !pair) {
            // Pair found, but three of a kind also found
            // next number isn't the same
            // triple is true, but pair is false
            triple = true;
            continue;
        }
        if (dices[i] !== dices[i + 1]) {
            // Dices are not the same, and the counter doesn't allow for pair or three of a kind
            break;
        }
        if (counter === 3 && !triple && !pair && dices[i] !== dices[i + 1]) {
            // Can get fullhouse with yahtzee
            // If four of a kind, then loop will break
            break;
        }
        if ((counter === 3 && (triple || pair)) || counter === 4) {
            // If yahtzee or full house, score increases by 25
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
    // Counter increases by 1 when 2 numbers are the same
    let counter = 0;
    let score = 0;
    for (let i = 0; i < dices.length - 1; i++) {
        if (dices[i] === dices[i + 1]) {
            counter++;
        } else {
            // All dice must be the same. Loop breaks as a result of this being different
            break;
        }
        if (counter === 4) {
            // All dice found the same. Score increases by 50
            score = 50;
            // Yahtzee has been found, all scores can now increase by an extra 50 points if they get yahtzee
            // This rules doesn't include small straight or large staright
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
        // Iterate through each dice face and increase sum by dice face
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
    // Increase the right score by updated score 
    score += scoreUpdate;
    for (let i = 0; i < bothRightScores.length; i++) {
        bothRightScores[i].innerHTML = score;
        if (score >= 100 && !bothRightScores[i].classList.contains('expanded')) {
            // Expands right totals scores boxes if right total is greater than or equal to 100
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
    // Shows left score total plus right score total
    score = parseInt(leftScoreTotal[1].innerText) + parseInt(bothRightScores[1].innerText);
    totalScore.innerHTML = score;
    if (score >= 100 && !totalScore.classList.contains('expanded')) {
        // Expands total scores box if total is greater than or equal to 100
        totalScore.classList.add('expanded');
    }
}

/**
 * resets the game back to 0
 */
function newGame() {
    let selected = document.getElementsByClassName('selected');
    // Removes the selected class from each score, and removes their contents
    for (let i = selected.length - 1; i >= 0; i--) {
        selected[i].innerHTML = '';
        selected[i].classList.remove('selected');
    }
    // Removes the new game button
    newGameButton.style.display = 'none';
    for (let i = 0; i < 2; i++) {
        // Checks if current left score total is expanded and removes the class
        if (leftScoreTotal[i].classList.contains('expanded')) {
            leftScoreTotal[i].classList.remove('expanded');
        }
        // Current left score total is now 0
        leftScoreTotal[i].innerHTML = 0;
        // Checks if current right score total is expanded and removes the class
        if (bothRightScores[i].classList.contains('expanded')) {
            bothRightScores[i].classList.remove('expanded');
        }
        // Current right score total is now 0
        bothRightScores[i].innerHTML = 0;
    }
    // Checks if total score is expanded then removes the class from total score
    if (totalScore.classList.contains('expanded')) {
        totalScore.classList.remove('expanded');
    }
    // Total score is now 0
    totalScore.innerHTML = 0;
    // checks if subtotal score is expanded then removes the class from subtotal score
    if (leftScoreSub.classList.contains('expanded')) {
        leftScoreSub.classList.remove('expanded');
    }
    // Subtotal score is now 0
    leftScoreSub.innerHTML = 0;
    // Bonus score is now 0
    document.getElementById('bonus-score').innerHTML = 0;
    // Dice roll is reset to 3
    diceRoll = 3;
    // Round number is reset to 0
    round = 0;
    // Dice is rerolled
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
    // Checks which score is higher, then assigns is to score
    score = Math.max(score, currentHighScore);
    highScore.innerHTML = score;
}

/**
 * Checks if the user has got another
 * Yahtzee with their roll
 */
function multiYahtzee() {
    // Counter increases by 1 when 2 numbers are the same
    let counter = 0;
    let score = 0;
    for (let i = 0; i < dices.length - 1; i++) {
        if (dices[i] === dices[i + 1]) {
            counter++;
        } else {
            // All dice must be the same. Loop breaks as a result of this being different
            break;
        }
        if (counter === 4) {
            // All dice found the same. Score increases by 50
            score = 50;
        }
    }
    return score;
}