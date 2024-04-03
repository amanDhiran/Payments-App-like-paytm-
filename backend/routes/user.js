const express = require("express")
const z = require('zod')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

const { User } = require("../models/user.model");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

const signUpBody = z.object({
    username: z.string().email(),
    firstName: z.string().min(3),
    password: z.string().min(8),
    lastName: z.string(),
}) 

const signInBody = z.object({
  username: z.string().email(),
  password: z.string().min(8),
})

const updateBody = z.object({
  password: z.string().optional,
  firstName: z.string().optional,
  lastName: z.string().optional
})


router.post("/signup", async(req, res) => {
  const parsedBody = signUpBody.safeParse(req.body);
  if (!parsedBody.success) {
    return res.status(411).json({
      msg: "Email already taken/ Incorrect inputs",
    });
  }
  const existingUser = await User.findOne({
    username: req.body.username,
  });
  if (existingUser) {
    return res.status(411).json({
      msg: "Email already taken",
    });
  }
  
    const user = await User.create({
        username: req.body.username,
        firstName: req.body.firstName,
        password: req.body.password,
        lastName: req.body.lastName
    })
    const userId = user._id
    const token = jwt.sign({userId}, process.env.JWT_SECRET)

    res.json({
        message: "user created successfully",
        token: token
    })
});

router.post("/signin", async (req, res) => {
  const parsedBody = signInBody.safeParse(req.body);
  if (!parsedBody.success) {
    return res.status(411).json({
      msg: "Invalid username or password",
    });
  }
  const existingUser = await User.findOne({
    username: req.body.username,
    password: req.body.password
  });
  if (!existingUser) {
    return res.status(411).json({
      msg: "User does not exist",
    });
  }
  const userId = existingUser._id
    const token = jwt.sign({userId}, process.env.JWT_SECRET)

    res.json({
        token: token
    })
})

router.put("/", authMiddleware, async (req, res) => {
  const parsedBody = updateBody.safeParse(req.body)
  if(!parsedBody.success){
    return res.status(411).json({
      message: "Invalid Inputs"
    })
  }

  await User.findOneAndUpdate({_id: req.userId}, req.body)
})

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [{
      firstName: {
        $regex: filter 
      },
      lastName: {
        $regex: filter
      }
    }]
  })
  
})

module.exports = router;