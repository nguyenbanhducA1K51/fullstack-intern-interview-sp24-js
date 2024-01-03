const express = require("express");
const path = require("path");
const app = express();

/**
 * This array will represent your database.
 * @type {Array<{name: string, email: string, age: number}>}
 */
const data = [];

app.use(express.static(path.join(__dirname, "../client")));

// HINT: body-parser needed?

app.get("/api/users", (req, res) => {
  // Placeholder for your database logic
  // Ideally, you would interact with your database here and then send the data.
  // For now, sending a placeholder response
  res.json([
    { name: "John Doe", email: "john@gmail.com", age: 49 },
    // ...more users
  ]);
});

app.post("/api/register", (req, res) => {
  // Extract user data from request body
  const { name, email, age } = req.body;

  // Placeholder for database logic
  // You would typically add logic here to insert the new user into your database.

  // Send a response back to the client
  res.status(201).json({
    message: "User registered successfully",
    user: { name, email, age },
  });
});

app.listen(3000, () => console.log("Server running on port 3000"));
