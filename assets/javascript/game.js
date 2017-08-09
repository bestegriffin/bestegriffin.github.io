$(document).ready(function() {

	// initialize global variables
	var totemOneValue, totemTwoValue, totemThreeValue, totemFourValue;
	var wins = 0;
	var losses = 0;
	var randomComputerNumber;
	var userTallyScore;


	
	function initializeVariables() {
	
		randomComputerNumber = 19 + Math.floor(Math.random() * 102);

		totemOneValue = 1 + Math.floor(Math.random() * 12);
		totemTwoValue = 1 + Math.floor(Math.random() * 12);
		totemThreeValue = 1 + Math.floor(Math.random() * 12);
		totemFourValue = 1 + Math.floor(Math.random() * 12);
		
		userTallyScore = 0;
		$("#winsTally").html("Wins: " + wins);
		$("#lossesTally").html("Losses: " + losses);
		$("#randomNumber").html(randomComputerNumber);
		$("#userScore").html(userTallyScore);
	}

	function hasUserWonOrLost() {
		// check if user has lost
		if (userTallyScore > randomComputerNumber) {
			losses++;
			console.log("user lost");
			alert("You Lost");
			initializeVariables();
		}

		// check if user has won
		if (userTallyScore === randomComputerNumber) {
			wins++;
			console.log("user won");
			alert('You Won!');
			initializeVariables();
		}
	}

	initializeVariables();

	$(".totem").off("click").on("click" , function() {
		
		var pressed = $(this).attr("value");
        console.log(pressed);
        if (pressed === "totem1") {
        	userTallyScore += totemOneValue;
        } else if (pressed === "totem2") {
        	userTallyScore += totemTwoValue;
        } else if (pressed === "totem3") {
        	userTallyScore += totemThreeValue;
        } else if (pressed === "totem4") {
        	userTallyScore += totemFourValue;
        } else {
        	console.log("error");
        }
  
        $("#userScore").html(userTallyScore);
        
        hasUserWonOrLost();
	});
    

});