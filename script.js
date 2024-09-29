const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Who is the father of Geometry?',
    answers: [
      { text: 'Euclid', correct: true },
      { text: 'Aristotle', correct: false },
      { text: 'Pythagoras', correct: false },
      { text: 'Kepler', correct: false }
    ]
  },
  {
    question: 'What is the pH value of the human body?',
    answers: [
      { text: '9.2 to 9.8', correct: false },
      { text: '7.0 to 7.8', correct: true },
      { text: '6.1 to 6.3', correct: false },
      { text: '5.4 to 5.6', correct: false }
    ]
  },
  {
    question: ' Which of the following Himalayan regions is called Shivaliks?',
    answers: [
      { text: 'Upper Himalayas', correct: false },
      { text: 'Lower Himalayas', correct: false },
      { text: 'Outer Himalayas', correct: true },
      { text: 'Inner Himalayas', correct: false }
    ]
  },
  {
    question: 'What is 4 * 2?',
    answers: [
      { text: '12', correct: false },
      { text: '8', correct: true }
    ]
  }
]