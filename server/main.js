const gpt = require('./chat-gpt');
const { fetchHTML } = require('./website');
const fs = require('fs');
const cheerio = require('cheerio');
const prompt = require("prompt-sync")({ sigint: true });

//const url = prompt('enter your websites url: ');

function extractTagsFromHTML($, htmlTags) {

    const headings = $('h1, h2, h3, h4, h5, h6').map((i, el) => $(el).text()).get();
    const paragraphs = $('p').map((i, el) => $(el).text()).get();
    

    htmlTags.headings = headings;
    htmlTags.paragraphs = paragraphs;
}

async function getWebsiteData(url) {
    let htmlText;
    const htmlTags = {}

    try {

        htmlText = await fetchHTML(url);

    } catch (e) {
        console.error(`Failed to extract data from ${url}`);
    }

    const $ = cheerio.load(htmlText);
    extractTagsFromHTML($, htmlTags);
    // console.log(htmlTags.headings);
    return htmlTags;
    
}

// getWebsiteData().then();

module.exports = {
    getWebsiteData
}

