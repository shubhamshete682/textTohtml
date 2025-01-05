const axios = require('axios');
require('dotenv').config();


const generateHTML = async (prompt) => {
  try {
    console.log("Starting prompt generation...");

    const base_prompt = `
      You are a master prompter for an AI HTML/CSS Generator specialized in HTML component generation. 
      Respond with only the HTML and CSS code needed for the component, formatted as follows: 
      HTML: <your_html_code_here> 
      CSS: <your_css_code_here>
    `;

    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBIMq73PTEXN1oP1cdWVpt_x9Ytv40LIDw",
      {
        contents: [{
          parts:[{text: `${base_prompt}\n${prompt}`}]
        }]

      },
      {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );
    console.log("end prompt generation...", response.data.candidates[0].content.parts[0]);
    const result = response.data.candidates[0].content.parts[0].text;

    // Parse HTML and CSS from the response
    const htmlMatch = result.match(/HTML:\s*([\s\S]*?)(?=CSS:|$)/i);
    const cssMatch = result.match(/CSS:\s*([\s\S]*)/i);

    // Extract, clean up the matches, and remove leading and trailing backticks
    const html = htmlMatch ? htmlMatch[1].trim().replace(/^`+|`+$/g, "") : "";
    const css = cssMatch ? cssMatch[1].trim().replace(/^`+|`+$/g, "") : "";

    return {
      html,
      css,
      raw: result // Include raw response for debugging
    };
  } catch (e) {
    console.error("Error generating prompt:", e);
    throw new Error("Failed to generate meta prompt");
  }
};

module.exports = generateHTML;
