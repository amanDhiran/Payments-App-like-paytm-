const express = require('express');
const Account = require('../models/account.model');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router()

router.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    })
})

module.exports = router;