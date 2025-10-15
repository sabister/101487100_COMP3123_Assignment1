const express = require("express")
const Employee = require("../model/emp")
const router = express.Router()

// get employees
router.get("/employees", async (req, res) => {
  try {
    const emps = await Employee.find()
    res.json(emps)
  } 
  catch (err) {
    console.error(err)
    res.status(500).json({ message: "server error" })
  }
})

// get employee by ID
router.get("/employees/:id", async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id)
    if (!emp) return res.status(404).json({ message: "employee not found" })
    res.json(emp)
  } 
  catch (err) {
    console.error(err)
    res.status(500).json({ message: "server error" })
  }
})

// post/create employee
router.post("/employees", async (req, res) => {
  try {
    const emp = new Employee(req.body)
    await emp.save()
    res.status(201).json({ message: "employee created/added", id: emp._id })
  } 
  catch (err) {
    console.error(err)
    res.status(500).json({ message: "server error" })
  }
})

// put/update employee
router.put("/employees/:id", async (req, res) => {
  try {
    const emp = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!emp) return res.status(404).json({ message: "employee not found" })
    res.json({ message: "employee info updated" })
  } 
  catch (err) {
    console.error(err)
    res.status(500).json({ message: "server error" })
  }
})

// delete employee
router.delete("/employees/:id", async (req, res) => {
  try {
    const emp = await Employee.findByIdAndDelete(req.params.id)
    if (!emp) return res.status(404).json({ message: "employee not found" })
    res.json({ message: "employee is now deleted" })
  } 
  catch (err) {
    console.error(err)
    res.status(500).json({ message: "server error" })
  }
})

module.exports = router

