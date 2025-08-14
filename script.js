let questions = [
    {
        prompt: `Inside which HTML element do we put the JavaScript?`,
        options: [
            "<javascript>",
            "<js>",
            "<script>",
            "<scripting>",
        ],
        answer: "<script>",
    },
    {
        prompt: `How do you call a function named myFunction?`,
        options: [
            "call myFunction()",
            "myFunction()",
            "call function myFunction",
            "Call.myFunction",
        ],
        answer: "myFunction()",
    },
    {
        prompt: `Which interface must be implemented by all servlets?`,
        options: [
            "Servlet",
            "HttpServlet",
            "GenericServlet",
            "ServletRequest",
        ],
        answer: "Servlet",
    },
    {
        prompt: `In XML, which of the following is used to define the structure and the legal elements and attributes?`,
        options: [
            "XSLT",
            "DTD",
            "XPath",
            "XLink",
        ],
        answer: "DTD",
    },
    {
        prompt: `Which property is used to change the background color of an element in CSS?`,
        options: [
            "color",
            "background-color",
            "background-image",
            "bgcolor",
        ],
        answer: "background-color",
    },
];

// Get DOM Elements
let questionsEl = document.querySelector("#questions");
let timerEl = document.querySelector("#timer");
let choicesEl = document.querySelector("#options");
let submitBtn = document.querySelector("#submit-score");
let startBtn = document.querySelector("#start");
let nameEl = document.querySelector("#name");
let feedbackEl = document.querySelector("#feedback");

// Quiz's initial state
let currentQuestionIndex = 0;
let time = questions.length * 15;
let timerId;
let correctAnswers = 0; // New variable to keep track of correct answers

// Start quiz and hide frontpage
function quizStart() {
    timerId = setInterval(clockTick, 1000);
    timerEl.textContent = time;
    let landingScreenEl = document.getElementById("start-screen");
    landingScreenEl.setAttribute("class", "hide");
    questionsEl.removeAttribute("class");
    getQuestion();
}

// Loop through array of questions and answers and create list with buttons
function getQuestion() {
    let currentQuestion = questions[currentQuestionIndex];
    let promptEl = document.getElementById("question-words");
    promptEl.textContent = currentQuestion.prompt;
    choicesEl.innerHTML = "";
    currentQuestion.options.forEach(function (choice, i) {
        let choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("value", choice);
        choiceBtn.textContent = i + 1 + ". " + choice;
        choiceBtn.onclick = questionClick;
        choicesEl.appendChild(choiceBtn);
    });
}

// Check for right answers and deduct time for wrong answer, go to next question
function questionClick() {
    if (this.value !== questions[currentQuestionIndex].answer) {
        time -= 10;
        if (time < 0) {
            time = 0;
        }
        timerEl.textContent = time;
        feedbackEl.textContent = `Wrong! The correct answer was ${questions[currentQuestionIndex].answer}.`;
        feedbackEl.style.color = "red";
    } else {
        feedbackEl.textContent = "Correct!";
        feedbackEl.style.color = "green";
        correctAnswers++; // Increment correct answers counter
    }
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function () {
        feedbackEl.setAttribute("class", "feedback hide");
    }, 2000);
    currentQuestionIndex++;
    if (currentQuestionIndex === questions.length) {
        quizEnd();
    } else {
        getQuestion();
    }
}

// End quiz by hiding questions, stop timer and show final score
function quizEnd() {
    clearInterval(timerId);
    let endScreenEl = document.getElementById("quiz-end");
    endScreenEl.removeAttribute("class");
    let finalScoreEl = document.getElementById("score-final");
    finalScoreEl.textContent = correctAnswers * 5; // Calculate final score
    questionsEl.setAttribute("class", "hide");
}

// End quiz if timer reaches 0
function clockTick() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
        quizEnd();
    }
}

// Save score in local storage along with users' name
function saveHighscore() {
    let name = nameEl.value.trim();
    if (name !== "") {
        let highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
        let newScore = {
            score: correctAnswers * 5, // Use the calculated score
            name: name,
        };
        highscores.push(newScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));
        alert("Your Score has been Submitted");
    }
}

// Save users' score after pressing enter
function checkForEnter(event) {
    if (event.key === "Enter") {
        saveHighscore();
        alert("Your Score has been Submitted");
    }
}
nameEl.onkeyup = checkForEnter;

// Save users' score after clicking submit
submitBtn.onclick = saveHighscore;

// Start quiz after clicking start quiz
startBtn.onclick = quizStart;
