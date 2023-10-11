const $startGameButton = document.querySelector(".start-quiz")
const $nextQuestionButton = document.querySelector(".next-question")
const $questionsContainer = document.querySelector(".questions-container")
const $questionText = document.querySelector(".question")
const $answersContainer = document.querySelector(".answers-container")
const $answers = document.querySelectorAll(".answer")

let currentQuestionIndex = 0
let totalCorrect = 0

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)

function startGame() {
  $startGameButton.classList.add("hide")
  $questionsContainer.classList.remove("hide")
  displayNextQuestion()
}

function displayNextQuestion() {
  resetState()
  
  if (questions.length === currentQuestionIndex) {
    return finishGame()
  }

  $questionText.textContent = questions[currentQuestionIndex].question
  questions[currentQuestionIndex].answers.forEach(answer => {
    const newAsnwer = document.createElement("button")
    newAsnwer.classList.add("button", "answer")
    newAsnwer.textContent = answer.text
    if (answer.correct) {
      newAsnwer.dataset.correct = answer.correct
    }
    $answersContainer.appendChild(newAsnwer)

    newAsnwer.addEventListener("click", selectAnswer)
  })
}

function resetState() {
  while($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild)
  }

  document.body.removeAttribute("class")
  $nextQuestionButton.classList.add("hide")
}

function selectAnswer(event) {
  const answerClicked = event.target

  if (answerClicked.dataset.correct) {
    document.body.classList.add("correct")
    totalCorrect++
  } else {
    document.body.classList.add("incorrect") 
  }

  document.querySelectorAll(".answer").forEach(button => {
    button.disabled = true

    if (button.dataset.correct) {
      button.classList.add("correct")
    } else {
      button.classList.add("incorrect")
    }
  })
  
  $nextQuestionButton.classList.remove("hide")
  currentQuestionIndex++
}

function finishGame() {
  const totalQuestions = questions.length
  const performance = Math.floor(totalCorrect * 100 / totalQuestions)
  
  let message = ""

  switch (true) {
    case (performance >= 90):
      message = "Excelente :)"
      break
    case (performance >= 70):
      message = "Muito bom :)"
      break
    case (performance >= 50):
      message = "Bom"
      break
    default:
      message = "Pode melhorar :("
  }

  $questionsContainer.innerHTML = 
  `
    <p class="final-message">
      Você acertou ${totalCorrect} de ${totalQuestions} questões!
      <span>Resultado: ${message}</span>
    </p>
    <button 
      onclick=window.location.reload() 
      class="button"
    >
      Refazer teste
    </button>
  `
}


const questions = [
  {
    question: "Qual o ano de Fundação da HEATING COOLING?",
    answers: [
      { text: "<1972>", correct: false },
      { text: "<1978>", correct: false },
      { text: "<1974>", correct: true },
      { text: "<1964>", correct: false }
    ]
  },
  {
    question: "Coordenador Rodrigo é formado em?",
    answers: [
      { text: "Enganharia Elétrica ", correct: true },
      { text: "Enganharia Civil ", correct: false },
      { text: "Enganharia Mecânica ", correct: false },
      { text: "Enganharia Produção ", correct: false }
    ]
  },
  {
    question: "HEATING COOLING está em que posição em refrigeção?",
    answers: [
      { text: '1° LUGAR', correct: true },
      { text: '2° LUGAR', correct: false },
      { text: '4° LUGAR', correct: false },
      { text: "10° LUGAR ", correct: false }
    ]
  },
  {
    question: 'HEATING COOLING foi criada na ARGENTINA? ',
    answers: [
      { text: "Verdadeiro", correct: false },
      { text: "Falso", correct: true }
    ]
  },
  {
    question: 'Corretiva tem quantos mecânicos',
    answers: [
      { text: '04 ', correct: false },
      { text: '10', correct: true },
      { text: '08 ', correct: false },
      { text: '12 ', correct: false }
    ]
  },
  {
    question: 'quantos funcionarios tem HEATING COOLING hoje?',
    answers: [
      { text: '241 ', correct: false },
      { text: '388', correct: true },
      { text: '355 ', correct: false },
      { text: '721 ', correct: false }
    ]
  },
  {
    question: 'Qual a idade do Pavão',
    answers: [
      { text: '05 anos ', correct: false },
      { text: '06 anos ', correct: false },
      { text: '12 anos ', correct: false },
      { text: '3 anos  ', correct: true },
    ]
  },
]
