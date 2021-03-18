window.onload = () => {

    var faktorialis = (n) => {
        if (n === 0 || n === 1) {
            return 1;
        } else {
            return n * faktorialis(n - 1)
        }
    }

let hova = document.getElementById("pascal");
    for (var s = 0; s < 10; s++) {
        let sor = document.createElement("div");
        sor.classList.add("sor");
        hova.appendChild(sor);


        for (var o = 0; o <= s; o++) {
            let elem = document.createElement("div")
            elem.classList.add("elem");
            sor.appendChild(elem);
            var eredmeny = faktorialis(s) / (faktorialis(o) * (faktorialis(s - o)));
            elem.innerText = `${eredmeny}`; 
            elem.style.color = `rgb(${255/20 * eredmeny},0,0)`;
    }
}
}