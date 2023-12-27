const cheerio = require('cheerio');
const gpt = require('../chat-gpt');
const { getPercentage } = require('./js/testsFunctions');




// List of keywords to ignore during alt text analysis
const ignoreKeywords = ['Pinterest', 'YouTube', 'Facebook', 'Instagram', 'Twitter', 'Mail', 'LinkedIn', 'TikTok'];

// Helper function to analyze the performance of alt text
function analyzeAltPerformance(alt) {
  // Check if the alt text contains any of the ignore keywords
  if (ignoreKeywords.some(keyword => alt.toLowerCase().includes(keyword.toLowerCase()))) {
    return true; // Consider as valid alt if it contains ignore keywords
  }

  // Add more sophisticated checks here as per your requirements
  // For example, length check, relevance check, etc.

  // Simple length check (you can modify as needed)
  const wordCount = alt.trim().split(/\s+/).length;
  return wordCount >= 5 && wordCount <= 15;
}

// Function to create a prompt for ChatGPT
function createChatGPTPrompt(src, brandName = 'InvoFashion') {
    let prompt = `I need a concise alt text for an image taken from ${brandName}'s website.`;
    prompt += `The image source URL is '${src}'. `;
    prompt += `Please provide a single, descriptive alt text that is suitable for SEO and accessibility.`;
  
    return prompt;
}
  

// Main function to analyze alt text in HTML
async function analyzeAltText(htmlString) {
  const $ = cheerio.load(htmlString);
  const imgAndVideoTags = $('img, video');
  const tagsWithoutAlt = []; // Array to track no/empty alt tags
  const tagsWithPoorAlt = []; // Array to track poor alt tags
  const validAltTags = []; // Array to track valid alt tags
  let totalTagsCount = 0;

  for (const tag of imgAndVideoTags) {
    totalTagsCount++;
    const alt = $(tag).attr('alt');
    const src = $(tag).attr('src') || $(tag).attr('poster');

    if (typeof alt === 'undefined' || alt.trim() === '') {
      tagsWithoutAlt.push({ html: $.html(tag), src });
    } else if (!analyzeAltPerformance(alt)) {
      const prompt = createChatGPTPrompt(src);
      const chatGPTResponse = await gpt(prompt); // Get suggestion from ChatGPT
      const altSuggestion = chatGPTResponse.split('\n')[0].trim(); // Taking the first line or customize as needed
      tagsWithPoorAlt.push({ html: $.html(tag), src, alt, suggestion: altSuggestion });
    } else {
      validAltTags.push({ html: $.html(tag), src, alt });
    }
  }

  const tagsWithAlt = totalTagsCount - tagsWithoutAlt.length;
  const tagsPercentage = getPercentage(tagsWithAlt, totalTagsCount);

  const tagsInfo = {
    totalTags: totalTagsCount,
    tagsWithoutAltCount: tagsWithoutAlt.length,
    tagsWithPoorAltCount: tagsWithPoorAlt.length,
    tagsWithValidAlt: validAltTags.length,
    tagsPercentage: tagsPercentage
  }

  return {
    emptyTags: tagsWithoutAlt,
    poorAltTags: tagsWithPoorAlt,
    validAltTags: validAltTags, // Include valid alt tags in the return
    tagsInfo: tagsInfo
  };
}

module.exports = {
    analyzeAltText
};
