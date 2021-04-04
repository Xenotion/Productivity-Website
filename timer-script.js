var spacebar = "play";//play pause toggle
var time = 1500;
var sessionTime = 1500;
var breakTime = 300;
var workfun = "session";//session or break
var counter;
var coffee="work";//session break toggle
$(function() {
  document.title = "Work";
});

$("#play-pause").on("click", function(){
  if (spacebar=="play"){
  $("#play-pause").html("Pause");$("#play-pause").addClass("btn-info");
    spacebar = "pause";
    //run play function
    counter=setInterval(timer, 1000); //run every 1 second
  }
  else{
  $("#play-pause").html("Resume");$("#play-pause").removeClass("btn-info");
  spacebar = "play";
   clearTimeout(counter);
  }
});

function timer()
{
  time-=1;
  if (time <= -1){
    console.log(coffee);
       clearInterval(counter);
       var audio = new Audio('http://blog.tmcnet.com/blog/tom-keating/sounds/24-ring-tone-1.mp3');
       audio.play();
    //switch break or session
    if (coffee == "work"){
      console.log(">funtime");
      window.document.title = "Break";
      coffee = "funtime";
      time = breakTime;
      counter=setInterval(timer, 1000);
    }
    else{
      console.log(">work");
      window.document.title = "Work";
      coffee = "work";
      time = sessionTime;
      counter=setInterval(timer, 1000);
    }
  }
  else{
    var minSec = convertTime(time);
  $("#time").html(minSec);
  }
}

// ---- Convert Time ---- //

function convertTime(time){
  var minutes = Math.floor(time/60);
  var seconds = time - minutes * 60;
  return minutes + ':' + seconds;
}

// ---- RESET ---- //

$("#reset").on("click", function(){
  reset();
});

function reset(){
  $("#play-pause").html("Start");$("#play-pause").removeClass("btn-info");
  spacebar = "play";
  $("#time").html(time);
  clearTimeout(counter);
  time = sessionTime;
  var timeMin = time/60;
  $("#time").html(timeMin+":00");
}

// ---- SETTINGS ---- //
$("#session-up").on("click", function(){
  reset();
time+=60;
  sessionTime = time;
  sessionMin = sessionTime/60;
  $("#session").html(sessionMin);
  $("#time").html(sessionMin + ":00");
});
$("#session-down").on("click", function(){
  reset();
  if(time>60){time-=60;}
  sessionTime = time;
  sessionMin = sessionTime/60;
  $("#session").html(sessionMin);
  $("#time").html(sessionMin + ":00");
});
$("#break-up").on("click", function(){
breakTime+=60;
  var breakMin = breakTime/60;
  $("#break").html(breakMin);
});
$("#break-down").on("click", function(){
  if(breakTime>60){breakTime-=60;}
  var breakMin = breakTime/60;
  $("#break").html(breakMin);
});
// ---- /settings ---- //