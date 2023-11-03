const cheerio = require('cheerio');

async function fetcImagesFromHTML(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const htmlText = await response.text();
            const $ = cheerio.load(htmlText);  // Load HTML text into Cheerio
            
            // Now you can use Cheerio to extract data
            const imageUrls = $('img').map((i, el) => $(el).attr('src')).get();
            //console.log(imageUrls);  // Log image URLs to the console

            // Download and analasys image

            async function downloadImage(url) {
                const response = await fetch(url);
                const blob = await response.blob();
                return URL.createObjectURL(blob);
            }

            const imageBlobs = await Promise.all(imageUrls.map(url => downloadImage(url)));

            async function analyzeImage(imageBlob) {
                const formData = new FormData();
                formData.append('image', imageBlob);
                
                const response = await fetch('https://api.imageanalyzer.com/analyze', {
                    method: 'POST',
                    body: formData,
                });
                
                const analysisResult = await response.json();
                return analysisResult;
            }

            const analysisResults = await Promise.all(imageBlobs.map(blob => analyzeImage(blob)));

            console.log(analysisResults);



        } else {
            console.error('Failed to fetch the HTML content:', response.statusText);
        }
    } catch (error) {
        console.error('An error occurred while fetching the HTML content:', error);
    }
}

// Function to fetch the HTML content of a specified URL
async function fetchHTML(url) {
    if( !url.includes('https://') ) {
        url = `https://${url}`;
    }
    try {
        // Send a GET request to the specified URL
        const response = await fetch(url);
        
        // Check if the request was successful
        if (response.ok) {
            // Parse the response as text
            const htmlText = await response.text();
            
            // Log the HTML text to the console (for debugging purposes)
            //console.log(htmlText);
            
            // TODO: Analyze the HTML text with your AI
            // ...
            return htmlText;
        } else {
            console.error('Failed to fetch the HTML content:', response.statusText);
        }
    
    } catch (error) {
        console.error('An error occurred while fetching the HTML content:', error);
    }
}

// Example usage: Fetch the HTML content of invofashion.com
//fetchHTML('https://invofashion.com');


module.exports = {
    fetchHTML
}



// Example usage
//fetcImagesFromHTML('https://invofashion.com');





