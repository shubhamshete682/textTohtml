const Prompt = require('../models/promptModel');

// Function to add a new prompt
const addPrompt = async (req, res) => {
  try {
    const { type, prompt } = req.body;

    // Validate the input
    if (!type || !prompt) {
      return res.status(400).json({ error: 'Type and prompt are required' });
    }

    // Create and save the new prompt
    const newPrompt = new Prompt({ type, prompt });
    await newPrompt.save();

    res.status(201).json({
      message: 'Prompt added successfully!',
      prompt: newPrompt,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { addPrompt };
