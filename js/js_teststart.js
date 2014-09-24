var j = 0;
var prev_q = 0;
var totalQuestions = 5;
var correctAnswers = 0;
var totalPercentage = 0;
var finishedQuiz = 0;




var quiz;
function gen() {

    document.getElementById('start').innerHTML = localStorage.getItem('s_starttime');

}

gen();






////
function setStartTime() {
    var currentTime = new Date();

    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();
    if (minutes < 10){
        minutes = "0" + minutes;
    }
    if (seconds < 10){
        seconds = "0" + seconds;
    }
    var v = hours + ":" + minutes + ":" + seconds + " ";
    if(hours > 11){
        v+="PM";
    } else {
        v+="AM"
    }

    localStorage.setItem('s_starttime',v);
    var startTimeMS = (new Date()).getTime();
    sessionStorage.setItem('startTime',startTimeMS);
    sessionStorage.setItem('startmin',minutes);
}


function startTest()
{
   window.open("questions.html", "_self");
    // Set start time of the quiz
    setStartTime();

}