var hotList = [];           //Az éppen gyakoroltatott kérdések listája 
var questionsInHotList = 3; //Ez majd 7 lesz, teszteléshez jobb a 3. 
var displayedQuestion;      //A hotList-ből éppen ez a kérdés van kint
var numberOfQuestions;      //Kérdések száma a teljes adatbázisban
var nextQuestion = 1;       //A következő kérdés száma a teljes listában
var timerHandler;

window.onload = init;
//document.addEventListener("DOMContentLoaded",init)

function init() {
    for (let i = 0; i < questionsInHotList; i++) {
        hotList[i] = {
            question: {},
            goodAnswers: 0
        }
    }



    //Kérdések száma
    fetch("/questions/count")
        .then(result => result.text())
        .then(n => { numberOfQuestions = parseInt(n) })

    //Előre-hátra gombok
    document.getElementById("elore_gomb").addEventListener("click", elore);
    document.getElementById("vissza_gomb").addEventListener("click", vissza);

    //Mentett állapot olvasása
    if (localStorage.getItem("hotlist")) {
        hotList = JSON.parse(localStorage.getItem("hotlist"));
    }
    if (localStorage.getItem("displayedQuestion")) {
        displayedQuestion = parseInt(localStorage.getItem("displayedQuestion"))
    }
    if (localStorage.getItem("nextQuestion")) {
        nextQuestion = parseInt(localStorage.getItem("nextQuestion"))
    }
    
    //kezdő kérdéslista letöltése
    if (hotList.length > 0) {
        for (let i = 0; i < questionsInHotList; i++) {
            kerdesBetoltes(nextQuestion, i);
            nextQuestion++;
        }
    }
    else {
        console.log("LocalStorage-ból olvasott kérdéseket használ most")
        kerdesMegjelenites();
    }

}


function kerdesBetoltes(questionNumber, destination) {
    fetch(`/questions/${questionNumber}`)
        .then(response => {
            if (!response.ok) {
                console.error(`Hibas válasz: ${response.status}`)
            }
            else {
                return response.json()
            }

        }
        )
        .then(data => {
            hotList[destination].question = data;
            hotList[destination].goodAnswers = 0;
            console.log(`A ${questionNumber}. kerdes letoltve a hot list ${destination}. helyere`)
            if (displayedQuestion === undefined && destination === 0) {
                displayedQuestion = 0;
                kerdesMegjelenites();
            }
        }
        );
}

function kerdesMegjelenites() {
    let kerdes = hotList[displayedQuestion].question;
    document.getElementById("kerdes").innerText = kerdes.questionText;
    document.getElementById("valasz1").innerText = kerdes.answer1;
    document.getElementById("valasz2").innerText = kerdes.answer2;
    document.getElementById("valasz3").innerText = kerdes.answer3;


    if (kerdes.image) {
        document.getElementById("kep").innerHTML = `<img id="kep1" src="https://szoft1.comeback.hu/hajo/${kerdes.image}">`;;
        document.getElementById("kep1").style.display = "block";
    }
    else {
        document.getElementById("kep1").style.display = "none";
    }
    for (var i = 1; i <= 3; i++) {
        document.getElementById("valasz" + i).classList.remove("jo","rossz")
    }
    document.getElementById("válaszok").style.pointerEvents = "auto";
}

function elore() {
    clearTimeout(timerHandler);
    displayedQuestion++;
    if (displayedQuestion === questionsInHotList) displayedQuestion = 0;
    kerdesMegjelenites();
}

function vissza() {
    displayedQuestion--;
    if (displayedQuestion < 0) displayedQuestion = questionsInHotList - 1;
    kerdesMegjelenites();
}

function valasztas(n) {
    let kerdes = hotList[displayedQuestion].question;
    if (n === kerdes.correctAnswer) {
        document.getElementById("valasz" + n).classList.add("jo")
        hotList[displayedQuestion].goodAnswers++;
        if (hotList[displayedQuestion].goodAnswers===3) {
            kerdesBetoltes(nextQuestion, displayedQuestion);
            nextQuestion++;
        }
    }
    else {
        document.getElementById("valasz" + n).classList.add("rossz")
        document.getElementById("valasz" + kerdes.correctAnswer).classList.add("jo")
        hotList[displayedQuestion].goodAnswers=0;
    }

    document.getElementById("válaszok").style.pointerEvents = "none";
    timerHandler = setTimeout(elore, 3000);

    localStorage.setItem("hotlist", JSON.stringify(hotList));
    localStorage.setItem("displayedQuestion", displayedQuestion);
    localStorage.setItem("nextQuestion", nextQuestion);
}