const puppeteer = require('puppeteer');
const openFun = require('../chat-gpt');


async function fetchPageTitles(url) {
    // Launching the Puppeteer browser
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    // Navigating to the provided URL
    await page.goto(url);

    // Extracting titles from the page
    const titles = await page.evaluate(() => {
        const titleElements = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
        return titleElements.map(elem => elem.innerText.trim());
    });

    // Closing the browser
    await browser.close();

    return titles;
}

async function getInsightsForTitles(url) {
    const titles = await fetchPageTitles(url);
    
    for (const title of titles) {
        const insight = await openFun(`Please provide insights or suggestions for improvement on this website title: "${title}"`);
        console.log(`Title: ${title}\nInsight: ${insight}\n`);
    }
}



// Example usage
// const url = 'https://example.com'; // Replace with the desired URL
// fetchPageTitles(url)
//     .then(titles => console.log('Page Titles:', titles))
//     .catch(error => console.error('Error:', error));

module.exports = {
    fetchPageTitles,
    getInsightsForTitles
}