const gpt = require('./chat-gpt');
const { fetchHTML } = require('./website');
const fs = require('fs');
const cheerio = require('cheerio');
const prompt = require("prompt-sync")({ sigint: true });
const { spellCheck } = require('./tests/spell-check');
const { getPageSpeed, findTagsWithoutAlt } = require('./tests/speed-test')
const { identifyPlatform } = require('./tests/platform');
const { identifyChatbot } = require('./tests/chatBotUsage');
const { extractTagsFromHTML } = require('./functions');




async function getWebsiteData(url) {
    let htmlText;
    let htmlTags = {}

    try {

        htmlText = await fetchHTML(url);

        const $ = cheerio.load(htmlText);
        htmlTags = extractTagsFromHTML($, htmlTags);
    
    
        // Send data to a spell check
        //spellCheck(htmlTags);
    
        // Get PageSpeed
        // const data = await getPageSpeed(url);
        // console.log(data);
    
        // Checks the website's platform (Wix, Shopify etc...)
        // const platform = await identifyPlatform(htmlText);
        // console.log(platform);

        const tags = await findTagsWithoutAlt(htmlText);
        console.log('--------- ALL TAGS ---------');
        console.log(tags);

    
        // Checks for the existance of a ChatBot
        // const chatbot = await identifyChatbot(htmlText, platform);
        // console.log(chatbot);
    
    
    
        return htmlTags;

    } catch (e) {
        console.error(`Failed to extract data from ${url}`);
        return
    }
    
}



// getWebsiteData().then();

module.exports = {
    getWebsiteData
}

