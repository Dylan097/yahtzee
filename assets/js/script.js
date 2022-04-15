document.addEventListener("DOMContentLoaded", function () {
    let diceRollButton = document.getElementById("roll-dice");
    diceRollButton.addEventListener('click', rollDice);
    let dice = document.getElementsByClassName('dice');
    for (let i = 0; i < dice.length; i++) {
        dice[i].addEventListener('click', function () {
            if (dice[i].classList.contains('hold')) {
                dice[i].classList.remove('hold');
            } else {
                dice[i].classList.add('hold');
            }
        });
    }
})

let diceRoll = 3;
let rollNumber = document.getElementById('remaining-rolls');

function rollDice() {
    let dice = document.getElementsByClassName('dice');
    if (diceRoll > 0) {
        for (let i = 0; i < dice.length; i++) {
            if (dice[i].classList.contains('hold')) {
                continue;
            } else {
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
                let randomNumber = Math.floor(Math.random() * 6);
                console.log(randomNumber);
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
        diceRoll--;
        rollNumber.innerHTML = diceRoll;
    }
}