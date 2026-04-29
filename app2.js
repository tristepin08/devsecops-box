const express = require("express");
const app = express();

app.get("/user", (req, res) => {
  const username = req.query.username;

  const query = `SELECT * FROM users WHERE username = '${username}'`;

  db.query(query, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});
