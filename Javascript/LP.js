//Global Variables
let activeChars = ["devJ"];
let selectedPage;
let selectedCharName;
let selectedCharIndex;
var optionsArray = [];
    //Score / Stats 
    var currentScore = 0;
    var currentRound = 0;
    var currentHealth = 3;
    //Buffs
    var powerUp1 = true;
    var powerUp2 = true;
    var lifeLine1 = true;
    var lifeLine2 = true;

gameStart(); //On page load

function randomNumber(){
    var rP = Math.floor(Math.random() * 148);
    var rC = Math.floor(Math.random() * 50);
    charPicker(rP, rC);
}
function charPicker (pageNum, charNum){
    $.get(`https://api.disneyapi.dev/characters?page=${pageNum}`, (data) => {
        selectedCharName = data.data[charNum].name;
        selectedCharIndex = charNum;
        selectedPage = pageNum;
        charCheck(selectedCharName);
      });
}
function charCheck(charName){
    $("#main").empty();

    if (activeChars.indexOf(charName) === -1){      
        activeChars.push(charName);
        otherSelections();
    } else {    
        randomNumber();
    }
}
function gameOn(options){
    $.get(`https://api.disneyapi.dev/characters?page=${selectedPage}`, (data) => {
        let whoPicture = data.data[selectedCharIndex].imageUrl
        //HTML
        let $head = $(`<div id="header"></div>`)
            let $H1 = $(`<h1>Who's This Character?</h1>`)
        let $picDiv = $(`<img src=${whoPicture} style="width: 300px; height: 400px; border: 10px solid black">`)
        let $guessDiv = $(`<div id="guesses"></div>`)
            let $gOne = $(`<div id="g1">${options[0]}</div>`)
            let $gTwo = $(`<div id="g2">${options[1]}</div>`)
            let $gThree = $(`<div id="g3">${options[2]}</div>`)
            let $gFour = $(`<div id="g4">${options[3]}</div>`)
        let $bottomUi = $(`<div id="bottomUi"></div>`)
            let $power_up = $(`<div id="power_up"></div>`)
                let $time = $(`<div id="time"></div>`)
                    let $timeP = $(`<img src="../Assets/Clock.png">`)
                let $points = $(`<div id="points"></div>`)
                    let $pointP = $(`<img src="../Assets/points.png">`)
            let $score = $(`<div id="score_card"></div>`)
                let $counter = $(`<div id="counter"><div id='count'>${currentScore}</div></div>`)
            let $lifeLine = $(`<div id="life_line"></div>`)
                let $5050 = $(`<div id="fif"></div>`)
                    let $5050P = $(`<img src="../Assets/half.png">`)
                let $freebie = $(`<div id="freebie"></div>`)
                    let $freeP = $(`<img src="../Assets/heart.png">`)
        
        $("#main").append($head, $picDiv, $guessDiv, $bottomUi)
            $("#header").append($H1)
            $("#guesses").append($gOne, $gTwo, $gThree, $gFour)
            $("#bottomUi").append($power_up, $score, $lifeLine)    
                $("#life_line").append($5050, $freebie)
                $("#score_card").append($counter)
                $("#power_up").append($time, $points)
                    $('#time').append($timeP)
                    $('#points').append($pointP)
                    $('#fif').append($5050P)
                    $('#freebie').append($freeP)

        
        $("#g1").hover(function(){$(this).css("border", "4px solid yellow");}, function(){$(this).css("border", "4px solid black");});
        $("#g2").hover(function(){$(this).css("border", "4px solid yellow");}, function(){$(this).css("border", "4px solid black");});
        $("#g3").hover(function(){$(this).css("border", "4px solid yellow");}, function(){$(this).css("border", "4px solid black");});
        $("#g4").hover(function(){$(this).css("border", "4px solid yellow");}, function(){$(this).css("border", "4px solid black");});
        
        $("#g1").on("click",selectionChecker)
        $("#g2").on("click",selectionChecker)
        $("#g3").on("click",selectionChecker)
        $("#g4").on("click",selectionChecker)

        if (currentHealth === 3){
            $('#counter').css('background-color', "green");
        } else if (currentHealth === 2){
            $('#counter').css('background-color', "yellow");
        } else {
            $('#counter').css('background-color', "red")
        }

    });
    
}
function otherSelections(){
    optionsArray = [];
    console.log('started');
    console.log(optionsArray);
    optionsArray.push(selectedCharName);
    for(var x = 0; x < 4; x++){
        var rSP = Math.floor(Math.random() * 148);
        var rSC = Math.floor(Math.random() * 50);
        $.get(`https://api.disneyapi.dev/characters?page=${rSP}`, (data) => {  
            if(optionsArray.length < 4){
                optionsArray.push(data.data[rSC].name);
            } else {
                optionsArray.sort();
                gameOn(optionsArray);
            }
        });
    }
}
function selectionChecker(e){
    
    if(e.target.innerText === selectedCharName){
        currentScore++;
        currentRound++;
        randomNumber();
    } else {   
        currentHealth--;
        currentRound++;
        currentHealth === 0 ? gameEnd() : randomNumber();
    }
}
function gameEnd(){
    $("#main").empty();
    let eMBc = $(`<div class="endMenuContainer"></div>`)
        let eMHead = $(`<h1>Game Over</h1>`)
        let eMStats = $(`<p>You got ${currentScore} answers correct <br>
                            You lost on question ${currentRound} </p>`)
        let eMPlay = $(`<button type=button id='play' onclick="randomNumber()">Play Again</button>`)
        let eMHome = $(`<button type=button id='home' onclick="location.href='./index.html'">Home Screen</button>`)      
    $('#main').append(eMBc);
    $('.endMenuContainer').append(eMHead, eMStats, eMPlay, eMHome);
    currentRound = 0;
    currentHealth = 3;
}
function gameStart(){
    $('#main').empty();
    let sMBc = $(`<div class="startMenuContainer"></div>`)
        let sMHead = $(`<h1>Let's Begin!</h1>`)
        let sMPlay = $(`<button type=button id='startPlaying' onclick='randomNumber()'>Start</button>`)
        let sMHome = $(`<button type=button id='startHome' onclick="location.href='./index.html'">Home Screen</button>`)
        let sMShop = $(`<button type=button id='startShop' onclick="location.href='./shop.html'">Visit Shop</button>`)  
        $('#main').append(sMBc);
        $('.startMenuContainer').append(sMHead, sMPlay, sMHome, sMShop);

}