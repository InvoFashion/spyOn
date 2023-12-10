
    
function identifyPlatform(html) {
    // Patterns for Shopify
    const shopifyPatterns = [
        /shopify/i,
        /<meta[^>]*content="Shopify"[^>]*>/i,
        /<\!--.*Powered by Shopify.*-->/i
    ];

    // Patterns for WordPress
    const wordpressPatterns = [
        /<meta[^>]*content="WordPress[^>]*>/i,
        /wp-content|wp-includes|wp-uploads/i
    ];

    // Patterns for Wix
    const wixPatterns = [
        /static\.parastorage\.com/i,
        /wix\.com/i
    ];

    // Check Shopify patterns
    for (const pattern of shopifyPatterns) {
        if (pattern.test(html)) {
            return 'Shopify';
        }
    }

    // Check WordPress patterns
    for (const pattern of wordpressPatterns) {
        if (pattern.test(html)) {
            return 'WordPress';
        }
    }

    // Check Wix patterns
    for (const pattern of wixPatterns) {
        if (pattern.test(html)) {
            return 'Wix';
        }
    }

    return "Unknown";
}




module.exports = {
    identifyPlatform
}