const express = require('express');
const router = express.Router();

let users = [];

router.post('/', (req, res) => {
  users.push(req.body); 
  res.status(201).send("User added");
});

const unusedVar = 42;

router.get('/', (req, res) => {
  res.json(users);
});

module.exports = router;
