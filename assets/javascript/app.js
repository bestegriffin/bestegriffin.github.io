			
			
				// Define the Question Bank //
				var triviaQuestions = [{
					question: "Which one is not a type of galaxy?",
					answerList: ["Elliptical","Irregular","Orbital","Spiral"],
					answer: 2
				},{
					question: "What process fuels the sun?",
					answerList: ["Condensation","Nuclear Fusion","Precipitation","Photosynthesis"],
					answer: 1
				},{
					question: "What galaxy is made of old stars?",
					answerList: ["Lenticular","Elliptical","Spiral","Irregular"],
					answer: 1
				},{
					question: "The last layer of the suns atmosphere is the?",
					answerList: ["Core","Prominence","Corona","Chromosphere"],
					answer: 2
				},{
					question: "When the moon is unilluminated it is called the ______ moon.",
					answerList: ["New","Full","Quarter","Gibbous"],
					answer: 0
				},{
					question: "There are ________ tides in a day.)",
					answerList: ["1", "2", "3", "4"],
					answer: 3
				},{
					question: "Which planet was the destination of the Cassini-Huygens mission?",
					answerList: ["Jupiter", "Saturn", "Mars", "Venus"],
					answer: 1
				},{
					question: "Which planet has the highest mountain and volcano in the entire solar system?",
					answerList: ["Mars", "Pluto", "Mercury", "Earth"],
					answer: 0
				},{
					question: "Which two planets rotate clockwise (east to west) on their axes ?",
					answerList: ["Venus and Uranus", "Jupiter and Saturn", "Earth and Mars", "Neptune and Pluto"],
					answer: 0
				},{
					question: "Which is the 'King of the Planets",
					answerList: ["Mercury", "Earth", "Saturn", "Jupiter"],
					answer: 2
				}];


				// Global Variables//
				var currentQuestion; 
				var correctAnswer; 
				var incorrectAnswer; 
				var unanswered; 
				var seconds; 
				var time; 
				var answered; 
				var userSelect;

				// WIN LOSE Out Of Time GAMEOVER MESSAGES
				var messages = {
				correct: "YES, We are an impossibility in an impossible universe.!",
				incorrect: "Only two things are infinite, the universe and human stupidity. And I'm not sure about the former.",
				outOfTime: "Out of time! You were the last hope of the universe",
				gameOver: "Alright!"
				}


				
		// FUNCTIONALITY//
		// USING this to hide "this" button and call function inIt//
		$('#startBtn').on('click', function(){
			$(this).hide();
			inIt();
		});
		// using this to hide "this" button and call function inIt//
		$('#startOverBtn').on('click', function(){
			$(this).hide();
			inIt();
		});

		// using jquery to select the id's in the html to make sure that we start with a clean slate//
		function inIt(){
			$('#finalMessage').empty();
			$('#correctAnswers').empty();
			$('#incorrectAnswers').empty();
			$('#unanswered').empty();
			$('#gameOver').empty();
			currentQuestion = 0;
			correctAnswer = 0;
			incorrectAnswer = 0;
			unanswered = 0;
			newQuestion();
		}

		function newQuestion(){
			$('#message').empty();
			$('#correctedAnswer').empty();
			answered = true;
			
			//sets up new questions & answerList
			$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
			$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
			for(var i = 0; i < 4; i++){
				var choices = $('<div>');
				choices.text(triviaQuestions[currentQuestion].answerList[i]);
				choices.attr({'data-index': i });
				choices.addClass('userChoice');
				$('.answerList').append(choices);
			}
			countdown();
			//clicking an answer will pause the time and setup answerPage
			$('.userChoice').on('click',function(){
				userSelect = $(this).data('index');
				clearInterval(time);
				answerPage();
			});
		}
		function resetHover(){

		}
		function countdown(){
			seconds = 15;
			$('#timeClock').html('<h3>Time Remaining: ' + seconds + '</h3>');
			answered = true;
			//sets timer to go down
			time = setInterval(showCountdown, 1000);
		}

		function showCountdown(){
			seconds--;
			$('#timeClock').html('<h3>Time Remaining: ' + seconds + '</h3>');
		 	if(seconds < 1){
				clearInterval(time);
				answered = false;
				answerPage();
			}
			else if (seconds <1.1){
				$('section').removeClass("timeClockFlash animated flash");
			}
			else if (seconds <10){
				$('section').addClass("timeClockFlash animated flash");
			}
			
		
		}

		function answerPage(){
			$('#currentQuestion').empty();
			$('.userChoice').empty(); //Clears question page
			$('.question').empty();
			$('.answerList').empty();

			var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
			//checks to see correct, incorrect, or unanswered
			if((userSelect == rightAnswerIndex) && (answered == true)){
				correctAnswer++;
				$('#message').html(messages.correct);
			} else if((userSelect != rightAnswerIndex) && (answered == true)){
				incorrectAnswer++;
				$('#message').html(messages.incorrect);
			} else{
				unanswered++;
				$('#message').html(messages.outOfTime);
				answered = true;
			}
			
			if(currentQuestion == (triviaQuestions.length-1)){
				setTimeout(scoreboard, 2000)
			} else{
				currentQuestion++;
				setTimeout(newQuestion, 2000);
			}

			$('section').removeClass("timeClockFlash animated flash");
		}

		function scoreboard(){
			$('#message').empty();
			$('#correctedAnswer').empty();
			$('#gameOver').html(messages.gameOver);
			$('#correctAnswers').html("Correct Answers: " + correctAnswer);
			$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
			$('#unanswered').html("Unanswered: " + unanswered);
			$('#startOverBtn').addClass('reset');
			$('#startOverBtn').show();
			$('#startOverBtn').html('Replay?');
			$('section').removeClass("timeClockFlash animated flash");
		}