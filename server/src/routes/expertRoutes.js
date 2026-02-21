const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { getExperts, getExpertById } = require('../controllers/expertController-demo');

router.get('/', getExperts);

router.get('/:id', getExpertById);

module.exports = router;
