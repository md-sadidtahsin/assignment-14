const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello SonarQube!");
});

app.get("/sum", (req, res) => {
  const a = parseInt(req.query.a || 0);
  const b = parseInt(req.query.b || 0);
  res.json({ result: a + b });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;