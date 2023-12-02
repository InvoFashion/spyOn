const gpt = require('./chat-gpt');
const { fetchHTML } = require('./website');
const fs = require('fs');
const cheerio = require('cheerio');
const prompt = require("prompt-sync")({ sigint: true });
const { spellCheck } = require('./tests/spell-check');
const { getPageSpeed } = require('./tests/speed-test')
const { extractTagsFromHTML } = require('./functions');



async function getWebsiteData(url) {
    let htmlText;
    let htmlTags = {}

    try {

        htmlText = await fetchHTML(url);

    } catch (e) {
        console.error(`Failed to extract data from ${url}`);
    }

    const $ = cheerio.load(htmlText);
    htmlTags = extractTagsFromHTML($, htmlTags);

    // Send data to a spell check
    spellCheck(htmlTags);

    // Get PageSpeed
    //getPageSpeed(url);

    //spellCheck();
    return htmlTags;
    
}



// getWebsiteData().then();

module.exports = {
    getWebsiteData
}

