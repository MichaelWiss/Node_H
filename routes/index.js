const express = require('express');
const router = express.Router();

// Do work here
router.get('/', (req, res) => {
  // res.send('Hey! It works!');
  // res.json(Michael);
  // res.send(req.query.name);
  // res.json(req.query);
  res.render();
});

router.get('/reverse/:name', (req, res) => {
	const reverse = [...req.params.name].reverse().
	  join('');
    res.send(reverse);
});

module.exports = router;
