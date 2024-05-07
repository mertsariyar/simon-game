  let gamePattern = [];
  let buttonColours = ["red", "blue", "green", "yellow"];
  let userClickedPattern = [];
  let started = false;
  let level = 0;
  //
  $(document).keypress(function() {
    if(!started) {
      $("#level-title").text("LeveL " + level)
      nextSequence();
      started = true;
    }
  })
  $(".btn").click(function() {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
  })
  //
  function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("LeveL " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    let audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();
  }
  function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("success");
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      let wrong = new Audio("sounds/wrong.mp3");
      wrong.play();
      $("body").addClass("game-over");
      $("h1").text("Game Over, Press Any Key To Restart");
      setTimeout(() => {
        $("body").removeClass("game-over");
      },200)
      startOver();
    }
}
  function startOver() {
    level = 0
    gamePattern = [];
    userClickedPattern = [];
    started = false;
  }


  function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }

  function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");
    setTimeout(() => {
      $("#" + currentColour).removeClass("pressed");
    }, 100)
  }


  //hey
  