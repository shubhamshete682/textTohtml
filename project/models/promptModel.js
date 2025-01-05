const mongoose = require('mongoose');

const promptSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,  // Ensures the 'type' field is mandatory
  },
  prompt: {
    type: String,
    required: true,  // Ensures the 'prompt' field is mandatory
  },
}, {
  timestamps: true,  // Automatically adds createdAt and updatedAt fields
});

const Prompt = mongoose.model('Prompt', promptSchema);

module.exports = Prompt;
