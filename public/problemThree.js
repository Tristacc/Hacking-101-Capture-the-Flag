const input = document.getElementById("result");
const userInput = document.getElementById("xss-input");
const button = document.getElementById("xssBtn");
let lastCookie = document.cookie; // store cookie for comparison
function handleCookieChange() {
  input.innerHTML = "you are admin";
}

function checkAnswer() {}

function trigger() {
  let text = userInput.value;
  userInput.value = "";
  console.log("trigger function");
  if (
    text.includes("<script>") &&
    text.includes("document.cookie") &&
    text.includes("</script>")
  ) {
    alert(lastCookie);
    console.log(text);
  }
}

button.addEventListener("click", trigger);

setInterval(() => {
  if (document.cookie !== lastCookie) {
    lastCookie = document.cookie;
    handleCookieChange(); // function to handle the change
  }
}, 1000); // check every second
