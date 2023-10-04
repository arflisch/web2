const myForm = document.querySelector("form");
const div = document.querySelector(".form-container");
const souhait = document.querySelector("#souhait");
const resultContainer = document.querySelector("#resultContainer");

const onSubmit = (e) => {
    e.preventDefault();
    div.style.display = "none";
    resultContainer.innerText = `You submitted: ${souhait.value}`;
}

myForm.addEventListener("submit", onSubmit);
