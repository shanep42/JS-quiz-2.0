document.getElementById('start-button').addEventListener('click', setTime);
document.getElementById('start-button').addEventListener('click', timedQuiz);
var timerEl = document.getElementById('time-display');
var displayedQuestion = document.getElementById('question-space');
var multipleChoices = document.querySelectorAll('.choice');
var currentQuestion;

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


function setTime() {
    var timerInterval = setInterval(function() {
      secondsLeft--;
      timerEl.textContent = secondsLeft + " seconds remaining"
  
      if(secondsLeft === 0) {
        clearInterval(timerInterval);
        alert("Time is up")
      }
  
    }, 1000);
  }


function timedQuiz() {
    fetchQuestion();
    function fetchQuestion() {
        currentQuestion = questions[Math.floor(Math.random() * questions.length)]
        console.log(`currentQuestion: ${currentQuestion}`);

        displayedQuestion.textContent = currentQuestion.question;

        for (i = 0; i < currentQuestion.choices.length; i++){
            multipleChoices[i].textContent = currentQuestion.choices[i];
        }
    }
}