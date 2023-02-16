



const topics = ["camping", "sailing", "A bird in hand is worth 2 in the bush", "A chain is only as strong as the weakest link",
"A picture is worth a thousand words", "Don't look a gift horse in the mouth", "Shutting the stable door after the horse has bolted",
"Grinning like a Cheshire cat", "Mad dogs and Englishmen", "Mightier than the sword", "A Cup of Tea", "Devil's advocate", "Pot calling the kettle black",
"Every cloud has a silver lining", "Take with a grain of salt", "One small step for man,", "Apple of my eye", "The best laid plans of mice and men",
"The sky's the limit", "When there's a R in the month", "Wouldn't touch with a barge pole", "To vanish into thin air", "When pig's fly",
"Magic Thinking"]



playerNumber = 4;

timerStart = 60;

time = timerStart;

isTiming = false;

player1Key = "a";
player2Key = "x";
player3Key = ",";
player4Key = "'";

scores = [0, 0, 0, 0]

currentPlayer = 1



function getRandomTopic()
{
    const random = Math.floor(Math.random() * topics.length);
    topic = topics[random]
    return topic
}



document.addEventListener('keydown', function(event) {
    letter = event.key
    console.log(event.key)
    
    if (letter == player1Key)
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
        document.getElementById("message").innerHTML = "Player " + (currentPlayer + 1) + " buzzes";

    }
    else if( isTiming == false && time == 60 || time == 0)
    {
        time = 60
        startTimer()
        newTopic = getRandomTopic()
        document.getElementById("topic").innerHTML = newTopic;
        document.getElementById("message").innerHTML = "Player " + (currentPlayer + 1) + " begins the topic";

    }
    else if ( isTiming == false && time > 0)
    {
        startTimer()
        document.getElementById("message").innerHTML = "Player " + (currentPlayer + 1) + " wins the challenge";
    }
}


function startTimer()
{
    isTiming = true;
    document.getElementById("currentPlayer").innerHTML = "Player " + (currentPlayer + 1);
}

function timeUp()
{
    console.log("Time up");
    scores[currentPlayer] = scores[currentPlayer] + 1
    scoreID = "p" + currentPlayer +"Score"
    document.getElementById(scoreID).innerHTML = scores[currentPlayer];
    document.getElementById("message").innerHTML = "Player " + (currentPlayer + 1) + " wins the point";

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