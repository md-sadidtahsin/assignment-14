const express = require('express');
const jwt = require("jsonwebtoken");
const app = express();

app.disable("x-powered-by");
const usersRouter = require('./routes/users');

app.use(express.json());
app.use('/users', usersRouter);

// ❌ Bug: Hardcoded secret (bad practice)
// const SECRET_KEY = "12345-plaintext-secret"; 
const SECRET_KEY = process.env.SECRET_KEY;

app.get('/', (req, res) => {
  res.send("Hello World");
});

// ❌ Vulnerability: Using eval (dangerous)
// app.get('/eval', (req, res) => {
//   const code = req.query.code;
//   res.send(eval(code)); // Sonar will flag this
// });

//corrected code without eval test
app.get('/eval', (req, res) => {
  const code = req.query.code;
    // Simple sandboxed evaluation (for demonstration only, not secure)
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





app.listen(3000, () => console.log("Server running on port 3000"));
