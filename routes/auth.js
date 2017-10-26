'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('../config/serverConfig');
const jwt = require('jsonwebtoken');
const {authenticated, authenticatedJWT} = require('../middlewares/authcheck');
const Router = express.Router();
Router.use(bodyParser.json());
//deal with authentication and setting up session
Router.post('/login', authenticated, (req, res) => {
    let authToken = res.authToken;
    res.json({authToken});
});
//deal with refreshing the token when it has expired
Router.post('/refresh', authenticatedJWT, (req, res) => {
    let authToken = res.authToken;
    res.json({authToken});
});
module.exports = {Router};
