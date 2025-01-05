const express = require('express');
const { addPrompt } = require('../controllers/promptController');
const router = express.Router();
const generateHTML = require('../chatgpt'); 
// Route to add a new prompt
router.post('/add-prompt', addPrompt);

router.post('/generate-html', async (req, res) => {
  const { prompt } = req.body;  // Get the user-provided prompt

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required.' });
  }

  try {
    const generatedCode = await generateHTML(prompt);  // Call the generator function
    
    // Send the response with proper status code and JSON format
    res.status(200).json({
      success: true,
      data: {
        html: generatedCode.html,
        css: generatedCode.css
      }
    });
    
  } catch (error) {
    console.error('Error generating HTML:', error);
    res.status(500).json({ 
      success: false,
      error: error.message || 'Failed to generate HTML/CSS' 
    });
  }
});



module.exports = router;
