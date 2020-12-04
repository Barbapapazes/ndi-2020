const express = require('express');
const authMiddleWare = require('../middlewares/auth');

const router = express.Router();

const authCtl = require('../controllers/auth');

// /auth/login to get a jwt
router.post('/login', authCtl.login);

// /auth/register to get registered
router.post('/register', authCtl.register);

//// /auth/forget_password to get a mail containing a link to a page set into the backend
router.post('/forget_password', authCtl.reset_pass);

// /auth/change_password with a valid token to change the user's password
router.get('/change_password/:token', authCtl.change_pass);

router.post('/password_changed/', authCtl.pass_changed);

module.exports = router;