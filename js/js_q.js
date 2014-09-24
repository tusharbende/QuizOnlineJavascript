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


window.onbeforeunload = function() {
    localStorage.removeItem("quizStarted");
    return '';
};

function submit() {

    var radio_button = window.document.getElementsByName("rad");

    // if user attempts particular question more than once with correct answers we have to handle that
    // otherwise it will increase the number of correct answers
    console.log(quiz.questions[j].correctAnswer);
    if (radio_button[(quiz.questions[j].correctAnswer)-1].checked) {
        // means correct answer
        quiz.questions[j].prevCorrectAnswered = 1;
        correctAnswers += 1;
    } else if (!radio_button[(quiz.questions[j].correctAnswer)-1].checked) {
        // prev answer was correct and this time user selected wrong answer while revisiting the question
        // so we need to decrement the correctanswers count
        correctAnswers = correctAnswers - 1;
    }

    var v;
    if (radio_button[0].checked)
        v = 0
    else if (radio_button[1].checked)
        v = 1
    else if (radio_button[2].checked)
        v = 2
    else if (radio_button[3].checked)
        v = 3
    quiz.questions[j].selectedAnswer = v;
}

// This function will get invoked when user clicks next or previous button
function displayPrevNext(temp) {
    $.getJSON('./json/question.json', function(data) {
        console.log();
        if (quiz == undefined)
            quiz= data;
        if (temp < 0) {
            alert("Warn:You are at the start of the quiz there is no previous question!!!");
            return;
        } else if (temp >= 5) {
            alert("Warn:You are at the end of the quiz there is no next question,Plz click Finish quiz!!!");
            return;
        }

        if (temp == 0 )
        {

            window.document.getElementsByName("previous").disabled = true;
        }
        else
        {
            window.document.getElementsByName("previous").disabled = false;
        }

        if (temp == 5 )
        {
            window.document.getElementsByName("next").disabled = true;
        }
        else
        {
            window.document.getElementsByName("next").disabled = false;
        }
        


        j = temp;
        console.log("Question " + quiz.questions[j].question);

        // Logic to display perticular question with corresponding options
        document.getElementById('question').innerHTML = quiz.questions[j].question;

        document.getElementById('opt1').innerHTML =  quiz.questions[j].option1;
        document.getElementById('opt2').innerHTML =  quiz.questions[j].option2;
        document.getElementById('opt3').innerHTML =  quiz.questions[j].option3;
        document.getElementById('opt4').innerHTML =  quiz.questions[j].option4;


        // Logic to display the previously selected answer for particular question j
        if (quiz.questions[j].selectedAnswer !== "") {

            var radio_button_recheck = window.document.getElementsByName("rad");
            radio_button_recheck[quiz.questions[j].selectedAnswer].checked = true;

        } else {

            // This question is not answered previously
            var radio_button_recheck_2 = window.document.getElementsByName("rad");
            for (var i = 0; i <= 3; i++) {
                radio_button_recheck_2[i].checked = false;
            }
        }
    });

}


function finishQuiz() {

    if (finishedQuiz === 0) {
        totalPercentage = (correctAnswers / totalQuestions) * 100;
        alert("correct answers  " + correctAnswers + "  percentage is" + totalPercentage);

        var result = totalPercentage >= 60 ? "passed" : "failed";
        var greeting = result === "passed" ? "Congratulations" : "sorry";
        alert(greeting + "  You " + result + " the exam");
        finishedQuiz = 1;
        localStorage.setItem('quizStarted',"False");
    }
    if (finishedQuiz > 0) {
        window.open("http://www.google.com", "_self");
    }

}


// Function for displaying current system time in hh:mm:ss PM/am format
function updateTime() {
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    var v = hours + ":" + minutes + ":" + seconds + " ";
    if (hours > 11) {
        v += "PM";
    } else {
        v += "AM"
    }
    setTimeout("updateTime()", 1000); // call this function again after 1000 ms
    document.getElementById('current_time').innerHTML = v;

}
updateTime();



var sec = 0;
min = 0;
var time;

// function to update the elapsed time
function upDateTimer() {

    sec++;
    if (sec == 60) {
        sec = 0;
        min++;
    }
    if (10 == min) // Duration of the quiz
    {
        //Time over so finish the quiz
        finishQuiz();

    }
    time = (min < 1 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec);

    document.getElementById("elapsed").innerHTML = time;
}

function startTest() {
    var timerStartID = setInterval(function() {
        upDateTimer()
    }, 1000);
}
