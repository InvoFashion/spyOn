const gpt = require('./chat-gpt');
const { fetchHTML, extractCSSUrls, fetchCSSFiles } = require('./website');
const fs = require('fs');
const cheerio = require('cheerio');
const prompt = require("prompt-sync")({ sigint: true });
const { spellCheck } = require('./tests/spell-check');
const { getPageSpeed, findTagsWithoutAlt } = require('./tests/speed-test')
const { identifyPlatform } = require('./tests/platform');
const { identifyChatbot } = require('./tests/chatBotUsage');
const { extractProductData } = require('./tests/products');
const { analyzeWebsite } = require('./tests/analyzeDesign');
const { fetchPageTitles, getInsightsForTitles } = require('./tests/mia');
const { extractTagsFromHTML } = require('./functions');



async function getWebsiteData(url) {
    let html;
    let htmlTags = {}

    try {
        //html = await fetchHTML(url);
        // const cssUrls = extractCSSUrls(html);
        // const cssFiles = await fetchCSSFiles(cssUrls);
        // console.log('Type of cssFiles:', typeof cssFiles);
        // console.log('Content of cssFiles:', cssFiles);

        //const data = await analyzeWebsite(url);

       // console.log('Analyzed Data:', data);
       //const data = await fetchPageTitles(url);
       //getInsightsForTitles(url);


        // const path = __dirname + "cssData.txt";
        // //const data = 'Ayo lets do it already';
        // const newData = JSON.stringify(data);

        // fs.writeFile(path, newData, (err) => { 
        //     if (err) 
        //       console.log(err); 
        //     else { 
        //       console.log("File written successfully"); 
        //     } 
        // }); 



        const $ = cheerio.load(html);
        htmlTags = extractTagsFromHTML($, htmlTags);
    
    
        //Send data to a spell check
        spellCheck(htmlTags);
    
        // Get PageSpeed
        //getPageSpeed(url);
    
        // Checks the website's platform (Wix, Shopify etc...)
        // const platform = await identifyPlatform(html);
        // console.log(platform);

        // const tags = await findTagsWithoutAlt(html);
        // console.log(tags);

        // const product = extractProductData(html, platform);
        // console.log(product);

        // console.log('Images');
        // console.log(product[0].image);

    
        // Checks for the existance of a ChatBot
        // const chatbot = await identifyChatbot(html, platform);
        // console.log(chatbot);
    
    
    
        return htmlTags;

    } catch (e) {
        console.error(`Failed to extract data from ${url}, ${e}`);
        return
    }
    
}



// getWebsiteData().then();

module.exports = {
    getWebsiteData
}

