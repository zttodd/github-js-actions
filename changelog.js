// Include any node requirements (http, etc)

// Prompt for label/tag name

// Make a connection to GitHub API and get JSON response
// https://api.github.com/search/issues?q=repo:indiana-university/rivet-source+type:pr+label:v2.0.0-alpha.3

// From JSON response output, get pull request titles and html_urls for each PR

// Construct titles and html_urls into markdown format of changelog

// Output changelog string to the terminal (or file that has been ignored by git)