const axios = require('axios');
const { aggregateTextForSpellCheck } = require('./functions');


const apiKey = process.env.BING_API_KEY; // Replace with your API key
const endpoint = 'https://api.bing.microsoft.com/v7.0/spellcheck'; // Replace with the correct endpoint URL

function spellCheck(htmlTags) {

    // Convert data to string 
    let textToCheck = aggregateTextForSpellCheck(htmlTags);
    console.log('-------------')
    console.log(textToCheck);
    console.log('-------------')
    // Send data via API request
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Ocp-Apim-Subscription-Key': apiKey
    };
    
    const params = {
        'mkt': 'en-us',
        'mode': 'proof' // Choose 'proof' for most thorough check
    };
    
    const data = new URLSearchParams({
        // 'text': `${textToCheck}` // Replace with the text you want to check
        'text': `${textToCheck}` // Replace with the text you want to check
    });
    
    axios.post(endpoint, data.toString(), { headers, params })
        .then(response => {
            console.log(JSON.stringify(response.data)); // The response from the API
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

module.exports = {
    spellCheck
}
