/* eslint-disable no-console */
/* global $ */
'use strict';

const QandA =[
  { question: 'In what state is is illegal to NOT drink milk?',
    answers: [ 'Nebraska','Ohio', 'Utah', 'California' ],
    correctAnswer: 'Utah'
  },
  
  {question: 'In Oregon it is illegal to hunt where?',
    answers: [  'Backyard', 'National Park', 'Cemetery', 'On the beach' ],
    correctAnswer: 'Cemetery'
  },
  
  { question: 'In which state is it illegal to collect or carry away seaweed at night?',
    answers: [ 'California','Florida', 'South Carolina', 'New Hampshire' ],
    correctAnswer: 'New Hampshire'},
  
  { question: 'What is illegal to drive on the highway in Nevada?',
    answers: [ 'A personal airplane', 'Ferrari LaFerrari', 'Camel', 'Mule' ],
    correctAnswer: 'Camel' 
  },

  { question: 'In Missouri, what is illegal to drive with in the car?',
    answers: [ 'A open bottle of Mountain Dew','An uncaged bear', 'A caged skunk', 'Two spare tires' ],
    correctAnswer: 'An uncaged bear' 
  }
];

const STORE = {
  currentQuestion: 0,
  score: 0,
  wrongAnswer: '',
  currentView: 'start',
};

const IMAGES = {
  happy: [ { url: 'https://images.unsplash.com/photo-1522030520855-25f51e8ac93d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80', alt: 'cute dog smiling on a rock' },
    { url: 'https://images.unsplash.com/photo-1518879672846-f303439359a9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80' , alt:'dog running in snow' },
    { url: 'https://drive.google.com/file/d/1vE7XhT-QYyY9by-UCuj8RARE6W8Bajpr/view?usp=sharing' , alt: 'adorable rottie grinning and runn towards you' }
  ],
  sad: [ { url: 'https://images.unsplash.com/photo-1423958950820-4f2f1f44e075?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80' , alt: 'pug is dissapointed in you.' },
    { url: 'https://images.unsplash.com/photo-1440484433300-c3317c44152e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1123&q=80' , alt: 'forlorn bulldog lying on the ground' },
    { url: 'https://drive.google.com/file/d/1woS9_oqdLsv57Ugy930Jup5lSq92ooGP/view?usp=sharing' , alt: 'this plate is broken on the floor because of you. how dare you.' } ]
};

function renderQuizApp(){
  //render the quiz app elements
  if ( STORE.currentView === 'start' ) {
    console.log(`STORE.currentView is currently ${STORE.currentView}`);
    startView();
    startButton();
  }
  else if ( STORE.currentView === 'question' ) {
    console.log(`STORE.currentView is currently ${STORE.currentView}`);
    questionView();
  }
  else if ( STORE.currentView === 'correct' ) {
    console.log(`STORE.currentView is currently ${STORE.currentView}`);
    $('.js-master-container').html(answerCorrect());
    STORE.score++;
    nextQuestion();
  }
  else if ( STORE.currentView === 'wrong' ) {
    console.log(`STORE.currentView is currently ${STORE.currentView}`);
    $('.js-master-container').html(answerWrong());
    nextQuestion();
  }
  else if ( STORE.currentView === 'results' ) {
    console.log(`STORE.currentView is currently ${STORE.currentView}`);
    $('.js-master-container').html(handleResults());
  }
}

// handling start page

function startView() {
  console.log('startView ran');
  $('.js-master-container').html(`
  <div for="start wrapper" class="start-container">
  <div for="title wrapper" class="start-title">
    <h1 for="Title of quiz" >How well do you know US Law?</h1>
    </div>
  <div for="container for start button" class="start-button-container">
      <input type="button" value="START" class="start-button js-start-button"/>
  </div>
  </div>`);
}

// handle start button

function startButton() {
  console.log('startButton ran');
  $('.start-button-container').on('click', '.js-start-button', function() {
    console.log('start button pressed - ENGAGE!');
    STORE.currentView = 'question';
    renderQuizApp();
  });
}

// handling question page

function questionView() {
// here we will pass in all html inside master-container for each question to be rendered
  let i = STORE.currentQuestion;
  $('.js-master-container').html(`
  <div for="question wrapper" class="question-container">
  <div class="question-title">
  <h1 for="page title" >QUESTION:</h1>

  <h2 for="question prompt">${QandA[i].question}</h2>
  </div>

  <form for="question answers" class="question-answers js-question-answers">
  <input type="radio" name="question" value="${QandA[i].answers[0]}" required > ${QandA[i].answers[0]}<br>
  <input type="radio" name="question" value="${QandA[i].answers[1]}" required > ${QandA[i].answers[1]} <br>
  <input type="radio" name="question" value="${QandA[i].answers[2]}" required > ${QandA[i].answers[2]}<br>
  <input type="radio" name="question" value="${QandA[i].answers[3]}" required > ${QandA[i].answers[3]} <br>
  <input type="submit" class="submit-button" name="Submit" value="Submit"/>
  </form>
  </div>
  <div for="container for tracker" class="tracker-container">
    <p for="tracking questions" class="tracker js-tracker">Question ${STORE.currentQuestion + 1} of 5  |  ${STORE.score} of 5 Correct</p>
  </div>
  `);
  handleAnswerSubmitted();
}

function handleAnswerSubmitted() {
  // listen for the answer submitted by the user, then check against STORE
  // to see if it is the correct answer, then send user to appropriate
  // answer result view (CORRECT/WRONG)
  $('.js-question-answers').on('submit', function(event) {
    console.log('answersubmitted is running');
    event.preventDefault();
    let answer = $('input[name=question]:checked').val();
    console.log($('input[name=question]:checked'));
    console.log(answer);
    if ( answer === QandA[STORE.currentQuestion].correctAnswer ) {
      console.log('clicked correct answer');
      STORE.currentView = 'correct';
      renderQuizApp();
    }
    else if ( answer !== QandA[STORE.currentQuestion].correctAnswer ) {
      console.log('clicked wrong answer');
      STORE.wrongAnswer = answer;
      console.log(STORE.wrongAnswer);
      STORE.currentView = 'wrong';
      renderQuizApp();
    }
  });
}

function answerCorrect(){
 
  return `
 <div for="image container" class="correct-container">
  <h2>Yay, you got the answer right!</h2>
  <div for="correct image" class="happy-image">
  <img src="${IMAGES.happy[0].url}" alt="${IMAGES.happy[0].alt}">
  </div>
  <div for="next question" class="next-question-container js-next-question-container">
  <input type="button" value="Next" class="next-question-button js-next-question-button">
  </div>
  </div>`;
  
}


function answerWrong(){
  console.log(STORE.wrongAnswer);
  return `
  <div for="image container" class="wrong-container">
  <h2 for="title">Aww, you got the answer wrong.</h2>
  <div for="sad image" class="sad-image">
  <img src="${IMAGES.sad[0].url}" alt="${IMAGES.sad[0].alt}">
  </div>
    <p for="wrong answer">You answered ${STORE.wrongAnswer}, 
    but the correct answer is ${QandA[STORE.currentQuestion].correctAnswer}. 
    </p>
    <div class="next-question-container js-next-question-container">
    <input type="button" value="Next" class="next-question-button js-next-question-button">
    </div>
    </div>`;
}

// handling next question rendering on next question button click
function nextQuestion() {
  console.log('nextQuestion ran');
  $('.js-next-question-container').on('click', '.js-next-question-button', function () {
    console.log('nextQuestion if statement listener ran');
    STORE.currentQuestion++;
    if ( STORE.currentQuestion < QandA.length ) {
      console.log('nextQuestion if statement worked');
      STORE.currentView = 'question';
      renderQuizApp();
    }
    else {
      console.log('nextQuestion else statement worked');
      STORE.currentView = 'results';
      renderQuizApp();
    }
  });
}

function handleResults(){
// check STORE.score to see if user passes or fails
// send to correct results view
// need to build template for results within master-container here
  if ( STORE.score >= 3 ) {
    $('.master-container').html(`
  <div for="correct container" class="congrats-container">
    <div class="congrats-message-container js-congrats-message-container">
    <h2 for="title" class="congrats-title">Congratulations!</h2>
    <p for="correct result" class="congrats-results">You got ${STORE.score} correct!</p>
    </div>
    <img src="${IMAGES.happy[1].url}" alt="${IMAGES.happy[1].alt}">
    <div for="container for start button" class="restart-button-container js-restart-button">
    <input type="button" value="Restart" name="restart" class="restart-button js-restart-button" />
    </div>
  </div>`);
  }
  else if ( STORE.score < 3 ) {
    $('.master-container').html(`
    <div for="fail container" class="fail-container">
    <div class="fail-message-container js-fail-message-container">
    <h2 for="title" class="fail-title">Oh No!</h2>
    <p for="failure results" class="fail-results js-fail-results">You got ${STORE.score} correct.</p>
  </div>
  <img src="${IMAGES.sad[1].url}" alt="${IMAGES.sad[1].alt}">
  <div for="container for start button" class="restart-button-container js-restart-button">
    <input type="button" value="Restart" name="restart" class="restart-button js-restart-button" />
  </div>
  </div>`);
  }
  restartQuiz();
}

// handle restart quiz

function restartQuiz() {
  // listen for restart button press to reinitialize start view
  // and clear all user data in STORE
  $('.js-restart-button').on( 'click', function () {
    console.log('restart button listener worked!');
    STORE.currentQuestion = 0;
    STORE.score = 0;
    STORE.wrongAnswer = [];
    STORE.currentView = 'start';
    renderQuizApp();
  });
}


function generateQuizApp(){
  renderQuizApp();
}

$(generateQuizApp);