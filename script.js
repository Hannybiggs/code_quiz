// Question list
var questions = [
  {
      title: "Commonly used data types DO NOT include:",
      choices: ["strings", "booleans", "alerts", "numbers"],
      answer: "alerts"
  },
  {
      title: "The condition in an if / else statement is enclosed within ____.",
      choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
      answer: "parentheses"
  },
  {
      title: "Arrays in Javascript can be used to store ____.",
      choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
      answer: "all of the above"
  },
  {
      title: "String values must be enclosed within ____ when being assigned to variables.",
      choices: ["commas", "curly brackets", "quotes", "parenthesis"],
      answer: "quotes"
  },
  {
      title: "A very useful tool for used during development and debugging for printing content to the debugger is:",
      choices: ["Javascript", "terminal / bash", "for loops", "console log"],
      answer: "console log"
  },

];



// Global variables

var beginQuiz = document.querySelector("#startBtn");
var timerDisplay = document.querySelector(".timer");
var gameCard = document.querySelector("#gameCard");
var start = document.querySelector(".start");
var title = document.querySelector("#title");

var choiceA = document.querySelector("#choiceA");
var choiceB = document.querySelector("#choiceB");
var choiceC = document.querySelector("#choiceC");
var choiceD = document.querySelector("#choiceD");
var answer = document.querySelector("#answer");
var feedback = document.querySelector("#response1");

var multipleChoiceCard = document.querySelector("#multipleChoiceCard");
var scoreForm = document.querySelector("#scoreForm");
var scoreCard = document.querySelector("#scoreCard");

var nameBox = document.querySelector("#nameBox");
var submitBtn = document.querySelector("#submitBtn");
var backBtn = document.querySelector("#backBtn");
var highScoreBtn = document.querySelector("#highScoreBtn");
var scoreBtn = document.querySelector("#scoreBtn");
var clearBtn = document.querySelector("#clearBtn");


var timeLeft = questions.length * 15;
var q = 0;
var s = 0;
var score = 0;
var scoreList = [];
var timeInterval;

getScore();



// Start the timer
function timer() {
  timeInterval = setInterval(function () {
    timeLeft--;
    timerDisplay.textContent = "TIMER: " + timeLeft;
    if (timeLeft === 0 || q >= questions.length) {
      clearInterval(timeInterval);
      gameOver();
    }
  }, 1000);
}


// Displaying questions & answers from questions object
function displayQA() {
  if (q < questions.length) {
    title.textContent = questions[q].title;
    choiceA.textContent = questions[q].choices[0];
    choiceB.textContent = questions[q].choices[1];
    choiceC.textContent = questions[q].choices[2];
    choiceD.textContent = questions[q].choices[3];
  } else {
    gameOver();
  }
}


// Shows the player if their choice is right or wrong
function compareAnswer(event) {
  if (q >= questions.length) {
    gameOver();
    clearInterval(timeInterval);
  } else {
    if (event === questions[q].answer) {
      response1.textContent = "Correct!";
    } else {
      timeLeft -= 10;
      response1.textContent = "Incorrect";
    }
    score = timeLeft;
    q++;
    displayQA();
  }
}


// Retriving scores from local storage
function getScore() {
  var storedScore = JSON.parse(localStorage.getItem("highScore"));
  if (storedScore !== null) {
    scoreList = storedScore;
  }
}


// Save scores to local storage
function saveScore() {
  localStorage.setItem("highScore", JSON.stringify(scoreList));
}


// Display game over screen 
function gameOver() {
  scoreBtn.innerHTML = score;
  scoreBtn.style.display = "inline-block";
  gameCard.classList.add("hide");
  scoreForm.classList.remove("hide");
  timerDisplay.classList.add("hide");
  highScoreBtn.classList.add("hide");
  leaderBoard();
}


// Show top 10 scores from storage
function leaderBoard() {
  removeFromLeaderBoard();
  addToLeaderBoard();
  scoreList.sort((a, b) => {
    return b.score - a.score;
  });

  topTen = scoreList.slice(0, 10);

  for (var i = 0; i < topTen.length; i++) {
    var player = topTen[i].player;
    var score = topTen[i].score;

    var newDiv = document.createElement("div");
    leaderBoardDiv.appendChild(newDiv);

    var newLabel = document.createElement("label");
    newLabel.textContent = player + " - " + score;
    newDiv.appendChild(newLabel);
  }
}


// Add name to the leader board
function addToLeaderBoard() {
  leaderBoardDiv = document.createElement("div");
  leaderBoardDiv.setAttribute("id", "playerInitials");
  document.getElementById("leaderBoard").appendChild(leaderBoardDiv);
}


// Clear names from leader board
function removeFromLeaderBoard() {
  var removeScores = document.getElementById("playerInitials");
  if (removeScores !== null) {
    removeScores.remove();
  } else {
  }
}


// Event listeners
beginQuiz.addEventListener("click", function (event) {
  timer();
  displayQA();
  start.classList.add("hide");
  gameCard.classList.remove("hide");
  highScoreBtn.style.display = "none";
  scoreCard.classList.add("hide");
});

multipleChoiceCard.addEventListener("click", function (event) {
  var event = event.target;
  compareAnswer(event.textContent.trim());
});

submitBtn.addEventListener("click", function (event) {
  event.preventDefault();
  var playerInitials = nameBox.value.trim();
  var newScore = {
    player: playerInitials,
    score: score,
  };
  
  scoreList.push(newScore);
  saveScore();
  leaderBoard();
  scoreForm.classList.add("hide");
  scoreCard.classList.remove("hide");
});

highScoreBtn.addEventListener("click", function (event) {
  scoreCard.classList.remove("hide");
  highScoreBtn.classList.add("hide");
  start.classList.add("hide");
  leaderBoard();
});


backBtn.addEventListener("click", function (event) {
  location.reload();
});

clearBtn.addEventListener("click", function (event) {
  scoreList = [];
  start.classList.add("hide");
  localStorage.setItem("highScore", JSON.stringify(scoreList));
  leaderBoard();
  saveScore();
});