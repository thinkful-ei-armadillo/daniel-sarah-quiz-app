/* eslint-disable no-console */
/* global $ */
'use strict';

const QandA =[
  { question: 'In what state is is illegal to NOT drink milk?',
    answers: ['Nebraska','Ohio', 'Utah', 'California'],
    correctAnswer: 'Utah'},
  
  {question: 'In Oregon it is illegal to hunt where?',
    answers: [  'Backyard','National Park', 'On the beach', 'Cemetery'],
    correctAnswer: 'Cemetery'},
  
  {question: 'In which state is it illegal to collect or carry away seaweed at night?',
    answers: [  'California','Florida', 'South Carolina', 'New Hampshire'],
    correctAnswer: 'New Hampshire'},
  
  {question: 'What is illegal to drive on the highway in Nevada?',
    answers: [  'A personal airplane', 'Ferrari LaFerrari', 'Camel', 'Mule'],
    correctAnswer: 'Camel'},
  
  {question: 'In Missouri, what is illegal to drive with in the car?',
    answers: [  'A open bottle of Mountain Dew','An uncaged bear', 'A caged skunk,', 'Two spare tires'],
    correctAnswer: 'An uncaged bear'}
];


const STORE = {
  currentQuestion: 0,
  score: 0,
  wrongAnswer: [],
};


const IMAGES = {
  happy: [ { url: 'https://drive.google.com/file/d/13ZQ0yOZGW7W-Uzgn04-X1rn9GiDsaJU7/view?usp=sharing', alt: 'cute shiba smiling' },
    { url: 'https://drive.google.com/file/d/1ZerLufM1If6CXIGOnnLW5IXJ-GNFjCtY/view?usp=sharing' , alt:'black german shepherd dog beaming' },
    { url: 'https://drive.google.com/file/d/1vE7XhT-QYyY9by-UCuj8RARE6W8Bajpr/view?usp=sharing' , alt: 'adorable rottie grinning and runn towards you' }
  ],
  sad: [ { url: 'https://drive.google.com/file/d/1_N6ohnHf3qRkdUtUfNlMn8kvaQATgqfT/view?usp=sharing' , alt: 'pug is dissapointed in you.' },
    { url: 'https://drive.google.com/file/d/1woS9_oqdLsv57Ugy930Jup5lSq92ooGP/view?usp=sharing' , alt: 'closeup of woman staring in distance with single tear rolling down cheek' },
    { url: 'https://drive.google.com/file/d/1woS9_oqdLsv57Ugy930Jup5lSq92ooGP/view?usp=sharing' , alt: 'this plate is broken on the floor because of you. how dare you.' } ]
};

// handling start page

function startView() {
  $(document).ready( function () {
    console.log('start document ready ran');
    $('.js-master-container').html(`<div class="start-title">
    <h1>How well do you know US Law?</h1>
  </div>
  <div class="start-button-container">
      <input type="button" value="START" class="start-button js-start-button"/>
  </div>`);
  });
}

// handle start button

function startButton() {
  console.log('startButton ran');
  $('.start-button-container').on('click', 'js-start-button', function() {
    console.log('start button pressed - ENGAGE!');
    $(event).preventDefault();
    questionView();
  });
}

// template generator for answer lists

// function generateAnswerList() {
//   // call on STORE for the current question number, then generate the
//   // HTML list of answers accordingly
//   let i = STORE.currentQuestion;
//   $('.js-question-answers').html(`<input type="radio" name="question" value=${QandA[i].answers[0]} required> ${QandA[i].answers[0]}<br>
//     <input type="radio" name="question" value=${QandA[i].answers[1]} required> ${QandA[i].answers[1]} <br>
//     <input type="radio" name="question" value=${QandA[i].answers[2]} required> ${QandA[i].answers[2]}<br>
//     <input type="radio" name="question" value=${QandA[i].answers[3]} required> ${QandA[i].answers[3]} <br>
//     <input type="submit" name="Submit" value="Submit"/>`);
   
// }
  
// function renderQuestionText() {
//   // call on STORE.currentQuestion and generate the HTML for the correct
//   // question prompt from QUESTION storage
//   let i = STORE.currentQuestion;
//   $('.question-title').html(`<h1>QUESTION:</h1> <h2> ${QandA[i].question} </h2>`);
//   console.log('renderQuestionText');

// }

// handling question page

function questionView() {
// here we will pass in all html inside master-container for each question to be rendered
  let i = STORE.currentQuestion;
  $('.js-master-container').html(`<div class="question-title">
  <h1>QUESTION:</h1>
  <h2>${QandA[i].question}</h2>
  </div>
  <form class="question-answers js-question-answers">
  <input type="radio" name="question" value=${QandA[i].answers[0]} required> ${QandA[i].answers[0]}<br>
  <input type="radio" name="question" value=${QandA[i].answers[1]} required> ${QandA[i].answers[1]} <br>
  <input type="radio" name="question" value=${QandA[i].answers[2]} required> ${QandA[i].answers[2]}<br>
  <input type="radio" name="question" value=${QandA[i].answers[3]} required> ${QandA[i].answers[3]} <br>
  <input type="submit" name="Submit" value="Submit"/>
  </form>
  <div class="tracker-container">
    <p class="tracker js-tracker">Question ${STORE.currentQuestion} of 10  |  ${STORE.score} of 10 Correct</p>
  </div>`);
  STORE.currentQuestion++;
}

function handleAnswerSubmitted() {
  // listen for the answer submitted by the user, then check against STORE
  // to see if it is the correct answer, then send user to appropriate
  // answer result view (CORRECT/WRONG)
  $('.js-question-answers').on('submit', function(event){
    console.log('answersubmitted is running');
    event.preventDefault();
    let answer = $('input[name=question]:checked').val();

    if( answer === QandA[STORE.currentQuestion].correctAnswer){
      console.log('clicked correct answer');
      answerCorrect();
    }
    else {
      STORE.wrongAnswer.push(answer);
      console.log('clicked wrong answer');
      answerWrong();
    }
  });
}

function answerWrong(){
  // $(document).ready(function(){
  console.log('the wrong answer text');
  $('.fail-text').html(`<h2>Aww, you got the answer wrong.</h2><br>
    <p>You answered ${STORE.wrongAnswer[STORE.wrongAnswer.length -1]}, 
    but the correct answer is ${QandA[STORE.currentQuestion].correctAnswer} 
    </p>`);
  nextQuestion();
}

function answerCorrect(){
  STORE.score++;
  nextQuestion();
}

// handling next question rendering on next question button click
function nextQuestion() {
  if ( STORE.currentQuestion < QandA.length ) {
    $('js-next-question-container').on( 'click', '.js-next-question-button', function () {
      STORE.currentQuestion++;
      questionView();
    });
  }
  else {
    handleResults();
  }
}

// handle score memory
function handleScore() {
  // listen for answer correct/false, then push new count of correct answers to
  // STORE.score for memory

}

function handleTracker(){
  // call on STORE.score to input the data for the answer tracker
}

function renderQuizApp(){
  //render the quiz app elements
  
  
  handleAnswerSubmitted();
}

function handleResults(){
// check handleScore to see if user passes or fails
// send to correct results view
// need to build template for results within master-container here
}

// handle restart quiz

function restartQuiz() {
  // listen for restart button press to reinitialize start view
  // and clear all user data in STORE
  $('.js-restart').on( 'click', function () {STORE.currentQuestion = 0;
    STORE.score = 0;
    STORE.wrongAnswer = [];});
  startView();
}


function generateQuizApp(){
  startView();
  startButton();
  questionView();
  handleAnswerSubmitted();
  handleScore();
  
  // renderQuestionText();
  // generateAnswerList();

  handleResults();
  handleTracker();
  
  //needs to be last
  renderQuizApp();
}

$(generateQuizApp);

// $(document).ready(function(){
//   generateQuizApp();
// });


// $('question.html').ready(function(){
//   STORE.currentQuestion++;
//   console.log('question ready function is running');
// });

