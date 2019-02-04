//-------------------------------------global variables----------------------------------------------------
//countdown number on screen
var number = 30;
var intervalId;
//variable keep tracking of whether the countdown is on
var isrunning = false;
//variable that keep tracking of the round
var round = -1;
//variable that save the option tht the player chose
var answer = "";
//variable that keep tracking the correct answers
var correct = 0;
//variable that keep tracking the incorrect answers
var incorrect = 0;
//variable that keep tracking the unanswered
var unanswered = 0;

//question array
var question = [
    {
        q: "1. What is the longest river in Africa?",
        op1: "Zambezi",
        op2: "Nile",
        op3: "Congo",
        op4: "Niger",
        key: "Nile",
        img: 'https://media.giphy.com/media/vBzDAe90oDE3u/giphy.gif'
    },
    {
        q: "2. Which country has the largest population in South America?",
        op1: "Colombia",
        op2: "Peru",
        op3: "Brazil",
        op4: "Argentina",
        key: "Brazil",
        img: 'https://media.giphy.com/media/3oD3YLLQBxZbBBYSWc/giphy.gif'
    },
    {
        q: "3. What is Earth's largest ocean by surface size?", 
        op1: "Indian", 
        op2: "Arctic", 
        op3: "Pacific", 
        op4: "Atlantic",
        key: "Pacific",
        img: 'https://media.giphy.com/media/8L0zb7TqT6N2g8qFwN/giphy.gif'
    },
    {
        q: "4. What is the highest mountain on Earth (from sea level to top)?", 
        op1: "Matterhorn",
        op2: "Mount Everest", 
        op3: "K2",
        op4: "Kilimanjaro",
        key: "Mount Everest",
        img: "https://media.giphy.com/media/3o6MbhdrQxaTJxhOiQ/giphy.gif"
    },
    {
        q: "5. What is Earth's approximate water vs. land coverage ratio?", 
        op1: "71 to 29",
        op2: "61 to 39",
        op3: "51 to 49", 
        op4: "81 to 19",
        key: "71 to 29",
        img: "https://media.giphy.com/media/l41Yebuue6SANKHYI/giphy.gif"
    },
    {
        q: "6. Which continent has the most independent countries?", 
        op1: "Asia", 
        op2: "Europe", 
        op3: "Oceania", 
        op4: "Africa",
        key: "Africa",
        img: "https://media.giphy.com/media/bL4h3qu3vwx1K/giphy.gif"
    },
    {
        q: "7. What is the southernmost capital of an independent nation in the world?", 
        op1: "Pretoria", 
        op2: "Montevideo",
        op3: "Wellington", 
        op4: "Canberra",
        key: "Wellington", 
        img: "https://media.giphy.com/media/cwLy6PE1saJqM/giphy.gif"
    },
    {
        q: "8. What is the approximate size of the Earth's equator?", 
        op1: "10,000km/6,214mi", 
        op2: "40,000km/24,855mi", 
        op3: "30,000km/18,641mi", 
        op4: "20,000km/12,427mi",
        key: "40,000km/24,855mi", 
        img: "https://media.giphy.com/media/nWXvQqyGRJJtu/giphy.gif"
    },
    {
        q: "9. What is Earth's second largest continent by population?", 
        op1: "South America", 
        op2: "Africa", 
        op3: "Europe", 
        op4: "North America",
        key: "Africa", 
        img: "https://media.giphy.com/media/k88beywQDnV3G/giphy.gif"

    },
    {
        q: "10. Which country is the largest in the world by surface area?", 
        op1: "Russia", 
        op2: "Canada", 
        op3: "USA", 
        op4: "China",
        key: "Russia", 
        img: "https://media.giphy.com/media/InketCaEF5OOQ/giphy.gif"
    }

]


//-------------------------------------Click handlers--------------------------------------------------

$(document).ready(function () {

    //create a click handler for start button
    $(".container").on("click", '#start', function(){
        //display countdown
        $("#countdown").css("display","block")
        //show questions and answers
        show()
    })

//create click handlers for the answers
//click then stop the countdown and run the check function to check the answer
$(".target").on('click', '#op1', function(){
    answer = question[round].op1
    stop()
    check()
})
$(".target").on('click', '#op2', function(){
    answer = question[round].op2
    stop()
    check()
})
$(".target").on('click', '#op3', function(){
    answer = question[round].op3
    stop()
    check()
})
$(".target").on('click', '#op4', function(){
    answer = question[round].op4
    stop()
    check()
})

//-------------------------------------Functions-------------------------------------------------------

    //create a countdown function for setInterval
    function countdown() {
        if (isrunning === false && number > 0) {
            //mark the countdown as on
            isrunning = true;
            //change the number on screen by 1 second (run the decrement function)
            intervalId = setInterval(decrement, 1000);
        }
    }

    //create a decrement function for countdown number on the sreen
    function decrement() {
        //number minus one
        number--;
        //show the number on screen (after 1 second interval)
        $("#countdown").text("Time Remaining: " + number + " Seconds");
        if (number === 0){
            stop();
            //when the time is over, show response
            //show the text "Out of Time!"
            $("#item-a").html($("<p>").text("Out of Time!").attr("class","response"))
            //show the correct answer
            $("#item-a").append($("<p>").text("The correct answer is: " + question[round].key).attr("class","response"))
            //show the gif in object
            $("#item-b").html($("<img>").attr("src",question[round].img))
            //count the question as unanswered
            unanswered = unanswered + 1;
            //click anywhere or automatically show the next question after 5 seconds
            setTimeout(show, 5000);
        }
    };

    //create a stop function to stop the countdown when shift to the next question
    function stop() {
        //mark the countdown as off
        isrunning = false;
        //stop the interval function
        clearInterval(intervalId);
      }
    
    //create a show function to display question and answer on screen
    function show() {
        //keep tracking of the round
        round = round + 1;
        //clean the screen
        clean()
        //if questions haven't been ran out, continue to display the next question
        if(round<question.length){
        number = 30;
        countdown()
        $(".target").append($("<div>").attr("id","item-a"))
        $(".target").append($("<div>").attr("id","item-b"))
        $("#item-a").append(
        $("<p>").text(question[round].q).attr("class","question")
        );
        $("#item-b").append(
            $("<p>").text("A. " + question[round].op1).attr("id","op1"),
            $("<p>").text("B. " + question[round].op2).attr("id","op2"),
            $("<p>").text("C. " + question[round].op3).attr("id","op3"),
            $("<p>").text("D. " + question[round].op4).attr("id","op4")
        );
        //if questions have been ran out, run the end function
        }else{
            end()
        }
    }


    //create a function that check the answer
    function check() {
        //if the click option is the same as the key, answer is correct
        if(answer === question[round].key){
            //show on the screen that the answer is correct
            $("#item-a").html($("<p>").text("Correct!").attr("class","response"))
            //show the gif in object
            $("#item-b").html($("<img>").attr("src",question[round].img))
            //count the answer as correct answer
            correct = correct + 1;
        //if the click option is different the key, answer is wrong
        }else{
            //show on the screen that the answer is wrong
            $("#item-a").html($("<p>").text("Nope!").attr("class","response"))
            //show the gif in object
            $("#item-a").append($("<p>").text("The correct answer is: " + question[round].key).attr("class","response"))
            //show the gif in object
            $("#item-b").html($("<img>").attr("src",question[round].img))
            //count the answer as incorrect answer
            incorrect = incorrect + 1;
        }
        //click anywhere or automatically show the next question after 5 seconds
        setTimeout(show, 5000)
    }

    //create a function that clean up the displayed items on screen
    function clean() {
        $( "#item-a" ).remove();
        $( "#item-b" ).remove();
        $( "#countdown" ).text("Time Remaining: 30 Seconds");
        $( "#start" ).remove();
        $( "#welcomeimg" ).remove();
    }
    
    //create a function that run at the end of the game
    function end(){
        //display the scores
        $(".target").append($("<div>").attr("id","item-a"))
        $("#item-a").append(
            $("<h2>").text("All done, here's how you did!"),
            $("<p>").text("Correct Answers: " + correct),
            $("<p>").text("Incorrect Answers: " + incorrect),
            $("<p>").text("Unanswered: " + unanswered),
            //a restart button
            $("<button>").text("Start Over?").attr("id","start")
        )
        //clean up the round to original state
        round = -1;
    }
})
