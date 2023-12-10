const puppeteer = require('puppeteer');

async function analyzeWebsite(url) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    const data = await page.evaluate(() => {
        const tags = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
        const styleSummary = {};

        const styleProps = ['color', 'font-size', 'font-weight']; // Add more style properties as needed

        tags.forEach(tag => {
            const elements = Array.from(document.querySelectorAll(tag));
            styleSummary[tag] = elements.map(el => {
                const computedStyle = window.getComputedStyle(el);
                const styleInfo = {
                    text: el.innerText,
                    styles: styleProps.reduce((acc, prop) => {
                        acc[prop] = computedStyle.getPropertyValue(prop);
                        return acc;
                    }, {})
                };
                return styleInfo;
            });
        });

        return styleSummary;
    });

    await browser.close();
    return data;
}

// analyzeWebsite('https://www.example.com').then(data => {
//     console.log(data); // Process and analyze the data here
// });

module.exports = {
    analyzeWebsite
}
