// modules

import express from "express"
import axios from "axios"

// setup Express

const app = express();

app.use(express.json);

app.post("/api/login", async (req, res) => {
    const { data, status } = await axios.post("https://boomlings.com/database/accounts/loginGJAccount.php", new URLSearchParams({ udid: "58121f94-8233-4e50-9095-052a7241b774", userName: req.body.username, gjp2: require('crypto').createHash('sha1').update(req.body.password + 'mI29fmAnxgTs').digest('hex'), secret: "Wmfv3899gc9" })) // HUGE ONELINER!

    try {data = data.split(",")} catch {res.status(500).send("GD servers are bad")}

    if (!status == 200) {res.status(500).send("GD servers are bad")}

    res.json({ ok: true, accountID: data[0], playerID: data[1]})

});

export default app