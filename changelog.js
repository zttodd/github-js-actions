// Include any node requirements (http, etc)
const axios = require('axios');

// Prompt for label/tag name

// Make a connection to GitHub API and get JSON response
// https://api.github.com/search/issues?q=repo:indiana-university/rivet-source+type:pr+label:v2.0.0-alpha.3

axios({
  method: 'get',
  url: 'https://api.github.com/search/issues?q=repo:indiana-university/rivet-source+type:pr+label:v2.0.0-alpha.3'
})
  .then((response) => {
    const parsedData = response.data;
    return parsedData;
  })

  // From JSON response output, get pull request titles and html_urls for each PR
  .then((parsedData) => {
    // Construct titles and html_urls into markdown format of changelog
    // Output changelog string to the terminal (or file that has been ignored by git)
    const items = parsedData.items;
    for (const item in items) {
      // - [PR title](PR URL)
      console.log(`- [${items[item].title}](${items[item].html_url})`);
    }
  })