

function getPageSpeed(url) {

    const apiKey = process.env.PAGE_SPEED;
    const categories = ['performance', 'accessibility', 'best-practices', 'seo'];

    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&key=${apiKey}&category=${categories.join('&category=')}`;
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            
        //console.log(data);

        const extractedData = extractPageSpeedData(data);
        console.log('Extracted PageSpeed Data:', extractedData);

        // console.log('SEO');
        // console.log(extractedData.seo.audits);
        // console.log(extractedData.seo.audits);
        // console.log('bestPractices');
        // console.log(extractedData.bestPractices);
        // console.log(extractedData.bestPractices);
        // console.log('accessibility');
        // console.log(extractedData.accessibility);
        // console.log(extractedData.accessibility);
        console.log('performance');
        console.log(extractedData.performance);
        // Use 'extractedData' as needed in your application
        })
        .catch(error => console.error('Error fetching PageSpeed data:', error));
}



function extractPageSpeedData(data) {
    if (!data || !data.lighthouseResult) {
      console.error('Invalid PageSpeed Insights API response');
      return null;
    }
  
    const { categories, audits } = data.lighthouseResult;
  
    // Function to classify the score
    const classifyScore = (score) => {
      if (score === null) return "NONE";
      if (score >= 90) return "FAST";
      if (score >= 50) return "AVERAGE";
      return "SLOW";
    };
  
    // Function to extract relevant insights
    const extractInsights = (auditRefs, types) => {
      return auditRefs
        .filter(ref => audits[ref.id] && audits[ref.id].details && types.includes(audits[ref.id].details.type))
        .map(ref => {
          const audit = audits[ref.id];
          return {
            id: ref.id,
            title: audit.title,
            description: audit.description,
            score: audit.score * 100,
            details: audit.details
          };
        });
    };
  
    // Extracting data for each category
    const getCategoryData = (categoryName) => {
      const category = categories[categoryName];
      const score = category ? category.score * 100 : null;
      return {
        score,
        classification: classifyScore(score),
        insights: extractInsights(category.auditRefs, ['opportunity', 'diagnostic'])
      };
    };
  
    // Extract data for each category
    const seoData = getCategoryData('seo');
    const bestPracticesData = getCategoryData('best-practices');
    const accessibilityData = getCategoryData('accessibility');
    const performanceData = getCategoryData('performance');
  
    // Responsive (viewport) audit data
    const responsive = audits.viewport ? {
      score: audits.viewport.score * 100,
      classification: classifyScore(audits.viewport.score * 100),
      description: audits.viewport.description
    } : null;
  
    // Return extracted data
    return {
      seo: seoData,
      bestPractices: bestPracticesData,
      accessibility: accessibilityData,
      performance: performanceData,
      responsive
    };
  }
  
  
  
  
  
  


module.exports = {
    getPageSpeed
}

    