const express = require("express");

const PORT = process.env.port || 3001;

const app = express();

app.get("/api", (req, res) => {
    res.json({ message: "Success" });
    console.log(req.route.path)
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})

