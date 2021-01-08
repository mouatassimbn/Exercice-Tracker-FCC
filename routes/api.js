const express = require('express');
const exerciseController = require("../controllers/exercice");
const userContorller = require("../controllers/user");

const router = express.Router();

// api/exercise/new-user => POST
router.post('/new-user', userContorller);

// api/exercise/add => POST
router.post('/add', exerciseController);

module.exports = router;