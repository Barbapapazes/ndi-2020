const express = require('express');
const authMiddleWare = require('../middlewares/auth');

const router = express.Router();

const coreCtrl = require('../controllers/core');
const auth = require('../middlewares/auth');

router.get('/sessions', auth, coreCtrl.get_sessions);