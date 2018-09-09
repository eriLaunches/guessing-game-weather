/* 

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "testem".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

*/


//generate winning num
function generateWinningNumber(){
    return Math.floor(Math.random() * 100) + 1; 
};


//shuffles numbers in an array
function shuffle (arr) {
    let arrLength = arr.length;
    let randomIdx;

    while (arrLength) {
        randomIdx = Math.floor(Math.random() * arrLength);
        arrLength--


       //swapping random element with the last element 
        lastElement = arr[arrLength]
        arr[arrLength] = arr[randomIdx] //assigning the last element the random element
        arr[randomIdx] = lastElement
    }
    return arr
};

//Game class
class Game {
    constructor () {
        this.playersGuess = null;
        this.pastGuesses = [];
        this.winningNumber = generateWinningNumber();
        this.hintBoolean = false;
        this.winGame = false;
    }

    //Method 1: returns difference between players guess and winning num
    difference(){return Math.abs(this.playersGuess - this.winningNumber)};

    //Method 2: 
    isLower(){
        if (this.playersGuess < this.winningNumber) return 'guess higher!';
        else if (this.playersGuess > this.winningNumber) return 'guess lower!';
        else if (this.playersGuess === this.winningNumber){
            document.querySelector('body').style.backgroundImage = imagesObj.windCloud;
            document.querySelector('body').style.backgroundPosition = 'right'
            document.getElementById('guess-1').style.backgroundImage = imagesObj.windCloud;
            document.getElementById('guess-2').style.backgroundImage = imagesObj.windCloud;
            document.getElementById('guess-3').style.backgroundImage = imagesObj.windCloud;
            document.getElementById('guess-4').style.backgroundImage = imagesObj.windCloud;
            document.getElementById('guess-5').style.backgroundImage = imagesObj.windCloud;


            return 'thanks for bringing in sunshine!';
        }
    };

    //Method 3:
    playersGuessSubmission(guess) {
        if (guess < 1 || guess > 100 || typeof (guess) !== 'number') {
            return 'invalid guess'
        }  
        else {
          this.playersGuess = guess
          return this.checkGuess();
        }
      };

    //Method 4
    checkGuess () {
        if (this.playersGuess === this.winningNumber) {
            this.winGame = true;
            document.querySelector('input').disabled = true
            document.getElementById('submit').disabled = true
            document.getElementById('submit').style.backgroundColor = 'lightgrey'
            document.getElementById('hint').disabled = true
            document.getElementById('hint').style.backgroundColor = 'lightgrey'
            return `You Win! ${this.winningNumber} yields warm weather`
        } 
        else if (this.pastGuesses.includes(this.playersGuess)) return 'You have already guessed that number.'
        else  {
            this.pastGuesses.push(this.playersGuess)
            if (this.pastGuesses.length>=5) {
                 return `You Lost :(. The winning number is ${this.winningNumber}`
            }
            else if (this.difference() < 10) return `You're burning up!`
            else if (this.difference() < 25) return "You're lukewarm."
            else if (this.difference() < 50) return "You're a bit chilly."
            else return "You're ice cold!"
        }
    };


    //Method 5
    provideHint () {
        if (!this.hintBoolean) {
            let arr = [this.winningNumber, generateWinningNumber(), generateWinningNumber()] 
            let hintArr = shuffle(arr)
            this.hintBoolean = true;
            return `It is amongst one of these 3 numbers: [${hintArr[0]}, ${hintArr[1]}, ${hintArr[2]}]`
        }
        else {
            return `Hint already provided`
        }
    };    
};


let imagesObj = {
    rainingCloud: "url('images/RainingCloud.png')",
    snowCloud: "url('images/SnowCloud.png')",
    thunderCloud: "url('images/ThunderCloud.png')",
    windCloud:  "url('images/WindCloud.png')",
    deadCloud: "url('images/DeadCloud.png')" ,
    sunshine: "url('images/sunshine.png')"

}


function newGame () {
    return new Game();
 };


//start a new game
let game = newGame()

//When user clicks submit
let submitButton = document.getElementById('submit') //returns submit button object


submitButton.addEventListener('click', function (){  //add an eventlistener to the submit button object
    //set equal to the number the user inputted
    let userInput = Number(document.querySelector('input').value); 

    //give feedback on user's guess (i.e. hot/cold/invalid)
    document.querySelector('h2').textContent = game.playersGuessSubmission(userInput) 
    
    
    //add user guess to list
   if (game.pastGuesses.length === 1 && !this.winGame) {
        document.getElementById('guess-1').textContent = game.pastGuesses[0] 
        document.getElementById('guess-1').style.alignContent = 'bottom'
        document.getElementById('guess-1').style.backgroundImage = imagesObj.windCloud;
        document.querySelector('body').style.backgroundImage = imagesObj.windCloud;

    }
    if (game.pastGuesses.length === 2 && !this.winGame) {
        document.getElementById('guess-2').textContent = game.pastGuesses[1] 
        document.getElementById('guess-2').style.backgroundImage = imagesObj.rainingCloud;
        document.querySelector('body').style.backgroundImage = imagesObj.rainingCloud;
        document.querySelector('body').style.backgroundPosition = 'right'



    }
    if (game.pastGuesses.length === 3 && !this.winGame) {
        document.getElementById('guess-3').textContent = game.pastGuesses[2] 
        document.getElementById('guess-3').style.backgroundImage = imagesObj.snowCloud;
        document.querySelector('body').style.backgroundImage = imagesObj.snowCloud;
        document.querySelector('body').style.backgroundPosition = 'bottom right'


    }
    if (game.pastGuesses.length === 4 && !this.winGame) {
        document.getElementById('guess-4').textContent = game.pastGuesses[3] 
        document.getElementById('guess-4').style.backgroundImage = imagesObj.thunderCloud;
        document.querySelector('body').style.backgroundImage = imagesObj.thunderCloud;
        document.querySelector('body').style.backgroundPosition = 'bottom left'



    }
    if (game.pastGuesses.length === 5 && !this.winGame) {
        document.getElementById('guess-5').textContent = game.pastGuesses[4] 
        document.getElementById('guess-5').style.backgroundImage = imagesObj.deadCloud;
        document.querySelector('body').style.backgroundImage = imagesObj.deadCloud;
        document.querySelector('body').style.backgroundPosition = 'left'

    


    }
    
    //tell user to guess higher or lower. 
   
    if (game.pastGuesses.length < 5) {
        document.querySelector('h3').textContent = game.isLower()
    }
    if (game.pastGuesses.length === 5) {
        document.querySelector('h3').textContent = 'To try again, click Reset';
        document.querySelector('input').disabled = true
        document.getElementById('submit').disabled = true
        document.getElementById('submit').style.backgroundColor = 'lightgrey'
        document.getElementById('hint').disabled = true
        document.getElementById('hint').style.backgroundColor = 'lightgrey'
    }

    
    
    document.querySelector('input').value = ''
  
    console.log(game.pastGuesses)

})

//When user clicks hint
let hintButton = document.getElementById('hint')
hintButton.addEventListener('click',function(){
    document.querySelector('h2').textContent = game.provideHint()
})


//When user clicks reset
let resetButton = document.getElementById('reset')
resetButton.addEventListener('click', function() {
    //game = newGame()
    window.location.reload(true);
})



    








