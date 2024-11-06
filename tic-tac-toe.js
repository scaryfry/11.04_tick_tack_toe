const target = document.getElementById("target")
const target2 = document.getElementById("target2")


//X rajz
function drawX(event){
    event.target.textContent = "X";
}
//O rajz
function drawO(event){
    event.target.textContent = "O";
}
target.addEventListener("click", drawX)