const express = require("express");

const app = express();
const PORT = 8000;

app.get("/api/user",(req, res) => {
  return res.json(user);
});

app.listen(PORT, () => console.log((`Server started at home`)));