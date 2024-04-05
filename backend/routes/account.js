const express = require('express');
const Account = require('../models/account.model');
const authMiddleware = require('../middlewares/authMiddleware');
const mongoose = require('mongoose');

const router = express.Router()

router.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    })

    res.json({
        balance: account.balance
    })
})

router.post("/transfer", authMiddleware, async(req, res) => {
    
    //implementing session for transaction

    const session = await mongoose.startSession();

    // starting transaction
    session.startTransaction();

    const account = await Account.findOne({
        userId: req.userId
    }).session(session)
    
    const {to, amount} = req.body;
   
    if(!account || account.balance < amount){
        await session.abortTransaction();
        
        return res.status(400).json({
            message: "Insufficient balance"
        })
    }

    const toAccount = await Account.findOne({ userId: to }).session(session)
    
    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "User doesn't exist"
        })
    }

    //implementing transfer

    await Account.updateOne({ userId: req.userId }, {
        $inc: { balance: -amount}
    }).session(session)
    await Account.updateOne({ userId: to }, {
        $inc: { balance: amount}
    }).session(session)

    await session.commitTransaction();

    res.json({
        message: "Transfer successful"
    })
})

module.exports = router;