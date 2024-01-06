let queryParams = new URLSearchParams(window.location.search);
let score = queryParams.get("score"); 
let username = queryParams.get("username");
document.getElementById("score").innerText = score;
document.querySelector(".name-container").innerText = username;