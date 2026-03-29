let apiURL = "https://abu-roblox-studio-bot.onrender.com";

function login() {
    const username = document.getElementById("username").value;

    if (username) {
        document.querySelector(".card").style.display = "none";
        document.getElementById("chatBox").style.display = "block";
    }
}

function sendMessage() {
    const input = document.getElementById("messageInput");
    const messages = document.getElementById("messages");

    const text = input.value;
    if (!text) return;

    messages.innerHTML += `<p>Sen: ${text}</p>`;

    fetch(apiURL + "/setCommand", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ command: text })
    });

    input.value = "";
}

function connect() {
    alert("Roblox plugin ile bağlantı kuruluyor...");
}
