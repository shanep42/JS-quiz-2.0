var startButton = document.getElementById('start-button')
startButton.addEventListener('click', setTime);
startButton.addEventListener('click', quiz);
var timerEl = document.getElementById('time-display');
var displayedQuestion = document.getElementById('question-space');
var multipleChoices = document.querySelectorAll('.choice');
var currentQuestionIndex = -1;
var currentQuestion;
var rightAnswerScore = 0;
var wrongAnswerScore = 0;

// I think I will likely need to write questions stored either as or like objects, so that each is accompanied by its multiple options for choices
var questions = [{
    question: "Inside which HTML element do we put the JavaScript?",
    choices: ["<js>", "<script>", "<scripting>", "<javascript>"],
    correctAnswer: 1
}, {
    question: "Where is the correct place to insert a JavaScript?",
    choices: ['Both the <head> section and the <body> section', 'The <head> section', 'The <body> section', 'The location does not matter'],
    correctAnswer: 2
}, {
    question: "What is the correct syntax for referring to an external script called xxx.js?",
    choices: ['<script src="xxx.js"', '<script name="xxx.js"', '<script href="xxx.js"', 'script rel="xxx.js"'],
    correctAnswer: 0
}, {
    question: 'How do you write "Hello World" in an alert box?',
    choices: ['msg("Hello World")', 'alert("Hello World")', 'msgBox("Hello World")', 'alertBox("Hello World")'],
    correctAnswer: 1
}, {
    question: 'How do you create a function in JavaScript?',
    choices: ['function = myFunction()', 'function:myFunction()', 'function myFunction()', 'func myFunction()'],
    correctAnswer: 2
}, {
    question: 'How do you call a function named "My Function"?',
    choices: ['call function myFunction()', 'call myFunction()', 'myFunction.call', 'myFunction()'],
    correctAnswer: 3
}
]


//seconds to play the game
var secondsLeft = 15;

// TODO: Shuffle the questions so they are in a different order when you play more than once. 

// function shuffle(array) {
//   var m = array.length, t, i;
//   while (m) {
//     i = Math.floor(Math.random() * m--);
//     t = array[m];
//     array[m] = array[i];
//     array[i] = t;
//   }
//   return array;
// }


function setTime() {
    startButton.classList.add("hidden")
    var timerInterval = setInterval(function() {
      secondsLeft--;
      timerEl.textContent = secondsLeft + " seconds remaining"
  
      if(secondsLeft <= 0) {
        clearInterval(timerInterval);
        //end quiz: Out of time
        timeUp();

      }
  
    }, 1000);
    
}

function quiz() {
  currentQuestionIndex++;
  if (currentQuestionIndex > questions.length){
    //end quiz: Out of questions
    return;
  }

  currentQuestion = questions[currentQuestionIndex];
  displayedQuestion.textContent = currentQuestion.question;
  for (let i = 0; i < currentQuestion.choices.length; i++){
    multipleChoices[i].textContent = currentQuestion.choices[i];
    multipleChoices[i].classList.remove('hidden');
  }

  document.addEventListener('click', function(event){
    //right answers
    if (event.target.dataset.optionnumber == currentQuestion.correctAnswer){
      rightAnswerScore++;
      quiz();
    //wrong answers
    } else if (event.target.dataset.optionnumber != currentQuestion.correctAnswer && event.target.dataset.optionnumber != undefined) {
      wrongAnswerScore++;
      secondsLeft -= 5;
      //event.target.setAttribute('style', 'background-color: red')
      event.target.classList.add("hidden")
    }
  })
}


function timeUp () {
 for (let i = 0; i < multipleChoices.length; i++){
  multipleChoices[i].classList.add("hidden");
  displayedQuestion.textContent = `Time is up! You guessed right ${rightAnswerScore} times and wrong ${wrongAnswerScore}. Enter your initials to save your score!`;
  var initials = prompt("Your initials");
  var savedScore = [initials, rightAnswerScore, wrongAnswerScore, secondsLeft];
 }
}