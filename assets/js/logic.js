var startButton = document.getElementById('start-button')
var timerEl = document.getElementById('time-display');
var displayedQuestion = document.getElementById('question-space');
var multipleChoices = document.querySelectorAll('.choice');
var currentQuestionIndex = -1;
var currentQuestion;
var rightAnswerScore = 0;
var wrongAnswerScore = 0;
var score;
var submitButton = document.getElementById('score-submit')
var lastScore = localStorage.getItem('savedScore')

// I think I will likely need to write questions stored either as or like objects, so that each is accompanied by its multiple options for choices
var questions = [{
    question: "Inside which HTML element do we put the JavaScript?",
    choices: ["<js>", "<script>", "<scripting>", "<javascript>"],
    correctAnswer: 1
}, {
    question: "Where is the correct place to insert a JavaScript?",
    choices: ['Both the <head> section and the <body> section', 'The <head> section', 'The <body> section',],
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

function nextQuestion (event) {
    //hide the start button the first time it's called
  if (!startButton.classList.contains('hidden')){
      startButton[0].classList.add('hidden')
  }
  currentQuestionIndex++;
  var currentQuestion = questions[currentQuestionIndex];
  for (let i = 0; i < multipleChoices.length; i++){
      multipleChoices[i].classList.add('hidden')
      multipleChoices[i].classList.remove('correct')
  }
  if (currentQuestionIndex >= questions.length){
      outOfQuestions ();
      return;
  }

  displayedQuestion.textContent = currentQuestion.question;
  for (let i = 0; i < currentQuestion.choices.length; i++){
      multipleChoices[i].classList.remove('hidden');
      multipleChoices[i].textContent = currentQuestion.choices[i]
      console.log(multipleChoices)
  }

  document.addEventListener('click', function(event){
      if (event.target.dataset.option == 0
          || event.target.dataset.option == 1
          || event.target.dataset.option == 2
          || event.target.dataset.option == 3){
              // Correct Answer
              if (event.target.dataset.option == currentQuestion.correctAnswer) {
                  rightAnswerScore++;
                  nextQuestion();
              } else {
              // Wrong Answer
                  event.target.classList.add('hidden');
                //   wrongAnswerScore++;   I have no idea why wrong answer tracking is so difficult compared to correct ones. It appears to count correct answers as also being wrong, but only SOMETIMES
                  secondsLeft -= 5;
              }
          }
  })
  


}


function timeUp () {
    displayedQuestion.textContent = `Time is up! You scored ${rightAnswerScore} right answers.`;
    score = rightAnswerScore;
    scoreSubmit();
}

function outOfQuestions() {
    displayedQuestion.textContent = `You answered every question correct, with ${secondsLeft} seconds to spare!`;
    score = `⭐${secondsLeft}`
    scoreSubmit();
}

function scoreSubmit(){
    for (let i = 0; i < multipleChoices.length; i++){
        multipleChoices[i].classList.add("hidden");
    }
    document.getElementById('score-area').classList.remove('hidden');
    submitButton.addEventListener('click', function () {
        console.log(document.getElementById('initials').value)
        var savedScore = [document.getElementById('initials').value, score]
        localStorage.setItem('savedScore', savedScore);
        document.getElementById('initials-input').classList.add('hidden')
    })
    displayScore();
}

startButton.addEventListener('click', setTime);
startButton.addEventListener('click', nextQuestion);

displayScore();
console.log(document.getElementById('initials').value)