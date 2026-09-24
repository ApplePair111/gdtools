// modules

import express from "express"
import axios from "axios"

// setup Express

const app = express();

app.use(express.json());

app.post("/api/login", async (req, res) => {

    console.log("Recieved request for login!")

    const { data, status } = await axios.post("https://boomlings.com/database/accounts/loginGJAccount.php", new URLSearchParams({ udid: "03553293-D9A3-404A-A97D-5D8085C6202C", userName: req.body.username, gjp2: process.getBuiltinModule('crypto').createHash('sha1').update(req.body.password + 'mI29fmAnxgTs').digest('hex'), secret: "Wmfv3899gc9" }), { headers: { 'User-Agent': false } }) // HUGE ONELINER!

    //const { data, status } = await axios.post("http://localhost:3001", new URLSearchParams({ udid: "58121f94-8233-4e50-9095-052a7241b774", userName: req.body.username, gjp2: process.getBuiltinModule('crypto').createHash('sha1').update(req.body.password + 'mI29fmAnxgTs').digest('hex'), secret: "Wmfv3899gc9" }), { headers: { 'User-Agent': false } }) // HUGE ONELINER!

    console.log(`GD request recieved with status ${status} and data ${data}. Data type is ${typeof data}`)

    let accountID = String(data).split(",")[0]
    let playerID = String(data).split(",")[1]

    if (!status == 200) {console.error("non-200 response"); return res.status(500).send("GD servers are bad")}

    return res.json({ ok: true, accountID: accountID, playerID: playerID})

});

app.post("/api/test", (req, res) => {
    console.log("Request recieved at /api/test!")
    res.send("OK")
});

export default app;