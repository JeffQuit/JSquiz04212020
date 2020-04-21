//* DOM Selectors Below
//Selector for Start Quiz Page
let startQuizBtn = document.getElementById('startquizbtn');

//Selector for Question Div
let questionTextInsert = document.getElementById('questionsubtextarea');
let ansBtn = document.getElementById('ansbtndiv');
let ansBtn1 = document.getElementById('ansbtn1');
let ansBtn2 = document.getElementById('ansbtn2');
let ansBtn3 = document.getElementById('ansbtn3');
let ansBtn4 = document.getElementById('ansbtn4');
let ansReturnText = document.getElementById('ansreturnsubtextarea');

//Test

//Selector for submit score page
let scoreSave = document.getElementById('scoresave');
let nameScoreValue = document.getElementById('namescorevalue');
let nameScoreSubmitBtn = document.getElementById('namescoresubmitbtn');

//Selectors for high score page
let retakeQuizBtn = document.getElementById('retakequizbtn');
let clearScoreBtn = document.getElementById('clearscoresbtn');
let leaderboardListUl = document.getElementById('leaderboardlist');

//Selector for countdown timer
let timeEl = document.getElementById('time');
let mainEl = document.getElementById('main');

//* Variables Below
let body = document.body; // Set the body to a variable
let secondsLeft = 100; //Sets countdown to 100 seconds
let scoreKeeper = 100; //Sets starting score value to 100
let i = 0; //sets variable for i as global access

//* Functions Below
//TODO: Function scorekeeper
//TODO: Function for the questions that loops 10 times through the array
//TODO: Function for Corrrect/Incorrect Questions (decrements time by 10 if incorrect, Increments score by 10 if correct)
//TODO: Print score to Score Text Area on Submit Name Page
//TODO: Stores score/name information to local
//TODO: On subittal of name/score, appends child to UI with class elements from the bootstrap.
//TODO: Gets score/name from local
//TODO: Set up Functionality for retake quiz button
//TODO: Set up Functionality for Clear Score button

//* Event Listeners
//Start Button CLick Clears First Div and takes user to Question Page
startQuizBtn.addEventListener('click', hideStartDiv);
ansBtn1.addEventListener('click', answerQuestionAction);
ansBtn2.addEventListener('click', answerQuestionAction);
ansBtn3.addEventListener('click', answerQuestionAction);
ansBtn4.addEventListener('click', answerQuestionAction);

//* Question Bank Array Initialize Before Functions

const questionBankArray = [
	{
		question: 'Who is credited with inventing Javascript?',
		answers: [
			{ text: 'Brendan Eich', correct: true },
			{ text: 'Linus Torvalds', correct: false },
			{ text: 'Alan Turing', correct: false },
			{ text: 'Lawrence Joseph Ellison', correct: false },
		],
	},
	{
		question: 'What Javascript Method is used to store information to local storage?',
		answers: [
			{ text: 'browserStorage.setItem()', correct: false },
			{ text: 'browserStorage.getItem()', correct: false },
			{ text: 'localStorage.getItem()', correct: false },
			{ text: 'localStorage.setItem()', correct: true },
		],
	},
	{
		question: 'What Javascript Method is used to create a new array that contains elements that have passed a certain criteria check?',
		answers: [
			{ text: '.join()', correct: false },
			{ text: '.map()', correct: false },
			{ text: '.filter()', correct: true },
			{ text: '.push()', correct: false },
		],
	},
	{
		question: 'What type of Javascript data type is represented by placing information inside of an open and closed square bracket?',
		answers: [
			{ text: 'String', correct: false },
			{ text: 'Boolean', correct: false },
			{ text: 'Number', correct: false },
			{ text: 'Array', correct: true },
		],
	},
	{
		question: 'An alternate way to code an If statement is?',
		answers: [
			{ text: 'This', correct: false },
			{ text: 'Prototype', correct: false },
			{ text: 'For', correct: false },
			{ text: 'Switch ', correct: true },
		],
	},
	{
		question: 'The operator i++ is known as an?',
		answers: [
			{ text: 'Increment', correct: true },
			{ text: 'Decrement', correct: false },
			{ text: 'Institute', correct: false },
			{ text: 'Destitute', correct: false },
		],
	},
	{
		question: 'What tag would you use in HTML to link to an outside Javascript page?',
		answers: [
			{ text: 'Launch Tag', correct: false },
			{ text: 'Connect Tag', correct: false },
			{ text: 'Script Tag', correct: true },
			{ text: 'IMG Tag', correct: false },
		],
	},
	{
		question: 'A block of code designed to perform a particular task is also known as?',
		answers: [
			{ text: 'Method', correct: false },
			{ text: 'Variable', correct: false },
			{ text: 'Array', correct: false },
			{ text: 'Function', correct: true },
		],
	},
	{
		question: 'What is the current release version of Javascript?',
		answers: [
			{ text: 'ES6 aka ECMAScript 6', correct: true },
			{ text: 'ES5 aka ECMAScript 5', correct: false },
			{ text: 'ES4 aka ECMAScript 4', correct: false },
			{ text: 'ES3 aka ECMAScript 3', correct: false },
		],
	},
	{
		question: 'The var variable format can also be written as?',
		answers: [
			{ text: 'set', correct: false },
			{ text: 'store', correct: false },
			{ text: 'let', correct: true },
			{ text: 'have', correct: false },
		],
	},
];
//* End Array Bank Area

//* Functions
//! Function to start quiz and hide Div 1 for the Start box
function hideStartDiv() {
	let x = document.getElementById('overlaystart');
	if (x.style.display === 'none') {
		x.style.display = 'block';
	} else {
		x.style.display = 'none';
	}
	setTime();
	populateQuestions();
}

//Timer from activity 8

function setTime() {
	let timerInterval = setInterval(function () {
		secondsLeft--;
		timeEl.textContent = 'Remaining Time: ' + secondsLeft;

		if (secondsLeft === 0) {
			clearInterval(timerInterval);
			timeEl.textContent = 'Remaining Time: 0';
			sendMessage();
		}
	}, 1000);
}

function sendMessage() {
	timeEl.textContent = 'Remaining Time: 0';

	let imgEl = document.createElement('img');

	imgEl.setAttribute('src', 'images/image_1.jpg'); //! Need to change this to alert time is up and to go to the end of the quiz
	mainEl.appendChild(imgEl);
}

function populateQuestions() {
	for (let i = 0; i < questionBankArray.length; i++) {
		console.log(i);
		questionTextInsert.innerText = questionBankArray[i].question;
		ansBtn1.innerText = questionBankArray[i].answers[0].text;
		ansBtn2.innerText = questionBankArray[i].answers[1].text;
		ansBtn3.innerText = questionBankArray[i].answers[2].text;
		ansBtn4.innerText = questionBankArray[i].answers[3].text;
		console.log(questionBankArray[i].answers[0].correct);
		console.log(questionBankArray[i].answers[1].correct);
		console.log(questionBankArray[i].answers[2].correct);
		console.log(questionBankArray[i].answers[3].correct);
	}
}

function answerQuestionAction(ans) {
	const selectedAnswer = ans.target.innerText;
	console.log(selectedAnswer);
	if (selectedAnswer.matches(true)) {
		console.log('Answer is True');
	} else {
		console.log('Answer is False');
	}
}

/*
function populateAnswers() {
	ansBtn1.innerText = questionBankArray[0].question.text[0];
}
*/

/*
// Going to need this to reset for the questions
typefaceEl.addEventListener('change', function (event) {
	event.preventDefault();
	typeface = typefaceEl.value;
	document.querySelector('.container').style.fontFamily = typeface;
});

//Toggle display from activity 15
function toggleDisplay(event) {
	var value = event.target.value;
	if (value === 'keydown') {
		mouseEventsEl.classList.add('hide');
		keyEventsEl.classList.remove('hide');
	} else {
		mouseEventsEl.classList.remove('hide');
		keyEventsEl.classList.add('hide');
	}
}
*/
