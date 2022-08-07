document.getElementById('start-button').addEventListener('click', setTime);
var timerEl = document.getElementById('time-display')

//seconds to play the game, starting low for testing purposes
var secondsLeft = 10;


function setTime() {
    var timerInterval = setInterval(function() {
      secondsLeft--;
      timerEl.textContent = secondsLeft + " seconds remaining."
  
      if(secondsLeft === 0) {
        clearInterval(timerInterval);
        alert("Time is up")
      }
  
    }, 1000);
  }