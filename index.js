const express = require("express");
const user = require("./MOCK_DATA.json");
const app = express();
const PORT = 8000;
const fs = require("fs");

app.use(express.urlencoded({extended: false}));

app.route("/api/user/:first_name")
  // .get(
  //   (req,res) => {
  //     const id = Number(req.params.id);
  //     console.log("Working fine");
  //     const users = user.find((users) => users.id === id);
  //     return res.json(users);
  //   })
  .get(
    (req,res) => {
      const name = (req.params.first_name);
      console.log("Working fine GET");
      const users = user.find((users) => users.first_name === name);
      console.log("get: ", users);
      return res.json(users);
    })
  .post((req,res) => {
    const body = req.body;
    console.log("Working fine POST")
    console.log("body",body);
    return res.json({status: "pending"});
  })
  .patch((req,res) => {});


  app.delete("/api/user/:id",(req,res) => {
    console.log("working fine DELETE");
    const id = (req.params.id);
    const userd = user.find((userd) => userd.id === id);
    console.log("Deleted User : ", userd);
    user.pop(userd);
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(user),(err,data) => {
      return res.json({status: "Completed deletion."});
    });

  });

app.post("/api/user",(req,res) => {
  console.log("Working fine yo");
  const body = req.body;
  user.push({id: user.length + 1, ...body});
  console.log("Body", body);
  fs.writeFile("./MOCK_DATA.json",JSON.stringify(user),(err,data) => {
    return res.json({status: "Completed the Posting."});
  });
});


app.get("/api/user",(req, res) => {
  return res.json(user);
});

app.get("/user", (req, res) => {
  const html = `
    <ul>
        ${user.map(user => `<li>${user.first_name}</li>`).join("")}
    </ul>`;
    res.send(html);
})

app.listen(PORT, () => console.log((`Server started at home`)));