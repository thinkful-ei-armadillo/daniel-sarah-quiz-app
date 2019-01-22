/* global $ */
/* es-lint disable no-console */
'use strict';

const QUESTIONS = [
  'In what state is is illegal to NOT drink milk?',
  'In Oregon it is illegal to hunt where?',
  'In which state is it illegal to collect or carry away seaweed at night?',
  'What is illegal to drive on the highway in Nevada?',
  'In Missouri, what is illegal to drive with in the car?',
  'In Minnesota, it is illegal to cross state lines with what on top of your head'
];

const STORE = {
  currentQuestion: [],
  milk: [ { name: 'Nebraska', correct: false } ,
    { name: 'Ohio', correct: false } , 
    { name: 'Utah', correct: true }, 
    { name:'California', correct: false } 
  ],
  hunt: [ { name: 'Backyard', correct: false } ,
    { name: 'National Park', correct: false } , 
    { name: 'On the beach', correct: false }, 
    { name:'Cemetery', correct: true } 
  ],
  seaweed: [ { name: 'California', correct: false } ,
    { name: 'Florida', correct: false } , 
    { name: 'South Carolina', correct: false }, 
    { name:'New Hampshire', correct: true } 
  ],
  highway: [ { name: 'A personal airplane', correct: false } ,
    { name: 'Ferrari LaFerrari', correct: false } , 
    { name: 'Camel', correct: true }, 
    { name:'Mule', correct: false } 
  ],
  missouri: [ { name: 'A open bottle of Mountain Dew', correct: false } ,
    { name: 'An uncaged bear', correct: true } , 
    { Name: 'A caged skunk,', correct: false }, 
    { name:'Two spare tires', correct: false } 
  ],
  minnesota: [ { name: 'A duck', correct: true } ,
    { name: 'A spotlight over 1000 lumens', correct: true } , 
    { name: 'A car', correct: false }, 
    { name:'A hamburger', correct: false } 
  ],
  currentPage: [],
  score: [ 0 ]
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

// template generator for answer lists

function generateAnswerList(answers) {
  // call on STORE for the current question number, then generate the
  // HTML list of answers accordingly
}

function renderQuestionText() {
  // call on STORE.currentQuestion and generate the HTML for the correct
  // question prompt from QUESTION storage
}

function handleAnswerSubmitted() {
  // listen for the answer submitted by the user, then check against STORE
  // to see if it is the correct answer, then send user to appropriate
  // answer result page (CORRECT/WRONG)
}

// handle score memory
function handleScore() {
  // listen for answer correct/false, then push new count of correct answers to
  // STORE.score for memory
}