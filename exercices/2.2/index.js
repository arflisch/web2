document.addEventListener("click", clickCounter);
let count = 0;

function clickCounter() {
  const counter = document.querySelector("#counter");
  const message = document.querySelector("#message");
  count++;
  counter.textContent = count;
  if(count>4 && count < 10){
    message.textContent = "Bravo, bel échauffement !";
  }else if(count > 9){
    message.textContent = "Vous êtes passé maître en l'art du clic !";
  }
}