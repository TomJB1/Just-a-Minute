playerNumber = 4;

timerStart = 60;

time = timerStart;

isTiming = false;

player1Key = "z";
player2Key = "x";
player3Key = "c";
player4Key = "v";

scores = [0, 0, 0, 0]

currentPlayer = 1

document.addEventListener('keydown', function(event) {
    letter = event.key
    console.log(event.key)
    
    if (letter == "z")
    {
        currentPlayer = 0
        buzzerPressed();

    }else if (letter == player2Key)
    {
        currentPlayer = 1
        buzzerPressed();

    }else if (letter == player3Key)
    {
        currentPlayer = 2
        buzzerPressed();

    }else if (letter == player4Key)
    {
        currentPlayer = 3
        buzzerPressed();
    }

    });

function buzzerPressed()
{
    
    
   
    
    if( isTiming == true )
    {
        isTiming = false;

    }
    else if( isTiming == false && time == 0)
    {
        time = 60
        startTimer()
    }
    else if ( isTiming == false && time > 0)
    {
        startTimer()
    }
}


function startTimer()
{
    isTiming = true;
    document.getElementById("currentPlayer").innerHTML = (currentPlayer + 1);
}

function timeUp()
{
    console.log("Time up");
    scores[currentPlayer] = scores[currentPlayer] + 1
    scoreID = "p" + currentPlayer +"Score"
    document.getElementById(scoreID).innerHTML = scores[currentPlayer];

}


function decreaseTimer()
{
    if ( time > 0 && isTiming == true)
    {
        time = time - 1
        document.getElementById("time").innerHTML = time;
    } else if (isTiming == true)
    {
        timeUp()
        isTiming = false
    } else
    {
        console.log("not timing")
    }
    
}

  setInterval(decreaseTimer, 1000)