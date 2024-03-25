## Launch PuppeteerPdfGenerator Manually
1. run `yarn install`
2. run `node index.js`

## Port configuration
1. edit `index.js` and change `const port = 1337` to the desired port number.

## Test Functionality
1. Determine HOST running the project, if development this is http://localhost:1337 if port not changed
2. Generate a PDF from URL \<HOST\>/pdf/url?target=https%3A%2F%2Fwww.google.com%0A
3. Generate a PDF from HTML by sending a POST request to \<HOST\>/pdf/html
   * Set the request body with the HTML content

## Deploy as Windows Service