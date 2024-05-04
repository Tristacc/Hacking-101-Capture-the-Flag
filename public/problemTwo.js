const input = document.getElementById("chat-input");
const testOutput = document.querySelector(".test");
const button = document.getElementById("btn");

function trigger() {
  let text = input.value;
  input.value = "";
  testOutput.innerHTML = text;
  console.log("trigger function");

  const scripts = testOutput.getElementsByTagName("script");
  for (let script of scripts) {
    alert("flag:ty567");
    console.log("fakeXSS function");
  }

  checkFlag(text);
}

function checkFlag(userInput) {
  if (userInput == "ty567") {
    window.location.href = "http://localhost:3000/djfoei89788";
  }
}

button.addEventListener("click", trigger);
