let quizData = {};
let score = 0;
let marksPerQuestion = 10;
let currentQuestion = 0;

const getParameter = (key) => {
  let queryParams = new URLSearchParams(window.location.search);
  const value = queryParams.get(key);
  return value;
}

if(getParameter("username") == null) {
  window.location.assign("/HTML/form.html");
} else {
  document.getElementById("name").innerText = getParameter("username");
}

const getData = async () => {
  let endpoint = "https://opentdb.com/api.php?amount=10&difficulty=easy";
  if(getParameter("category")) {
    endpoint += "&category=" + getParameter("category");
  }
  console.log(endpoint);

  try {
    const response = await fetch(endpoint);
    return response.json();
  } catch (error) {
    alert(error);
  }
  return null;
};

(async () => {
  quizData = (await getData()).results;
  renderQuestion(quizData[currentQuestion]);
})();

const renderQuestion = (question) => {
  let questionEl = document.getElementById("question");
  let answerEl = document.getElementById("options");

  questionEl.innerHTML = question.question;
  answerEl.innerHTML = "";

  let options = question.incorrect_answers;
  const randomIndex = Math.floor(Math.random() * (options.length - 0 + 1)) + 0;
  options.splice(randomIndex, 0, question.correct_answer);

  for (let i = 0; i < options.length; i++) {
    let option = document.createElement("div");
    let radio = document.createElement("input");
    let lable = document.createElement("label");

    lable.innerHTML = options[i];
    radio.setAttribute("type", "radio");
    radio.setAttribute("name", "option");
    option.classList.add("option");

    option.appendChild(radio);
    option.appendChild(lable);

    answerEl.appendChild(option);
  }
};

const submitAnswer = () => {
  const selectedOption = document.querySelector(
    'input[name="option"]:checked ~ label'
  ).textContent;
  const correctOption = quizData[currentQuestion].correct_answer;

  if (selectedOption === correctOption) {
    flashMessage("Correct Option");
    score += marksPerQuestion;
  } else {
    flashMessage("Wrong answer!, Corrent answer: " + correctOption);
  }

  if (currentQuestion == quizData.length - 1) {
    let query = new URLSearchParams();
    query.append("score", score);
    query.append("username", getParameter("username"));
    let url = "https://mayank-singh-rajput.github.io/QuizSite/HTML/score.html?" + query.toString();

    window.location.assign(url);
  }

  renderQuestion(quizData[++currentQuestion]);
};


const flashMessage = (msg) => {
  const el = document.querySelector(".flash");
  el.classList.add("flash-active");
  el.innerHTML = msg;
}

const removeFlash = () => {
  const el = document.querySelector(".flash");
  el.classList.remove("flash-active");
}


document.addEventListener("mousemove", (e) => {
  removeFlash();
});