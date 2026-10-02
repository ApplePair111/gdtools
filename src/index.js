const VERSION = "v0.2dev";

// modules

import express from "express"
import axios from "axios"

// setup Express


const app = express();

app.use(express.json());


// XOR cipher

function xorCipher(input, key) {
  let result = "";
  for (let i = 0; i < input.length; i++) {
    const byte = input.charCodeAt(i) & 0xFF;
    const xKey = key.charCodeAt(i % key.length) & 0xFF;
    result += String.fromCharCode(byte ^ xKey);
  }
  return result;
}



function levelParse(str) {
  const [a, h1, h2] = str.split("#");
  const lvl = a.split(":").filter((_, i) => i % 2 === 1);
  return lvl;
}

app.post("/api/login", async (req, res) => {

    console.log("Recieved request for login!")

    const { data, status } = await axios.post("https://boomlings.com/database/accounts/loginGJAccount.php", new URLSearchParams({ udid: "03553293-D9A3-404A-A97D-5D8085C6202C", userName: req.body.username, gjp2: process.getBuiltinModule('crypto').createHash('sha1').update(req.body.password + 'mI29fmAnxgTs').digest('hex'), secret: "Wmfv3899gc9" }), { headers: { 'User-Agent': false } }) // HUGE ONELINER!

    //const { data, status } = await axios.post("http://localhost:3001", new URLSearchParams({ udid: "58121f94-8233-4e50-9095-052a7241b774", userName: req.body.username, gjp2: process.getBuiltinModule('crypto').createHash('sha1').update(req.body.password + 'mI29fmAnxgTs').digest('hex'), secret: "Wmfv3899gc9" }), { headers: { 'User-Agent': false } }) // HUGE ONELINER!

    
    //console.log(`GD request recieved with status ${status} and data ${data}. Data type is ${typeof data}`)

    let err = null;

    if ((Number(data) === NaN) === false && Number(data) < 0) {err = Number(data)}

    if (typeof err === "number") {

    switch (err) {
        case -1:
            res.status(500).json({ok: false, error: "unknown"})
            break
        case -8:
        case -9:
        case -11:
            res.status(401).json({ok: false, error: "bad-credentials"})
            break

        case -12:
            res.status(403).json({ok: false, error: "disabled"})
            break

        case -13:
            res.status(500).json({ok: false, error: "sid-error"})
            break}}


    let accountID = String(data).split(",")[0]
    let playerID = String(data).split(",")[1]

    if (!status == 200) {console.error("non-200 response"); return res.status(500).json({ok: false, error: "GDerror"})}

    return res.json({ ok: true, accountID: accountID, playerID: playerID})

});

app.post("/api/test", (req, res) => {
    console.log("Request recieved at /api/test!")
    res.send("OK")
});

app.get("/api/version", (req, res) => {
    res.send(VERSION)
})


app.post("/api/levelpass", async (req, res) => {

    if (typeof req.body.levelID === undefined) {return res.status(400).json({ ok: false, error: "no levelID" })}

    const { data } = await axios.post("https://boomlings.com/database/downloadGJLevel22.php", new URLSearchParams({ levelID: req.body.levelID, secret: "Wmfd2893gb7" }))

});


export default app;