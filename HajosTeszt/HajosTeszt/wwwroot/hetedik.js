window.onload = () => {
    //letoltes();
    fetch('/questions/1')
        .then(response => response.json())
        .then(data => kerdesMegjelenites(data)
        );
}

var kerdesek;
var sorszam = 0;
var kerdesszam

var valasz1
var valasz2
var valasz3

function letoltes() {
    fetch("/questions.json")
        .then(response => response.json())
        .then(d => letoltesBefejezodott(d));
}
function letoltesBefejezodott(n) {
    console.log("Sikeres letoltes")
    console.log(n)
    kerdesek = n;
    kerdesmegjelenites(sorszam);

}


function kerdesMegjelenites(kerdes) {
    console.log(kerdes);
    document.getElementById("kerdes").innerText = kerdes.questionText
    valasz1 = document.getElementById("valasz1").innerHTML = kerdes.answer1
    valasz2 = document.getElementById("valasz2").innerHTML = kerdes.answer2
    valasz3 = document.getElementById("valasz3").innerHTML = kerdes.answer3
    if (kerdes.image !== "") {
        document.getElementById("kep1").src = "https://szoft1.comeback.hu/hajo/" + kerdes.image;
    }
    else {
        document.getElementById("kep1").src =""
    }
    correctAnswer = kerdes.correctAnswer
    questionId = kerdes.questionId
}

function kerdesBetoltes(id) {
    fetch(`/questions/${id}`)
        .then(response => {
            if (!response.ok) {
                console.error(`Hibás válasz: ${response.status}`)
            }
            else {
                return response.json()
            }
        })
        .then(data => kerdesMegjelenites(data));
}   

function vissza() {
    //if (sorszam == 0) {
    //    sorszam = kerdesek.length - 1;
    //    letoltes();
    //}
    //else {
    //    sorszam--;
    //    letoltes();
    //}
    kerdesBetoltes(questionId - 1)
    clear();
}

function elore() {
    //if (sorszam == kerdesek.length - 1) {
    //    sorszam = 0;
    //    letoltes();
    //}
    //else {
    //    sorszam++;
    //    letoltes();
    //}
    if (questionId == kerdesszam) {
        kerdesBetoltes(1)
    }
    else {
        kerdesBetoltes(questionId + 1)
    }  
    clear();
}
function clear() {
    document.getElementById("valasz1").classList.remove("rossz");
    document.getElementById("valasz2").classList.remove("rossz");
    document.getElementById("valasz3").classList.remove("rossz");
    document.getElementById("valasz1").classList.remove("jo");
    document.getElementById("valasz2").classList.remove("jo");
    document.getElementById("valasz3").classList.remove("jo");
}




function eredmeny() {
    if (correctAnswer == "1") {
        document.getElementById("valasz1").classList.add("jo");
        document.getElementById("valasz2").classList.add("rossz");
        document.getElementById("valasz3").classList.add("rossz");
    }
    else if (correctAnswer == "2") {
        document.getElementById("valasz2").classList.add("jo");
        document.getElementById("valasz1").classList.add("rossz");
        document.getElementById("valasz3").classList.add("rossz");
    }
    else {
        document.getElementById("valasz3").classList.add("jo");
        document.getElementById("valasz2").classList.add("rossz");
        document.getElementById("valasz1").classList.add("rossz");

    }

}