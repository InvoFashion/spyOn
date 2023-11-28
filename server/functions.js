
function aggregateTextForSpellCheck(htmlTags) {
    let allText = '';
    allText += htmlTags.headings.join('\n');
    allText += htmlTags.paragraphs.join('\n');
    // Add other elements like divs, spans, etc.
    return allText;
}


function extractTagsFromHTML($, htmlTags) {

    const headings = $('h1, h2, h3, h4, h5, h6').map((i, el) => $(el).text()).get();
    const paragraphs = $('p').map((i, el) => $(el).text()).get();
    const divs = $('div').map((i, el) => $(el).text()).get();
    const spans = $('span').map((i, el) => $(el).text()).get();
    const articles = $('article').map((i, el) => $(el).text()).get();
    const sections = $('section').map((i, el) => $(el).text()).get();
    const footers = $('footer').map((i, el) => $(el).text()).get();
    const headers = $('header').map((i, el) => $(el).text()).get();
    
    htmlTags.headings = headings.map(heading => heading.trim()).filter(heading => heading.length > 0);
    htmlTags.paragraphs = paragraphs.map(paragraph => paragraph.trim()).filter(paragraph => paragraph.length > 0);
    htmlTags.divs = divs.map(div => div.trim()).filter(div => div.length > 0);
    htmlTags.spans = spans.map(span => span.trim()).filter(span => span.length > 0);
    htmlTags.articles = articles.map(article => article.trim()).filter(article => article.length > 0);
    htmlTags.sections = sections.map(section => section.trim()).filter(section => section.length > 0);
    htmlTags.footers = footers.map(footer => footer.trim()).filter(footer => footer.length > 0);
    htmlTags.headers = headers.map(header => header.trim()).filter(header => header.length > 0);

    return htmlTags;
}

module.exports = {
    aggregateTextForSpellCheck,
    extractTagsFromHTML
}