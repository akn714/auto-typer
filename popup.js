document.getElementById("submit").addEventListener("click", async () => {
  const text = document.getElementById("text-input").value;
  const countdownEl = document.getElementById("countdown");

//  for (let i = 3; i > 0; i--) {
   // countdownEl.textContent = `Typing in ${i}...`;
  //  await new Promise(r => setTimeout(r, 1000));
 // }

  countdownEl.textContent = "Typing now...";

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { type: "startTyping", text });
  });
});
