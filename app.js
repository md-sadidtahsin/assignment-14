const express = require('express');
const app = express();
const usersRouter = require('./routes/users');

app.use(express.json());
app.use('/users', usersRouter);

// ❌ Bug: Hardcoded secret (bad practice)
const SECRET_KEY = "12345-plaintext-secret"; 

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




app.listen(3000, () => console.log("Server running on port 3000"));
