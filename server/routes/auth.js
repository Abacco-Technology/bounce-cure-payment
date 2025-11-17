const express = require("express");
const router = express.Router();

// Fake admin login – simple & matches payment middleware
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Change this to your preferred login check
  if (email === "admin@admin.com" && password === "admin123") {
    return res.json({ token: "admin-token" });
  }

  return res.status(401).json({ message: "Invalid credentials" });
});

module.exports = router;
