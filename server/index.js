const express = require("express");
require('dotenv').config()

const PORT = process.env.port || 3001;

const app = express();

const authOptions = {
    method: 'POST',
    body: `grant_type=client_credentials&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}

fetch(process.env.AUTH_URL, authOptions)
    .then((res) => res.json())
    .then(data => console.log(data.access_token))

app.post("/spotify", (req, res) => {

})

app.get("/api", (req, res) => {
    res.json({
        message: "Success"
    });
    console.log(req.route.path)
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})

