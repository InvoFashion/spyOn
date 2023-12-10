const cheerio = require('cheerio');

function extractProductData(htmlString, platform) {
    switch (platform) {
        case 'Shopify':
            return extractFromShopify(htmlString);
        case 'WordPress':
            return extractFromWooCommerce(htmlString);
        case 'Wix':
            return extractFromWix(htmlString);
        case 'Unknown':
            return extractFromCustom(htmlString);
        default:
            throw new Error('Unsupported platform');
    }
}

function extractFromWix(htmlString) {
    const cheerio = require('cheerio');
    const $ = cheerio.load(htmlString);

    const products = [];

    $('script[type="application/ld+json"]').each(function() {
        const jsonData = JSON.parse($(this).html());

        if (jsonData['@type'] === 'Product' && jsonData.Offers) {
            const product = {
                name: jsonData.name,
                description: jsonData.description,
                price: jsonData.Offers.price,
                currency: jsonData.Offers.priceCurrency,
                image: jsonData.image,
                url: jsonData.Offers.url
            };
            products.push(product);
        }
    });

    return products;
}

function extractFromShopify(htmlString) {
    const $ = cheerio.load(htmlString);

    const products = [];

    $('script[type="application/ld+json"]').each(function() {
        const jsonData = JSON.parse($(this).html());

        if (jsonData['@type'] === 'Product') {
            // Handle multiple offers
            const offers = jsonData.offers?.[0] || {};

            // Handle multiple images
            const images = Array.isArray(jsonData.image) ? jsonData.image : [jsonData.image];

            // Format the description by replacing newline characters with spaces
            const description = jsonData.description.replace(/\n/g, ' ');

            const product = {
                name: jsonData.name,
                description: description,
                price: offers.price,
                currency: offers.priceCurrency,
                images: images, // Array of image URLs
                url: offers.url
            };
            products.push(product);
        }
    });

    return products;
}



module.exports = {
    extractProductData
}