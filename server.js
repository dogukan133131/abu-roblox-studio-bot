const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let latestCommand = null;

// Gemini API (GÜVENLİ şekilde)
async function askGemini(message) {
    const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-goog-api-key": process.env.GEMINI_API_KEY
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: `
Sen bir Roblox komut üreticisisin.

SADECE JSON döndür:

Örnek:
{"command":"CREATE_PART"}

Kullanıcı mesajı:
${message}
                            `
                            }
                        ]
                    }
                ]
            })
        }
    );

    const data = await response.json();

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    return text;
}

// Chat endpoint
app.post("/chat", async (req, res) => {
    const { message } = req.body;

    try {
        const aiResponse = await askGemini(message);

        console.log("AI:", aiResponse);

        const parsed = JSON.parse(aiResponse);

        latestCommand = parsed;

        res.json({ success: true, result: parsed });

    } catch (err) {
        console.log(err);
        res.json({ success: false });
    }
});

// Roblox buradan komut çeker
app.get("/getCommand", (req, res) => {
    res.json(latestCommand || {});
});

app.get("/healthz", (req, res) => {
    res.send("OK");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server çalışıyor:", PORT);
});
