/*
Functions Used

	startingOpacity
		This hides the gamespace, scoreBox, timer (note 1 second is added to account for hidden div), also sets the starting opacity of the pause and reset button to "0.5"
	
	goDiv()
		Flash a "GO!" sign in place of the gameTitle, to let the player know the game/timer has started
	
	startGame()
		Starts the game.
			Shows the timer, scoreBox, gamespace
			Starts the countdown(timeLimit), flashes the "GO!" (goDiv())
			Begins showing the mole (addGenji();)
			Changes the opacity of the start_button, pause_button and reset_button.
	
	pauseReset()
		"Universal" function to clean up some code. Called in the pause and reset buttons.
		Clears the Timeout elements, chanages the gamespace and startbutton opacity.
		Also makes the start_button clickable.
		
	addGenji()
		Heart of the game.
		The genji image is set to a randomly generate set of coordinates, everyone 1 second and then fadeout after 1 second. Then repeat the function every 1 and a half seconds.

	incScore()
		When the genji appears, the player can click him and incriment the score by 1. Once clicked the image dissapears.
		
	timeLimit()
		The timer of the game. The time decrements by 1 everyone 1 second.
		When the timer reaches 10 seconds left, the timer box starts to blink.
		At 0 the timer box prints the message "Times Up!," the gamespace dissapears and the gameTitle resets to the default load.		
*/


// global variables

var score = 0; 				// score variable starting a 0
var timeLeft = 30; 			// timer starting at 30 seconds
var t;						// used to pause the timer
var clicked = false;		// this is used to disable the startbutton when the game starts
var oFactorHalf = 0.5;		// made this so I can adjust the opacity of divs without having to do each one - also because I can...
var oFactorFull = 1;		// made this so I can adjust the opacity of divs without having to do each one...

// runnable scripts
$(document).ready( function() {

	$("#genji").delay(900).animate({left: 500, opacity:"show"},300);		// loads a genji in from the left side of the screen
	startingOpacity(); 														// game elements are set at 0 opacity untill called via start button
	incScore();																// incriment the score by 1, when the "mole" is clicked
	
	// start button starts the game and changes some elements // if statement disables the button when clicked and calls functions - enabled when pause and/or reset is clicked
	$("#start_button").click(function() {
		if(clicked === false) {
			$(this).addClass('ui-disabled');
			clicked = true;
			startGame();									// call function 
			goDiv();										// call function 
		}   
	});

	// pauses button pauses the timer and changes some elements
	$("#pause_button").click(function() {
		pauseReset();										// call function 
		$("#gameTitle").html("PAUSE!");						// change game title to "PAUSE!"
		$("#pause_button").css("opacity", oFactorHalf);		// change the opacity
	});
		
	// resets the timer and score	
	$("#reset_button").click(function() {
		pauseReset(); 										 // call function 
		timeLeft = 30;										 // set the timer back to 30
		score = 0; 											 // set the score to 0 -- not sure why I can't just call the global variable
		$("#scoreBox").html(score + " points"); 			 // reset the score readout back to 0
		$("#gameTitle").html("Whack-a-Genji"); 				 // change game title to "Whack-a-Genji"
		$("#timer").html(timeLeft + " seconds");			 // reset the timer readout
		$("#pause_button").css("opacity", oFactorHalf);		 // change the opacity
		$("#gamespace").css("opacity", oFactorFull);		 // change the opacity
	});
}); // close doc ready

// set the loading opacity of the gamespace
function startingOpacity(){
	$("#pause_button").css("opacity", oFactorHalf);			 // change the opacity
	$("#reset_button").css("opacity", oFactorHalf);			 // change the opacity
	$("#gamespace").hide();								     // hides the element
	$("#scoreBox").hide();								     // hides the element
}

// calls functions to start and run the game
function startGame(){ 
	timeLimit(); 											 // call function 
	goDiv(); 												 // call function 
	addGenji(); 											 // call function 
	$("#timer").show();										 // shows the element
	$("#scoreBox").show();									 // shows the element
	$("#gamespace").show();									 // shows the element
	$("#start_button").css("opacity", oFactorHalf);			 // change the opacity 
	$("#pause_button").css("opacity", oFactorFull);			 // change the opacity
	$("#reset_button").css("opacity", oFactorFull);			 // change the opacity
}

// this is to clean up some code. call it instead of having the code below in both buttons
function pauseReset(){
	clearTimeout(t); 										 // stops the timer
	clearTimeout(genjiTime); 								 // stops the timer 
	$("#gamespace").css("opacity", oFactorHalf);
	$("#start_button").css("opacity", oFactorFull).show();	 // change the opacity and makes visible
	$('#start_button').removeClass('ui-disabled');			 // enables the start button
	clicked = false;
}

// flash a "GO!" sign to let the player know the game/timer has started
function goDiv(){
	$("#gameTitle").html("GO!").css("color", "red").fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100); // changes the "GO!" to red and flashes
}

// randomly adds a genji
function addGenji(){
	
	var xSize = 300;	// sets the limit of the xCoordinate
	var ySize = 300;	// sets the limit of the yCoordinate
	
	xPos = Math.floor(Math.random() * xSize);	// generates random number for x coordiante
	yPos = Math.floor(Math.random() * ySize);	// generates random number for y coordiante

	// appends the genji "mole" image to the gamespace
	$("#gamespace").append('<img alt="genji" src="img/genji_sm.png" style="position:absolute; top:'+xPos+'px; left:'+yPos+'px;" />').find('img').delay(1000).fadeOut(1000);
	
	genjiTime = setTimeout("addGenji()", 1500);		// sets the function to run everyone 1 and a half seconds
}

// run this when the page loads incriment the score and make the genji disappear every time it is clicked 	// onclick of genji_sm - incriment score
function incScore() {
	$("#gamespace").on("click", "img", function(){
		$(this).hide();
		score++;
		$("#scoreBox").html(score+ " points");
	});
}

// countdown timer
 function timeLimit(){
	t = setTimeout("timeLimit()", 1000);					// sets the function to run everyone 1 second

	$("#timer").html(timeLeft + " seconds left");			// updates the interface with the count	
	
	timeLeft --; // time subtracting by 1
	
//  flashes when 10 seconds left
	if (timeLeft < 10) { 
		$("#timer").fadeIn(200).fadeOut(200).fadeIn(200);
	}

// let the user know the time is up!
	if (timeLeft == 0) {
		clearTimeout(t);
		$("#timer").html("TIMES UP!");
		$("#gamespace").hide();
		$("#gameTitle").html("Whack-a-Genji");
	}
}