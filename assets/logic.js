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
    correctAnswer: 1,
    alreadyAsked: false
}, {
    question: "test question",
    choices: ['A', 'B', 'C', 'D'],
    correctAnswer: 2,
    alreadyAsked: false
}
]


//seconds to play the game, starting high for testing purposes
var secondsLeft = 180;

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
  
      if(secondsLeft === 0) {
        clearInterval(timerInterval);
        //end quiz: Out of time
        alert("Time is up")

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
    }
  })
}
