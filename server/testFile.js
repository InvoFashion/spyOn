const { aggregateTextForSpellCheck, extractAndCleanEnglishText } = require('./functions');



let text = 'bla bla bla bla bla noam InvoFashion, mashuItem';

//let englishParts = extractAndCleanEnglishText(text, ['InvoFashion']);
let words = ['InvoFashion', 'Item'];

words.forEach(word => {
    word = word.toLowerCase();
    text = text.toLowerCase().replaceAll(word, 'replaced-word');


})

console.log(text);