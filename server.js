const express = require("express");
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

// Root endpoint - serve the frontend
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API info endpoint
app.get("/api", (req, res) => {
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

