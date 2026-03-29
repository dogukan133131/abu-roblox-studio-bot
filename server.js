const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let latestCommand = null;

// Test endpoint
app.get("/", (req, res) => {
    res.send("API çalışıyor 🚀");
});

// Roblox buradan komut alacak
app.get("/getCommand", (req, res) => {
    res.json({ command: latestCommand });
});

// AI veya website buraya komut gönderecek
app.post("/setCommand", (req, res) => {
    const { command } = req.body;

    latestCommand = command;

    console.log("Yeni komut:", command);

    res.json({ success: true });
});

// Health check (Render için)
app.get("/healthz", (req, res) => {
    res.send("OK");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server çalışıyor:", PORT);
});
