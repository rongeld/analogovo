const express = require("express");

const app = express();

app.get("/", (req, res) => res.send("Hello!"));

const port = process.env.PORT || 5000; // because of heroccu deploy

app.listen(port, () => console.log(`Server running on port ${port}`));