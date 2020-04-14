let qcmPoints = 0;
let correctAnswers = [["1"],["2","3"],["1"],["1"],["1","2"],["3"],["2"],
	["3"],["3"],["2"]];

function isAnswerCorrect(correctAnswer,userAnswer){
	if(userAnswer == correctAnswer){
		return true;
	}
	return false;
	
}

function isLengthUserAnswersValid(correctAnswers,userAnswers){
	if(userAnswers.length === correctAnswers.length){
		return true;
	}
	return false;
}

function getQuestionPoints(correctAnswers,userAnswers){
	for (let i = 0; i < correctAnswers.length; i++) {
			if(isLengthUserAnswersValid(correctAnswers,userAnswers)){
				let userResponse = userAnswers[i];
				if(!isAnswerCorrect(correctAnswers[i],userResponse.value)){
					return 0;	
				}
			}
			else{
				return 0;
			}
	}
	return 1;
}
function renderQcmPoints(points){
	let p = document.querySelector('#i-points');
	p.textContent = "Vous avez obtenu : "+points + " points";
	p.parentElement.style.background = "#f57ca6";
}

function renderGoodAnswer(){
	for (let i = 0; i < correctAnswers.length; i++) {
		let selectorNameForAnswer =  "span.q"+(i+1);
		let currentQuestionResponses = document.querySelectorAll(selectorNameForAnswer);
		for (let j = 0; j < correctAnswers[i].length; j++) {	
			currentQuestionResponses[correctAnswers[i][j]-1].style.color =  "#54c98d";
		}
	}
}

function renderSucessQuestion(questionNumber){
	//color question section
	let currentQuestion = document.querySelectorAll(".question-text");
	currentQuestion[questionNumber].parentElement.style.borderLeft = "5px solid #75eaad";

}

function renderFailQuestion(questionNumber) {
	//color question section 
	let currentQuestion = document.querySelectorAll(".question-text");
	currentQuestion[questionNumber].parentElement.style.borderLeft = "5px solid #f9c2d7";
}

function getSelectorNameByQuestionNumber(questionNumber){
	return "input[name='q"+questionNumber+"']"
}

function getUserAnswersByQuestion(questionNumber){
	let selectorNameForAnswer =  getSelectorNameByQuestionNumber(questionNumber);
	return document.querySelectorAll(selectorNameForAnswer+":checked");
}

function calculateQcmPoints(){
	for (var i = 0; i < correctAnswers.length; i++) {
		//question n
		let userAnswers = getUserAnswersByQuestion(i+1)
		let questionPoints = getQuestionPoints(correctAnswers[i], userAnswers)
		if(questionPoints === 0){
			renderFailQuestion(i);
		}
		else{
			renderSucessQuestion(i);	
		}
		qcmPoints += questionPoints;
	}
}

document.querySelector('#note-result').addEventListener('click',function(){
	calculateQcmPoints();
	renderQcmPoints(qcmPoints);
	renderGoodAnswer();
	window.scrollTo(0, 0);//scroll top to show points
	
	//test(inputs)
});

