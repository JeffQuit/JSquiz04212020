//* DOM Selectors Below
//Selector for Start Quiz Page
let startQuizBtn = document.getElementById('startquizbtn');
let viewLeaderBoard = document.getElementById('viewleaderboard');

//Selector for Question Div
let questionTextInsert = document.getElementById('questionsubtextarea');
let ansBtn = document.getElementById('ansbtndiv');
let ansBtn1 = document.getElementById('ansbtn1');
let ansBtn2 = document.getElementById('ansbtn2');
let ansBtn3 = document.getElementById('ansbtn3');
let ansBtn4 = document.getElementById('ansbtn4');
let ansReturnText = document.getElementById('ansreturnsubtextarea');
let corIncorInject = document.getElementById('corincorinject');
//Test

//Selector for submit score page
let scoreSave = document.getElementById('scoresave');
let nameScoreValue = document.getElementById('namescorevalue');
let nameScoreSubmitBtn = document.getElementById('namescoresubmitbtn');

//Selectors for high score page
let retakeQuizBtn = document.getElementById('retakequizbtn');
let clearScoreBtn = document.getElementById('clearscoresbtn');
let leaderboardListUl = document.getElementById('leaderboardlist');
let scoreBadge = document.getElementById('scorebadge');
let nameBadge = document.getElementById('namebadge');

//Selector for countdown timer
let timeEl = document.getElementById('time');
let mainEl = document.getElementById('main');

//* Variables Below
let secondsLeft = 100; //Sets countdown to 100 seconds
let scoreKeeper = 0; //Sets starting score value to 100
let i = 0; //sets variable for i as global access

//* Arrays Below:
let leaderboardArray = []; // Will be used for storing leaderboard information

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
		answers: [{ text: 'Brendan Eich' }, { text: 'Linus Torvalds' }, { text: 'Alan Turing' }, { text: 'Lawrence Joseph Ellison' }],
		finalAnswer: 'Brendan Eich',
	},
	{
		question: 'What Javascript Method is used to store information to local storage?',
		answers: [{ text: 'browserStorage.setItem()' }, { text: 'browserStorage.getItem()' }, { text: 'localStorage.getItem()' }, { text: 'localStorage.setItem()' }],
		finalAnswer: 'localStorage.setItem()',
	},
	{
		question: 'What Javascript Method is used to create a new array that contains elements that have passed a certain criteria check?',
		answers: [{ text: '.join()' }, { text: '.map()' }, { text: '.filter()' }, { text: '.push()' }],
		finalAnswer: '.filter()',
	},
	{
		question: 'What type of Javascript data type is represented by placing information inside of an open and closed square bracket?',
		answers: [{ text: 'String' }, { text: 'Boolean' }, { text: 'Number' }, { text: 'Array' }],
		finalAnswer: 'Array',
	},
	{
		question: 'An alternate way to code an If statement is?',
		answers: [{ text: 'This' }, { text: 'Prototype' }, { text: 'For' }, { text: 'Switch ' }],
		finalAnswer: 'Switch',
	},
	{
		question: 'The operator i++ is known as an?',
		answers: [{ text: 'Increment' }, { text: 'Decrement' }, { text: 'Institute' }, { text: 'Destitute' }],
		finalAnswer: 'Increment',
	},
	{
		question: 'What tag would you use in HTML to link to an outside Javascript page?',
		answers: [{ text: 'Launch Tag' }, { text: 'Connect Tag' }, { text: 'Script Tag' }, { text: 'IMG Tag' }],
		finalAnswer: 'Script Tag',
	},
	{
		question: 'A block of code designed to perform a particular task is also known as?',
		answers: [{ text: 'Method' }, { text: 'Variable' }, { text: 'Array' }, { text: 'Function' }],
		finalAnswer: 'Function',
	},
	{
		question: 'What is the current release version of Javascript?',
		answers: [{ text: 'ES6 aka ECMAScript 6' }, { text: 'ES5 aka ECMAScript 5' }, { text: 'ES4 aka ECMAScript 4' }, { text: 'ES3 aka ECMAScript 3' }],
		finalAnswer: 'ES6 aka ECMAScript 6',
	},
	{
		question: 'The var variable format can also be written as?',
		answers: [{ text: 'set' }, { text: 'store' }, { text: 'let' }, { text: 'have' }],
		finalAnswer: 'let',
	},
];
//* End Array Bank Area
saveHighScore();
//* Functions

// Function to start quiz and hide Div 1 for the Start box
function hideStartDiv() {
	let x = document.getElementById('overlaystart');
	if (x.style.display === 'none') {
		x.style.display = 'block';
	} else {
		x.style.display = 'none';
	}
	setTime();
	nextQuestion();
}
// Function to hide questions once the max questions has been reached or time runs out
function hideQuestionDiv() {
	let l = document.getElementById('overlayquestions');
	if (l.style.display === 'none') {
		l.style.display = 'block';
	} else {
		l.style.display = 'none';
	}

	populateScore();
}
// Function to hide the submit div page once score is submitted
function hideSubmitDiv() {
	let l = document.getElementById('overlaysubmitscore');
	if (l.style.display === 'none') {
		l.style.display = 'block';
	} else {
		l.style.display = 'none';
	}

	populateScore();
}
// Function to automatically go to the leaderboard page
viewLeaderBoard.addEventListener('click', function () {
	hideStartDiv();
	hideQuestionDiv();
	hideSubmitDiv();
	secondsLeft = 0;
});

//Timer from activity 8

function setTime() {
	let timerInterval = setInterval(function () {
		secondsLeft--;
		timeEl.textContent = 'Remaining Time: ' + secondsLeft;

		if (secondsLeft <= 0) {
			//Modified since if a wrong question is pressed when time is less than 10, the value of the secondsLeft will be negative rather than 0
			hideQuestionDiv();
			timeEl.textContent = 'Remaining Time: 0';
			timeIsZero();
		}
	}, 1000);
}

//Function that happens when the time runs out. sets the header title to time is 0 and will automtically hide the question div also
function timeIsZero() {
	timeEl.textContent = 'Remaining Time: 0';
	hideQuestionDiv();
}

//Function to cycle through questions per the question bank array length. As long as there are still quetsions in the bank and time is not 0, it will cycle through questions
function nextQuestion() {
	if (i < questionBankArray.length && secondsLeft !== 0) {
		populateQuestions(questionBankArray[i]);
	} else {
		hideQuestionDiv();
	}
}
//Function to populate the questiona ans answer area with the question array text
function populateQuestions(questionset) {
	for (let i = 0; i < questionBankArray.length; i++) {
		questionTextInsert.innerText = questionset.question;
		ansBtn1.innerText = questionset.answers[0].text;
		ansBtn2.innerText = questionset.answers[1].text;
		ansBtn3.innerText = questionset.answers[2].text;
		ansBtn4.innerText = questionset.answers[3].text;
	}
}

//Answer checker that checks what is targeted with the press of the mouse and returns a series of actions depending on if that matches the key value pair of finalAnswer
function answerQuestionAction(ans) {
	const selectedAnswer = ans.target.innerText;
	if (selectedAnswer === questionBankArray[i].finalAnswer) {
		console.log('Answer is True');
		i++;
		scoreKeeper += 10;
		corIncorInject.textContent = 'Previous Question: Correct! (+ 10 points)';
	} else {
		console.log('Answer is False');
		i++;
		secondsLeft -= 10;
		corIncorInject.textContent = 'Previous Question: Incorrect! (-10 seconds)';
	}
	nextQuestion();
}
//Populates the score into the Span area of the score submit page
function populateScore() {
	scoreSave.innerText = scoreKeeper;
}

// Calls the localStorage data and runs the array through a loop to post it as newly created bootstrap Li and Span elements. Also orders it by the Score key value pair
function saveHighScore() {
	let localLeaderBoard = JSON.parse(localStorage.getItem('leaderboardArray'));
	if (localLeaderBoard !== null) {
		leaderboardArray = localLeaderBoard;
	} else if (localLeaderBoard === null) {
		return;
	}
	// Sorts Array Leaderboard to show in descending order.
	leaderboardArray.sort(function (a, b) {
		return b.score - a.score;
	});

	for (let k = 0; k < leaderboardArray.length; k++) {
		let listElement = document.createElement('li');
		listElement.textContent = leaderboardArray[k].name;
		leaderboardListUl.append(listElement);
		listElement.setAttribute('class', 'list-group-item d-flex justify-content-between align-items-center');

		let scoreElement = document.createElement('span');
		scoreElement.textContent = leaderboardArray[k].score;
		listElement.append(scoreElement);
		scoreElement.setAttribute('class', 'badge badge-primary badge-pill');
	}
}

//Action for storing the data on submit to the local storage
nameScoreSubmitBtn.addEventListener('click', function (event) {
	event.preventDefault();

	console.log(nameScoreValue.value);
	console.log(scoreSave.innerText);

	let nameScore = {
		name: nameScoreValue.value.trim(),
		score: scoreSave.innerText.trim(),
	};
	leaderboardArray.push(nameScore);
	localStorage.setItem('leaderboardArray', JSON.stringify(leaderboardArray));
	console.log(leaderboardArray);
	saveHighScore();
	hideSubmitDiv();
});

// button functionality on leaderborad page to reset the test. Tis just refreshes the page which saves the local information and brings the user to the Start div
retakeQuizBtn.addEventListener('click', function () {
	window.location.reload();
});
// button functionality for clear local st
clearScoreBtn.addEventListener('click', function () {
	localStorage.clear();
	window.location.reload();
});
