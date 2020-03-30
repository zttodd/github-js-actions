// Include any node requirements (http, etc)
const https = require('https');

// Prompt for label/tag name

// Make a connection to GitHub API and get JSON response
// https://api.github.com/search/issues?q=repo:indiana-university/rivet-source+type:pr+label:v2.0.0-alpha.3

const options = {
  hostname: 'api.github.com',
  port: 443,
  path: `/search/issues?q=repo:indiana-university/rivet-source+type:pr+label:v2.0.0-alpha.3`,
  method: 'GET',
  headers: { 'User-Agent': 'rivet-source' }
}

const req = https.request(options, res => {
  let rawData = '';
  res.on('data', (chunk) => { rawData += chunk; });
  res.on('end', () => {
    try {
      const parsedData = JSON.parse(rawData);
      console.log(parsedData);
    } catch (e) {
      console.error(e.message);
    }
  });
});

req.on('error', error => {
  console.error(error)
})

req.end()

// From JSON response output, get pull request titles and html_urls for each PR
// console.log(output);

// Construct titles and html_urls into markdown format of changelog

// Output changelog string to the terminal (or file that has been ignored by git)