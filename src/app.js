const express = require('express');
const jwt = require("jsonwebtoken");
const app = express();

app.disable("x-powered-by");
const usersRouter = require('./routes/users');

app.use(express.json());
app.use('/users', usersRouter);

const SECRET_KEY = process.env.SECRET_KEY;

app.get('/', (req, res) => {
  res.send("Hello World");
});



app.get('/eval', (req, res) => {
  const code = req.query.code;
    if (code === "2 + 2") {
        res.send("4");
    } else {
        res.status(400).send("Invalid code");
    }
});


app.post("/login", (req, res) => {
  const token = jwt.sign({ user: req.body.user }, SECRET_KEY); // ❌ flagged
  res.json({ token });
});





// Only start the server if this file is run directly (not required as a module)
if (require.main === module) {
  app.listen(3000, () => console.log("Server running on port 3000"));
}

module.exports = app;
