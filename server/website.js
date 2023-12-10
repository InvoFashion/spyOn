const cheerio = require('cheerio');
const { JSDOM } = require('jsdom');
const fetch = require('node-fetch');

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
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = `https://${url}`;
    }
    try {
        const response = await fetch(url);
        if (response.ok) {
            const htmlText = await response.text();
            return htmlText;
        } else {
            throw new Error(`Failed to fetch HTML: ${response.statusText}`);
        }
    } catch (error) {
        throw new Error(`Error fetching HTML: ${error.message}`);
    }
}

// Function to extract CSS URLs from HTML
function extractCSSUrls(html) {
    try {
        const dom = new JSDOM(html);
        const links = [...dom.window.document.querySelectorAll('link[rel="stylesheet"]')];
        return links.map(link => link.href);
    } catch (error) {
        throw new Error(`Error extracting CSS URLs: ${error.message}`);
    }
}

// Function to fetch CSS files
async function fetchCSSFiles(urls) {
    try {
        const cssPromises = urls.map(async (url) => {
            try {
                const response = await fetch(url);
                if (response.ok) {
                    return await response.text();
                } else {
                    throw new Error(`Failed to fetch CSS: ${response.statusText}`);
                }
            } catch (error) {
                console.error(`Error fetching CSS file from ${url}: ${error.message}`);
                return ''; // Return empty string for failed fetches to avoid disrupting the array structure
            }
        });

        return Promise.all(cssPromises);
    } catch (error) {
        throw new Error(`Error fetching CSS files: ${error.message}`);
    }
}


// Example usage
// async function analyzeWebsite(url) {
//     const html = await fetchHTML(url);
//     const cssUrls = extractCSSUrls(html);
//     const cssFiles = await fetchCSSFiles(cssUrls);
//     console.log(cssFiles); // Here you'll have the content of each CSS file
// }




// Example usage: Fetch the HTML content of invofashion.com
//fetchHTML('https://invofashion.com');


module.exports = {
    fetchHTML,
    extractCSSUrls,
    fetchCSSFiles
}



// Example usage
//fetcImagesFromHTML('https://invofashion.com');





