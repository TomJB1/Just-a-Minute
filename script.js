



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


var lastBuzzed = new Date().getTime();

var buzzer = document.getElementById("buzzer")

var instructions = document.getElementById("instructions")

var whistle = document.getElementById("whistle")

const bodyObject = document.body


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
        console.log(nameboxid)
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

    

function buzzerPressed()
{
    

    if(new Date().getTime() > lastBuzzed + 2500) {

        lastBuzzed = new Date().getTime();
        
        console.log("buzz upheld from " + letter)

        if( isTiming == true ) //buzzing to give objection
        {
            isTiming = false;

            updateName()
            document.getElementById("message").innerHTML = names[currentPlayer] + " buzzes";

            buzzer.play()

        }
        else if( isTiming == false && time == 60 || time == 0) //starting a new round
        {
            time = 60

            document.getElementById("isTalkingAbout").innerHTML = "is talking about"

            updateName()
            document.getElementById("currentPlayer").innerHTML = names[currentPlayer];

            instructions.play()
            
            newTopic = getRandomTopic()
            document.getElementById("topic").innerHTML = newTopic;
            document.getElementById("message").innerHTML = names[currentPlayer] + " begins the topic";

            instructions.onended = function() {
                startTimer()
            };
            

        }
        else if ( isTiming == false && time > 0) //continuing a round
        {
            instructions.play()

            updateName()
            document.getElementById("message").innerHTML = names[currentPlayer] + " wins the challenge";

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
    document.getElementById("currentPlayer").innerHTML = names[currentPlayer];
}

function timeUp()
{
    console.log("Time up");
    whistle.play()
    scoreID = "p" + currentPlayer +"Score"
    scores[currentPlayer] = Number(document.getElementById(scoreID).value)

    scores[currentPlayer] = scores[currentPlayer] + 1
    document.getElementById(scoreID).value = scores[currentPlayer];

    updateName()
    document.getElementById("message").innerHTML = names[currentPlayer] + " wins the point";

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