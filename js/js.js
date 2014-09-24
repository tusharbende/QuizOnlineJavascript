/**
 * Created with JetBrains WebStorm.
 * User: synerzip
 * Date: 21/08/14
 * Time: 12:26 PM
 * To change this template use File | Settings | File Templates.
 */

var win;

// This function will remove quizStarted from localStorage on window/Tab closure
window.onbeforeunload = function() {
    localStorage.removeItem("quizStarted");
    return '';


function handler(e) {
  alert('Successfully communicate with other tab');
//  console.log('Received data: ' + localStorage.getItem('data'));
  getDatafromsessionstorage(e);
}

function updateTime() {
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
    setTimeout("updateTime()",1000);// call this function again after 1000 ms
//    document.getElementById('time').innerHTML=v;

}
updateTime();


function submitDataFunction(){

    var entered_username = document.getElementById('user').value;
    var entered_password = document.getElementById('password').value;

    if( document.main_form.user.value == "" )
    {
        alert( "Please provide your name!" );
        document.main_form.user.focus();
        return false;
    }

    if (document.main_form.password.value == "")
    {
        alert("Please enter your password!");
        document.main_form.password.focus();
        return false;
    }


//    alert("entered user name " + entered_username)
    switch(entered_username)
    {
        case "rohit":
            if(entered_password=="rohit")
            {

                if(localStorage.getItem("quizStarted")==="True")
                {
                    alert("Your session is already active in other tab");
                    return false;
                }
                
                alert("Welcome Rohit Deshmukh");
                setDatatosessionstorage(entered_username);
                localStorage.setItem('quizStarted',"True");
                // So User is valid user so show next data entry page.
                redirectToBeginTest();
            }
            else
            {
                alert("User name and password does not match !!!");
                return false;
            }
            break;
        case "tushar":
            if(entered_password=="tushar")
            {
                if(localStorage.getItem("quizStarted")==="True")
                {
                    alert("Your session is already active in other tab");
                    return false;
                }


                alert("Welcome Tushar Bende");
                setDatatosessionstorage(entered_username);
                localStorage.setItem('quizStarted',"True");
                // So User is valid user so show next data entry page.
                redirectToBeginTest();
            }
            else
            {
                alert("User name and password does not match !!!");
                return false;
            }
            break;
        default :
            alert("Entered username and password not Registered please sign up!");
    }


}
function resetFunction(){
    alert("Data Cleared");
}

function redirectToBeginTest() {
    window.open("TestStart.html", "_self");

}



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
   window.open("test.html", "_self");
    // Set start time of the quiz
    setStartTime();

}



function setDatatosessionstorage( entered_username_temp)
{
    sessionStorage.setItem('name',entered_username_temp);
  if (window.addEventListener) {
    // Normal browsers
    window.addEventListener("storage", handler, false);
  } else {
    // for IE (why make your life more difficult)
    window.attachEvent("onstorage", handler);
  };
}

function getDatafromsessionstorage()
{

    var received_username = sessionStorage.getItem('name');
  alert("WIndow Changed");
    return received_username;
}

