const express = require("express");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");
const path = require("path");
const PORT = process.env.PORT || 3000;
const app = require("./index");

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Hardware Complaint Management System API",
    endpoints: {
      user: "/user",
      admin: "/admin",
      health: "/health"
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`Admin login: http://localhost:${PORT}/admin/login`);
});

