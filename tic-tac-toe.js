const target = document.getElementById("target")

function drawX(event){
    event.target.textContent = "X";
}
target.addEventListener("click", drawX)