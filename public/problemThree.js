const input = document.getElementById("result");
function handleCookieChange() {
  input.innerHTML = "you are admin";
}

let lastCookie = document.cookie; // store cookie for comparison

setInterval(() => {
  if (document.cookie !== lastCookie) {
    lastCookie = document.cookie;
    handleCookieChange(); // function to handle the change
  }
}, 1000); // check every second
