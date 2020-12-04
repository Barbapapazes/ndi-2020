const express = require('express');

const router = express.Router();

const coreCtrl = require('../controllers/core');

const auth = require('../middlewares/auth');

router.get('/sessions', auth, coreCtrl.get_sessions);

router.post('/session', auth, coreCtrl.add_session);

router.get('/weather', coreCtrl.get_weather);

router.get('/spot/:spotid', coreCtrl.get_spot);

router.post('/spot', auth, coreCtrl.add_spot);

router.post('/declare', auth, coreCtrl.declare);

router.patch('/declare/:id', auth, coreCtrl.update_declare);

module.exports = router;