const questions = [
    {
        question: "Which is largest animal in the world?" ,
        answers: [
            {text: "Shark" , correct: false},
            {text: "Blue whale" , correct: true},
            {text: "Elaphent" , correct: false},
            {text: "Girrafe" , correct: false},
        ]
    },
    {
        question: "Which surfer is the tallest?" ,
        answers: [
            {text: "Owen wright" , correct: true},
            {text: "Kelly Slater" , correct: false},
            {text: "Filipe Toledo" , correct: false},
            {text: "Gabriel Medina" , correct: false},
        ]
    },
    {
        question: "When a wave is barrelling , how steep will the lip be?" , 
        answers: [
            {text: "Mellow , not steep" , correct: false},
            {text: "start steep and curve" , correct: true},
            {text: "the steapest" , correct: false},
            {text: "depends on the wave" , correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuizz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
    function showQuestion(){
        resetState();
        let currentQuestion = questions[currentQuestionIndex];
        let questionNo = currentQuestionIndex +1;
        questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

        currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        button.addEventListener("click" , selectAnswer);
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        
        });
    }
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function  showSore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!` ;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();    
    }else{
       showSore(); 
    }
}



nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();    
    }else{
        startQuizz();
    }
});


startQuizz();

