const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { hashPassword, verifyPassword, generateToken } = require("../utils");

const prisma = new PrismaClient();
const router = express.Router();

// Registration Route
router.post("/register", async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, role },
    });
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(400).json({ error: "User already exists!" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await verifyPassword(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials!" });
    }
    const token = generateToken(user);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
});

// Update Password Route
router.put("/update-password", async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await verifyPassword(oldPassword, user.password))) {
      return res.status(401).json({ error: "Invalid credentials!" });
    }
    const hashedPassword = await hashPassword(newPassword);
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });
    res.json({ message: "Password updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
});

// Update Role Route
router.put("/update-role", async (req, res) => {
  try {
    const { email, role } = req.body;
    await prisma.user.update({
      where: { email },
      data: { role },
    });
    res.json({ message: "Role updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
});

// Update Email Route
router.put("/update-email", async (req, res) => {
  try {
    const { oldEmail, newEmail } = req.body;
    await prisma.user.update({
      where: { email: oldEmail },
      data: { email: newEmail },
    });
    res.json({ message: "Email updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
});

// Delete User Route
router.delete("/delete", async (req, res) => {
  try {
    const { email } = req.body;
    await prisma.user.delete({ where: { email } });
    res.json({ message: "User deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
});

module.exports = router;
