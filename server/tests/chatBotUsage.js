
// Returns exists/not exists, if exists - returns the chatbot's name
function identifyChatbot(html, platform) {
    let chatbotInfo = { exists: false, name: null };

    // Common chatbot patterns
    const commonPatterns = {
        'Zendesk Chat': /static\.zdassets\.com/i,
        'Intercom': /widget\.intercom\.io/i,
        'Drift': /js\.driftt\.com\/include/i,
        // Add more common chatbot service patterns here
    };

    // Platform specific patterns
    const platformPatterns = {
        'WordPress': {
            'Botsonic': /botsonic\.com/i,
            'Tidio': /tidiochat\.com/i,
            'HubSpot Chatbot Builder': /hubspot\.com/i,
            // More WordPress chatbots
        },
        'Shopify': {
            'Zendesk Chat': /static\.zdassets\.com/i,
            'Engati': /engati\.com/i,
            'Tidio': /tidio-chat\.com/i,
            'Channel Talk': /channel\.io/i,
            // More Shopify chatbots
        },
        'Wix': {
            'Tidio': /tidiochat\.com/i,
            'ChatBob': /chatbob\.co/i,
            // More Wix chatbots
        },
        'Unknown': {
            // Add generic patterns for sites where the platform is unknown
        }
    };

    // Check common patterns first
    for (const [name, pattern] of Object.entries(commonPatterns)) {
        if (pattern.test(html)) {
            return { exists: true, name };
        }
    }

    // Check for platform-specific patterns
    if (platform in platformPatterns) {
        for (const [name, pattern] of Object.entries(platformPatterns[platform])) {
            if (pattern.test(html)) {
                return { exists: true, name };
            }
        }
    }

    return chatbotInfo;
}


module.exports = {
    identifyChatbot
}
