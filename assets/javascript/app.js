$(document).ready(function(){

  // start the game when user clicks on Start button
  $("#start-button").on("click", gameState.startTimer);

});

// information about the state of game play
var gameState = {

  // set the time at 60 seconds, and count down by 1 second
  timeRemaining : 60,

  // start the timer, hide the start page, show the questions
  startTimer: function() {
    $("#timer").text("Time remaining: " + gameState.timeRemaining);
    setInterval(gameState.countdown, 1000);
    $("#start-page").hide();
    trivia.displayQuestions();
  },

  // decrement the timer and update the UI; stop the timer at 0
  countdown: function() {
    gameState.timeRemaining--;
    $("#timer").text("Time remaining: " + gameState.timeRemaining);
    if (gameState.timeRemaining === 0) {
      gameState.stopTimer();
      $("#timer").empty();
    }
  },

  // stop the timer and check the answers
  stopTimer: function() {
    clearInterval();
    trivia.checkAnswers();
  },

  // hide the quetions and display the end page with results
  showEndPage: function(numCorrect, numIncorrect, numUnanswered) {
    $("#end-page").show();
    $("#questions-box").empty();
    $("#timer").empty();
    $("#timer").hide();
    $("#correct-answers").text("Correct answers : " + numCorrect);
    $("#incorrect-answers").text("Incorrect answers : " + numIncorrect);
    $("#unanswered").text("Skipped questions " + numUnanswered);
  }
}

// functions to handle the building questions page and scoring
var trivia = {

  // pull questions from the array of questions, loop through them, and append to UI
  displayQuestions: function() {
    var divContainer = $("#questions-box");
    var answerGroup = $(".form-check");
    divContainer.append('<h2>Answer the following questions:</h2>');
            
    for (var i = 0; i < questionBank.length; i++) {

      divContainer.append('<div id="question">' + questionBank[i].question + '</div>');

      var answer1 = questionBank[i].answers[0];
      var answer2 = questionBank[i].answers[1];
      var answer3 = questionBank[i].answers[2];

      divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer1 + '</label></div>');
      divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer2 + '</label></div>');
      divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer3 + '</label></div>');
    }

    // add a Done button to the end of the page and register its click handler
    var doneButton = '<button class="btn btn-secondary" id="done-button" type="submit">Done</button>';
    divContainer.append(doneButton);
    $("#done-button").on("click", gameState.stopTimer);
  },

  // test if the user answers are correct, incorrect, or if there are unanswered questions
  checkAnswers: function() {
    var correctAnswer;
    var userAnswer;
    var numCorrect = 0;
    var numIncorrect = 0;
    var numUnanswered = 0;

    // loop through to compare the text of the label with the user answers
    // increment score counts appropriately
    for (var i = 0; i < questionBank.length; i++) {
      correctAnswer = questionBank[i].correct;
      userAnswer = $('input[id=radio'+i+']:checked + label').text();

      if (userAnswer === correctAnswer) {
        numCorrect++;
      } else if (userAnswer === "") {
        numUnanswered++;
      } else if (userAnswer !== correctAnswer) {
        {
          numIncorrect++;
        }
      }
    }

    // show the end page with the score tally
    gameState.showEndPage(numCorrect, numIncorrect, numUnanswered);
  },
}

// array of objects with the questions, possible answers, and the correct answer
var questionBank =
[
  {
    question: "When was the game (Garry's Mod) released?",
    answers: ["2004", "2008", "2007"],
    correct: "2004"
  },

  {
    question: "Which of the following is NOT a summon in the game (South Park: The Stick of Truth)?",
    answers: ["Kyle Broflovski", "Eric Cartman", "Towelie"],
    correct: "Towelie"
  },
  {
    question: "What video game engine does the videogame Quake 2 run in?",
    answers: ["iD Tech 2", "Horde3D", "HeroEngine"],
    correct: "iD Tech 2"
  },
  {
    question: "What was The First Home Consle?",
    answers: ["NES", "Sega Genisis", "Oddessy"],
    correct: "Oddessy"
  },
  {
    question: "Who is the Most Famous Video Game Character of all Time?",
    answers: ["Solid Snake", "Mario", "HITMAN"],
    correct: "Mario"
  },
  {
    question: "What is Know as the Hardest Game of all Time?",
    answers: ["Ghosts and Goblins", "Assassin's Creed", "Ninja Giden"],
    correct: "Ghosts and Goblins"
  },
  {
    question: "What Part of an Xbox 360 causes the (Red Ring of Death) ?",
    answers: ["Graphics Card", "Heat Sink", "Both A and B"],
    correct: "Both A and B"
  },
 
]
