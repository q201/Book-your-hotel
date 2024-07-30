const express = require('express');
const { signup, signin, UserProfile, signoutt } = require('../controllers/client.auth');
const { requireSignIn, clientMiddleware }= require('../common_middlewares/index')
const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/client/sign-out', signoutt); // Ensure this route does not use requireSignIn middleware
router.get('/user/:userId', requireSignIn, clientMiddleware, UserProfile);

module.exports = router;