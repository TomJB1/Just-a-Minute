//Just A Minute local multiplayer game.
//Copyright (C) 2023  Tom Brandis



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

names = ["Player 1", "Player 2", "Player 3", "Player 4"]

scores = [0, 0, 0, 0]

currentPlayer = 1

lastPlayer = 1

objectingPlayer = 1


var lastBuzzed = new Date().getTime();

var buzzer = document.getElementById("buzzer")

var instructions = document.getElementById("instructions")

var whistle = document.getElementById("whistle")

const bodyObject = document.body

var pointPerWin = 1;

var pointPerCChallenge = 0;


function settingsClick()
{
    console.log("settings updated")
    var settings = document.getElementById("settingInside");
    settings.classList.toggle("show");

    pointPerWin = Number(document.getElementById("pointPerWin").value);

    pointPerCChallenge = Number(document.getElementById("pointPerCorrectChallenge").value);

    document.getElementById("rulesInside").classList.remove("show")
}

function rulesClick()
{
    var rules = document.getElementById("rulesInside");
    rules.classList.toggle("show")

    document.getElementById("settingInside").classList.remove("show")
}

function getRandomTopic()
{
    const random = Math.floor(Math.random() * topics.length);
    topic = topics[random]
    return topic
}


function updateName()
{
    for (let number = 0; number < names.length; number++) {
        nameboxid = "name" + (number + 1);
        names[number] = document.getElementById(nameboxid).value;
    }
    
}

document.addEventListener('keydown', function(event) {
    letter = event.key
    console.log(event.key)

    
    if ( document.activeElement === bodyObject)
    {
        
    
        
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

    }else
    {
        console.log("action " + letter + " block due to typing")
    }

});

function givePoints(amount)
{
    scoreID = "p" + currentPlayer +"Score"
    scores[currentPlayer] = Number(document.getElementById(scoreID).value)

    scores[currentPlayer] = scores[currentPlayer] + amount
    document.getElementById(scoreID).value = scores[currentPlayer];
}

function buzzerPressed()
{
    

    if(new Date().getTime() > lastBuzzed + 2500) {

        lastBuzzed = new Date().getTime();
        
        console.log("buzz upheld from " + letter)

        if( isTiming == true ) //buzzing to give objection
        {
            isTiming = false;

            updateName()
            document.getElementById("message").innerText = names[currentPlayer] + " buzzes";

            buzzer.play()

            currentPlayer = objectingPlayer


        }
        else if( isTiming == false && time == 60 || time == 0) //starting a new round
        {
            time = 60

            document.getElementById("isTalkingAbout").innerText = "is talking about"

            updateName()
            document.getElementById("currentPlayer").innerText = names[currentPlayer];

            instructions.play()
            
            newTopic = getRandomTopic()
            document.getElementById("topic").innerText = newTopic;
            document.getElementById("message").innerText = names[currentPlayer] + " begins the topic";

            instructions.onended = function() {
                startTimer()
            };
            
            lastPlayer = currentPlayer
        }
        else if ( isTiming == false && time > 0) //continuing a round
        {
            instructions.play()

            updateName()
            document.getElementById("message").innerText = names[currentPlayer] + " wins the challenge";

            console.log("last player: " + lastPlayer + " objecting player :" + objectingPlayer + " current player: " + currentPlayer)

            if ( lastPlayer != currentPlayer && objectingPlayer == currentPlayer)
            {
                givePoints(pointPerCChallenge)
                console.log("give points")
            }

            instructions.onended = function() {
                startTimer()
            };
            
            
        }
    }else
    {
        console.log("Buzz stopped from " + letter)
    }
}


function startTimer()
{
    isTiming = true;

    updateName()
    document.getElementById("currentPlayer").innerText = names[currentPlayer];
}

function timeUp()
{
    console.log("Time up");
    whistle.play()
    
    givePoints(pointPerWin)

    updateName()
    document.getElementById("message").innerText = names[currentPlayer] + " wins the point";

}


function decreaseTimer()
{
    if ( time > 0 && isTiming == true)
    {
        time = time - 1
        document.getElementById("time").innerText = time;
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