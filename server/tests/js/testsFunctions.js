// Convert object of objects to string
function aggregateTextForSpellCheck(htmlTags) {
    let allText = '';
    allText += htmlTags.headings.join('\n');
    allText += htmlTags.paragraphs.join('\n');
    allText += htmlTags.articles.join('\n');
    // Add other elements like divs, spans, etc.
    return allText;
}

//  Extrac only english words from a text, and exculdes words from the excludeWords array
function extractAndCleanEnglishText(allText, excludeWords) {

    // Updated regex to exclude standalone punctuation and single letters
    const englishTextRegex = /(\b[A-Za-z0-9][A-Za-z0-9.,!?'"()\-;:]*\b)/g;
    let englishParts = allText.match(englishTextRegex);

    if (englishParts) {
        let cleanedText = englishParts.join(' ').split(/\s+/).join(' ').trim();

        // Revert placeholders back to the original words
        if(excludeWords.length > 0 ) {
            excludeWords.forEach(word => {
                word = word.toLowerCase();
                console.log(word);
                cleanedText = cleanedText.toLowerCase().replaceAll(word, 'replced');
            });
        }

        return cleanedText;
    } else {
        return '';
    }
}


function getPercentage(num1, num2) {
    return Math.round(num1/num2*100);
}



module.exports = {
    aggregateTextForSpellCheck,
    extractAndCleanEnglishText,
    getPercentage
}