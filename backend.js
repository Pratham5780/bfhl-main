const express = require("express");
const app = express();

app.use(express.json());

const USER_ID = "john_doe_17091999"; // Update with your actual user ID
const EMAIL = "john@xyz.com"; // Update with your actual email
const ROLL_NUMBER = "ABCD123"; // Update with your actual roll number

// GET /bfhl endpoint
app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// POST /bfhl endpoint
app.post("/bfhl", (req, res) => {
  const data = req.body.data || [];
  const numbers = [];
  const alphabets = [];
  let highest_lowercase_alphabet = "";

  for (const item of data) {
    if (!isNaN(item)) {
      numbers.push(item);
    } else if (item.length === 1 && isNaN(item)) {
      alphabets.push(item);
      if (item === item.toLowerCase() && item > highest_lowercase_alphabet) {
        highest_lowercase_alphabet = item;
      }
    }
  }

  res.json({
    is_success: true,
    user_id: USER_ID,
    email: EMAIL,
    roll_number: ROLL_NUMBER,
    numbers: numbers,
    alphabets: alphabets,
    highest_lowercase_alphabet: highest_lowercase_alphabet ? [highest_lowercase_alphabet] : [],
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
