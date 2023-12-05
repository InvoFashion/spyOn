const axios = require('axios');
const { aggregateTextForSpellCheck, extractAndCleanEnglishText } = require('./js/testsFunctions');


const apiKey = process.env.BING_API_KEY;
const endpoint = 'https://api.bing.microsoft.com/v7.0/spellcheck'; // Replace with the correct endpoint URL

function spellCheck(htmlTags) {

    // Convert data to string 
    let textToCheck = aggregateTextForSpellCheck(htmlTags);


    let excludeWordArray = excludeWords(htmlTags);
    let englishParts = extractAndCleanEnglishText(textToCheck, excludeWordArray);
    console.log('-------------');
    console.log(englishParts);
    console.log('-------------');
    //Send data via API request
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Ocp-Apim-Subscription-Key': apiKey
    };
    
    const params = {
        'mkt': 'en-us',
        'mode': 'proof' // Choose 'proof' for most thorough check
    };
    
    const data = new URLSearchParams({
        'text': `${englishParts}` // Replace with the text you want to check
    });
    
    axios.post(endpoint, data.toString(), { headers, params })
        .then(response => {
            console.log(JSON.stringify(response.data)); // The response from the API
            // Pass it back to output it
        })
        .catch(error => {
            console.error('Error:', error);

        });
}

module.exports = {
    spellCheck
}
