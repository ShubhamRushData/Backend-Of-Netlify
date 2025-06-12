const express = require('express');
const router = express.Router();
const NumberData = require('../models/NumberData');

// POST: Push a number
router.post('/add', async (req, res) => {
  try {
    const { number } = req.body;
    const newNumber = new NumberData({ number });
    await newNumber.save();
    res.status(201).json({ message: 'Number saved successfully', data: newNumber });
  } catch (error) {
    res.status(500).json({ message: 'Error saving number', error });
  }
});

// GET: Get all numbers
router.get('/all', async (req, res) => {
  try {
    const numbers = await NumberData.find().sort({ createdAt: -1 });
    res.status(200).json(numbers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching numbers', error });
  }
});


// DELETE: Remove a number by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedNumber = await NumberData.findByIdAndDelete(req.params.id);
    if (!deletedNumber) {
      return res.status(404).json({ message: 'Number not found' });
    }
    res.status(200).json({ message: 'Number deleted successfully', data: deletedNumber });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting number', error });
  }
});

module.exports = router;
