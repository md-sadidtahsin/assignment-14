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
app.get('/eval', (req, res) => {
  const code = req.query.code;
  res.send(eval(code)); // Sonar will flag this
});

app.listen(3000, () => console.log("Server running on port 3000"));
