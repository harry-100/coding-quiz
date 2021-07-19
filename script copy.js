const startBtn = document.querySelector('#start-btn');
const nextBtn = document.querySelector('#next-btn');
const questionContainerEl = document.querySelector("#question-container");
const questionEl = document.querySelector("#question");
const answerBtnEl = document.querySelector('#answer-buttons');
const resultEl = document.querySelector('#result');
const timerEl = document.querySelector('#timer');
const finalScoreEl = document.querySelector('#score');
const nameEl = document.querySelector('#name');

var score = 0;
var timeCounter = 60;

let shuffledQuestions, currentQuestionIndex;

const questions = [
    {
        question: "Which of the following is not a JavaScript data type?",
        answers: [
            { text: "Number", correct: false},
            { text: "Undefined", correct: false},
            { text: "Float", correct: true},
            { text: "Boolean", correct: false}            
        ]
    },
    {
        question: " Which of the following function of String object combines the text of two strings and returns a new string?",
        answers: [
            { text: "add()", correct: false},
            { text: "merge()", correct: false},
            { text: "append()", correct: false},
            { text: "concat()", correct: true}        
        ]
    },
    {
        question: " Which of the following function of String object returns the characters in a string between two indexes into the string?",
        answers: [
            { text: "slice()", correct: false},
            { text: "split()", correct: false},
            { text: "substr()", correct: false},
            { text: "substring()", correct: true}        
        ]
    },
    {
        question: " Which of the following function of String object returns the calling string value converted to upper case while respecting the current locale?",
        answers: [
            { text: "toLocaleUpperCase()", correct: true},
            { text: "toUpperCase()", correct: false},
            { text: "toString()", correct: false},
            { text: "substring()", correct: false}        
        ]
    },
    {
        question: " Which of the following function of String object causes a string to be displayed in the specified size as if it were in a <font size = 'size'> tag?",
        answers: [
            { text: "fixed()", correct: false},
            { text: "fontcolor()", correct: false},
            { text: "fontsize()", correct: true},
            { text: "bold()", correct: false}        
        ]
    },
    {
        question: " JavaScript is a _____-side programming language?",
        answers: [
            { text: "Server", correct: false},
            { text: "Client", correct: false},
            { text: "Both", correct: true},
            { text: "None", correct: false}        
        ]
    }
]

function countDown() {
    
    timer = setInterval(() => {
        timeCounter--;
        $("#time-left").text(timeCounter)
       
if (timeCounter <= 0) {
    clearInterval(timer);
    startBtn.innerText = 'Quiz Over'
      startBtn.classList.remove('hide')
      nextBtn.classList.add('hide');
      nameEl.classList.remove('hide');
      questionContainerEl.classList.add('hide');
      const scoreEl = document.createElement('p');
      scoreEl.innerText = "Your final score is " + score;
      console.log("final score= ", scoreEl.innerText);
      answerBtnEl.appendChild(scoreEl);
}
    }, 1000) 
}

startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
})

function startQuiz() {
    console.log("the game has started")
    countDown();
    $("#welcome").hide();

    startBtn.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    questionContainerEl.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionEl.innerText = question.question;
    
    question.answers.forEach(answer => {
        const btnEl = document.createElement('button');
        btnEl.innerText = answer.text;
        btnEl.classList.add('btn');
        if (answer.correct) {
          btnEl.dataset.correct = answer.correct
        };
        btnEl.addEventListener('click', selectAnswer);
        answerBtnEl.appendChild(btnEl);
      });
}


    function resetState() {
       // clearStatusClass(document.body)
        nextBtn.classList.add('hide')
        while (answerBtnEl.firstChild) {
          answerBtnEl.removeChild(answerBtnEl.firstChild)
        }
      }
    
function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    // Array.from(answerButtonsElement.children).forEach(button => {
    //   setStatusClass(button, button.dataset.correct)
    // })
    // if (shuffledQuestions.length > currentQuestionIndex + 1) {
    //   nextBtn.classList.remove('hide') 
    // } else {
    //   startBtn.innerText = 'Quiz Over'
    //   startBtn.classList.remove('hide')
    //   const scoreEl = document.createElement('p');
    //   scoreEl.innerText = "Your final score is " + score;
    //   console.log("final score= ", scoreEl.innerText);
    //   answerBtnEl.appendChild(scoreEl);
    // }
    if (shuffledQuestions.length <= currentQuestionIndex + 1){
      startBtn.innerText = 'Restart'
      clearInterval(timer);
      questionContainerEl.classList.add('hide');
      timerEl.classList.add('hide');  
      startBtn.classList.remove('hide')
      nameEl.classList.remove('hide');
      //const scoreEl = document.createElement('p');
      finalScoreEl.innerText = "Quiz Over! Your final score is " + score + "! \ Please enter your name.";
      console.log("final score= ", finalScoreEl.innerText);
      //answerBtnEl.appendChild(scoreEl);
    }
    else {
        nextBtn.classList.remove('hide');
    }
    
  }
function setStatusClass(element, correct){
    //clearStatusClass(element);
    const resultEl = document.createElement('p');
    
    if (correct) {
        resultEl.classList.add('right');
        resultEl.innerText = "Right!";
        console.log("Right! ");
        score = score + 10;
        console.log("the score is ", score);
    }
    else {
        resultEl.classList.add('wrong');
        timeCounter = timeCounter - 10;
        resultEl.innerText = "Wrong!";
        console.log("Wrong Answer");
    }
    answerBtnEl.appendChild(resultEl);
}




/*

$("#start").click(function(){
    $("#welcome").hide();
    $()

    console.log("Start button clicked");
})

var timeCounter = 60;
$("#start").click(function(){
    
timer = setInterval(() => {
        timeCounter--;
        $("#time-left").text(timeCounter)
       
if (timeCounter <= 0) {
    clearInterval(timer);
}
    }, 100)
});

questionText = "Which of the following is not a JavaScript data type?"
answerOptions = ["Undefined", "Number", "Boolean", "Float"]
correctAnswer = "Float"
$("#start").click(function(){
    $("#question").text(questionText);
    for (i=0; i < answerOptions.length; i++){
        //idNum = "options" + i + 1
        // $("#options").append('<li><button id="option' + i.toString()+ '" type="button">' + answerOptions[i] + '</button></li>');
        
        console.log(optionNum);
        $("#optionNum").text(answerOptions[i]);
        $("#optionNum").text(answerOptions[1]);
        $("#option0").text(answerOptions[i]);
        
    };
})


// $("#options").on('click', '#option3',function(){
//     console.log("Correct Answer")
// })

$('#options').on('click', "#option0, #option1, #option2, #option3", function() {
     if (this.id.text == "Float"){
         console.log(this.id.text);
         console.log("Correct");
     }
     else if (this.id == "option0" || "option1" || "option2"){
         console.log("Wrong");
         console.log(this.id.text());
     }
     
 })

 */