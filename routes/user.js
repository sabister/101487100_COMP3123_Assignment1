const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const User = require("../model/user")
const router = express.Router()


//signup/post user
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body
    if (!username || !email || !password)
      return res.status(400).json({ message: "all info required" })

    const exist = await User.findOne({ $or: [{ email }, { username }] })
    if (exist) return res.status(400).json({ message: "user already exists" })

    const hashed = await bcrypt.hash(password, 10)
    const newUser = new User({ username, email, password: hashed })
    await newUser.save()

    res.status(201).json({ message: "new user created", userId: newUser._id })
  } 
  catch (err) {
    console.error(err)
    res.status(500).json({ message: "server error" })
  }
})

// login/post User
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: "invalid email info" })

    const compareInfo = await bcrypt.compare(password, user.password)
    if (!compareInfo) return res.status(400).json({ message: "invalid password info" })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "secret", { expiresIn: "1h" })
    res.json({ message: "login successful", token })
  } 
  catch (err) {
    console.error(err)
    res.status(500).json({ message: "server error" })
  }
})

module.exports = router

