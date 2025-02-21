const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

// Replace with your details
const USER_ID = "john_doe_17091999"; // Example: Replace with your fullname_ddmmyyyy
const COLLEGE_EMAIL = "john@xyz.com"; // Example: Replace with your college email
const ROLL_NUMBER = "ABCD123"; // Example: Replace with your roll number

// POST endpoint
app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body;
    if (!Array.isArray(data)) throw new Error("Data must be an array");

    const numbers = [];
    const alphabets = [];
    data.forEach((item) => {
      const strItem = String(item).trim();
      if (!isNaN(strItem)) numbers.push(strItem);
      else if (/^[A-Za-z]$/.test(strItem)) alphabets.push(strItem.toUpperCase());
    });

    let highestAlphabet = [];
    if (alphabets.length > 0) {
      highestAlphabet = [alphabets.sort((a, b) => b.localeCompare(a))[0]];
    }

    res.status(200).json({
      is_success: true,
      user_id: USER_ID,
      email: COLLEGE_EMAIL,
      roll_number: ROLL_NUMBER,
      numbers,
      alphabets,
      highest_alphabet: highestAlphabet,
    });
  } catch (error) {
    res.status(400).json({
      is_success: false,
      error: error.message,
    });
  }
});

// GET endpoint
app.get('/bfhl', (req, res) => {
  res.status(200).json({
    operation_code: 1,
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});