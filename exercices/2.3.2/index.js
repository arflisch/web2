const divs = document.querySelectorAll(".color-div");

divs.forEach((div) => {
    div.addEventListener("click", (e) => {
        div.style.height = "100px";
        div.style.width = "100px";
        div.innerText = e.target.style;
    })  
})