const express = require('express');
const exerciseController = require("../controllers/exercice");
const userContorller = require("../controllers/user");

const router = express.Router();

// api/exercise/new-user => POST
router.post('/new-user', userContorller.store);

// api/exercise/users => GET
router.get('/users', userContorller.index);

// api/exercise/add => POST
router.post('/add', exerciseController.store);

// /api/exercise/log?{userId}[&from][&to][&limit] => GET
router.get('/log', exerciseController.search);

module.exports = router;