window.onload = () => {
    letoltes();
}

var kerdesek;
var sorszam = 0;
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

var kerdesmegjelenites = function(kerdesszam) {
    let kerdesSzoveg = document.getElementById("kerdes");
    let kep = document.getElementById("kep1");
    let valasz1 = document.getElementById("valasz1");
    let valasz2 = document.getElementById("valasz2");
    let valasz3 = document.getElementById("valasz3");

    kerdesSzoveg.innerHTML = kerdesek[kerdesszam].questionText
    kep.src = "https://szoft1.comeback.hu/hajo/" + kerdesek[kerdesszam].image
    valasz1.innerText = kerdesek[kerdesszam].answer1
    valasz2.innerText = kerdesek[kerdesszam].answer2
    valasz3.innerText = kerdesek[kerdesszam].answer3

}

function vissza() {
    if (sorszam == 0) {
        sorszam = kerdesek.length - 1;
        letoltes();
    }
    else {
        sorszam--;
        letoltes();
    }
    clear();
}

function elore() {
    if (sorszam == kerdesek.length-1) {
        sorszam = 0;
        letoltes();
    }
    else {
        sorszam++;
        letoltes();
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
    if (kerdesek[sorszam].correctAnswer == "1") {
        document.getElementById("valasz1").classList.add("jo");
        document.getElementById("valasz2").classList.add("rossz");
        document.getElementById("valasz3").classList.add("rossz");
    }
    else if (kerdesek[sorszam].correctAnswer == "2") {
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
